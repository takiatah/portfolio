'use client'

import { useState } from 'react'
import { experienceLabels, skillCategories, type SkillExperience } from '@/lib/skills'
import { cn } from '@/lib/utils'

const experienceStyles: Record<SkillExperience, string> = {
  applied: 'bg-foreground/10 text-foreground',
  coursework: 'border border-border text-muted-foreground',
  learning: 'border border-dashed border-border text-muted-foreground',
}

export function SkillsConstellation() {
  const [activeId, setActiveId] = useState(skillCategories[0].id)
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0]

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="relative hidden aspect-square w-full lg:col-span-2 lg:block">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full">
          {skillCategories.map((c) => (
            <line
              key={c.id}
              x1={50}
              y1={50}
              x2={c.map.x}
              y2={c.map.y}
              stroke={`var(${c.accentVar})`}
              strokeOpacity={c.id === activeId ? 0.7 : 0.2}
              strokeWidth={0.4}
              strokeDasharray={c.id === activeId ? undefined : '1 1.5'}
            />
          ))}
          <circle cx={50} cy={50} r={5} fill="var(--accent-skills)" />
          <circle cx={50} cy={50} r={9} fill="none" stroke="var(--accent-skills)" strokeOpacity={0.3} />
          {skillCategories.map((c) =>
            c.skills.map((_, i) => {
              const angle = (i / c.skills.length) * Math.PI * 2
              const radius = c.id === activeId ? 7 : 5
              return (
                <circle
                  key={`${c.id}-${i}`}
                  cx={c.map.x + Math.cos(angle) * radius}
                  cy={c.map.y + Math.sin(angle) * radius}
                  r={c.id === activeId ? 0.9 : 0.6}
                  fill={`var(${c.accentVar})`}
                  className="transition-all duration-300"
                />
              )
            }),
          )}
        </svg>
        {skillCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveId(c.id)}
            aria-pressed={c.id === activeId}
            aria-controls="skill-panel"
            className={cn(
              'absolute flex size-[14%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              c.id === activeId ? 'scale-110' : 'border-transparent',
            )}
            style={{
              left: `${c.map.x}%`,
              top: `${c.map.y}%`,
              borderColor: c.id === activeId ? `var(${c.accentVar})` : undefined,
            }}
          >
            <span className="size-3 rounded-full" style={{ background: `var(${c.accentVar})`, boxShadow: `0 0 16px var(${c.accentVar})` }} />
            <span className="sr-only">{c.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-5 lg:col-span-3">
        <div role="group" aria-label="Skill categories" className="flex flex-wrap gap-2">
          {skillCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              aria-pressed={c.id === activeId}
              aria-controls="skill-panel"
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-accent aria-pressed:bg-secondary"
            >
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: `var(${c.accentVar})` }} />
              {c.name}
            </button>
          ))}
        </div>

        <section id="skill-panel" aria-live="polite" className="rounded-2xl border border-border bg-card/80 p-6">
          <h2 className="text-2xl font-semibold" style={{ color: `var(${active.accentVar})` }}>
            {active.name}
          </h2>
          <p className="mt-1 text-muted-foreground">{active.description}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {active.skills.map((s) => (
              <li key={s.name} className="flex flex-col gap-1.5 rounded-lg border border-border bg-background/50 p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium">{s.name}</span>
                  <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[11px]', experienceStyles[s.experience])}>
                    {experienceLabels[s.experience]}
                  </span>
                </div>
                {s.usedIn && <span className="text-xs text-muted-foreground">{s.usedIn}</span>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
