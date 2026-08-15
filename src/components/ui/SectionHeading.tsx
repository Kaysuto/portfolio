import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { fadeInUp, VIEWPORT, EASE_OUT } from "@/lib/animations"
import { SECTIONS } from "@/constants"
import { cn } from "@/lib/utils"

/*
  « accueil » est le hero : il ouvre la page sans porter de numéro. Le total est
  donc dérivé d'ici plutôt qu'écrit en dur — ajouter une section au sommaire
  met la jauge à jour toute seule.
*/
const NOMBRE_SECTIONS = SECTIONS.filter((section) => section !== "accueil").length

interface SectionHeadingProps {
  /** Numéro d'ordre affiché en tête, façon sommaire éditorial (« 01 »). */
  index: string
  title: ReactNode
  /** Chapeau optionnel sous le titre. */
  lead?: ReactNode
  className?: string
}

/**
 * En-tête de section commun à tout le site.
 *
 * Trois idées, toutes au service de la même question — « où en suis-je ? » :
 *
 * 1. Le numéro est donné sur son total (« 02 / 04 »). Seul, « 02 » disait
 *    l'ordre mais pas la longueur du parcours.
 * 2. Le filet unique est devenu une jauge : un segment par section, le segment
 *    courant allongé et en accent. C'est le même trait d'un pixel qu'avant,
 *    mais il situe au lieu de seulement décorer.
 * 3. Le titre se lève derrière une bande, comme un volet. C'est le seul geste
 *    purement graphique, et il s'efface si le visiteur a demandé moins
 *    d'animation.
 */
export function SectionHeading({ index, title, lead, className }: SectionHeadingProps) {
  const mouvementReduit = useReducedMotion()
  const rangCourant = Number(index)

  return (
    <motion.div
      variants={fadeInUp}
      className={cn("mb-16 flex flex-col items-center text-center", className)}
    >
      <motion.p
        className="flex items-baseline gap-1.5 font-mono text-xs font-medium tabular-nums"
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <span className="tracking-[0.3em] text-accent-texte">{index}</span>
        <span className="tracking-[0.2em] text-muted-foreground/60">
          / {String(NOMBRE_SECTIONS).padStart(2, "0")}
        </span>
      </motion.p>

      {/*
        `overflow-hidden` sert de volet au titre. Le `pb-2 -mb-2` rend au bloc la
        place des jambages : sans lui, le « j » de « Projets » se faisait couper
        par la bande, `leading-none` ne laissant aucune marge sous la ligne.
      */}
      <h2 className="mt-4 overflow-hidden pb-2 -mb-2 text-4xl md:text-5xl font-semibold text-foreground leading-none">
        <motion.span
          className="block"
          initial={mouvementReduit ? false : { y: "110%" }}
          whileInView={{ y: "0%" }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.05 }}
        >
          {title}
        </motion.span>
      </h2>

      {/*
        La jauge de sommaire. Chaque segment se trace en `scaleX` depuis son
        centre, en cascade : pas de recalcul de largeur, l'animation reste sur
        le compositeur.
      */}
      <div className="mt-6 flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: NOMBRE_SECTIONS }).map((_, rang) => (
          <motion.span
            key={rang}
            className={cn(
              "h-px origin-center transition-[width,background-color] duration-500",
              rang + 1 === rangCourant ? "w-12 bg-accent" : "w-5 bg-border"
            )}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.15 + rang * 0.07 }}
          />
        ))}
      </div>

      {lead && (
        <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-balance">
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
        "font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground text-center",
        className
      )}
    >
      {children}
    </p>
  )
}
