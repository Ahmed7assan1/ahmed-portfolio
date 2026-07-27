export const easeOut = [0.16, 1, 0.3, 1]
export const easeInOut = [0.65, 0, 0.35, 1]

export const viewportOnce = { once: true, amount: 0.15, margin: '-60px 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 56, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      y: { type: 'spring', stiffness: 110, damping: 16, mass: 0.9 },
      opacity: { duration: 0.5 },
      filter: { duration: 0.5 },
    },
  },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.86, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      scale: { type: 'spring', stiffness: 140, damping: 16, mass: 0.8 },
      opacity: { duration: 0.5 },
      filter: { duration: 0.5 },
    },
  },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -64, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 110, damping: 18, mass: 0.9 },
      opacity: { duration: 0.5 },
      filter: { duration: 0.5 },
    },
  },
}

export const slideRight = {
  hidden: { opacity: 0, x: 64, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      x: { type: 'spring', stiffness: 110, damping: 18, mass: 0.9 },
      opacity: { duration: 0.5 },
      filter: { duration: 0.5 },
    },
  },
}

export const staggerContainer = (stagger = 0.1, delay = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
}

export const springHover = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
}
