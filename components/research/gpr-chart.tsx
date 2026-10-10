'use client'

import { useMemo, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import gprData from '@/lib/data/gpr-china-russia.json'

interface GprPoint {
  month: string
  china: number | null
  russia: number | null
}

const data = gprData as GprPoint[]
const firstYear = Number(data[0].month.slice(0, 4))
const lastYear = Number(data[data.length - 1].month.slice(0, 4))
const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i)
const latestMonth = data[data.length - 1].month

const presets = [
  { label: 'Since 1985', start: 1985 },
  { label: 'Since 2014', start: 2014 },
  { label: 'Full history', start: firstYear },
]

const CHINA = 'var(--accent-research)'
const RUSSIA = 'var(--accent-engineering)'

const formatMonth = (m: string) =>
  new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })

function seriesStats(points: GprPoint[], key: 'china' | 'russia') {
  let sum = 0
  let count = 0
  let peak: GprPoint | null = null
  for (const p of points) {
    const v = p[key]
    if (v == null) continue
    sum += v
    count++
    if (!peak || v > (peak[key] as number)) peak = p
  }
  return { mean: count ? sum / count : null, peak, peakValue: peak ? (peak[key] as number) : null }
}

export function GprChart() {
  const [start, setStart] = useState(1985)
  const [end, setEnd] = useState(lastYear)

  const filtered = useMemo(
    () =>
      data.filter((p) => {
        const y = Number(p.month.slice(0, 4))
        return y >= start && y <= end
      }),
    [start, end],
  )

  const stats = useMemo(
    () => ({ china: seriesStats(filtered, 'china'), russia: seriesStats(filtered, 'russia') }),
    [filtered],
  )

  const selectClass =
    'rounded-md border border-input bg-background px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="gpr-start" className="text-xs text-muted-foreground">
            From
          </label>
          <select
            id="gpr-start"
            className={selectClass}
            value={start}
            onChange={(e) => setStart(Math.min(Number(e.target.value), end))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="gpr-end" className="text-xs text-muted-foreground">
            To
          </label>
          <select
            id="gpr-end"
            className={selectClass}
            value={end}
            onChange={(e) => setEnd(Math.max(Number(e.target.value), start))}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div role="group" aria-label="Range presets" className="flex flex-wrap gap-2">
          {presets.map((p) => {
            const active = start === p.start && end === lastYear
            return (
              <button
                key={p.label}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setStart(p.start)
                  setEnd(lastYear)
                }}
                className="rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent aria-pressed:bg-secondary aria-pressed:text-foreground"
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </div>

      <figure className="rounded-xl border border-border bg-card/60 p-4">
        <div className="h-80 w-full md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filtered} margin={{ top: 8, right: 16, bottom: 24, left: 8 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                tickFormatter={(m: string) => m.slice(0, 4)}
                minTickGap={40}
                stroke="var(--border)"
                label={{ value: 'Month', position: 'insideBottom', offset: -16, fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                stroke="var(--border)"
                width={56}
                label={{
                  value: 'GPR (% of articles)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 4,
                  style: { textAnchor: 'middle', fill: 'var(--muted-foreground)', fontSize: 12 },
                }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--popover)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  color: 'var(--foreground)',
                }}
                labelFormatter={(m) => formatMonth(String(m))}
                formatter={(v) => (typeof v === 'number' ? v.toFixed(3) : '—')}
              />
              <Legend verticalAlign="top" height={28} wrapperStyle={{ fontSize: 13 }} />
              <Line type="monotone" dataKey="china" name="China" stroke={CHINA} dot={false} strokeWidth={1.5} isAnimationActive={false} connectNulls={false} />
              <Line type="monotone" dataKey="russia" name="Russia" stroke={RUSSIA} dot={false} strokeWidth={1.5} isAnimationActive={false} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <figcaption className="mt-2 text-xs text-muted-foreground">
          Monthly historical country-specific Geopolitical Risk Index for China and Russia, {start}–{end}. Latest
          observation: {formatMonth(latestMonth)}.
        </figcaption>
      </figure>

      <dl className="grid gap-3 sm:grid-cols-2">
        {(['china', 'russia'] as const).map((key) => {
          const s = stats[key]
          return (
            <div key={key} className="rounded-xl border border-border bg-card/60 p-4">
              <dt className="flex items-center gap-2 font-medium">
                <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: key === 'china' ? CHINA : RUSSIA }} />
                {key === 'china' ? 'China' : 'Russia'} in selected range
              </dt>
              <dd className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <span>
                  <span className="block text-muted-foreground">Mean</span>
                  <span className="tabular-nums">{s.mean != null ? s.mean.toFixed(3) : '—'}</span>
                </span>
                <span>
                  <span className="block text-muted-foreground">Peak</span>
                  <span className="tabular-nums">
                    {s.peakValue != null && s.peak ? `${s.peakValue.toFixed(3)} (${formatMonth(s.peak.month)})` : '—'}
                  </span>
                </span>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
