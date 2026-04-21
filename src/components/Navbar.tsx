import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  User,
  FileText,
  Scale,
  Home,
  Info,
  FolderOpen,
  Mail,
  type LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeController } from "./ThemeController"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"
import { SECTIONS } from "@/constants"

interface NavLink {
  id: string
  label: string
  path: string
  icon?: LucideIcon
}

const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("accueil")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navLinks: NavLink[] = [
    { id: "accueil", label: "Accueil", path: "/", icon: Home },
    { id: "apropos", label: "À propos", path: "/", icon: Info },
    { id: "projets", label: "Projets", path: "/", icon: FolderOpen },
    { id: "contact", label: "Contact", path: "/", icon: Mail }
  ]

  const dropdownLinks: NavLink[] = [
    { id: "cv", label: "CV", path: "/cv", icon: FileText },
    { id: "bio", label: "Bio", path: "/bio", icon: User },
    { id: "legal-notice", label: "Mentions", path: "/legal-notice", icon: Scale }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      const path = location.pathname
      if (path === '/bio') {
        setActiveSection('bio')
      } else if (path === '/cv') {
        setActiveSection('cv')
      } else if (path === '/legal-notice') {
        setActiveSection('legal-notice')
      } else {
        const current = SECTIONS.find(section => {
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

  const handleNavClick = (link: NavLink) => {
    setIsMobileMenuOpen(false)
    
    if (link.path === '/bio' || link.path === '/cv' || link.path === '/legal-notice') {
      navigate(link.path)
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
        "fixed top-0 w-full z-[100] transition-all duration-300 px-4 md:px-6",
        isScrolled ? "py-2" : "py-4"
      )}
    >
        <motion.div 
          initial={false}
          animate={{
            paddingTop: isScrolled ? "0.75rem" : "1rem",
            paddingBottom: isScrolled ? "0.75rem" : "1rem",
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(
            "max-w-7xl mx-auto rounded-[2.5rem] px-6 flex items-center justify-between transition-all duration-300",
            isScrolled 
              ? "bg-background/80 shadow-2xl" 
              : "bg-transparent shadow-none"
          )}
        >
        {/* Logo */}
        <div 
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => handleNavClick(navLinks[0])}
        >
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="p-1.5 bg-accent/10 rounded-xl transition-colors"
          >
            <img src="https://i.imgur.com/tDPPBl1.png" alt="Logo" className="w-8 h-8 object-contain" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground tracking-tight leading-none">Kaysuto</span>
            <span className="text-[9px] font-semibold text-accent tracking-[0.2em] uppercase mt-0.5">Kimiya</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-accent/5 backdrop-blur-md border border-accent/10 rounded-2xl p-1.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className={cn(
                "relative px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded-xl",
                activeSection === link.id
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}

          {/* Dropdown Desktop */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={cn(
                "relative px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded-xl flex items-center gap-2",
                (activeSection === 'cv' || activeSection === 'bio' || activeSection === 'legal-notice')
                  ? "text-accent-foreground"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              {(activeSection === 'cv' || activeSection === 'bio' || activeSection === 'legal-notice') && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">Plus</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-background/95 backdrop-blur-xl border border-accent/20 rounded-xl shadow-2xl overflow-hidden p-1.5 z-50"
                >
                  {dropdownLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                        activeSection === link.id
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/10 text-muted-foreground hover:text-accent"
                      )}
                    >
                      {link.icon && <link.icon className="w-3.5 h-3.5" />}
                      {link.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeController />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-accent/5 hover:bg-accent/10 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6 text-accent" />}
          </Button>
          </div>
        </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-3 bg-background/98 backdrop-blur-2xl border border-border/40 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-3">
                {/* Nav links */}
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    onClick={() => handleNavClick(link)}
                    className={cn(
                      "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all",
                      activeSection === link.id
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent/8"
                    )}
                  >
                    {link.icon && (
                      <link.icon className={cn(
                        "w-4 h-4 shrink-0",
                        activeSection === link.id ? "opacity-100" : "opacity-40"
                      )} />
                    )}
                    <span className="font-semibold text-sm">{link.label}</span>
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="mobileActive"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-current"
                      />
                    )}
                  </motion.button>
                ))}

                {/* Separator */}
                <div className="my-2 mx-4 border-t border-border/30" />

                {/* Extra pages */}
                {dropdownLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + i) * 0.05, duration: 0.2 }}
                    onClick={() => handleNavClick(link)}
                    className={cn(
                      "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all",
                      activeSection === link.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/8 hover:text-foreground"
                    )}
                  >
                    {link.icon && (
                      <link.icon className={cn(
                        "w-4 h-4 shrink-0",
                        activeSection === link.id ? "opacity-100" : "opacity-40"
                      )} />
                    )}
                    <span className="font-semibold text-sm">{link.label}</span>
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="mobileActive"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-current"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
