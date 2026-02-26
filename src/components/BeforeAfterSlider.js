'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = (x / rect.width) * 100
    setPosition(Math.max(2, Math.min(98, pct)))
  }, [])

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true)
  }, [])

  const handleContainerClick = useCallback((e) => {
    if (!isDragging) {
      updatePosition(e.clientX)
    }
  }, [isDragging, updatePosition])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      e.preventDefault()
      updatePosition(e.clientX)
    }

    const handleTouchMove = (e) => {
      updatePosition(e.touches[0].clientX)
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, updatePosition])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPosition((p) => Math.max(2, p - 5))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPosition((p) => Math.min(98, p + 5))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`before-after-slider-container ${isDragging ? 'is-dragging' : ''} ${className}`}
      onClick={handleContainerClick}
    >
      {/* After image (full width, base layer) */}
      <Image
        src={afterSrc}
        alt={afterLabel}
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        style={{ objectFit: 'cover', objectPosition: 'top', zIndex: 1 }}
        draggable={false}
      />

      {/* Before image (clipped via overflow-hidden container) */}
      <div
        className="absolute top-0 left-0 bottom-0 overflow-hidden"
        style={{ width: `${position}%`, zIndex: 2 }}
      >
        <div className="relative h-full" style={{ width: `${100 / position * 100}%` }}>
          <Image
            src={beforeSrc}
            alt={beforeLabel}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            draggable={false}
          />
        </div>
      </div>

      {/* Divider line + handle */}
      <div
        className="before-after-divider"
        style={{ left: `${position}%`, zIndex: 10 }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label="Drag to compare before and after images"
        tabIndex={0}
      >
        <div className="before-after-handle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-white pointer-events-none select-none" style={{ zIndex: 5 }}>
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-slate-900 dark:text-white pointer-events-none select-none" style={{ zIndex: 5 }}>
        {afterLabel}
      </span>
    </div>
  )
}
