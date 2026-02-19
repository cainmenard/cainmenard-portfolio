'use client'
import { useRef, useState, useEffect } from 'react'

export default function TableauEmbed({ embedUrl, title }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { rootMargin: '200px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="tableau-container">
      {visible ? <iframe src={embedUrl} allowFullScreen title={title} /> : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
          <div className="w-40 h-3 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="w-24 h-2 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      )}
    </div>
  )
}
