import { motion } from 'motion/react'
import { SocialIcon } from '../../lib/socialIcons.jsx'
import { fadeUp, viewportOnce } from '../../lib/motion.js'

export default function Footer({ fullName, socialLinks = [] }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 mt-8 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <motion.div
        className="section-container py-10 flex flex-col md:flex-row items-center justify-between gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.p variants={fadeUp} className="text-on-surface-variant text-sm">
          © {year} {fullName || 'Portfolio'}. All rights reserved.
        </motion.p>
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <motion.a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest border border-white/10 hover:border-primary/50 hover:bg-primary/15 transition-colors group"
              title={s.platform}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <SocialIcon
                platform={s.icon || s.platform}
                className="w-[18px] h-[18px] fill-on-surface-variant group-hover:fill-primary transition-colors duration-300"
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  )
}
