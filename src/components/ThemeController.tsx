import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Theme } from "@/lib/theme"

export function ThemeController() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const themes: { id: Theme; label: string; icon: any }[] = [
    { id: 'light', label: 'Clair', icon: Sun },
    { id: 'dark', label: 'Sombre', icon: Moon },
    { id: 'system', label: 'Système', icon: Monitor },
  ]

  const currentThemeInfo = themes.find(t => t.id === theme) || themes[1]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300",
          "bg-accent/5 border-accent/10 hover:bg-accent/10 hover:border-accent/20",
          isOpen && "bg-accent/10 border-accent/20"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: 5, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -5, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <currentThemeInfo.icon className="w-4 h-4 text-accent" />
          </motion.div>
        </AnimatePresence>
        <span className="text-[10px] font-bold uppercase tracking-wider text-foreground hidden sm:inline-block">
          {currentThemeInfo.label}
        </span>
        <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-36 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl z-[110] p-1.5 overflow-hidden"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                  theme === t.id 
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" 
                    : "text-foreground hover:bg-accent/10 hover:text-accent"
                )}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
