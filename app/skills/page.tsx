import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SkillsConstellation } from '@/components/skills-constellation'

export const metadata: Metadata = {
  title: 'Skills Constellation',
  description:
    'The tools and technologies I use to analyze data, build models, engineer software, and create digital experiences.',
}

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination 06"
        title="Skills Constellation"
        description="The tools and technologies I use to analyze data, build models, engineer software, and create digital experiences."
        accentVar="--accent-skills"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SkillsConstellation />
      </section>
    </>
  )
}
