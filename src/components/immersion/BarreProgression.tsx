import { motion, useScroll, useSpring } from "framer-motion"

/**
 * Fil de lecture en haut de l'écran : il se remplit à mesure qu'on descend dans
 * la page. Le ressort lisse les à-coups de la molette sans retarder la lecture.
 */
export function BarreProgression() {
  const { scrollYProgress } = useScroll()
  const echelle = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: echelle }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  )
}
