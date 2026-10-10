import type { Metadata } from 'next'
import { Briefcase as Linkedin, FolderGit2 as Github } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { profileLinks } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Takia Tahmid on LinkedIn or GitHub.',
}

const channels = [
  { label: 'LinkedIn', description: 'The best place to reach me about opportunities.', href: profileLinks.linkedin, icon: Linkedin },
  { label: 'GitHub', description: 'Public repositories and source code.', href: profileLinks.github, icon: Github },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s connect"
        description="Interested in my work, or have an opportunity to discuss? Reach out through either channel below."
        accentVar="--accent-skills"
      />
      <ul className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2">
        {channels.map(({ label, description, href, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card/80 p-6 transition-colors hover:bg-accent"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-heading font-medium">{label}</span>
                <span className="block text-sm text-muted-foreground">{description}</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
