import { forwardRef } from 'react'

const GlassCard = forwardRef(function GlassCard({ children, className = '', hover = true, as: Tag = 'div', ...rest }, ref) {
  return (
    <Tag
      ref={ref}
      className={`glass rounded-lg p-card ${hover ? 'glass-hover' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default GlassCard
