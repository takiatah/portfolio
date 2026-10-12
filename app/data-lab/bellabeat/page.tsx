import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { ProjectActions } from '@/components/project-actions'
import { TechTags } from '@/components/tech-tags'
import {
  bellabeatDashboards,
  bellabeatLinks,
  bellabeatProject,
  exerciseRecommendation,
  limitations,
  recommendations,
  stepActivityLevels,
  verifiedFindings,
  weeklyAverages,
} from '@/lib/bellabeat'

export const metadata: Metadata = {
  title: 'Bellabeat Case Study — Fitbit Activity and Sleep',
  description: bellabeatProject.summary,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

function DashboardFigure({
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
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full bg-white object-contain" />
      <figcaption className="flex flex-col gap-2 border-t border-border px-4 py-3 text-sm">
        <span>{caption}</span>
        <a
          href={bellabeatLinks.tableau}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline"
        >
          Open interactive Tableau workbook
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  )
}

export default function BellabeatPage() {
  const [classification, hourlyWeekly, sleep] = bellabeatDashboards

  return (
    <>
      <PageHero
        eyebrow={bellabeatProject.category}
        title={bellabeatProject.title}
        description={bellabeatProject.summary}
        accentVar="--accent-data"
        backHref="/data-lab"
        backLabel="Back to Data Lab"
      >
        <div className="mt-6 flex flex-col gap-4">
          <TechTags items={bellabeatProject.tech} />
          <ProjectActions project={bellabeatProject} />
        </div>
      </PageHero>

      <article className="mx-auto max-w-5xl px-4 py-12">
        <Section title="Overview">
          <p>
            This Google Data Analytics capstone analyzes how consumers use smart fitness devices, using Fitbit activity
            and sleep records. The work combines Python (Pandas) for cleaning, SQL for exploratory queries, and Tableau
            for the published dashboards below.
          </p>
        </Section>

        <Section title="Problem / business question">
          <p>
            Bellabeat is a high-tech wellness company that manufactures health-focused smart products for women. The
            company wants to better understand how consumers use smart fitness devices and use those insights to support
            future marketing decisions.
          </p>
          <p>
            The case-study goal is to identify behavioral trends in Fitbit activity and sleep data and recommend how
            marketing and the Bellabeat app could improve engagement.
          </p>
        </Section>

        <Section title="Dataset and source">
          <p>
            Source:{' '}
            <a href={bellabeatLinks.dataset} target="_blank" rel="noreferrer" className="text-foreground underline">
              Fitbit Fitness Tracker Data
            </a>{' '}
            by Möbius on Kaggle (CC0 public domain). Respondents to a distributed Amazon Mechanical Turk survey
            contributed data between 12 March 2016 and 12 May 2016.
          </p>
          <p>
            The notebook uses daily activity for two export windows (12 Mar–11 Apr and 12 Apr–12 May), hourly calories,
            intensities, and steps for the same windows, and daily sleep from the April–May window.
          </p>
        </Section>

        <Section title="Cleaning and preparation">
          <p>
            Daily activity files from the two months were concatenated, then duplicate <code>Id</code> +{' '}
            <code>ActivityDate</code> rows on the overlapping 12 April 2016 date were dropped, keeping the later export.
            Dates were parsed and a day-of-week column was added.
          </p>
          <p>
            Hourly calories, intensities, and steps were inner-joined on <code>Id</code> and <code>ActivityHour</code>{' '}
            within each month, stacked, and de-duplicated. Hours were converted to datetime, with a 12-hour clock label
            for charts. Sleep rows were parsed and de-duplicated on <code>Id</code> + <code>SleepDay</code>.
          </p>
          <p>
            The cleaned tables were exported to a SQLite database (<code>daily_activity</code>,{' '}
            <code>hourly_activity</code>, <code>sleep_day</code>) for the SQL analysis.
          </p>
        </Section>

        <Section title="Methodology">
          <p>
            SQL aggregations produced per-user averages, day-of-week summaries, and weekday vs. weekend hourly
            profiles. Users were classified two ways:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Exercise minutes: average of <code>FairlyActiveMinutes + 2 × VeryActiveMinutes</code>, compared with a
              21.4-minute daily threshold for recommended moderate-equivalent activity.
            </li>
            <li>
              Step volume: average daily steps, using sedentary / low active / somewhat active / active / highly active
              cutoffs at 5,000, 7,500, 10,000, and 12,500 steps.
            </li>
          </ul>
          <p>
            Sleep hours were joined to daily activity on user and date. Sedentary minutes were converted to hours and
            plotted against hours asleep. Tableau dashboards present those query results.
          </p>
        </Section>
      </article>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-4">
        <Section title="Interactive charts">
          <p>
            Screenshots of the published Tableau workbook are shown one dashboard at a time. Use the Tableau link on
            each figure for the interactive views.
          </p>
        </Section>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-12">
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{classification.title}</h3>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            Exercise-minute classification and step-volume classification disagree in an important way: most users meet
            the moderate-equivalent minute threshold, but most still average fewer than 10,000 steps.
          </p>
          <DashboardFigure {...classification} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Users meeting recommended exercise minutes</caption>
                <thead className="bg-secondary/60 text-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Exercise minutes
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Users
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exerciseRecommendation.map((row) => (
                    <tr key={row.label} className="border-t border-border">
                      <th scope="row" className="px-4 py-3 font-medium text-foreground">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-right tabular-nums">{row.users}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{row.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Users classified by average daily steps</caption>
                <thead className="bg-secondary/60 text-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Step activity
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Users
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stepActivityLevels.map((row) => (
                    <tr key={row.label} className="border-t border-border">
                      <th scope="row" className="px-4 py-3 font-medium text-foreground">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-right tabular-nums">{row.users}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{row.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{hourlyWeekly.title}</h3>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            Saturday is the peak activity day. Sunday is the trough. Weekday hourly charts rise into the evening (about
            5–7 PM); weekend hourly charts are higher around midday (about 12–2 PM).
          </p>
          <DashboardFigure {...hourlyWeekly} />
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Average steps, intensity, and sleep by day of week</caption>
              <thead className="bg-secondary/60 text-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Day
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Avg. steps
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Avg. intensity
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">
                    Avg. hours asleep
                  </th>
                </tr>
              </thead>
              <tbody>
                {weeklyAverages.map((row) => (
                  <tr key={row.day} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 font-medium text-foreground">
                      {row.day}
                    </th>
                    <td className="px-4 py-3 text-right tabular-nums">{row.steps.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.intensity.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.sleepHours.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            Steps and intensity are from the hourly/weekly Tableau dashboard. Sleep hours are from the sleep dashboard
            (next section).
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{sleep.title}</h3>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            Only Sunday’s average (7.55 hours) sits inside the 7–9 hour band marked on the dashboard. The scatter of
            sedentary hours versus hours asleep slopes downward: more sitting is associated with less sleep in this
            sample. That is an observed association, not a causal claim.
          </p>
          <DashboardFigure {...sleep} />
        </section>
      </div>

      <article className="mx-auto max-w-5xl px-4 pb-16">
        <Section title="Verified findings">
          <ul className="list-disc space-y-2 pl-5">
            {verifiedFindings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-sm">
            Findings and recommendations below are taken from the project README and the Tableau dashboards. They are
            not re-estimated on this page.
          </p>
        </Section>

        <Section title="Recommendations">
          <ol className="list-decimal space-y-3 pl-5">
            {recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Section>

        <Section title="Limitations">
          <ul className="list-disc space-y-2 pl-5">
            {limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Tools used">
          <p>Python, Pandas, NumPy, SQL (SQLite), Tableau, and Kaggle Jupyter notebooks.</p>
        </Section>

        <Section title="Notebook and repository">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <a href={bellabeatLinks.notebook} target="_blank" rel="noreferrer" className="text-foreground underline">
                Kaggle notebook
              </a>
            </li>
            <li>
              <a href={bellabeatLinks.repo} target="_blank" rel="noreferrer" className="text-foreground underline">
                GitHub repository
              </a>
            </li>
            <li>
              <a href={bellabeatLinks.tableau} target="_blank" rel="noreferrer" className="text-foreground underline">
                Tableau Public workbook
              </a>
            </li>
          </ul>
        </Section>
      </article>
    </>
  )
}
