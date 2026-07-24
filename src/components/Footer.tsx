import { motion } from "framer-motion"
import { Scale, FileText, User, FolderOpen, Mail, BookOpen } from "lucide-react"
import { GithubLogo as Github, LinkedinLogo as Linkedin } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { GitHubFooterModal, LinkedInFooterModal } from "./ui/SocialModals"
import { useState } from "react"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { Sticker } from "@/components/ui/Sticker"

export function Footer() {
  const anneeCourante = new Date().getFullYear()
  const [estModaleGithubOuverte, setEstModaleGithubOuverte] = useState(false)
  const [estModaleLinkedinOuverte, setEstModaleLinkedinOuverte] = useState(false)

  const defilerVersSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const decalage = 80
      const rectCorps = document.body.getBoundingClientRect().top
      const rectElement = element.getBoundingClientRect().top
      const positionElement = rectElement - rectCorps
      const positionAvecDecalage = positionElement - decalage

      window.scrollTo({
        top: positionAvecDecalage,
        behavior: "smooth"
      })
    }
  }

  return (
    <footer className="bg-card/50 border-t border-border/50 py-16 px-6 relative overflow-hidden">
      {/* Halo de fond */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-30" />
      
      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Colonne identité */}
          <motion.div className="col-span-2 md:col-span-1 space-y-8" variants={fadeInUp}>
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => defilerVersSection('accueil')}>
              <Sticker name="coeur" size={96} className="shrink-0 group-hover:-translate-y-1" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-foreground tracking-tight leading-none">Kimiya</span>
                <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase mt-1">Product Builder</span>
              </div>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xs font-medium">
              Technicien Informatique le jour, Product Builder la nuit. Réseau, code & créativité.
            </p>
          </motion.div>

          {/* Colonne Navigation */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {[
                { id: 'apropos', label: 'À propos', icon: User },
                { id: 'projets', label: 'Projets',  icon: FolderOpen },
                { id: 'contact', label: 'Contact',  icon: Mail },
              ].map(({ id, label, icon: Icone }) => (
                <button
                  key={id}
                  onClick={() => defilerVersSection(id)}
                  className="text-muted-foreground hover:text-accent transition-all text-base font-bold text-left w-fit group flex items-center gap-3"
                >
                  <Icone className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Colonne Pages */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Pages</h4>
            <nav className="flex flex-col gap-4">
              {[
                { to: '/cv',           label: 'CV',              icon: FileText },
                { to: '/bio',          label: 'Bio',             icon: BookOpen },
                { to: '/legal-notice', label: 'Mentions Légales', icon: Scale },
              ].map(({ to, label, icon: Icone }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-muted-foreground hover:text-accent transition-all text-base font-bold w-fit group flex items-center gap-3"
                >
                  <Icone className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Colonne Réseaux Sociaux */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <h4 className="text-lg font-bold text-foreground tracking-widest uppercase">Réseaux</h4>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-2xl border border-border/50 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all shadow-sm"
                onClick={() => setEstModaleGithubOuverte(true)}
              >
                <Github className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-2xl border border-border/50 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all shadow-sm"
                onClick={() => setEstModaleLinkedinOuverte(true)}
              >
                <Linkedin className="w-6 h-6" />
              </Button>
            </div>

          </motion.div>
        </div>

        {/* Barre du bas */}
        <motion.div
          className="pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6"
          variants={fadeInUp}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-sm text-muted-foreground font-bold">
            <div className="flex items-center gap-2.5">
              <span className="text-xs opacity-50">© 2015-{anneeCourante}</span>
              <span className="text-foreground tracking-tight">Kimiya</span>
              <span className="text-xs opacity-70">• Tous droits réservés</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Modales */}
      <GitHubFooterModal
        isOpen={estModaleGithubOuverte}
        onClose={() => setEstModaleGithubOuverte(false)}
      />
      <LinkedInFooterModal
        isOpen={estModaleLinkedinOuverte}
        onClose={() => setEstModaleLinkedinOuverte(false)}
      />
    </footer>
  )
}
