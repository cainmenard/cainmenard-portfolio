import crypto from 'crypto'
import { redis, asObject } from './redis'

/**
 * Sessions, invite list, magic-link tokens and rate limiting for /oneroof.
 *
 * The shape of the thing: a session id is 32 random bytes held in Redis. The
 * cookie carries that id plus an HMAC of it. Verifying takes both, and the
 * Redis lookup is the one that actually decides. The HMAC is there so a forged
 * or truncated cookie is rejected before it costs a network round trip, and so
 * that tampering is detectable rather than just unlucky.
 *
 * Everything a browser sends is treated as hostile. Nothing here trusts a
 * value that did not come back out of Redis.
 */

export const COOKIE_NAME = 'oneroof_session'
export const SESSION_TTL = 60 * 60 * 24 * 90 // 90 days
export const MAGIC_TTL = 60 * 15 // 15 minutes
const RENEW_AFTER = 60 * 60 * 24 // extend the TTL at most once a day

const K = {
  session: (sid) => `oneroof:sess:${sid}`,
  sessionIndex: 'oneroof:sess:index',
  magic: (hash) => `oneroof:magic:${hash}`,
  allow: 'oneroof:allow',
  rlIp: (ip) => `oneroof:rl:ip:${ip}`,
  rlEmail: (email) => `oneroof:rl:em:${email}`,
  log: 'oneroof:log',
}

/* ------------------------------------------------------------------ */
/* Email                                                               */
/* ------------------------------------------------------------------ */

export function normalizeEmail(raw) {
  return String(raw || '')
    .trim()
    .toLowerCase()
}

// Deliberately loose. The invite list is the access control; this only rejects
// input that could not be an address at all.
export function looksLikeEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254
}

export function ownerEmail() {
  return normalizeEmail(process.env.ONEROOF_OWNER_EMAIL)
}

export function isOwner(email) {
  const owner = ownerEmail()
  return !!owner && normalizeEmail(email) === owner
}

/* ------------------------------------------------------------------ */
/* Cookie signing                                                      */
/* ------------------------------------------------------------------ */

function secret() {
  const s = process.env.ONEROOF_SESSION_SECRET
  if (!s || s.length < 32) {
    throw new Error(
      'ONEROOF_SESSION_SECRET is missing or too short. Generate one with: ' +
        'node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
    )
  }
  return s
}

function sign(sid) {
  return crypto.createHmac('sha256', secret()).update(sid).digest('base64url')
}

function safeEqual(a, b) {
  const ab = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ab.length !== bb.length) return false
  try {
    return crypto.timingSafeEqual(ab, bb)
  } catch {
    return false
  }
}

/** Pulls a session id out of a cookie value, or null if the signature fails. */
export function unsignCookie(value) {
  if (!value || typeof value !== 'string') return null
  const dot = value.indexOf('.')
  if (dot <= 0) return null
  const sid = value.slice(0, dot)
  const mac = value.slice(dot + 1)
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(sid)) return null
  return safeEqual(mac, sign(sid)) ? sid : null
}

/* ------------------------------------------------------------------ */
/* Sessions                                                            */
/* ------------------------------------------------------------------ */

function randomId() {
  return crypto.randomBytes(32).toString('base64url')
}

export async function createSession(email, meta = {}) {
  const sid = randomId()
  const now = Date.now()
  const record = {
    email: normalizeEmail(email),
    createdAt: now,
    lastSeen: now,
    ip: meta.ip || null,
    ua: (meta.ua || '').slice(0, 200) || null,
  }
  await redis.set(K.session(sid), JSON.stringify(record), { ex: SESSION_TTL })
  await redis.hset(K.sessionIndex, {
    [sid]: JSON.stringify({ email: record.email, createdAt: now }),
  })
  return { sid, cookie: `${sid}.${sign(sid)}`, record }
}

/**
 * Verify a cookie and return the live session, or null.
 *
 * Renewal is the reason someone invited once does not have to log in again:
 * every visit more than a day after the last one pushes the 90-day window back
 * out. Someone who opens the page monthly is never asked for an email again.
 */
export async function readSession(cookieValue) {
  const sid = unsignCookie(cookieValue)
  if (!sid) return null

  const record = asObject(await redis.get(K.session(sid)))
  if (!record || !record.email) return null

  const now = Date.now()
  if (now - (record.lastSeen || 0) > RENEW_AFTER * 1000) {
    record.lastSeen = now
    await redis.set(K.session(sid), JSON.stringify(record), { ex: SESSION_TTL })
  }
  return { sid, ...record }
}

export async function destroySession(sid) {
  await redis.del(K.session(sid))
  await redis.hdel(K.sessionIndex, sid)
}

