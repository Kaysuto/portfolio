import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Github, ExternalLink, Users, GitBranch, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCards } from "@/components/ProjectCards"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants: Variants = {
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
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const reposCounter = useCounterAnimation({ 
    end: githubStats?.public_repos || 0, 
    duration: 2000 
  })
  const followersCounter = useCounterAnimation({ 
    end: githubStats?.followers || 0, 
    duration: 2300 
  })
  const followingCounter = useCounterAnimation({ 
    end: githubStats?.following || 0, 
    duration: 1800 
  })

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Kaysuto")
        if (response.ok) {
          const data = await response.json()
          setGithubStats({
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following
          })
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des stats GitHub:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  return (
    <section id="projets" className="py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background Elements */}
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
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-24" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Mes <span className="text-accent">Projets</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une sélection de projets qui illustrent ma passion pour la création 
            d'expériences numériques innovantes et performantes.
          </p>
        </motion.div>

        {/* Project Cards */}
        <motion.div className="mb-32" variants={itemVariants}>
          <ProjectCards />
        </motion.div>

        {/* GitHub Stats Card */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <Card className="w-full max-w-3xl bg-card/40 backdrop-blur-md border-border/50 hover:border-accent/40 transition-all duration-500 group overflow-hidden rounded-[2.5rem]">
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-colors">
                    <Github className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Statistiques GitHub</h3>
                    <p className="text-muted-foreground">Activité en temps réel</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col items-center p-6 bg-accent/5 rounded-3xl border border-accent/10 group/stat hover:bg-accent/10 transition-colors">
                  <GitBranch className="w-6 h-6 text-accent/50 mb-4 group-hover/stat:scale-110 transition-transform" />
                  <span 
                    ref={reposCounter.elementRef}
                    className="text-4xl font-bold text-foreground tabular-nums mb-1"
                  >
                    {reposCounter.count}
                  </span>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Repositories</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-accent/5 rounded-3xl border border-accent/10 group/stat hover:bg-accent/10 transition-colors">
                  <Users className="w-6 h-6 text-accent/50 mb-4 group-hover/stat:scale-110 transition-transform" />
                  <span 
                    ref={followersCounter.elementRef}
                    className="text-4xl font-bold text-foreground tabular-nums mb-1"
                  >
                    {followersCounter.count}
                  </span>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Followers</p>
                </div>
                
                <div className="flex flex-col items-center p-6 bg-accent/5 rounded-3xl border border-accent/10 group/stat hover:bg-accent/10 transition-colors">
                  <Star className="w-6 h-6 text-accent/50 mb-4 group-hover/stat:scale-110 transition-transform" />
                  <span 
                    ref={followingCounter.elementRef}
                    className="text-4xl font-bold text-foreground tabular-nums mb-1"
                  >
                    {followingCounter.count}
                  </span>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Following</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* View More Button */}
        <motion.div className="text-center mt-20" variants={itemVariants}>
          <Button
            onClick={openModal}
            variant="default"
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 rounded-2xl text-lg font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all"
          >
            Voir tous mes projets
          </Button>
        </motion.div>
      </motion.div>

      <GitHubModal
        isOpen={showModal}
        onClose={closeModal}
      />
    </section>
  )
}
