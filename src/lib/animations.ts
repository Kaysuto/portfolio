import type { Variants, Transition } from "framer-motion"

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const VIEWPORT = { once: true, amount: 0.2 }

const baseTransition: Transition = { duration: 0.5, ease: EASE_OUT }

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
