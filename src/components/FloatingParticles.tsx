import { useEffect, useState, memo, useMemo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

const FloatingParticles = memo(function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  // Optimization: Reduce particle count for better performance
  const particleCount = useMemo(() => {
    return window.innerWidth < 768 ? 20 : 50
  }, [])

  useEffect(() => {
    // Initialize particles with optimized count
    const initialParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
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
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
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
})

export { FloatingParticles }