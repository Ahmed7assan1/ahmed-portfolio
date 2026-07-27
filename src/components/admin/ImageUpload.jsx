import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'

const FALLBACK_BUCKET =
  import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'portfolio-assets'

export default function ImageUpload({ value, onChange, label, bucket, guide }) {
  const BUCKET = bucket || FALLBACK_BUCKET

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [localPreview, setLocalPreview] = useState(null)
  const objectUrlRef = useRef(null)

  // Revoke any local blob preview on unmount so we don't leak memory.
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
  }, [])

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show the picked file immediately — the live preview shouldn't wait on the network round trip.
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    const blobUrl = URL.createObjectURL(file)
    objectUrlRef.current = blobUrl
    setLocalPreview(blobUrl)

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

  const previewSrc = localPreview || value

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
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>

        {value && !guide && (
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

      {guide && (
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0 space-y-1.5 text-xs text-on-surface-variant">
            <p>
              <span className="text-on-surface font-medium">Recommended size:</span>{' '}
              {guide.recommendedSize}
            </p>
            <p>
              <span className="text-on-surface font-medium">Aspect ratio:</span>{' '}
              {guide.aspectRatioLabel}
            </p>
            {guide.notes && <p className="text-on-surface-variant/70 leading-relaxed">{guide.notes}</p>}
          </div>

          {previewSrc && (
            <div className="shrink-0">
              <p className="text-[10px] uppercase tracking-wide text-on-surface-variant/60 mb-1.5">
                Live preview — how this crops on the site
              </p>
              <div
                className="relative overflow-hidden rounded-md border border-white/10 bg-black/30 mx-auto"
                style={{ aspectRatio: guide.aspectRatio, width: guide.previewWidth || 150 }}
              >
                <img
                  src={previewSrc}
                  alt="Crop preview"
                  className={`w-full h-full object-cover ${guide.objectPosition || 'object-top'}`}
                />
                <div className="pointer-events-none absolute inset-[6%] border border-dashed border-white/35 rounded-sm" />
              </div>
              <a
                href={previewSrc}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 block text-center text-[10px] text-primary hover:underline"
              >
                Open full image →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
