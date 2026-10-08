import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Code,
  Layout,
  Cpu,
} from 'lucide-react'
import { GithubIcon } from './Icons.jsx'

export default function ProjectCaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!project) return null

  const cs = project.caseStudy

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl glass border border-white/15 shadow-2xl overflow-hidden z-10 flex flex-col bg-surface-container"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface-container/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {project.flagship && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full">
                    Flagship Project
                  </span>
                )}
                <h3 className="font-display font-bold text-lg sm:text-xl text-on-surface">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full border border-white/10 hover:border-primary/40 text-on-surface hover:text-primary transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full border border-white/10 hover:border-primary/40 text-on-surface hover:text-primary transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-on-surface-variant hover:text-on-surface transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-8">
              {/* Cover visual if available */}
              {project.imageUrl && (
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video max-h-72 bg-surface-container-high">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-mono text-xs text-primary">{project.tagline}</p>
                  </div>
                </div>
              )}

              {/* 1. Overview */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {cs.overview}
                </p>
              </div>

              {/* 2. Problem */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Problem</span>
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {cs.problem}
                </p>
              </div>

              {/* 3. Approach */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Approach</span>
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {cs.approach}
                </p>
              </div>

              {/* 4. Key Features */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Features</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {cs.keyFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 text-xs text-on-surface flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Architecture */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </h4>
                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-white/5 text-xs font-mono text-on-surface leading-relaxed">
                  {cs.architecture}
                </div>
              </div>

              {/* 6. Technologies */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                  <Code className="w-3.5 h-3.5" />
                  <span>Technologies & Libraries</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-surface-container-high border border-white/10 text-xs font-mono text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 7. Challenges */}
              {cs.challenges && cs.challenges.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Engineering Challenges</span>
                  </h4>
                  <ul className="space-y-2">
                    {cs.challenges.map((ch, i) => (
                      <li
                        key={i}
                        className="text-xs text-on-surface-variant flex items-start gap-2.5"
                      >
                        <span className="font-mono text-primary font-bold">0{i + 1}.</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 8. Implementation Details */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Implementation</span>
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {cs.implementation}
                </p>
              </div>

              {/* 9. Links & Repositories */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary text-xs py-2.5 px-5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline text-xs py-2.5 px-5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Application</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-ghost text-xs ml-auto"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
