import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GithubLogo as Github } from "@phosphor-icons/react"
import { ProjectCards } from "@/components/ProjectCards"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Sticker } from "@/components/ui/Sticker"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"

export function ProjectsSection() {
  const [afficherModale, setAfficherModale] = useState(false)

  return (
    <section id="projets" className="py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          index="02"
          title={<>Mes <span className="text-accent">Projets</span></>}
          lead="Une sélection de projets qui illustrent ma passion pour la création d'expériences numériques innovantes et performantes."
        />

        <motion.div variants={fadeInUp} className="py-12 border-t border-border/60">
          <ProjectCards />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="pt-10 border-t border-border/60 flex items-center justify-center gap-4"
        >
          <Sticker name="motive" size={128} className="hidden sm:block" />
          <button
            onClick={() => setAfficherModale(true)}
            className="inline-flex items-center gap-3 text-base font-bold text-foreground hover:text-accent transition-colors group"
          >
            <Github className="w-5 h-5 text-accent" aria-hidden="true" />
            Voir tous mes projets
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      <GitHubModal isOpen={afficherModale} onClose={() => setAfficherModale(false)} />
    </section>
  )
}
