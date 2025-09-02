import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Respect reduced motion and defer until after first paint to not affect LCP
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    // Defer mount to next frame to avoid main-thread contention around LCP
    const id = requestIdleCallback ? requestIdleCallback(() => setEnabled(true), { timeout: 1000 }) : setTimeout(() => setEnabled(true), 0) as unknown as number
    return () => {
      if (typeof id === 'number') cancelIdleCallback?.(id as unknown as number)
      else clearTimeout(id as unknown as number)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    // Initialize particles
    const initialParticles: Particle[] = []
    for (let i = 0; i < 15; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1
      })
    }
    setParticles(initialParticles)

    // Animation loop
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => {
          const newX = particle.x + particle.speedX;
          const newY = particle.y + particle.speedY;
          
          return {
            ...particle,
            // Update position and wrap around screen edges
            x: newX > window.innerWidth ? 0 : newX < 0 ? window.innerWidth : newX,
            y: newY > window.innerHeight ? 0 : newY < 0 ? window.innerHeight : newY
          };
        })
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [enabled])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {enabled && particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-accent/20 dark:bg-primary/15 animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </div>
  )
}