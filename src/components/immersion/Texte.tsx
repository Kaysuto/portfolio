import { Fragment } from "react"
import { motion, type Variants } from "framer-motion"
import { EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

const paragraphe: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.025 } } }
const motMontant: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: EASE_OUT } },
}

/**
 * Paragraphe dont les mots montent un à un derrière un masque, en vague, la
 * première fois qu'il entre à l'écran. Le texte complet est donné une fois aux
 * technologies d'assistance ; les mots animés leur sont masqués. Sous
 * « réduire les animations », il s'affiche directement.
 */
export function ParagrapheRevele({ texte, className }: { texte: string; className?: string }) {
  const mots = texte.split(" ")
  return (
    <motion.p
      className={className}
      variants={paragraphe}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <span className="sr-only">{texte}</span>
      {mots.map((mot, index) => (
        <Fragment key={index}>
          <span aria-hidden="true" className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span variants={motMontant} className="inline-block">
              {mot}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </motion.p>
  )
}

/**
 * Mot dont les lettres montent une à une derrière un masque. Le mot entier
 * reste lisible par les technologies d'assistance via `aria-label`.
 */
export function LettresMontantes({ texte, className, delai = 0 }: { texte: string; className?: string; delai?: number }) {
  return (
    <span aria-label={texte} className={cn("inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]", className)}>
      {texte.split("").map((lettre, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: delai + index * 0.05 }}
        >
          {lettre}
        </motion.span>
      ))}
    </span>
  )
}
