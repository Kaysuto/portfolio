import { Code, Sun, Moon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useKV } from "@github/spark/hooks"
import { useEffect } from "react"

export function Navbar() {
  const [isDark, setIsDark, deleteTheme] = useKV("theme-dark", false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Code size={20} className="text-accent" />
            </div>
            <div>
              <span className="font-medium text-foreground">Kaysuto</span>
              <span className="text-muted-foreground ml-1">Kimiya</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("accueil")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("apropos")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection("projets")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Projets
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </button>
          </div>

          {/* Theme Toggle & Status */}
          <div className="flex items-center space-x-4">
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-accent/10"
            >
              {isDark ? (
                <Sun size={18} className="text-accent" />
              ) : (
                <Moon size={18} className="text-accent" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simple version for now */}
      <div className="md:hidden border-t border-border bg-background/95">
        <div className="px-6 py-3 flex justify-center space-x-6">
          <button
            onClick={() => scrollToSection("accueil")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Accueil
          </button>
          <button
            onClick={() => scrollToSection("apropos")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            À propos
          </button>
          <button
            onClick={() => scrollToSection("projets")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Projets
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}