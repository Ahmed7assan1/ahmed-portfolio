import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { easeOut } from '../../lib/motion.js'
import MagneticButton from '../ui/MagneticButton.jsx'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

function NavLink({ href, label, active, onClick }) {
  const isActive = active === href

  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] font-medium rounded-full transition-colors duration-300 ${
        isActive ? 'text-[#062033]' : 'text-on-surface-variant hover:text-on-surface'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-primary -z-10"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {label}
    </a>
  )
}

export default function Header({ fullName }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const visible = new Map()
    const pick = () => {
      let best = null
      let bestTop = Infinity
      for (const [id, ok] of visible) {
        if (!ok) continue
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top < bestTop) {
          bestTop = top
          best = id
        }
      }
      if (best) setActive(`#${best}`)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting)
        pick()
      },
      { rootMargin: '-90px 0px -70% 0px', threshold: 0 }
    )
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
      className="fixed top-4 sm:top-6 inset-x-0 z-50 flex flex-col items-center px-4"
    >
      <div
        className={`w-full max-w-5xl flex items-center justify-between gap-4 rounded-full pl-4 pr-2 sm:pr-2.5 py-2 transition-all duration-500 ${
          scrolled
            ? 'bg-surface-container/70 backdrop-blur-glass border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]'
            : 'bg-white/[0.03] border border-white/[0.07] backdrop-blur-md'
        }`}
      >
        <a href="#top" className="font-display font-semibold text-sm sm:text-base text-on-surface flex items-center gap-2.5 shrink-0">
          <motion.span
            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="hidden sm:inline">{fullName || 'Portfolio'}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={active} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton
            href="#contact"
            strength={0.2}
            className="hidden md:inline-flex items-center rounded-full bg-primary text-[#062033] text-xs font-display font-semibold uppercase tracking-wider px-5 py-2.5"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Hire Me
          </MagneticButton>

          <motion.button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-on-surface"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            whileTap={{ scale: 0.92 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="lg:hidden relative z-50 mt-3 w-full max-w-sm bg-surface-container/85 backdrop-blur-glass border border-white/10 rounded-3xl px-6 pb-6 pt-4 flex flex-col gap-1 shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: easeOut }}
            >
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-body-md transition-colors py-3 border-b border-white/5 last:border-0 ${
                    active === link.href ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 justify-center text-sm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hire Me →
              </motion.a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
