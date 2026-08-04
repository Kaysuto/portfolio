import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Wrench,
  MapPin,
  Car,
  ExternalLink,
  CheckCircle2,
  Globe,
  Layout as LayoutIcon,
  Database,
  ShieldCheck,
  KeyRound,
  Palette,
  Cherry,
  Cpu,
  PenTool,
  Gamepad2,
  Radio,
  Headset,
  Dumbbell
} from 'lucide-react';
import { LinkedinLogo as Linkedin } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { TechModal } from '@/components/ui/TechModal';
import { useSeo } from '@/hooks/useSeo';
import { LinkedInFooterModal } from '@/components/ui/SocialModals';
import { fadeInUp, staggerContainer, VIEWPORT } from '@/lib/animations';

type Outil = { name: string; slug: string; url: string; iconUrl?: string };

const EXPERIENCES = [
  {
    company: "Magna Engineered Glass Europe",
    role: "Technicien Informatique Polyvalent Junior",
    period: "2026 - Présent",
    missions: [
      "Gestion du parc informatique",
      "Support utilisateurs",
      "Administration réseau",
      "Maintenance de l'infrastructure interne",
      "Développement des applications internes"
    ]
  },
  {
    company: "Experis France & Exaion",
    role: "Technicien Data Center",
    period: "Février 2023 - Février 2026",
    missions: [
      "Chargé de la gestion opérationnelle d'un data center (installation, câblage, maintenance)",
      "Pilotage de l'approvisionnement réseau multi-équipes"
    ]
  },
  {
    company: "France Travail",
    role: "Conseiller numérique",
    period: "Août 2022 - Janvier 2023",
    missions: [
      "Accueil et assistance des demandeurs d'emploi",
      "Relance de rendez-vous",
      "Traitement administratif",
      "Utilisation des outils numériques",
      "Animation d'ateliers professionnels"
    ]
  },
  {
    company: "ESCCI et NaturOPeps",
    role: "Assistant Web Marketing",
    period: "Août 2021 - Juin 2022",
    missions: [
      "Analyse et refonte de la stratégie digitale",
      "Optimisation du contenu (SEO/SEA)",
      "Mise en place d'outils de suivi de performance",
      "Réalisation d'études stratégiques"
    ]
  },
  {
    company: "Varenne Gastronomie",
    role: "Magasinier",
    period: "Août 2020 - Octobre 2020",
    missions: [
      "Chargement de marchandises",
      "Réception de commandes",
      "Contrôle qualité et stockage des produits"
    ]
  },
  {
    company: "Ayonis, fabricant de métrologie",
    role: "Électricien",
    period: "Novembre 2019 - Décembre 2019",
    missions: [
      "Installation et connexion d'équipements électriques",
      "Réparations",
      "Lecture et création de dossiers d'installation, de maintenance et de mise en service"
    ]
  }
];

const COMPETENCES = [
  { category: "Systèmes", items: ["Windows", "MacOS", "Linux", "Cloud (AWS, Azure)"], icon: Globe },
  { category: "Réseaux", items: ["Administration serveurs", "Sécurité", "Architecture"], icon: Database },
  { category: "Web Marketing", items: ["SEO/SEA", "Analytics", "Réseaux sociaux"], icon: LayoutIcon },
  { category: "Outils", items: ["Bases de données SQL", "Gestion de projet", "Montage vidéo"], icon: Wrench }
];

