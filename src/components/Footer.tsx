import { motion } from "framer-motion"
import { Scale, FileText, User, FolderOpen, Mail, BookOpen } from "lucide-react"
import { GithubLogo as Github, LinkedinLogo as Linkedin } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { GitHubFooterModal, LinkedInFooterModal } from "./ui/SocialModals"
import { useState } from "react"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"

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
    /*
      Le pied de page est un îlot détaché : marges latérales, coins arrondis et
      même flou que la barre de navigation, pour que les deux extrémités du site
      se répondent. L'élément `footer` ne porte que l'espacement — la surface
      flottante est le bloc intérieur, sinon le flou s'appliquerait à toute la
      largeur de la page.
    */
    <footer className="px-3 sm:px-4 pt-8 pb-4">
      <motion.div
        className="surface-flottante max-w-6xl mx-auto rounded-xl px-5 py-8 sm:px-8 sm:py-10 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        {/* Bandeau d'identité, centré et posé au-dessus des colonnes */}
        <motion.div className="flex flex-col items-center text-center mb-12" variants={fadeInUp}>
          <button
            className="flex flex-col items-center"
            onClick={() => defilerVersSection('accueil')}
            aria-label="Retour en haut de la page"
          >
            <span className="font-display text-lg font-semibold text-foreground tracking-tight leading-none">Kimiya</span>
          </button>
          <p className="text-muted-foreground text-xs/relaxed max-w-sm mt-4">
            Technicien Informatique le jour, Product Builder la nuit. Réseau, code &amp; créativité.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-x-6 gap-y-10 mb-10 text-center">
          {/* Colonne Navigation */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h4 className="font-mono text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase">Navigation</h4>
            <nav className="flex flex-col items-center gap-2.5">
              {[
                { id: 'apropos', label: 'À propos', icon: User },
                { id: 'projets', label: 'Projets',  icon: FolderOpen },
                { id: 'contact', label: 'Contact',  icon: Mail },
              ].map(({ id, label, icon: Icone }) => (
                <button
                  key={id}
                  onClick={() => defilerVersSection(id)}
                  className="text-muted-foreground hover:text-accent-texte transition-colors text-xs group flex items-center gap-2"
                >
                  <Icone className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Colonne Pages */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h4 className="font-mono text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase">Pages</h4>
            <nav className="flex flex-col items-center gap-2.5">
              {[
                { to: '/cv',           label: 'CV',              icon: FileText },
                { to: '/bio',          label: 'Bio',             icon: BookOpen },
                { to: '/legal-notice', label: 'Mentions légales', icon: Scale },
              ].map(({ to, label, icon: Icone }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-muted-foreground hover:text-accent-texte transition-colors text-xs group flex items-center gap-2"
                >
                  <Icone className="size-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Colonne Réseaux Sociaux */}
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h4 className="font-mono text-[10px] font-medium text-muted-foreground tracking-[0.2em] uppercase">Réseaux</h4>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="GitHub"
                onClick={() => setEstModaleGithubOuverte(true)}
              >
                <Github className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="LinkedIn"
                onClick={() => setEstModaleLinkedinOuverte(true)}
              >
                <Linkedin className="size-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Barre du bas */}
        <motion.div
          className="pt-5 border-t border-border/60 flex flex-col items-center gap-3"
          variants={fadeInUp}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="font-mono tabular-nums opacity-70">© 2015-{anneeCourante}</span>
            <span className="text-foreground font-medium tracking-tight">Kimiya</span>
            <span className="opacity-70">• Tous droits réservés</span>
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
