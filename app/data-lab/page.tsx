import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ProjectCard } from '@/components/project-card'
<<<<<<< HEAD
import { dataLabProjects, getDataLabCaseStudyHref } from '@/lib/projects'
=======
import { dataLabProjects } from '@/lib/projects'
>>>>>>> d0bfc794eb4f5fe4767b09c0f61e5b71fa0ee8aa

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
<<<<<<< HEAD
          <ProjectCard
            key={p.slug}
            project={p}
            accentVar="--accent-data"
            href={getDataLabCaseStudyHref(p.slug)}
          />
=======
          <ProjectCard key={p.slug} project={p} accentVar="--accent-data" />
>>>>>>> d0bfc794eb4f5fe4767b09c0f61e5b71fa0ee8aa
        ))}
      </section>
    </>
  )
}
