import { useState, useEffect, useRef } from 'react'

interface UseCounterAnimationProps {
  end: number
  duration?: number
  start?: number
}

export function useCounterAnimation({ end, duration = 2000, start = 0 }: UseCounterAnimationProps) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [currentEnd, setCurrentEnd] = useState(end)
  const elementRef = useRef<HTMLDivElement>(null)

  // Mettre à jour la valeur finale quand elle change
  useEffect(() => {
    if (end !== currentEnd && end > 0) {
      setCurrentEnd(end)
      setHasAnimated(false) // Permettre une nouvelle animation si la valeur change
    }
  }, [end, currentEnd])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated && currentEnd > 0) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      {
        threshold: 0.3, // Déclenche quand 30% de l'élément est visible
        rootMargin: '0px 0px -100px 0px' // Déclenche un peu avant que l'élément soit complètement visible
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasAnimated, currentEnd])

  useEffect(() => {
    if (!isVisible || currentEnd === 0) return

    const startTime = Date.now()
    const startValue = start
    const endValue = currentEnd

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Fonction d'easing plus fluide (ease-out quadratique avec transition douce)
      const easeOutQuad = 1 - Math.pow(1 - progress, 2)
      
      // Interpolation avec nombres entiers uniquement
      const currentCount = startValue + (endValue - startValue) * easeOutQuad
      
      // Utilisation de Math.floor pour avoir uniquement des entiers
      setCount(Math.floor(currentCount))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, currentEnd, start, duration])

  return { count, elementRef }
}