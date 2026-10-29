import fs from 'fs'
import path from 'path'
import { cookies } from 'next/headers'
import { COOKIE_NAME, readSession } from '@/lib/oneroof/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /oneroof
 *
 * The artifact lives at private/oneroof/index.html, outside public/, so there
 * is no URL that reaches the raw file and no CDN copy to leak. This handler is
 * the only way to read it, and it reads it only after a session checks out.
 *
 * A miss returns a redirect with no body. Nothing about the page, its size, or
 * whether the requesting address is on the invite list comes back.
 */

const ARTIFACT = path.join(process.cwd(), 'private', 'oneroof', 'index.html')

let cached = null

function artifact() {
  // Cached per warm function instance. The file only changes on deploy, and a
  // deploy is a new instance, so there is nothing to invalidate.
  if (!cached || process.env.NODE_ENV !== 'production') {
    cached = fs.readFileSync(ARTIFACT)
  }
  return cached
}

function toGate(request, reason) {
  const url = new URL('/oneroof/enter', request.url)
  if (reason) url.searchParams.set('e', reason)
  return new Response(null, {
    status: 307,
    headers: {
      Location: url.toString(),
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

export async function GET(request) {
  let session = null
  try {
    session = await readSession(cookies().get(COOKIE_NAME)?.value)
  } catch (err) {
    // A missing secret or an unreachable store must fail closed, never open.
    console.error('[oneroof] session check failed', err)
    return toGate(request, 'unavailable')
  }

  if (!session) return toGate(request)

  let body
  try {
    body = artifact()
  } catch (err) {
    console.error('[oneroof] artifact unreadable at', ARTIFACT, err)
    return new Response('The walk-through is temporarily unavailable.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    })
  }

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // private + no-store keeps it out of shared caches and off the CDN. The
      // whole point is that this response is for one authenticated reader.
      'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
