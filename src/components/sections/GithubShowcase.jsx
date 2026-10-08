import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Star, GitFork, ExternalLink, Code2 } from 'lucide-react'
import { GithubIcon } from '../ui/Icons.jsx'

const STATIC_FALLBACK_REPOS = [
  {
    id: 1,
    name: 'portfolio',
    description: 'Production personal developer portfolio built with React, Vite, Tailwind CSS, and Motion.',
    language: 'JavaScript / React',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Ahmed7assan1/portfolio',
  },
  {
    id: 2,
    name: 'ITI-Graduation-Project',
    description: 'FurniVision — AI-Powered Interior Design Platform with Vue 3, Three.js, and Flowise.',
    language: 'TypeScript / Vue.js',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Ahmed7assan1',
  },
  {
    id: 3,
    name: 'law-firm-auth',
    description: 'Mohameek — Comprehensive legal services platform with WebRTC and role-based access.',
    language: 'TypeScript / React',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/Ahmed7assan1',
  },
]

export default function GithubShowcase() {
  const [repos, setRepos] = useState(STATIC_FALLBACK_REPOS)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchRepos = async () => {
      try {
        const timeoutId = setTimeout(() => controller.abort(), 4000)
        const res = await fetch('https://api.github.com/users/Ahmed7assan1/repos?sort=updated&per_page=6', {
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            setRepos(data.slice(0, 4))
          }
        }
      } catch {
        // Fallback gracefully to STATIC_FALLBACK_REPOS
      }
    }

    fetchRepos()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <div className="mt-12 pt-10 border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <GithubIcon className="w-5 h-5 text-primary" />
          <h4 className="font-display font-semibold text-lg text-on-surface">
            Open Source & Public Repositories
          </h4>
        </div>

        <a
          href="https://github.com/Ahmed7assan1"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-primary flex items-center gap-1.5 hover:underline"
        >
          <span>github.com/Ahmed7assan1</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="p-5 rounded-2xl bg-surface-container/60 border border-white/5 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-on-surface flex items-center gap-1.5 truncate">
                  <Code2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{repo.name}</span>
                </span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors p-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                {repo.description || 'Public GitHub repository by Ahmed Hassan.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-on-surface-variant">
              <span>{repo.language || 'Code'}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>{repo.stargazers_count ?? 0}</span>
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  <span>{repo.forks_count ?? 0}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
