import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { experienceData } from '../../data/experience.ts'
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react'

export default function Experience() {
  return (
    <section id="experience" className="section-container section-padding section-divider">
      <SectionHeading
        index="04"
        eyebrow="Career Timeline"
        title="Professional experience & engineering responsibilities"
      />

      <div className="relative border-l border-white/10 dark:border-white/10 pl-6 sm:pl-8 space-y-12 ml-2 sm:ml-4">
        {experienceData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative space-y-4"
          >
            {/* Timeline node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-surface shadow-md" />

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-xl text-on-surface">
                  {item.role}
                </h3>
                <p className="font-mono text-sm text-primary font-medium">
                  {item.company}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant">
                <span className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-md border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {item.period}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-md border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {item.description}
            </p>

            {/* Responsibilities list */}
            <ul className="space-y-2 pt-1">
              {item.responsibilities.map((resp, rIdx) => (
                <li
                  key={rIdx}
                  className="text-xs sm:text-sm text-on-surface/90 flex items-start gap-2.5 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-surface-container border border-white/5 text-xs font-mono text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
