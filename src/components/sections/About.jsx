import { motion } from 'motion/react'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { MotionReveal } from '../ui/MotionReveal.jsx'
import { fadeUp, slideRight } from '../../lib/motion.js'

export default function About({ profile }) {
  const facts = [
    { label: 'Role', value: profile?.job_title },
    { label: 'Location', value: profile?.location },
    { label: 'Email', value: profile?.email },
    { label: 'Status', value: 'Open to opportunities' },
  ].filter((f) => f.value)

  return (
    <section id="about" className="section-container section-padding section-divider">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-start">
        <MotionReveal variant={fadeUp}>
          <SectionHeading index="01" eyebrow="About Me" title="A little about how I work" />
          <p className="text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-line max-w-2xl">
            {profile?.bio?.trim() ||
              'Add a bio in the admin dashboard to tell visitors about your experience, focus areas, and what drives your work.'}
          </p>
        </MotionReveal>

        {facts.length > 0 && (
          <MotionReveal variant={slideRight} delay={0.1}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
              <GlassCard className="relative overflow-hidden">
                <p className="eyebrow mb-6">Quick Facts</p>
                <ul className="space-y-5">
                  {facts.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-center justify-between gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant/60 shrink-0">
                        {f.label}
                      </span>
                      <span className="text-on-surface font-medium text-right truncate">{f.value}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          </MotionReveal>
        )}
      </div>
    </section>
  )
}
