import SectionHeading from '../ui/SectionHeading.jsx'
import GlassCard from '../ui/GlassCard.jsx'
import { SocialIcon } from '../../lib/socialIcons.jsx'
import { useSupabaseCRUD } from '../../hooks/useSupabaseCRUD.js'
import { useStaggerReveal } from '../../hooks/useStaggerReveal.js'

export default function Contact({ profile }) {
  const { data: socialLinks } = useSupabaseCRUD('social_links')
  const { ref, isVisible } = useStaggerReveal()

  return (
    <section id="contact" className="section-container section-padding">
      <div
        ref={ref}
        className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div>
          <SectionHeading eyebrow="Let's Work Together" title="Have a project in mind?" />
          <p className="text-body-md text-on-surface-variant max-w-md mb-8">
            I'm always open to discussing new projects and opportunities. Let's create something
            amazing together.
          </p>
          <a href={`mailto:${profile?.email || ''}`} className="btn-primary group">
            Get In Touch
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <GlassCard>
          <ul className="space-y-4">
            {profile?.email && (
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-on-surface-variant group">
                <span className="text-primary font-mono text-sm sm:w-16 shrink-0">Email</span>
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors truncate min-w-0">
                  {profile.email}
                </a>
              </li>
            )}
            {profile?.phone && (
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-on-surface-variant">
                <span className="text-primary font-mono text-sm sm:w-16 shrink-0">Phone</span>
                <a href={`tel:${profile.phone}`} className="hover:text-primary transition-colors">
                  {profile.phone}
                </a>
              </li>
            )}
            {profile?.location && (
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-on-surface-variant">
                <span className="text-primary font-mono text-sm sm:w-16 shrink-0">Location</span>
                <span>{profile.location}</span>
              </li>
            )}
          </ul>

          {socialLinks?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-mono text-label-mono text-primary mb-4 uppercase tracking-widest">Connect</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    title={s.platform}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-surface-container-high border border-white/10 hover:border-primary/40 hover:bg-primary/10 text-sm text-on-surface-variant hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-glow group"
                  >
                    <SocialIcon
                      platform={s.icon || s.platform}
                      className="w-4 h-4 fill-on-surface-variant group-hover:fill-primary transition-colors"
                    />
                    <span>{s.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  )
}
