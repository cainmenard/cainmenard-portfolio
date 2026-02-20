'use client'
import { useState } from 'react'

export default function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-primary)', border: '1px solid var(--divider)', boxShadow: 'var(--shadow-sm)' }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left p-6 transition-colors hover:bg-[var(--bg-secondary)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{recipe.title}</h3>
            <p className="text-xs italic" style={{ color: 'var(--text-tertiary)' }}>From the kitchen of: {recipe.attribution}</p>
            {recipe.serves && <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Serves {recipe.serves}</p>}
          </div>
          <span className="text-xl mt-1 shrink-0" style={{ color: 'var(--text-tertiary)' }}>{open ? '\u2212' : '+'}</span>
        </div>
        {!open && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {recipe.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: 'rgba(43, 89, 69, 0.08)', color: 'var(--accent-green)' }}>{t}</span>)}
          </div>
        )}
      </button>

      {open && (
        <div className="px-6 pb-6 pt-4 space-y-5" style={{ borderTop: '1px solid var(--divider)' }}>
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: 'rgba(43, 89, 69, 0.08)', color: 'var(--accent-green)' }}>{t}</span>)}
          </div>

          <div>
            <p className="eyebrow mb-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.67rem' }}>Ingredients</p>
            <ul className="space-y-1.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-sm pl-4 relative" style={{ color: 'var(--text-secondary)' }}>
                  <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-green)' }}></span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {recipe.notes && recipe.notes.length > 0 && (
            <div className="rounded-lg p-4 space-y-2" style={{ background: 'rgba(43, 89, 69, 0.06)', border: '1px solid rgba(43, 89, 69, 0.1)' }}>
              {recipe.notes.map((n, i) => (
                <p key={i} className="text-xs leading-relaxed" style={{ color: 'var(--accent-green)' }}>{n}</p>
              ))}
            </div>
          )}

          <div>
            <p className="eyebrow mb-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.67rem' }}>Instructions</p>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-sm leading-relaxed pl-7 relative" style={{ color: 'var(--text-secondary)' }}>
                  <span className="absolute left-0 top-0 text-xs font-bold w-5" style={{ color: 'var(--accent-blue)' }}>{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {recipe.familyNote && (
            <div className="rounded-lg p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--divider)' }}>
              <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{'\u2605'} {recipe.familyNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
