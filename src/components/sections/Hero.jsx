import { useEffect, useState } from 'react'

function Typewriter({ text, speed = 50, delay = 0 }) {
  const [display, setDisplay] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    setDisplay('')
    setStarted(false)
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  useEffect(() => {
    if (!started) return
    if (display.length < text.length) {
      const timer = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), speed)
      return () => clearTimeout(timer)
    }
  }, [display, text, speed, started])

  return (
    <span>
      {display}
      <span className="animate-pulse text-primary">|</span>
    </span>
  )
}

function FloatingOrb({ className, delay = 0 }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 animate-float pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: '6s' }}
    />
  )
}

export default function Hero({ profile }) {
  const name = profile?.full_name?.trim() || 'Your Name'
  const title = profile?.job_title || 'Web Developer'
  const bio = profile?.bio?.trim() || 'Tell visitors what you build and who you build it for.'
  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')

  return (
    <section id="top" className="section-container min-h-[calc(100dvh-5rem)] flex items-center relative overflow-hidden">
      <FloatingOrb className="w-96 h-96 bg-primary/20 -top-20 -left-20" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-secondary/20 top-1/2 -right-32" delay={1.5} />
      <FloatingOrb className="w-64 h-64 bg-tertiary/20 bottom-0 left-1/3" delay={3} />

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full relative z-10">
        <div className="animate-fade-in-up flex flex-col" style={{ animationDelay: '0.1s' }}>
          <span className="eyebrow inline-block mb-6 px-3 py-1 rounded-full border border-primary/30 hover:bg-primary/10 transition-colors w-fit">
            {title}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-display-xl text-on-surface font-extrabold leading-[1.05] mb-6">
            Hi, I'm{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {firstName}
            </span>
            {lastName && ` ${lastName}`}
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-lg mb-8 leading-relaxed">
            <Typewriter text={bio} speed={30} delay={800} />
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-auto">
            <a href="#projects" className="btn-primary group">
              View My Work
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            {profile?.cv_url && (
              <a href={profile.cv_url} target="_blank" rel="noreferrer" className="btn-outline group">
                Download CV
                <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            )}
          </div>
        </div>

        <div className="relative flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-gradient-to-br from-[#6366F1] to-[#A855F7] opacity-30 blur-3xl animate-pulse-slow" />
          {profile?.avatar_url ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              <img
                src={profile.avatar_url}
                alt={name}
                className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-lg border border-white/10"
              />
            </div>
          ) : (
            <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-lg glass flex items-center justify-center group hover:border-primary/40 transition-all duration-300">
              <span className="font-mono text-6xl text-primary group-hover:scale-110 transition-transform duration-300">{firstName?.[0]}</span>
            </div>
          )}
          <div className="absolute -bottom-6 -right-2 z-20 glass rounded-md p-4 font-mono text-xs text-left w-56 hidden sm:block animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <p className="text-primary">const dev = {'{'}</p>
            <p className="text-on-surface-variant pl-3">name: '{firstName}',</p>
            <p className="text-on-surface-variant pl-3">status: 'available',</p>
            <p className="text-primary">{'}'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
