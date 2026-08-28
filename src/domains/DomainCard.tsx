import { Link } from 'react-router'
import type { InstalledDomain } from '../models/domain'
import { formatDomainStatus } from '../shared/formatters'
import { StatusPill } from '../shared/StatusPill'

export function DomainCard({ domain }: { domain: InstalledDomain }) {
  const { definition, progress } = domain

  return (
    <Link
      to={`/domains/${definition.id}`}
      className="surface-panel group block p-6 transition hover:-translate-y-0.5 hover:border-sage-400/30 hover:bg-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-400"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Domain</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-100">{definition.name}</h2>
        </div>
        <StatusPill>{formatDomainStatus(progress.status)}</StatusPill>
      </div>
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-stone-400">{definition.description}</p>
      <div className="mt-7 flex items-end justify-between border-t border-stone-800 pt-5">
        <div>
          <p className="text-lg font-semibold text-stone-200">{definition.branches.length}</p>
          <p className="text-xs text-stone-500">capabilities</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-stone-300">Not assessed</p>
          <p className="mt-1 text-xs text-stone-500">Assessment will establish levels</p>
        </div>
      </div>
    </Link>
  )
}
