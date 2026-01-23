import { Code, Sun, Moon, List, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

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
      
      const sectionToScroll = sessionStorage.getItem('scrollToSection')
      if (sectionToScroll && location.pathname === '/') {
        setTimeout(() => {
          const element = document.getElementById(sectionToScroll)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setActiveSection(sectionToScroll)
            sessionStorage.removeItem('scrollToSection')
          }
        }, 100)
      }
      
      if (location.pathname === '/bio') {
        setActiveSection('bio')
        return
      }
      
      const sections = ["accueil", "apropos", "projets", "contact"]
      let found = "accueil"
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            found = id
            break
          }
        }
      }
      setActiveSection(found)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === '/bio') {
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

  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "apropos", label: "À propos" },
    { id: "projets", label: "Projets" },
    { id: "contact", label: "Contact" }
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group" onClick={() => scrollToSection('accueil')}>
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="p-2 bg-accent/10 rounded-lg text-accent"
          >
            <Code size={20} />
          </motion.div>
          <span className="font-bold text-lg tracking-tight">
            Kaysuto<span className="text-accent">Kimiya</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center bg-muted/50 rounded-full px-2 py-1 border border-border/50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full",
                activeSection === item.id ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent rounded-full -z-10"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
              {item.label}
            </button>
          ))}
          <Link
            to="/bio"
            className={cn(
              "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full",
              activeSection === 'bio' ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeSection === 'bio' && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-accent rounded-full -z-10"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            Bio
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </Button>
              ))}
              <Link to="/bio" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant={activeSection === 'bio' ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  Bio
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
