'use client'

import { useMemo, useState } from 'react'
import { Database } from 'lucide-react'
import {
  commodityTrade,
  hhiBand,
  summarizeConcentration,
  type ReportingCountry,
  type TradeDirection,
} from '@/lib/trade'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 })
const pct = (v: number) => `${(v * 100).toFixed(1)}%`

export function TradeConcentration() {
  const availableYears = useMemo(
    () => [...new Set(commodityTrade.map((r) => r.year))].sort((a, b) => b - a),
    [],
  )
  const [reporter, setReporter] = useState<ReportingCountry>('China')
  const [direction, setDirection] = useState<TradeDirection>('export')
  const [year, setYear] = useState<number | null>(availableYears[0] ?? null)
  const [topN, setTopN] = useState(5)

  const summary = useMemo(
    () =>
      summarizeConcentration(
        commodityTrade.filter((r) => r.reporter === reporter && r.direction === direction && r.year === year),
        topN,
      ),
    [reporter, direction, year, topN],
  )

  const hasData = commodityTrade.length > 0
  const selectClass =
    'rounded-md border border-input bg-background px-2 py-1.5 text-sm disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
  const partner = reporter === 'China' ? 'Russia' : 'China'

  return (
    <div className="flex flex-col gap-6">
      <fieldset className="flex flex-wrap items-end gap-4" disabled={!hasData}>
        <legend className="sr-only">Trade concentration filters</legend>
        <div className="flex flex-col gap-1">
          <label htmlFor="tc-reporter" className="text-xs text-muted-foreground">Reporting country</label>
          <select id="tc-reporter" className={selectClass} value={reporter} onChange={(e) => setReporter(e.target.value as ReportingCountry)}>
            <option value="China">China</option>
            <option value="Russia">Russia</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tc-direction" className="text-xs text-muted-foreground">Flow</label>
          <select id="tc-direction" className={selectClass} value={direction} onChange={(e) => setDirection(e.target.value as TradeDirection)}>
            <option value="export">Exports to {partner}</option>
            <option value="import">Imports from {partner}</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tc-year" className="text-xs text-muted-foreground">Year</label>
          <select id="tc-year" className={selectClass} value={year ?? ''} onChange={(e) => setYear(Number(e.target.value))}>
            {availableYears.length === 0 && <option value="">No years available</option>}
            {availableYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tc-topn" className="text-xs text-muted-foreground">Top-N share</label>
          <select id="tc-topn" className={selectClass} value={topN} onChange={(e) => setTopN(Number(e.target.value))}>
            {[3, 5, 10].map((n) => (
              <option key={n} value={n}>Top {n}</option>
            ))}
          </select>
        </div>
      </fieldset>

      {!hasData || !summary ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border p-8 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-research/15 text-research">
            <Database className="size-5" aria-hidden="true" />
          </span>
          <p className="font-heading font-medium">Commodity dataset pending</p>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            The concentration metrics are computed from commodity-level trade records, which have not been added yet. No
            figures are shown rather than illustrative ones. Once records are added to <code>lib/trade.ts</code>, this
            panel calculates category shares, top-N share, and the HHI automatically.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <dl className="grid gap-3 sm:grid-cols-3 lg:col-span-3">
            <div className="rounded-xl border border-border bg-card/60 p-4">
              <dt className="text-sm text-muted-foreground">Total reported trade</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums">{usd.format(summary.total)}</dd>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-4">
              <dt className="text-sm text-muted-foreground">Top {topN} categories</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums">{pct(summary.topShare)}</dd>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-4">
              <dt className="text-sm text-muted-foreground">HHI</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums">{Math.round(summary.hhi).toLocaleString()}</dd>
              <dd className="text-xs text-muted-foreground">{hhiBand(summary.hhi)}</dd>
            </div>
          </dl>
          <ul className="flex flex-col gap-2 lg:col-span-3">
            {summary.categories.slice(0, Math.max(topN, 10)).map((c) => (
              <li key={c.category} className="flex items-center gap-3 text-sm">
                <span className="w-48 shrink-0 truncate">{c.category}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span className="block h-full rounded-full bg-research" style={{ width: pct(c.share) }} />
                </span>
                <span className="w-14 text-right tabular-nums text-muted-foreground">{pct(c.share)}</span>
              </li>
            ))}
          </ul>
          {summary.includesResidual && (
            <p className="text-xs text-muted-foreground lg:col-span-3">
              Includes a residual “Other” category, which counts as a single category in the HHI.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
