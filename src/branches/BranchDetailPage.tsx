import { Link, useParams } from 'react-router'
import { ErrorState, LoadingState } from '../shared/AsyncState'
import { useDomain } from '../domains/useDomains'
import { CapabilityState } from './CapabilityState'

export function BranchDetailPage() {
  const { domainId, branchId } = useParams()
  const { domain, loading, error } = useDomain(domainId)

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />

  const branch = domain?.definition.branches.find((item) => item.id === branchId)
  if (!domain || !branch) return <BranchNotFound domainId={domainId} />

  return (
    <div>
      <Link to={`/domains/${domain.definition.id}`} className="back-link">← {domain.definition.name} capabilities</Link>

      <header className="mt-7 grid gap-7 border-b border-stone-800 pb-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="max-w-3xl">
          <p className="eyebrow">Capability branch</p>
          <h1 className="page-title">{branch.name}</h1>
          <p className="page-intro">{branch.description}</p>
        </div>
        <CapabilityState />
      </header>

      {branch.subskills && (
        <section className="mt-9" aria-labelledby="subskills-heading">
          <h2 id="subskills-heading" className="eyebrow">Contributing subskills</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {branch.subskills.map((subskill) => (
              <span key={subskill.id} className="rounded-lg border border-stone-700 bg-stone-900 px-3.5 py-2 text-sm text-stone-300">
                {subskill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mt-11" aria-labelledby="benchmarks-heading">
        <p className="eyebrow">Benchmarks</p>
        <h2 id="benchmarks-heading" className="mt-2 text-2xl font-semibold tracking-tight text-stone-100">
          What does better capability look like?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-400">
          These practical markers make growth observable. They describe useful capability rather than required activity.
        </p>
        <ol className="mt-7 grid gap-4 md:grid-cols-2">
          {branch.benchmarks.map((benchmark, index) => (
            <li key={benchmark.id} className="surface-panel flex gap-4 p-5 sm:p-6">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-sage-400/20 bg-sage-400/10 text-xs font-semibold text-sage-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="leading-7 text-stone-200">{benchmark.title}</p>
                {benchmark.description && <p className="mt-2 text-sm leading-6 text-stone-400">{benchmark.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function BranchNotFound({ domainId }: { domainId?: string }) {
  const destination = domainId ? `/domains/${domainId}` : '/'
  return (
    <div className="surface-panel mx-auto max-w-xl p-8 text-center">
      <p className="eyebrow">Branch not found</p>
      <h1 className="mt-3 text-2xl font-semibold text-stone-100">This capability isn’t in the installed definition.</h1>
      <Link to={destination} className="mt-6 inline-block text-sm font-semibold text-sage-300 hover:text-sage-200">Go back</Link>
    </div>
  )
}
