import { useState, useCallback, useEffect } from "react"
import { ExternalLink, Calendar, Star, Heart, Rocket } from "lucide-react"
import { GithubLogo as Github } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { DemoModal } from "@/components/ui/ProjectModal"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { projects as localProjects, type Project } from "@/data/projects"
import { scaleIn, VIEWPORT, EASE_OUT } from "@/lib/animations"

const STATUS_STYLES: Record<Project["status"], string> = {
  "En production": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  "Beta": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  "Alpha": "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  "En développement": "bg-zinc-500/15 text-zinc-500 dark:text-zinc-400 border-zinc-500/30",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
  })
}

interface ProjectCardProps {
  project: Project
  index: number
  onDiscover: (project: Project) => void
}

function ProjectCard({ project, index, onDiscover }: ProjectCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay: index * 0.08, duration: 0.4, ease: EASE_OUT }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 22 } }}
      className="h-full"
    >
      <Card className="relative h-[500px] flex flex-col overflow-hidden bg-accent/5 backdrop-blur-md border-accent/15 hover:border-accent/40 hover:bg-accent/10 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 rounded-3xl shadow-lg group/card">
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden bg-card isolate shrink-0">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.image_alt ?? project.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-accent/5 flex items-center justify-center group-hover/card:bg-accent/10 transition-colors duration-300">
              <Rocket size={64} className="text-accent/20 group-hover/card:text-accent/40 transition-colors duration-300" />
            </div>
          )}

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-[-1px] h-12 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none z-10" />

          {/* Status badge */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                STATUS_STYLES[project.status]
              )}
            >
              {project.status}
            </span>
          </div>

          {/* Stats overlay */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            {!!project.stars && project.stars > 0 && (
              <div className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                {project.stars}
              </div>
            )}
            {!!project.likes && project.likes > 0 && (
              <div className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                <Heart size={11} className="text-red-500 fill-red-500" />
                {project.likes}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-8 min-h-0">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-accent font-black uppercase tracking-widest flex items-center gap-1.5">
              <Calendar size={11} />
              {formatDate(project.created_at)}
            </span>
            <div className="flex gap-1">
              {project.tech_stack.slice(0, 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-[9px] border-accent/20 text-accent/70 font-bold px-2 py-0"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <h3 className="text-2xl font-black mb-3 group-hover/card:text-accent transition-colors tracking-tighter line-clamp-1">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1 font-medium">
            {project.description}
          </p>

          <div className="flex items-center gap-4 pt-6 mt-auto">
            {project.demo_url && (
              <Button
                className="flex-1 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-black rounded-2xl h-12 shadow-lg active:scale-95 transition-all"
                onClick={() => onDiscover(project)}
              >
                <ExternalLink size={16} />
                DÉCOUVRIR
              </Button>
            )}
            {project.github_url && (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="w-12 h-12 rounded-2xl bg-accent/8 border-accent/20 hover:border-accent/50 hover:bg-accent/15 transition-all shrink-0"
              >
                <a href={project.github_url} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={20} />
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function ProjectCards() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const handleDiscover = useCallback((project: Project) => {
    setModalProject(project)
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setTimeout(() => setModalProject(null), 500)
  }, [])

  return (
    <div className="w-full space-y-6">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-6 py-8">
          {localProjects.map((project, index) => (
            <CarouselItem key={project.id} className="pl-6 basis-full md:basis-[420px]">
              <ProjectCard project={project} index={index} onDiscover={handleDiscover} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={cn(
            "left-0 h-11 w-11 rounded-full bg-card/90 backdrop-blur-md border-border/50 shadow-lg",
            "hover:bg-accent/10 hover:border-accent/40 hover:text-accent"
          )}
        />
        <CarouselNext
          className={cn(
            "right-0 h-11 w-11 rounded-full bg-card/90 backdrop-blur-md border-border/50 shadow-lg",
            "hover:bg-accent/10 hover:border-accent/40 hover:text-accent"
          )}
        />
      </Carousel>

      {/* Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2" aria-label="Slides">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === current
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      )}

      <DemoModal
        isOpen={showModal && !!modalProject}
        onClose={handleCloseModal}
        projectTitle={modalProject?.title ?? ""}
        projectUrl={modalProject?.demo_url ?? ""}
      />
    </div>
  )
}
