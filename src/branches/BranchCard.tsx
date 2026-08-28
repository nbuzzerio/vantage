import { Link } from 'react-router'
import type { BranchDefinition, BranchProgress } from '../models/domain'
import { CapabilityState } from './CapabilityState'

interface BranchCardProps {
  domainId: string
  branch: BranchDefinition
  progress?: BranchProgress
}

export function BranchCard({ domainId, branch, progress }: BranchCardProps) {
  return (
    <Link
      to={`/domains/${domainId}/branches/${branch.id}`}
      className="surface-panel group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:border-sage-400/30 hover:bg-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-400"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">Capability</p>
        <CapabilityState compact />
      </div>
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-stone-100 group-hover:text-sage-200">{branch.name}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-stone-400">{branch.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-stone-800 pt-4 text-xs text-stone-500">
        <span>{branch.benchmarks.length} benchmarks</span>
        <span>{branch.subskills?.length ? `${branch.subskills.length} subskills` : 'Direct capability'}</span>
      </div>
      {progress?.targetLevel !== undefined && (
        <span className="sr-only">Target level {progress.targetLevel}</span>
      )}
    </Link>
  )
}
