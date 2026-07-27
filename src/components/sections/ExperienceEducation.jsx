import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Loader, ErrorState, EmptyState } from '../ui/Loader.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { MotionStagger, MotionItem } from '../ui/MotionReveal.jsx'
import { fadeUp } from '../../lib/motion.js'

function formatRange(start, end, isCurrent) {
  const fmt = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''
  return `${fmt(start)} — ${isCurrent ? 'Present' : fmt(end)}`
}

function Timeline({ items, primaryField, secondaryField }) {
  if (items.length === 0) return <EmptyState message="Nothing added yet." />

  return (
    <MotionStagger as="ol" className="relative border-l border-white/10 pl-6 space-y-6" stagger={0.12}>
      {items.map((item) => (
        <MotionItem key={item.id} variant={fadeUp} as="li" className="relative">
          <motion.span
            className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary ring-2 ring-surface"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.2 }}
          />
          <p className="font-mono text-label-mono text-primary mb-1 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatRange(item.start_date, item.end_date, item.current_job)}
          </p>
          <h4 className="text-headline-md font-display font-semibold text-on-surface">{item[primaryField]}</h4>
          <p className="text-on-surface-variant text-sm mb-2">{item[secondaryField]}</p>
          {item.description && (
            <p className="text-sm text-on-surface-variant/90 leading-relaxed">{item.description}</p>
          )}
        </MotionItem>
      ))}
    </MotionStagger>
  )
}

export default function ExperienceEducation() {
  const { data: experience, loading: loadingExp, error: errorExp } = useSupabaseCRUD('experience')
  const { data: education, loading: loadingEdu, error: errorEdu } = useSupabaseCRUD('education')

  return (
    <section id="experience" className="section-container section-padding section-divider">
      <SectionHeading index="04" eyebrow="Experience & Education" title="Where I've worked and studied" />

      <div className="grid md:grid-cols-2 gap-10">
        <div id="experience-list">
          <h3 className="font-mono text-label-mono uppercase tracking-widest text-on-surface-variant mb-5 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Experience
          </h3>
          {loadingExp && <Loader label="Loading experience" />}
          {errorExp && <ErrorState message={errorExp} />}
          {!loadingExp && !errorExp && (
            <Timeline items={experience} primaryField="position" secondaryField="company" />
          )}
        </div>

        <div id="education">
          <h3 className="font-mono text-label-mono uppercase tracking-widest text-on-surface-variant mb-5 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            Education
          </h3>
          {loadingEdu && <Loader label="Loading education" />}
          {errorEdu && <ErrorState message={errorEdu} />}
          {!loadingEdu && !errorEdu && (
            <Timeline items={education} primaryField="degree" secondaryField="institution" />
          )}
        </div>
      </div>
    </section>
  )
}
