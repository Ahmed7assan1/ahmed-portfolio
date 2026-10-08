import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../../context/ThemeContext.jsx'
import {
  Search,
  FileDown,
  Sun,
  Moon,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  User,
  Wrench,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons.jsx'

export default function CommandPalette({ isOpen, onClose, onSelectProject }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const { theme, toggleTheme } = useTheme()

  const commands = [
    {
      category: 'Navigation',
      items: [
        { id: 'nav-top', label: 'Go to Top / Hero', icon: Sparkles, action: () => scrollTo('top') },
        { id: 'nav-about', label: 'About Ahmed Hassan', icon: User, action: () => scrollTo('about') },
        { id: 'nav-skills', label: 'Technical Skills & Toolkit', icon: Wrench, action: () => scrollTo('skills') },
        { id: 'nav-projects', label: 'Featured Projects', icon: FolderGit2, action: () => scrollTo('projects') },
        { id: 'nav-experience', label: 'Professional Experience', icon: Briefcase, action: () => scrollTo('experience') },
        { id: 'nav-education', label: 'Education & Training Programs', icon: GraduationCap, action: () => scrollTo('education') },
        { id: 'nav-certifications', label: 'Certifications & ECPC Rank', icon: Award, action: () => scrollTo('certifications') },
        { id: 'nav-contact', label: 'Get in Touch / Contact Form', icon: Mail, action: () => scrollTo('contact') },
      ],
    },
    {
      category: 'Projects',
      items: [
        {
          id: 'proj-furnivision',
          label: 'FurniVision — AI & 3D Configurator (Flagship)',
          icon: Sparkles,
          action: () => {
            scrollTo('projects')
            onSelectProject?.('furnivision')
          },
        },
        {
          id: 'proj-mohameek',
          label: 'Mohameek — Legal Services Platform (WebRTC & Flowise)',
          icon: FolderGit2,
          action: () => {
            scrollTo('projects')
            onSelectProject?.('mohameek')
          },
        },
        {
          id: 'proj-coffee',
          label: 'Coffee Shop Management System (Vue 3 & Pinia)',
          icon: FolderGit2,
          action: () => {
            scrollTo('projects')
            onSelectProject?.('coffee-shop-management')
          },
        },
      ],
    },
    {
      category: 'Actions & Socials',
      items: [
        {
          id: 'act-cv',
          label: 'Download CV (PDF)',
          icon: FileDown,
          action: () => {
            const link = document.createElement('a')
            link.href = `${import.meta.env.BASE_URL}Ahmed_Hassan_CV.pdf`
            link.download = 'Ahmed_Hassan_CV.pdf'
            link.click()
          },
        },
        {
          id: 'act-theme',
          label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
          icon: theme === 'dark' ? Sun : Moon,
          action: () => toggleTheme(),
        },
        {
          id: 'act-github',
          label: 'GitHub Profile (Ahmed7assan1)',
          icon: GithubIcon,
          action: () => window.open('https://github.com/Ahmed7assan1', '_blank'),
        },
        {
          id: 'act-linkedin',
          label: 'LinkedIn Profile (Ahmed Hassan)',
          icon: LinkedinIcon,
          action: () => window.open('https://linkedin.com/in/Ahmed_Hassan', '_blank'),
        },
        {
          id: 'act-codeforces',
          label: 'Codeforces Profile (Abo_7assan - Rank #55)',
          icon: Award,
          action: () => window.open('https://codeforces.com/profile/Abo_7assan', '_blank'),
        },
      ],
    },
  ]

  const flatItems = commands.flatMap((cat) =>
    cat.items.filter((item) =>
      item.label.toLowerCase().includes(query.trim().toLowerCase())
    )
  )

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else onClose(true)
      } else if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleItemSelect = (item) => {
    item.action()
    onClose()
  }

  const handleKeyDownInMenu = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (flatItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % (flatItems.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (flatItems[selectedIndex]) {
        handleItemSelect(flatItems[selectedIndex])
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-xl rounded-2xl glass border border-white/15 shadow-2xl overflow-hidden z-10 flex flex-col bg-surface-container"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-4 h-4 text-primary" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDownInMenu}
                placeholder="Type a command or search sections, projects, links..."
                className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-on-surface-variant border border-white/10 rounded">
                ESC
              </kbd>
            </div>

            {/* Items list */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {flatItems.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-on-surface-variant">
                  No matching results for "{query}"
                </div>
              ) : (
                flatItems.map((item, index) => {
                  const Icon = item.icon
                  const isSelected = index === selectedIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                        isSelected
                          ? 'bg-primary text-[#062033] font-medium'
                          : 'text-on-surface hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#062033]' : 'text-primary'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 opacity-60 ${isSelected ? 'inline' : 'hidden'}`} />
                    </button>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/10 bg-surface-container-low/60 flex items-center justify-between text-[11px] font-mono text-on-surface-variant/70">
              <span className="flex items-center gap-1">
                <span>Navigate</span>
                <kbd className="px-1 border border-white/10 rounded">↑</kbd>
                <kbd className="px-1 border border-white/10 rounded">↓</kbd>
                <span className="ml-2">Select</span>
                <kbd className="px-1 border border-white/10 rounded">↵</kbd>
              </span>
              <span>Ahmed Hassan Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
