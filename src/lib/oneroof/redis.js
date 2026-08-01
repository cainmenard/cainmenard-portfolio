import { Redis } from '@upstash/redis'

/**
 * Storage for the /oneroof invite list and sessions.
 *
 * In production this is Upstash Redis over its REST API, which works from a
 * serverless function without connection pooling. Locally, if the two Upstash
 * variables are unset, it falls back to a process-local map so the whole auth
 * flow can be exercised with `npm run dev` before anything is provisioned.
 *
 * The fallback is dev-only on purpose. Silently degrading to an in-memory store
 * in production would mean every function instance had its own invite list and
 * every cold start logged everyone out, so that case throws instead.
 */

function hasUpstash() {
  return (
    !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN
  )
}

/* ------------------------------------------------------------------ */
/* In-memory fallback, dev only                                        */
/* ------------------------------------------------------------------ */

// Hung off globalThis so Next's dev-mode module reloading does not wipe an
// active session on every file save.
function memory() {
  if (!globalThis.__oneroofMemStore) {
    globalThis.__oneroofMemStore = { kv: new Map(), exp: new Map() }
  }
  return globalThis.__oneroofMemStore
}

function memLive(key) {
  const m = memory()
  const until = m.exp.get(key)
  if (until !== undefined && until <= Date.now()) {
    m.kv.delete(key)
    m.exp.delete(key)
    return false
  }
  return m.kv.has(key)
}

const memoryClient = {
  async get(key) {
    return memLive(key) ? memory().kv.get(key) : null
  },
  async set(key, value, opts) {
    const m = memory()
    m.kv.set(key, value)
    if (opts && opts.ex) m.exp.set(key, Date.now() + opts.ex * 1000)
    else m.exp.delete(key)
    return 'OK'
  },
  async del(...keys) {
    const m = memory()
    let n = 0
    for (const key of keys) {
      if (memLive(key)) n++
      m.kv.delete(key)
      m.exp.delete(key)
    }
    return n
  },
  async getdel(key) {
    const v = memLive(key) ? memory().kv.get(key) : null
    await memoryClient.del(key)
    return v
  },
  async incr(key) {
    const m = memory()
    const next = (memLive(key) ? Number(m.kv.get(key)) || 0 : 0) + 1
    m.kv.set(key, next)
    return next
  },
  async expire(key, seconds) {
    if (!memLive(key)) return 0
    memory().exp.set(key, Date.now() + seconds * 1000)
    return 1
  },
  async ttl(key) {
    if (!memLive(key)) return -2
    const until = memory().exp.get(key)
    if (until === undefined) return -1
    return Math.max(0, Math.round((until - Date.now()) / 1000))
  },
  async hget(key, field) {
    const h = memLive(key) ? memory().kv.get(key) : null
    return h && Object.prototype.hasOwnProperty.call(h, field) ? h[field] : null
  },
  async hset(key, obj) {
    const m = memory()
    const h = memLive(key) ? m.kv.get(key) : {}
    Object.assign(h, obj)
    m.kv.set(key, h)
    return Object.keys(obj).length
  },
  async hdel(key, ...fields) {
    const h = memLive(key) ? memory().kv.get(key) : null
    if (!h) return 0
    let n = 0
    for (const f of fields) {
      if (Object.prototype.hasOwnProperty.call(h, f)) {
        delete h[f]
        n++
      }
    }
    return n
  },
  async hgetall(key) {
    return memLive(key) ? { ...memory().kv.get(key) } : null
  },
}

/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Client resolution, deliberately lazy                                */
/* ------------------------------------------------------------------ */

let resolved = null

/**
 * Resolved on first use rather than at import.
 *
 * `next build` imports every route module to collect its config, so throwing at
 * module scope would make a missing environment variable a build failure rather
 * than a runtime one. Worse, it would make the build depend on secrets that
 * belong only to the running app. Deferring the check to the first actual query
 * keeps the build hermetic and still fails closed on a real request.
 */
function client() {
  if (resolved) return resolved

  if (hasUpstash()) {
    resolved = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    return resolved
  }

  // No Upstash in a running production app means the invite list would be
  // per-instance and sessions would die on every cold start. Fail loudly.
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE) {
    throw new Error(
      'UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required in production. ' +
        'Provision Upstash Redis from the Vercel dashboard under Storage.'
    )
  }

  resolved = memoryClient
  return resolved
}

// Every call routes through client(), so the check happens on first query.
export const redis = new Proxy(
  {},
  {
    get(_target, prop) {
      const c = client()
      const value = c[prop]
      return typeof value === 'function' ? value.bind(c) : value
    },
  }
)

export const usingMemoryStore = () => !hasUpstash()

/**
 * Upstash deserializes JSON automatically; the memory client stores the object
 * as-is. Either way callers want an object, and a corrupt value should read as
 * "no record" rather than throwing inside a route handler.
 */
export function asObject(value) {
  if (value == null) return null
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}
