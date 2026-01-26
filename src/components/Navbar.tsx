import { Code, Sun, Moon, List, X } from "@phosphor-icons/react"
import { Button, buttonVariants } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"
import { Link, useNavigate, useLocation } from "react-router-dom"


export function Navbar() {
  const { theme, toggle: toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("accueil")


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Vérifier si on doit scroller vers une section (venant de la page bio)
      const sectionToScroll = sessionStorage.getItem('scrollToSection')
      if (sectionToScroll && location.pathname === '/') {
        // Attendre que le DOM soit prêt
        setTimeout(() => {
          const element = document.getElementById(sectionToScroll)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setActiveSection(sectionToScroll)
            sessionStorage.removeItem('scrollToSection')
          }
        }, 100)
      }
      
      // Si on est sur la page bio, mettre bio comme actif
      if (location.pathname === '/bio') {
        setActiveSection('bio')
        return
      }
      
      // Détection de la section active pour la page d'accueil
      const sections = [
        { id: "accueil" },
        { id: "apropos" },
        { id: "projets" },
        { id: "contact" },
      ]
      let found = "accueil"
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 80 && rect.bottom > 80) {
            found = section.id
            break
          }
        }
      }
      setActiveSection(found)
    }
    
    // Écouter les changements de navigation
    const handlePopState = () => {
      handleScroll()
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('popstate', handlePopState)
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [location.pathname])


  const scrollToSection = (sectionId: string) => {
    // Si on est sur la page bio, naviguer vers l'accueil avec l'ancre
    if (location.pathname === '/bio') {
      // Stocker la section cible dans sessionStorage
      sessionStorage.setItem('scrollToSection', sectionId)
      navigate('/')
      return
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
    setActiveSection(sectionId)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 animate-fadeIn ${
      isScrolled
        ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-accent/5 border-b border-border/50'
        : 'bg-transparent backdrop-blur-0 border-none shadow-none'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer animate-slideInFromLeft" onClick={() => scrollToSection('accueil')}>
            <div className="p-1 bg-accent/5 rounded-lg group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
              <img src="https://i.imgur.com/tDPPBl1.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="transition-all duration-300 group-hover:scale-105">
              <span className="font-medium text-foreground group-hover:text-accent">Kaysuto</span>
              <span className="text-muted-foreground ml-1 group-hover:text-foreground">Kimiya</span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Centré */}
          <div className="hidden md:flex items-center space-x-4 animate-fadeIn animate-delay-200 absolute left-1/2 transform -translate-x-1/2">
            {[
              { id: "accueil", label: "Accueil" },
              { id: "apropos", label: "À propos" },
              { id: "projets", label: "Projets" },
              { id: "contact", label: "Contact" }
            ].map((item, index) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative px-4 py-2 font-semibold transition-all duration-300 group flex items-center",
                  activeSection === item.id
                    ? "bg-accent text-[#070201] dark:text-[#221512] shadow-md scale-105 hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
                    : "hover:bg-accent/10 hover:text-accent"
                )}
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <span className="z-10">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute inset-0 rounded-md border-2 border-accent animate-fadeIn pointer-events-none"></span>
                )}
              </Button>
            ))}
            
            {/* Bouton Bio - Navigation vers page séparée */}
            <Link to="/bio">
              <Button
                variant={activeSection === 'bio' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "relative px-4 py-2 font-semibold group flex items-center transition-all duration-300",
                  activeSection === 'bio'
                    ? "bg-accent text-[#070201] dark:text-[#221512] shadow-md scale-105 hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
                    : "hover:bg-accent/10 hover:text-accent"
                )}
                style={{ animationDelay: `${7 * 0.1}s` }}
              >
                <span className="z-10">Bio</span>
                {activeSection === 'bio' && (
                  <span className="absolute inset-0 rounded-md border-2 border-accent animate-fadeIn pointer-events-none"></span>
                )}
              </Button>
            </Link>
          </div>

          {/* Right side buttons - Mobile and Desktop */}
          <div className="flex items-center space-x-2 animate-slideInFromRight animate-delay-100 ml-auto md:ml-0">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
            >
              <div className="relative">
                {theme === 'dark' ? (
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
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full text-left px-4 py-2 font-semibold transition-all duration-300 group flex items-center",
                  activeSection === item.id
                    ? "bg-accent text-[#070201] dark:text-[#221512] shadow-md scale-105 hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
                    : "hover:bg-accent/10 hover:text-accent"
                )}
                style={{ animationDelay: isMobileMenuOpen ? `${(index + 1) * 0.1}s` : undefined }}
              >
                <span className="z-10">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute inset-0 rounded-md border-2 border-accent animate-fadeIn pointer-events-none"></span>
                )}
              </Button>
            ))}
            
            {/* Lien Bio Mobile */}
            <Link to="/bio" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant={activeSection === 'bio' ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "w-full text-left px-4 py-2 font-semibold group flex items-center transition-all duration-300",
                  activeSection === 'bio'
                    ? "bg-accent text-[#070201] dark:text-[#221512] shadow-md scale-105 hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
                    : "hover:bg-accent/10 hover:text-accent"
                )}
                style={{ animationDelay: isMobileMenuOpen ? `${5 * 0.1}s` : undefined }}
              >
                <span className="z-10">Bio</span>
                {activeSection === 'bio' && (
                  <span className="absolute inset-0 rounded-md border-2 border-accent animate-fadeIn pointer-events-none"></span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}