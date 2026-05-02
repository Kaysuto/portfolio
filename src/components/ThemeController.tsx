import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

export function ThemeController() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0,   scale: 1   }}
          exit={{    opacity: 0, rotate:  30, scale: 0.7 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute"
        >
          {isDark
            ? <Moon className="w-4 h-4" />
            : <Sun  className="w-4 h-4" />
          }
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
