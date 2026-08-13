import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { EASE_OUT } from "@/lib/animations"

/** Cible du geste : la première section sous le hero. */
const ID_SECTION_SUIVANTE = "apropos"

/**
 * Repère de défilement posé en bas du hero.
 *
 * Deux variantes plutôt qu'une seule : la molette de souris ne veut rien dire
 * au doigt, et un chevron seul est bien pauvre au pointeur. La bascule se fait
 * à `md`, comme partout ailleurs sur le site.
 *
 * Le repère reste dans le flux du hero, sous le contenu centré par `my-auto`.
 * En absolu il aurait fallu deviner la place libre, et le pari est intenable :
 * sur mobile la media query voit la hauteur barres rétractées alors que le hero
 * mesure `100svh`, donc bien moins. Dans le flux, le chevauchement ne peut plus
 * se produire, quelle que soit la hauteur de fenêtre.
 */
export function ScrollIndicator() {
  const mouvementReduit = useReducedMotion()

  const allerSectionSuivante = () => {
    document.getElementById(ID_SECTION_SUIVANTE)?.scrollIntoView({
      behavior: mouvementReduit ? "auto" : "smooth",
    })
  }

  return (
    <motion.button
      type="button"
      onClick={allerSectionSuivante}
      aria-label="Défiler vers la section suivante"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: EASE_OUT }}
      /*
        Marge basse mobile : la barre d'onglets flottante occupe 4 rem
        détachées de 0,75 rem du bas. 6 rem la dégagent, c'est la même réserve
        que celle posée par le gabarit.
      */
      className="group relative z-10 mx-auto flex flex-col items-center gap-3 rounded-md p-2 mb-[calc(env(safe-area-inset-bottom,0px)+6rem)] md:mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <span className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground group-hover:text-accent-texte transition-colors">
        Défiler
      </span>

      {/*
        Desktop : coque de souris, molette qui descend en boucle.
        `bg-accent-texte` et non `bg-accent` : l'accent clair est une couleur de
        surface, elle ne donne que 2,4:1 sur le crème. Sur un point de 6 px, la
        molette devenait invisible en thème clair.
      */}
      <span
        className="hidden md:block w-[26px] h-11 rounded-full border border-border group-hover:border-accent/50 transition-colors"
        aria-hidden="true"
      >
        <span className="molette-animee block mx-auto mt-2.5 size-2 rounded-full bg-accent-texte" />
      </span>

      {/* Mobile : chevron qui plonge, le geste du doigt plutôt que la molette */}
      <span className="chevron-anime md:hidden block text-accent-texte" aria-hidden="true">
        <ChevronDown className="size-6" />
      </span>
    </motion.button>
  )
}
