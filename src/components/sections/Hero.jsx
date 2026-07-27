import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'motion/react'
import { easeOut, fadeUp, staggerContainer } from '../../lib/motion.js'
import { GREETINGS } from '../../lib/greetings.js'
import MagneticButton from '../ui/MagneticButton.jsx'

function GreetingBadge({ firstName }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % GREETINGS.length), 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-4 pr-5 py-2">
      <span className="relative inline-flex h-4 w-14 overflow-hidden font-mono text-label-mono text-primary">
        <AnimatePresence mode="wait">
          <motion.span
            key={GREETINGS[index]}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            {GREETINGS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-on-surface-variant">
        I'm {firstName}
      </span>
    </div>
  )
}

function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-primary"
        animate={{ opacity: [1, 0.35, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">
        Available for new work
      </span>
    </motion.div>
  )
}

function FloatingGlow({ className, delay = 0, x = 0, y = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      style={{ x, y }}
      animate={{ y: [0, -24, 12, 0], scale: [1, 1.06, 0.98, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

function ScrollCue() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 text-on-surface-variant/70"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
        <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeOpacity="0.4" />
        <motion.circle
          cx="7"
          cy="6"
          r="1.6"
          fill="currentColor"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  )
}

/** Giant, near-invisible initials sitting behind the headline — a quiet callback to the
 *  old "name printed over the photo" trick, without fighting the portrait for legibility. */
function GhostInitials({ text, x }) {
  if (!text) return null
  return (
    <motion.span
      aria-hidden="true"
      style={{ x }}
      className="pointer-events-none select-none absolute -top-[0.22em] -left-[0.02em] -z-10 font-display font-bold text-[clamp(6rem,17vw,12.5rem)] leading-none text-white/[0.035] whitespace-nowrap"
    >
      {text}
    </motion.span>
  )
}

/** Small viewfinder-style brackets at the corners of the portrait — a premium framing detail
 *  that reveals in a quick stagger once the image settles in. */
function CornerTicks() {
  const positions = [
    'top-5 left-5 border-t border-l rounded-tl-md',
    'top-5 right-5 border-t border-r rounded-tr-md',
    'bottom-5 left-5 border-b border-l rounded-bl-md',
    'bottom-5 right-5 border-b border-r rounded-br-md',
  ]
  return (
    <>
      {positions.map((pos, i) => (
        <motion.span
          key={pos}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
          className={`hidden lg:block absolute w-6 h-6 border-white/25 z-10 pointer-events-none ${pos}`}
        />
      ))}
    </>
  )
}

/** Splits text into letters and reveals each on cue from a parent stagger container. */
function KineticHeadline({ text }) {
  const letterVariants = {
    hidden: { opacity: 0, y: '0.6em', filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: easeOut } },
  }

  return (
    <motion.h1
      variants={staggerContainer(0.026, 0)}
      className="relative z-10 font-display font-semibold leading-[0.94] tracking-tight text-[clamp(2.5rem,5.4vw,5rem)] text-on-surface"
    >
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split('').map((ch, ci) => (
            <motion.span key={ci} variants={letterVariants} className="inline-block">
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

export default function Hero({ profile }) {
  const name = profile?.full_name?.trim() || 'Your Name'
  const firstName = name.split(' ')[0]
  const title = profile?.job_title || 'Web Developer'
  const bio = profile?.bio?.trim() || 'Tell visitors what you build and who you build it for.'
  const reduceMotion = useReducedMotion()
  const heroRef = useRef(null)
  const [imgBroken, setImgBroken] = useState(false)
  const hasAvatar = Boolean(profile?.avatar_url) && !imgBroken

  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const orbX = useTransform(springX, [-0.5, 0.5], [-30, 30])
  const orbY = useTransform(springY, [-0.5, 0.5], [-20, 20])
  const ghostX = useTransform(springX, [-0.5, 0.5], [-14, 14])
  const tiltY = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const tiltX = useTransform(springY, [-0.5, 0.5], [5, -5])

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const portraitParallax = useTransform(scrollYProgress, [0, 1], [0, 60])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const contentFade = useTransform(scrollYProgress, [0, 0.7], [1, 0.15])

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

  const stats = profile?.stats || {}
  const quickStats = [
    stats.years_experience !== undefined && { value: `${stats.years_experience}+`, label: 'Years' },
    stats.projects_completed !== undefined && { value: `${stats.projects_completed}+`, label: 'Projects' },
  ].filter(Boolean)

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <FloatingGlow className="w-[28rem] h-[28rem] bg-primary/10 -top-24 -left-24" delay={0} x={orbX} y={orbY} />
      <FloatingGlow className="w-96 h-96 bg-white/[0.04] top-1/3 -right-32" delay={1.5} x={orbX} y={orbY} />

      <div className="section-container w-full pt-28 sm:pt-32 relative z-10 flex items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <GreetingBadge firstName={firstName} />
        </motion.div>
        <AvailabilityBadge />
      </div>

      <div className="section-container w-full flex-1 relative z-10 flex flex-col">
        <motion.div
          style={{ opacity: contentFade }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.1)}
          className="flex-1 min-h-0 flex flex-col lg:flex-row lg:items-stretch lg:gap-10 xl:gap-16 py-8 sm:py-10"
        >
          {/* Text column */}
          <div className="flex flex-col justify-between gap-8 min-h-0 lg:flex-[1.15] lg:basis-0">
            <div className="relative isolate">
              <GhostInitials text={initials} x={ghostX} />
              <motion.span
                variants={fadeUp}
                className="eyebrow inline-block mb-5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm w-fit"
              >
                {title}
              </motion.span>
              <KineticHeadline text={name} />
            </div>

            {hasAvatar && (
              <motion.div
                variants={fadeUp}
                className="lg:hidden rounded-2xl overflow-hidden aspect-[4/5] max-w-xs mx-auto border border-white/10"
              >
                <img
                  src={profile.avatar_url}
                  alt={`Portrait of ${name}`}
                  className="w-full h-full object-cover object-top grayscale contrast-125 brightness-90"
                  onError={() => setImgBroken(true)}
                />
              </motion.div>
            )}

            <div>
              <motion.p
                variants={fadeUp}
                className="relative z-10 text-body-lg text-on-surface-variant max-w-xl lg:max-w-none mt-1 mb-6 leading-relaxed"
              >
                {bio}
              </motion.p>

              {quickStats.length > 0 && (
                <motion.div variants={fadeUp} className="relative z-10 flex items-center gap-6 mb-6">
                  {quickStats.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                      <span className="font-display text-2xl font-semibold text-on-surface">{s.value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-4">
                <MagneticButton
                  href="#projects"
                  className="btn-primary group"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View My Work
                  <motion.span className="inline-block" whileHover={{ x: 4 }}>
                    →
                  </motion.span>
                </MagneticButton>
                {profile?.cv_url && (
                  <MagneticButton
                    href={profile.cv_url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline group"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download CV
                    <motion.span className="inline-block" whileHover={{ y: 3 }}>
                      ↓
                    </motion.span>
                  </MagneticButton>
                )}
              </motion.div>
            </div>
          </div>

          {/* Portrait column — spans the full height of the row so there's no dead space
              above/below the photo, and shows far more than a face-only crop. */}
          {hasAvatar && (
            <motion.div variants={fadeUp} className="hidden lg:block relative lg:flex-[0.85] lg:basis-0">
              <motion.div
                style={{
                  y: portraitParallax,
                  scale: portraitScale,
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 1200,
                }}
                className="absolute inset-0 rounded-[1.75rem] overflow-hidden border border-white/10"
              >
                <img
                  src={profile.avatar_url}
                  alt={`Portrait of ${name}`}
                  className="w-full h-full object-cover object-top grayscale contrast-125 brightness-90"
                  onError={() => setImgBroken(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/40" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 to-transparent" />
              </motion.div>

              <CornerTicks />

              <motion.div
                variants={fadeUp}
                className="hidden lg:flex absolute -bottom-6 left-6 right-6 z-10 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface-container/80 backdrop-blur-glass px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
              >
                <div className="min-w-0">
                  <p className="font-display text-body-md font-semibold text-on-surface truncate">{title}</p>
                  {profile?.location && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/70 mt-0.5 truncate">
                      {profile.location}
                    </p>
                  )}
                </div>
                <motion.span
                  className="w-2 h-2 rounded-full bg-primary shrink-0"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: easeOut }}
        className="section-container w-full pb-8 sm:pb-10 relative z-10"
      >
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-on-surface-variant/60">
          <span className="truncate">{profile?.location || 'Remote'}</span>
          <ScrollCue />
          <span className="hidden sm:inline truncate">{profile?.email || title}</span>
        </div>
      </motion.div>
    </section>
  )
}
