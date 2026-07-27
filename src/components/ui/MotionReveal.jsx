import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { fadeUp, viewportOnce } from '../../lib/motion.js'

export function MotionReveal({
  children,
  className = '',
  variant = fadeUp,
  delay = 0,
  as = 'div',
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  if (reduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        ...variant,
        visible: {
          ...variant.visible,
          transition: {
            ...variant.visible.transition,
            delay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}

export const MotionStagger = forwardRef(function MotionStagger(
  { children, className = '', stagger = 0.1, delay = 0.08, as = 'div', ...props },
  ref
) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  if (reduceMotion) {
    const Tag = as
    return (
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Component
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
})

export function MotionItem({ children, className = '', variant = fadeUp, as = 'div', ...props }) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] || motion.div

  if (reduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Component variants={variant} className={className} {...props}>
      {children}
    </Component>
  )
}
