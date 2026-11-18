import { motion, AnimatePresence } from "framer-motion"
import { useLangue } from "@/lib/langue"
import { cn } from "@/lib/utils"

/**
 * Bascule français / anglais, au même gabarit que la bascule de thème :
 * `icone` pour l'îlot desktop, `onglet` pour la barre mobile du bas.
 * Le bouton affiche la langue courante ; un clic passe à l'autre.
 */
export function LangueController({ variante = "icone" }: { variante?: "icone" | "onglet" }) {
  const { langue, setLangue, t } = useLangue()
  const suivante = langue === "fr" ? "en" : "fr"
  const libelleAccessible = t("Passer le site en anglais", "Switch the site to French")

  const code = (taille: string) => (
    <span className={cn("relative grid place-items-center", taille)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={langue}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute text-[13px] font-semibold uppercase tracking-tight"
        >
          {langue}
        </motion.span>
      </AnimatePresence>
    </span>
  )

  if (variante === "onglet") {
    return (
      <button
        onClick={() => setLangue(suivante)}
        aria-label={libelleAccessible}
        className="relative w-full h-16 flex flex-col items-center justify-center gap-1.5 px-1 text-muted-foreground"
      >
        <span className="relative z-10 w-[20px] h-[20px]">{code("w-[20px] h-[20px]")}</span>
        <span className="relative z-10 text-[11px] leading-none tracking-tight font-normal">{t("Langue", "Language")}</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setLangue(suivante)}
      aria-label={libelleAccessible}
      lang={suivante}
      className="relative size-11 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {code("size-[18px]")}
    </button>
  )
}
