export function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center py-12 text-on-surface-variant">
      <span className="font-mono text-label-mono uppercase tracking-widest animate-pulse">
        {label}
      </span>
    </div>
  )
}

export function ErrorState({ message }) {
  return (
    <div className="glass rounded-lg p-6 text-center text-error">
      <p className="font-mono text-label-mono">Couldn't load this section: {message}</p>
    </div>
  )
}

export function EmptyState({ message }) {
  return (
    <div className="glass rounded-lg p-6 text-center text-on-surface-variant">
      <p className="text-body-md">{message}</p>
    </div>
  )
}
