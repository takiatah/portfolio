
import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { ProjectActions } from '@/components/project-actions'
import { TechTags } from '@/components/tech-tags'
import {
  onlineRetailLinks,
  onlineRetailProject,
  retailLimitations,
  retailRecommendations,
  retailVerifiedFindings,
  retailVisualizations,
} from '@/lib/online-retail'

export const metadata: Metadata = {
  title: 'Online Retail Sales Analysis',
  description: onlineRetailProject.summary,
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

function VisualizationFigure({
  title,
  src,
  alt,
  caption,
}: {
  title: string
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-secondary/40 px-4 py-3">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </div>

      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size visualization: ${title}`}
        className="block bg-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-auto w-full object-contain"
        />
      </a>

      <figcaption className="border-t border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}

export default function OnlineRetailPage() {
  return (
    <>
      <PageHero
        eyebrow={onlineRetailProject.category}
        title={onlineRetailProject.title}
        description={onlineRetailProject.summary}
        accentVar="--accent-data"
        backHref="/data-lab"
        backLabel="Back to Data Lab"
      >
        <div className="mt-6 flex flex-col gap-4">
          <TechTags items={onlineRetailProject.tech} />
          <ProjectActions project={onlineRetailProject} />
        </div>
      </PageHero>

      <article className="mx-auto max-w-5xl px-4 py-12">
        <Section title="Overview">
          <p>
            This project explores transactional data from an online retailer
            to understand sales performance, customer purchasing behavior,
            product category contributions, and geographic order distribution.
            Using Python and Pandas for data preparation and analysis, the
            project turns raw transaction records into visualizations and
            business recommendations.
          </p>
        </Section>

        <Section title="Problem / business questions">
          <p>
            Transaction-level sales data can reveal more than total revenue.
            Examining customer behavior, product categories, monthly trends,
            cancellations, and order locations helps identify where sales
            originate and where the business may have opportunities to improve.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>How concentrated is revenue among the retailer's customers?</li>
            <li>How does revenue change from month to month?</li>
            <li>Which product categories contribute most to revenue?</li>
            <li>How do category-level revenue patterns change over time?</li>
            <li>Which categories account for the most cancellations?</li>
            <li>How are orders distributed geographically?</li>
          </ul>
        </Section>

        <Section title="Dataset and source">
          <p>
            The project uses the Online Retail transaction dataset. Records
            contain sales-related information such as invoices, product
            identifiers and descriptions, quantities, unit prices, customer
            identifiers, dates, and countries.
          </p>
          <p>
            The analysis focuses on historical retail transactions. See the
            project notebook for the precise date range, data filters, and
            cleaning decisions used in the calculations.
          </p>
        </Section>

        <Section title="Cleaning and preparation">
          <p>
            The data preparation workflow uses Pandas to inspect transaction
            records, prepare fields for analysis, and calculate sales metrics.
            Invoice dates must be parsed consistently to support monthly
            aggregation, while quantity and unit-price fields are used to
            calculate transaction-level revenue.
          </p>
          <p>
            Customer, product, invoice, and country fields provide the
            dimensions needed to examine customer contributions, category
            performance, cancellations, and geographic distribution.
          </p>
          <p>
            Cleaning decisions and exclusions should be interpreted alongside
            the notebook, particularly where cancelled invoices, invalid
            transactions, missing customer identifiers, or unusual prices
            affect a metric.
          </p>
        </Section>

        <Section title="Methodology">
          <p>
            The analysis aggregates transaction data across several business
            dimensions to make performance easier to compare.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Customer analysis:</strong>{' '}
              measures revenue concentration among customers and compares
              customer groups.
            </li>
            <li>
              <strong className="text-foreground">Time-series analysis:</strong>{' '}
              groups revenue by month to examine changes and possible
              seasonal patterns.
            </li>
            <li>
              <strong className="text-foreground">Category analysis:</strong>{' '}
              compares revenue across product categories and tracks their
              performance over time.
            </li>
            <li>
              <strong className="text-foreground">Cancellation analysis:</strong>{' '}
              groups cancellation activity by category to identify patterns
              that may deserve further investigation.
            </li>
            <li>
              <strong className="text-foreground">Geographic analysis:</strong>{' '}
              summarizes order activity by country and presents its
              distribution on a map.
            </li>
          </ul>
        </Section>
      </article>

      <div className="mx-auto max-w-5xl px-4 pb-12">
        <Section title="Visualizations">
          <p>
            Six visualizations explore the retailer's customer base, revenue
            trends, product category performance, cancellations, and
            international orders. Select any image to open it at full size.
          </p>
        </Section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {retailVisualizations.map((visualization) => (
            <VisualizationFigure
              key={visualization.src}
              {...visualization}
            />
          ))}
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-4 pb-16">
        <Section title="Verified findings">
          <ul className="list-disc space-y-3 pl-5">
            {retailVerifiedFindings.map((finding) => (
              <li key={finding}>{finding}</li>
            ))}
          </ul>
        </Section>

        <Section title="Recommendations">
          <ol className="list-decimal space-y-3 pl-5">
            {retailRecommendations.map((recommendation) => (
              <li key={recommendation}>{recommendation}</li>
            ))}
          </ol>
        </Section>

        <Section title="Limitations">
          <ul className="list-disc space-y-2 pl-5">
            {retailLimitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </Section>

        <Section title="Tools used">
          <p>
            Python, Pandas, NumPy, Matplotlib, SQL, and Kaggle notebooks.
          </p>
          <p>
            The page presents static visualization images; it does not embed
            an interactive Tableau dashboard.
          </p>
        </Section>

        <Section title="Notebook and repository">
          <div className="flex flex-col items-start gap-3">
            <a
              href={onlineRetailLinks.notebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-foreground underline underline-offset-4"
            >
              View Kaggle notebook
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
            <a
              href={onlineRetailLinks.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-foreground underline underline-offset-4"
            >
              View GitHub repository
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Section>
      </article>
    </>
  )
}
