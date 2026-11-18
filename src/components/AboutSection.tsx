import { useState, type PointerEvent, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Building2, CodeXml, GraduationCap, MapPin, Megaphone, Server, type LucideIcon } from "lucide-react"
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"
import { projects } from "@/data/projects"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { LinkedInFooterModal } from "@/components/ui/SocialModals"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { ParagrapheRevele } from "@/components/immersion/Texte"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { useLangue, type Bilingue } from "@/lib/langue"
import { cn } from "@/lib/utils"

/**
 * Qui je suis, à la première personne. Les durées (24 ans, 13 ans de code)
 * sont dans le hero et le détail des missions dans les cases du bento : ni les
 * unes ni l'autre ne sont redits ici.
 */
const PRESENTATION: Bilingue = {
  fr: "Mon pseudo de base, c'est Kaysuto, mais tout le monde m'appelle Kimiya : c'est plus simple à prononcer. Je suis informaticien polyvalent chez Magna Engineered Glass Europe, et sur mon temps libre, je développe mes propres projets.",
  en: "My original handle is Kaysuto, but everyone calls me Kimiya: it's easier to say. I'm an IT generalist at Magna Engineered Glass Europe, and in my free time I build my own projects.",
}

/**
 * D'où vient chaque compétence. Deux diplômes, un poste en datacenter, et le
 * développement fullstack, le seul appris en autodidacte.
 */
const PARCOURS: { icone: LucideIcon; quand: Bilingue; source: Bilingue; acquis: Bilingue }[] = [
  {
    icone: GraduationCap,
    quand: { fr: "2020", en: "2020" },
    source: { fr: "Bac pro électrotechnique (MELEC)", en: "Vocational diploma in electrical engineering (MELEC)" },
    acquis: { fr: "Les objets connectés", en: "Connected devices" },
  },
  {
    icone: Megaphone,
    quand: { fr: "2022", en: "2022" },
    source: { fr: "Titre pro assistant web marketing", en: "Web marketing assistant certification" },
    acquis: { fr: "Le référencement et l'animation de communauté", en: "SEO and community management" },
  },
  {
    icone: Server,
    quand: { fr: "2023 – 2026", en: "2023 – 2026" },
    source: { fr: "Technicien datacenter", en: "Data center technician" },
    acquis: { fr: "Les systèmes et les réseaux", en: "Systems and networks" },
  },
  {
    icone: CodeXml,
    quand: { fr: "En continu", en: "Ongoing" },
    source: { fr: "En autodidacte", en: "Self-taught" },
    acquis: { fr: "Le développement fullstack", en: "Full-stack development" },
  },
]

/** Trois aperçus en éventail dans la case « Sur mes projets » : ceux qui suivent le projet phare du hero. */
const APERCUS = projects.filter((projet) => projet.image_url).slice(1, 4)

/** Inclinaison de chaque aperçu, au repos puis écarté au survol de la case. */
const EVENTAIL = [
  "-rotate-8 -translate-x-12 translate-y-2 group-hover:-rotate-12 group-hover:-translate-x-20",
  "rotate-0 z-10 group-hover:-translate-y-2",
  "rotate-8 translate-x-12 translate-y-2 group-hover:rotate-12 group-hover:translate-x-20",
]

const AU_TRAVAIL: Bilingue[] = [
  { fr: "Support", en: "Support" },
  { fr: "Applis internes", en: "Internal apps" },
  { fr: "Parc", en: "IT assets" },
  { fr: "Réseau", en: "Network" },
  { fr: "Infra interne", en: "Internal infra" },
]
const SUR_MES_PROJETS: Bilingue[] = [
  { fr: "Design", en: "Design" },
  { fr: "Front", en: "Front" },
  { fr: "Back", en: "Back" },
  { fr: "Déploiement", en: "Deployment" },
]

/** Une case du bento, avec la même lueur au survol que celles du hero. */
function Case({ children, className }: { children: ReactNode; className?: string }) {
  const suivre = (evenement: PointerEvent<HTMLElement>) => {
    const cadre = evenement.currentTarget.getBoundingClientRect()
    evenement.currentTarget.style.setProperty("--x", `${evenement.clientX - cadre.left}px`)
    evenement.currentTarget.style.setProperty("--y", `${evenement.clientY - cadre.top}px`)
  }
  return (
    <motion.article
      variants={fadeInUp}
      onPointerMove={suivre}
      className={cn("tuile-lumiere relative overflow-hidden rounded-2xl border border-border bg-card/80 p-6 md:p-8", className)}
    >
      {children}
    </motion.article>
  )
}

function Etiquettes({ mots }: { mots: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {mots.map((mot) => (
        <li key={mot} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
          {mot}
        </li>
      ))}
    </ul>
  )
}

function Intitule({ children }: { children: ReactNode }) {
  return <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{children}</h3>
}

