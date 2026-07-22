import { useCallback, useEffect, useRef, useState } from 'react'

function isInViewport(node) {
  const rect = node.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export function useStaggerReveal({ threshold = 0.08, rootMargin = '0px 0px -5% 0px' } = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    const fallback = setTimeout(() => setIsVisible(true), 1200)
    return () => {
      clearTimeout(fallback)
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [])

  const ref = useCallback(
    (node) => {
      observerRef.current?.disconnect()
      observerRef.current = null

      if (!node) return

      if (typeof IntersectionObserver === 'undefined') {
        setIsVisible(true)
        return
      }

      const reveal = () => setIsVisible(true)

      if (isInViewport(node)) {
        reveal()
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal()
            observer.disconnect()
            observerRef.current = null
          }
        },
        { threshold, rootMargin }
      )

      observer.observe(node)
      observerRef.current = observer

      requestAnimationFrame(() => {
        if (isInViewport(node)) reveal()
      })
    },
    [threshold, rootMargin]
  )

  const itemClass = () =>
    `transition-all duration-700 ease-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`

  const itemStyle = (index = 0) => ({
    transitionDelay: isVisible ? `${index * 90}ms` : '0ms',
  })

  return { ref, isVisible, itemClass, itemStyle }
}
