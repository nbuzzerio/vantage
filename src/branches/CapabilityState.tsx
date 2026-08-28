import { StatusPill } from '../shared/StatusPill'

export function CapabilityState({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? '' : 'rounded-xl border border-dashed border-stone-700 bg-stone-950/40 p-4'}>
      <StatusPill tone="accent">Not Assessed</StatusPill>
      {!compact && (
        <p className="mt-3 text-xs leading-5 text-stone-500">
          No capability level has been established. This is distinct from Level 0.
        </p>
      )}
    </div>
  )
}
