import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { profileLinks } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Résumé',
  description: 'Résumé of Takia Tahmid.',
}

export default function ResumePage() {
  return (
    <>
      <PageHero
        eyebrow="Résumé"
        title="Résumé"
        description="A downloadable résumé will be available here soon. In the meantime, my experience is on LinkedIn."
        accentVar="--accent-skills"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border p-6 sm:flex-row sm:items-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <p className="flex-1 text-sm text-muted-foreground">The résumé PDF has not been uploaded yet.</p>
          <a
            href={profileLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            View LinkedIn
          </a>
        </div>
      </section>
    </>
  )
}
