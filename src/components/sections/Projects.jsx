import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import DetailModal from '../ui/DetailModal.jsx'
import { Loader, ErrorState, EmptyState } from '../ui/Loader.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { useStaggerReveal } from '../../hooks/useStaggerReveal.js'

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

function ProjectDetailContent({ project }) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container-high">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-on-surface-variant">
            No cover image
          </div>
        )}
        {project.featured && (
          <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm rounded px-2 py-0.5">
            Featured
          </span>
        )}
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
  const [hoveredId, setHoveredId] = useState(null)
  const { ref, itemClass, itemStyle } = useStaggerReveal()

  return (
    <section id="projects" className="section-container section-padding">
      <SectionHeading eyebrow="Featured Projects" title="Some of My Recent Work" align="center" />

      {loading && <Loader label="Loading projects" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && projects.length === 0 && (
        <EmptyState message="No projects added yet. Add your first project from the admin dashboard." />
      )}

      {!loading && !error && projects.length > 0 && (
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const isHovered = hoveredId === project.id
            return (
              <div
                key={project.id}
                className={itemClass()}
                style={itemStyle(i)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <GlassCard
                  as="button"
                  type="button"
                  onClick={() => setSelected(project)}
                  className={`overflow-hidden p-0 flex flex-col h-full text-left w-full cursor-pointer group/card transition-all duration-300 ${
                    isHovered ? 'ring-1 ring-primary/40 scale-[1.02] shadow-glow' : ''
                  }`}
                >
                  <div className="relative aspect-video bg-surface-container-high overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-on-surface-variant text-sm">
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                          </svg>
                          <span>No image</span>
                        </div>
                      </div>
                    )}

                    <div className={`absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />

                    <span className={`absolute top-3 left-3 font-mono text-label-mono text-primary bg-surface/70 backdrop-blur-sm rounded px-2 py-0.5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {project.featured && (
                      <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm rounded px-2 py-0.5">
                        Featured
                      </span>
                    )}

                    <div className={`absolute inset-x-0 bottom-0 p-4 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      <span className="font-mono text-xs text-on-surface bg-surface/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30">
                        View Details ↗
                      </span>
                    </div>
                  </div>

                  <div className="p-card flex-1 flex flex-col">
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
              </div>
            )
          })}
        </div>
      )}

      <DetailModal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        subtitle="Project"
      >
        {selected && <ProjectDetailContent project={selected} />}
      </DetailModal>
    </section>
  )
}
