import {
  addInvite,
  audit,
  createMagicToken,
  listInvites,
  looksLikeEmail,
  normalizeEmail,
  removeInvite,
  siteUrl,
} from '@/lib/oneroof/auth'
import { sendMagicLink } from '@/lib/oneroof/mail'
import { requireOwner } from '@/lib/oneroof/guard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const notFound = () => new Response('Not found', { status: 404 })

/** POST /api/oneroof/admin/invite  { email, name?, note?, send? } */
export async function POST(request) {
  const owner = await requireOwner()
  if (!owner) return notFound()

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Bad request.' }, { status: 400 })
  }

  const email = normalizeEmail(body?.email)
  if (!looksLikeEmail(email)) {
    return Response.json({ ok: false, error: 'That does not look like an email address.' }, { status: 400 })
  }

  await addInvite(email, { name: body?.name, note: body?.note, addedBy: owner.email })
  await audit('invited', { email, by: owner.email })

  let sent = false
  if (body?.send !== false) {
    const token = await createMagicToken(email)
    const url = `${siteUrl()}/api/oneroof/auth/callback?t=${encodeURIComponent(token)}`
    const result = await sendMagicLink({ to: email, url, isNew: true })
    sent = !!result.ok
  }

  return Response.json(
    { ok: true, email, sent, invites: await listInvites() },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

/** DELETE /api/oneroof/admin/invite  { email }, also kills their live sessions. */
export async function DELETE(request) {
  const owner = await requireOwner()
  if (!owner) return notFound()

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Bad request.' }, { status: 400 })
  }

  const email = normalizeEmail(body?.email)
  const result = await removeInvite(email)

  if (!result.removed) {
    return Response.json(
      { ok: false, error: 'You cannot remove your own access.' },
      { status: 400 }
    )
  }

  await audit('invite_removed', { email, by: owner.email, revoked: result.revoked })
  return Response.json(
    { ok: true, email, revoked: result.revoked, invites: await listInvites() },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
