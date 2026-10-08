import { useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import ProjectCaseStudyModal from '../ui/ProjectCaseStudyModal.jsx'
import { projectsData } from '../../data/projects.ts'
import {
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  BookOpen,
  Cpu,
  Eye,
  CheckCircle2,
} from 'lucide-react'
import { GithubIcon } from '../ui/Icons.jsx'

export default function Projects({ initialProjectId }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(() => {
    if (initialProjectId) {
      return projectsData.find((p) => p.id === initialProjectId) || null
    }
    return null
  })

  const flagshipProject = projectsData.find((p) => p.flagship)
  const otherProjects = projectsData.filter((p) => !p.flagship)

  const filteredOtherProjects = otherProjects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  )

  const handleOpenCaseStudy = (project) => {
    setSelectedProject(project)
  }

  return (
    <section id="projects" className="section-container section-padding section-divider">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          index="03"
          eyebrow="Featured Engineering"
          title="Flagship products, interactive web applications & systems"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai-3d', label: 'AI & 3D' },
            { id: 'web-app', label: 'Web Applications' },
            { id: 'desktop-system', label: 'Desktop & Systems' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-[#062033] font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          FLAGSHIP PROJECT: FurniVision (Premium Level 2 Visual Treatment)
          ========================================================================= */}
      {flagshipProject && (activeCategory === 'all' || activeCategory === 'ai-3d') && (
        <div className="mb-14">
          <div className="relative rounded-3xl glass luxe-border overflow-hidden border border-primary/20 bg-gradient-to-br from-surface-container via-surface-container-high/60 to-surface-container p-6 sm:p-10">
            {/* Ambient accent glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
              {/* Left Column: Details & Capabilities */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-mono font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Flagship Project
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-on-surface-variant text-xs font-mono">
                    AI & 3D Configurator
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
                    {flagshipProject.title}
                  </h3>
                  <p className="font-mono text-sm text-primary">
                    {flagshipProject.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {flagshipProject.description}
                </p>

                {/* Key Technical Highlights */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 space-y-1">
                    <div className="font-mono font-semibold text-on-surface flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-primary" />
                      <span>3D Room Visualization</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px]">
                      Three.js & TresJS real-time interactive room environment.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 space-y-1">
                    <div className="font-mono font-semibold text-on-surface flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Flowise & n8n AI</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px]">
                      Bilingual RAG advisor & automated event processing.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 space-y-1">
                    <div className="font-mono font-semibold text-on-surface flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Perceptual Hashing</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px]">
                      Visual image similarity analysis powered by Sharp.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 space-y-1">
                    <div className="font-mono font-semibold text-on-surface flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Supabase & PWA</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px]">
                      Offline Workbox caching & relational model storage.
                    </p>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {flagshipProject.technologies.slice(0, 8).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-surface border border-white/10 text-xs font-mono text-on-surface"
                    >
                      {t}
                    </span>
                  ))}
                  {flagshipProject.technologies.length > 8 && (
                    <span className="px-2 py-1 text-xs font-mono text-on-surface-variant">
                      +{flagshipProject.technologies.length - 8} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => handleOpenCaseStudy(flagshipProject)}
                    className="btn-primary text-xs py-3 px-6 group"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {flagshipProject.githubUrl && (
                    <a
                      href={flagshipProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline text-xs py-3 px-5"
                    >
                      <GithubIcon className="w-4 h-4 text-primary" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Visual Preview */}
              <div className="relative group rounded-2xl overflow-hidden border border-white/15 aspect-[4/3] bg-surface-container-high shadow-2xl">
                <img
                  src={flagshipProject.imageUrl}
                  alt={flagshipProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                    2D-to-3D Real-Time Spatial Pipeline
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenCaseStudy(flagshipProject)}
                    className="bg-primary/90 text-[#062033] font-semibold px-3 py-1.5 rounded-full hover:bg-primary transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Explore</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          OTHER PROJECTS GRID: Mohameek, Coffee Shop, Hotel Booking, Store Management
          ========================================================================= */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredOtherProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card flex flex-col justify-between p-6 sm:p-7 border border-white/5 hover:border-primary/30 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-primary uppercase tracking-wider bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                  {project.category === 'web-app' ? 'Web Application' : 'Desktop System'}
                </span>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-on-surface-variant hover:text-primary transition-colors p-1"
                    title="View GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div>
                <h4 className="font-display font-bold text-xl text-on-surface group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="font-mono text-xs text-on-surface-variant mt-1">
                  {project.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high text-on-surface border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleOpenCaseStudy(project)}
                className="font-mono text-xs text-primary flex items-center gap-1.5 hover:underline"
              >
                <span>View Architecture & Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
