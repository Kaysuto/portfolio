import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Moon, Sun, type LucideIcon } from "lucide-react"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT, EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { enPosteDeNuit } from "@/lib/horaires"

/*
  La frise ne couvre pas 24 h : les heures de sommeil n'apprennent rien au
  visiteur et écraseraient les deux versants sur une fraction de la largeur.
  Tout est exprimé en minutes depuis minuit, l'après-minuit passant à 24 h + n
  pour que l'axe reste croissant même quand il enjambe la nuit (01:00 = 1500,
  05:00 = 1740).

  Deux emplois du temps, et non un seul : à partir du 14 septembre 2026, le
  poste passe de nuit (21:00 → 05:00) et l'atelier repasse de l'autre côté.
  Écrire un seul jeu d'horaires ferait mentir la page avant ou après cette date,
  et la frise se donne précisément pour mission de dire l'heure juste.

  Ce qui bascule et ce qui ne bascule pas :

    · l'icône suit l'horloge — le versant qui tombe de jour prend le soleil ;
    · la couleur suit l'activité — le parc garde l'ardoise (le froid des yeux
      du personnage, la lumière de bureau), l'atelier garde l'ambre (la lampe,
      l'étincelle des stickers). Les faire suivre l'horloge aurait fait changer
      d'identité les deux panneaux d'un jour à l'autre.
*/

type Moment = {
  id: string
  debut: number
  fin: number
  /** Étiquette sous la frise. `null` pour les segments de transition. */
  label: string | null
  filet: string
  teinte: string
  pastille: string
  /** Sert la légende vivante : la seule phrase du site qui change avec l'heure. */
  etat: string
}

type Versant = {
  /** Doit correspondre à l'`id` du moment associé : c'est ce qui allume la
   *  bordure du panneau à l'heure où l'on y est. */
  id: string
  icon: LucideIcon
  label: string
  horaire: string
  role: string
  lieu: string
  texte: string
  mots: string[]
  filet: string
  teinte: string
  bordureActive: string
  bordureSurvol: string
}

type EmploiDuTemps = {
  /** Bornes de l'axe, en minutes depuis minuit. */
  debut: number
  fin: number
  moments: Moment[]
  versants: Versant[]
}

/** Position d'un instant sur l'axe, en pourcentage de sa largeur. */
const surAxe = (emploi: EmploiDuTemps, minutes: number) =>
  ((minutes - emploi.debut) / (emploi.fin - emploi.debut)) * 100

const PARC = {
  role: "Technicien Informatique Polyvalent",
  lieu: "Magna Engineered Glass Europe",
  texte: "Entre le support aux utilisateurs et l'amélioration des applications internes, je passe sans arrêt du téléphone à l'éditeur.",
  mots: ["Support", "Applis internes", "Parc", "Réseau", "Infra interne"],
  filet: "bg-ardoise/70",
  teinte: "text-ardoise",
  bordureActive: "border-ardoise/55",
  bordureSurvol: "hover:border-ardoise/45",
  etat: "je suis sûrement entre un appel de support et une appli interne à améliorer",
}

const ATELIER = {
  role: "Product Builder",
  lieu: "Projets personnels",
  texte:
    "Mes projets à moi, de l'idée jusqu'au site en ligne. Ici, pas de ticket ni de validation : je fais tout, du design au serveur.",
  mots: ["Design", "Front", "Back", "Déploiement"],
  filet: "bg-accent",
  teinte: "text-accent-texte",
  bordureActive: "border-accent/55",
  bordureSurvol: "hover:border-accent/45",
  etat: "je travaille sur mes projets",
}

/** Jusqu'au 13 septembre 2026 : parc le jour, atelier le soir. */
const POSTE_DE_JOUR: EmploiDuTemps = {
  debut: 6 * 60,
  fin: 25 * 60,
  moments: [
    {
      id: "lever",
      debut: 6 * 60,
      fin: 8 * 60,
      label: null,
      filet: "h-px bg-border",
      teinte: "text-muted-foreground",
      pastille: "bg-muted-foreground",
      etat: "je prends mon poste",
    },
    {
      id: "parc",
      debut: 8 * 60,
      fin: 17 * 60,
      label: "Le parc",
      filet: "h-1 rounded-full bg-ardoise/55",
      teinte: PARC.teinte,
      pastille: "bg-ardoise",
      etat: PARC.etat,
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
      id: "atelier",
      debut: 20 * 60,
      fin: 25 * 60,
      label: "L'atelier",
      filet: "h-1 rounded-full bg-accent",
      teinte: ATELIER.teinte,
      pastille: "bg-accent",
      etat: ATELIER.etat,
    },
  ],
  versants: [
    { id: "parc", icon: Sun, label: "Le jour", horaire: "08:00 — 17:00", ...PARC },
    { id: "atelier", icon: Moon, label: "La nuit", horaire: "20:00 — 01:00", ...ATELIER },
  ],
}

