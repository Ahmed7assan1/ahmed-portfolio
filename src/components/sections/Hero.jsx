import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { personalData } from '../../data/personal.ts'
import {
  FileDown,
  ArrowRight,
  Award,
  Sparkles,
  Terminal,
  Layers,
  Cpu,
  CheckCircle2,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, CodeforcesIcon, BehanceIcon } from '../ui/Icons.jsx'

const TITLES = [
  'Software Engineer',
  'Front-End Developer',
  'React & TypeScript Specialist',
  'Angular & Vue.js Engineer',
  'AI Integration & Automation',
]

function RotatingTitle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % TITLES.length), 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-8 sm:h-9 overflow-hidden inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={TITLES[index]}
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="font-mono text-sm sm:text-base font-semibold text-primary tracking-wide"
        >
          {TITLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function Hero({ profile, onOpenTerminal }) {
  const data = { ...personalData, ...(profile || {}) }
  const reduceMotion = useReducedMotion()
  const heroRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 20 })
  const glowX = useTransform(springX, [-0.5, 0.5], [-25, 25])
  const glowY = useTransform(springY, [-0.5, 0.5], [-20, 20])

  const handleMouseMove = (e) => {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 overflow-hidden"
    >
      {/* Subtle Glow Orbs */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -top-32 left-1/4 w-[34rem] h-[34rem] bg-primary/10 rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      <div className="section-container relative z-10 w-full">
        {/* Top Badges / Indicators */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 text-xs font-mono text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>ECPC National Rank #55</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-mono text-on-surface-variant">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open to Engineering Opportunities</span>
          </div>
        </div>

        {/* Main Grid: Hero Text and Technical Credential Card */}
        <div className="grid lg:grid-cols-[1.25fr_0.85fr] gap-10 lg:gap-14 items-center">
          {/* Left: Identity & Core Messaging */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="eyebrow flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Front-End Software Engineer</span>
              </p>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-on-surface leading-[1.05]">
                Ahmed Hassan
              </h1>

              <div className="pt-1">
                <RotatingTitle />
              </div>
            </div>

            {/* Positioning Banner */}
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
              {['React', 'TypeScript', 'Angular', 'Vue.js', 'AI Integration & Automation'].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs font-medium px-3 py-1 rounded-md bg-surface-container border border-white/10 text-on-surface hover:border-primary/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Concise Evidence-Based Intro */}
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
              Computer Science graduate with deep algorithmic foundations and competitive programming background.
              Specialized in building high-performance, accessible web systems, complex state architectures, and automated
              AI workflows with modern front-end tooling.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#projects" className="btn-primary group">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={profile?.cvUrl || `${import.meta.env.BASE_URL}Ahmed_Hassan_CV.pdf`}
                download="Ahmed_Hassan_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group"
              >
                <FileDown className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <span>Download CV</span>
              </a>

              <a href="#contact" className="btn-ghost">
                Contact Me
              </a>
            </div>

            {/* Secondary Social / Profile Links */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-5 text-sm font-mono text-on-surface-variant">
              <a
                href="https://github.com/Ahmed7assan1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/Ahmed_Hassan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://codeforces.com/profile/Abo_7assan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <CodeforcesIcon className="w-4 h-4 text-amber-400" />
                <span>Codeforces</span>
              </a>

              <a
                href="https://behance.net/ahmedhassan498"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <BehanceIcon className="w-4 h-4 text-cyan-400" />
                <span>Behance</span>
              </a>
            </div>
          </div>

          {/* Right: Technical Credential Card (Quick High-Trust Signals) */}
          <div className="relative">
            <div className="glass-card luxe-border p-6 sm:p-7 space-y-6 relative overflow-hidden bg-surface-container/70">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-xs text-on-surface-variant ml-2">ahmed@engineer:~</span>
                </div>
                <span className="font-mono text-[11px] text-primary bg-primary/10 px-2 py-0.5 rounded">
                  v2026.1
                </span>
              </div>

              {/* Core Verification Badges */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5">
                  <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-on-surface">
                      ECPC National Rank #55
                    </h4>
                    <p className="text-[12px] text-on-surface-variant leading-relaxed">
                      Egyptian Collegiate Programming Contest (ICPC qualifications) — Advanced Algorithms & DP.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-on-surface">
                      Flagship: FurniVision
                    </h4>
                    <p className="text-[12px] text-on-surface-variant leading-relaxed">
                      AI Interior Design & 3D Configurator with Three.js, Flowise RAG, and n8n workflows.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-high/60 border border-white/5">
                  <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-on-surface">
                      Professional Training (MCIT)
                    </h4>
                    <p className="text-[12px] text-on-surface-variant leading-relaxed">
                      ITI UI/UX Development Track (6-month intensive) & Digital Egypt Pioneers Program (DEPI).
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Interactive Terminal Hook */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>Press <kbd className="px-1 border border-white/10 rounded">⌘K</kbd> for quick menu</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className="font-mono text-xs text-primary hover:underline"
                >
                  view console
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
