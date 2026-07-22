export default function SectionHeading({ eyebrow, title, align = 'left', className = '' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
        {title}
      </h2>
    </div>
  )
}
