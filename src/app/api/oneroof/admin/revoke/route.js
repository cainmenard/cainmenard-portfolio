import { audit, destroySession, listSessions } from '@/lib/oneroof/auth'
import { requireOwner } from '@/lib/oneroof/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/oneroof/admin/revoke  { sid }
 *
 * Ends one signed-in browser. Because sessions live in Redis rather than inside
 * a self-contained token, this takes effect on the viewer's very next request.
 * That is the practical reason the session id is stored server-side at all.
 */
export async function POST(request) {
  const owner = await requireOwner()
  if (!owner) return new Response('Not found', { status: 404 })

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Bad request.' }, { status: 400 })
  }

  const sid = String(body?.sid || '')
  if (!sid) return Response.json({ ok: false, error: 'No session given.' }, { status: 400 })

  await destroySession(sid)
  await audit('session_revoked', { sid, by: owner.email })

  return Response.json(
    { ok: true, sessions: await listSessions() },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
