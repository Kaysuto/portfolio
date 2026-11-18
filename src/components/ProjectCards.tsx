import { useState, useCallback } from "react"
import { ArrowUpRight, Rocket } from "lucide-react"
import { GithubLogo as Github } from "@phosphor-icons/react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { DemoModal } from "@/components/ui/ProjectModal"
import { ExternalLinkModal } from "@/components/ui/ExternalLinkModal"
import { projects, type Project } from "@/data/projects"
import { EASE_OUT, VIEWPORT } from "@/lib/animations"
import { cn } from "@/lib/utils"

type Cible = "demo" | "github"

const grille: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const carte: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}
/** La capture se découvre de haut en bas, un peu après l'arrivée de sa carte. */
const volet: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.8, ease: EASE_OUT, delay: 0.15 } },
}

/**
 * Cartes larges selon la place : en trois colonnes, rangées large + étroite, trois étroites,
 * large + étroite ; en deux colonnes, seule la première est large pour que les autres tombent par paires.
 */
const LARGEUR: Record<number, string> = { 0: "sm:col-span-2", 5: "lg:col-span-2" }

/** Toute la carte est cliquable : le pseudo-élément du lien principal la recouvre. */
const LIEN_PRINCIPAL =
  "outline-none after:absolute after:inset-0 after:z-10 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring"

interface CarteProps {
  project: Project
  className?: string
  onOuvrir: (project: Project, cible: Cible) => void
}

function CarteProjet({ project, className, onOuvrir }: CarteProps) {
  const mouvementReduit = useReducedMotion()

  return (
    <motion.article
      variants={carte}
      className={cn(
        "group/carte relative h-64 overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 sm:h-72",
        className
      )}
    >
      <motion.div variants={mouvementReduit ? undefined : volet} className="absolute inset-0">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.image_alt ?? project.title}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-[scale] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover/carte:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Rocket size={56} className="text-accent-texte/20" aria-hidden="true" />
          </div>
        )}
      </motion.div>

      {/* Voile pour que le titre reste lisible quelle que soit la capture. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover/carte:opacity-90"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <div className="min-w-0">
          <p className="mb-1 truncate font-mono text-[11px] uppercase tracking-widest text-white/70">
            {project.type} · {new Date(project.created_at).getFullYear()}
          </p>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {project.demo_url ? (
              <button type="button" onClick={() => onOuvrir(project, "demo")} className={cn(LIEN_PRINCIPAL, "text-left")}>
                {project.title}
              </button>
            ) : (
              <button type="button" onClick={() => onOuvrir(project, "github")} className={cn(LIEN_PRINCIPAL, "text-left")}>
                {project.title}
                <span className="sr-only"> (dépôt GitHub)</span>
              </button>
            )}
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {project.demo_url && project.github_url && (
            <button
              type="button"
              onClick={() => onOuvrir(project, "github")}
              aria-label={`Dépôt GitHub de ${project.title}`}
              className="relative z-20 flex size-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Github size={18} />
            </button>
          )}
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-[rotate,background-color,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/carte:rotate-45 group-hover/carte:bg-white group-hover/carte:text-black"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectCards() {
  // Toute sortie du site passe par une confirmation : la démo comme le dépôt GitHub.
  const [ouverture, setOuverture] = useState<{ projet: Project; cible: Cible } | null>(null)
  const [afficherModale, setAfficherModale] = useState(false)

  const gererOuverture = useCallback((projet: Project, cible: Cible) => {
    setOuverture({ projet, cible })
    setAfficherModale(true)
  }, [])

  const gererFermetureModale = useCallback(() => {
    setAfficherModale(false)
    setTimeout(() => setOuverture(null), 500)
  }, [])

  return (
    <>
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={grille}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {projects.map((projet, index) => (
          <CarteProjet key={projet.id} project={projet} className={LARGEUR[index]} onOuvrir={gererOuverture} />
        ))}
      </motion.div>

      <DemoModal
        isOpen={afficherModale && ouverture?.cible === "demo"}
        onClose={gererFermetureModale}
        projectTitle={ouverture?.projet.title ?? ""}
        projectUrl={ouverture?.projet.demo_url ?? ""}
      />
      <ExternalLinkModal
        isOpen={afficherModale && ouverture?.cible === "github"}
        onClose={gererFermetureModale}
        icon={<Github className="size-6 text-accent-texte" />}
        title={ouverture?.projet.title ?? ""}
        subtitle="Voir le dépôt sur GitHub"
        url={ouverture?.projet.github_url ?? ""}
      />
    </>
  )
}
