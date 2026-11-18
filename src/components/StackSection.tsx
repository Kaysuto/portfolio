import { useState } from "react"
import { motion } from "framer-motion"
import { Layers } from "lucide-react"
import { TechModal } from "@/components/ui/TechModal"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { STRATES, ATELIER, type Strate, type Tech } from "@/data/stack"

const TOTAL_TECHNOS = STRATES.reduce((total, strate) => total + strate.techs.length, 0)

/** Les chiffres de la section, en pastilles plutôt qu'en ligne de code. */
const CHIFFRES = [
  { valeur: TOTAL_TECHNOS, libelle: "technologies" },
  { valeur: STRATES.length, libelle: "couches" },
  { valeur: ATELIER.techs.length, libelle: "outils au quotidien" },
]

/**
 * Intensité du filet de gauche : la couche de surface l'a discret, le socle
 * l'a franc. C'est le seul signal de profondeur qui ne coûte ni indentation ni
 * variation de fond — deux choses qui auraient cassé l'alignement des puces.
 */
const FILETS = ["bg-accent/30", "bg-accent/60", "bg-accent"]

/** Deux chiffres, comme les numéros de section : « 07 » et non « 7 ». */
const surDeuxChiffres = (n: number) => String(n).padStart(2, "0")

/**
 * Puce d'une technologie. Cliquable : la modale rappelle le nom et l'URL avant
 * d'envoyer l'internaute hors du site.
 */
function PuceTech({ tech, onClic }: { tech: Tech; onClic: (tech: Tech) => void }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onClic(tech)}
      className="flex items-center gap-2 h-9 px-3 bg-background border border-border rounded-md hover:bg-muted hover:border-accent/40 transition-colors cursor-pointer group"
    >
      <img
        src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}`}
        alt=""
        aria-hidden="true"
        className="size-4 grayscale group-hover:grayscale-0 transition-all object-contain"
      />
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {tech.name}
      </span>
    </motion.button>
  )
}

const TOUTES_TECHS = [...STRATES.flatMap((strate) => strate.techs), ...ATELIER.techs]

/**
 * Bande de logos qui défile sans fin : un aperçu de toute la stack d'un coup
 * d'œil, avant le détail par strate. Purement décorative (les mêmes techs sont
 * cliquables plus bas), donc masquée aux technologies d'assistance.
 */
function BandeTechs() {
  return (
    <div
      aria-hidden="true"
      className="bande relative -mx-6 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] lg:-mx-12"
    >
      <div className="bande-defilante flex w-max gap-3">
        {[...TOUTES_TECHS, ...TOUTES_TECHS].map((tech, index) => (
          <span
            key={index}
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
          >
            <img
              src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}`}
              alt=""
              loading="lazy"
              className="size-4 object-contain"
            />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Une strate de la pile. Sur grand écran, chacune se colle un cran plus bas que
 * la précédente : la pile grandit vers le bas, et la ligne de titre de chaque
 * strate déjà posée reste visible au-dessus de la suivante, comme des onglets.
 * Sur mobile, les strates sont trop hautes pour rester collées : elles
 * s'enchaînent à plat.
 */
function CarteStrate({ strate, index, onClic }: { strate: Strate; index: number; onClic: (tech: Tech) => void }) {
  return (
    <motion.li
      variants={fadeInUp}
      style={{ top: `calc(7rem + ${index * 4.5}rem)` }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-left shadow-[0_-12px_40px_-24px_color-mix(in_oklch,var(--foreground)_35%,transparent)] transition-colors hover:border-accent/40 md:sticky md:p-8 md:not-last:mb-10"
    >
      {/* Filet de profondeur, sur l'arête gauche de la strate */}
      <span
        className={`absolute left-0 inset-y-0 w-0.5 origin-center transition-transform duration-300 scale-y-75 group-hover:scale-y-100 ${FILETS[index]}`}
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-accent-texte">{strate.niveau}</span>
        <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{strate.title}</h3>
        <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
          {surDeuxChiffres(strate.techs.length)}
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-sm/relaxed text-muted-foreground md:text-base/relaxed">{strate.resume}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {strate.techs.map((tech) => (
          <PuceTech key={tech.name} tech={tech} onClic={onClic} />
        ))}
      </div>
    </motion.li>
  )
}

