export default function ProgressBar({ label, value = 0 }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-body-md text-on-surface">{label}</span>
        <span className="font-mono text-label-mono text-primary">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7]"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}
