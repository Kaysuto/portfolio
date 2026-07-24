import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Bouton flottant « retour en haut » — apparaît après défilement.
 * Placé au-dessus de la nav mobile pour éviter tout chevauchement.
 */
export function BackToTop() {
  const [estVisible, setEstVisible] = useState(false)
  const mouvementReduit = useReducedMotion()

  useEffect(() => {
    const surDefilement = () => setEstVisible(window.scrollY > 600)
    window.addEventListener("scroll", surDefilement, { passive: true })
    surDefilement()
    return () => window.removeEventListener("scroll", surDefilement)
  }, [])

  const defilerVersHaut = () => {
    window.scrollTo({ top: 0, behavior: mouvementReduit ? "auto" : "smooth" })
  }

  return (
    <AnimatePresence>
      {estVisible && (
        <motion.button
          type="button"
          onClick={defilerVersHaut}
          aria-label="Retour en haut de la page"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.25rem)" }}
          className={cn(
            "fixed right-5 md:!bottom-6 z-30 grid place-items-center",
            "size-11 rounded-full text-accent-foreground",
            "bg-accent shadow-lg shadow-accent/20 ring-1 ring-accent/30",
            "hover:bg-accent/90 transition-colors"
          )}
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
