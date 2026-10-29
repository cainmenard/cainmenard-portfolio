import { cookies } from 'next/headers'
import { COOKIE_NAME, audit, destroySession, unsignCookie } from '@/lib/oneroof/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/oneroof/auth/logout
 *
 * Kills the session in Redis, not just the cookie, so a copied cookie value is
 * dead too.
 */
export async function POST() {
  const jar = cookies()
  const sid = unsignCookie(jar.get(COOKIE_NAME)?.value)

  if (sid) {
    await destroySession(sid)
    await audit('signed_out', { sid })
  }

  jar.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 })
  return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
}
