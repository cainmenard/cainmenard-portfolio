'use client'

import { useRef, useState, useEffect } from 'react'

export default function ComparisonEmbed({ tableauUrl, webAppUrl }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('tableau')

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { rootMargin: '200px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Toggle tabs */}
      <div className="flex items-center gap-1 mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 max-w-xs">
        <button
          onClick={() => setActive('tableau')}
          className={`flex-1 text-xs font-semibold px-3 py-2 rounded-md transition-all ${
            active === 'tableau'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          Tableau Original
        </button>
        <button
          onClick={() => setActive('webapp')}
          className={`flex-1 text-xs font-semibold px-3 py-2 rounded-md transition-all ${
            active === 'webapp'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          React Web App
        </button>
      </div>

      {/* Embed area */}
      <div className="comparison-embed-frame rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {visible ? (
          <>
            <iframe
              src={tableauUrl}
              title="Tableau Dashboard — Project Performance Analysis"
              allowFullScreen
              className={active === 'tableau' ? 'block' : 'hidden'}
            />
            <iframe
              src={webAppUrl}
              title="React Web App — Project Performance Analysis"
              allowFullScreen
              className={active === 'webapp' ? 'block' : 'hidden'}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
            <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="w-40 h-3 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="w-24 h-2 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        )}
      </div>
    </div>
  )
}
