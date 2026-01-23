import { useState, useEffect, useRef, useMemo } from "react"
import { ArrowSquareOut, Calendar } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DemoModal } from "@/components/ui/ProjectModal"
import { getProjects } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"

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
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)

  const openProjectModal = (project: Project) => {
    setModalProject(project)
    setShowModal(true)
  }

  const closeProjectModal = () => {
    setShowModal(false)
    setModalProject(null)
  }

  const fetchProjects = async () => {
    if (loading || hasFetched.current) return;
    hasFetched.current = true;
    setLoading(true)
    setError(null)
    try {
      const data = await getProjects()
      if (Array.isArray(data)) {
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
      }
    } catch (e: any) {
      setError(e?.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const formatDate = useMemo(() => (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    })
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto">
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-destructive/10 text-destructive rounded flex items-center justify-between"
          >
            <div>Erreur : {error}</div>
            <Button size="sm" variant="ghost" onClick={fetchProjects}>Réessayer</Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full"
            />
          </div>
        ) : projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="group h-full flex flex-col overflow-hidden bg-card border-2 border-border hover:border-accent/50 transition-all duration-300">
                {project.image_url && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={project.image_url}
                      alt={project.image_alt || project.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  </div>
                )}
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <Badge variant="outline" className="text-accent border-accent/30">
                      {project.status}
                    </Badge>
                    {project.demo_url && (
                      <Button
                        size="sm"
                        className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => openProjectModal(project)}
                      >
                        <ArrowSquareOut size={14} />
                        <span>Voir</span>
                      </Button>
                    )}
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(project.created_at)}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-12">
            Aucun projet trouvé.
          </div>
        )}
      </motion.div>

      {modalProject && (
        <DemoModal
          isOpen={showModal}
          onClose={closeProjectModal}
          projectTitle={modalProject.title}
          projectUrl={modalProject.demo_url || ''}
        />
      )}
    </div>
  )
}
