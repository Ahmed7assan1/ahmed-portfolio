import { useState, useEffect, useRef } from 'react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Loader, ErrorState, EmptyState } from '../ui/Loader.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'

function AnimatedProgress({ label, value = 0, delay = 0 }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) setStarted(true)
    })

    const fallback = setTimeout(() => setStarted(true), 1200)
    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!started) return
    const timer = setTimeout(() => setWidth(value), 300 + delay)
    return () => clearTimeout(timer)
  }, [started, value, delay])

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-body-md text-on-surface">{label}</span>
        <span className="font-mono text-label-mono text-primary">{value}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
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

  return (
    <section id="skills" className="section-container section-padding">
      <SectionHeading eyebrow="My Skills" title="Technologies I Master" align="center" />

      {loading && <Loader label="Loading skills" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && skills.length === 0 && (
        <EmptyState message="No skills added yet. Add some from the admin dashboard." />
      )}

      {!loading && !error && skills.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
          {Object.entries(groups).map(([, items]) =>
            items.map((skill, idx) => (
              <AnimatedProgress key={skill.id} label={skill.name} value={skill.level ?? 0} delay={idx * 100} />
            ))
          )}
        </div>
      )}
    </section>
  )
}
