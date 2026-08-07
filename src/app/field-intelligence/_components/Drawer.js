'use client'
import { useId, useState } from 'react'
import { track } from './track'

/**
 * A "go deeper" drawer. Accessible disclosure (button + region), animated
 * open via CSS grid-rows so it works without measuring height. Fires a
 * coarse instrumentation event the first time it opens.
 */
export default function Drawer({ title, eventId, children }) {
  const [open, setOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)
  const regionId = useId()

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next && !everOpened) {
      setEverOpened(true)
      track('fi_drawer_opened', { drawer: eventId || title })
    }
  }

  return (
    <div className="fi-drawer" data-open={open}>
      <button
        type="button"
        className="fi-drawer__summary"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={toggle}
      >
        <span className="fi-drawer__icon" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="6" y1="1.5" x2="6" y2="10.5" />
            <line x1="1.5" y1="6" x2="10.5" y2="6" />
          </svg>
        </span>
        <span>{title}</span>
      </button>
      <div id={regionId} className="fi-drawer__region" role="region" aria-label={title}>
        <div className="fi-drawer__inner">
          <div className="fi-drawer__body">{children}</div>
        </div>
      </div>
    </div>
  )
}
