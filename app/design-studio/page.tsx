import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import Image from 'next/image'
import { MediaSlot } from '@/components/media-slot'
import { ProjectActions } from '@/components/project-actions'
import { TechTags } from '@/components/tech-tags'
import { designProjects, isDesignConcept } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Design Studio',
  description: 'Responsive websites and interface concepts: Olive & Vine, Mangata & Gallo, and the Synergy fitness app concept.',
}

export default function DesignStudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination 05"
        title="Design Studio"
        description="Responsive websites and interface concepts, with notes on the layout, typography, and color decisions behind each one."
        accentVar="--accent-design"
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12">
        {designProjects.map((p) => {
          const concept = isDesignConcept(p)
          return (
            <article key={p.slug} className="grid gap-6 rounded-2xl border border-border bg-card/80 p-6 md:p-8 lg:grid-cols-5">
              <div className="flex flex-col gap-4 lg:col-span-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-design">{p.category}</span>
                  {concept && (
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                      Concept / prototype
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{p.title}</h2>
                  {p.subtitle && <p className="text-sm text-muted-foreground">{p.subtitle}</p>}
                </div>
                <p className="leading-relaxed text-muted-foreground">{p.summary}</p>
                <TechTags items={p.tech} />
                {!concept && <ProjectActions project={p} />}
              </div>
              <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
                {p.sections?.map((s) => (
                  <div key={s.heading} className="rounded-xl border border-border bg-background/50 p-4">
                    <dt className="font-heading text-sm font-medium">{s.heading}</dt>
                    {s.body.map((b) => (
                      <dd key={b} className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {b}
                      </dd>
                    ))}
                  </div>
                ))}
              </dl>
              {p.media?.src && (
                <div className="relative overflow-hidden rounded-xl border border-border lg:col-span-5">
                  <Image
                    src={p.media.src}
                    alt={p.media.alt}
                    width={p.media.width}
                    height={p.media.height}
                    className="h-auto w-full object-cover"
                  />
                <p className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  {p.media.caption}
                </p>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}
