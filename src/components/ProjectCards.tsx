import { useState } from "react"
import { ArrowUpRight, Rocket } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { ProjectModal } from "@/components/ui/ProjectModal"
import { projects, type Project } from "@/data/projects"
import { useLangue } from "@/lib/langue"
import { EASE_OUT, fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { cn } from "@/lib/utils"

const grille = staggerContainer
const carte = fadeInUp
/** La capture se découvre de haut en bas, un peu après l'arrivée de sa carte. */
const volet: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.8, ease: EASE_OUT, delay: 0.15 } },
}

/**
 * Cartes larges selon la place. En trois colonnes, les rangées alternent
 * large + étroite, étroite + large, large + étroite. En deux colonnes, la
 * première et la dernière prennent toute la largeur, les quatre autres vont par paires.
 */
const LARGEUR: Record<number, string> = {
  0: "sm:col-span-2",
  3: "lg:col-span-2",
  4: "lg:col-span-2",
  5: "sm:col-span-2 lg:col-span-1",
}

/** Toute la carte est cliquable : le pseudo-élément du lien principal la recouvre. */
const LIEN_PRINCIPAL =
  "outline-none after:absolute after:inset-0 after:z-10 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring"

interface CarteProps {
  project: Project
  className?: string
  onOuvrir: (project: Project) => void
}

function CarteProjet({ project, className, onOuvrir }: CarteProps) {
  const mouvementReduit = useReducedMotion()
  const { t, l } = useLangue()

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
            alt={project.image_alt ? l(project.image_alt) : project.title}
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
            {l(project.type)} · {new Date(project.created_at).getFullYear()}
          </p>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            <button type="button" onClick={() => onOuvrir(project)} className={cn(LIEN_PRINCIPAL, "text-left")}>
              {project.title}
              <span className="sr-only">{t(" : voir la fiche du projet", ": view project details")}</span>
            </button>
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-2">
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
  // Le dernier projet ouvert reste en mémoire : la fiche garde son contenu pendant l'animation de fermeture.
  const [projet, setProjet] = useState<Project | null>(null)
  const [ouvert, setOuvert] = useState(false)

  const ouvrir = (choisi: Project) => {
    setProjet(choisi)
    setOuvert(true)
  }

  return (
    <>
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={grille}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {projects.map((choisi, index) => (
          <CarteProjet key={choisi.id} project={choisi} className={LARGEUR[index]} onOuvrir={ouvrir} />
        ))}
      </motion.div>

      <ProjectModal isOpen={ouvert} onClose={() => setOuvert(false)} project={projet} />
    </>
  )
}
