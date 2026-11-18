import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, VIEWPORT, EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: ReactNode
  /** Chapeau optionnel sous le titre. */
  lead?: ReactNode
  className?: string
}

/**
 * En-tête de section commun à tout le site : un titre aligné à gauche qui se
 * lève derrière un masque, comme un volet, et un chapeau optionnel. Pas de
 * numérotation : les sections se lisent à leur titre.
 */
export function SectionHeading({ title, lead, className }: SectionHeadingProps) {
  const mouvementReduit = useReducedMotion()

  return (
    <motion.div variants={fadeInUp} className={cn("relative mb-8 md:mb-10", className)}>
      {/* `pb-3 -mb-3` rend au masque la place des jambages (le « j » de « Projets »). */}
      <h2 className="relative overflow-hidden pb-3 -mb-3 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground md:text-7xl">
        <motion.span
          className="block"
          initial={mouvementReduit ? false : { y: "110%" }}
          whileInView={{ y: "0%" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.05 }}
        >
          {title}
        </motion.span>
      </h2>

      {lead && (
        <p className="relative mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {lead}
        </p>
      )}
    </motion.div>
  )
}

interface RailLabelProps {
  children: ReactNode
  className?: string
}

/** Intertitre d'un bloc au sein d'une section. */
export function RailLabel({ children, className }: RailLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground",
        className
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  )
}
