import { useState, useEffect } from "react"
import { Github, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCards } from "@/components/ProjectCards"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { motion } from "framer-motion"

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
}

export function ProjectsSection() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const reposCounter = useCounterAnimation({ 
    end: githubStats?.public_repos || 0, 
    duration: 2000 
  })
  const followersCounter = useCounterAnimation({ 
    end: githubStats?.followers || 0, 
    duration: 2300 
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
        console.error("Erreur GitHub stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchGitHubStats()
  }, [])

  return (
    <section id="projets" className="py-32 px-6 relative overflow-hidden noise-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,139,124,0.03),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-secondary text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6 border-2 border-foreground/10"
            >
              <Sparkles size={12} />
              Portfolio / Travaux
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic">
              Projets <span className="text-primary">Sélectionnés</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium max-w-xl border-l-4 border-primary pl-6">
              Une immersion dans mes réalisations techniques et artistiques.
            </p>
          </motion.div>
          
          {/* GitHub Stats - Studio Style */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-card p-5 rounded-3xl border-2 border-foreground/10 shadow-xl"
          >
            <div className="flex items-center gap-6">
              <div className="bg-secondary text-primary p-3 rounded-xl border-2 border-foreground/5">
                <Github size={28} />
              </div>
              <div className="flex gap-8">
                <div className="text-left">
                  <p ref={reposCounter.elementRef} className="text-3xl font-black text-foreground leading-none mb-1">
                    {reposCounter.count}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Repositories</p>
                </div>
                <div className="text-left">
                  <p ref={followersCounter.elementRef} className="text-3xl font-black text-foreground leading-none mb-1">
                    {followersCounter.count}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Followers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Projects Grid Component */}
        <ProjectCards />

        {/* CTA GitHub - Studio Style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <Button
            onClick={() => setShowModal(true)}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 h-20 text-xl font-black rounded-3xl transition-all shadow-xl shadow-primary/20 group uppercase italic tracking-tighter"
          >
            <Github size={32} className="mr-4 group-hover:rotate-12 transition-transform" />
            Accéder au GitHub
          </Button>
        </motion.div>
      </div>

      <GitHubModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  )
}