/**
 * Live sessions, newest first. Prunes index entries whose session key has
 * already expired, which is the cleanup Redis TTLs cannot do on their own.
 */
export async function listSessions() {
  const index = (await redis.hgetall(K.sessionIndex)) || {}
  const out = []
  const dead = []

  for (const [sid, raw] of Object.entries(index)) {
    const record = asObject(await redis.get(K.session(sid)))
    if (!record) {
      dead.push(sid)
      continue
    }
    const stub = asObject(raw) || {}
    out.push({
      sid,
      email: record.email,
      createdAt: record.createdAt || stub.createdAt || null,
      lastSeen: record.lastSeen || null,
      ip: record.ip || null,
      ua: record.ua || null,
    })
  }

  if (dead.length) await redis.hdel(K.sessionIndex, ...dead)
  return out.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0))
}

export async function destroySessionsFor(email) {
  const target = normalizeEmail(email)
  const sessions = await listSessions()
  const hits = sessions.filter((s) => s.email === target)
  for (const s of hits) await destroySession(s.sid)
  return hits.length
}

/* ------------------------------------------------------------------ */
/* Invite list                                                         */
/* ------------------------------------------------------------------ */

export async function isAllowed(email) {
  const target = normalizeEmail(email)
  if (!target) return false
  if (isOwner(target)) return true
  return (await redis.hget(K.allow, target)) != null
}

export async function addInvite(email, meta = {}) {
  const target = normalizeEmail(email)
  await redis.hset(K.allow, {
    [target]: JSON.stringify({
      name: meta.name || null,
      note: meta.note || null,
      addedAt: Date.now(),
      addedBy: meta.addedBy || null,
    }),
  })
  return target
}

export async function removeInvite(email) {
  const target = normalizeEmail(email)
  if (isOwner(target)) return { removed: false, reason: 'owner' }
  await redis.hdel(K.allow, target)
  const revoked = await destroySessionsFor(target)
  return { removed: true, revoked }
}

export async function listInvites() {
  const all = (await redis.hgetall(K.allow)) || {}
  const rows = Object.entries(all).map(([email, raw]) => ({
    email,
    ...(asObject(raw) || {}),
  }))
  const owner = ownerEmail()
  if (owner && !rows.some((r) => r.email === owner)) {
    rows.unshift({ email: owner, name: 'Cain Menard', owner: true, addedAt: null })
  }
  return rows
    .map((r) => ({ ...r, owner: r.email === owner }))
    .sort((a, b) => (b.owner ? 1 : 0) - (a.owner ? 1 : 0) || a.email.localeCompare(b.email))
}

/* ------------------------------------------------------------------ */
/* Magic-link tokens                                                   */
/* ------------------------------------------------------------------ */

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex')

/**
 * Only the hash is stored, so a dump of the store does not hand anyone a
 * working login link.
 */
export async function createMagicToken(email) {
  const token = crypto.randomBytes(32).toString('base64url')
  await redis.set(
    K.magic(hashToken(token)),
    JSON.stringify({ email: normalizeEmail(email), createdAt: Date.now() }),
    { ex: MAGIC_TTL }
  )
  return token
}

/**
 * GETDEL, so a link works exactly once. Forwarding the email, a mail scanner
 * prefetching the URL, or the browser retrying all resolve to one use and the
 * rest fail closed.
 */
export async function consumeMagicToken(token) {
  if (!token || typeof token !== 'string' || token.length > 200) return null
  const record = asObject(await redis.getdel(K.magic(hashToken(token))))
  return record && record.email ? record.email : null
}

/* ------------------------------------------------------------------ */
/* Rate limiting                                                       */
/* ------------------------------------------------------------------ */

async function bump(key, limit, windowSeconds) {
  const n = await redis.incr(key)
  if (n === 1) await redis.expire(key, windowSeconds)
  return { ok: n <= limit, count: n }
}

export const rateLimitIp = (ip) => bump(K.rlIp(ip || 'unknown'), 8, 60 * 15)
export const rateLimitEmail = (email) => bump(K.rlEmail(normalizeEmail(email)), 4, 60 * 60)

/* ------------------------------------------------------------------ */
/* Audit trail                                                         */
/* ------------------------------------------------------------------ */

export async function audit(event, detail = {}) {
  try {
    const key = `oneroof:log:${Date.now()}:${crypto.randomBytes(4).toString('hex')}`
    await redis.set(key, JSON.stringify({ event, at: Date.now(), ...detail }), {
      ex: 60 * 60 * 24 * 30,
    })
  } catch {
    // Logging must never be the reason a login fails.
  }
}

/* ------------------------------------------------------------------ */
/* Request helpers                                                     */
/* ------------------------------------------------------------------ */

export function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL,
  }
}
