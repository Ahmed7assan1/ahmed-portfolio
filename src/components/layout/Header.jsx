import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../../context/ThemeContext.jsx'
import {
  Sun,
  Moon,
  Menu,
  X,
  FileDown,
  Terminal,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/Icons.jsx'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

export default function Header({ onOpenCommandPalette }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleObserver = () => {
      const sections = NAV_LINKS.map((link) => link.href.substring(1))
      let current = ''
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = `#${sectionId}`
            break
          }
        }
      }
      if (current) setActive(current)
    }

    window.addEventListener('scroll', handleObserver, { passive: true })
    return () => window.removeEventListener('scroll', handleObserver)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleLinkClick = (href) => {
    setActive(href)
    setOpen(false)
  }

  return (
    <>
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4">
        <nav
          aria-label="Main Navigation"
          className={`w-full max-w-6xl flex items-center justify-between gap-3 rounded-full pl-5 pr-3 py-2 transition-all duration-300 ${
            scrolled
              ? 'glass shadow-lg border-white/10 dark:border-white/10'
              : 'bg-surface/80 backdrop-blur-md border border-white/10 dark:border-white/10'
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display font-bold text-base tracking-tight text-on-surface hover:text-primary transition-colors group"
          >
            <span className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-xs font-semibold text-primary group-hover:scale-105 transition-transform">
              AH
            </span>
            <span className="hidden sm:inline-block font-semibold">
              Ahmed Hassan
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`relative px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'text-[#062033] font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Actions: Command palette, Theme toggle, CV download, Mobile burger */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Command Palette (Ctrl+K / Cmd+K)"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-full border border-white/10 hover:border-primary/40 bg-surface-container/60 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>⌘K</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 hover:border-primary/40 bg-surface-container/60 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </button>

            {/* CV Download CTA */}
            <a
              href={`${import.meta.env.BASE_URL}Ahmed_Hassan_CV.pdf`}
              download="Ahmed_Hassan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium hover:bg-primary hover:text-[#062033] transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-on-surface hover:text-primary transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-2 px-3">
                Navigation
              </span>
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`px-4 py-3 rounded-xl text-lg font-display font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-primary text-[#062033] font-semibold'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono opacity-70">→</span>
                  </a>
                )
              })}
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`${import.meta.env.BASE_URL}Ahmed_Hassan_CV.pdf`}
                  download="Ahmed_Hassan_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center py-2.5 text-sm"
                >
                  <FileDown className="w-4 h-4 inline-block mr-1" />
                  Download CV (PDF)
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onOpenCommandPalette?.()
                  }}
                  className="px-3 py-2.5 rounded-full border border-white/10 bg-surface-container text-xs font-mono text-on-surface"
                >
                  ⌘K
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-on-surface-variant">
                <a
                  href="https://github.com/Ahmed7assan1"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/Ahmed_Hassan"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://codeforces.com/profile/Abo_7assan"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-semibold hover:text-primary transition-colors"
                >
                  Codeforces
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
