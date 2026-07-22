import { useState } from 'react'
import { tableConfigs } from './adminConfig.js'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { SocialIcon } from '../../lib/socialIcons.jsx'
import GlassCard from '../../components/ui/GlassCard.jsx'
import FormField from '../../components/admin/FormField.jsx'
import { Loader, ErrorState, EmptyState } from '../../components/ui/Loader.jsx'

function emptyValues(fields) {
  const values = {}
  for (const f of fields) {
    if (f.type === 'boolean') values[f.name] = false
    else if (f.type === 'tags') values[f.name] = []
    else if (f.type === 'json') values[f.name] = ''
    else values[f.name] = ''
  }
  return values
}

function prepareForSubmit(fields, values) {
  const out = { ...values }
  for (const f of fields) {
    if (f.type === 'number' && out[f.name] === '') out[f.name] = null
    if (f.type === 'date' && out[f.name] === '') out[f.name] = null
    if (f.type === 'json') {
      try {
        out[f.name] = out[f.name] ? JSON.parse(out[f.name]) : {}
      } catch {
        throw new Error(`"${f.label}" must be valid JSON`)
      }
    }
  }
  return out
}

export default function TableManager({ tableKey }) {
  const config = tableConfigs[tableKey]
  const { data, loading, error, create, update, remove } = useSupabaseCRUD(config.table, {
    orderBy: config.orderBy,
    ascending: config.ascending ?? true,
  })

  const [editingId, setEditingId] = useState(null)
  const [formValues, setFormValues] = useState(null)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  const canAddMore = !config.singleton || data.length === 0

  const startCreate = () => {
    setEditingId('new')
    setFormValues(emptyValues(config.fields))
    setFormError('')
  }

  const startEdit = (row) => {
    setEditingId(row.id)
    const values = { ...row }
    for (const f of config.fields) {
      if (f.type === 'json') values[f.name] = JSON.stringify(row[f.name] ?? {}, null, 2)
    }
    setFormValues(values)
    setFormError('')
  }

  const cancel = () => {
    setEditingId(null)
    setFormValues(null)
    setFormError('')
  }

  const handleFieldChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      const payload = prepareForSubmit(config.fields, formValues)
      if (editingId === 'new') {
        await create(payload)
      } else {
        await update(editingId, payload)
      }
      cancel()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return
    await remove(id)
  }

  const titleField = config.titleField

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-headline-md text-on-surface">{config.label}</h1>
        {!editingId && canAddMore && (
          <button onClick={startCreate} className="btn-primary text-sm py-2 px-4">
            + Add
          </button>
        )}
      </div>

      {loading && <Loader label="Loading" />}
      {error && <ErrorState message={error} />}

      {editingId && formValues && (
        <GlassCard className="mb-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            {config.fields.map((f) => (
              <div key={f.name} className={f.type === 'textarea' || f.type === 'json' || f.type === 'social-icon' ? 'md:col-span-2' : ''}>
                <FormField field={f} value={formValues[f.name]} onChange={handleFieldChange} />
              </div>
            ))}

            {formError && <p className="text-error text-sm md:col-span-2">{formError}</p>}

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary text-sm py-2 px-4">
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button type="button" onClick={cancel} className="btn-outline text-sm py-2 px-4">
                Cancel
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {!loading && !error && data.length === 0 && !editingId && (
        <EmptyState message={`No ${config.label.toLowerCase()} yet. Click "Add" to create one.`} />
      )}

      {!loading && !error && data.length > 0 && (
        <div className="space-y-3">
          {data.map((row) => (
            <GlassCard key={row.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {config.table === 'social_links' && (
                  <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-surface-container-highest">
                    <SocialIcon
                      platform={row.icon || row.platform}
                      className="w-4 h-4 fill-on-surface-variant"
                    />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-on-surface font-semibold truncate">{row[titleField] || '(untitled)'}</p>
                  {config.table === 'projects' && row.technologies && (
                    <p className="text-xs text-on-surface-variant truncate">{row.technologies}</p>
                  )}
                  {config.table === 'social_links' && row.url && (
                    <p className="text-xs text-on-surface-variant truncate">{row.url}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={() => startEdit(row)}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-error text-sm font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
