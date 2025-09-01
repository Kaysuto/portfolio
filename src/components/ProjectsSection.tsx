import { useState, useEffect } from "react"
import { GithubLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ProjectCards } from "@/components/ProjectCards"

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

  return (
    <section id="projets" className="py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Mes Projets</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une sélection de projets qui illustrent ma passion pour la création 
            d'expériences numériques innovantes et performantes.
          </p>
        </div>

        {/* Project Cards - Section mise en évidence */}
        <div className="mb-20 bg-accent/5 rounded-3xl p-12 border-2 border-accent/20">
          <h3 className="text-3xl font-bold text-foreground mb-10 text-center">Mes Projets Principaux</h3>
          <div className="min-h-96">
            <ProjectCards />
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="flex justify-center">
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
        <div className="text-center mt-20">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-accent text-accent hover:bg-accent/15 hover:border-accent/70 px-10 py-4 text-lg font-medium hover:scale-105 transition-all duration-300"
          >
            {/* Icône ExternalLink supprimée car non disponible dans Phosphor */}
            Voir tous mes projets sur GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}