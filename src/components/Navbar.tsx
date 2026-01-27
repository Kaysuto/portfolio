import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"
import { Link, useNavigate, useLocation } from "react-router-dom"

const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

export function Navbar() {
  const { theme, toggle: toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("accueil")

  const navLinks = [
    { id: "accueil", label: "Accueil", path: "/" },
    { id: "apropos", label: "À propos", path: "/" },
    { id: "projets", label: "Projets", path: "/" },
    { id: "contact", label: "Contact", path: "/" },
    { id: "bio", label: "Bio", path: "/bio" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      if (location.pathname === '/bio') {
        setActiveSection('bio')
      } else {
        const sections = ["accueil", "apropos", "projets", "contact"]
        const current = sections.find(section => {
          const el = document.getElementById(section)
          if (el) {
            const rect = el.getBoundingClientRect()
            return rect.top <= 120 && rect.bottom > 120
          }
          return false
        })
        if (current) setActiveSection(current)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => {
    const sectionToScroll = sessionStorage.getItem('scrollToSection')
    if (sectionToScroll && location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(sectionToScroll)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
          sessionStorage.removeItem('scrollToSection')
        }
      }, 100)
    }
  }, [location.pathname])

  const handleNavClick = (link: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false)
    
    if (link.path === '/bio') {
      navigate('/bio')
      return
    }

    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollToSection', link.id)
      navigate('/')
      return
    }
    
    const element = document.getElementById(link.id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(link.id)
  }

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-500 px-4 md:px-6",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto transition-all duration-500 rounded-[2.5rem] px-6 py-3 flex items-center justify-between",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl shadow-accent/10" 
          : "bg-transparent border-transparent"
      )}>
        {/* Logo */}
        <div 
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => handleNavClick(navLinks[0])}
        >
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="p-2 bg-accent/10 rounded-2xl transition-colors"
          >
            <img src="https://i.imgur.com/tDPPBl1.png" alt="Logo" className="w-9 h-9 object-contain" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground tracking-tight leading-none">Kaysuto</span>
            <span className="text-[10px] font-semibold text-accent tracking-[0.2em] uppercase mt-1">Kimiya</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-accent/5 backdrop-blur-md border border-accent/10 rounded-2xl p-1.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className={cn(
                "relative px-6 py-2.5 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded-xl overflow-hidden",
                activeSection === link.id
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent shadow-lg shadow-accent/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-12 h-12 rounded-2xl hover:bg-accent/10 group transition-all"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5 text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ scale: 0, rotate: 90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5 text-accent" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-12 h-12 rounded-2xl bg-accent/5 hover:bg-accent/10 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6 text-accent" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[-1]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="md:hidden mt-4 bg-background/95 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-6 px-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Navigation</span>
                </div>
                
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className={cn(
                      "w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all font-bold uppercase tracking-widest text-sm",
                      activeSection === link.id
                        ? "bg-accent text-accent-foreground shadow-xl shadow-accent/20"
                        : "bg-accent/5 text-foreground hover:bg-accent/10"
                    )}
                  >
                    {link.label}
                    <ArrowRight className={cn("w-5 h-5 transition-transform", activeSection === link.id && "translate-x-1")} />
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
