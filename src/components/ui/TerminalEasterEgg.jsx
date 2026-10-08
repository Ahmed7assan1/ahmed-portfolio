import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Terminal, X, Minimize2 } from 'lucide-react'

export default function TerminalEasterEgg({ isOpen, onClose }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { text: 'Ahmed Hassan Dev Terminal [Version 2.0.26]', type: 'system' },
    { text: 'Type "help" for a list of available commands or "clear" to wipe the screen.', type: 'system' },
  ])
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory = [...history, { text: `$ ${cmd}`, type: 'input' }]

    switch (trimmed) {
      case 'help':
        newHistory.push({
          text: 'Available commands:\n  • about     - Who is Ahmed Hassan?\n  • skills    - Primary technical stack\n  • projects  - Flagship & production projects\n  • rank      - ICPC ECPC national standing\n  • contact   - Direct channels\n  • clear     - Clear terminal history\n  • exit      - Close terminal session',
          type: 'output',
        })
        break
      case 'about':
        newHistory.push({
          text: 'Ahmed Hassan: Software Engineer | Front-End Developer\nEducation: B.Sc. in Computer Science (Shorouk Academy, Very Good)\nPrograms: ITI UI/UX Track (6-month intensive) & DEPI (MCIT)',
          type: 'output',
        })
        break
      case 'skills':
        newHistory.push({
          text: 'Core Stack: React.js, TypeScript, Angular, Vue.js, Tailwind CSS\nAI & Automation: Flowise, n8n, Prompt Engineering, LLM Integration\nData: REST APIs, WebRTC, Supabase, SQL Server, MySQL',
          type: 'output',
        })
        break
      case 'projects':
        newHistory.push({
          text: '1. FurniVision - AI-Powered Interior Design & 3D Configurator (Nuxt 3, Three.js, Flowise, n8n)\n2. Mohameek - Comprehensive Legal Services Platform (React, WebRTC, Flowise)\n3. Coffee Shop Management - Dashboard & POS (Vue 3, Pinia)',
          type: 'output',
        })
        break
      case 'rank':
        newHistory.push({
          text: '🏆 ICPC Egyptian Collegiate Programming Contest (ECPC): National Rank #55\nCodeforces Handle: Abo_7assan',
          type: 'output',
        })
        break
      case 'contact':
        newHistory.push({
          text: 'Email: ahmedhassan1907ua@gmail.com\nPhone: +201016191608\nLocation: Cairo, Egypt\nGitHub: github.com/Ahmed7assan1',
          type: 'output',
        })
        break
      case 'sudo':
        newHistory.push({
          text: 'Permission granted: You are authorized to schedule an interview with Ahmed Hassan.',
          type: 'output',
        })
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      case 'exit':
      case 'quit':
        onClose()
        return
      default:
        if (trimmed) {
          newHistory.push({
            text: `command not found: "${trimmed}". Type "help" for available commands.`,
            type: 'error',
          })
        }
    }

    setHistory(newHistory)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(input)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl h-[460px] rounded-2xl glass border border-white/20 shadow-2xl flex flex-col bg-[#0b0f14] text-slate-100 z-10 overflow-hidden font-mono text-xs"
          >
            {/* Window titlebar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#070a0e]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-400 font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  ahmed-hassan@dev-console: ~
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input'
                      ? 'text-primary font-semibold'
                      : line.type === 'error'
                      ? 'text-rose-400'
                      : line.type === 'system'
                      ? 'text-slate-500'
                      : 'text-slate-200'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Line */}
            <div className="p-3 border-t border-white/10 bg-[#070a0e] flex items-center gap-2">
              <span className="text-primary font-bold">➜</span>
              <span className="text-slate-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. help, rank, skills)..."
                className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