export function StackSection() {

  const [techSelectionnee, setTechSelectionnee] = useState<Tech | null>(null)
  const [estModaleOuverte, setEstModaleOuverte] = useState(false)

  const gererClicTech = (tech: Tech) => {
    setTechSelectionnee(tech)
    setEstModaleOuverte(true)
  }

  return (
    <section id="stack" className="py-10 lg:py-14 px-6 lg:px-12 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          title={<>Ma <span className="text-accent-texte">stack</span></>}
          lead="Ce avec quoi je travaille, rangé par couche, du front jusqu'à l'infrastructure."
          className="mb-8"
        />

        <motion.ul variants={fadeInUp} className="mb-8 flex flex-wrap gap-2">
          {CHIFFRES.map(({ valeur, libelle }) => (
            <li
              key={libelle}
              className="flex items-baseline gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
            >
              <span className="text-base font-semibold tabular-nums text-foreground">{valeur}</span>
              {libelle}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeInUp} className="mb-10">
          <BandeTechs />
        </motion.div>

        {/* Les strates du produit, de la surface au socle */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-start py-10 border-t border-border/60"
        >
          <RailLabel>De la surface au socle</RailLabel>

          {/*
            L'axe de profondeur vit dans une gouttière de 6 rem à gauche : le
            faire courir entre les strates aurait décalé les puces d'autant.
            Sous `md`, la gouttière disparaît et les repères « L1/L2/L3 »
            portés par chaque strate suffisent à donner l'ordre.
          */}
          <div className="relative mt-10 w-full md:pl-24">
            <div
              className="hidden md:flex absolute left-0 inset-y-0 w-24 flex-col items-end pr-6"
              aria-hidden="true"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Surface
              </span>
              <span className="my-3 w-px flex-1 bg-linear-to-b from-border to-accent/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Socle
              </span>
            </div>

            {/* Le pseudo-élément final laisse à la pile complète le temps d'être vue avant de repartir. */}
            <ol className="space-y-4 md:space-y-0 md:after:block md:after:h-[10vh]">
              {STRATES.map((strate, index) => (
                <CarteStrate
                  key={strate.id}
                  strate={strate}
                  index={index}
                  onClic={gererClicTech}
                />
              ))}
            </ol>
          </div>

          <p className="mt-10 max-w-2xl text-balance text-base md:text-lg text-muted-foreground leading-relaxed">
            <Layers className="inline size-4 mr-2 -mt-1 text-accent-texte" aria-hidden="true" />
            J'aime comprendre la couche du dessous avant de choisir celle du dessus. Les serveurs,
            je ne les connais pas que dans le cloud : j'en ai installé et réparé de mes mains.
          </p>
        </motion.div>

        {/* L'atelier : les outils, hors de la pile */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-start pt-10 border-t border-border/60"
        >
          <RailLabel>{ATELIER.role}</RailLabel>

          <p className="mt-4 max-w-2xl text-sm/relaxed text-muted-foreground md:text-base/relaxed">{ATELIER.resume}</p>

          {/* Une grille d'outils plutôt qu'une carte de plus : chaque outil a sa case. */}
          <ul className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {ATELIER.techs.map((tech) => (
              <motion.li key={tech.name} variants={fadeInUp}>
                <button
                  type="button"
                  onClick={() => gererClicTech(tech)}
                  className="group flex w-full flex-col items-start gap-6 rounded-xl border border-border bg-card p-4 text-left transition-[border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={`size-6 object-contain opacity-80 grayscale transition-[filter,opacity] group-hover:opacity-100 group-hover:filter-none ${
                      // Les logos Simple Icons sont des silhouettes : en sombre, on les passe en blanc pour que les marques noires (GitHub, OBS) restent visibles. Les images matricielles, elles, ont leur propre fond.
                      tech.iconUrl ? "" : "dark:brightness-0 dark:invert"
                    }`}
                  />
                  <span className="text-sm font-medium text-foreground">{tech.name}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <TechModal
        isOpen={estModaleOuverte && !!techSelectionnee}
        onClose={() => {
          setEstModaleOuverte(false)
          setTimeout(() => setTechSelectionnee(null), 500)
        }}
        techName={techSelectionnee?.name ?? ""}
        techUrl={techSelectionnee?.url ?? ""}
        techIcon={techSelectionnee?.slug ?? ""}
        iconUrl={techSelectionnee?.iconUrl}
      />
    </section>
  )
}
