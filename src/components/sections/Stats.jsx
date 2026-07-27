import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { MotionStagger, MotionItem } from '../ui/MotionReveal.jsx'
import { fadeUp } from '../../lib/motion.js'

const STAT_LABELS = {
  years_experience: 'Years Experience',
  projects_completed: 'Projects Completed',
  happy_clients: 'Happy Clients',
  satisfaction_rate: 'Client Satisfaction',
}

function Counter({ value, suffix }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  useEffect(() => {
    if (!inView) return
    const target = Number(value)
    if (display < target) {
      const step = Math.ceil(target / 36)
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

export default function Stats({ profile }) {
  const stats = profile?.stats || {}
  const entries = Object.entries(STAT_LABELS).filter(([key]) => stats[key] !== undefined)

  if (entries.length === 0) return null

  return (
    <section id="stats" className="section-container section-padding">
      <SectionHeading eyebrow="By The Numbers" title="Results that speak for themselves" align="center" />

      <MotionStagger
        className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10 border-y border-white/10"
        stagger={0.1}
      >
        {entries.map(([key, label]) => (
          <MotionItem key={key} variant={fadeUp} className="px-4 py-7 text-center">
            <p className="font-display text-primary text-5xl sm:text-6xl font-semibold mb-2">
              <Counter value={stats[key]} suffix={key === 'satisfaction_rate' ? '%' : '+'} />
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-on-surface-variant/70">{label}</p>
          </MotionItem>
        ))}
      </MotionStagger>
    </section>
  )
}
