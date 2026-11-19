import type { Variants } from "framer-motion"

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Apparitions au défilement, inspirées d'AnimatedContent (React Bits) : le
 * contenu remonte de loin, en « power3.out », dès qu'il entre de 10 % dans
 * l'écran, et chaque enfant d'un conteneur suit à 80 ms d'écart. Framer Motion
 * fait déjà tout cela, donc pas de GSAP en plus.
 */
const POWER3_OUT: [number, number, number, number] = [0.215, 0.61, 0.355, 1]

export const VIEWPORT = { once: true, amount: 0.1 }

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 64 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: POWER3_OUT } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: POWER3_OUT } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
