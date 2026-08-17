import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT, EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

/*
  L'axe de la frise ne couvre pas 24 h mais 06:00 → 01:00 : les heures de
  sommeil n'apprennent rien au visiteur et écraseraient les deux versants sur
  la moitié de la largeur. Tout est exprimé en minutes depuis minuit, l'après
  minuit passant à 24 h + n (01:00 = 1500) pour rester croissant.
*/
const AXE_DEBUT = 6 * 60
const AXE_FIN = 25 * 60
const AXE_DUREE = AXE_FIN - AXE_DEBUT

/** Position d'un instant sur l'axe, en pourcentage de sa largeur. */
const surAxe = (minutes: number) => ((minutes - AXE_DEBUT) / AXE_DUREE) * 100

/*
  Les deux versants n'ont pas la même couleur, et c'est le seul endroit du site
  où la palette se dédouble. Le jour prend l'ardoise — le froid des yeux du
  personnage, la lumière de bureau du parc informatique ; la nuit prend l'ambre
  — l'étincelle des stickers, la lampe de l'atelier. Avant, les deux versants
  partageaient l'accent à deux opacités près : la frise se lisait comme un
  dégradé, pas comme deux métiers.
*/

/**
 * Le découpage d'une journée. `etat` sert la légende vivante sous la frise :
 * c'est la seule phrase du site qui change selon l'heure qu'il est ici.
 */
const MOMENTS = [
  {
    id: "aube",
    debut: 6 * 60,
    fin: 8 * 60,
    label: null,
    filet: "h-px bg-border",
    teinte: "text-muted-foreground",
    pastille: "bg-muted-foreground",
    etat: "je prends mon poste",
  },
  {
    id: "jour",
    debut: 8 * 60,
    fin: 17 * 60,
    label: "Le parc",
    filet: "h-1 rounded-full bg-ardoise/55",
    teinte: "text-ardoise",
    pastille: "bg-ardoise",
    etat: "je suis quelque part entre un switch et un poste à remonter",
  },
  {
    id: "entre-deux",
    debut: 17 * 60,
    fin: 20 * 60,
    label: "L'entre-deux",
    filet: "h-0 border-t border-dashed border-border",
    teinte: "text-muted-foreground",
    pastille: "bg-muted-foreground",
    etat: "j'ai fermé la baie, je n'ai pas encore ouvert l'éditeur",
  },
  {
    id: "nuit",
    debut: 20 * 60,
    fin: 25 * 60,
    label: "L'atelier",
    filet: "h-1 rounded-full bg-accent",
    teinte: "text-accent-texte",
    pastille: "bg-accent",
    etat: "l'atelier est ouvert",
  },
]

/**
 * Les deux versants du parcours. Ils portent seuls l'idée « technicien le
 * jour, builder la nuit » : le chapeau de section et la conclusion la
 * répétaient mot pour mot, ils parlent d'autre chose depuis.
 */
const VERSANTS = [
  {
    id: "jour",
    icon: Sun,
    label: "Le jour",
    horaire: "08:00 — 17:00",
    role: "Technicien Informatique Polyvalent",
    lieu: "Magna Engineered Glass Europe",
    texte:
      "Un métier où la réussite se mesure aux journées pendant lesquelles personne n'appelle.",
    mots: ["Parc", "Réseau", "Support", "Infra interne"],
    filet: "bg-ardoise/70",
    teinte: "text-ardoise",
    bordureActive: "border-ardoise/55",
    bordureSurvol: "hover:border-ardoise/45",
  },
  {
    id: "nuit",
    icon: Moon,
    label: "La nuit",
    horaire: "20:00 — 01:00",
    role: "Product Builder",
    lieu: "Projets personnels",
    texte:
      "Le moment où je décide de tout : la maquette, le code, la mise en ligne. Personne à qui déléguer, donc rien à survoler.",
    mots: ["Design", "Front", "Back", "Déploiement", "IA"],
    filet: "bg-accent",
    teinte: "text-accent-texte",
    bordureActive: "border-accent/55",
    bordureSurvol: "hover:border-accent/45",
  },
]

/**
 * Des maximes plutôt que des étiquettes de compétences : « Qualité Code » ou
 * « User First » auraient pu figurer sur n'importe quel portfolio, et la
 * section Stack dit déjà comment je construis. Ici, ce sont les habitudes que
 * les deux versants m'ont laissées.
 */
