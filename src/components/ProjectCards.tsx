import { useState, useEffect, useRef, useMemo } from "react"
import { ExternalLink, Calendar, Github, Globe, Star, Search, ChevronLeft, ChevronRight, Rocket, Code2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DemoModal } from "@/components/ui/ProjectModal"
import { getProjects } from "@/lib/supabase"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  status: 'En production' | 'En développement' | 'Alpha' | 'Beta'
  type: string
  github_url?: string
  demo_url?: string
  stars: number
  forks: number
  created_at: string
  image_url?: string
  image_alt?: string
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -10,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
}

export function ProjectCards() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const fetchProjects = async () => {
    if (loading || hasFetched.current) return
    hasFetched.current = true
    setLoading(true)
    setError(null)
    try {
      const data = await getProjects()
      if (Array.isArray(data)) {
        const mapStatus = (status: string): Project["status"] => {
          switch (status) {
            case 'published': return 'En production'
            case 'dev': return 'En développement'
            case 'alpha': return 'Alpha'
            case 'beta': return 'Beta'
            default: return 'En production'
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En production': return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'En développement': return 'text-amber-500 bg-amber-500/10 border-amber-500/20'
      case 'Alpha': return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'Beta': return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
      default: return 'text-muted-foreground bg-muted/10 border-muted/20'
    }
  }

  return (
    <div className="w-full space-y-8">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-between border border-destructive/20"
          >
            <div className="font-bold">Erreur : {error}</div>
            <Button size="sm" variant="outline" onClick={fetchProjects} className="border-destructive/30 hover:bg-destructive/10">Réessayer</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel Container */}
      <div className="relative group/carousel">
        {/* Navigation Buttons */}
        <div className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border-border/50 hover:border-accent hover:text-accent transition-all shadow-xl"
          >
            <ChevronLeft size={24} />
          </Button>
        </div>
        <div className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border-border/50 hover:border-accent hover:text-accent transition-all shadow-xl"
          >
            <ChevronRight size={24} />
          </Button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 py-8 snap-x snap-mandatory scrollbar-hide scroll-smooth px-4 -mx-4"
          style={{ 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[350px] h-[450px] bg-card/40 animate-pulse snap-center rounded-[2rem] border border-border/50" />
            ))
          ) : projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="min-w-[280px] md:min-w-[350px] snap-center"
              >
                <Card className="relative h-full flex flex-col overflow-hidden bg-card/40 backdrop-blur-md border border-border/50 hover:border-accent/40 transition-all duration-500 rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-accent/10 group">
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.image_alt || project.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-accent/5 flex items-center justify-center">
                        <Rocket size={64} className="text-accent/20" />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg border",
                          getStatusColor(project.status)
                        )}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    {/* Stars Badge */}
                    {project.stars > 0 && (
                      <div className="absolute top-6 right-6">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-background/80 backdrop-blur-md text-foreground text-[10px] font-bold rounded-lg border border-border/50">
                          <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          {project.stars}
                        </div>
                      </div>
                    )}

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-2 font-bold">
                        <Calendar size={14} className="text-accent" />
                        {formatDate(project.created_at)}
                      </span>
                      <div className="flex gap-2">
                        {project.tech_stack.slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-[10px] bg-accent/5 text-accent border-accent/10 font-bold">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-1 tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-xs mb-6 line-clamp-3 leading-relaxed flex-1 font-medium">
                      {project.description}
                    </p>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                      {project.demo_url && (
                        <Button
                          className="flex-1 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl h-10 shadow-lg shadow-accent/20 transition-all active:scale-95 text-sm"
                          onClick={() => {
                            setModalProject(project)
                            setShowModal(true)
                          }}
                        >
                          <ExternalLink size={16} />
                          <span>Visiter le site</span>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          className="w-10 h-10 rounded-xl border-border/50 hover:border-accent hover:text-accent transition-all active:scale-90"
                        >
                          <a href={project.github_url} target="_blank" rel="noreferrer">
                            <Github size={20} />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="w-full text-center py-32 bg-card/20 rounded-[3rem] border-2 border-dashed border-border/50">
              <Code2 size={64} className="mx-auto mb-6 text-muted-foreground/20" />
              <p className="text-2xl font-bold text-muted-foreground mb-4">Aucun projet disponible</p>
            </div>
          )}
        </div>
      </div>

      <DemoModal
        isOpen={showModal && !!modalProject}
        onClose={() => {
          setShowModal(false)
          // Ne pas mettre modalProject à null immédiatement pour laisser l'animation se jouer
          setTimeout(() => setModalProject(null), 500)
        }}
        projectTitle={modalProject?.title || ''}
        projectUrl={modalProject?.demo_url || ''}
      />
    </div>
  )
}
