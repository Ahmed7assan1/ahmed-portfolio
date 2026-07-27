import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Loader, ErrorState, EmptyState } from '../ui/Loader.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { MotionReveal, MotionStagger, MotionItem } from '../ui/MotionReveal.jsx'
import { fadeUp } from '../../lib/motion.js'

function Counter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  useEffect(() => {
    if (!inView) return
    const target = Number(value) || 0
    if (display < target) {
      const step = Math.ceil(target / 24)
      const timer = setTimeout(() => setDisplay(Math.min(display + step, target)), 32)
      return () => clearTimeout(timer)
    }
  }, [display, value, inView])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

function SkillPill({ name, level = 0 }) {
  return (
    <motion.div
      className="relative overflow-hidden px-4 py-2 rounded-full border border-white/10 bg-white/[0.02]"
      whileHover={{ y: -2, borderColor: 'rgba(56,189,248,0.4)' }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      <span className="relative z-10 text-sm text-on-surface font-medium whitespace-nowrap">{name}</span>
      <motion.span
        className="absolute inset-x-0 bottom-0 h-[2px] bg-primary/60 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: level / 100 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </motion.div>
  )
}

export default function Skills() {
  const { data: skills, loading, error } = useSupabaseCRUD('skills')

  const groups = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Skills'
    acc[cat] = acc[cat] || []
    acc[cat].push(skill)
    return acc
  }, {})

  const categoryCount = Object.keys(groups).length
  const avgLevel = skills.length
    ? Math.round(skills.reduce((sum, s) => sum + (s.level ?? 0), 0) / skills.length)
    : 0

  return (
    <section id="skills" className="section-container section-padding section-divider">
      {loading && <Loader label="Loading skills" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && skills.length === 0 && (
        <EmptyState message="No skills added yet. Add some from the admin dashboard." />
      )}

      {!loading && !error && skills.length > 0 && (
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div>
            <MotionReveal variant={fadeUp}>
              <SectionHeading index="02" eyebrow="My Skills" title="Technologies I work with" />
              <p className="text-body-md text-on-surface-variant leading-relaxed max-w-sm">
                A working toolkit spanning {categoryCount} discipline{categoryCount === 1 ? '' : 's'}, refined on
                real production work rather than tutorials.
              </p>

              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10 max-w-sm">
                <div>
                  <p className="font-display text-2xl text-on-surface font-semibold">
                    <Counter value={skills.length} />
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                    Tools
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display text-2xl text-on-surface font-semibold">
                    <Counter value={categoryCount} />
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                    Disciplines
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display text-2xl text-on-surface font-semibold">
                    <Counter value={avgLevel} suffix="%" />
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/60">
                    Avg. level
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>

          <div className="space-y-8">
            {Object.entries(groups).map(([category, items]) => (
              <div key={category}>
                <p className="font-mono text-label-mono uppercase tracking-widest text-on-surface-variant/50 mb-3">
                  {category}
                </p>
                <MotionStagger className="flex flex-wrap gap-2.5" stagger={0.05}>
                  {items.map((skill) => (
                    <MotionItem key={skill.id} variant={fadeUp}>
                      <SkillPill name={skill.name} level={skill.level ?? 0} />
                    </MotionItem>
                  ))}
                </MotionStagger>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
