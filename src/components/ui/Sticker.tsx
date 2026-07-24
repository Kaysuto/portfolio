import { useState, type CSSProperties } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/** Stickers disponibles → fichier attendu dans public/stickers/. */
const STICKERS = {
  salut: "kimiya-salut.png",
  reflechit: "kimiya-reflechit.png",
  motive: "kimiya-motive.png",
  dodo: "kimiya-dodo.png",
  pouce: "kimiya-pouce.png",
  coeur: "kimiya-coeur.png",
} as const

export type StickerName = keyof typeof STICKERS

/**
 * Caractère du flottement au repos, propre à chaque sticker.
 * Les durées sont volontairement toutes différentes : à durée égale, les
 * stickers oscilleraient à l'unisson et l'effet paraîtrait mécanique.
 */
const REPOS: Record<StickerName, { y: string; rotA: string; rotB: string; duree: string }> = {
  salut: { y: "-6px", rotA: "0deg", rotB: "4deg", duree: "3.4s" },
  reflechit: { y: "-4px", rotA: "0deg", rotB: "-2.5deg", duree: "4.6s" },
  motive: { y: "-9px", rotA: "-2deg", rotB: "2deg", duree: "2.6s" },
  dodo: { y: "-3px", rotA: "0deg", rotB: "1.5deg", duree: "5.2s" },
  pouce: { y: "-5px", rotA: "0deg", rotB: "5deg", duree: "3s" },
  coeur: { y: "-5px", rotA: "0deg", rotB: "-3.5deg", duree: "3.9s" },
}

interface StickerProps {
  name: StickerName
  /**
   * Côté du carré, en pixels. Posé via les attributs `width`/`height` : ils
   * réservent la place (pas de saut de mise en page au chargement) tout en
   * restant surchargeables par une classe utilitaire — `md:w-32 md:h-32` par
   * exemple — sans avoir à recourir à `!important`.
   */
  size?: number
  /** Coupe le flottement au repos, si le contexte demande du calme. */
  still?: boolean
  className?: string
}

/**
 * Sticker décoratif du personnage.
 *
 * Purement ornemental : `alt` vide et `aria-hidden`, pour ne pas encombrer les
 * lecteurs d'écran. Si le fichier est absent, rien n'est rendu plutôt qu'une
 * image cassée.
 *
 * Deux calques, car `transform` ne peut pas porter deux animations concurrentes :
 *   · l'enveloppe assure le flottement continu, en CSS — les sections parentes
 *     déclarent des `variants` dont les libellés se propagent aux composants
 *     `motion` enfants, ce qui figeait une animation Framer Motion sur sa
 *     première image-clé ;
 *   · l'image assure son apparition à l'entrée dans le champ, en Framer Motion.
 *
 * Tout se limite à `transform` et `opacity` : ces propriétés restent sur le
 * compositeur, sans recalcul de mise en page ni repaint — à la différence des
 * halos flous retirés précédemment. L'ensemble s'efface si le système demande
 * moins de mouvement.
 */
export function Sticker({ name, size = 96, still = false, className }: StickerProps) {
  const [introuvable, setIntrouvable] = useState(false)
  const mouvementReduit = useReducedMotion()

  if (introuvable) return null

  const repos = REPOS[name]

  return (
    <span
      className={cn("inline-flex shrink-0", !still && "sticker-flotte")}
      style={
        {
          "--sticker-y": repos.y,
          "--sticker-rot-a": repos.rotA,
          "--sticker-rot-b": repos.rotB,
          "--sticker-duree": repos.duree,
        } as CSSProperties
      }
    >
      <motion.img
        src={`/stickers/${STICKERS[name]}`}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setIntrouvable(true)}
        className={cn("pointer-events-none select-none object-contain drop-shadow-sm", className)}
        initial={mouvementReduit ? false : { opacity: 0, scale: 0.55, rotate: -14 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 240, damping: 13, mass: 0.7 }}
      />
    </span>
  )
}
