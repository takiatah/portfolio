import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ProjectActions } from '@/components/project-actions'
import { TechTags } from '@/components/tech-tags'
import { titanicFeatures, titanicProject, titanicResults } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Titanic Predictions — Kaggle Case Study',
  description:
    'A case study of the Kaggle Titanic competition: features, preprocessing, Random Forest and XGBoost models, and validation results.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function TitanicPage() {
  const maxAcc = Math.max(...titanicResults.map((r) => r.validationAccuracy))

  return (
    <>
      <PageHero
        eyebrow={titanicProject.category}
        title="Titanic Predictions"
        description={titanicProject.summary}
        accentVar="--accent-ml"
        backHref="/machine-learning"
        backLabel="Back to Machine Learning Lab"
      >
        <div className="mt-6 flex flex-col gap-4">
          <TechTags items={titanicProject.tech} />
          <ProjectActions project={titanicProject} />
        </div>
      </PageHero>

      <article className="mx-auto max-w-5xl px-4 py-12">
        <Section title="Problem">
          <p>
            The Kaggle Titanic competition asks for a model that predicts whether each passenger survived the sinking.
            The training set contains 891 labelled passengers; predictions are submitted for a separate test set of 418
            passengers.
          </p>
        </Section>

        <Section title="Dataset and features">
          <p>The notebook uses four columns from the passenger records as model inputs:</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {titanicFeatures.map((f) => (
              <li key={f.name} className="rounded-lg border border-border bg-card/60 p-3">
                <code className="font-mono text-sm text-ml">{f.name}</code>
                <p className="text-sm">{f.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Preprocessing">
          <p>
            Categorical inputs are converted to numeric form with one-hot encoding (<code>pd.get_dummies</code>). The
            same encoding is applied to the training and test data so their columns line up.
          </p>
          <p>
            The labelled data is split into a training set and a held-out validation set of 179 passengers (20%), which is
            used to compare models before predicting on the competition test set.
          </p>
        </Section>

        <Section title="Models">
          <p>
            Two tree-based classifiers were trained on the same features: a scikit-learn Random Forest as a baseline and an
            XGBoost gradient-boosted classifier.
          </p>
        </Section>

        <Section title="Validation results">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Validation accuracy by model</caption>
              <thead className="bg-secondary/60 text-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Model</th>
                  <th scope="col" className="px-4 py-3 font-medium">Configuration</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Validation accuracy</th>
                </tr>
              </thead>
              <tbody>
                {titanicResults.map((r) => (
                  <tr key={r.model} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 font-medium text-foreground">
                      {r.model}
                      {r.validationAccuracy === maxAcc && (
                        <span className="ml-2 rounded-full bg-ml/15 px-2 py-0.5 text-xs text-ml">Best</span>
                      )}
                    </th>
                    <td className="px-4 py-3 font-mono text-xs">{r.config}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">
                      {(r.validationAccuracy * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            On the 179-passenger validation set, XGBoost classified 142 passengers correctly versus 139 for the Random
            Forest. With a validation set this small, a three-passenger difference is suggestive rather than conclusive.
          </p>
        </Section>

        <Section title="What I learned">
          <ul className="list-disc space-y-2 pl-5">
            <li>How to frame a Kaggle problem, from loading data to producing a submission file.</li>
            <li>Why categorical features must be encoded consistently across training and test data.</li>
            <li>How to use a held-out validation set to compare models fairly before submitting.</li>
          </ul>
        </Section>

        <Section title="Next steps">
          <ul className="list-disc space-y-2 pl-5">
            <li>Engineer additional features such as age, fare, and passenger titles, handling missing values.</li>
            <li>Use cross-validation instead of a single split for more reliable comparisons.</li>
            <li>Tune hyperparameters systematically rather than fixing them by hand.</li>
          </ul>
        </Section>
      </article>
    </>
  )
}
