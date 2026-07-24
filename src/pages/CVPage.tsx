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
      className="grid lg:grid-cols-12 gap-x-10 gap-y-6 py-12 border-t border-border/60"
    >
      <div className="lg:col-span-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground lg:sticky lg:top-28">
          {label}
        </h2>
      </div>
      <div className="lg:col-span-9">{children}</div>
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
              <Button variant="ghost" className="mb-10 gap-2 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors">
                <ArrowLeft size={18} />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>

          {/* Bandeau d'en-tête pleine largeur */}
          <motion.header
            className="pb-10 border-b border-border/60"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
              Curriculum vitæ
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                  Mon <span className="text-accent">CV</span>
                </h1>
                <ul className="flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground font-medium">
                  <li className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span>Technicien Informatique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span>France</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span>Permis B &amp; Véhiculé</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => setEstModaleLinkedinOuverte(true)}
                className="w-full lg:w-auto h-13 px-7 py-3.5 rounded-2xl font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-[1.02] flex items-center justify-center shrink-0"
              >
                <Linkedin className="w-5 h-5 mr-2" aria-hidden="true" />
                Me contacter sur LinkedIn
              </Button>
            </div>
          </motion.header>

          {/* ── Parcours professionnel : frise verticale ────────────────────── */}
          <Bande label="Parcours Professionnel">
            <ol className="relative border-l border-border/60 ml-2">
              {EXPERIENCES.map((experience) => (
                <motion.li key={`${experience.company}-${experience.period}`} variants={fadeInUp} className="relative pl-8 pb-10 last:pb-0">
                  <motion.span
                    className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background"
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={VIEWPORT}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  />
                  <p className="font-mono text-xs font-bold text-accent mb-2">{experience.period}</p>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{experience.role}</h3>
                  <p className="text-base font-semibold text-muted-foreground mb-4">{experience.company}</p>
                  <ul className="space-y-2">
                    {experience.missions.map((mission) => (
                      <li key={mission} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent/50 mt-1 shrink-0" aria-hidden="true" />
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
            <ul className="divide-y divide-border/50">
              {COMPETENCES.map(({ category, items, icon: Icone }) => (
                <motion.li
                  key={category}
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 first:pt-0 last:pb-0"
                >
                  <span className="flex items-center gap-2.5 sm:w-44 shrink-0">
                    <Icone className="w-4 h-4 text-accent" aria-hidden="true" />
                    <span className="font-bold text-foreground">{category}</span>
                  </span>
                  <span className="flex flex-wrap gap-2">
                    {items.map((element) => (
                      <span
                        key={element}
                        className="text-xs font-medium bg-accent/[0.07] text-muted-foreground px-2.5 py-1 rounded-lg border border-accent/10"
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
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2.5">
              {OUTILS.map((outil) => (
                <motion.button
                  key={outil.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => ouvrirOutil(outil)}
                  className="flex items-center gap-2.5 px-3.5 py-2 bg-accent/[0.06] border border-accent/15 rounded-xl hover:bg-accent/12 hover:border-accent/40 transition-colors group cursor-pointer"
                >
                  <img
                    src={outil.iconUrl || `https://cdn.simpleicons.org/${outil.slug}`}
                    alt=""
                    aria-hidden="true"
                    className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all object-contain"
                  />
                  <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                    {outil.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </Bande>

          {/* ── Formations ──────────────────────────────────────────────────── */}
          <Bande label="Formations">
            <ul className="divide-y divide-border/50">
              {FORMATIONS.map(({ annee, intitule }) => (
                <motion.li key={annee} variants={fadeInUp} className="flex items-start gap-5 py-4 first:pt-0 last:pb-0">
                  <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold text-accent tabular-nums pt-1 shrink-0">{annee}</span>
                  <h3 className="font-bold text-base md:text-lg text-foreground leading-snug">{intitule}</h3>
                </motion.li>
              ))}
            </ul>
          </Bande>

          {/* ── Certifications ──────────────────────────────────────────────── */}
          <Bande label="Certifications">
            <ul className="divide-y divide-border/50">
              <motion.li variants={fadeInUp}>
                <a
                  href="https://www.credly.com/badges/f518dc90-cbd2-4ec2-95e6-b58a35119ffc/linked_in?t=tardcp"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-5 py-4 hover:bg-accent/[0.04] rounded-xl px-3 -mx-3 transition-colors"
                >
                  <ShieldCheck className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-foreground group-hover:text-accent transition-colors">
                      Introduction to Cybersecurity
                    </span>
                    <span className="block text-sm text-muted-foreground mt-0.5">Cisco — Credly Badge</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent transition-colors shrink-0" aria-hidden="true" />
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <a
                  href="https://www.credly.com/badges/9dd2bc13-5bb2-45e9-8261-e20c45d699a1/linked_in?t=teyn8c"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-5 py-4 hover:bg-accent/[0.04] rounded-xl px-3 -mx-3 transition-colors"
                >
                  <Cpu className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold text-foreground group-hover:text-accent transition-colors">
                      Introduction to IoT
                    </span>
                    <span className="block text-sm text-muted-foreground mt-0.5">Cisco Networking Academy</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent transition-colors shrink-0" aria-hidden="true" />
                </a>
              </motion.li>
            </ul>
          </Bande>

          {/* ── Langues ─────────────────────────────────────────────────────── */}
          <Bande label="Langues">
            <ul className="divide-y divide-border/50">
              {[
                { langue: 'Français', niveau: 'Maternel' },
                { langue: 'Anglais', niveau: 'Niveau B2 avancé' },
              ].map(({ langue, niveau }) => (
                <motion.li key={langue} variants={fadeInUp} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                  <span className="font-bold text-foreground">{langue}</span>
                  <span className="text-accent text-sm font-medium">{niveau}</span>
                </motion.li>
              ))}
            </ul>
          </Bande>

          {/* ── Centres d'intérêt ───────────────────────────────────────────── */}
          <Bande label="Centres d'Intérêt">
            <motion.ul variants={fadeInUp} className="flex flex-wrap gap-2.5">
              {INTERETS.map(({ name, icon: Icone }) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-accent/[0.06] border border-accent/15 rounded-xl"
                >
                  <Icone className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm font-bold text-foreground/90 tracking-tight">{name}</span>
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
