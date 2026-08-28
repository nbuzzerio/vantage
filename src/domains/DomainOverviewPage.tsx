import { Link, useParams } from 'react-router'
import { BranchCard } from '../branches/BranchCard'
import { ErrorState, LoadingState } from '../shared/AsyncState'
import { formatDomainStatus } from '../shared/formatters'
import { StatusPill } from '../shared/StatusPill'
import { useDomain } from './useDomains'

export function DomainOverviewPage() {
  const { domainId } = useParams()
  const { domain, loading, error } = useDomain(domainId)

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (!domain) return <DomainNotFound />

  const { definition, progress } = domain

  return (
    <div>
      <Link to="/" className="back-link">← All domains</Link>
      <header className="mt-7 grid gap-7 border-b border-stone-800 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <p className="eyebrow">Domain overview</p>
            <StatusPill>{formatDomainStatus(progress.status)}</StatusPill>
          </div>
          <h1 className="page-title">{definition.name}</h1>
          <p className="page-intro">{definition.description}</p>
          {definition.northStar && (
            <p className="mt-5 border-l-2 border-sage-400/30 pl-4 text-sm leading-6 text-stone-300">
              <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">North Star</span>
              {definition.northStar}
            </p>
          )}
        </div>
        <div className="lg:text-right">
          <p className="text-3xl font-semibold text-stone-200">{definition.branches.length}</p>
          <p className="mt-1 text-sm text-stone-500">independent capabilities</p>
        </div>
      </header>

      <section className="mt-10">
        <div className="max-w-2xl">
          <p className="eyebrow">Capability map</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-100">What might be limiting you?</h2>
          <p className="mt-3 text-sm leading-6 text-stone-400">
            Explore the benchmarks that make each capability concrete. Levels remain unassigned until an assessment supports them.
          </p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {definition.branches.map((branch) => (
            <BranchCard
              key={branch.id}
              domainId={definition.id}
              branch={branch}
              progress={progress.branches.find((item) => item.branchId === branch.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function DomainNotFound() {
  return (
    <div className="surface-panel mx-auto max-w-xl p-8 text-center">
      <p className="eyebrow">Domain not found</p>
      <h1 className="mt-3 text-2xl font-semibold text-stone-100">This domain isn’t installed.</h1>
      <p className="mt-3 text-sm text-stone-400">Return home to see the capability maps stored in this browser.</p>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-sage-300 hover:text-sage-200">Go home</Link>
    </div>
  )
}
