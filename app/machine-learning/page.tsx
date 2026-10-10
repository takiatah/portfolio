import type { Metadata } from 'next'
import { FlaskConical } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { futureMlExperiments, titanicProject, titanicResults } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Machine Learning Lab',
  description: 'Supervised learning experiments and Kaggle competitions, including Titanic survival prediction.',
}

export default function MachineLearningPage() {
  const best = titanicResults.reduce((a, b) => (b.validationAccuracy > a.validationAccuracy ? b : a))

  return (
    <>
      <PageHero
        eyebrow="Destination 02"
        title="Machine Learning Lab"
        description="Supervised learning experiments and Kaggle competitions, documented from problem definition to lessons learned."
        accentVar="--accent-ml"
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProjectCard project={titanicProject} accentVar="--accent-ml" href="/machine-learning/titanic" featured>
            <dl className="grid grid-cols-3 gap-3 rounded-xl border border-border bg-background/50 p-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Problem</dt>
                <dd className="font-medium">Binary classification</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Best model</dt>
                <dd className="font-medium">XGBoost</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Validation acc.</dt>
                <dd className="font-medium tabular-nums">{(best.validationAccuracy * 100).toFixed(1)}%</dd>
              </div>
            </dl>
          </ProjectCard>
        </div>
        <aside className="flex flex-col gap-4 rounded-2xl border border-dashed border-border p-6">
          <span className="flex size-10 items-center justify-center rounded-full bg-ml/15 text-ml">
            <FlaskConical className="size-5" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-semibold">More experiments in orbit</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This lab has room for future Kaggle competitions and experiments as they are completed.
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {futureMlExperiments.map((e) => (
              <li key={e} className="flex items-center gap-2 text-muted-foreground">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ml" />
                {e}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  )
}
