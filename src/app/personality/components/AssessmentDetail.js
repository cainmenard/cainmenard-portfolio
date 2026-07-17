'use client'
import { mbtiData, discData, enneagramData, proscanData, idDrivesData, bigFiveData, allAssessments } from '../data'
import PercentileBar from './charts/PercentileBar'
import DichotomyScale from './charts/DichotomyScale'
import DriveSpectrum from './charts/DriveSpectrum'
import ProScanBar from './charts/ProScanBar'

function SectionTitle({ children }) {
  return (
    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-6 first:mt-0">{children}</p>
  )
}

function Tag({ children }) {
  return <span className="skill-tag text-xs">{children}</span>
}

// ─── MBTI Detail ───
function MBTIDetail({ mode }) {
  const d = mbtiData
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{d.summary}</p>

      <SectionTitle>Dichotomies</SectionTitle>
      {Object.entries(d.scores).map(([key, s], i) => (
        <DichotomyScale key={key} left={s.left} right={s.right} value={s.value} letter={s.letter} index={i} />
      ))}

      {mode === 'full' && (
        <>
          <SectionTitle>Cognitive Function Stack</SectionTitle>
          <div className="space-y-3">
            {d.cognitiveStack.map((fn) => (
              <div key={fn.fn} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>{fn.fn}</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{fn.name}</span>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{fn.role}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{fn.desc}</p>
              </div>
            ))}
          </div>

          <SectionTitle>Strengths</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {d.strengths.map(s => <Tag key={s}>{s}</Tag>)}
          </div>

          <SectionTitle>Growth Areas</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {d.weaknesses.map(w => <Tag key={w}>{w}</Tag>)}
          </div>
        </>
      )}
    </div>
  )
}

// ─── DISC Detail ───
function DISCDetail({ mode }) {
  const d = discData
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{d.summary}</p>

      <SectionTitle>Profile Scores</SectionTitle>
      {Object.entries(d.profile).map(([key, p], i) => (
        <PercentileBar key={key} label={`${key} — ${p.label}`} value={p.score} index={i} />
      ))}

      {mode === 'full' && (
        <>
          <SectionTitle>Motivators</SectionTitle>
          <ul className="space-y-1.5">
            {d.motivators.map(m => (
              <li key={m} className="text-sm text-slate-600 dark:text-slate-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-green-400">{m}</li>
            ))}
          </ul>

          <SectionTitle>Dislikes</SectionTitle>
          <ul className="space-y-1.5">
            {d.dislikes.map(dl => (
              <li key={dl} className="text-sm text-slate-600 dark:text-slate-300 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-red-400">{dl}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

// ─── Enneagram Detail ───
function EnneagramDetail({ mode }) {
  const d = enneagramData
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{d.summary}</p>

      <SectionTitle>Type Breakdown</SectionTitle>
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Core Type</p>
          <p className="text-lg font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>Type {d.type.core}</p>
          <p className="text-xs text-slate-400">{d.type.triad}</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Wing</p>
          <p className="text-lg font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{d.type.wing} Wing</p>
          <p className="text-xs text-slate-400">{d.type.center}</p>
        </div>
      </div>

      {mode === 'full' && (
        <>
          <SectionTitle>Core Motivation</SectionTitle>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.coreMotivation}</p>

          <SectionTitle>Core Fear</SectionTitle>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.coreFear}</p>

          <SectionTitle>At Best</SectionTitle>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.atBest}</p>

          <SectionTitle>Wing Influence</SectionTitle>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.wingInfluence}</p>

          <SectionTitle>Growth &amp; Stress Arrows</SectionTitle>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
              <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-1">Growth → Type {d.arrows.growth.number}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{d.arrows.growth.desc}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
              <p className="text-xs font-bold text-red-500 dark:text-red-400 mb-1">Stress → Type {d.arrows.stress.number}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{d.arrows.stress.desc}</p>
            </div>
          </div>

          <SectionTitle>Core Traits</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {d.traits.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </>
      )}
    </div>
  )
}

// ─── ProScan Detail ───
function ProScanDetail({ mode }) {
  const d = proscanData
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{d.summary}</p>

      <SectionTitle>Behavioral Traits</SectionTitle>
      {Object.entries(d.traits).map(([trait, vals], i) => (
        <ProScanBar key={trait} trait={trait} basic={vals.basic} priority={vals.priority} predictor={vals.predictor} index={i} />
      ))}

      {mode === 'full' && (
        <>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Logic Style</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{d.logic.style}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{d.logic.desc}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Energy Style</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{d.energy.style} — {d.energy.level}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{d.energy.desc}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Communication</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{d.communication.style}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{d.communication.desc}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Leadership</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{d.leadership.style}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{d.leadership.desc}</p>
            </div>
          </div>

          <SectionTitle>Unique Trait Pairs</SectionTitle>
          <div className="space-y-2">
            {d.uniquePairs.map(p => (
              <div key={p.name} className="flex items-start gap-2">
                <span className="text-xs font-bold shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>•</span>
                <div>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{p.name}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400"> — {p.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <SectionTitle>Backup Behavior</SectionTitle>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
            {d.backup}
          </p>
        </>
      )}
    </div>
  )
}

// ─── I.D. Drives Detail ───
function IDDrivesDetail({ mode }) {
  const d = idDrivesData
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{d.summary}</p>

      <SectionTitle>Drive Spectrum</SectionTitle>
      {d.drives.map((dr, i) => (
        <div key={dr.name}>
          <DriveSpectrum name={dr.name} score={dr.score} direction={dr.direction} index={i} />
          {mode === 'full' && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 -mt-2 ml-1">{dr.desc}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Big Five Detail ───
function BigFiveDetail({ mode }) {
  const d = bigFiveData
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{d.summary}</p>

      <SectionTitle>Factors</SectionTitle>
      {d.factors.map((f, i) => (
        <div key={f.name} className="mb-4">
          <PercentileBar label={f.name} value={f.percentile} index={i} />
          <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1 ml-1 mb-2">{f.desc}</p>

          {mode === 'full' && (
            <div className="ml-4 border-l-2 border-slate-100 dark:border-slate-700 pl-4">
              {f.aspects.map((a, j) => (
                <div key={a.name} className="mb-3">
                  <PercentileBar label={a.name} value={a.percentile} index={i * 2 + j} />
                  <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1 ml-1">{a.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Dispatcher ───
const DETAIL_MAP = {
  mbti: MBTIDetail,
  disc: DISCDetail,
  enneagram: EnneagramDetail,
  proscan: ProScanDetail,
  bigfive: BigFiveDetail,
  id_drives: IDDrivesDetail,
}

export default function AssessmentDetail({ assessmentId, mode }) {
  const DetailComponent = DETAIL_MAP[assessmentId]
  if (!DetailComponent) return null

  const assessment = allAssessments.find(a => a.id === assessmentId)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 animate-fadeUp">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{assessment.icon}</span>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>{assessment.name}</h3>
          <p className="text-xs text-slate-400">{assessment.source}</p>
        </div>
      </div>
      <DetailComponent mode={mode} />
    </div>
  )
}
