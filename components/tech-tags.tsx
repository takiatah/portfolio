export function TechTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>
  )
}
