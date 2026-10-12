export type ReportingCountry = 'China' | 'Russia'
export type TradeDirection = 'export' | 'import'

/**
 * One observation of bilateral trade in a commodity category.
 * `value` is in current US dollars. The reporting country trades with its partner
 * (China → Russia, or Russia → China).
 */
export interface CommodityTradeRecord {
  reporter: ReportingCountry
  direction: TradeDirection
  year: number
  /** HS chapter or section label, e.g. "27 — Mineral fuels". Use "Other" for residual categories. */
  category: string
  value: number
}

/**
 * Commodity-level dataset. Empty until the real data is supplied, so the dashboard
 * renders its "dataset pending" state instead of fictional values.
 */
export const commodityTrade: CommodityTradeRecord[] = []

export interface CategoryShare {
  category: string
  value: number
  share: number
}

export interface ConcentrationSummary {
  total: number
  categories: CategoryShare[]
  topShare: number
  /** HHI on the 0–10,000 scale (shares expressed as percentages, then squared and summed). */
  hhi: number
  includesResidual: boolean
}

/**
 * Shares use the sum of all reported category values as the denominator, including any
 * residual "Other" category. Nothing is renormalized: if the supplied categories do not cover
 * total trade, the shares describe the reported categories only.
 */
export function summarizeConcentration(records: CommodityTradeRecord[], topN: number): ConcentrationSummary | null {
  const byCategory = new Map<string, number>()
  for (const r of records) byCategory.set(r.category, (byCategory.get(r.category) ?? 0) + r.value)

  const total = [...byCategory.values()].reduce((a, b) => a + b, 0)
  if (total <= 0) return null

  const categories = [...byCategory.entries()]
    .map(([category, value]) => ({ category, value, share: value / total }))
    .sort((a, b) => b.value - a.value)

  const hhi = categories.reduce((acc, c) => acc + (c.share * 100) ** 2, 0)
  const topShare = categories.slice(0, topN).reduce((acc, c) => acc + c.share, 0)

  return {
    total,
    categories,
    topShare,
    hhi,
    includesResidual: categories.some((c) => c.category.toLowerCase() === 'other'),
  }
}

export function hhiBand(hhi: number) {
  if (hhi < 1500) return 'Unconcentrated'
  if (hhi < 2500) return 'Moderately concentrated'
  return 'Highly concentrated'
}
