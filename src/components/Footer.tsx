import { Code, Github, Linkedin, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GitHubFooterModal, LinkedInFooterModal } from "./ui/SocialModals"
import { useState } from "react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false)
  const [isLinkedinModalOpen, setIsLinkedinModalOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { name: "ACCUEIL", href: "#accueil" },
    { name: "À PROPOS", href: "#a-propos" },
    { name: "PROJETS", href: "#projets" },
    { name: "CONTACT", href: "#contact" },
  ]

  return (
    <footer className="py-20 px-6 relative overflow-hidden noise-bg border-t-2 border-foreground/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,163,115,0.03),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <img 
                src="https://i.imgur.com/tDPPBl1.png" 
                alt="Logo" 
                className="w-14 h-14 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="font-black text-2xl tracking-tighter uppercase italic">KAYSUTO</span>
                <span className="font-black text-sm tracking-[0.3em] text-primary">KIMIYA</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md font-medium italic leading-relaxed">
              "Concevoir des expériences numériques uniques, mêlant esthétique rétro et technologies modernes."
            </p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="icon"
                className="w-12 h-12 rounded-xl bg-card border-2 border-foreground/5 hover:border-primary hover:text-primary transition-all"
                onClick={() => setIsGithubModalOpen(true)}
              >
                <Github size={22} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="w-12 h-12 rounded-xl bg-card border-2 border-foreground/5 hover:border-primary hover:text-primary transition-all"
                onClick={() => setIsLinkedinModalOpen(true)}
              >
                <Linkedin size={22} />
              </Button>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors italic"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">Contact</h4>
            <div className="space-y-4">
              <a 
                href="mailto:contact@kimiya.pro"
                className="block text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors italic"
              >
                contact@kimiya.pro
              </a>
              <p className="text-xs font-medium text-muted-foreground italic">
                France • Télétravail
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            © {currentYear} KAYSUTO KIMIYA • TOUS DROITS RÉSERVÉS
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors"
          >
            RETOUR EN HAUT
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all border-2 border-foreground/5">
              <ArrowUp size={18} />
            </div>
          </button>
        </div>
      </div>

      {/* Modals */}
      <GitHubFooterModal 
        isOpen={isGithubModalOpen} 
        onClose={() => setIsGithubModalOpen(false)} 
      />
      <LinkedInFooterModal 
        isOpen={isLinkedinModalOpen} 
        onClose={() => setIsLinkedinModalOpen(false)} 
      />
    </footer>
  )
}
