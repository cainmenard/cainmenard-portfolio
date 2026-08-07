import Link from 'next/link'

const TAGS = ['ENTJ-A', '8w7', 'D: Producer', '91st Extraversion', 'Thrust Energy', '7-7-3-3']

export default function PersonalityTeaser() {
  return (
    <Link
      href="/personality"
      className="block mt-6 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>How I Operate</p>
        <span className="text-xs font-medium text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">6 assessments →</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {TAGS.map(tag => (
          <span key={tag} className="skill-tag text-[11px] !py-1 !px-2.5">{tag}</span>
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        Six personality assessments mapped into one interactive profile — from leadership style and communication to decision-making and what happens under pressure.
      </p>
    </Link>
  )
}
