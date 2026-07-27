import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import DetailModal from '../ui/DetailModal.jsx'
import { Loader, ErrorState } from '../ui/Loader.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { staggerContainer } from '../../lib/motion.js'

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function CertPlaceholderIcon({ className = 'w-16 h-16' }) {
  return (
    <svg className={`${className} text-primary/30`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function CertificateDetailContent({ cert }) {
  const [broken, setBroken] = useState(false)
  const showImage = cert.image_url && !broken

  return (
    <div className="space-y-6">
      {showImage ? (
        <div className="rounded-xl overflow-hidden bg-surface-container-high p-6 flex items-center justify-center">
          <img
            src={cert.image_url}
            alt={cert.title}
            className="max-h-64 w-full object-contain"
            onError={() => setBroken(true)}
          />
        </div>
      ) : (
        <div className="aspect-[3/2] rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
          <CertPlaceholderIcon className="w-20 h-20" />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="glass rounded-lg p-4">
          <p className="font-mono text-label-mono text-primary mb-1 uppercase tracking-widest text-xs">Issuer</p>
          <p className="text-on-surface font-semibold">{cert.issuer || '—'}</p>
        </div>
        <div className="glass rounded-lg p-4">
          <p className="font-mono text-label-mono text-primary mb-1 uppercase tracking-widest text-xs">Issue Date</p>
          <p className="text-on-surface font-semibold">{formatDate(cert.issue_date) || '—'}</p>
        </div>
      </div>

      {cert.credential_url ? (
        <a
          href={cert.credential_url}
          target="_blank"
          rel="noreferrer"
          className="btn-primary text-sm py-2 px-5 w-full sm:w-auto justify-center group"
        >
          Verify Credential
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>
      ) : (
        <p className="text-sm text-on-surface-variant/60 font-mono text-center sm:text-left">
          This credential is not verifiable online.
        </p>
      )}
    </div>
  )
}

function CertificateCardImage({ cert }) {
  const [broken, setBroken] = useState(false)
  const showImage = cert.image_url && !broken

  if (!showImage) {
    return (
      <div className="relative aspect-[3/2] bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <CertPlaceholderIcon />
      </div>
    )
  }

  return (
    <div className="relative aspect-[3/2] bg-surface-container-high overflow-hidden">
      <motion.img
        src={cert.image_url}
        alt={cert.title}
        className="w-full h-full object-contain p-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
        onError={() => setBroken(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center opacity-0 translate-y-2 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
        <span className="font-mono text-xs text-on-surface bg-surface/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
          View Certificate ↗
        </span>
      </div>
    </div>
  )
}

function ArrowButton({ direction, onClick, disabled }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous certificates' : 'Next certificates'}
      className="glass w-11 h-11 rounded-full flex items-center justify-center border border-white/10 hover:border-primary/40 transition-colors disabled:opacity-30 disabled:pointer-events-none"
      whileHover={disabled ? {} : { scale: 1.08 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
    >
      <svg className="w-4 h-4 text-on-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {direction === 'prev' ? <path d="M15 19l-7-7 7-7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </motion.button>
  )
}

function CertificatesCarousel({ certificates, onSelect }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const reduceMotion = useReducedMotion()
  const [maxDrag, setMaxDrag] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(true)

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !trackRef.current) return
      const overflow = trackRef.current.scrollWidth - containerRef.current.offsetWidth
      const next = Math.max(0, Math.round(overflow))
      setMaxDrag(next)
      const current = x.get()
      setAtStart(current >= -4)
      setAtEnd(current <= -next + 4)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [certificates.length, x])

  const updateEdges = (value) => {
    setAtStart(value >= -4)
    setAtEnd(value <= -maxDrag + 4)
  }

  const scrollBy = (dir) => {
    const card = trackRef.current?.querySelector('[data-cert-card]')
    const step = card ? card.getBoundingClientRect().width + 24 : 320
    const next = Math.min(0, Math.max(-maxDrag, x.get() - dir * step))
    updateEdges(next)
    if (reduceMotion) {
      x.set(next)
    } else {
      animate(x, next, { type: 'spring', stiffness: 300, damping: 34 })
    }
  }

  const canScroll = maxDrag > 2

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer(0.08, 0.05)}
    >
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className={`flex items-stretch gap-6 ${canScroll ? 'cursor-grab active:cursor-grabbing' : ''}`}
          style={{ x }}
          drag={canScroll ? 'x' : false}
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.12}
          onDragEnd={() => updateEdges(x.get())}
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              data-cert-card
              variants={cardVariants}
              className="w-[260px] sm:w-[300px] shrink-0"
            >
              <motion.div
                className="h-full"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <GlassCard
                  as="button"
                  type="button"
                  tilt={false}
                  onClick={() => onSelect(cert)}
                  className="p-0 overflow-hidden flex flex-col h-full text-left w-full cursor-pointer group/card"
                >
                  <CertificateCardImage cert={cert} />

                  <div className="p-card flex-1 flex flex-col">
                    <h4 className="text-on-surface font-semibold text-headline-md leading-tight line-clamp-2 group-hover/card:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-primary/80 font-mono mt-1">{cert.issuer}</p>
                    {cert.issue_date && (
                      <p className="text-xs font-mono text-on-surface-variant/60 mt-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(cert.issue_date)}
                      </p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {canScroll && (
        <div className="flex items-center justify-center sm:justify-end gap-3 mt-8">
          <ArrowButton direction="prev" onClick={() => scrollBy(-1)} disabled={atStart} />
          <ArrowButton direction="next" onClick={() => scrollBy(1)} disabled={atEnd} />
        </div>
      )}
    </motion.div>
  )
}

export default function Certificates() {
  const { data: certificates, loading, error } = useSupabaseCRUD('certificates', {
    orderBy: 'created_at',
    ascending: false,
  })
  const [selected, setSelected] = useState(null)

  const isEmpty = !loading && !error && certificates.length === 0

  return (
    <section id="certificates" className="section-container section-padding section-divider">
      <SectionHeading index="05" eyebrow="Credentials" title="Certificates & recognitions" align="center" />

      {loading && <Loader label="Loading certificates" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && !isEmpty && (
        <CertificatesCarousel certificates={certificates} onSelect={setSelected} />
      )}

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        subtitle="Certificate"
      >
        {selected && <CertificateDetailContent cert={selected} />}
      </DetailModal>
    </section>
  )
}
