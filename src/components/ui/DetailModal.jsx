import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { easeOut } from '../../lib/motion.js'

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

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-background/85 backdrop-blur-md cursor-default"
            onClick={onClose}
            aria-label="Close dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-hidden glass rounded-t-2xl sm:rounded-2xl border border-white/10 shadow-glow flex flex-col"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10 flex-shrink-0">
              <div className="min-w-0">
                {subtitle && (
                  <p className="font-mono text-label-mono text-primary mb-1 uppercase tracking-widest">{subtitle}</p>
                )}
                <h2 id="detail-modal-title" className="font-display text-headline-md text-on-surface leading-tight">
                  {title}
                </h2>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-high hover:bg-primary/20 text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
                aria-label="Close"
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <motion.div
              className="overflow-y-auto p-5 sm:p-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
