import { useState, useEffect, useRef } from 'react'
import GlassCard from '../ui/GlassCard.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

const STAT_LABELS = {
  years_experience: 'Years Experience',
  projects_completed: 'Projects Completed',
  happy_clients: 'Happy Clients',
  satisfaction_rate: 'Client Satisfaction',
}

function AnimatedStat({ value, suffix, label }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const target = Number(value)
    if (display < target) {
      const step = Math.ceil(target / 30)
      const timer = setTimeout(() => setDisplay(Math.min(display + step, target)), 40)
      return () => clearTimeout(timer)
    }
  }, [display, value, started])

  return (
    <GlassCard ref={ref} className="text-center hover:scale-105 transition-transform duration-300">
      <p className="font-display text-3xl font-bold text-primary mb-1">
        {display}{suffix}
      </p>
      <p className="text-sm text-on-surface-variant">{label}</p>
    </GlassCard>
  )
}

export default function About({ profile }) {
  const { ref, isVisible } = useScrollReveal()
  const stats = profile?.stats || {}
  const entries = Object.entries(STAT_LABELS).filter(([key]) => stats[key] !== undefined)

  return (
    <section id="about" className="section-container section-padding">
      <div
        ref={ref}
        className={`grid md:grid-cols-2 gap-12 items-start transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div>
          <SectionHeading eyebrow="About Me" title="I'm passionate about creating digital solutions" />
          <p className="text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
            {profile?.bio?.trim() ||
              'Add a bio in the admin dashboard to tell visitors about your experience, focus areas, and what drives your work.'}
          </p>
        </div>

        {entries.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {entries.map(([key, label]) => (
              <AnimatedStat
                key={key}
                value={stats[key]}
                suffix={key === 'satisfaction_rate' ? '%' : '+'}
                label={label}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
