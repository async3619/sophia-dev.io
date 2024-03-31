import { useEffect, useState } from 'react'

export function useIntersection<TElement extends Element>() {
  const [element, setElement] = useState<TElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(true)

  useEffect(() => {
    if (!element) {
      return () => {}
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [element])

  return [setElement, isIntersecting] as const
}
