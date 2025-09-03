import { useState, useEffect } from "react"
import { ArrowSquareOut, Calendar, X } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProjects } from "@/lib/supabase"

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  status: 'En production' | 'En développement' | 'Alpha' | 'Beta';
  type: string;
  github_url?: string;
  demo_url?: string;
  stars: number;
  forks: number;
  created_at: string;
  image_url?: string;
  image_alt?: string;
}

export function ProjectCards() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [debug, setDebug] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Modal state
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMounted, setModalMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const openModal = (project: Project) => {
    setModalProject(project)
    setIsClosing(false)
    setModalMounted(true)
    // Allow DOM to mount, then trigger animation
    setTimeout(() => setIsModalOpen(true), 10)
  }

  const closeModal = () => {
    setIsClosing(true)
    setIsModalOpen(false)
    // Wait for exit animation to complete
    setTimeout(() => {
      setModalMounted(false)
      setModalProject(null)
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    if (isModalOpen) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isModalOpen])

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    setDebug(null)
    try {
      const data = await getProjects()
      console.log('Supabase projects:', data)
      if (Array.isArray(data)) {
        // Mapping des champs pour correspondre à l'interface Project attendue
        const mapStatus = (status: string): Project["status"] => {
          switch (status) {
            case 'published': return 'En production';
            case 'dev': return 'En développement';
            case 'alpha': return 'Alpha';
            case 'beta': return 'Beta';
            default: return 'En production';
          }
        }
        const mapped = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          tech_stack: p.technologies || [],
          status: mapStatus(p.status),
          type: p.type || '',
          github_url: p.github_url || undefined,
          demo_url: p.live_url || undefined,
          stars: p.stars || 0,
          forks: p.forks || 0,
          created_at: p.created_at,
          image_url: p.image_url || undefined,
          image_alt: p.image_alt || p.title,
        }))
        setProjects(mapped)
      } else {
        setProjects([])
      }
    } catch (e: any) {
      setProjects([])
      setError(e?.message || String(e))
      setDebug((e && (e.cause || e)) || e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En production':
        return 'bg-green-500'
      case 'En développement':
        return 'bg-yellow-500'
      case 'Alpha':
        return 'bg-blue-500'
      case 'Beta':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    })
  }

  const projectsToRender = Array.isArray(projects) ? projects : []

  return (
    <div className="w-full max-w-7xl mx-auto">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded flex items-center justify-between">
          <div>Erreur Supabase : {error}</div>
          <div className="ml-4">
            <Button size="sm" variant="ghost" onClick={fetchProjects}>Réessayer</Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {loading ? (
          <div className="col-span-3 text-center text-muted-foreground py-12">Chargement…</div>
        ) : projectsToRender.length > 0 ? (
          projectsToRender.map((project, index) => (
            <Card
              key={project.id}
              className="group h-full flex flex-col overflow-hidden bg-card border-2 border-border hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20 transition-all duration-500 relative"
            >
              {/* Image projet */}
              {project.image_url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.image_alt || project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent pointer-events-none"></div>
                </div>
              )}
              <div className="flex-1 flex flex-col p-6">
                {/* Titre & description */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 ? (
                    project.tech_stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs font-medium">
                        {tech}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-xs">Aucune technologie</span>
                  )}
                </div>
                {/* Footer : statut, bouton Demo & date */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border gap-2">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-accent/10 text-accent">
                    {project.status}
                  </span>
                  {project.demo_url && (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex items-center gap-2 px-3 py-1 font-medium min-w-[90px] max-w-[120px] transition-all duration-200 shadow-sm hover:shadow-lg hover:bg-accent hover:text-accent-foreground hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group"
                      onClick={() => openModal(project)}
                    >
                      <ArrowSquareOut size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      <span>Demo</span>
                    </Button>
                  )}
                  <span className="text-xs text-muted-foreground">
                    <Calendar size={12} className="inline mr-1" />
                    {formatDate(project.created_at)}
                  </span>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center text-muted-foreground py-12">
            Aucun projet à afficher.
          </div>
        )}
      </div>
      {debug && (
        <pre className="text-xs text-muted-foreground bg-background p-3 rounded">{JSON.stringify(debug, null, 2)}</pre>
      )}

      {/* Modal for Demo project */}
      {modalMounted && modalProject && (
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
            <h3 className="text-lg font-semibold mb-2">Voir la démo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Vous allez être redirigé vers la démo du projet <strong>{modalProject.title}</strong>.
            </p>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={closeModal}
                className="px-4 py-2"
              >
                Annuler
              </Button>
              <a 
                href={modalProject.demo_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block"
                onClick={closeModal}
              >
                <Button className="bg-accent text-accent-foreground px-4 py-2">
                  <ArrowSquareOut size={16} className="mr-2" />
                  Voir la démo
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}