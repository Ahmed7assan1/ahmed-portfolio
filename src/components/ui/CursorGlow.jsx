import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary'

export default function CursorGlow() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  // Ring hugs the real cursor almost 1:1 — just enough spring to stay smooth, never lagging behind.
  const ringX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 })
  const ringY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 })
  // Ambient glow trails a little more for depth; it's decorative, not the pointer itself.
  const glowX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setEnabled(mq.matches)
    const listener = (e) => setEnabled(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    if (!enabled || reduceMotion) return

    const handleMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const handleOver = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE_SELECTOR)) setHovering(true)
    }
    const handleOut = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE_SELECTOR)) setHovering(false)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [enabled, reduceMotion, x, y])

  if (!enabled || reduceMotion) return null

  return (
    <>
      {/* ambient trailing glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[5] w-64 h-64 rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          background:
            'radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* precise ring cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[5] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference"
        style={{ x: ringX, y: ringY, borderColor: 'rgba(255,255,255,0.9)' }}
        animate={{
          width: hovering ? 56 : 24,
          height: hovering ? 56 : 24,
          borderWidth: hovering ? 1 : 1.5,
          opacity: hovering ? 0.9 : 0.7,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        aria-hidden="true"
      />

      {/* precise center dot — always exactly at the real pointer */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[5] w-1 h-1 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
        style={{ x, y, opacity: hovering ? 0 : 1 }}
        aria-hidden="true"
      />
    </>
  )
}