/** À partir du 14 septembre 2026 : atelier l'après-midi, parc la nuit. */
const POSTE_DE_NUIT: EmploiDuTemps = {
  debut: 13 * 60,
  fin: 29 * 60,
  moments: [
    {
      id: "lever",
      debut: 13 * 60,
      fin: 14 * 60,
      label: null,
      filet: "h-px bg-border",
      teinte: "text-muted-foreground",
      pastille: "bg-muted-foreground",
      etat: "je viens de me lever",
    },
    {
      id: "atelier",
      debut: 14 * 60,
      fin: 19 * 60,
      label: "L'atelier",
      filet: "h-1 rounded-full bg-accent",
      teinte: ATELIER.teinte,
      pastille: "bg-accent",
      etat: ATELIER.etat,
    },
    {
      id: "entre-deux",
      debut: 19 * 60,
      fin: 21 * 60,
      label: "L'entre-deux",
      filet: "h-0 border-t border-dashed border-border",
      teinte: "text-muted-foreground",
      pastille: "bg-muted-foreground",
      etat: "j'ai fermé l'éditeur, je n'ai pas encore pris mon poste",
    },
    {
      id: "parc",
      debut: 21 * 60,
      fin: 29 * 60,
      label: "Le parc",
      filet: "h-1 rounded-full bg-ardoise/55",
      teinte: PARC.teinte,
      pastille: "bg-ardoise",
      etat: PARC.etat,
    },
  ],
  versants: [
    { id: "atelier", icon: Sun, label: "Le jour", horaire: "14:00 — 19:00", ...ATELIER },
    { id: "parc", icon: Moon, label: "La nuit", horaire: "21:00 — 05:00", ...PARC },
  ],
}

/**
 * Des règles de travail plutôt que des étiquettes de compétences : « Qualité
 * Code » ou « User First » auraient pu figurer sur n'importe quel portfolio, et
 * la section Stack dit déjà comment je construis.
 *
 * Aucune n'annonce d'où elle vient. Le chapeau de section rattache déjà chaque
 * compétence à son origine, et le hero donne les durées : réattribuer ici
 * (« c'est le réflexe que m'ont laissé trois ans de datacenter ») redisait le
 * repère du hero, et pointait vers un poste que la frise juste au-dessus ne
 * montre pas — elle ne raconte que la journée d'aujourd'hui.
 *
 * Plus de guillemets non plus : en citation, quatre phrases écrites par soi
 * pour soi sonnent comme des slogans d'agence. Énoncées à plat, ce sont des
 * règles.
 */
const REGLES = [
  {
    titre: "Je pars de l'utilisateur",
    texte:
      "Avant d'écrire une ligne, je regarde comment les gens se servent vraiment de l'outil. Le support m'a appris que le problème n'est presque jamais celui qu'on me décrit.",
  },
  {
    titre: "Simple, mais qui marche",
    texte:
      "Je préfère livrer une petite version qui tient debout qu'une grosse qui reste en chantier. Les ajouts viennent après, pas avant.",
  },
  {
    titre: "Une panne, je veux la voir avant vous",
    texte:
      "Logs, sauvegardes, alertes. Si j'apprends qu'un service est tombé parce qu'on m'appelle, c'est que j'ai mal fait mon travail.",
  },
  {
    titre: "L'IA m'aide, c'est moi qui signe",
    texte:
      "Je m'en sers tous les jours pour aller plus vite. Mais ce qui part en production, je l'ai relu et je sais l'expliquer.",
  },
]