const OUTILS: Outil[] = [
  { name: "React", slug: "react", url: "https://react.dev" },
  { name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org" },
  { name: "Next.js", slug: "nextdotjs", url: "https://nextjs.org" },
  { name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org" },
  { name: "Tailwind CSS", slug: "tailwindcss", url: "https://tailwindcss.com" },
  { name: "Docker", slug: "docker", url: "https://www.docker.com" },
  { name: "Nginx", slug: "nginx", url: "https://nginx.org" },
  { name: "Visual Studio Code", slug: "visualstudiocode", url: "https://code.visualstudio.com", iconUrl: "https://i.imgur.com/bMFlLET.png" },
];

const FORMATIONS = [
  { annee: "2022", intitule: "Titre professionnel (BAC+2) d'Assistant Web Marketing" },
  { annee: "2020", intitule: "BEP & BAC PRO Électrotechnique (MELEC)" },
];

const INTERETS = [
  { name: "Cryptographie", icon: KeyRound },
  { name: "Design", icon: Palette },
  { name: "Culture Japonaise", icon: Cherry },
  { name: "Cloud/Technologie", icon: Cpu },
  { name: "Création de contenu", icon: PenTool },
  { name: "Jeux Vidéos", icon: Gamepad2 },
  { name: "Streaming", icon: Radio },
  { name: "Réalité Virtuelle", icon: Headset },
  { name: "Sport", icon: Dumbbell }
];

/** Bande de section : étiquette collante à gauche, contenu à droite. */
function Bande({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="flex flex-col items-center py-12 border-t border-border/60"
    >
      <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground text-center">
        {label}
      </h2>
      <div className="mt-8 w-full max-w-3xl">{children}</div>
    </motion.section>
  );
}

const CVPage: React.FC = () => {
  useSeo({
    title: "Kimiya - CV",
    description: "CV de Kimiya : Technicien Informatique Polyvalent Junior, expert infrastructure, réseau et développement web full-stack.",
    path: "/cv",
    type: "profile",
  });

  const [estModaleLinkedinOuverte, setEstModaleLinkedinOuverte] = useState(false);
  const [outilSelectionne, setOutilSelectionne] = useState<Outil | null>(null);
  const [estModaleOutilOuverte, setEstModaleOutilOuverte] = useState(false);

  const ouvrirOutil = (outil: Outil) => {
    setOutilSelectionne(outil);
    setEstModaleOutilOuverte(true);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <main className="flex-1 py-24 md:py-32 px-6 lg:px-12 relative z-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button variant="ghost" className="mb-10 text-muted-foreground hover:text-accent-texte">
                <ArrowLeft />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>

          {/* Bandeau d'en-tête pleine largeur */}
          <motion.header
            className="pb-10 border-b border-border/60 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-accent-texte mb-4">
              Curriculum vitæ
            </p>
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-semibold mb-6">
                  Mon <span className="text-accent-texte">CV</span>
                </h1>
                <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Briefcase className="size-3.5 text-accent-texte" aria-hidden="true" />
                    <span>Technicien Informatique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-accent-texte" aria-hidden="true" />
                    <span>France</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Car className="size-3.5 text-accent-texte" aria-hidden="true" />
                    <span>Permis B &amp; Véhiculé</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setEstModaleLinkedinOuverte(true)}
                size="lg"
                className="shrink-0"
              >
                <Linkedin aria-hidden="true" />
                Me contacter sur LinkedIn
              </Button>
            </div>
          </motion.header>

          {/* ── Parcours professionnel : frise verticale ────────────────────── */}
          <Bande label="Parcours Professionnel">
            <ol className="relative border-l border-border/60 ml-2 text-left">
              {EXPERIENCES.map((experience) => (
                <motion.li key={`${experience.company}-${experience.period}`} variants={fadeInUp} className="relative pl-8 pb-10 last:pb-0">
                  <motion.span
                    className="absolute -left-[5px] top-1.5 size-2 rounded-full bg-accent ring-4 ring-background"
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  />
                  <p className="font-mono text-[10px] font-medium text-accent-texte mb-2">{experience.period}</p>
                  <h3 className="text-base font-medium text-foreground tracking-tight">{experience.role}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{experience.company}</p>
                  <ul className="space-y-2">
                    {experience.missions.map((mission) => (
                      <li key={mission} className="flex items-start gap-3 text-xs/relaxed text-muted-foreground">
                        <CheckCircle2 className="size-3.5 text-accent-texte/50 mt-1 shrink-0" aria-hidden="true" />
                        <span className="leading-relaxed">{mission}</span>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </Bande>

          {/* ── Compétences : lignes plutôt que cartes ──────────────────────── */}
          <Bande label="Compétences">
            <ul className="divide-y divide-border/50 text-left">
              {COMPETENCES.map(({ category, items, icon: Icone }) => (
                <motion.li
                  key={category}
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 first:pt-0 last:pb-0"
                >
                  <span className="flex items-center gap-2.5 sm:w-44 shrink-0">
                    <Icone className="size-3.5 text-accent-texte" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">{category}</span>
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {items.map((element) => (
                      <span
                        key={element}
                        className="text-xs bg-input/20 dark:bg-input/30 text-muted-foreground px-2 py-0.5 rounded-md border border-border"
                      >
                        {element}
                      </span>
                    ))}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Bande>

          {/* ── Outils ──────────────────────────────────────────────────────── */}
          <Bande label="Outils &amp; Techs">
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-1.5">
              {OUTILS.map((outil) => (
                <motion.button
                  key={outil.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => ouvrirOutil(outil)}
                  className="flex items-center gap-2.5 h-7 px-2 bg-input/20 dark:bg-input/30 border border-border rounded-md hover:bg-muted hover:border-accent/40 transition-colors group cursor-pointer"
                >
                  <img
                    src={outil.iconUrl || `https://cdn.simpleicons.org/${outil.slug}`}
                    alt=""
                    aria-hidden="true"
                    className="size-3.5 grayscale group-hover:grayscale-0 transition-all object-contain"
                  />
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {outil.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </Bande>

          {/* ── Formations ──────────────────────────────────────────────────── */}
          <Bande label="Formations">
            <ul className="divide-y divide-border/50 text-left">
              {FORMATIONS.map(({ annee, intitule }) => (
                <motion.li key={annee} variants={fadeInUp} className="flex items-start gap-5 py-4 first:pt-0 last:pb-0">
                  <GraduationCap className="size-4 text-accent-texte shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-mono text-[10px] font-medium text-accent-texte tabular-nums pt-1 shrink-0">{annee}</span>
                  <h3 className="text-sm font-medium text-foreground leading-snug">{intitule}</h3>
                </motion.li>
              ))}
            </ul>
          </Bande>

          {/* ── Certifications ──────────────────────────────────────────────── */}
          <Bande label="Certifications">
            <ul className="divide-y divide-border/50 text-left">
              <motion.li variants={fadeInUp}>
                <a
                  href="https://www.credly.com/badges/f518dc90-cbd2-4ec2-95e6-b58a35119ffc/linked_in?t=tardcp"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-5 py-4 hover:bg-muted rounded-md px-2 -mx-2 transition-colors"
                >
                  <ShieldCheck className="size-4 text-accent-texte shrink-0" aria-hidden="true" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-accent-texte transition-colors">
                      Introduction to Cybersecurity
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">Cisco — Credly Badge</span>
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground/50 group-hover:text-accent-texte transition-colors shrink-0" aria-hidden="true" />
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="https://www.credly.com/badges/9dd2bc13-5bb2-45e9-8261-e20c45d699a1/linked_in?t=teyn8c"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-5 py-4 hover:bg-muted rounded-md px-2 -mx-2 transition-colors"
                >
                  <Cpu className="size-4 text-accent-texte shrink-0" aria-hidden="true" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-foreground group-hover:text-accent-texte transition-colors">
                      Introduction to IoT
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">Cisco Networking Academy</span>
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground/50 group-hover:text-accent-texte transition-colors shrink-0" aria-hidden="true" />
                </a>
              </motion.li>
            </ul>
          </Bande>

          {/* ── Langues ─────────────────────────────────────────────────────── */}
          <Bande label="Langues">
            <ul className="divide-y divide-border/50 text-left">
              {[
                { langue: 'Français', niveau: 'Maternel' },
                { langue: 'Anglais', niveau: 'Niveau B2 avancé' },
              ].map(({ langue, niveau }) => (
                <motion.li key={langue} variants={fadeInUp} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                  <span className="text-sm font-medium text-foreground">{langue}</span>
                  <span className="text-accent-texte text-xs">{niveau}</span>
                </motion.li>
              ))}
            </ul>
          </Bande>

          {/* ── Centres d'intérêt ───────────────────────────────────────────── */}
          <Bande label="Centres d'Intérêt">
            <motion.ul variants={fadeInUp} className="flex flex-wrap justify-center gap-1.5">
              {INTERETS.map(({ name, icon: Icone }) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 h-7 px-2 bg-input/20 dark:bg-input/30 border border-border rounded-md"
                >
                  <Icone className="size-3.5 text-accent-texte shrink-0" aria-hidden="true" />
                  <span className="text-xs text-foreground/90 tracking-tight">{name}</span>
                </li>
              ))}
            </motion.ul>
          </Bande>
        </div>
      </main>

      <LinkedInFooterModal
        isOpen={estModaleLinkedinOuverte}
        onClose={() => setEstModaleLinkedinOuverte(false)}
      />

      <TechModal
        isOpen={estModaleOutilOuverte && !!outilSelectionne}
        onClose={() => {
          setEstModaleOutilOuverte(false);
          setTimeout(() => setOutilSelectionne(null), 500);
        }}
        techName={outilSelectionne?.name ?? ''}
        techUrl={outilSelectionne?.url ?? ''}
        techIcon={outilSelectionne?.slug ?? ''}
        iconUrl={outilSelectionne?.iconUrl}
      />
    </div>
  );
};

export default CVPage;
