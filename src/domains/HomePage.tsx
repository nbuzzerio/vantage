import { useState } from 'react'
import { pianoDefinition } from '../seed/piano'
import { ErrorState, LoadingState } from '../shared/AsyncState'
import { DomainCard } from './DomainCard'
import { useDomains } from './useDomains'

export function HomePage() {
  const { domains, loading, error, install } = useDomains()
  const [installing, setInstalling] = useState(false)

  async function installStarter() {
    setInstalling(true)
    try {
      await install(pianoDefinition)
    } finally {
      setInstalling(false)
    }
  }

  if (loading && domains.length === 0) return <LoadingState />
  if (error) return <ErrorState message={error} />

  return (
    <div>
      <header className="max-w-2xl">
        <p className="eyebrow">Your domains</p>
        <h1 className="page-title">A clearer view of what you can do.</h1>
        <p className="page-intro">
          Follow each capability on its own terms. Vantage records what your evidence and assessment support—without reducing a domain to one level.
        </p>
      </header>

      {domains.length === 0 ? (
        <section className="surface-panel mt-10 overflow-hidden p-7 sm:p-10">
          <div className="max-w-xl">
            <p className="eyebrow">A quiet beginning</p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-100">No domains yet.</h2>
            <p className="mt-3 leading-7 text-stone-400">
              Install a starter definition to explore its capability branches and practical benchmarks. Your map stays local to this browser.
            </p>
            <button
              type="button"
              disabled={installing}
              onClick={() => void installStarter()}
              className="mt-7 rounded-xl bg-sage-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-sage-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-300 disabled:cursor-wait disabled:opacity-60"
            >
              {installing ? 'Installing Piano…' : 'Start with Piano'}
            </button>
          </div>
        </section>
      ) : (
        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Installed domains">
          {domains.map((domain) => <DomainCard key={domain.definition.id} domain={domain} />)}
        </section>
      )}
    </div>
  )
}
