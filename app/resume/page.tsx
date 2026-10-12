import type { Metadata } from 'next'
import { Award, Download, ExternalLink, GraduationCap } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { certificates } from '@/lib/certificates'
import {
  RESUME_PDF,
  accomplishments,
  education,
  experience,
  resumeProjects,
  resumeSkills,
  resumeSummary,
} from '@/lib/resume'

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Résumé of Takia Tahmid, Computer Science student at the University at Buffalo and Data Science Research Assistant.',
}

function SectionCard({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  const id = title.toLowerCase().replace(/\s+/g, '-')
  return (
    <section aria-labelledby={id} className={`flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-6 ${className}`}>
      <h2 id={id} className="text-xl font-semibold">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function ResumePage() {
  return (
    <>
      <PageHero eyebrow="Résumé" title="Résumé" description={resumeSummary} accentVar="--accent-skills" />

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12">
        <div className="flex flex-wrap gap-3">
          <a
            href={RESUME_PDF}
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Download className="size-4" aria-hidden="true" />
            Download PDF
          </a>
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Open in new tab
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <SectionCard title="Experience">
              <ol className="flex flex-col gap-6">
                {experience.map((job) => (
                  <li key={job.role} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="font-medium">{job.role}</h3>
                      <p className="shrink-0 font-mono text-xs text-muted-foreground">{job.dates}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.org}</p>
                    <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-skills">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard title="Relevant Projects">
              <ul className="grid gap-4 sm:grid-cols-2">
                {resumeProjects.map((p) => (
                  <li key={p.name} className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium">{p.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <div className="flex flex-col gap-6">
            <SectionCard title="Education">
              <div className="flex gap-3">
                <GraduationCap className="mt-0.5 size-5 shrink-0 text-skills" aria-hidden="true" />
                <div className="flex flex-col gap-0.5 text-sm">
                  <p className="font-medium">{education.school}</p>
                  <p className="text-muted-foreground">{education.degree}</p>
                  <p className="text-muted-foreground">
                    GPA {education.gpa} · {education.expected}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">Coursework</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {education.coursework.map((c) => (
                    <li key={c} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionCard>

            <SectionCard title="Certifications">
              <ul className="flex flex-col gap-3">
                {certificates.map((c) => (
                  <li key={c.title} className="flex gap-3 text-sm">
                    <Award className="mt-0.5 size-4 shrink-0 text-skills" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-muted-foreground">
                        {c.issuer} · {c.status === 'completed' ? c.completed : 'In progress'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Skills">
              <dl className="flex flex-col gap-3">
                {resumeSkills.map((group) => (
                  <div key={group.label}>
                    <dt className="text-sm font-medium">{group.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{group.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>

            <SectionCard title="Accomplishments">
              <ul className="flex flex-wrap gap-1.5">
                {accomplishments.map((a) => (
                  <li key={a} className="rounded-full border border-border px-2.5 py-0.5 text-sm text-muted-foreground">
                    {a}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        </div>
      </div>
    </>
  )
}
