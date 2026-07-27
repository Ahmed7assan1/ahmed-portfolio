import { useState, useRef, useEffect } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import DetailModal from '../ui/DetailModal.jsx'
import { Loader, ErrorState, EmptyState } from '../ui/Loader.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { MotionReveal } from '../ui/MotionReveal.jsx'
import { fadeUp, staggerContainer } from '../../lib/motion.js'

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

function ArrowButton({ direction, onClick, disabled, label }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
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

function TechTags({ technologies, size = 'sm' }) {
  if (!technologies) return null
  const tags = technologies.split(',').map((t) => t.trim()).filter(Boolean)
  const sizeClass = size === 'lg' ? 'text-xs px-3 py-1' : 'text-[11px] px-2 py-0.5'
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`font-mono rounded-full bg-primary/10 text-primary/90 border border-primary/20 hover:bg-primary/20 transition-colors ${sizeClass}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function ProjectImage({ src, alt, hoverScale = 1.06, duration = 0.6, fallback }) {
  const [broken, setBroken] = useState(false)

  if (!src || broken) return fallback

  return (
    <motion.img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      whileHover={{ scale: hoverScale }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      onError={() => setBroken(true)}
    />
  )
}

function FeaturedBadge({ className = '' }) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-wider text-secondary bg-secondary/15 border border-secondary/30 backdrop-blur-sm rounded px-2 py-0.5 ${className}`}
    >
      Featured
    </span>
  )
}

function ProjectDetailContent({ project }) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container-high">
        <ProjectImage
          src={project.image_url}
          alt={project.title}
          hoverScale={1}
          fallback={
            <div className="w-full h-full flex items-center justify-center font-mono text-on-surface-variant">
              No cover image
            </div>
          }
        />
        {project.featured && <FeaturedBadge className="absolute top-4 right-4" />}
      </div>

      {project.description && (
        <div>
          <h3 className="font-mono text-label-mono text-primary mb-2 uppercase tracking-widest">About</h3>
          <p className="text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>
      )}

      {project.technologies && (
        <div>
          <h3 className="font-mono text-label-mono text-primary mb-3 uppercase tracking-widest">Stack</h3>
          <TechTags technologies={project.technologies} size="lg" />
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer" className="btn-primary text-sm py-2 px-5 group">
            View Live
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-outline text-sm py-2 px-5 group">
            Source Code
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const { data: projects, loading, error } = useSupabaseCRUD('projects')
  const [selected, setSelected] = useState(null)
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const reduceMotion = useReducedMotion()
  const [maxDrag, setMaxDrag] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(true)

  const featured = projects.find((p) => p.featured) || projects[0]
  const rest = projects.filter((p) => p.id !== featured?.id)

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
  }, [rest.length, x])

  const updateEdges = (value) => {
    setAtStart(value >= -4)
    setAtEnd(value <= -maxDrag + 4)
  }

  const scrollBy = (dir) => {
    const card = trackRef.current?.querySelector('[data-project-card]')
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
    <section id="projects" className="section-container section-padding section-divider">
      <SectionHeading index="03" eyebrow="Featured Work" title="Some of my recent projects" />

      {loading && <Loader label="Loading projects" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && projects.length === 0 && (
        <EmptyState message="No projects added yet. Add your first project from the admin dashboard." />
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="space-y-8">
          {featured && (
            <MotionReveal variant={fadeUp}>
              <motion.button
                type="button"
                onClick={() => setSelected(featured)}
                className="group/feature grid md:grid-cols-2 gap-0 items-stretch text-left w-full glass luxe-border rounded-xl overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <div className="relative aspect-video md:aspect-auto min-h-[260px] bg-surface-container-high overflow-hidden">
                  <ProjectImage
                    src={featured.image_url}
                    alt={featured.title}
                    hoverScale={1.06}
                    duration={0.7}
                    fallback={
                      <div className="w-full h-full flex items-center justify-center font-mono text-on-surface-variant text-sm">
                        No image
                      </div>
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent md:bg-gradient-to-r" />
                  <span className="absolute top-4 left-4 font-mono text-label-mono text-primary bg-surface/70 backdrop-blur-sm rounded px-2 py-0.5">
                    01
                  </span>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="eyebrow mb-4">Featured Project</span>
                  <h3 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 group-hover/feature:text-primary transition-colors">
                    {featured.title}
                  </h3>
                  {featured.description && (
                    <p className="text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                      {featured.description}
                    </p>
                  )}
                  <TechTags technologies={featured.technologies} size="lg" />
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-mono text-primary">
                    View Details
                    <motion.span className="inline-block" whileHover={{ x: 4 }}>
                      →
                    </motion.span>
                  </span>
                </div>
              </motion.button>
            </MotionReveal>
          )}

          {rest.length > 0 && (
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
                  {rest.map((project, i) => (
                    <motion.div
                      key={project.id}
                      data-project-card
                      variants={cardVariants}
                      className="grow shrink basis-[240px] sm:basis-[280px] lg:basis-[320px] min-w-[220px] sm:min-w-[260px] max-w-[420px]"
                    >
                      <motion.div
                        className="h-full"
                        whileHover={{ y: -8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      >
                        <GlassCard
                          as="button"
                          type="button"
                          onClick={() => setSelected(project)}
                          className="overflow-hidden p-0 flex flex-col h-full text-left w-full cursor-pointer group/card"
                        >
                          <div className="relative aspect-video bg-surface-container-high overflow-hidden">
                            <ProjectImage
                              src={project.image_url}
                              alt={project.title}
                              hoverScale={1.08}
                              duration={0.6}
                              fallback={
                                <div className="w-full h-full flex items-center justify-center font-mono text-on-surface-variant text-sm">
                                  <div className="flex flex-col items-center gap-2">
                                    <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                                    </svg>
                                    <span>No image</span>
                                  </div>
                                </div>
                              }
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent opacity-70 group-hover/card:opacity-90 transition-opacity duration-300" />

                            <span className="absolute top-3 left-3 font-mono text-label-mono text-primary bg-surface/70 backdrop-blur-sm rounded px-2 py-0.5">
                              {String(i + 2).padStart(2, '0')}
                            </span>

                            {project.featured && <FeaturedBadge className="absolute top-3 right-3" />}

                            <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-center opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300">
                              <span className="font-mono text-xs text-on-surface bg-surface/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
                                View Details ↗
                              </span>
                            </div>
                          </div>

                          <div className="px-1 py-5 flex-1 flex flex-col">
                            <h3 className="text-headline-md font-display font-semibold text-on-surface mb-2 group-hover/card:text-primary transition-colors">
                              {project.title}
                            </h3>
                            {project.description && (
                              <p className="text-sm text-on-surface-variant mb-4 flex-1 leading-relaxed line-clamp-3">
                                {project.description}
                              </p>
                            )}
                            <TechTags technologies={project.technologies} />
                          </div>
                        </GlassCard>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {canScroll && (
                <div className="flex items-center justify-center sm:justify-end gap-3 mt-8">
                  <ArrowButton direction="prev" onClick={() => scrollBy(-1)} disabled={atStart} label="Previous projects" />
                  <ArrowButton direction="next" onClick={() => scrollBy(1)} disabled={atEnd} label="Next projects" />
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      <DetailModal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} subtitle="Project">
        {selected && <ProjectDetailContent project={selected} />}
      </DetailModal>
    </section>
  )
}