export function AboutSection() {
  // Comme partout sur le site, GitHub et LinkedIn s'ouvrent après une confirmation.
  const [modale, setModale] = useState<"github" | "linkedin" | null>(null)
  const { langue, t, l } = useLangue()

  return (
    <section id="apropos" className="py-10 lg:py-14 px-6 lg:px-12 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          title={t(<>À propos de <span className="text-accent-texte">moi</span></>, <>About <span className="text-accent-texte">me</span></>)}
        />

        <motion.div variants={fadeInUp} className="mb-10 md:mb-12">
          <ParagrapheRevele
            key={langue}
            texte={l(PRESENTATION)}
            className="max-w-5xl text-2xl font-normal leading-snug tracking-tight text-foreground text-pretty md:text-4xl md:leading-[1.2]"
          />
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-3">
          {/* Parcours : une frise, chaque étape avec sa date et ce qu'elle m'a apporté */}
          <Case className="md:col-span-2">
            <Intitule>{t("D'où vient ce que je sais faire", "Where my skills come from")}</Intitule>
            <ol className="relative mt-8">
              {/* Le fil de la frise, derrière les pastilles */}
              <span aria-hidden="true" className="absolute left-5 top-5 bottom-5 w-px bg-linear-to-b from-accent/60 via-border to-border" />
              {PARCOURS.map(({ icone: Icone, quand, source, acquis }) => (
                <li key={source.fr} className="group/etape relative flex gap-5 pb-7 last:pb-0">
                  <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-card text-accent-texte transition-colors duration-300 group-hover/etape:bg-accent group-hover/etape:text-accent-foreground">
                    <Icone className="size-[18px]" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-xs tabular-nums text-accent-texte">{l(quand)}</span>
                      <span className="text-sm text-muted-foreground">{l(source)}</span>
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">{l(acquis)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Case>

          {/* Portrait */}
          <Case className="flex flex-col items-center justify-center gap-5 bg-[radial-gradient(80%_60%_at_50%_100%,color-mix(in_oklch,var(--accent)_25%,transparent),transparent)] text-center">
            <div aria-hidden="true" className="fond-grille pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              {/* Anneau en pointillés qui tourne lentement autour du portrait */}
              <span aria-hidden="true" className="anneau-lent absolute -inset-3 rounded-full border border-dashed border-accent/50" />
              <img
                src="/personnage/kimiya-avatar.webp"
                alt={t("Portrait de Kimiya", "Portrait of Kimiya")}
                loading="lazy"
                className="relative size-36 rounded-full bg-background object-cover ring-1 ring-border md:size-40"
              />
            </div>
            <div className="relative">
              <p className="text-2xl font-semibold tracking-tight text-foreground">Kimiya</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("Informaticien polyvalent", "IT generalist")}</p>
            </div>
            <div className="relative flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-accent-texte" aria-hidden="true" />
                France
              </span>
              <button
                type="button"
                onClick={() => setModale("github")}
                aria-label={t("Mon GitHub", "My GitHub")}
                className="flex size-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <GithubLogo size={16} />
              </button>
              <button
                type="button"
                onClick={() => setModale("linkedin")}
                aria-label={t("Mon LinkedIn", "My LinkedIn")}
                className="flex size-8 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LinkedinLogo size={16} />
              </button>
            </div>
          </Case>

          {/* Au travail */}
          <Case>
            <div className="flex items-center justify-between gap-3">
              <Intitule>{t("Au travail", "At work")}</Intitule>
              <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent-texte">{t("Depuis mai 2026", "Since May 2026")}</span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-texte">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-lg font-semibold tracking-tight text-foreground">{t("Informaticien Polyvalent", "IT Generalist")}</p>
                <p className="text-sm text-muted-foreground">Magna Engineered Glass Europe</p>
              </div>
            </div>
            <Etiquettes mots={AU_TRAVAIL.map(l)} />
          </Case>

          {/* Mes projets : texte à gauche, aperçus en éventail à droite */}
          <Case className="group grid items-center gap-8 md:col-span-2 md:grid-cols-[1fr_auto]">
            <div>
              <Intitule>{t("Sur mes projets", "On my own projects")}</Intitule>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{t("De l'idée à la mise en ligne", "From idea to launch")}</p>
              <p className="mt-2 max-w-md text-sm/relaxed text-muted-foreground">
                {t(
                  "Pas de ticket ni de validation : je décide, je dessine, je code et je déploie.",
                  "No tickets, no sign-offs: I decide, design, code and ship."
                )}
              </p>
              <Etiquettes mots={SUR_MES_PROJETS.map(l)} />
            </div>
            <div aria-hidden="true" className="relative mx-auto hidden h-36 w-72 sm:block">
              {APERCUS.map((projet, index) => (
                <img
                  key={projet.id}
                  src={projet.image_url}
                  alt=""
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 m-auto aspect-[16/10] w-44 rounded-xl object-cover object-top shadow-xl ring-1 ring-border transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    EVENTAIL[index]
                  )}
                />
              ))}
            </div>
          </Case>
        </motion.div>
      </motion.div>

      <GitHubModal isOpen={modale === "github"} onClose={() => setModale(null)} />
      <LinkedInFooterModal isOpen={modale === "linkedin"} onClose={() => setModale(null)} />
    </section>
  )
}
