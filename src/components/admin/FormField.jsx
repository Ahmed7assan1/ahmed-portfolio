import ImageUpload from './ImageUpload.jsx'
import SocialIconPicker from './SocialIconPicker.jsx'

const baseInput =
  'w-full rounded bg-surface-container-low border border-white/10 px-3 py-2 text-on-surface focus:border-primary outline-none text-sm'

export default function FormField({ field, value, onChange }) {
  const { name, label, type, required, help, bucket } = field

  const set = (v) => onChange(name, v)

  return (
    <div>
      <label htmlFor={name} className="block text-sm text-on-surface-variant mb-1">
        {label}
        {required && <span className="text-error"> *</span>}
      </label>

      {type === 'textarea' && (
        <textarea
          id={name}
          rows={4}
          required={required}
          value={value ?? ''}
          onChange={(e) => set(e.target.value)}
          className={baseInput}
        />
      )}

      {(type === 'text' || type === 'url') && (
        <input
          id={name}
          type="text"
          required={required}
          value={value ?? ''}
          onChange={(e) => set(e.target.value)}
          className={baseInput}
        />
      )}

      {type === 'number' && (
        <input
          id={name}
          type="number"
          required={required}
          value={value ?? ''}
          onChange={(e) => set(e.target.value === '' ? null : Number(e.target.value))}
          className={baseInput}
        />
      )}

      {type === 'date' && (
        <input
          id={name}
          type="date"
          required={required}
          value={value ?? ''}
          onChange={(e) => set(e.target.value)}
          className={baseInput}
        />
      )}

      {type === 'boolean' && (
        <label className="inline-flex items-center gap-2 text-on-surface-variant text-sm">
          <input
            id={name}
            type="checkbox"
            checked={!!value}
            onChange={(e) => set(e.target.checked)}
            className="w-4 h-4"
          />
          Yes
        </label>
      )}

      {type === 'tags' && (
        <input
          id={name}
          type="text"
          placeholder="Comma separated"
          value={Array.isArray(value) ? value.join(', ') : value ?? ''}
          onChange={(e) =>
            set(
              e.target.value
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
          className={baseInput}
        />
      )}

      {type === 'json' && (
        <textarea
          id={name}
          rows={3}
          value={typeof value === 'string' ? value : JSON.stringify(value ?? {}, null, 2)}
          onChange={(e) => set(e.target.value)}
          className={`${baseInput} font-mono`}
        />
      )}

      {type === 'image' && <ImageUpload value={value} onChange={set} label={label} bucket={bucket} />}

      {type === 'social-icon' && <SocialIconPicker value={value ?? ''} onChange={set} />}

      {help && <p className="text-xs text-on-surface-variant/60 mt-1">{help}</p>}
    </div>
  )
}
