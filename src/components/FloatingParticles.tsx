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
  const [particules, setParticules] = useState<Particle[]>([])

  // Optimisation : réduit le nombre de particules pour de meilleures performances
  const nombreParticules = useMemo(() => {
    return window.innerWidth < 768 ? 20 : 50
  }, [])

  useEffect(() => {
    // Initialise les particules avec le nombre optimisé
    const particulesInitiales: Particle[] = []
    for (let i = 0; i < nombreParticules; i++) {
      particulesInitiales.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1
      })
    }
    setParticules(particulesInitiales)

    // Boucle d'animation
    const animerParticules = () => {
      setParticules(precedent =>
        precedent.map(particule => {
          const nouveauX = particule.x + particule.speedX;
          const nouveauY = particule.y + particule.speedY;

          return {
            ...particule,
            // Met à jour la position et boucle autour des bords de l'écran
            x: nouveauX > window.innerWidth ? 0 : nouveauX < 0 ? window.innerWidth : nouveauX,
            y: nouveauY > window.innerHeight ? 0 : nouveauY < 0 ? window.innerHeight : nouveauY
          };
        })
      )
    }

    const intervalle = setInterval(animerParticules, 50)
    return () => clearInterval(intervalle)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particules.map(particule => (
        <div
          key={particule.id}
          className="absolute rounded-full bg-accent/20 dark:bg-primary/15 animate-pulse"
          style={{
            left: particule.x,
            top: particule.y,
            width: particule.size,
            height: particule.size,
            opacity: particule.opacity,
            transition: 'all 0.3s ease'
          }}
        />
      ))}
    </div>
  )
})

export { FloatingParticles }
