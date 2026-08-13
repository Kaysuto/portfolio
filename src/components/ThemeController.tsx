import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

interface ThemeControllerProps {
  /**
   * `icone` : pastille carrée de l'îlot desktop.
   * `onglet` : même gabarit que les entrées de la barre mobile du bas, pour que
   * le bouton s'y fonde au lieu d'y flotter.
   */
  variante?: "icone" | "onglet"
}

export function ThemeController({ variante = "icone" }: ThemeControllerProps) {
  const { theme, setTheme } = useTheme()
  const estSombre = theme === "dark"
  const Icone = estSombre ? Moon : Sun

  const basculer = () => setTheme(estSombre ? "light" : "dark")
  const libelleAccessible = estSombre ? "Passer en mode clair" : "Passer en mode sombre"

  /* Les deux icônes se croisent au même endroit : la boîte est dimensionnée en
     dur et l'icône animée posée en absolu, sinon la bascule ferait sauter la
     hauteur du bouton le temps du fondu. */
  const iconeAnimee = (taille: string) => (
    <span className={cn("relative grid place-items-center", taille)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={estSombre ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute"
        >
          <Icone className={taille} />
        </motion.span>
      </AnimatePresence>
    </span>
  )

  if (variante === "onglet") {
    return (
      <button
        onClick={basculer}
        aria-label={libelleAccessible}
        className="relative w-full h-16 flex flex-col items-center justify-center gap-1.5 px-1 text-muted-foreground"
      >
        <span className="relative z-10 w-[20px] h-[20px]">{iconeAnimee("w-[20px] h-[20px]")}</span>
        {/*
          Libellé fixe et non « Clair »/« Sombre » : la barre garde six colonnes
          de largeur égale, un libellé qui change de longueur à chaque bascule y
          ferait respirer les voisins. L'état réel est porté par `aria-label`.
        */}
        <span className="relative z-10 text-[11px] leading-none tracking-tight font-normal">
          Thème
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={basculer}
      aria-label={libelleAccessible}
      className="relative size-11 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {iconeAnimee("size-[18px]")}
    </button>
  )
}