const REFLEXES = [
  {
    maxime: "Ça doit tenir sans moi",
    texte:
      "Sauvegardes, journaux, reprise après incident : c'est le réflexe que m'ont laissé trois ans d'exploitation en datacenter. Un service qu'il faut relancer à la main n'est pas fini.",
  },
  {
    maxime: "L'utilisateur, je l'ai eu au téléphone",
    texte:
      "Le support m'a montré très vite ce que produit une interface mal fichue : un appel. Depuis, je dessine mes écrans pour éviter cet appel.",
  },
  {
    maxime: "Fini veut dire en ligne",
    texte:
      "Un projet qui ne tourne que sur ma machine ne compte pas. Nom de domaine, mise en ligne, mises à jour : tant que ce n'est pas en production, c'est une maquette.",
  },
  {
    maxime: "L'IA écrit vite, je relis lentement",
    texte:
      "Je m'en sers comme copilote, jamais comme pilote. Ce qui part en production, je dois pouvoir l'expliquer ligne à ligne.",
  },
]

/**
 * L'heure qu'il est chez moi, rafraîchie chaque minute. Le fuseau est forcé à
 * Paris : la frise raconte ma journée, pas celle du visiteur.
 */
function useHeureLocale() {
  const [maintenant, setMaintenant] = useState(() => new Date())

  useEffect(() => {
    const minuteur = setInterval(() => setMaintenant(new Date()), 60_000)
    return () => clearInterval(minuteur)
  }, [])

  const texte = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(maintenant)

  const [heures, minutes] = texte.split(":").map(Number)
  const depuisMinuit = heures * 60 + minutes

  return { texte, depuisMinuit }
}

/**
 * La frise de la journée : quatre segments proportionnels à leur durée, et un
 * repère posé sur l'heure réelle. Elle est décorative (le contenu vit dans les
 * deux panneaux et dans la légende), donc masquée sous `md` où les segments
 * seraient trop courts pour être lus.
 */
