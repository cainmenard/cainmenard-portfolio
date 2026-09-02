import { redirect } from 'next/navigation'
import './gate.css'
import GateForm from './GateForm'
import { currentSession } from '@/lib/oneroof/guard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Operation OneRoof',
  description: 'Private and unlisted.',
  robots: { index: false, follow: false, nocache: true },
}

export default async function OneRoofGate({ searchParams }) {
  // Already signed in, so there is nothing to ask for.
  if (await currentSession()) redirect('/oneroof')

  const e = typeof searchParams?.e === 'string' ? searchParams.e : ''
  return <GateForm initialError={e} />
}
