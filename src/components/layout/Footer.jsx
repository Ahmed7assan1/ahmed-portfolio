import { motion } from 'motion/react'
import { personalData } from '../../data/personal.ts'
import { Award, Layers, ArrowUp, Mail, FileDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon, CodeforcesIcon, BehanceIcon } from '../ui/Icons.jsx'

export default function Footer({ onOpenTerminal }) {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 dark:border-white/10 mt-16 relative bg-surface-container-low/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-white/10">
          {/* Col 1: Identity & Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-xs font-bold text-primary">
                AH
              </span>
              <span className="font-display font-bold text-lg text-on-surface">
                {personalData.displayName}
              </span>
            </div>
            <p className="font-mono text-xs text-primary">
              {personalData.jobTitle}
            </p>
            <p className="text-xs text-on-surface-variant max-w-md leading-relaxed">
              Specialized in production front-end engineering with React, TypeScript, Angular, and AI-driven automation workflows.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface font-semibold">
              Sections
            </span>
            <ul className="space-y-2 text-xs font-mono text-on-surface-variant">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
              </li>
              <li>
                <a href="#education" className="hover:text-primary transition-colors">Education</a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-primary transition-colors">Certifications</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface font-semibold">
              Direct Channels
            </span>
            <ul className="space-y-2 text-xs font-mono text-on-surface-variant">
              <li>
                <a href={`mailto:${personalData.email}`} className="hover:text-primary transition-colors truncate block">
                  {personalData.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalData.phone}`} className="hover:text-primary transition-colors block">
                  {personalData.phone}
                </a>
              </li>
              <li>
                <a
                  href={`${import.meta.env.BASE_URL}Ahmed_Hassan_CV.pdf`}
                  download="Ahmed_Hassan_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download CV (PDF)</span>
                </a>
              </li>
              {onOpenTerminal && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenTerminal}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Dev Console (Terminal)
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-on-surface-variant">
          <p>© {year} Ahmed Hassan. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ahmed7assan1"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/Ahmed_Hassan"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://codeforces.com/profile/Abo_7assan"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors text-amber-400"
              title="Codeforces"
            >
              <CodeforcesIcon className="w-4 h-4" />
            </a>
            <a
              href="https://behance.net/ahmedhassan498"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              title="Behance"
            >
              <BehanceIcon className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="ml-3 p-2 rounded-full border border-white/10 hover:border-primary/40 text-on-surface hover:text-primary transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
