import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Bouton flottant « retour en haut » — apparaît après défilement.
 * Placé au-dessus de la nav mobile pour éviter tout chevauchement.
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Retour en haut de la page"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.92 }}
          className={cn(
            "fixed right-5 bottom-24 md:bottom-6 z-40 grid place-items-center",
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
