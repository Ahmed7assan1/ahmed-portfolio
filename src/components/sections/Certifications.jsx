import { useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { certificationsData } from '../../data/certifications.ts'
import { achievementsData } from '../../data/achievements.ts'
import {
  Award,
  ExternalLink,
  CheckCircle2,
  FileText,
  Calendar,
  Sparkles,
  Trophy,
} from 'lucide-react'

export default function Certifications() {
  const [filter, setFilter] = useState('all')

  const credentialTypes = [
    { id: 'all', label: 'All Credentials' },
    { id: 'Professional Program', label: 'Professional Programs' },
    { id: 'Technical Workshop', label: 'Workshops & Hackathons' },
    { id: 'Cloud & Systems', label: 'Cloud & Systems' },
    { id: 'Software Engineering', label: 'Software Engineering' },
    { id: 'Design', label: 'Design Thinking' },
  ]

  const filteredCerts = certificationsData.filter(
    (c) => filter === 'all' || c.credentialType === filter
  )

  return (
    <section id="certifications" className="section-container section-padding section-divider">
      <SectionHeading
        index="06"
        eyebrow="Credentials & Milestones"
        title="Verified certifications, competitive ranking & technical awards"
      />

      {/* =========================================================================
          HIGH-PRESTIGE ACHIEVEMENT HIGHLIGHT: ECPC National Rank #55
          ========================================================================= */}
      <div className="mb-12">
        <div className="relative rounded-2xl glass luxe-border p-6 sm:p-8 border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-surface-container to-surface-container overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Major Competitive Programming Milestone
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-on-surface">
                Ranked #55 Nationally — ICPC Egyptian Collegiate Contest (ECPC)
              </h3>

              <p className="text-sm text-on-surface-variant max-w-3xl leading-relaxed">
                Qualified and competed in the prestigious Egyptian Collegiate Programming Contest (ECPC), solving
                complex dynamic programming, graph algorithms, and data structure problems under rigorous contest timing.
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
              <div className="text-right">
                <div className="font-display font-extrabold text-4xl text-amber-400">
                  #55
                </div>
                <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                  National Standing
                </div>
              </div>

              <a
                href="https://codeforces.com/profile/Abo_7assan"
                target="_blank"
                rel="noreferrer"
                className="btn-outline text-xs py-2 px-4 border-amber-400/40 text-amber-400 hover:bg-amber-400/10"
              >
                <span>Codeforces Profile</span>
                <ExternalLink className="w-3 h-3 ml-1 inline-block" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {credentialTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              filter === t.id
                ? 'bg-primary text-[#062033] font-semibold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Certifications Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card p-6 flex flex-col justify-between space-y-4 border border-white/5 hover:border-primary/30"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                  {cert.credentialType}
                </span>
                {cert.period && (
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {cert.period}
                  </span>
                )}
              </div>

              <h4 className="font-display font-bold text-base text-on-surface leading-snug">
                {cert.title}
              </h4>

              <p className="font-mono text-xs text-primary/80">
                {cert.issuer}
              </p>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex flex-wrap gap-1">
                {cert.skillsCovered.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-high text-on-surface border border-white/5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {cert.certificateUrl && (
                <div className="pt-1">
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate (PDF)</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
