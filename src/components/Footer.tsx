import { motion } from "framer-motion"
import { Scale, FileText, User, FolderOpen, Mail, BookOpen } from "lucide-react"
import { GithubLogo as Github, LinkedinLogo as Linkedin } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { GitHubFooterModal, LinkedInFooterModal } from "./ui/SocialModals"
import { useState } from "react"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"

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
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <motion.div className="col-span-2 md:col-span-1 space-y-8" variants={fadeInUp}>
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
              Technicien Informatique le jour, Product Builder la nuit. Réseau, code & créativité.
            </p>
          </motion.div>

          {/* Navigation Column */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {[
                { id: 'apropos', label: 'À propos', icon: User },
                { id: 'projets', label: 'Projets',  icon: FolderOpen },
                { id: 'contact', label: 'Contact',  icon: Mail },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-muted-foreground hover:text-accent transition-all text-base font-bold text-left w-fit group flex items-center gap-3"
                >
                  <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Pages Column */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Pages</h4>
            <nav className="flex flex-col gap-4">
              {[
                { to: '/cv',           label: 'CV',              icon: FileText },
                { to: '/bio',          label: 'Bio',             icon: BookOpen },
                { to: '/legal-notice', label: 'Mentions Légales', icon: Scale },
              ].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-muted-foreground hover:text-accent transition-all text-base font-bold w-fit group flex items-center gap-3"
                >
                  <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Social Networks Column */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Réseaux</h4>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-2xl border border-border/50 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all shadow-sm"
                onClick={() => setIsGithubModalOpen(true)}
              >
                <Github className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-2xl border border-border/50 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all shadow-sm"
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
          variants={fadeInUp}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-sm text-muted-foreground font-bold">
            <div className="flex items-center gap-2.5">
              <span className="text-xs opacity-50">© 2015-{currentYear}</span>
              <span className="text-foreground tracking-tight">Kaysuto Kimiya</span>
              <span className="text-xs opacity-70">• Tous droits réservés</span>
            </div>
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
