import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

export function ThemeController() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative flex items-center w-14 h-7 rounded-full border border-border/50 bg-muted/60 hover:bg-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      {/* Icons */}
      <Sun className="absolute left-1.5 w-3.5 h-3.5 text-amber-400" />
      <Moon className="absolute right-1.5 w-3.5 h-3.5 text-accent" />

      {/* Thumb */}
      <motion.span
        layout
        animate={{ x: isDark ? 28 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute w-5 h-5 rounded-full bg-background border border-border/60 shadow-sm"
      />
    </button>
  )
}
