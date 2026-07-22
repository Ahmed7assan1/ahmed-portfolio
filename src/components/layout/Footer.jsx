import { SocialIcon } from '../../lib/socialIcons.jsx'

export default function Footer({ fullName, socialLinks = [] }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="section-container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-on-surface-variant text-sm">
          © {year} {fullName || 'Portfolio'}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest border border-white/10 hover:border-primary/50 hover:bg-primary/15 transition-all duration-300 hover:scale-110 hover:shadow-glow group"
              title={s.platform}
            >
              <SocialIcon
                platform={s.icon || s.platform}
                className="w-[18px] h-[18px] fill-on-surface-variant group-hover:fill-primary transition-colors duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
