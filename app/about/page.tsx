import type { Metadata } from 'next'
import Link from 'next/link'
import { Award } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { certificates } from '@/lib/certificates'
import { skillsSummary } from '@/lib/skills'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Takia Tahmid: interests in data analysis, machine learning, research, and software engineering.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Takia Tahmid"
        description="I work across data analysis, machine learning, research, and software engineering, and I enjoy building things that make information easier to understand."
        accentVar="--accent-skills"
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-3">
        <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold">What I work on</h2>
          <p className="leading-relaxed text-muted-foreground">
            My projects range from cleaning and analyzing sales data and competing on Kaggle to writing a memory allocator in C
            and designing responsive websites. ORBIT collects that work in one place, with each destination focused on a
            different kind of problem.
          </p>
          <div className="mt-2">
            <h3 className="text-sm font-medium">Core skills</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {skillsSummary.map((s) => (
                <li key={s} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
            <Link href="/skills" className="mt-3 inline-block text-sm font-medium hover:underline">
              See the full Skills Constellation
            </Link>
          </div>
        </section>

        <section aria-labelledby="certificates" className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-6">
          <h2 id="certificates" className="text-xl font-semibold">Certificates</h2>
          {certificates.length === 0 ? (
            <p className="text-sm text-muted-foreground">Certificates will be listed here as they are added.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {certificates.map((c) => (
                <li key={c.title} className="flex gap-3">
                  <Award className="mt-0.5 size-4 shrink-0 text-skills" aria-hidden="true" />
                  <div className="text-sm">
                    <p className="font-medium">
                      {c.credentialUrl ? (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="hover:underline">
                          {c.title}
                        </a>
                      ) : (
                        c.title
                      )}
                    </p>
                    <p className="text-muted-foreground">
                      {c.issuer} · {c.status === 'completed' ? `Completed${c.completed ? ` ${c.completed}` : ''}` : 'In progress'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}
