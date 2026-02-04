import { useState, useEffect, useRef, useMemo } from "react"
import { ExternalLink, Calendar, Github, Globe, Star, Search, ChevronLeft, ChevronRight, Rocket, Code2, Heart, Eye, GitFork } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DemoModal } from "@/components/ui/ProjectModal"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { projects as localProjects, type Project } from "@/data/projects"

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
  const [projects, setProjects] = useState<Project[]>(localProjects)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // fetchProjects is no longer needed but kept as empty to avoid reference errors if any
  const fetchProjects = async () => {}

  useEffect(() => {
    // No fetch needed for static data
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
      case 'En production': return 'text-white bg-green-500/80 border-green-400/50 backdrop-blur-md shadow-lg shadow-green-500/20'
      case 'En développement': return 'text-white bg-amber-500/80 border-amber-400/50 backdrop-blur-md shadow-lg shadow-amber-500/20'
      case 'Alpha': return 'text-white bg-red-500/80 border-red-400/50 backdrop-blur-md shadow-lg shadow-red-500/20'
      case 'Beta': return 'text-white bg-blue-500/80 border-blue-400/50 backdrop-blur-md shadow-lg shadow-blue-500/20'
      default: return 'text-white bg-gray-500/80 border-gray-400/50 backdrop-blur-md'
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
                <Card className="relative h-full flex flex-col overflow-hidden bg-card border border-border/50 hover:border-accent/40 transition-all duration-500 rounded-[2rem] shadow-lg hover:shadow-2xl group">
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
                    
                    {/* Overlay on Hover (Background) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        viewport={{ once: true }}
                      >
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg border shadow-lg",
                            getStatusColor(project.status)
                          )}
                        >
                          {project.status}
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Statistics Badges */}
                    <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-20">
                      {project.stars !== undefined && project.stars > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5, x: 50 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0 }}
                          whileHover={{ scale: 1.1, x: -5 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-1.5 px-3 py-1 bg-card border-2 border-border text-foreground text-[10px] font-bold rounded-lg shadow-md cursor-pointer group/stat"
                        >
                          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                          </motion.div>
                          {project.stars}
                        </motion.div>
                      )}
                      {project.likes !== undefined && project.likes > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5, x: 50 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0 }}
                          whileHover={{ scale: 1.1, x: -5 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-1.5 px-3 py-1 bg-card border-2 border-border text-foreground text-[10px] font-bold rounded-lg shadow-md cursor-pointer group/stat"
                        >
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                            <Heart size={12} className="text-red-500 fill-red-500" />
                          </motion.div>
                          {project.likes}
                        </motion.div>
                      )}
                      {project.views !== undefined && project.views > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5, x: 50 }}
                          whileInView={{ opacity: 1, scale: 1, x: 0 }}
                          whileHover={{ scale: 1.1, x: -5 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-1.5 px-3 py-1 bg-card border-2 border-border text-foreground text-[10px] font-bold rounded-lg shadow-md cursor-pointer group/stat"
                        >
                          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Eye size={12} className="text-blue-500" />
                          </motion.div>
                          {project.views}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-muted-foreground flex items-center gap-2 font-bold">
                        <Calendar size={14} className="text-accent" />
                        {formatDate(project.created_at)}
                      </span>
                      <div className="flex flex-wrap gap-1.5 justify-end max-w-[60%]">
                        {project.tech_stack.slice(0, 2).map((tech, i) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent border-accent/20 font-bold py-0.5 px-2">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.tech_stack.length > 2 && (
                          <div className="relative group/tags">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              whileHover={{ y: -2 }}
                              transition={{ delay: 0.3 }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="secondary" className="text-[10px] bg-accent text-accent-foreground border-transparent font-black py-0.5 px-2 cursor-help">
                                +{project.tech_stack.length - 2}
                              </Badge>
                            </motion.div>
                            
                            {/* Hidden Tags Tooltip */}
                            <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover/tags:opacity-100 pointer-events-none group-hover/tags:pointer-events-auto transition-all duration-300 translate-y-1 group-hover/tags:translate-y-0 z-50">
                              <div className="bg-card/95 border border-border shadow-2xl rounded-xl p-3 flex flex-wrap gap-1.5 min-w-[140px] justify-center items-center backdrop-blur-xl">
                                {project.tech_stack.slice(2).map((tech) => (
                                  <Badge 
                                    key={tech} 
                                    variant="outline" 
                                    className="text-[9px] bg-accent/5 text-accent border-accent/20 font-bold whitespace-nowrap text-center justify-center flex items-center h-6 px-2"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                              {/* Arrow */}
                              <div className="absolute right-4 -bottom-1 w-2.5 h-2.5 bg-card border-r border-b border-border rotate-45 mx-auto" style={{ left: 'auto', right: '14px' }} />
                            </div>
                          </div>
                        )}
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
                          className="flex-1 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl h-10 shadow-lg transition-all active:scale-95 text-sm"
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
