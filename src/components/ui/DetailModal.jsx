import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function DetailModal({ open, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/85 backdrop-blur-md animate-fade-in cursor-default"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <div className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden glass rounded-t-2xl sm:rounded-2xl border border-white/10 shadow-glow animate-modal-in flex flex-col">
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10 flex-shrink-0">
          <div className="min-w-0">
            {subtitle && (
              <p className="font-mono text-label-mono text-primary mb-1 uppercase tracking-widest">{subtitle}</p>
            )}
            <h2 id="detail-modal-title" className="font-display text-headline-md text-on-surface leading-tight">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary/20 text-on-surface-variant hover:text-on-surface transition-all duration-200 flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-6">{children}</div>
      </div>
    </div>,
    document.body
  )
}
