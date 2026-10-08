import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { educationData, professionalProgramsData } from '../../data/education.ts'
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react'

export default function Education() {
  return (
    <section id="education" className="section-container section-padding section-divider">
      <SectionHeading
        index="05"
        eyebrow="Academic & Professional Training"
        title="Formal computer science education and intensive scholarships"
      />

      <div className="space-y-12">
        {/* =========================================================================
            PART 1: ACADEMIC DEGREE (EDUCATION)
            ========================================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-mono text-sm uppercase tracking-widest text-on-surface font-semibold">
              Academic Degree
            </h3>
          </div>

          <div className="grid gap-6">
            {educationData.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass-card p-6 sm:p-8 border border-white/10 hover:border-primary/40 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                      Bachelor’s Degree
                    </span>
                    <h4 className="font-display font-bold text-2xl text-on-surface mt-2">
                      {edu.degree} in {edu.field}
                    </h4>
                    <p className="font-mono text-sm text-on-surface-variant">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-on-surface-variant">
                    <span className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-md border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-md border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {edu.location}
                    </span>
                    {edu.grade && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                        Grade: {edu.grade}
                      </span>
                    )}
                  </div>
                </div>

                {edu.description && (
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {edu.description}
                  </p>
                )}

                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  {edu.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 text-xs text-on-surface flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            PART 2: PROFESSIONAL TRAINING PROGRAMS (SCHOLARSHIPS / MCIT)
            ========================================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-mono text-sm uppercase tracking-widest text-on-surface font-semibold">
              Professional Training Programs (Intensive MCIT Scholarships)
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {professionalProgramsData.map((prog) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass-card p-6 flex flex-col justify-between space-y-5 border border-white/5 hover:border-amber-400/30"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[11px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                        {prog.track}
                      </span>
                      <h4 className="font-display font-bold text-lg text-on-surface mt-2">
                        {prog.organization}
                      </h4>
                      <p className="font-mono text-xs text-on-surface-variant">
                        {prog.program}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded border border-white/5 whitespace-nowrap">
                      {prog.period}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {prog.description}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {prog.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs text-on-surface flex items-start gap-2 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {prog.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface-container-high text-on-surface border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
