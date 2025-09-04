import { useState, useEffect } from "react"
import { GithubLogo, X } from "@phosphor-icons/react"
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMounted, setModalMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const openModal = () => {
    setIsClosing(false)
    setModalMounted(true)
    setTimeout(() => setIsModalOpen(true), 10)
  }

  const closeModal = () => {
    setIsClosing(true)
    setIsModalOpen(false)
    setTimeout(() => {
      setModalMounted(false)
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false)
    }
    if (isModalOpen) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isModalOpen])

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
    <section id="projets" className="py-32 px-6 lg:px-12 section-lazy relative">
      {/* Animated background shapes - positionnés pour éviter les composants */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-16 right-10 w-16 h-16 bg-accent/8 rounded-full animate-float-slow animate-delay-300"></div>
        <div className="absolute top-1/3 left-12 w-12 h-12 bg-primary/10 rounded-full animate-float-medium animate-delay-500"></div>
        <div className="absolute bottom-20 right-1/4 w-8 h-8 bg-secondary/15 rounded-full animate-bounce-slow animate-delay-700"></div>
        <div className="absolute top-2/3 right-8 w-20 h-20 bg-muted/20 rounded-full animate-pulse-slow animate-delay-400"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Mes Projets</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une sélection de projets qui illustrent ma passion pour la création 
            d'expériences numériques innovantes et performantes.
          </p>
        </div>


        {/* Project Cards - affichage direct */}
        <div className="mb-20">
          <ProjectCards />
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
              <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                <div className="text-center group/stat">
                  <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                    {githubStats.public_repos}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium group-hover/stat:text-foreground transition-colors duration-300">Repositories</p>
                </div>
                <div className="text-center group/stat">
                  <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                    {githubStats.followers}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium group-hover/stat:text-foreground transition-colors duration-300">Followers</p>
                </div>
                <div className="text-center group/stat">
                  <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                    {githubStats.following}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium group-hover/stat:text-foreground transition-colors duration-300">Following</p>
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
            onClick={openModal}
            variant="outline"
            size="lg"
            className="border-2 border-accent text-accent hover:bg-accent/15 hover:border-accent/70 px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium hover:scale-105 transition-all duration-300"
          >
            {/* Icône ExternalLink supprimée car non disponible dans Phosphor */}
            Voir tous mes projets sur GitHub
          </Button>
        </div>
      </div>

      {/* Modal for GitHub projects */}
      {modalMounted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className={`absolute inset-0 bg-black/40 modal-overlay ${isModalOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeModal} />
          <div
            className={`relative bg-card rounded-lg w-[90%] max-w-lg p-6 z-50 shadow-lg border border-border modal-panel ${isModalOpen && !isClosing ? 'opacity-100 scale-100 modal-enter' : 'opacity-0 scale-95 modal-exit'}`}
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Fermer"
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-accent/10"
              onClick={closeModal}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-2">Voir mes projets GitHub</h3>
            <p className="text-sm text-muted-foreground mb-4">Vous pouvez consulter tous mes projets directement sur mon profil GitHub.</p>
            <div className="flex justify-end">
              <a 
                href="https://github.com/Kaysuto" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block"
                onClick={closeModal}
              >
                <Button className="bg-accent text-accent-foreground px-4 py-2">Voir sur GitHub</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}