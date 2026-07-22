import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import DetailModal from '../ui/DetailModal.jsx'
import { Loader, ErrorState } from '../ui/Loader.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { useStaggerReveal } from '../../hooks/useStaggerReveal.js'

function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function CertificateDetailContent({ cert }) {
  return (
    <div className="space-y-6">
      {cert.image_url ? (
        <div className="rounded-xl overflow-hidden bg-surface-container-high p-6 flex items-center justify-center">
          <img
            src={cert.image_url}
            alt={cert.title}
            className="max-h-64 w-full object-contain"
          />
        </div>
      ) : (
        <div className="aspect-[3/2] rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
          <svg className="w-20 h-20 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
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

export default function Certificates() {
  const { data: certificates, loading, error } = useSupabaseCRUD('certificates', {
    orderBy: 'created_at',
    ascending: false,
  })
  const [selected, setSelected] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const { ref, itemClass, itemStyle } = useStaggerReveal()

  const isEmpty = !loading && !error && certificates.length === 0

  return (
    <section id="certificates" className="section-container section-padding">
      <SectionHeading eyebrow="Credentials" title="Certificates" align="center" />

      {loading && <Loader label="Loading certificates" />}
      {error && <ErrorState message={error} />}

      {!loading && !error && !isEmpty && (
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => {
            const isHovered = hoveredId === cert.id
            return (
              <div
                key={cert.id}
                className={itemClass()}
                style={itemStyle(i)}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <GlassCard
                  as="button"
                  type="button"
                  onClick={() => setSelected(cert)}
                  className={`p-0 overflow-hidden flex flex-col h-full text-left w-full cursor-pointer group/card transition-all duration-300 ${
                    isHovered ? 'ring-1 ring-primary/40 scale-[1.02] shadow-glow' : ''
                  }`}
                >
                  {cert.image_url ? (
                    <div className="relative aspect-[3/2] bg-surface-container-high overflow-hidden">
                      <img
                        src={cert.image_url}
                        alt={cert.title}
                        className="w-full h-full object-contain p-6 transition-all duration-700 ease-out group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                      <div className={`absolute inset-x-0 bottom-0 p-4 flex justify-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        <span className="font-mono text-xs text-on-surface bg-surface/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
                          View Certificate ↗
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[3/2] bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}

                  <div className="p-card flex-1 flex flex-col">
                    <h4 className="text-on-surface font-semibold text-headline-md leading-tight group-hover/card:text-primary transition-colors">
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
              </div>
            )
          })}
        </div>
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
