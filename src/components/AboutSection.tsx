import { motion } from "framer-motion"
import { Brain, Code, Heart, Moon, Server, Sun } from "lucide-react"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"

/**
 * Les deux versants du parcours, présentés face à face. « Technicien le jour,
 * Product Builder la nuit » est la colonne vertébrale de tout le site : elle
 * mérite une structure, pas un paragraphe où elle se noie.
 */
const VERSANTS = [
  {
    id: "jour",
    icon: Sun,
    label: "Le jour",
    role: "Technicien Informatique Polyvalent",
    lieu: "Magna Engineered Glass Europe",
    texte:
      "Après 3 ans en datacenter : gestion du parc, support utilisateurs, administration réseau et maintenance de l'infrastructure interne.",
  },
  {
    id: "nuit",
    icon: Moon,
    label: "La nuit",
    role: "Product Builder",
    lieu: "Projets personnels",
    texte:
      "Je construis des applications web, j'explore l'IA et je crée des expériences digitales de bout en bout.",
  },
]

const COMPETENCES = [
  {
    icon: Server,
    title: "Expertise Infra",
    description: "Rigueur, sécurité et haute disponibilité héritées de mon parcours en datacenter.",
  },
  {
    icon: Brain,
    title: "Modèles LLM",
    description: "Exploration et intégration de l'IA pour créer des applications intelligentes.",
  },
  {
    icon: Code,
    title: "Qualité Code",
    description: "Architecture propre et standards d'excellence pour des projets pérennes.",
  },
  {
    icon: Heart,
    title: "User First",
    description: "Conception d'interfaces intuitives centrées sur l'expérience utilisateur.",
  },
]

export function AboutSection() {
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
          lead="Technicien Informatique le jour, Product Builder la nuit, avec plus de 12 ans de passion autodidacte pour la tech."
        />

        {/* Parcours : les deux versants, puis ce qu'ils produisent ensemble */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center py-12 border-t border-border/60"
        >
          <RailLabel>Mon parcours</RailLabel>

          {/*
            Le corps de texte passe à gauche à l'intérieur de chaque panneau :
            centré, il redevenait illisible dès la deuxième ligne. La symétrie
            des deux colonnes garde le bloc centré à l'échelle de la section.
          */}
          <div className="mt-8 grid md:grid-cols-2 gap-4 w-full max-w-4xl">
            {VERSANTS.map(({ id, icon: Icone, label, role, lieu, texte }) => (
              <motion.article
                key={id}
                variants={fadeInUp}
                className="rounded-lg border border-border bg-input/20 dark:bg-input/30 p-6 text-left"
              >
                <div className="flex items-center gap-2">
                  <Icone className="size-4 text-accent-texte" aria-hidden="true" />
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">
                    {label}
                  </h3>
                </div>

                <p className="mt-5 text-base font-medium text-foreground tracking-tight">{role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{lieu}</p>
                <p className="mt-4 text-sm/relaxed text-muted-foreground">{texte}</p>
              </motion.article>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-center text-balance text-base md:text-lg text-muted-foreground leading-relaxed">
            Cette double vie m'a forgé une vision à 360° : de l'infrastructure matérielle au
            produit logiciel.
          </p>
        </motion.div>

        {/* Compétences : un index éditorial, une entrée par filet */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center pt-12 border-t border-border/60"
        >
          <RailLabel>Ce que j'apporte</RailLabel>

          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 w-full">
            {COMPETENCES.map(({ icon: Icone, title, description }, index) => (
              <motion.li
                key={title}
                variants={fadeInUp}
                className="group border-t border-border/60 pt-5 text-left transition-colors hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <Icone className="size-5 text-accent-texte" aria-hidden="true" />
                  <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-medium text-foreground group-hover:text-accent-texte transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-sm/relaxed text-muted-foreground">{description}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
