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
  "En production": "bg-success/15 text-success border-success/35",
  "Beta": "bg-accent/15 text-accent-texte border-accent/35",
  "Alpha": "bg-info/15 text-info border-info/35",
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
      whileHover={{ y: -4 }}
      className="group/card flex flex-col h-full rounded-xl ring-1 ring-foreground/10 bg-card overflow-hidden hover:ring-accent/40 transition-[box-shadow] duration-300"
    >
      {/* Visuel */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted isolate shrink-0">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.image_alt ?? project.title}
            className="object-cover w-full h-full group-hover/card:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Rocket size={56} className="text-accent-texte/20 group-hover/card:text-accent-texte/40 transition-colors duration-300" />
          </div>
        )}

        <span
          className={cn(
            "absolute top-3 left-3 z-20 inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider border",
            STYLES_STATUT[project.status]
          )}
        >
          {project.status}
        </span>

        <div className="absolute bottom-3 right-3 z-20 flex gap-1.5">
          {!!project.stars && project.stars > 0 && (
            <span className="flex items-center gap-1 text-white text-[11px] font-medium bg-black/60 px-2 py-0.5 rounded-sm tabular-nums">
              <Star size={13} className="text-accent fill-accent" aria-hidden="true" />
              {project.stars}
            </span>
          )}
          {!!project.likes && project.likes > 0 && (
            <span className="flex items-center gap-1 text-white text-[11px] font-medium bg-black/60 px-2 py-0.5 rounded-sm tabular-nums">
              <Heart size={13} className="text-corail fill-corail" aria-hidden="true" />
              {project.likes}
            </span>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 flex flex-col p-5 min-h-0">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 shrink-0">
            <Calendar size={13} aria-hidden="true" />
            {formaterDate(project.created_at)}
          </span>
          <div className="flex gap-1 flex-wrap justify-end">
            {project.tech_stack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-[11px] px-2 py-0">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 group-hover/card:text-accent-texte transition-colors tracking-tight">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm/relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex items-center gap-2 pt-4 mt-auto">
          {project.demo_url && (
            <Button className="flex-1 gap-2" onClick={() => onDiscover(project)}>
              <ExternalLink size={16} aria-hidden="true" />
              Découvrir
            </Button>
          )}
          {project.github_url && (
            <Button variant="outline" size="icon" asChild className="shrink-0">
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
