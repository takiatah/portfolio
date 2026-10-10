import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  accentVar: string
  backHref?: string
  backLabel?: string
  children?: React.ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  accentVar,
  backHref = '/',
  backLabel = 'Back to the universe',
  children,
}: PageHeroProps) {
  return (
    <section className="starfield relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-25 blur-3xl"
        style={{ background: `var(${accentVar})` }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {backLabel}
        </Link>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.25em]" style={{ color: `var(${accentVar})` }}>
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
        {children}
      </div>
    </section>
  )
}
