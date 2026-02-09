import { useState, useEffect, useRef } from "react"
import { ExternalLink, Calendar, Github, Star, Heart, Rocket } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DemoModal } from "@/components/ui/ProjectModal"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { projects as localProjects, type Project } from "@/data/projects"

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -12,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
  }
}

export function ProjectCards() {
  const [projects] = useState<Project[]>(localProjects)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
    })
  }

  return (
    <div className="w-full space-y-12">
      <div className="relative group/carousel">
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={cn(
            "flex overflow-x-auto gap-8 py-10 scrollbar-hide px-4 -mx-4 select-none",
            isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[400px] snap-center project-card-container"
            >
              <Card className="relative h-[500px] flex flex-col overflow-hidden bg-card backdrop-blur-md border-border/50 hover:border-accent/40 transition-all duration-500 rounded-[2.5rem] shadow-xl group/card">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-card isolate">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent/5 flex items-center justify-center">
                      <Rocket size={64} className="text-accent/20" />
                    </div>
                  )}
                  
                  {/* Fading Overlay */}
                  <div className="absolute inset-x-0 bottom-[-1px] h-12 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none z-[20]" />

                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-accent/90 text-accent-foreground border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      {project.status}
                    </Badge>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 right-6 flex gap-3">
                    {project.stars !== undefined && project.stars > 0 && (
                      <div className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        {project.stars}
                      </div>
                    )}
                    {project.likes !== undefined && project.likes > 0 && (
                      <div className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        {project.likes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] text-accent font-black uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={12} />
                      {formatDate(project.created_at)}
                    </span>
                    <div className="flex gap-1.5">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-[9px] border-accent/20 text-accent/70 font-bold px-2 py-0">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-3 group-hover/card:text-accent transition-colors tracking-tighter">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1 font-medium">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 pt-8 mt-auto">
                    {project.demo_url && (
                      <Button
                        className="flex-1 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-black rounded-2xl h-12 shadow-lg transition-all active:scale-95"
                        onClick={() => {
                          setModalProject(project)
                          setShowModal(true)
                        }}
                      >
                        <ExternalLink size={18} />
                        <span>DÉCOUVRIR</span>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="w-12 h-12 rounded-2xl border-border/50 hover:border-accent hover:text-accent transition-all"
                      >
                        <a href={project.github_url} target="_blank" rel="noreferrer">
                          <Github size={22} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>

      <DemoModal
        isOpen={showModal && !!modalProject}
        onClose={() => {
          setShowModal(false)
          setTimeout(() => setModalProject(null), 500)
        }}
        projectTitle={modalProject?.title || ''}
        projectUrl={modalProject?.demo_url || ''}
      />
    </div>
  )
}
