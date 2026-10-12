export type DestinationKind = 'planet' | 'constellation'

export interface Destination {
  id: 'data' | 'ml' | 'research' | 'engineering' | 'design' | 'skills'
  name: string
  href: string
  description: string
  accentVar: string
  kind: DestinationKind
  /** Position and size on the desktop universe map, in percentages of the map container. */
  map: { x: number; y: number; size: number }
}

export const destinations: Destination[] = [
  {
    id: 'data',
    name: 'Data Lab',
    href: '/data-lab',
    description: 'Cleaning, exploring, and visualizing real-world datasets to answer business questions.',
    accentVar: '--accent-data',
    kind: 'planet',
    map: { x: 16, y: 30, size: 15 },
  },
  {
    id: 'ml',
    name: 'Machine Learning Lab',
    href: '/machine-learning',
    description: 'Supervised learning experiments and Kaggle competitions, documented end to end.',
    accentVar: '--accent-ml',
    kind: 'planet',
    map: { x: 40, y: 18, size: 12 },
  },
  {
    id: 'research',
    name: 'Research Observatory',
    href: '/research',
    description: 'Data-driven research on trade relationships and geopolitical risk.',
    accentVar: '--accent-research',
    kind: 'planet',
    map: { x: 68, y: 28, size: 17 },
  },
  {
    id: 'engineering',
    name: 'Engineering Bay',
    href: '/engineering',
    description: 'Systems, algorithms, and games built in Java, C, and OCaml.',
    accentVar: '--accent-engineering',
    kind: 'planet',
    map: { x: 26, y: 70, size: 13 },
  },
  {
    id: 'design',
    name: 'Design Studio',
    href: '/design-studio',
    description: 'Responsive websites and interface concepts with a focus on visual craft.',
    accentVar: '--accent-design',
    kind: 'planet',
    map: { x: 58, y: 72, size: 12 },
  },
  {
    id: 'skills',
    name: 'Skills Constellation',
    href: '/skills',
    description:
      'The tools and technologies I use to analyze data, build models, engineer software, and create digital experiences.',
    accentVar: '--accent-skills',
    kind: 'constellation',
    map: { x: 85, y: 66, size: 11 },
  },
]
