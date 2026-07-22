import { socialPlatforms, SocialIcon } from '../../lib/socialIcons.jsx'

export default function SocialIconPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
      {socialPlatforms.map(({ id, label }) => {
        const selected = value === id
        return (
          <button
            key={id}
            type="button"
            title={label}
            onClick={() => onChange(id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 ${
              selected
                ? 'border-primary bg-primary/15 shadow-glow scale-105'
                : 'border-white/10 bg-surface-container-low hover:border-primary/40 hover:bg-primary/5'
            }`}
          >
            <SocialIcon
              platform={id}
              className={`w-5 h-5 transition-colors ${selected ? 'fill-primary' : 'fill-on-surface-variant'}`}
            />
            <span className="text-[10px] font-mono text-on-surface-variant truncate w-full text-center">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
