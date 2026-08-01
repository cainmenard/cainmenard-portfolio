'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The sign-in form and the drifting-star canvas behind it.
 *
 * The canvas is the same 46-star field as the artifact's gate, carried over so
 * the login screen and the page behind it feel like one thing.
 *
 * On submit this always lands in the same "check your email" state. It does
 * not matter whether the address was on the invite list, and the component is
 * never told which, because the API deliberately does not say.
 */

const ERRORS = {
  expired: 'That link has already been used or has expired. Ask for a new one.',
  unavailable: 'Sign-in is briefly unavailable. Try again in a moment.',
}

function StarField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    let w = 0
    let h = 0
    let stars = []
    let raf

    const reset = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      stars = Array.from({ length: 46 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        p: Math.random() * 6.28,
      }))
    }

    const tick = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const a = (0.1 + 0.24 * (0.5 + 0.5 * Math.sin(t * 0.0011 + s.p))) * (0.35 + s.z * 0.5)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.z * 1.1 + 0.25, 0, 6.28)
        ctx.fillStyle = `rgba(150,175,205,${a.toFixed(3)})`
        ctx.fill()
        s.x += 0.03 + s.z * 0.04
        if (s.x > w) s.x = 0
      }
      raf = requestAnimationFrame(tick)
    }

    reset()
    window.addEventListener('resize', reset)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', reset)
    }
  }, [])

  return <canvas id="gatebg" ref={ref} aria-hidden="true" />
}

export default function GateForm({ initialError }) {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(ERRORS[initialError] || '')

  // The error comes in on the query string. Drop it once it has been read so a
  // refresh or a shared URL does not carry a stale complaint.
  useEffect(() => {
    if (initialError) window.history.replaceState({}, '', '/oneroof/enter')
  }, [initialError])

  async function submit(e) {
    e?.preventDefault()
    if (busy) return

    const value = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('That does not look like an email address.')
      return
    }

    setError('')
    setBusy(true)
    try {
      await fetch('/api/oneroof/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      setSent(true)
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div id="gate" className="orgate">
      <StarField />
      <div className="gwrap">
        <div className="gframe">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="oor" src="/oneroof-assets/mark.png" alt="Operation OneRoof" />
          <div className="gcoord">
            Private<span className="dim"> · </span>By invitation<span className="dim"> · </span>2024 to today
          </div>
          <h1>
            <span className="ln">Two years.</span>
            <span className="ln">
              <em>One arc.</em>
            </span>
          </h1>

          {sent ? (
            <div className="gsent">
              <div className="gs-h">Check your email.</div>
              <p>
                If <span className="gs-em">{email.trim().toLowerCase()}</span> is on the list, a
                sign-in link is on its way. It is good for 15 minutes and works once.
              </p>
              <p>
                Click it and you are in, on this browser, for the next 90 days. No password, and
                nothing to type again.
              </p>
              <button
                type="button"
                className="gs-again"
                onClick={() => {
                  setSent(false)
                  setError('')
                }}
              >
                Use a different address
              </button>
            </div>
          ) : (
            <>
              <p>
                An interactive look at the work behind RCA&rsquo;s ERP program, in the order it
                happened, and where it goes next. Built to explore in a few minutes.
              </p>
              <form className="gate-in" onSubmit={submit}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@roofingcorp.com"
                  autoComplete="email"
                  spellCheck="false"
                  autoFocus
                  disabled={busy}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button id="enter" type="submit" disabled={busy}>
                  {busy ? 'Sending' : 'Enter'}
                </button>
              </form>
              <div id="gerr" role="alert">
                {error}
              </div>
            </>
          )}

          <div className="gate-foot">
            Prepared by <b>Cain Menard</b> · cainmenard.com
          </div>
          <div className="gate-note">
            Private and unlisted. Access is by invitation, and the page itself is only sent to a
            signed-in browser. The embedded tools load from Tableau and Vercel when you open them.
          </div>
        </div>
      </div>
    </div>
  )
}
