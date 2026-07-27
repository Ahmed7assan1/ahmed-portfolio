import { forwardRef, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

const GlassCard = forwardRef(function GlassCard(
  { children, className = '', hover = true, tilt = true, as: Tag = 'div', ...rest },
  ref
) {
  const innerRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const rotateXVal = useMotionValue(0)
  const rotateYVal = useMotionValue(0)
  const springRX = useSpring(rotateXVal, { stiffness: 260, damping: 22 })
  const springRY = useSpring(rotateYVal, { stiffness: 260, damping: 22 })

  const setRefs = useCallback(
    (node) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const handleMouseMove = useCallback(
    (e) => {
      const el = innerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)

      if (tilt && !reduceMotion) {
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        rotateYVal.set(px * 6)
        rotateXVal.set(-py * 6)
      }
    },
    [tilt, reduceMotion, rotateXVal, rotateYVal]
  )

  const handleMouseLeave = useCallback(() => {
    rotateXVal.set(0)
    rotateYVal.set(0)
  }, [rotateXVal, rotateYVal])

  const Component = Tag === 'button' ? motion.button : motion.div

  return (
    <Component
      ref={setRefs}
      onMouseMove={hover ? handleMouseMove : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
      style={tilt ? { rotateX: springRX, rotateY: springRY, transformPerspective: 800 } : undefined}
      className={`glass luxe-border rounded-lg p-card relative overflow-hidden ${
        hover ? 'glass-hover group/luxe' : ''
      } ${className}`}
      {...rest}
    >
      {hover && (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/luxe:opacity-100 luxe-spotlight-layer"
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  )
})

export default GlassCard