/**
 * L'heure qu'il est chez moi, rafraîchie chaque minute, et l'emploi du temps en
 * vigueur ce jour-là. Le fuseau est forcé à Paris : la frise raconte ma journée,
 * pas celle du visiteur. Les deux sortent de la même horloge, donc une page
 * laissée ouverte pendant la nuit du 13 au 14 septembre bascule d'elle-même.
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
  const emploi = enPosteDeNuit(maintenant) ? POSTE_DE_NUIT : POSTE_DE_JOUR

  return { texte, depuisMinuit, emploi }
}

/**
 * La frise de la journée : quatre segments proportionnels à leur durée, et un
 * repère posé sur l'heure réelle. Elle est décorative (le contenu vit dans les
 * deux panneaux et dans la légende), donc masquée sous `md` où les segments
 * seraient trop courts pour être lus.
 */
function FriseJournee({
  emploi,
  position,
  momentActif,
}: {
  emploi: EmploiDuTemps
  position: number | null
  momentActif: string | null
}) {
  const mouvementReduit = useReducedMotion()

  // Le repère d'heure prend la couleur du versant qu'il traverse : ardoise sur
  // le parc, ambre sur l'atelier. Une pastille d'une seule couleur aurait
  // contredit le segment sous elle la moitié de la journée.
  const pastille = emploi.moments.find(({ id }) => id === momentActif)?.pastille ?? "bg-muted-foreground"

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
          {emploi.moments.map(({ id, debut, fin, filet }, index) => (
            <motion.span
              key={id}
              className={cn("absolute top-1/2 -translate-y-1/2 origin-left", filet)}
              style={{
                left: `${surAxe(emploi, debut)}%`,
                width: `${surAxe(emploi, fin) - surAxe(emploi, debut)}%`,
              }}
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
          {emploi.moments.filter(({ label }) => label).map(({ id, debut, fin, label, teinte }) => (
            <span
              key={id}
              className={cn(
                "absolute -translate-x-1/2 whitespace-nowrap font-mono text-xs tracking-[0.15em] transition-colors",
                id === momentActif ? teinte : "text-muted-foreground"
              )}
              style={{ left: `${surAxe(emploi, (debut + fin) / 2)}%` }}
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
  const { texte: heure, depuisMinuit, emploi } = useHeureLocale()

  // Après minuit, l'heure repasse à 0 alors que la journée, elle, continue.
  const surLaJournee = depuisMinuit < emploi.debut ? depuisMinuit + 24 * 60 : depuisMinuit
  const moment =
    emploi.moments.find(({ debut, fin }) => surLaJournee >= debut && surLaJournee < fin) ?? null

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
          lead="Chaque compétence a son histoire. Mon bac pro d'électrotechnique m'a mené aux objets connectés, mon titre d'assistant web marketing au référencement et à l'animation de communauté, et le datacenter m'a appris les systèmes et les réseaux. Le développement fullstack, lui, je l'ai appris seul."
        />

        {/* La journée : la frise donne le rythme, les panneaux donnent le fond */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center py-12 border-t border-border/60"
        >
          <RailLabel>Une journée en deux temps</RailLabel>

          <FriseJournee
            emploi={emploi}
            position={surLaJournee <= emploi.fin ? surAxe(emploi, surLaJournee) : null}
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
            {emploi.versants.map(({ id, icon: Icone, label, horaire, role, lieu, texte, mots, filet, teinte, bordureActive, bordureSurvol }) => (
              <motion.article
                key={id}
                variants={fadeInUp}
                className={cn(
                  "group relative overflow-hidden rounded-lg border bg-[color-mix(in_oklch,var(--input),var(--background)_80%)] dark:bg-[color-mix(in_oklch,var(--input),var(--background)_70%)] p-6 text-left transition-colors",
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
                      className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {mot}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Les règles : un index numéroté, une entrée par filet */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center pt-12 border-t border-border/60"
        >
          <RailLabel>Mes règles de travail</RailLabel>

          <ul className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8 w-full max-w-4xl">
            {REGLES.map(({ titre, texte }, index) => (
              <motion.li
                key={titre}
                variants={fadeInUp}
                className="group border-t border-border/60 pt-5 text-left transition-colors hover:border-accent/50"
              >
                <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums transition-colors group-hover:text-accent-texte">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 text-base md:text-lg font-medium text-foreground tracking-tight text-balance group-hover:text-accent-texte transition-colors">
                  {titre}
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
