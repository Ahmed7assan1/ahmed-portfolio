import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { tableConfigs } from './adminConfig.js'

export default function AdminLayout() {
  const { signOut, session } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm transition-colors ${
      isActive ? 'bg-primary/15 text-primary' : 'text-on-surface-variant hover:text-on-surface'
    }`

  const navContent = (
    <>
      <a href="/" className="font-mono text-label-mono text-on-surface mb-8 block">
        <span className="text-primary">{'</>'}</span> Dashboard
      </a>

      <nav className="space-y-1 flex-1">
        <NavLink to="/admin" end className={linkClass} onClick={() => setSidebarOpen(false)}>
          Overview
        </NavLink>
        {Object.entries(tableConfigs).map(([key, cfg]) => (
          <NavLink key={key} to={`/admin/${key}`} className={linkClass} onClick={() => setSidebarOpen(false)}>
            {cfg.label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/10">
        <p className="text-xs text-on-surface-variant/70 truncate mb-3">{session?.user?.email}</p>
        <button onClick={handleSignOut} className="text-sm text-error hover:underline">
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-64 flex-shrink-0 border-r border-white/10 p-6 flex-col">
        {navContent}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full bg-surface-container border-r border-white/10 p-6 flex flex-col animate-fade-in">
            {navContent}
          </aside>
        </div>
      )}

      <main className="flex-1 p-4 md:p-8 max-w-5xl">
        <button
          className="md:hidden mb-4 text-on-surface p-2 rounded bg-surface-container-high border border-white/10"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <Outlet />
      </main>
    </div>
  )
}
