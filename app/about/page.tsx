import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, GraduationCap } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { certificates } from '@/lib/certificates'
import { skillsSummary } from '@/lib/skills'
import { accomplishments, education, experience } from '@/lib/resume'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Takia Tahmid: Computer Science student at the University at Buffalo and Data Science Research Assistant working across data, machine learning, and software.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Takia Tahmid"
        description="I'm a third-year Computer Science student at the University at Buffalo and a Data Science Research Assistant, working across software development, web development, machine learning, and data engineering."
        accentVar="--accent-skills"
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-6">
            <h2 className="text-xl font-semibold">What I work on</h2>
            <p className="leading-relaxed text-muted-foreground">
              In Dr. Zhuang&apos;s research group I clean and analyze government macroeconomic datasets and build machine
              learning models that evaluate international trade risk and anticipate disruptions in global supply chains. I
              also tutor at UB Math Place, and previously led weekly recitations on proofs and graph theory as a Computer
              Science teaching assistant.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Outside research, my projects range from exploratory sales analysis in Python and SQL and Kaggle competitions to
              a dynamic memory allocator and chat-server serialization in C, a text adventure in OCaml, and responsive
              websites. ORBIT collects that work in one place, with each destination focused on a different kind of problem.
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
              <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
                <Link href="/skills" className="hover:underline">
                  See the full Skills Constellation
                </Link>
                <Link href="/resume" className="hover:underline">
                  View résumé
                </Link>
              </div>
            </div>
          </section>

          <section aria-labelledby="experience" className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6">
            <h2 id="experience" className="text-xl font-semibold">Experience</h2>
            <ul className="flex flex-col gap-3">
              {experience.map((job) => (
                <li key={job.role} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <p className="text-sm">
                    <span className="font-medium">{job.role}</span>
                    <span className="text-muted-foreground"> · {job.org}</span>
                  </p>
                  <p className="shrink-0 font-mono text-xs text-muted-foreground">{job.dates}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section aria-labelledby="education" className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-6">
            <h2 id="education" className="text-xl font-semibold">Education</h2>
            <div className="flex gap-3 text-sm">
              <GraduationCap className="mt-0.5 size-5 shrink-0 text-skills" aria-hidden="true" />
              <div>
                <p className="font-medium">{education.school}</p>
                <p className="text-muted-foreground">
                  {education.degree} · GPA {education.gpa}
                </p>
                <p className="text-muted-foreground">{education.expected}</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="certificates" className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-6">
            <h2 id="certificates" className="text-xl font-semibold">Certificates</h2>
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
          </section>

          <section aria-labelledby="honors" className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-6">
            <h2 id="honors" className="text-xl font-semibold">Honors</h2>
            <ul className="flex flex-wrap gap-1.5">
              {accomplishments.map((a) => (
                <li key={a} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
