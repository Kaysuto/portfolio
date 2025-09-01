import { useState, useEffect } from "react"
import { ExternalLink, Star, GitBranch } from "@phosphor-icons/react"
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
    <section id="projets" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mes Projets
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Une sélection de projets qui illustrent ma passion pour la création 
            d'expériences numériques innovantes et performantes.
          </p>
        </div>

        {/* GitHub Stats */}
        <div className="mb-16 flex justify-center">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Statistiques GitHub
              </h3>
              <a
                href="https://github.com/Kaysuto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-accent hover:text-accent/80 transition-colors"
              >
                <ExternalLink size={18} className="mr-1" />
                @Kaysuto
              </a>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-8 bg-muted rounded animate-pulse mb-2 mx-auto"></div>
                    <div className="w-20 h-4 bg-muted rounded animate-pulse mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : githubStats ? (
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {githubStats.public_repos}
                  </div>
                  <p className="text-muted-foreground text-sm">Repositories</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {githubStats.followers}
                  </div>
                  <p className="text-muted-foreground text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {githubStats.following}
                  </div>
                  <p className="text-muted-foreground text-sm">Following</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Impossible de charger les statistiques GitHub
              </p>
            )}
          </div>
        </div>

        {/* Projects Grid - 3 Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Clover Games */}
          <div className="animate-stagger animate-delay-100">
            <Card className="group h-full bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                      Clover Games
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="bg-accent/10 text-accent border-accent/20 text-xs"
                    >
                      Serveur Gaming
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      En production
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow text-sm">
                  Serveur Minecraft communautaire avec un système économique avancé, 
                  des mini-jeux personnalisés et une interface web complète pour la gestion des joueurs et des statistiques.
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Java
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Spigot
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      MySQL
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Redis
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      React
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent/80 hover:bg-accent/10 p-0"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Voir le projet
                  </Button>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star size={14} />
                      <span className="text-xs">24</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch size={14} />
                      <span className="text-xs">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Jelly */}
          <div className="animate-stagger animate-delay-200">
            <Card className="group h-full bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                      Jelly
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="bg-accent/10 text-accent border-accent/20 text-xs"
                    >
                      Plateforme Streaming
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      En développement
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow text-sm">
                  Plateforme de streaming moderne avec lecture adaptative, 
                  système de recommandations IA et interface utilisateur intuitive 
                  optimisée pour tous les appareils.
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Next.js
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      TypeScript
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Node.js
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      PostgreSQL
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      FFmpeg
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent/80 hover:bg-accent/10 p-0"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Voir le projet
                  </Button>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star size={14} />
                      <span className="text-xs">15</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch size={14} />
                      <span className="text-xs">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Mirum Orbis */}
          <div className="animate-stagger animate-delay-300">
            <Card className="group h-full bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                      Mirum Orbis
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="bg-accent/10 text-accent border-accent/20 text-xs"
                    >
                      Jeu RPG 2D
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      Alpha
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow text-sm">
                  Jeu de rôle 2D immersif avec monde ouvert généré procéduralement, 
                  système de crafting avancé et mécaniques de combat dynamiques 
                  inspirées des classiques du genre.
                </p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Unity
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      C#
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      SQLite
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Photon
                    </span>
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
                      Aseprite
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-accent/80 hover:bg-accent/10 p-0"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Voir le projet
                  </Button>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star size={14} />
                      <span className="text-xs">31</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitBranch size={14} />
                      <span className="text-xs">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent/10"
          >
            <ExternalLink size={18} className="mr-2" />
            Voir tous mes projets sur GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}