export const runtime = 'nodejs'

// Public FRED series this dashboard is allowed to proxy. An allowlist keeps the
// endpoint from acting as an open proxy that would burn the key on arbitrary
// requests, and this file is the only place the API key ever appears.
const ALLOW = new Set([
  // construction put in place, by segment (Census, via FRED)
  'TLMFGCONS', 'TLPWRCONS', 'TLCOMCONS', 'TLOFCONS', 'TLEDUCONS', 'TLHLTHCONS',
  'TLTRANSCONS', 'TLLODGCONS', 'TLAMUSCONS', 'TLCMUCONS', 'TLRELCONS', 'TLPSCONS',
  'TLHWYCONS', 'TLSWDCONS', 'TLWSCONS', 'TLCADCONS',
  // aggregates
  'TLNRESCONS', 'TTLCONS', 'TLRESCONS', 'PNRESCONS', 'TLPBLCONS',
  // indicators
  'MORTGAGE30US', 'WPUSI012011', 'HOUST',
])
const BASE = 'https://api.stlouisfed.org/fred/series/observations'

export async function GET(request) {
  const key = process.env.FRED_API_KEY
  if (!key) {
    return Response.json(
      { ok: false, error: 'unconfigured' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    )
  }
  const url = new URL(request.url)
  const ids = (url.searchParams.get('series') || '')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter((s) => ALLOW.has(s))
    .slice(0, 24)
  if (!ids.length) {
    return Response.json(
      { ok: false, error: 'no valid series requested' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } }
    )
  }
  const startRaw = url.searchParams.get('start') || ''
  const start = /^\d{4}-\d{2}-\d{2}$/.test(startRaw) ? startRaw : '2010-01-01'
  const fq = (url.searchParams.get('freq') || 'm').toLowerCase()
  const freq = ['m', 'q', 'a', 'w'].includes(fq) ? fq : 'm'

  try {
    const pairs = await Promise.all(
      ids.map(async (id) => {
        const q = new URLSearchParams({
          series_id: id, api_key: key, file_type: 'json',
          observation_start: start, frequency: freq, sort_order: 'asc',
        })
        const r = await fetch(`${BASE}?${q.toString()}`, { next: { revalidate: 21600 } })
        if (!r.ok) return [id, []]
        const j = await r.json()
        const obs = (j.observations || [])
          .filter((o) => o.value !== '.')
          .map((o) => [o.date, Number(o.value)])
        return [id, obs]
      })
    )
    return Response.json(
      { ok: true, start, freq, series: Object.fromEntries(pairs) },
      { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } }
    )
  } catch (e) {
    return Response.json(
      { ok: false, error: 'upstream fetch failed' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
