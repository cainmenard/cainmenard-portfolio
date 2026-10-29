import {
  audit,
  clientIp,
  createMagicToken,
  isAllowed,
  looksLikeEmail,
  normalizeEmail,
  rateLimitEmail,
  rateLimitIp,
  siteUrl,
} from '@/lib/oneroof/auth'
import { sendMagicLink, sendOwnerAlert } from '@/lib/oneroof/mail'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/oneroof/auth/request
 *
 * Takes an email, sends a sign-in link if that address is on the invite list,
 * and returns the exact same response either way.
 *
 * That last part is the whole design. If the answer differed by even a status
 * code or a few milliseconds of wording, the form would become a tool for
 * checking who has access to the page, which is itself something worth not
 * giving away. So: one response shape, always.
 */

const GENERIC = {
  ok: true,
  message: 'Check your email. If that address is on the list, a sign-in link is on its way.',
}

const ok = () =>
  Response.json(GENERIC, { status: 200, headers: { 'Cache-Control': 'no-store' } })

export async function POST(request) {
  let email = ''
  try {
    const body = await request.json()
    email = normalizeEmail(body?.email)
  } catch {
    return ok()
  }

  // Malformed input gets the same answer as everything else.
  if (!looksLikeEmail(email)) return ok()

  const ip = clientIp(request)

  const byIp = await rateLimitIp(ip)
  const byEmail = await rateLimitEmail(email)
  if (!byIp.ok || !byEmail.ok) {
    await audit('throttled', { email, ip, ipCount: byIp.count, emailCount: byEmail.count })
    return ok()
  }

  try {
    if (await isAllowed(email)) {
      const token = await createMagicToken(email)
      const url = `${siteUrl()}/api/oneroof/auth/callback?t=${encodeURIComponent(token)}`
      await sendMagicLink({ to: email, url, isNew: false })
      await audit('link_sent', { email, ip })
    } else {
      // Nothing goes to them. Cain finds out instead.
      await sendOwnerAlert({ email, ip, at: Date.now() })
      await audit('not_invited', { email, ip })
    }
  } catch (err) {
    console.error('[oneroof] auth request failed', err)
  }

  return ok()
}
