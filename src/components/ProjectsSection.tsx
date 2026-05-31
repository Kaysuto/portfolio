import { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import { Users, GitBranch, Star } from "lucide-react"
import { GithubLogo as Github } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ProjectCards } from "@/components/ProjectCards"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { Card, CardContent } from "@/components/ui/card"
import { fetchGitHubStats, type GitHubStats } from "@/services/githubService"

const variantesConteneur: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const variantesElement: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export function ProjectsSection() {
  const [statsGithub, setStatsGithub] = useState<GitHubStats | null>(null)
  const [, setEstEnChargement] = useState(true)
  const [afficherModale, setAfficherModale] = useState(false)

  const ouvrirModale = () => setAfficherModale(true)
  const fermerModale = () => setAfficherModale(false)

  const compteurDepots = useCounterAnimation({
    end: statsGithub?.publicRepos || 0,
    duration: 2000
  })
  const compteurAbonnes = useCounterAnimation({
    end: statsGithub?.followers || 0,
    duration: 2300
  })
  const compteurEtoiles = useCounterAnimation({
    end: statsGithub?.totalStars || 0,
    duration: 2100
  })
  const compteurAbonnements = useCounterAnimation({
    end: statsGithub?.following || 0,
    duration: 1800
  })

  useEffect(() => {
    fetchGitHubStats()
      .then(setStatsGithub)
      .catch((erreur) => console.error("Erreur lors de la récupération des stats GitHub:", erreur))
      .finally(() => setEstEnChargement(false))
  }, [])

  return (
    <section id="projets" className="py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Éléments d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variantesConteneur}
      >
        {/* En-tête de section */}
        <motion.div className="text-center mb-10" variants={variantesElement}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Mes <span className="text-accent">Projets</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une sélection de projets qui illustrent ma passion pour la création
            d'expériences numériques innovantes et performantes.
          </p>
        </motion.div>

        {/* Cartes de projets */}
        <motion.div className="mb-16" variants={variantesElement}>
          <ProjectCards />
        </motion.div>

        {/* Carte des statistiques GitHub */}
        <motion.div className="flex justify-center" variants={variantesElement}>
          <Card className="w-full max-w-2xl bg-card/40 backdrop-blur-md border-border/50 hover:border-accent/40 transition-all duration-500 group overflow-hidden rounded-3xl">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-colors">
                    <Github className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Statistiques GitHub</h3>
                    <p className="text-sm text-muted-foreground">Activité en temps réel</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col items-center p-4 bg-accent/5 rounded-3xl border border-accent/10 group/stat hover:bg-accent/10 transition-colors">
                  <GitBranch className="w-5 h-5 text-accent/50 mb-3 group-hover/stat:scale-110 transition-transform" />
                  <span
                    ref={compteurDepots.elementRef}
                    className="text-2xl font-bold text-foreground tabular-nums mb-1"
                  >
                    {compteurDepots.count}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Repositories</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-accent/5 rounded-3xl border border-accent/10 group/stat hover:bg-accent/10 transition-colors">
                  <Star className="w-5 h-5 text-accent/50 mb-3 group-hover/stat:scale-110 transition-transform" />
                  <span
                    ref={compteurEtoiles.elementRef}
                    className="text-2xl font-bold text-foreground tabular-nums mb-1"
                  >
                    {compteurEtoiles.count}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Étoiles</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-accent/5 rounded-3xl border border-accent/10 group/stat hover:bg-accent/10 transition-colors">
                  <Users className="w-5 h-5 text-accent/50 mb-3 group-hover/stat:scale-110 transition-transform" />
                  <span
                    ref={compteurAbonnes.elementRef}
                    className="text-2xl font-bold text-foreground tabular-nums mb-1"
                  >
                    {compteurAbonnes.count}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Followers</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-accent/5 rounded-3xl border border-accent/10 group/stat hover:bg-accent/10 transition-colors">
                  <Users className="w-5 h-5 text-accent/50 mb-3 group-hover/stat:scale-110 transition-transform" />
                  <span
                    ref={compteurAbonnements.elementRef}
                    className="text-2xl font-bold text-foreground tabular-nums mb-1"
                  >
                    {compteurAbonnements.count}
                  </span>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Following</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bouton voir plus */}
        <motion.div className="text-center mt-12" variants={variantesElement}>
          <Button
            onClick={ouvrirModale}
            variant="default"
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition-all"
          >
            Voir tous mes projets
          </Button>
        </motion.div>
      </motion.div>

      <GitHubModal
        isOpen={afficherModale}
        onClose={fermerModale}
      />
    </section>
  )
}
