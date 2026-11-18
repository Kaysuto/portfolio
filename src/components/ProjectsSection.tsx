import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GithubLogo as Github } from "@phosphor-icons/react"
import { ProjectCards } from "@/components/ProjectCards"
import { Button } from "@/components/ui/button"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { useLangue } from "@/lib/langue"

export function ProjectsSection() {
  const [afficherModale, setAfficherModale] = useState(false)
  const { t } = useLangue()

  return (
    <section id="projets" className="py-10 lg:py-14 px-6 lg:px-12 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          title={t(<>Mes <span className="text-accent-texte">Projets</span></>, <>My <span className="text-accent-texte">Projects</span></>)}
          lead={t(
            "Une sélection de projets qui illustrent ma passion pour la création d'expériences numériques innovantes et performantes.",
            "A selection of projects that show my passion for building fast, inventive digital experiences."
          )}
        />

        {/* La grille porte sa propre cascade. */}
        <div className="py-8 border-t border-border/60">
          <ProjectCards />
        </div>

        <motion.div
          variants={fadeInUp}
          className="pt-8 border-t border-border/60 flex items-center justify-center gap-4"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setAfficherModale(true)}
            className="group gap-3"
          >
            <Github className="size-5 text-accent-texte" aria-hidden="true" />
            {t("Voir tous mes projets", "See all my projects")}
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>

      <GitHubModal isOpen={afficherModale} onClose={() => setAfficherModale(false)} />
    </section>
  )
}
