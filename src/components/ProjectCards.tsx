import { useState, useCallback } from "react"
import { ExternalLink, Calendar, Star, Heart, Rocket } from "lucide-react"
import { GithubLogo as Github } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DemoModal } from "@/components/ui/ProjectModal"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { projects as projetsLocaux, type Project } from "@/data/projects"
import { scaleIn, VIEWPORT, EASE_OUT } from "@/lib/animations"

/** Statuts déclinés sur la palette du site plutôt que sur les couleurs Tailwind par défaut. */
const STYLES_STATUT: Record<Project["status"], string> = {
  "En production": "bg-sage/15 text-sage border-sage/35",
  "Beta": "bg-accent/15 text-accent border-accent/35",
  "Alpha": "bg-steel/15 text-steel border-steel/35",
  "En développement": "bg-muted-foreground/15 text-muted-foreground border-muted-foreground/30",
}

function formaterDate(chaineDate: string) {
  return new Date(chaineDate).toLocaleDateString("fr-FR", { year: "numeric", month: "short" })
}

interface ProjectCardProps {
  project: Project
  index: number
  onDiscover: (project: Project) => void
}

function ProjectCard({ project, index, onDiscover }: ProjectCardProps) {
  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ delay: index * 0.06, duration: 0.4, ease: EASE_OUT }}
      whileHover={{ y: -8 }}
      className="group/card flex flex-col h-full rounded-3xl border border-border/60 bg-card overflow-hidden hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-[border-color,box-shadow] duration-300"
    >
      {/* Visuel */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-accent/5 isolate shrink-0">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.image_alt ?? project.title}
            className="object-cover w-full h-full group-hover/card:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Rocket size={56} className="text-accent/20 group-hover/card:text-accent/40 transition-colors duration-300" />
          </div>
        )}

        <span
          className={cn(
            "absolute top-4 left-4 z-20 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
            STYLES_STATUT[project.status]
          )}
        >
          {project.status}
        </span>

        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {!!project.stars && project.stars > 0 && (
            <span className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/60 px-2 py-1 rounded-lg">
              <Star size={11} className="text-yellow-400 fill-yellow-400" aria-hidden="true" />
              {project.stars}
            </span>
          )}
          {!!project.likes && project.likes > 0 && (
            <span className="flex items-center gap-1 text-white text-[10px] font-bold bg-black/60 px-2 py-1 rounded-lg">
              <Heart size={11} className="text-red-500 fill-red-500" aria-hidden="true" />
              {project.likes}
            </span>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 flex flex-col p-6 min-h-0">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] text-accent font-bold uppercase tracking-widest flex items-center gap-1.5 shrink-0">
            <Calendar size={11} aria-hidden="true" />
            {formaterDate(project.created_at)}
          </span>
          <div className="flex gap-1 flex-wrap justify-end">
            {project.tech_stack.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[9px] border-accent/20 text-accent/90 font-bold px-2 py-0"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2.5 group-hover/card:text-accent transition-colors tracking-tight">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1 font-medium">
          {project.description}
        </p>

        <div className="flex items-center gap-3 pt-5 mt-auto">
          {project.demo_url && (
            <Button
              className="flex-1 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl h-11 active:scale-95 transition-all"
              onClick={() => onDiscover(project)}
            >
              <ExternalLink size={15} aria-hidden="true" />
              DÉCOUVRIR
            </Button>
          )}
          {project.github_url && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="w-11 h-11 rounded-xl bg-accent/[0.06] border-accent/20 hover:border-accent/50 hover:bg-accent/15 transition-all shrink-0"
            >
              <a href={project.github_url} target="_blank" rel="noreferrer" aria-label={`Dépôt GitHub de ${project.title}`}>
                <Github size={18} />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectCards() {
  const [projetModale, setProjetModale] = useState<Project | null>(null)
  const [afficherModale, setAfficherModale] = useState(false)

  const gererDecouverte = useCallback((projet: Project) => {
    setProjetModale(projet)
    setAfficherModale(true)
  }, [])

  const gererFermetureModale = useCallback(() => {
    setAfficherModale(false)
    setTimeout(() => setProjetModale(null), 500)
  }, [])

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projetsLocaux.map((projet, index) => (
          <ProjectCard key={projet.id} project={projet} index={index} onDiscover={gererDecouverte} />
        ))}
      </div>

      <DemoModal
        isOpen={afficherModale && !!projetModale}
        onClose={gererFermetureModale}
        projectTitle={projetModale?.title ?? ""}
        projectUrl={projetModale?.demo_url ?? ""}
      />
    </>
  )
}
