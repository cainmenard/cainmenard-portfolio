import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold mb-4" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>404</p>
        <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Page not found
        </h1>
        <p className="mb-8 leading-relaxed serif-text" style={{ color: 'var(--text-secondary)' }}>
          This page doesn&apos;t exist — maybe it got lost on the way to Everest Base Camp.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            ← Back to Home
          </Link>
          <Link href="/lagniappe" className="btn-outline">
            Visit Lagniappe
          </Link>
        </div>
      </div>
    </div>
  )
}
