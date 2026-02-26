'use client'
import { useState } from 'react'
import { allAssessments } from './data'
import ViewToggle from './components/ViewToggle'
import AssessmentGrid from './components/AssessmentGrid'
import AssessmentDetail from './components/AssessmentDetail'
import ThemeExplorer from './components/ThemeExplorer'
import ThemeDetail from './components/ThemeDetail'
import Footer from '@/components/Footer'

const HEADLINE_TAGS = [
  'ENTJ-A', '8w7', 'D: Producer', 'Thrust Energy', 'Verify · Authenticate'
]

export default function PersonalityExplorer() {
  const [activeAssessment, setActiveAssessment] = useState(null)
  const [activeTheme, setActiveTheme] = useState(null)
  const [viewMode, setViewMode] = useState('pro')

  const handleAssessmentSelect = (id) => {
    setActiveAssessment(id)
    if (id) setActiveTheme(null)
  }

  const handleThemeSelect = (id) => {
    setActiveTheme(id)
    if (id) setActiveAssessment(null)
  }

  return (
    <>
      {/* ─── Back link ─── */}
      <a href="/" className="back-to-home" aria-label="Back to home page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Home
      </a>

      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* ─── Hero Section ─── */}
        <section className="pt-28 pb-16 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-6">
            <p className="section-label mb-3">Personality Profile</p>
            <h1 className="section-heading text-3xl md:text-4xl mb-4">How I Operate</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
              Five personality assessments mapped into one interactive profile — from leadership style and communication to decision-making and what happens under pressure.
            </p>

            {/* Headline badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {HEADLINE_TAGS.map(tag => (
                <span key={tag} className="skill-tag text-xs">{tag}</span>
              ))}
            </div>

            {/* View toggle */}
            <ViewToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </section>

        {/* ─── Assessments Section ─── */}
        <section className="py-12 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Individual Assessments</p>
            <AssessmentGrid active={activeAssessment} onSelect={handleAssessmentSelect} />

            {activeAssessment && (
              <div className="mt-6">
                <AssessmentDetail assessmentId={activeAssessment} mode={viewMode} />
              </div>
            )}
          </div>
        </section>

        {/* ─── Themes Section ─── */}
        <section className="py-12 bg-white dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Cross-Assessment Themes</p>
            <ThemeExplorer active={activeTheme} onSelect={handleThemeSelect} />

            {activeTheme && (
              <div className="mt-6">
                <ThemeDetail themeId={activeTheme} />
              </div>
            )}
          </div>
        </section>

        {/* ─── Disclaimer ─── */}
        <section className="py-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              These results reflect self-reported assessments taken at specific points in time. They&apos;re useful frameworks for understanding behavioral tendencies — not fixed labels.
              DISC scores are estimates based on qualitative descriptions. ProScan values are read from descriptive report text, not raw data exports.
            </p>
          </div>
        </section>
      </div>

      <Footer variant="simple" />
    </>
  )
}
