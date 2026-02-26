import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-6">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold mb-4" style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>404</p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Page not found
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          This page doesn&apos;t exist — maybe it got lost on the way to Everest Base Camp.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:shadow-lg" style={{ background: 'var(--navy)' }}>
            ← Back to Home
          </Link>
          <Link href="/lagniappe" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 transition hover:border-slate-400 dark:hover:border-slate-500">
            Visit Lagniappe
          </Link>
        </div>
      </div>
    </div>
  )
}
