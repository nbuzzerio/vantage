export function LoadingState() {
  return <p className="py-16 text-center text-sm text-stone-400">Loading your capability map…</p>
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="surface-panel mx-auto max-w-xl p-6 text-center">
      <p className="font-medium text-rose-200">Vantage couldn’t load this view.</p>
      <p className="mt-2 text-sm text-stone-400">{message}</p>
    </div>
  )
}
