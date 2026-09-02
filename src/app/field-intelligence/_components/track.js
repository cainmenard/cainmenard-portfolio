/**
 * Privacy-sane interaction instrumentation.
 *
 * A dependency-free no-op sink today. It forwards to Plausible if that
 * script is ever added (window.plausible), and otherwise does nothing.
 * No cookies, no identifiers, no payloads beyond the event name and a
 * couple of coarse props (which station, which drawer).
 */
export function track(event, props = {}) {
  if (typeof window === 'undefined') return
  try {
    if (typeof window.plausible === 'function') {
      window.plausible(event, { props })
    }
  } catch {
    /* never let instrumentation break the page */
  }
}
