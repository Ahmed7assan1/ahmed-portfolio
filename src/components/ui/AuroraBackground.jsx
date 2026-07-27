import { motion, useReducedMotion } from 'motion/react'

const BLOBS = [
  {
    className: 'w-[640px] h-[640px] top-[-18%] left-[-8%]',
    color: 'rgba(56,189,248,0.10)',
    duration: 22,
  },
  {
    className: 'w-[560px] h-[560px] top-[8%] right-[-12%]',
    color: 'rgba(255,255,255,0.05)',
    duration: 26,
  },
  {
    className: 'w-[520px] h-[520px] bottom-[-14%] left-[18%]',
    color: 'rgba(255,255,255,0.04)',
    duration: 30,
  },
]

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: (i * 37) % 100,
  left: (i * 53 + 11) % 100,
  size: 2 + (i % 3),
  duration: 8 + (i % 5) * 2,
  delay: i * 0.6,
}))

export default function AuroraBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />

      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${blob.className}`}
          style={{ background: blob.color }}
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {!reduceMotion &&
        PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/40"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 6px rgba(255,255,255,0.4)',
            }}
            animate={{ opacity: [0.1, 0.5, 0.1], y: [0, -18, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.35) 55%, transparent 100%)',
        }}
      />
    </div>
  )
}
