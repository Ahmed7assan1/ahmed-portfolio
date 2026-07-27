import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { easeOut } from '../../lib/motion.js'
import { GREETINGS } from '../../lib/greetings.js'

const WORD_DURATION = 650

export default function IntroLoader({ onComplete }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      onComplete?.()
      return
    }

    if (index >= GREETINGS.length - 1) {
      const exitTimer = setTimeout(() => setExiting(true), WORD_DURATION + 140)
      return () => clearTimeout(exitTimer)
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), WORD_DURATION)
    return () => clearTimeout(timer)
  }, [index, reduceMotion, onComplete])

  if (reduceMotion) return null

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: easeOut },
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)',
            }}
          />

          <motion.div
            className="absolute w-[560px] h-[560px] rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative h-20 sm:h-28 flex items-center justify-center overflow-hidden px-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={GREETINGS[index]}
                className="font-display text-5xl sm:text-7xl font-semibold text-on-surface"
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.42, ease: easeOut }}
              >
                {GREETINGS[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 mt-8 relative">
            {GREETINGS.map((g, i) => (
              <motion.span
                key={g}
                className="w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor: i <= index ? 'rgba(56,189,248,0.9)' : 'rgba(255,255,255,0.2)',
                  scale: i === index ? 1.3 : 1,
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
