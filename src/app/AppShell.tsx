import { Link, Outlet } from 'react-router'

export function AppShell() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-stone-800/80 bg-stone-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-400">
            <span className="flex size-8 items-center justify-center rounded-lg border border-sage-400/30 bg-sage-400/10 font-semibold text-sage-300">V</span>
            <span>
              <span className="block text-sm font-semibold tracking-wide text-stone-100">Vantage</span>
              <span className="block text-[0.65rem] tracking-wide text-stone-500">Capability, in perspective</span>
            </span>
          </Link>
          <span className="hidden text-xs text-stone-600 sm:block">Stored locally</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <Outlet />
      </main>
    </div>
  )
}
