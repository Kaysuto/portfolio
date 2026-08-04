import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { fadeInUp, VIEWPORT, EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Numéro d'ordre affiché en tête, façon sommaire éditorial (« 01 »). */
  index: string
  title: ReactNode
  /** Chapeau optionnel sous le titre. */
  lead?: ReactNode
  className?: string
}

/**
 * En-tête de section commun à tout le site : numéro, titre et filet, empilés
 * et centrés.
 */
export function SectionHeading({ index, title, lead, className }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn("mb-14 flex flex-col items-center text-center", className)}
    >
      <motion.span
        className="font-mono text-[10px] font-medium text-accent-texte tabular-nums tracking-[0.3em]"
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        {index}
      </motion.span>

      <h2 className="mt-3 text-3xl md:text-[2.5rem] font-semibold text-foreground leading-none">
        {title}
      </h2>

      {/* Le filet se trace depuis le centre, en scaleX : pas de recalcul de
          largeur, l'animation reste sur le compositeur. */}
      <motion.span
        className="mt-5 h-px w-20 bg-border origin-center"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
      />

      {lead && (
        <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl text-balance">
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

/** Intertitre d'un bloc au sein d'une section, centré comme le reste. */
export function RailLabel({ children, className }: RailLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground text-center",
        className
      )}
    >
      {children}
    </p>
  )
}
