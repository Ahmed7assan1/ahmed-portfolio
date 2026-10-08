import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Award, Terminal, ExternalLink, CheckCircle2, TrendingUp, Trophy } from 'lucide-react'

export default function ProblemSolving() {
  const [cfData, setCfData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchCodeforces = async () => {
      try {
        const timeoutId = setTimeout(() => controller.abort(), 4000)
        const res = await fetch('https://codeforces.com/api/user.info?handles=Abo_7assan', {
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        if (res.ok) {
          const json = await res.json()
          if (json.status === 'OK' && json.result?.[0] && isMounted) {
            setCfData(json.result[0])
          }
        }
      } catch {
        // Graceful fallback to static verified info without breaking
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCodeforces()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <section id="problem-solving" className="section-container section-padding section-divider">
      <SectionHeading
        index="07"
        eyebrow="Competitive Programming"
        title="Algorithmic problem solving & engineering foundations"
      />

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center">
        {/* Left: Codeforces Profile & Live Stats */}
        <div className="glass-card p-6 sm:p-8 space-y-6 border border-white/10 bg-surface-container/60">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-on-surface">
                  Codeforces Profile
                </h4>
                <p className="font-mono text-xs text-primary">Handle: Abo_7assan</p>
              </div>
            </div>

            <a
              href="https://codeforces.com/profile/Abo_7assan"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-white/10 hover:border-primary/40 text-on-surface hover:text-primary transition-colors"
              title="Open Codeforces Profile"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                ECPC Standing
              </span>
              <p className="font-display font-bold text-lg text-amber-400">
                Rank #55
              </p>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                Handle
              </span>
              <p className="font-display font-semibold text-sm text-on-surface truncate">
                Abo_7assan
              </p>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-high/60 border border-white/5 space-y-1 col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                Current Rating
              </span>
              <p className="font-display font-bold text-lg text-primary">
                {cfData?.rating ? `${cfData.rating}` : 'Active'}
              </p>
            </div>
          </div>

          {/* Verification note */}
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Competitive programming reinforces deep understanding of time/space complexity, data structure selection, and robust edge-case handling in production systems.
          </p>

          <a
            href="https://codeforces.com/profile/Abo_7assan"
            target="_blank"
            rel="noreferrer"
            className="btn-outline w-full text-xs justify-center py-2.5"
          >
            <span>Verify on Codeforces</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Right: Applied Engineering Practices */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>How Problem Solving Elevates My Front-End Code</span>
          </h4>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-surface-container/60 border border-white/5 space-y-1.5">
              <h5 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Optimized DOM & Rendering Cycles</span>
              </h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Applies asymptotic complexity awareness to prevent O(n²) reconciliation overhead, avoiding redundant re-renders and costly reflows.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container/60 border border-white/5 space-y-1.5">
              <h5 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>State Machine & Graph Modeling</span>
              </h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Models multi-step workflows, async transactions, and role transitions as deterministic state machines to eliminate race conditions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-container/60 border border-white/5 space-y-1.5">
              <h5 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Disciplined Edge-Case Mitigation</span>
              </h5>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Extensive contest experience debugging boundary conditions translates into resilient input validation and defensive error recovery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
