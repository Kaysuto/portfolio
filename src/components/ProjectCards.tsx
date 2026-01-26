 import { useState, useEffect, useRef, useMemo } from "react"
import { ExternalLink, Calendar, Github, Globe, Star, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DemoModal } from "@/components/ui/ProjectModal"
import { getProjects } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
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

export function ProjectCards() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string>("Tous")
  const [searchQuery, setSearchQuery] = useState("")
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

  const allTechs = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach(p => p.tech_stack.forEach(t => techs.add(t)))
    return ["Tous", ...Array.from(techs).sort()]
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesTech = selectedTech === "Tous" || p.tech_stack.includes(selectedTech)
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTech && matchesSearch
    })
  }, [projects, selectedTech, searchQuery])

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

  const formatDate = useMemo(() => (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En production': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'En développement': return 'bg-[#D3C0B1]/10 text-[#D3C0B1] border-[#D3C0B1]/20'
      case 'Alpha': return 'bg-[#D3C0B1]/10 text-[#D3C0B1] border-[#D3C0B1]/20'
      case 'Beta': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      default: return 'bg-[#D3C0B1]/10 text-[#D3C0B1] border-[#D3C0B1]/20'
    }
  }

  return (
    <div className="w-full space-y-12">
      {/* Filters & Search - Studio Style */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {allTechs.slice(0, 8).map((tech) => (
            <Button
              key={tech}
              variant={selectedTech === tech ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTech(tech)}
              className={cn(
                "rounded-2xl px-6 transition-all duration-300 uppercase text-[10px] font-black tracking-widest h-10",
                selectedTech === tech 
                  ? "bg-[#D3C0B1] text-neutral-1 shadow-lg shadow-[#D3C0B1]/20" 
                  : "bg-neutral-2 hover:bg-neutral-3 border-2 border-neutral-3"
              )}
            >
              {tech}
            </Button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-10 group-focus-within:text-[#D3C0B1] transition-colors" size={18} />
          <input
            type="text"
            placeholder="RECHERCHER UN PROJET..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-neutral-2 border-2 border-neutral-3 focus:border-[#D3C0B1] outline-none transition-all uppercase text-[10px] font-black tracking-widest"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-between border-2 border-destructive/20 font-black uppercase text-xs tracking-widest"
          >
            <div>ERREUR SYSTÈME : {error}</div>
            <Button size="sm" variant="ghost" onClick={fetchProjects} className="font-black">REBOOT</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horizontal Scroll Container */}
      <div className="relative group/carousel">
        {/* Navigation Buttons - Studio Style */}
        <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="w-14 h-14 rounded-full bg-card border-2 border-foreground/10 hover:bg-primary hover:text-primary-foreground transition-all shadow-xl"
          >
            <ChevronLeft size={32} />
          </Button>
        </div>
        <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="w-14 h-14 rounded-full bg-card border-2 border-foreground/10 hover:bg-primary hover:text-primary-foreground transition-all shadow-xl"
          >
            <ChevronRight size={32} />
          </Button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-10 py-6 snap-x snap-mandatory scrollbar-hide scroll-smooth px-4 -mx-4"
          style={{ 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[350px] h-[450px] bg-card animate-pulse snap-center rounded-[2rem] border-2 border-foreground/10" />
            ))
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[280px] md:min-w-[350px] snap-center"
              >
                <Card className="relative h-full flex flex-col overflow-hidden bg-neutral-2 border-2 border-neutral-3 hover:border-[#D3C0B1] transition-all duration-500 rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-[#D3C0B1]/10 group">
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden border-b-2 border-neutral-3">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.image_alt || project.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-3 flex items-center justify-center">
                        <Globe size={48} className="text-[#D3C0B1]/20" />
                      </div>
                    )}
                    
                    {/* Status Badge - Studio Style */}
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "bg-neutral-2 border-2 border-neutral-3 px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-black rounded-xl",
                          getStatusColor(project.status)
                        )}
                      >
                        {project.status}
                      </Badge>
                    </div>

                    {/* Stats Overlay */}
                    {(project.stars > 0) && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-neutral-12 text-neutral-1 text-[10px] font-black uppercase tracking-tighter rounded-lg">
                          <Star size={12} className="fill-current" />
                          {project.stars}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] text-neutral-10 flex items-center gap-1.5 uppercase tracking-widest font-black">
                        <Calendar size={12} />
                        {formatDate(project.created_at)}
                      </span>
                      <div className="flex gap-2">
                        {project.tech_stack.slice(0, 2).map((tech) => (
                          <span key={tech} className="text-[9px] font-black text-[#D3C0B1] uppercase tracking-tighter bg-neutral-3 px-2 py-0.5 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-black mb-2 group-hover:text-[#D3C0B1] transition-colors line-clamp-1 tracking-tighter uppercase italic text-neutral-12">
                      {project.title}
                    </h3>
                    
                    <p className="text-neutral-10 text-sm mb-6 line-clamp-2 leading-relaxed flex-1 font-medium italic">
                      "{project.description}"
                    </p>

                    {/* Footer Actions - Studio Style */}
                    <div className="flex items-center gap-3 pt-4 border-t-2 border-neutral-3">
                      {project.demo_url && (
                        <Button
                          className="flex-1 gap-2 bg-neutral-12 hover:bg-[#D3C0B1] text-neutral-1 hover:text-neutral-1 font-black rounded-xl h-12 transition-all active:scale-95 uppercase text-[10px] tracking-widest italic"
                          onClick={() => {
                            setModalProject(project)
                            setShowModal(true)
                          }}
                        >
                          <ExternalLink size={16} />
                          <span>Lancer</span>
                        </Button>
                      )}
                      {project.github_url && (
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-3 bg-neutral-2 border-2 border-neutral-3 rounded-xl hover:border-[#D3C0B1] hover:text-[#D3C0B1] transition-all active:scale-90"
                          title="Source Code"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="w-full text-center py-20 bg-card rounded-[2rem] border-2 border-dashed border-foreground/10">
              <Search size={48} className="mx-auto mb-4 text-primary/20" />
              <p className="text-xl font-black uppercase italic tracking-tighter">Aucun projet trouvé</p>
              <Button variant="link" onClick={() => { setSelectedTech("Tous"); setSearchQuery(""); }} className="text-primary font-black uppercase text-xs tracking-widest">
                Réinitialiser
              </Button>
            </div>
          )}
        </div>
      </div>

      {modalProject && (
        <DemoModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false)
            setModalProject(null)
          }}
          projectTitle={modalProject.title}
          projectUrl={modalProject.demo_url || ''}
        />
      )}
    </div>
  )
}
