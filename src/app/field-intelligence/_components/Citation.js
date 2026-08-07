'use client'

/**
 * Citation affordance: a small superscript marker that reveals a footnote
 * on hover or keyboard focus. Two shapes:
 *   - public stat: pass `source` (+ optional `url`) for a linked source
 *   - engagement number: pass only `detail` (the honest methodology note),
 *     since scrubbed client data cannot be hyperlinked
 *
 * Optionally wraps `children` (a term) so the whole phrase carries the note.
 */
export default function Citation({ n, detail, source, url, children }) {
  return (
    <span className="fi-cite">
      {children}
      <button
        type="button"
        className="fi-cite__btn"
        aria-label={source ? `Source: ${source}` : 'Citation'}
      >
        {n ?? 'i'}
      </button>
      <span role="note" className="fi-cite__note">
        {detail}
        {source && (
          <span className="fi-cite__src">
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {source}
              </a>
            ) : (
              source
            )}
          </span>
        )}
      </span>
    </span>
  )
}
