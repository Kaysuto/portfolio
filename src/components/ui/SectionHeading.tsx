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
 * En-tête de section commun à tout le site : numéro, titre aligné à gauche
 * et filet qui court jusqu'au bord. Remplace les en-têtes centrés d'avant,
 * pour donner au portfolio une lecture de page imprimée plutôt que de
 * empilement de blocs centrés.
 */
export function SectionHeading({ index, title, lead, className }: SectionHeadingProps) {
  return (
    <motion.div variants={fadeInUp} className={cn("mb-12", className)}>
      <div className="flex items-baseline gap-4 mb-5">
        <motion.span
          className="font-mono text-xs font-bold text-accent tabular-nums shrink-0"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          {index}
        </motion.span>
        <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-none">
          {title}
        </h2>
        {/* Le filet se trace depuis la gauche, en scaleX : pas de recalcul de
            largeur, l'animation reste sur le compositeur. */}
        <motion.span
          className="h-px flex-1 bg-border/60 translate-y-[-0.35em] origin-left"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
        />
      </div>
      {/* L'indentation aligne le chapeau sur le titre, mais coûte trop de
          largeur en dessous de md : on la réserve au grand écran. */}
      {lead && (
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium max-w-2xl md:pl-[2.75rem]">
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

/** Étiquette de rail latéral, collante sur grand écran. */
export function RailLabel({ children, className }: RailLabelProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground lg:sticky lg:top-28",
        className
      )}
    >
      {children}
    </p>
  )
}
