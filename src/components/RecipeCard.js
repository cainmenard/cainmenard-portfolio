'use client'
import { useState } from 'react'

export default function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-6 hover:bg-slate-50 dark:hover:bg-slate-750 transition">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{recipe.title}</h3>
            <p className="text-xs text-slate-400 italic">From the kitchen of: {recipe.attribution}</p>
            {recipe.serves && <p className="text-xs text-slate-400 mt-1">Serves {recipe.serves}</p>}
          </div>
          <span className="text-slate-300 dark:text-slate-500 text-xl mt-1 shrink-0">{open ? '\u2212' : '+'}</span>
        </div>
        {!open && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {recipe.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">{t}</span>)}
          </div>
        )}
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-slate-100 dark:border-slate-700 pt-4 space-y-5">
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium">{t}</span>)}
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ingredients</p>
            <ul className="space-y-1.5">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-sm text-slate-600 dark:text-slate-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-amber-300">
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {recipe.notes && recipe.notes.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 space-y-2">
              {recipe.notes.map((n, i) => (
                <p key={i} className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{n}</p>
              ))}
            </div>
          )}

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Instructions</p>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7 relative">
                  <span className="absolute left-0 top-0 text-xs font-bold text-amber-500 w-5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {recipe.familyNote && (
            <div className="bg-slate-50 dark:bg-slate-750 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
              <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">{'\u2605'} {recipe.familyNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
