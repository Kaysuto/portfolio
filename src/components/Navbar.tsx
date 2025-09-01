import { Code, Sun, Moon, List, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useKV } from "@github/spark/hooks"
import { useEffect, useState } from "react"

export function Navbar() {
  const [isDark, setIsDark, deleteTheme] = useKV("theme-dark", false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 animate-fadeIn ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-accent/5 border-b border-border/50' 
        : 'bg-background/80 backdrop-blur-sm border-b border-border'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer animate-slideInFromLeft">
            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
              <Code size={20} className="text-accent group-hover:animate-pulse" />
            </div>
            <div className="transition-all duration-300 group-hover:scale-105">
              <span className="font-medium text-foreground group-hover:text-accent">Kaysuto</span>
              <span className="text-muted-foreground ml-1 group-hover:text-foreground">Kimiya</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 animate-fadeIn animate-delay-200">
            {[
              { id: "accueil", label: "Accueil" },
              { id: "apropos", label: "À propos" },
              { id: "projets", label: "Projets" },
              { id: "contact", label: "Contact" }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-accent transition-all duration-300 relative group animate-fadeInUp"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 animate-slideInFromRight animate-delay-100">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
            >
              <div className="relative">
                {isDark ? (
                  <Sun size={18} className="text-accent group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon size={18} className="text-accent group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </div>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent/10 transition-all duration-300 hover:scale-110"
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X size={18} className="text-accent rotate-180 transition-transform duration-300" />
                ) : (
                  <List size={18} className="text-accent transition-transform duration-300" />
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-64 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-3">
            {[
              { id: "accueil", label: "Accueil" },
              { id: "apropos", label: "À propos" },
              { id: "projets", label: "Projets" },
              { id: "contact", label: "Contact" }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-2 text-muted-foreground hover:text-accent hover:translate-x-2 transition-all duration-300 animate-stagger ${
                  isMobileMenuOpen ? 'animate-delay-' + ((index + 1) * 100) : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}