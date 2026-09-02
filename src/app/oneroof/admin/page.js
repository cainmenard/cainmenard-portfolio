import { notFound } from 'next/navigation'
import '../enter/gate.css'
import './admin.css'
import AdminConsole from './AdminConsole'
import { listInvites, listSessions } from '@/lib/oneroof/auth'
import { requireOwner } from '@/lib/oneroof/guard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'OneRoof access',
  robots: { index: false, follow: false, nocache: true },
}

/**
 * Anyone who is not the owner gets a 404, including invited viewers. Returning
 * 403 would confirm the page exists, which is a fact worth not handing out.
 */
export default async function OneRoofAdmin() {
  const owner = await requireOwner()
  if (!owner) notFound()

  const [invites, sessions] = await Promise.all([listInvites(), listSessions()])
  return <AdminConsole owner={owner.email} invites={invites} sessions={sessions} />
}
