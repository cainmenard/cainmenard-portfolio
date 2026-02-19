import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold mb-4" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>404</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Page not found
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          This page doesn&apos;t exist — maybe it got lost on the way to Everest Base Camp.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:shadow-lg" style={{ background: 'var(--navy)' }}>
            ← Back to Home
          </Link>
          <Link href="/lagniappe" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border-2 border-slate-200 text-slate-700 transition hover:border-slate-400">
            Visit Lagniappe
          </Link>
        </div>
      </div>
    </div>
  )
}
