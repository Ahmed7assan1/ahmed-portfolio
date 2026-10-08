import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { personalData } from '../../data/personal.ts'
import {
  Code2,
  Cpu,
  Palette,
  Terminal,
  CheckCircle,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

export default function About() {
  const pillars = [
    {
      icon: Code2,
      title: 'Front-End Engineering',
      desc: 'Building responsive, scalable web applications using React.js, TypeScript, Angular, and Vue.js with strong focus on state management and modular architecture.',
    },
    {
      icon: Cpu,
      title: 'AI Workflows & Automation',
      desc: 'Orchestrating LLMs and retrieval pipelines via Flowise and building automated execution chains using n8n for real-world business and design operations.',
    },
    {
      icon: Palette,
      title: 'UI/UX & Design Systems',
      desc: 'Trained in human-centered design through ITI’s 6-month intensive UI/UX track. Proficient in Figma, design tokens, micro-interactions, and accessibility standards.',
    },
    {
      icon: Terminal,
      title: 'Algorithmic Foundation',
      desc: 'Competitive programming background in C++ and algorithms, achieving ECPC National Rank #55. Strong analytical reasoning, debugging, and complexity optimization.',
    },
  ]

  return (
    <section id="about" className="section-container section-padding section-divider">
      <SectionHeading
        index="01"
        eyebrow="Professional Background"
        title="Engineering with algorithmic rigor & design craft"
      />

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
        {/* Left: Professional Story */}
        <div className="space-y-6 text-on-surface-variant leading-relaxed text-base">
          <p className="text-lg text-on-surface font-medium leading-relaxed">
            I am a Software Engineer and Computer Science graduate from Cairo, Egypt (Shorouk Academy, Grade: Very Good),
            combining competitive programming problem-solving with production-level front-end development.
          </p>

          <p>
            My specialization centers on creating responsive, performant user interfaces with <strong className="text-on-surface">React.js</strong>,{' '}
            <strong className="text-on-surface">TypeScript</strong>, and <strong className="text-on-surface">Angular</strong>.
            Through my 6-month intensive scholarship at the <strong className="text-on-surface">Information Technology Institute (ITI)</strong> in the UI/UX Development Track,
            I deepened my craft in design thinking, software testing, and translating user needs into clean, robust code.
          </p>

          <p>
            Beyond traditional UI components, I actively integrate modern <strong className="text-on-surface">AI & Automation pipelines</strong>.
            In my flagship project, <strong className="text-on-surface">FurniVision</strong>, I connected Flowise conversational AI and n8n workflows with
            real-time Three.js 3D visualization. At <strong className="text-on-surface">Outlier</strong>, I audited and improved frontier model responses through systematic prompt engineering.
          </p>

          {/* Core Strengths Checklist */}
          <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-sm font-medium text-on-surface">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span>Clean, Maintainable Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span>Production TypeScript Strict Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span>WebRTC & Real-Time Media</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
              <span>Flowise & n8n Automation</span>
            </div>
          </div>
        </div>

        {/* Right: Pillars & Verified Stats */}
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-surface-container/60 border border-white/5 hover:border-primary/30 transition-all space-y-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-semibold text-sm text-on-surface">
                    {p.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Quick Metrics Bar */}
          <div className="p-6 rounded-2xl glass border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {personalData.stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-display text-2xl font-bold text-primary">
                  {s.value}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-on-surface font-medium">
                  {s.label}
                </div>
                <div className="text-[11px] text-on-surface-variant line-clamp-2">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
