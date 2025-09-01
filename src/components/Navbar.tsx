import { Code, Sun, Moon, List, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useKV } from "@github/spark/hooks"
import { useEffect, useState } from "react"

export function Navbar() {
  const [isDark, setIsDark, deleteTheme] = useKV("theme-dark", false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false)
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

          {/* Desktop Navigation Links */}
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

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
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

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent/10"
            >
              {isMobileMenuOpen ? (
                <X size={18} className="text-accent" />
              ) : (
                <List size={18} className="text-accent" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-3">
            <button
              onClick={() => scrollToSection("accueil")}
              className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("apropos")}
              className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              À propos
            </button>
            <button
              onClick={() => scrollToSection("projets")}
              className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Projets
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}