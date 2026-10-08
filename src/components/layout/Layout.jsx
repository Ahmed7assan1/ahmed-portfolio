import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import AuroraBackground from '../ui/AuroraBackground.jsx'
import CursorGlow from '../ui/CursorGlow.jsx'
import ScrollProgress from '../ui/ScrollProgress.jsx'
import CommandPalette from '../ui/CommandPalette.jsx'
import TerminalEasterEgg from '../ui/TerminalEasterEgg.jsx'

export default function Layout({ onSelectProject, children }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-300">
      <AuroraBackground />
      <div className="grain-overlay fixed inset-0 -z-10" aria-hidden="true" />
      <CursorGlow />
      <ScrollProgress />

      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <main className="flex-1">{children}</main>

      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={(projId) => {
          setCommandPaletteOpen(false)
          onSelectProject?.(projId)
        }}
      />

      <TerminalEasterEgg
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  )
}
