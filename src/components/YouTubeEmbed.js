'use client'
import { useRef, useState, useEffect } from 'react'

// Lazy YouTube player. The iframe (and YouTube's ~1MB of player script) loads
// only when the frame comes within 200px of the viewport, the same pattern
// TableauEmbed uses. Privacy-enhanced domain, so no YouTube cookies until play.
// Pass aspect="9/16" for Shorts, the default 16/9 for regular videos.
export default function YouTubeEmbed({ videoId, title, aspect = '16/9', className = '' }) {
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
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-200 dark:border-slate-700 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {visible ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white/40 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      )}
    </div>
  )
}
