import { useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { skillCategories } from '../../data/skills.ts'
import {
  Code2,
  Cpu,
  Database,
  Palette,
  CheckCircle2,
  Wrench,
  Search,
  Sparkles,
} from 'lucide-react'

const CATEGORY_ICONS = {
  frontend: Code2,
  'ai-automation': Cpu,
  'backend-apis': Database,
  'ui-ux': Palette,
  'testing-quality': CheckCircle2,
  'tools-algorithms': Wrench,
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = skillCategories
    .filter((cat) => activeFilter === 'all' || cat.id === activeFilter)
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.skills.length > 0)

  const totalSkillsCount = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)

  return (
    <section id="skills" className="section-container section-padding section-divider">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          index="02"
          eyebrow="Technical Proficiency"
          title="Verified tools, frameworks & engineering disciplines"
        />

        {/* Search input for quick lookup */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies..."
            className="w-full bg-surface-container/70 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
            activeFilter === 'all'
              ? 'bg-primary text-[#062033] font-semibold shadow-sm'
              : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-white/5'
          }`}
        >
          All Categories ({totalSkillsCount})
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeFilter === cat.id
                ? 'bg-primary text-[#062033] font-semibold shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-white/5'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id] || Wrench
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 flex flex-col justify-between space-y-5 bg-surface-container/50 border border-white/5 hover:border-primary/30"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display font-semibold text-base text-on-surface">
                      {category.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-on-surface-variant/80 bg-white/[0.04] px-2 py-0.5 rounded">
                    {category.skills.length}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Badges List (NO fake percentages) */}
              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    title={skill.description}
                    className={`group relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-default ${
                      skill.highlight
                        ? 'bg-primary/10 text-primary border border-primary/25 hover:bg-primary/20 hover:border-primary/40'
                        : 'bg-surface-container-high/60 text-on-surface border border-white/5 hover:border-white/15'
                    }`}
                  >
                    {skill.highlight && <Sparkles className="w-3 h-3 text-primary/80" />}
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="py-16 text-center text-sm font-mono text-on-surface-variant">
          No skills match "{searchQuery}"
        </div>
      )}
    </section>
  )
}
