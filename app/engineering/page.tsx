import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { engineeringProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Engineering Bay',
  description: 'Systems, algorithms, and games built in Java, C, and OCaml.',
}

export default function EngineeringPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination 04"
        title="Engineering Bay"
        description="Systems programming, algorithms, and games built in Java, C, and OCaml. Most of these were university coursework, so their source code is private."
        accentVar="--accent-engineering"
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
        {engineeringProjects.map((p) => (
          <ProjectCard key={p.slug} project={p} accentVar="--accent-engineering" href={`/engineering/${p.slug}`} />
        ))}
      </section>
    </>
  )
}
