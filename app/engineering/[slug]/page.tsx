import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MediaSlot } from '@/components/media-slot'
import { PageHero } from '@/components/page-hero'
import { ProjectActions } from '@/components/project-actions'
import { TechTags } from '@/components/tech-tags'
import { engineeringProjects } from '@/lib/projects'

export function generateStaticParams() {
  return engineeringProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = engineeringProjects.find((p) => p.slug === slug)
  return project ? { title: project.title, description: project.summary } : {}
}

export default async function EngineeringProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = engineeringProjects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.subtitle ? `${project.subtitle}. ${project.summary}` : project.summary}
        accentVar="--accent-engineering"
        backHref="/engineering"
        backLabel="Back to Engineering Bay"
      >
        <div className="mt-6 flex flex-col gap-4">
          <TechTags items={project.tech} />
          <ProjectActions project={project} />
        </div>
      </PageHero>

      <article className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        {project.media && <MediaSlot media={project.media} accentVar="--accent-engineering" />}
        {project.sections?.map((s) => (
          <section key={s.heading} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            {s.body.length > 2 ? (
              <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
                {s.body.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : (
              s.body.map((b) => (
                <p key={b} className="leading-relaxed text-muted-foreground">
                  {b}
                </p>
              ))
            )}
          </section>
        ))}
      </article>
    </>
  )
}
