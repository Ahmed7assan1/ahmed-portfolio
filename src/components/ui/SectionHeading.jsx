import { motion } from 'motion/react'
import { easeOut, fadeUp, lineGrow, staggerContainer } from '../../lib/motion.js'

const wordVariants = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: easeOut } },
}

export default function SectionHeading({ eyebrow, title, index, align = 'left', className = '' }) {
  return (
    <motion.div
      className={`mb-10 sm:mb-12 flex flex-col ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      } ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={staggerContainer(0.1, 0)}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
        {index && (
          <span className="font-mono text-label-mono text-on-surface-variant/50">{index}</span>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      </motion.div>
      <motion.h2
        variants={staggerContainer(0.04, 0)}
        className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface max-w-2xl"
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      <motion.div
        variants={lineGrow}
        className={`mt-4 h-px w-20 bg-gradient-to-r from-primary via-secondary to-transparent origin-left ${
          align === 'center' ? 'mx-auto origin-center' : ''
        }`}
      />
    </motion.div>
  )
}
