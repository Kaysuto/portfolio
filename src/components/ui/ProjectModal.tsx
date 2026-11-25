import { CalendarBlank, GithubLogo as Github } from "@phosphor-icons/react";
import { ArrowUpRight } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./button";
import type { Project } from "@/data/projects";
import { useLangue } from "@/lib/langue";

const STATUTS: Record<Project["status"], { fr: string; en: string }> = {
  "En production": { fr: "En ligne", en: "Live" },
  "En développement": { fr: "En développement", en: "In development" },
  Alpha: { fr: "Alpha", en: "Alpha" },
  Beta: { fr: "Bêta", en: "Beta" },
};

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

/**
 * Fiche d'un projet : ce que c'est, depuis quand, ce qu'il fait et avec quoi.
 * Les liens sortants sont écrits en clair (le domaine est dans le bouton) :
 * la fiche tient lieu de confirmation avant de quitter le site.
 */
export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { langue, t, l } = useLangue();
  if (!project) return null;

  const creation = new Intl.DateTimeFormat(langue === "fr" ? "fr-FR" : "en-GB", { month: "long", year: "numeric" }).format(
    new Date(project.created_at)
  );
  const domaine = project.demo_url && new URL(project.demo_url).hostname.replace(/^www\./, "");

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      {/* Le panneau reste fixe, seul le contenu défile : la croix de fermeture ne quitte jamais l'écran. */}
      <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain">
        <header className="pr-10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {l(project.type)}
            <span aria-hidden="true"> · </span>
            <span className="text-accent-texte">{l(STATUTS[project.status])}</span>
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{project.title}</h2>
        </header>

        {project.image_url && (
          <img
            src={project.image_url}
            alt={project.image_alt ? l(project.image_alt) : project.title}
            decoding="async"
            className="mt-5 aspect-[16/9] w-full rounded-lg object-cover object-top ring-1 ring-foreground/10"
          />
        )}

        <p className="mt-5 text-base/relaxed text-foreground text-pretty">{l(project.description)}</p>

        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarBlank className="size-4 text-accent-texte" aria-hidden="true" />
          {t(`Commencé en ${creation}`, `Started in ${creation}`)}
        </p>

        <h3 className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("Fonctionnalités", "Features")}
        </h3>
        <ul className="mt-3 space-y-2">
          {project.points.map((point) => (
            <li key={point.fr} className="flex gap-3 text-sm/relaxed text-foreground">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {l(point)}
            </li>
          ))}
        </ul>

        <h3 className="mt-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("Technologies", "Tech stack")}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <li key={tech} className="rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-xs text-foreground">
              {tech}
            </li>
          ))}
        </ul>

        {(project.demo_url || project.github_url) && (
          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            {project.demo_url && (
              <Button asChild className="h-10 flex-1">
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  {t(`Visiter ${domaine}`, `Visit ${domaine}`)}
                  <ArrowUpRight />
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button asChild variant="outline" className="h-10 flex-1">
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                  {t("Voir le code sur GitHub", "View the code on GitHub")}
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
