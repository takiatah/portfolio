import { ExternalLink, FolderGit2 as Github, Lock } from 'lucide-react'
import { COURSEWORK_NOTE, type Project } from '@/lib/projects'

export function ProjectActions({ project, showCourseworkNote = true }: { project: Project; showCourseworkNote?: boolean }) {
  const { sourceAvailability, links } = project
  const isPublic = sourceAvailability.type === 'public'

  return (
    <div className="flex flex-wrap items-center gap-2">
      {isPublic && (
        <a
          href={sourceAvailability.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Github className="size-4" aria-hidden="true" />
          View Source Code
          <span className="sr-only">(opens GitHub in a new tab)</span>
        </a>
      )}
      {links?.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          {l.label}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
      {!isPublic && showCourseworkNote && (
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5 shrink-0" aria-hidden="true" />
          {COURSEWORK_NOTE}
        </p>
      )}
    </div>
  )
}
