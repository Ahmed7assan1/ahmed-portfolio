import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

export default function Header({ fullName }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
        if (top < bestTop) { bestTop = top; best = id }
      }
      if (best) setActive(`#${best}`)
    }
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) visible.set(e.target.id, e.isIntersecting)
      pick()
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 })
    LINKS.forEach((l) => { const el = document.querySelector(l.href); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-20">
        <a href="#top" className="font-mono text-label-mono text-on-surface flex items-center gap-2 group">
          <span className="text-primary group-hover:rotate-12 inline-block transition-transform">{'</>'}</span>
          {fullName || 'Portfolio'}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-body-md transition-all duration-300 relative py-1 ${
                active === link.href
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-full" />
              )}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden md:inline-flex btn-primary text-sm py-2 px-5 group">
          Hire Me
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>

        <button
          className="md:hidden text-on-surface p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <nav className="relative z-50 glass border-t border-white/10 px-6 pb-6 flex flex-col gap-1 animate-fade-in-down">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-body-md transition-colors py-2.5 ${
                active === link.href ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        </div>
      )}
    </header>
  )
}
