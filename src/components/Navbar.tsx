import { useState, useEffect } from "react"
import { Menu, X, Github, Linkedin, Coffee } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { KofiModal } from "@/components/ui/KofiModal"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isKofiModalOpen, setIsKofiModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("accueil")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Détection section active
      const sections = ["accueil", "a-propos", "projets", "contact"]
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "ACCUEIL", href: "#accueil", id: "accueil" },
    { name: "À PROPOS", href: "#a-propos", id: "a-propos" },
    { name: "PROJETS", href: "#projets", id: "projets" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ]

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-background/90 backdrop-blur-xl border-b-2 border-foreground/5 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a 
          href="#accueil"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group"
        >
          <img 
            src="https://i.imgur.com/tDPPBl1.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-tighter uppercase italic">KAYSUTO</span>
            <span className="font-black text-[8px] tracking-[0.3em] text-primary">KIMIYA</span>
          </div>
        </motion.a>

        {/* Desktop Nav - Centered Links */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-1 bg-secondary/50 p-1 rounded-xl border-2 border-foreground/5">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={cn(
                "px-4 py-1.5 text-[9px] font-black rounded-lg transition-all duration-300 tracking-widest",
                activeSection === link.id 
                  ? "text-primary-foreground bg-primary shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>
        
        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="https://github.com/Kaysuto" 
            target="_blank" 
            rel="noreferrer" 
            className="p-2 rounded-lg bg-card border-2 border-foreground/5 text-muted-foreground hover:text-primary hover:border-primary transition-all"
          >
            <Github size={18} />
          </a>
          <Button 
            onClick={() => setIsKofiModalOpen(true)}
            size="sm"
            className="bg-foreground hover:bg-primary text-background hover:text-primary-foreground font-black rounded-lg px-4 h-10 shadow-lg transition-all uppercase text-[9px] tracking-widest"
          >
            <Coffee size={16} className="mr-2" />
            SUPPORT
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-3 rounded-xl bg-secondary border-2 border-foreground/5 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 bg-card rounded-[2rem] border-2 border-foreground/10 shadow-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col gap-3 p-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-6 py-4 rounded-2xl text-sm font-black transition-all tracking-widest uppercase italic",
                    activeSection === link.id 
                      ? "text-primary bg-primary/10" 
                      : "hover:bg-foreground/5"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 mt-4 border-t-2 border-foreground/5 flex flex-col gap-4">
                <div className="flex gap-4 justify-center">
                  <a href="https://github.com/Kaysuto" target="_blank" rel="noreferrer" className="p-4 rounded-2xl bg-secondary text-muted-foreground hover:text-primary transition-all">
                    <Github size={24} />
                  </a>
                  <a href="#" className="p-4 rounded-2xl bg-secondary text-muted-foreground hover:text-primary transition-all">
                    <Linkedin size={24} />
                  </a>
                </div>
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsKofiModalOpen(true);
                  }}
                  className="bg-primary text-primary-foreground font-black rounded-2xl h-14 uppercase tracking-widest"
                >
                  M'OFFRIR UN CAFÉ
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <KofiModal 
        isOpen={isKofiModalOpen} 
        onClose={() => setIsKofiModalOpen(false)} 
      />
    </nav>
  )
}
