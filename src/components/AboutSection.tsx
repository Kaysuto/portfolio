import { useState, type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { projects } from "@/data/projects"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { LinkedInFooterModal } from "@/components/ui/SocialModals"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { ParagrapheRevele } from "@/components/immersion/Texte"
import { EASE_OUT, fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { useLangue, type Bilingue } from "@/lib/langue"
import { cn } from "@/lib/utils"

/**
 * Qui je suis, à la première personne. Chaque fait n'est dit qu'une fois sur
 * la page : le poste est dans le hero, l'employeur dans « Au travail », le
 * détail des projets dans « Sur mes projets ». Le chapeau ne fait qu'annoncer
 * ces deux terrains.
 */
const PRESENTATION: Bilingue = {
  fr: "Mon pseudo de base, c'est Kaysuto, mais tout le monde m'appelle Kimiya : c'est plus simple à prononcer. Mon temps se partage entre deux terrains : mon poste en entreprise et mes propres projets.",
  en: "My original handle is Kaysuto, but everyone calls me Kimiya: it's easier to say. My time is split between two fields: my job and my own projects.",
}

/**
 * D'où vient chaque compétence. Deux diplômes, un poste en datacenter, et le
 * développement fullstack, le seul appris en autodidacte.
 */
const PARCOURS: { quand: Bilingue; source: Bilingue; acquis: Bilingue }[] = [
  {
    quand: { fr: "2020", en: "2020" },
    source: { fr: "Bac pro électrotechnique (MELEC)", en: "Vocational diploma in electrical engineering (MELEC)" },
    acquis: { fr: "Les objets connectés", en: "Connected devices" },
  },
  {
    quand: { fr: "2022", en: "2022" },
    source: { fr: "Titre pro assistant web marketing", en: "Web marketing assistant certification" },
    acquis: { fr: "Le référencement et l'animation de communauté", en: "SEO and community management" },
  },
  {
    quand: { fr: "2023 – 2026", en: "2023 – 2026" },
    source: { fr: "Technicien datacenter", en: "Data center technician" },
    acquis: { fr: "Les systèmes et les réseaux", en: "Systems and networks" },
  },
  {
    quand: { fr: "En continu", en: "Ongoing" },
    source: { fr: "En autodidacte", en: "Self-taught" },
    acquis: { fr: "Le développement fullstack", en: "Full-stack development" },
  },
]

/** Trois aperçus en éventail sous « Sur mes projets » : ceux qui suivent le projet phare du hero. */
const APERCUS = projects.filter((projet) => projet.image_url).slice(1, 4)

/** Inclinaison de chaque aperçu, au repos puis écarté au survol du bloc. */
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

/** Le filet au-dessus de chaque étape se trace de gauche à droite, à l'arrivée de l'étape. */
const filet: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT } },
}

/** Mots séparés par des points médians : une ligne de texte plutôt qu'une rangée de pastilles. */
function Mots({ mots }: { mots: string[] }) {
  return (
    <p className="mt-4 text-sm text-foreground">
      {mots.map((mot, index) => (
        <span key={mot}>
          {index > 0 && <span aria-hidden="true" className="text-muted-foreground"> · </span>}
          {mot}
        </span>
      ))}
    </p>
  )
}

function Intitule({ children }: { children: ReactNode }) {
  return <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{children}</h3>
}

