import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ProjectActions } from '@/components/project-actions'
import { TechTags } from '@/components/tech-tags'
import { tweetsFeatures, tweetsProject, tweetsResults } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Natural Language Processing with Disaster Tweets — Kaggle Case Study',
  description:
    'A case study of the Kaggle Titanic competition: NLP, preprocessing, Tensor Flow and DistilBERT models, and validation results.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export default function TweetsPage() {
  const maxAcc = Math.max(...tweetsResults.map((r) => r.validationAccuracy))

  return (
    <>
      <PageHero
        eyebrow={tweetsProject.category}
        title={tweetsProject.title}
        description={tweetsProject.summary}
        accentVar="--accent-ml"
        backHref="/machine-learning"
        backLabel="Back to Machine Learning Lab"
      >
        <div className="mt-6 flex flex-col gap-4">
          <TechTags items={tweetsProject.tech} />
          <ProjectActions project={tweetsProject} />
        </div>
      </PageHero>

      <article className="mx-auto max-w-5xl px-4 py-12">
        <Section title="Problem">
          <p>
            The Kaggle NLP Disaster Tweets competition asks for a model that predicts which Tweets are about real disasters and which ones are not.
            The training set contains 7613 labelled tweets; predictions are submitted for a separate test set of 3263
            tweets.
          </p>
        </Section>

        <Section title="Dataset and features">
          <p>The notebook uses only one text column as model inputs:</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {tweetsFeatures.map((f) => (
              <li key={f.name} className="rounded-lg border border-border bg-card/60 p-3">
                <code className="font-mono text-sm text-ml">{f.name}</code>
                <p className="text-sm">{f.description}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Preprocessing">
          <p>
            The labelled data is split into a training set and a held-out validation set of 20%, which is
            used to validate models before predicting on the competition test set.
          </p>
          <p>
            A DistilBert Preprocessor is loaded using the preset "distil_bert_base_en_uncased" and the sequence_length 
            is shorted to 160 because that is the max length of the tweets. It is then passed into the DistilBert model.
          </p>
        </Section>

        <Section title="Models">
          <p>
            The model used was the DistilBert natural language processing model to get 2 classes: whether the tweets were about diasters or not. 
            A learning rate of 1e-5 was used with an Adam optimizer and 2 epochs.
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
                {tweetsResults.map((r) => (
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
            The model achieved 85% accuracy on the validation set.
          </p>
        </Section>

        <Section title="What I learned">
          <ul className="list-disc space-y-2 pl-5">
            <li>How to plot learning history and compare model configurations using F1-scores.</li>
            <li>Smaller learning rates around 1e-5 ensure more accurate results.</li>
            <li>Lower epochs of 2 or 3 are better for training a pre-trained DistilBert model.</li>
          </ul>
        </Section>

        <Section title="Next steps">
          <ul className="list-disc space-y-2 pl-5">
            <li>Compare DistilBert with other types sof models.</li>
            <li>Use cross-validation instead of a single split for more reliable comparisons.</li>
            <li>Tune hyperparameters systematically rather than fixing them by hand.</li>
          </ul>
        </Section>
      </article>
    </>
  )
}
