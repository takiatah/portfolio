'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { destinations, type Destination } from '@/lib/destinations'
import { ConstellationGlyph, Planet } from '@/components/celestial'
import { cn } from '@/lib/utils'

const ZOOM_MS = 260

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Universe() {
  const router = useRouter()
  const [launching, setLaunching] = useState<Destination['id'] | null>(null)

  const launch = (event: React.MouseEvent<HTMLAnchorElement>, d: Destination) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    event.preventDefault()
    router.prefetch(d.href)
    if (prefersReducedMotion()) {
      router.push(d.href)
      return
    }
    setLaunching(d.id)
    window.setTimeout(() => router.push(d.href), ZOOM_MS)
  }

  return (
    <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-6xl md:block">
      <svg aria-hidden="true" viewBox="0 0 100 56.25" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <ellipse cx="50" cy="28" rx="44" ry="20" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.15" />
        <ellipse cx="50" cy="28" rx="30" ry="13" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.15" />
      </svg>

      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="mx-auto size-20 rounded-full bg-skills/80 shadow-[0_0_80px_20px_var(--accent-skills)] opacity-70" />
      </div>

      <ul className="absolute inset-0">
        {destinations.map((d) => {
          const isLaunching = launching === d.id
          const isConstellation = d.kind === 'constellation'
          return (
            <li
              key={d.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${d.map.x}%`, top: `${d.map.y}%`, width: `${d.map.size}%` }}
            >
              <Link
                href={d.href}
                onClick={(e) => launch(e, d)}
                className={cn(
                  'group flex flex-col items-center gap-3 rounded-2xl p-2 text-center outline-none transition-[transform,opacity] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ring',
                  launching && !isLaunching && 'opacity-30',
                  isLaunching && 'scale-[1.6]',
                )}
              >
                {isConstellation ? (
                  <ConstellationGlyph
                    accentVar={d.accentVar}
                    className={cn(
                      'w-full transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110',
                      isLaunching && 'scale-125',
                    )}
                  />
                ) : (
                  <Planet
                    accentVar={d.accentVar}
                    ringed={d.id === 'research' || d.id === 'design'}
                    className="w-full transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105"
                  />
                )}
                <span className="whitespace-nowrap font-heading text-sm font-medium">{d.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function DestinationCards() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 md:hidden">
      {destinations.map((d) => (
        <li key={d.id}>
          <Link
            href={d.href}
            className="flex items-center gap-4 rounded-xl border border-border bg-card/70 p-4 transition-colors hover:bg-accent"
          >
            {d.kind === 'constellation' ? (
              <ConstellationGlyph accentVar={d.accentVar} className="size-14 shrink-0" />
            ) : (
              <Planet accentVar={d.accentVar} className="size-12 shrink-0" />
            )}
            <span className="min-w-0">
              <span className="block font-heading font-medium">{d.name}</span>
              <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{d.description}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
