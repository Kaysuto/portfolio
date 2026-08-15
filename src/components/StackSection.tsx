import { useState } from "react"
import { motion } from "framer-motion"
import { Layers, Wrench } from "lucide-react"
import { TechModal } from "@/components/ui/TechModal"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { STRATES, ATELIER, type Tech } from "@/data/stack"

const TOTAL_TECHS =
  STRATES.reduce((total, strate) => total + strate.techs.length, 0) + ATELIER.techs.length

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
      className="flex items-center gap-2 h-9 px-3 bg-background/60 dark:bg-background/40 border border-border rounded-md hover:bg-muted hover:border-accent/40 transition-colors cursor-pointer group"
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

export function StackSection() {
  const [techSelectionnee, setTechSelectionnee] = useState<Tech | null>(null)
  const [estModaleOuverte, setEstModaleOuverte] = useState(false)

  const gererClicTech = (tech: Tech) => {
    setTechSelectionnee(tech)
    setEstModaleOuverte(true)
  }

  return (
    <section id="stack" className="py-24 lg:py-32 px-6 lg:px-12 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          index="02"
          title={<>Ma <span className="text-accent-texte">stack</span></>}
          lead="Une liste de logos ne dit rien de la façon dont on construit. Voici la mienne rangée par profondeur : de l'interface que vous touchez au socle qui la porte."
          className="mb-8"
        />

        <motion.p
          variants={fadeInUp}
          className="mb-12 text-center font-mono text-xs tracking-[0.2em] text-muted-foreground tabular-nums"
        >
          {TOTAL_TECHS} technologies · {STRATES.length} strates · 1 atelier
        </motion.p>

        {/* Les strates du produit, de la surface au socle */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center py-12 border-t border-border/60"
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

            <ol className="space-y-3">
              {STRATES.map((strate, index) => (
                <motion.li
                  key={strate.id}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-lg border border-border bg-input/20 dark:bg-input/30 p-5 md:p-6 text-left transition-colors hover:border-accent/40"
                >
                  {/* Filet de profondeur, sur l'arête gauche de la strate */}
                  <span
                    className={`absolute left-0 inset-y-0 w-0.5 origin-center transition-transform duration-300 scale-y-75 group-hover:scale-y-100 ${FILETS[index]}`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xs font-medium tracking-[0.2em] text-accent-texte">
                      {strate.niveau}
                    </span>
                    <h3 className="text-base font-medium text-foreground tracking-tight">
                      {strate.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">— {strate.role}</span>
                    <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
                      {surDeuxChiffres(strate.techs.length)}
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm/relaxed text-muted-foreground">
                    {strate.resume}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {strate.techs.map((tech) => (
                      <PuceTech key={tech.name} tech={tech} onClic={gererClicTech} />
                    ))}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <p className="mt-10 max-w-2xl text-center text-balance text-base md:text-lg text-muted-foreground leading-relaxed">
            <Layers className="inline size-4 mr-2 -mt-1 text-accent-texte" aria-hidden="true" />
            Je choisis rarement une couche sans comprendre celle d'en dessous : c'est le réflexe que
            m'ont laissé douze ans d'apprentissage en autodidacte.
          </p>
        </motion.div>

        {/* L'atelier : les outils, hors de la pile */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center pt-12 border-t border-border/60"
        >
          <RailLabel>{ATELIER.role}</RailLabel>

          <div className="mt-8 w-full md:pl-24">
            <div className="rounded-lg border border-dashed border-border p-5 md:p-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Wrench className="size-4 text-accent-texte self-center" aria-hidden="true" />
                <h3 className="text-base font-medium text-foreground tracking-tight">
                  {ATELIER.title}
                </h3>
                <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
                  {surDeuxChiffres(ATELIER.techs.length)}
                </span>
              </div>

              <p className="mt-3 max-w-2xl text-sm/relaxed text-muted-foreground">
                {ATELIER.resume}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {ATELIER.techs.map((tech) => (
                  <PuceTech key={tech.name} tech={tech} onClic={gererClicTech} />
                ))}
              </div>
            </div>
          </div>
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
