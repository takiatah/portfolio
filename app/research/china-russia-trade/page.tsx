import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { GprChart } from '@/components/research/gpr-chart'
import { TradeConcentration } from '@/components/research/trade-concentration'
import { externalLinks } from '@/lib/links'

export const metadata: Metadata = {
  title: 'China–Russia Trade Relations',
  description:
    'Interactive dashboard of the Geopolitical Risk Index for China and Russia, with a methodology for measuring bilateral trade concentration.',
}

function Panel({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-5 md:p-8">
      <div>
        <h2 id={id} className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

export default function ChinaRussiaTradePage() {
  return (
    <>
      <PageHero
        eyebrow="Research dashboard"
        title="China–Russia Trade Relations"
        description="How has geopolitical risk evolved for China and Russia, and how concentrated is the trade between them? This dashboard brings together a long-run risk index and a framework for measuring commodity concentration."
        accentVar="--accent-research"
        backHref="/research"
        backLabel="Back to Research Observatory"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12">
        <Panel
          id="gpr"
          title="Geopolitical Risk Index"
          description="The country-specific Geopolitical Risk (GPR) Index measures the share of newspaper articles that discuss adverse geopolitical events and mention a given country. Higher values mean more coverage of geopolitical tension involving that country."
        >
          <GprChart />
          <details className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground">Source and methodology</summary>
            <div className="mt-3 flex flex-col gap-2 leading-relaxed">
              <p>
                Source: Caldara, Dario and Matteo Iacoviello (2022), “Measuring Geopolitical Risk,” <em>American Economic Review</em>,
                112(4): 1194–1225. Data from{' '}
                <a href={externalLinks.gprDataset} target="_blank" rel="noreferrer" className="text-foreground underline">
                  matteoiacoviello.com/gpr.htm
                </a>
                .
              </p>
              <p>
                Series shown: the historical country-specific indices <code>GPRHC_CHN</code> and <code>GPRHC_RUS</code>, built from
                three newspapers with coverage back to 1900. Values are monthly and expressed as a percentage of all articles in
                those newspapers. They are plotted exactly as published, without smoothing or rescaling.
              </p>
              <p>
                Interpret with care: the index reflects English-language newspaper coverage, so it measures perceived risk rather
                than conflict events directly.
              </p>
            </div>
          </details>
        </Panel>

        <Panel
          id="concentration"
          title="Trade concentration"
          description="How dependent is each side on a few product categories? Concentration is summarized by each category’s share of reported trade, the combined share of the top N categories, and the Herfindahl–Hirschman Index (HHI)."
        >
          <TradeConcentration />
          <details className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <summary className="cursor-pointer font-medium text-foreground">Methodology</summary>
            <div className="mt-3 flex flex-col gap-2 leading-relaxed">
              <p>
                Each category’s share is its trade value divided by the total of all reported categories for the selected
                country, flow, and year. If the data includes a residual “Other” category, it stays in the denominator and is
                treated as one category. Shares are never renormalized to hide missing categories.
              </p>
              <p>
                The HHI is the sum of squared category shares, with shares in percent, giving a scale from near 0 (trade spread
                evenly across many categories) to 10,000 (all trade in one category). Values below 1,500 are labelled
                unconcentrated, 1,500–2,500 moderately concentrated, and above 2,500 highly concentrated.
              </p>
              <p>The HHI depends on how finely categories are defined, so only compare values that use the same classification.</p>
            </div>
          </details>
        </Panel>
      </div>
    </>
  )
}
