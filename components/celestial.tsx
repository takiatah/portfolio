import { cn } from '@/lib/utils'

export function Planet({ accentVar, className, ringed = false }: { accentVar: string; className?: string; ringed?: boolean }) {
  return (
    <span aria-hidden="true" className={cn('relative block aspect-square', className)}>
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 30%, oklch(1 0 0 / 0.22), color-mix(in oklch, var(${accentVar}) 62%, oklch(0.18 0.03 265)) 40%, oklch(0.14 0.03 265) 100%)`,
          boxShadow: `0 0 32px -10px color-mix(in oklch, var(${accentVar}) 55%, transparent)`,
        }}
      />
      {ringed && (
        <span
          className="absolute left-1/2 top-1/2 h-[30%] w-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border-2 opacity-40"
          style={{ borderColor: `var(${accentVar})` }}
        />
      )}
    </span>
  )
}

const constellationStars = [
  { x: 18, y: 30, r: 3 },
  { x: 42, y: 16, r: 2.2 },
  { x: 62, y: 38, r: 3.6 },
  { x: 84, y: 22, r: 2 },
  { x: 74, y: 70, r: 2.6 },
  { x: 38, y: 78, r: 2.2 },
  { x: 50, y: 52, r: 4.5 },
]
const constellationLines: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 6],
  [6, 4],
  [6, 5],
  [5, 0],
]

export function ConstellationGlyph({ accentVar, className }: { accentVar: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn('block', className)}>
      {constellationLines.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={constellationStars[a].x}
          y1={constellationStars[a].y}
          x2={constellationStars[b].x}
          y2={constellationStars[b].y}
          stroke={`var(${accentVar})`}
          strokeOpacity={0.45}
          strokeWidth={0.8}
        />
      ))}
      {constellationStars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={`var(${accentVar})`}
          className={i % 2 ? 'twinkle' : undefined}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
      <circle cx={50} cy={52} r={14} fill="none" stroke={`var(${accentVar})`} strokeOpacity={0.25} strokeDasharray="2 3" />
    </svg>
  )
}