function FriseJournee({ position, momentActif }: { position: number | null; momentActif: string | null }) {
  const mouvementReduit = useReducedMotion()

  // Le repère d'heure prend la couleur du versant qu'il traverse : ardoise sur
  // le parc, ambre sur l'atelier. Une pastille d'une seule couleur aurait
  // contredit le segment sous elle la moitié de la journée.
  const pastille = MOMENTS.find(({ id }) => id === momentActif)?.pastille ?? "bg-muted-foreground"

  return (
    <div className="hidden md:flex mt-10 w-full max-w-4xl items-center gap-4" aria-hidden="true">
      <Sun className="size-4 shrink-0 text-muted-foreground" />

      <div className="flex-1">
        {/*
          Segments et étiquettes sont positionnés en pourcentage plutôt qu'en
          `flex-grow` : c'est la seule façon que le repère d'heure tombe
          exactement sur la frontière qu'il désigne, sans dérive due aux
          gouttières.
        */}
        <div className="relative h-4">
          {MOMENTS.map(({ id, debut, fin, filet }, index) => (
            <motion.span
              key={id}
              className={cn("absolute top-1/2 -translate-y-1/2 origin-left", filet)}
              style={{ left: `${surAxe(debut)}%`, width: `${surAxe(fin) - surAxe(debut)}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + index * 0.08 }}
            />
          ))}

          {position !== null && (
            <motion.span
              className={cn(
                "absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full ring-4 ring-background transition-colors",
                pastille
              )}
              style={{ left: `${position}%` }}
              animate={mouvementReduit ? undefined : { scale: [1, 1.3, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        <div className="relative mt-3 h-4">
          {MOMENTS.filter(({ label }) => label).map(({ id, debut, fin, label, teinte }) => (
            <span
              key={id}
              className={cn(
                "absolute -translate-x-1/2 whitespace-nowrap font-mono text-xs tracking-[0.15em] transition-colors",
                id === momentActif ? teinte : "text-muted-foreground"
              )}
              style={{ left: `${surAxe((debut + fin) / 2)}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <Moon className="size-4 shrink-0 text-muted-foreground" />
    </div>
  )
}

export function AboutSection() {
  const { texte: heure, depuisMinuit } = useHeureLocale()

  // Après minuit, l'heure repasse à 0 alors que la journée, elle, continue.
  const surLaJournee = depuisMinuit < AXE_DEBUT ? depuisMinuit + 24 * 60 : depuisMinuit
  const moment = MOMENTS.find(({ debut, fin }) => surLaJournee >= debut && surLaJournee < fin) ?? null

  return (
    <section id="apropos" className="py-24 lg:py-32 px-6 lg:px-12 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          index="01"
          title={<>À propos de <span className="text-accent-texte">moi</span></>}
          lead="Je n'ai pas appris la tech à l'école. J'ai commencé par démonter des machines qui marchaient très bien avant que j'y touche — les réseaux, le code et les serveurs sont venus en réparant ce que j'avais cassé."
        />

        {/* La journée : la frise donne le rythme, les panneaux donnent le fond */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center py-12 border-t border-border/60"
        >
          <RailLabel>Une journée en deux temps</RailLabel>

          <FriseJournee
            position={surLaJournee <= AXE_FIN ? surAxe(surLaJournee) : null}
            momentActif={moment?.id ?? null}
          />

          {/*
            La légende est le seul endroit où les heures et la frise se
            rejoignent en toutes lettres : elle reste donc lisible sous `md`,
            là où la frise disparaît.
          */}
          <p className="mt-8 text-center font-mono text-xs text-muted-foreground tabular-nums">
            Il est <span className="text-accent-texte">{heure}</span> chez moi
            {moment ? ` : ${moment.etat}` : " : je dors, en principe"}.
          </p>

          {/*
            Le corps de texte reste aligné à gauche dans chaque panneau :
            centré, il redevenait illisible dès la deuxième ligne. La symétrie
            des deux colonnes garde le bloc centré à l'échelle de la section.
          */}
          <div className="mt-10 grid md:grid-cols-2 gap-4 w-full max-w-4xl">
            {VERSANTS.map(({ id, icon: Icone, label, horaire, role, lieu, texte, mots, filet, teinte, bordureActive, bordureSurvol }) => (
              <motion.article
                key={id}
                variants={fadeInUp}
                className={cn(
                  "group relative overflow-hidden rounded-lg border bg-input/20 dark:bg-input/30 p-6 text-left transition-colors",
                  id === moment?.id ? bordureActive : cn("border-border", bordureSurvol)
                )}
              >
                {/* Le filet reprend l'intensité du segment correspondant sur la frise */}
                <span
                  className={cn(
                    "absolute left-0 inset-y-0 w-0.5 origin-center transition-transform duration-300",
                    id === moment?.id ? "scale-y-100" : "scale-y-75 group-hover:scale-y-100",
                    filet
                  )}
                  aria-hidden="true"
                />

                <div className="flex items-center gap-2">
                  <Icone className={cn("size-4", teinte)} aria-hidden="true" />
                  <h3 className={cn("font-mono text-xs font-medium uppercase tracking-[0.2em]", teinte)}>
                    {label}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
                    {horaire}
                  </span>
                </div>

                <p className="mt-5 text-base font-medium text-foreground tracking-tight">{role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{lieu}</p>
                <p className="mt-4 text-sm/relaxed text-muted-foreground">{texte}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {mots.map((mot) => (
                    <li
                      key={mot}
                      className="rounded-md border border-border bg-background/60 dark:bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {mot}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Ce qu'il en reste : un index de maximes, une entrée par filet */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center pt-12 border-t border-border/60"
        >
          <RailLabel>Ce que ça m'a appris</RailLabel>

          <ul className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8 w-full max-w-4xl">
            {REFLEXES.map(({ maxime, texte }, index) => (
              <motion.li
                key={maxime}
                variants={fadeInUp}
                className="group border-t border-border/60 pt-5 text-left transition-colors hover:border-accent/50"
              >
                <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums transition-colors group-hover:text-accent-texte">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 text-base md:text-lg font-medium text-foreground tracking-tight text-balance group-hover:text-accent-texte transition-colors">
                  «&nbsp;{maxime}&nbsp;»
                </h3>
                <p className="mt-3 text-sm/relaxed text-muted-foreground">{texte}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