const LIEN_TEXTE =
  "rounded-sm text-foreground underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

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
        {/*
          Mobile : titre, portrait, puis le texte. Grand écran : le portrait
          occupe la colonne de gauche sur toute la hauteur et reste à l'écran
          pendant qu'on lit la colonne de droite.
        */}
        <div className="grid items-start gap-y-8 lg:grid-cols-[25rem_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-18 lg:gap-y-0">
          {/* L'écart vertical vient de la grille sur mobile, de la marge du titre sur grand écran. */}
          <SectionHeading
            className="mb-0 md:mb-0 lg:col-start-2 lg:mb-10"
            title={t(<>À propos de <span className="text-accent-texte">moi</span></>, <>About <span className="text-accent-texte">me</span></>)}
          />

          <motion.figure
            variants={fadeInUp}
            className="relative mx-auto w-full max-w-xs lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none"
          >
            {/* Halo sable derrière le personnage, plus dense au niveau du buste. */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-[10%] top-[10%] bottom-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_60%,color-mix(in_oklch,var(--accent)_30%,transparent),transparent_70%)]"
            />
            {/* Sur mobile, le cadre est carré : le personnage est recadré sur le buste. */}
            <img
              src="/personnage/kimiya-portrait.webp"
              alt={t("Portrait de Kimiya, dessiné", "Illustrated portrait of Kimiya")}
              width={960}
              height={1200}
              loading="lazy"
              decoding="async"
              className="block aspect-square w-full object-cover object-top [mask-image:linear-gradient(#000_72%,transparent)] lg:aspect-[4/5]"
            />
            <figcaption className="-mt-2 flex items-baseline justify-between gap-4 border-t border-border pt-3.5 text-sm text-muted-foreground">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent-texte">France</span>
              <span>
                <button type="button" onClick={() => setModale("github")} className={LIEN_TEXTE}>
                  GitHub
                </button>
                <span aria-hidden="true"> · </span>
                <button type="button" onClick={() => setModale("linkedin")} className={LIEN_TEXTE}>
                  LinkedIn
                </button>
              </span>
            </figcaption>
          </motion.figure>

          <div className="lg:col-start-2">
            <motion.div variants={fadeInUp}>
              <ParagrapheRevele
                key={langue}
                texte={l(PRESENTATION)}
                className="text-2xl font-normal leading-snug tracking-tight text-foreground text-pretty md:text-3xl md:leading-[1.25]"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12">
              <Intitule>{t("D'où vient ce que je sais faire", "Where my skills come from")}</Intitule>
            </motion.div>
            <motion.ol variants={staggerContainer} className="mt-4 border-b border-border">
              {PARCOURS.map(({ quand, source, acquis }) => (
                <motion.li
                  key={source.fr}
                  variants={fadeInUp}
                  className="relative grid grid-cols-[6.5rem_1fr] gap-4 py-[1.125rem] sm:grid-cols-[8.25rem_1fr]"
                >
                  <motion.span aria-hidden="true" variants={filet} className="absolute inset-x-0 top-0 h-px origin-left bg-border" />
                  <span className="pt-1.5 font-mono text-xs tabular-nums text-accent-texte">{l(quand)}</span>
                  <div className="min-w-0">
                    <p className="text-lg font-semibold tracking-tight text-foreground text-pretty md:text-xl">{l(acquis)}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{l(source)}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>

        {/* Les deux terrains annoncés par le chapeau, côte à côte, séparés par un filet. */}
        <div className="mt-16 grid gap-10 md:mt-18 md:grid-cols-[1fr_1.7fr] md:gap-14">
          <motion.div variants={fadeInUp}>
            <Intitule>
              {t("Au travail", "At work")}
              <span className="text-accent-texte"> · {t("depuis mai 2026", "since May 2026")}</span>
            </Intitule>
            <p className="mt-3.5 text-2xl font-semibold tracking-tight text-foreground text-balance">Magna Engineered Glass Europe</p>
            <Mots mots={AU_TRAVAIL.map(l)} />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="group flex items-center justify-between gap-6 border-t border-border pt-10 md:border-t-0 md:border-l md:pt-0 md:pl-14"
          >
            <div>
              <Intitule>{t("Sur mes projets", "On my own projects")}</Intitule>
              <p className="mt-3.5 text-2xl font-semibold tracking-tight text-foreground text-balance">
                {t("De l'idée à la mise en ligne", "From idea to launch")}
              </p>
              <p className="mt-2 max-w-[34ch] text-sm/relaxed text-muted-foreground">
                {t(
                  "Pas de ticket ni de validation : je décide, je dessine, je code et je déploie.",
                  "No tickets, no sign-offs: I decide, design, code and ship."
                )}
              </p>
              <Mots mots={SUR_MES_PROJETS.map(l)} />
            </div>
            <div aria-hidden="true" className="relative hidden h-36 w-72 shrink-0 sm:block">
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
          </motion.div>
        </div>
      </motion.div>

      <GitHubModal isOpen={modale === "github"} onClose={() => setModale(null)} />
      <LinkedInFooterModal isOpen={modale === "linkedin"} onClose={() => setModale(null)} />
    </section>
  )
}
