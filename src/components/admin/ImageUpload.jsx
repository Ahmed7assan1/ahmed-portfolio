import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'

const FALLBACK_BUCKET =
  import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'portfolio-assets'

export default function ImageUpload({ value, onChange, label, bucket }) {
  const BUCKET = bucket || FALLBACK_BUCKET

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`

      console.log('===========================')
      console.log('Uploading file...')
      console.log('Bucket:', BUCKET)
      console.log('Path:', path)

      const {
        data: { session },
      } = await supabase.auth.getSession()

      console.log('Session:', session)

      const { data: userData } = await supabase.auth.getUser()
      console.log('User:', userData.user)

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, {
          upsert: false,
        })

      console.log('Upload Error:', uploadError)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path)

      console.log('Public URL:', data.publicUrl)

      onChange(data.publicUrl)
    } catch (err) {
      console.error('Storage Error:', err)

      setError(
        err.message?.includes('Bucket not found')
          ? `Storage bucket "${BUCKET}" doesn't exist yet. Create a bucket with this name in Supabase Storage.`
          : err.message
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste a URL, or upload a file below"
        className="w-full rounded bg-surface-container-low border border-white/10 px-3 py-2 text-on-surface focus:border-primary outline-none text-sm"
      />

      <div className="flex items-center gap-3">
        <label className="btn-outline text-xs py-1.5 px-3 cursor-pointer">
          {uploading ? 'Uploading…' : `Upload ${label || 'file'}`}
          <input
            type="file"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>

        {value && (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-primary hover:underline"
          >
            Preview →
          </a>
        )}
      </div>

      {error && (
        <p className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}