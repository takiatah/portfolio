import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
import { dataLabProjects, getDataLabCaseStudyHref } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Data Lab',
  description: 'Data cleaning, exploratory analysis, and visualization projects.',
}

export default function DataLabPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination 01"
        title="Data Lab"
        description="Cleaning, exploring, and visualizing real-world datasets to answer business questions."
        accentVar="--accent-data"
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-2">
        {dataLabProjects.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            accentVar="--accent-data"
            href={getDataLabCaseStudyHref(p.slug)}
          />
        ))}
      </section>
    </>
  )
}
