import { useState, useEffect } from "react"
import { ExternalLink, Star, GitBranch, GithubLogo } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
}

export function ProjectsSection() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)

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

  const projects = [
    {
      title: "Clover Games",
      description: "Serveur Minecraft communautaire avec des fonctionnalités avancées et une expérience de jeu personnalisée. Architecture scalable supportant des centaines de joueurs simultanés.",
      tech: ["Java", "MySQL", "Redis", "Docker"],
      status: "En production",
      type: "Gaming"
    },
    {
      title: "Jelly",
      description: "Plateforme de streaming moderne avec interface élégante et performances optimisées. Streaming haute qualité avec gestion avancée du contenu et expérience utilisateur fluide.",
      tech: ["React", "Node.js", "WebRTC", "PostgreSQL"],
      status: "En développement",
      type: "Streaming"
    },
    {
      title: "Mirum Orbis",
      description: "RPG 2D immersif avec monde ouvert et système de progression complexe. Graphismes soignés et gameplay innovant combinant exploration et stratégie.",
      tech: ["Unity", "C#", "SQLite", "Photon"],
      status: "Alpha",
      type: "Game Dev"
    }
  ]

  return (
    <section id="projets" className="py-32 px-6 lg:px-12">
      <div className="max-w-8xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Mes Projets</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une sélection de projets qui illustrent ma passion pour la création 
            d'expériences numériques innovantes et performantes.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {projects.map((project, index) => (
            <div key={project.title} className={`animate-scaleIn animate-delay-${(index + 2) * 100}`}>
              <Card className="group h-full bg-card border-2 border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-700 hover:-translate-y-3 animate-card-hover relative overflow-hidden backdrop-blur-sm">
                {/* Enhanced Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1200"></div>
                
                <div className="p-8 h-full flex flex-col relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="bg-accent/15 text-accent border-accent/30 text-sm font-medium group-hover:bg-accent/25 transition-colors duration-300 px-3 py-1"
                      >
                        {project.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${
                        project.status === 'En production' ? 'bg-green-500' :
                        project.status === 'En développement' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-sm text-muted-foreground font-medium">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow group-hover:text-foreground/80 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-2 bg-muted/70 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent/20 hover:text-accent transition-all duration-200 cursor-default border border-transparent hover:border-accent/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-border group-hover:border-accent/50 transition-colors duration-300">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="text-accent hover:text-accent/80 hover:bg-accent/15 px-4 py-2 group/btn font-medium"
                    >
                      <ExternalLink size={18} className="mr-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      Voir le projet
                    </Button>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center space-x-2 hover:text-accent transition-colors duration-200">
                        <Star size={16} />
                        <span className="text-sm font-medium">{index === 0 ? '24' : index === 1 ? '15' : '31'}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-accent transition-colors duration-200">
                        <GitBranch size={16} />
                        <span className="text-sm font-medium">{index === 0 ? '8' : index === 1 ? '5' : '12'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* GitHub Stats */}
        <div className="flex justify-center animate-fadeInUp animate-delay-600 mt-20">
          <div className="bg-card border-2 border-border rounded-3xl p-10 w-full max-w-2xl hover:shadow-xl hover:shadow-accent/15 transition-all duration-500 group hover:border-accent/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">Statistiques GitHub</h3>
              <a
                href="https://github.com/Kaysuto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-accent font-medium"
              >
                <GithubLogo size={20} className="mr-2 hover:rotate-12 transition-transform duration-300" />
                @Kaysuto
              </a>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-20 h-10 bg-muted rounded-lg animate-pulse mb-3 mx-auto"></div>
                    <div className="w-24 h-5 bg-muted rounded animate-pulse mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : githubStats ? (
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center group/stat">
                  <div className="text-4xl font-bold text-accent mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                    {githubStats.public_repos}
                  </div>
                  <p className="text-muted-foreground font-medium group-hover/stat:text-foreground transition-colors duration-300">Repositories</p>
                </div>
                <div className="text-center group/stat">
                  <div className="text-4xl font-bold text-accent mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                    {githubStats.followers}
                  </div>
                  <p className="text-muted-foreground font-medium group-hover/stat:text-foreground transition-colors duration-300">Followers</p>
                </div>
                <div className="text-center group/stat">
                  <div className="text-4xl font-bold text-accent mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                    {githubStats.following}
                  </div>
                  <p className="text-muted-foreground font-medium group-hover/stat:text-foreground transition-colors duration-300">Following</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Impossible de charger les statistiques GitHub
              </p>
            )}
          </div>
        </div>

        {/* View More */}
        <div className="text-center mt-20 animate-fadeInUp animate-delay-800">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-accent text-accent hover:bg-accent/15 hover:border-accent/70 px-10 py-4 text-lg font-medium hover:scale-105 transition-all duration-300"
          >
            <ExternalLink size={20} className="mr-3" />
            Voir tous mes projets sur GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}