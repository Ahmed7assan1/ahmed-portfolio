import { motion } from 'motion/react'
import { SocialIcon } from '../../lib/socialIcons.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { MotionReveal, MotionStagger, MotionItem } from '../ui/MotionReveal.jsx'
import { fadeUp, scaleIn } from '../../lib/motion.js'
import MagneticButton from '../ui/MagneticButton.jsx'

export default function Contact({ profile }) {
  const { data: socialLinks } = useSupabaseCRUD('social_links')

  return (
    <section id="contact" className="section-container section-padding">
      <MotionReveal variant={scaleIn}>
        <div className="relative rounded-[2rem] overflow-hidden glass luxe-border px-6 sm:px-12 py-16 sm:py-20 text-center">
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 15%, rgba(56,189,248,0.14), transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 80% 90%, rgba(255,255,255,0.05), transparent 70%)',
            }}
          />

          <span className="eyebrow mb-5 inline-block">Let's Work Together</span>
          <h2 className="font-display text-on-surface text-[clamp(2.25rem,7vw,5rem)] font-semibold leading-[1.05] max-w-3xl mx-auto mb-8">
            Have a project in mind? Let's build something extraordinary.
          </h2>

          <MagneticButton
            href={`mailto:${profile?.email || ''}`}
            className="btn-primary text-base px-8 py-4"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Get In Touch
            <motion.span className="inline-block" whileHover={{ x: 4 }}>
              →
            </motion.span>
          </MagneticButton>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-widest text-on-surface-variant/70 border-t border-white/10 pt-6">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                {profile.email}
              </a>
            )}
            {profile?.phone && (
              <a href={`tel:${profile.phone}`} className="hover:text-primary transition-colors">
                {profile.phone}
              </a>
            )}
            {profile?.location && <span>{profile.location}</span>}
          </div>

          {socialLinks?.length > 0 && (
            <MotionStagger className="mt-8 flex flex-wrap justify-center gap-3" stagger={0.06}>
              {socialLinks.map((s) => (
                <MotionItem key={s.id} variant={fadeUp}>
                  <motion.a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    title={s.platform}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-colors group"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialIcon
                      platform={s.icon || s.platform}
                      className="w-[18px] h-[18px] fill-on-surface-variant group-hover:fill-primary transition-colors duration-300"
                    />
                  </motion.a>
                </MotionItem>
              ))}
            </MotionStagger>
          )}
        </div>
      </MotionReveal>
    </section>
  )
}
