import { cookies } from 'next/headers'
import {
  COOKIE_NAME,
  audit,
  clientIp,
  consumeMagicToken,
  cookieOptions,
  createSession,
  isAllowed,
} from '@/lib/oneroof/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/oneroof/auth/callback?t=...
 *
 * Trades a one-time token for a 90-day session. The token is consumed with
 * GETDEL, so it is spent the instant it is read: a forwarded email, a mail
 * scanner prefetching the link, or a double-click all end up with one session
 * and the rest failing closed.
 *
 * The invite list is re-checked here, not just at request time. Someone removed
 * in the fifteen minutes between asking for a link and clicking it does not get
 * in on a link that was valid when it was sent.
 */

function bounce(request, reason) {
  const url = new URL('/oneroof/enter', request.url)
  url.searchParams.set('e', reason)
  return Response.redirect(url.toString(), 307)
}

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('t')
  const ip = clientIp(request)

  let email
  try {
    email = await consumeMagicToken(token)
  } catch (err) {
    console.error('[oneroof] token consume failed', err)
    return bounce(request, 'unavailable')
  }

  if (!email) {
    await audit('token_rejected', { ip })
    return bounce(request, 'expired')
  }

  if (!(await isAllowed(email))) {
    await audit('token_revoked_email', { email, ip })
    return bounce(request, 'expired')
  }

  const { cookie } = await createSession(email, {
    ip,
    ua: request.headers.get('user-agent') || '',
  })

  cookies().set(COOKIE_NAME, cookie, cookieOptions())
  await audit('signed_in', { email, ip })

  const dest = new URL('/oneroof', request.url)
  return new Response(null, {
    status: 307,
    headers: { Location: dest.toString(), 'Cache-Control': 'no-store' },
  })
}
