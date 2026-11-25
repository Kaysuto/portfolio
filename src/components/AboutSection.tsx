import { useState, type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { projects } from "@/data/projects"
import { GitHubModal } from "@/components/ui/GitHubModal"
import { LinkedInFooterModal } from "@/components/ui/SocialModals"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { ParagrapheRevele } from "@/components/immersion/Texte"
import { EASE_OUT, fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { useLangue, type Bilingue } from "@/lib/langue"
import { cn } from "@/lib/utils"

/**
 * Qui je suis : le pseudo, l'âge, le métier et les projets. L'employeur n'est
 * jamais nommé : c'est privé.
 */
const PRESENTATION: Bilingue = {
  fr: "Mon pseudo de base, c'est Kaysuto, mais tout le monde m'appelle Kimiya : c'est plus simple à prononcer. J'ai 24 ans et ça fait plusieurs années que je travaille dans l'informatique. Au boulot, je suis informaticien polyvalent : support, parc, réseau et applis internes. Le reste du temps, je développe mes propres projets, que je dessine, code et mets en ligne moi-même.",
  en: "My original handle is Kaysuto, but everyone calls me Kimiya: it's easier to say. I'm 24 and I've been working in IT for several years. At work, I'm an IT generalist: support, IT assets, network and internal apps. The rest of the time, I build my own projects, which I design, code and ship myself.",
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
    source: {
      fr: "Titre pro assistant web marketing, stage en marketing digital chez Naturopeps",
      en: "Web marketing assistant certification, digital marketing internship at Naturopeps",
    },
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

/** Trois captures en éventail sous la présentation : celles qui suivent le projet phare du hero. */
const APERCUS = projects.filter((projet) => projet.image_url).slice(1, 4)

/** Inclinaison de chaque capture, au repos puis écartée au survol du lien. */
const EVENTAIL = [
  "-rotate-8 -translate-x-12 translate-y-2 group-hover:-rotate-12 group-hover:-translate-x-20",
  "rotate-0 z-10 group-hover:-translate-y-2",
  "rotate-8 translate-x-12 translate-y-2 group-hover:rotate-12 group-hover:translate-x-20",
]
const CARTE_EVENTAIL =
  "absolute inset-0 m-auto aspect-[16/10] w-44 rounded-xl shadow-xl ring-1 ring-border transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"

/** La ligne du parcours se trace de gauche à droite (de haut en bas sur mobile) avant que les étapes n'arrivent. */
const trait: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT } },
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
        {/* Mobile : titre, portrait, puis le texte. Grand écran : le portrait à gauche, le titre et les métiers à droite. */}
        <div className="grid items-start gap-y-8 lg:grid-cols-[22rem_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
          <SectionHeading
            className="mb-0 md:mb-0 lg:col-start-2 lg:mb-8"
            title={t(<>À propos de <span className="text-accent-texte">moi</span></>, <>About <span className="text-accent-texte">me</span></>)}
          />

          <motion.figure
            variants={fadeInUp}
            className="relative mx-auto w-full max-w-xs lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none"
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
            <motion.div variants={fadeInUp} className="mb-10">
              <ParagrapheRevele
                key={langue}
                texte={l(PRESENTATION)}
                className="max-w-[52ch] text-xl font-normal leading-relaxed tracking-tight text-foreground text-pretty md:text-2xl md:leading-[1.45]"
              />
            </motion.div>

            <motion.button
              variants={fadeInUp}
              type="button"
              onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex w-full items-center justify-between gap-8 rounded-sm border-t border-border pt-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>
                <span className="block font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {t("Ce que je construis", "What I build")}
                </span>
                <span className="mt-3 flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground">
                  {t("Voir mes projets", "See my projects")}
                  <ArrowRight className="size-5 text-accent-texte transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
              <span aria-hidden="true" className="relative hidden h-36 w-72 shrink-0 sm:block">
                {APERCUS.map((projet, index) => (
                  <img
                    key={projet.id}
                    src={projet.image_url}
                    alt=""
                    loading="lazy"
                    className={cn(CARTE_EVENTAIL, EVENTAIL[index], "object-cover object-top")}
                  />
                ))}
              </span>
            </motion.button>
          </div>
        </div>

        {/*
          Le parcours, en frise sur toute la largeur : une ligne qui se trace,
          un point par étape. Sur mobile, la frise devient verticale. La
          dernière étape n'est pas finie : son point bat doucement.
        */}
        <motion.div variants={fadeInUp} className="mt-16 md:mt-20">
          <Intitule>{t("Mon parcours", "My background")}</Intitule>
        </motion.div>
        <motion.ol
          variants={staggerContainer}
          className="relative mt-8 grid gap-8 before:absolute before:inset-y-1 before:left-[5px] before:w-px before:bg-border sm:grid-cols-2 sm:before:hidden lg:grid-cols-4 lg:gap-6"
        >
          <motion.span
            aria-hidden="true"
            variants={trait}
            className="absolute inset-x-0 top-[5px] hidden h-px origin-left bg-border sm:block"
          />
          {PARCOURS.map(({ quand, source, acquis }, index) => {
            const enCours = index === PARCOURS.length - 1
            return (
              <motion.li key={source.fr} variants={fadeInUp} className="relative pl-8 sm:pl-0 sm:pt-9">
                <span aria-hidden="true" className="absolute left-0 top-1 grid size-[11px] place-items-center sm:top-0">
                  {enCours && <span className="absolute inset-0 rounded-full bg-accent/60 motion-safe:animate-ping" />}
                  <span className="relative size-[11px] rounded-full bg-accent ring-4 ring-background" />
                </span>
                <p className="font-mono text-xs tabular-nums text-accent-texte">{l(quand)}</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-foreground text-balance md:text-xl">{l(acquis)}</p>
                <p className="mt-1.5 max-w-[32ch] text-sm/relaxed text-muted-foreground text-pretty">{l(source)}</p>
              </motion.li>
            )
          })}
        </motion.ol>
      </motion.div>

      <GitHubModal isOpen={modale === "github"} onClose={() => setModale(null)} />
      <LinkedInFooterModal isOpen={modale === "linkedin"} onClose={() => setModale(null)} />
    </section>
  )
}
