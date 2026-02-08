import { motion, Variants } from "framer-motion"
import { Github, Linkedin, Heart, ArrowUp, Globe, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { GitHubFooterModal, LinkedInFooterModal } from "./ui/SocialModals"
import { useState } from "react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false)
  const [isLinkedinModalOpen, setIsLinkedinModalOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <footer className="bg-card/30 backdrop-blur-md border-t border-border/50 py-16 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-30" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Brand Column */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => scrollToSection('accueil')}>
              <div className="p-2 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-all duration-300 group-hover:rotate-6 shadow-inner">
                <img src="https://i.imgur.com/tDPPBl1.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground tracking-tighter leading-none">Kaysuto</span>
                <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase mt-0.5">Kimiya</span>
              </div>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xs font-medium">
              Product Builder polyvalent spécialisé en réseau, développement, design pixel art et création de mini-jeux. Toujours en quête d'innovation et de nouveaux défis.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'apropos', label: 'À propos' },
                { id: 'projets', label: 'Projets' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-muted-foreground hover:text-accent transition-all text-base font-bold text-left w-fit group flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-300" />
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Social Networks Column */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Réseaux</h4>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-2xl border-border/50 hover:border-accent hover:text-accent transition-all shadow-sm"
                onClick={() => setIsGithubModalOpen(true)}
              >
                <Github className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-2xl border-border/50 hover:border-accent hover:text-accent transition-all shadow-sm"
                onClick={() => setIsLinkedinModalOpen(true)}
              >
                <Linkedin className="w-6 h-6" />
              </Button>
            </div>

          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6"
          variants={itemVariants}
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-4 text-sm text-muted-foreground font-bold">
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-50">© {currentYear}</span>
              <span className="text-foreground tracking-tight">Kaysuto Kimiya</span>
            </div>
            <div className="flex items-center gap-2 bg-accent/5 px-4 py-1.5 rounded-full border border-accent/10">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>in France</span>
            </div>
            <Link
              to="/mentions-legales"
              className="flex items-center gap-2 hover:text-accent transition-colors group"
            >
              <Scale className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              <span>Mentions Légales</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <motion.button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 flex items-center justify-center bg-accent text-accent-foreground rounded-2xl transition-colors group"
              title="Retour en haut"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

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
