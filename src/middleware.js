import { NextResponse } from 'next/server'

/**
 * Gate for OneRoof previews that still live under public/.
 *
 * /oneroof itself does not need this. Its artifact was moved out of public/ and
 * is served by a route handler, which is the stronger arrangement: there is no
 * URL to reach the file at all.
 *
 * Previews are different. They are actively being iterated on, and moving a file
 * out from under someone mid-edit is how you break their afternoon. Middleware
 * runs before static assets are served, so it can gate them where they sit.
 *
 * The check here is deliberately shallow. Middleware runs on the edge runtime,
 * where node:crypto and the Redis client are not available, so it only asks
 * whether a session cookie is present and well formed. That is enough to stop a
 * URL guess, which is the entire threat model for an unlisted preview. Anything
 * that graduates to carrying real content should move to private/ and go through
 * a route handler, where the session is actually verified.
 */

const COOKIE_NAME = 'oneroof_session'

export function middleware(request) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value
  const plausible = !!cookie && /^[A-Za-z0-9_-]{20,64}\.[A-Za-z0-9_-]{20,64}$/.test(cookie)

  if (plausible) return NextResponse.next()

  const url = new URL('/oneroof/enter', request.url)
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: ['/oneroof2', '/oneroof2/:path*', '/oneroof2-classic', '/oneroof2-classic/:path*'],
}
