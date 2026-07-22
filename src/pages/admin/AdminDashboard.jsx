import { Link } from 'react-router-dom'
import { tableConfigs } from './adminConfig.js'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import GlassCard from '../../components/ui/GlassCard.jsx'

function TableCard({ tableKey, config }) {
  const { data, loading } = useSupabaseCRUD(config.table, {
    orderBy: config.orderBy,
    ascending: config.ascending ?? true,
  })
  return (
    <Link to={`/admin/${tableKey}`}>
      <GlassCard>
        <p className="text-on-surface-variant text-sm mb-1">{config.label}</p>
        <p className="font-display text-3xl font-bold text-primary">{loading ? '…' : data.length}</p>
      </GlassCard>
    </Link>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-headline-md text-on-surface mb-2">Overview</h1>
      <p className="text-on-surface-variant text-sm mb-8">
        Manage everything shown on your public portfolio from here.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(tableConfigs).map(([key, cfg]) => (
          <TableCard key={key} tableKey={key} config={cfg} />
        ))}
      </div>

      <div className="mt-8">
        <a href="/" target="_blank" rel="noreferrer" className="text-primary text-sm font-semibold hover:underline">
          View live portfolio →
        </a>
      </div>
    </div>
  )
}
