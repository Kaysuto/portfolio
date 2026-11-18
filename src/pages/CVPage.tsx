import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';
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
  Cloud,
  Server,
  Terminal,
  Code,
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
import { EASE_OUT } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { useLangue, type Bilingue } from '@/lib/langue';

type Outil = { name: string; slug: string; url: string; iconUrl?: string };

const EXPERIENCES: { company: Bilingue; role: Bilingue; period: Bilingue; missions: Bilingue[] }[] = [
  {
    company: { fr: "Magna Engineered Glass Europe", en: "Magna Engineered Glass Europe" },
    role: { fr: "Informaticien Polyvalent", en: "IT Generalist" },
    period: { fr: "Mai 2026 - Présent", en: "May 2026 – Present" },
    missions: [
      { fr: "Gestion du parc informatique", en: "IT asset management" },
      { fr: "Support utilisateurs", en: "User support" },
      { fr: "Administration réseau", en: "Network administration" },
      { fr: "Maintenance de l'infrastructure interne", en: "Internal infrastructure maintenance" },
      { fr: "Développement des applications internes", en: "Internal application development" }
    ]
  },
  {
    company: { fr: "Experis France & Exaion", en: "Experis France & Exaion" },
    role: { fr: "Technicien Data Center", en: "Data Center Technician" },
    period: { fr: "Février 2023 - Février 2026", en: "February 2023 – February 2026" },
    missions: [
      { fr: "Chargé de la gestion opérationnelle d'un data center (installation, câblage, maintenance)", en: "Day-to-day operations of a data center (installation, cabling, maintenance)" },
      { fr: "Pilotage de l'approvisionnement réseau multi-équipes", en: "Coordinated network provisioning across multiple teams" }
    ]
  },
  {
    company: { fr: "France Travail", en: "France Travail" },
    role: { fr: "Conseiller numérique", en: "Digital Advisor" },
    period: { fr: "Août 2022 - Janvier 2023", en: "August 2022 – January 2023" },
    missions: [
      { fr: "Accueil et assistance des demandeurs d'emploi", en: "Welcoming and assisting job seekers" },
      { fr: "Relance de rendez-vous", en: "Appointment follow-ups" },
      { fr: "Traitement administratif", en: "Administrative processing" },
      { fr: "Utilisation des outils numériques", en: "Day-to-day use of digital tools" },
      { fr: "Animation d'ateliers professionnels", en: "Running career workshops" }
    ]
  },
  {
    company: { fr: "ESCCI et NaturOPeps", en: "ESCCI & NaturOPeps" },
    role: { fr: "Assistant Web Marketing", en: "Web Marketing Assistant" },
    period: { fr: "Août 2021 - Juin 2022", en: "August 2021 – June 2022" },
    missions: [
      { fr: "Analyse et refonte de la stratégie digitale", en: "Analysis and overhaul of the digital strategy" },
      { fr: "Optimisation du contenu (SEO/SEA)", en: "Content optimization (SEO/SEA)" },
      { fr: "Mise en place d'outils de suivi de performance", en: "Setting up performance tracking tools" },
      { fr: "Réalisation d'études stratégiques", en: "Strategic research studies" }
    ]
  },
  {
    company: { fr: "Varenne Gastronomie", en: "Varenne Gastronomie" },
    role: { fr: "Magasinier", en: "Warehouse Operative" },
    period: { fr: "Août 2020 - Octobre 2020", en: "August 2020 – October 2020" },
    missions: [
      { fr: "Chargement de marchandises", en: "Loading goods" },
      { fr: "Réception de commandes", en: "Receiving orders" },
      { fr: "Contrôle qualité et stockage des produits", en: "Quality control and product storage" }
    ]
  },
  {
    company: { fr: "Ayonis, fabricant de métrologie", en: "Ayonis, metrology equipment manufacturer" },
    role: { fr: "Électricien", en: "Electrician" },
    period: { fr: "Novembre 2019 - Décembre 2019", en: "November 2019 – December 2019" },
    missions: [
      { fr: "Installation et connexion d'équipements électriques", en: "Installing and wiring electrical equipment" },
      { fr: "Réparations", en: "Repairs" },
      { fr: "Lecture et création de dossiers d'installation, de maintenance et de mise en service", en: "Reading and writing installation, maintenance and commissioning documentation" }
    ]
  }
];

const COMPETENCES: { category: Bilingue; items: Bilingue[]; icon: React.ElementType }[] = [
  { category: { fr: "Systèmes", en: "Systems" }, items: [{ fr: "Windows (Active Directory)", en: "Windows (Active Directory)" }, { fr: "Linux (Debian/Ubuntu/Arch)", en: "Linux (Debian/Ubuntu/Arch)" }], icon: Globe },
  { category: { fr: "Réseaux & Sécurité", en: "Networking & Security" }, items: [{ fr: "TCP/IP", en: "TCP/IP" }, { fr: "SSH", en: "SSH" }, { fr: "VPN", en: "VPN" }, { fr: "Architecture Zero Trust", en: "Zero Trust architecture" }], icon: ShieldCheck },
  { category: { fr: "Cloud & Virtualisation", en: "Cloud & Virtualization" }, items: [{ fr: "Proxmox", en: "Proxmox" }, { fr: "Hyper-V", en: "Hyper-V" }, { fr: "VMware", en: "VMware" }, { fr: "Docker", en: "Docker" }, { fr: "Notions AWS, Azure, GCP", en: "AWS, Azure, GCP basics" }], icon: Cloud },
  { category: { fr: "Datacenter", en: "Data center" }, items: [{ fr: "Installation rack", en: "Rack installation" }, { fr: "Câblage", en: "Cabling" }, { fr: "Maintenance", en: "Maintenance" }, { fr: "Stocks & ticketing", en: "Inventory & ticketing" }], icon: Server },
  { category: { fr: "Vibecoding", en: "Vibecoding" }, items: [{ fr: "Scripting (Bash/Python)", en: "Scripting (Bash/Python)" }, { fr: "Git", en: "Git" }, { fr: "Automatisation & debug", en: "Automation & debugging" }], icon: Terminal },
  { category: { fr: "Développement", en: "Development" }, items: [{ fr: "React", en: "React" }, { fr: "TypeScript", en: "TypeScript" }, { fr: "Next.js", en: "Next.js" }, { fr: "Node.js", en: "Node.js" }, { fr: "Python", en: "Python" }, { fr: "SQL (MySQL)", en: "SQL (MySQL)" }, { fr: "Redis", en: "Redis" }], icon: Code },
  { category: { fr: "Web Marketing", en: "Web Marketing" }, items: [{ fr: "SEO/SEA", en: "SEO/SEA" }, { fr: "Analytics", en: "Analytics" }, { fr: "Réseaux sociaux", en: "Social media" }], icon: LayoutIcon },
  { category: { fr: "Outils", en: "Tools" }, items: [{ fr: "Suite Adobe", en: "Adobe Suite" }, { fr: "Gestion de projet", en: "Project management" }, { fr: "Montage vidéo", en: "Video editing" }], icon: Wrench }
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

const FORMATIONS: { annee: string; intitule: Bilingue }[] = [
  { annee: "2022", intitule: { fr: "Titre professionnel (BAC+2) d'Assistant Web Marketing", en: "Professional certificate (2-year degree level) in web marketing" } },
  { annee: "2020", intitule: { fr: "BEP & BAC PRO Électrotechnique (MELEC)", en: "Vocational baccalaureate in electrical engineering (MELEC)" } },
];

const INTERETS: { name: Bilingue; icon: React.ElementType }[] = [
  { name: { fr: "Cryptographie", en: "Cryptography" }, icon: KeyRound },
  { name: { fr: "Design", en: "Design" }, icon: Palette },
  { name: { fr: "Culture Japonaise", en: "Japanese culture" }, icon: Cherry },
  { name: { fr: "Cloud/Technologie", en: "Cloud/Technology" }, icon: Cpu },
  { name: { fr: "Création de contenu", en: "Content creation" }, icon: PenTool },
  { name: { fr: "Jeux Vidéos", en: "Video games" }, icon: Gamepad2 },
  { name: { fr: "Streaming", en: "Streaming" }, icon: Radio },
  { name: { fr: "Réalité Virtuelle", en: "Virtual reality" }, icon: Headset },
  { name: { fr: "Sport", en: "Sports" }, icon: Dumbbell }
];


const LANGUES: { langue: Bilingue; niveau: Bilingue }[] = [
  { langue: { fr: 'Français', en: 'French' }, niveau: { fr: 'Maternel', en: 'Native' } },
  { langue: { fr: 'Anglais', en: 'English' }, niveau: { fr: 'Niveau B2 avancé', en: 'Upper-intermediate (advanced B2)' } },
];

const CERTIFICATIONS = [
  {
    titre: "Introduction to Cybersecurity",
    emetteur: "Cisco — Credly Badge",
    url: "https://www.credly.com/badges/f518dc90-cbd2-4ec2-95e6-b58a35119ffc/linked_in?t=tardcp",
    icon: ShieldCheck,
  },
  {
    titre: "Introduction to IoT",
    emetteur: "Cisco Networking Academy",
    url: "https://www.credly.com/badges/9dd2bc13-5bb2-45e9-8261-e20c45d699a1/linked_in?t=teyn8c",
    icon: Cpu,
  },
];

/** Les étapes du chemin, dans l'ordre. */
const CHAPITRES: { label: Bilingue }[] = [
  { label: { fr: "Parcours professionnel", en: "Work experience" } },
  { label: { fr: "Compétences", en: "Skills" } },
  { label: { fr: "Outils & Techs", en: "Tools & Tech" } },
  { label: { fr: "Formations", en: "Education" } },
  { label: { fr: "Certifications", en: "Certifications" } },
  { label: { fr: "Langues", en: "Languages" } },
  { label: { fr: "Centres d'intérêt", en: "Interests" } },
];

const CLASSE_PASTILLE =
  "bg-[color-mix(in_oklch,var(--input),var(--background)_80%)] dark:bg-[color-mix(in_oklch,var(--input),var(--background)_70%)] border border-border rounded-md";

/** Le chemin : largeur de sa colonne, amplitude et longueur d'onde de ses lacets (px). */
const CHEMIN = { largeur: 48, amplitude: 12, periode: 420 };

/** Abscisse du chemin à la hauteur `y` : une sinusoïde douce autour du milieu de sa colonne. */
const abscisse = (y: number) => CHEMIN.largeur / 2 + CHEMIN.amplitude * Math.sin((y / CHEMIN.periode) * Math.PI * 2);

/** Tracé du chemin sur toute la hauteur `h`, échantillonné tous les 8 px. */
function trace(h: number) {
  const points: string[] = [];
  for (let y = 0; y <= h; y += 8) points.push(`${abscisse(y).toFixed(1)} ${y}`);
  return `M ${points.join(' L ')}`;
}

/** Chaque bloc d'un chapitre monte un peu et apparaît, en cascade. */
const chapitre: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const bloc: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Une étape du chemin : intitulé du chapitre, puis son contenu qui entre en cascade. */
function Chapitre({ index, actif, children }: { index: number; actif: boolean; children: React.ReactNode }) {
  const { l } = useLangue();
  return (
    <motion.section
      data-etape
      aria-labelledby={`chapitre-${index}`}
      variants={chapitre}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="pb-20 last:pb-0 md:pb-28"
    >
      <h2
        id={`chapitre-${index}`}
        className={cn(
          "mb-8 font-mono text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-500",
          actif ? "text-accent-texte" : "text-muted-foreground"
        )}
      >
        {l(CHAPITRES[index].label)}
      </h2>
      {children}
    </motion.section>
  );
}

const CVPage: React.FC = () => {
  const { t, l } = useLangue();
  useSeo({
    title: t("Kimiya - CV", "Kimiya - Resume"),
    description: t(
      "CV de Kimiya : Informaticien Polyvalent, expert infrastructure, réseau et développement web full-stack.",
      "Kimiya's resume: IT generalist with expertise in infrastructure, networking and full-stack web development."
    ),
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

  const reduit = useReducedMotion() ?? false;
  const parcoursRef = useRef<HTMLDivElement>(null);
  const cheminRef = useRef<SVGPathElement>(null);
  const voyageurRef = useRef<SVGCircleElement>(null);

  // Hauteur du parcours et position de chaque étape, remesurées au redimensionnement.
  const [mesures, setMesures] = useState({ hauteur: 0, etapes: [] as number[] });
  useLayoutEffect(() => {
    const parcours = parcoursRef.current;
    if (!parcours) return;
    const mesurer = () =>
      setMesures({
        hauteur: parcours.offsetHeight,
        // Le repère de l'étape se pose à mi-hauteur de son intitulé.
        etapes: Array.from(parcours.querySelectorAll<HTMLElement>('[data-etape]')).map((el) => el.offsetTop + 8),
      });
    mesurer();
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(parcours);
    return () => observateur.disconnect();
  }, []);

  // Le chemin se dessine au défilement : sa pointe reste à 60 % de la hauteur de l'écran.
  const { scrollYProgress } = useScroll({ target: parcoursRef, offset: ['start 60%', 'end 60%'] });
  const progres = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.0005 });

  const [actif, setActif] = useState(-1);
  useMotionValueEvent(progres, 'change', (p) => {
    const y = p * mesures.hauteur;
    setActif(mesures.etapes.filter((etape) => etape <= y + 1).length - 1);
    // Le voyageur, petit point lumineux, suit la pointe du tracé.
    const chemin = cheminRef.current;
    const voyageur = voyageurRef.current;
    if (!chemin || !voyageur) return;
    const point = chemin.getPointAtLength(p * chemin.getTotalLength());
    voyageur.setAttribute('cx', String(point.x));
    voyageur.setAttribute('cy', String(point.y));
  });
  const etapeAtteinte = (index: number) => reduit || actif >= index;

  return (
    <div className="relative mx-auto max-w-4xl px-6 pt-28 pb-24 lg:px-12 md:pt-32">
      {/* ── Ouverture ──────────────────────────────────────────────────── */}
      <header className="mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <Link to="/">
            <Button variant="ghost" className="mb-8 -ml-3 text-muted-foreground hover:text-accent-texte">
              <ArrowLeft />
              {t("Retour à l'accueil", "Back to home")}
            </Button>
          </Link>
        </motion.div>
        <motion.p
          className="mb-4 text-base font-medium tracking-tight text-accent-texte"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {t("Curriculum vitæ", "Curriculum vitae")}
        </motion.p>
        <h1 className="-mb-2 overflow-hidden pb-2 text-6xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
          >
            {t(
              <>Mon <span className="text-accent-texte">CV</span></>,
              <>My <span className="text-accent-texte">Resume</span></>
            )}
          </motion.span>
        </h1>
        <motion.ul
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
        >
          <li className="flex items-center gap-2">
            <Briefcase className="size-4 text-accent-texte" aria-hidden="true" />
            <span>{t("Informaticien polyvalent", "IT generalist")}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4 text-accent-texte" aria-hidden="true" />
            <span>France</span>
          </li>
          <li className="flex items-center gap-2">
            <Car className="size-4 text-accent-texte" aria-hidden="true" />
            <span>{t("Permis B & Véhiculé", "Driving licence & own car")}</span>
          </li>
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
        >
          <Button onClick={() => setEstModaleLinkedinOuverte(true)} size="lg" className="mt-8">
            <Linkedin aria-hidden="true" />
            {t("Me contacter sur LinkedIn", "Contact me on LinkedIn")}
          </Button>
        </motion.div>
      </header>

      {/* ── Le parcours : un chemin qui serpente à gauche et se dessine au
          défilement, une étape par chapitre. Sous « réduire les animations »,
          il est tracé d'emblée. ── */}
      <div ref={parcoursRef} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 md:gap-x-8">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 overflow-visible"
          width={CHEMIN.largeur}
          height={mesures.hauteur}
        >
          {mesures.hauteur > 0 && (
            <>
              <path d={trace(mesures.hauteur)} fill="none" className="stroke-border" strokeWidth={1.5} strokeDasharray="2 6" strokeLinecap="round" />
              <motion.path
                ref={cheminRef}
                d={trace(mesures.hauteur)}
                fill="none"
                className="stroke-accent"
                strokeWidth={2}
                strokeLinecap="round"
                style={{ pathLength: reduit ? 1 : progres }}
              />
              {mesures.etapes.map((y, index) => (
                <circle
                  key={y}
                  cx={abscisse(y)}
                  cy={y}
                  r={6}
                  strokeWidth={2}
                  className={cn(
                    "transition-[fill,stroke] duration-500",
                    etapeAtteinte(index) ? "fill-accent stroke-accent" : "fill-background stroke-border"
                  )}
                />
              ))}
              {!reduit && <circle ref={voyageurRef} cx={abscisse(0)} cy={0} r={4} className="fill-accent-texte drop-shadow-[0_0_6px_var(--accent)]" />}
            </>
          )}
        </svg>

        <div className="col-start-2">
          {/* ── Parcours professionnel ─────────────────────────────────── */}
          <Chapitre index={0} actif={etapeAtteinte(0)}>
            <ol className="space-y-10">
              {EXPERIENCES.map((experience) => (
                <motion.li key={`${experience.company.fr}-${experience.period.fr}`} variants={bloc} className="md:grid md:grid-cols-[11rem_1fr] md:gap-8">
                  <p className="mb-2 font-mono text-xs font-medium text-accent-texte md:mb-0 md:pt-1.5">{l(experience.period)}</p>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-foreground">{l(experience.role)}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{l(experience.company)}</p>
                    <ul className="space-y-2">
                      {experience.missions.map((mission) => (
                        <li key={mission.fr} className="flex items-start gap-3 text-sm/relaxed text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-texte/50" aria-hidden="true" />
                          <span>{l(mission)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Chapitre>

          {/* ── Compétences ────────────────────────────────────────────── */}
          <Chapitre index={1} actif={etapeAtteinte(1)}>
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {COMPETENCES.map(({ category, items, icon: Icone }) => (
                <motion.li key={category.fr} variants={bloc}>
                  <h3 className="mb-4 flex items-center gap-2.5 text-base font-medium text-foreground">
                    <Icone className="size-4 text-accent-texte" aria-hidden="true" />
                    {l(category)}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((element) => (
                      <li key={element.fr} className={cn("px-2.5 py-1 text-sm text-muted-foreground", CLASSE_PASTILLE)}>
                        {l(element)}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ul>
          </Chapitre>

          {/* ── Outils ─────────────────────────────────────────────────── */}
          <Chapitre index={2} actif={etapeAtteinte(2)}>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {OUTILS.map((outil) => (
                <motion.li key={outil.name} variants={bloc}>
                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => ouvrirOutil(outil)}
                    className={cn(
                      "group flex h-10 w-full cursor-pointer items-center gap-2.5 px-3 transition-colors hover:border-accent/40 hover:bg-muted",
                      CLASSE_PASTILLE
                    )}
                  >
                    <img
                      src={outil.iconUrl || `https://cdn.simpleicons.org/${outil.slug}`}
                      alt=""
                      aria-hidden="true"
                      className="size-4 object-contain grayscale transition-[filter] group-hover:grayscale-0"
                    />
                    <span className="truncate text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                      {outil.name}
                    </span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </Chapitre>

          {/* ── Formations ─────────────────────────────────────────────── */}
          <Chapitre index={3} actif={etapeAtteinte(3)}>
            <ul className="space-y-6">
              {FORMATIONS.map(({ annee, intitule }) => (
                <motion.li key={annee} variants={bloc} className="flex items-baseline gap-5">
                  <span className="flex shrink-0 items-center gap-2.5 font-mono text-2xl font-medium tabular-nums tracking-tight text-accent-texte">
                    <GraduationCap className="size-5 self-center" aria-hidden="true" />
                    {annee}
                  </span>
                  <h3 className="text-base font-medium leading-snug text-foreground">{l(intitule)}</h3>
                </motion.li>
              ))}
            </ul>
          </Chapitre>

          {/* ── Certifications ─────────────────────────────────────────── */}
          <Chapitre index={4} actif={etapeAtteinte(4)}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {CERTIFICATIONS.map(({ titre, emetteur, url, icon: Icone }) => (
                <motion.li key={titre} variants={bloc}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col gap-4 rounded-md border border-border/60 p-5 transition-colors hover:bg-muted"
                  >
                    <span className="flex items-center justify-between">
                      <Icone className="size-5 text-accent-texte" aria-hidden="true" />
                      <ExternalLink className="size-4 text-muted-foreground/50 transition-colors group-hover:text-accent-texte" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-base font-medium text-foreground transition-colors group-hover:text-accent-texte">
                        {titre}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{emetteur}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </Chapitre>

          {/* ── Langues ────────────────────────────────────────────────── */}
          <Chapitre index={5} actif={etapeAtteinte(5)}>
            <ul className="flex flex-wrap gap-x-12 gap-y-6">
              {LANGUES.map(({ langue, niveau }) => (
                <motion.li key={langue.fr} variants={bloc}>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">{l(langue)}</p>
                  <p className="mt-2 text-sm text-accent-texte">{l(niveau)}</p>
                </motion.li>
              ))}
            </ul>
          </Chapitre>

          {/* ── Centres d'intérêt ──────────────────────────────────────── */}
          <Chapitre index={6} actif={etapeAtteinte(6)}>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {INTERETS.map(({ name, icon: Icone }) => (
                <motion.li key={name.fr} variants={bloc} className={cn("flex h-10 items-center gap-2.5 px-3", CLASSE_PASTILLE)}>
                  <Icone className="size-4 shrink-0 text-accent-texte" aria-hidden="true" />
                  <span className="truncate text-sm tracking-tight text-foreground/90">{l(name)}</span>
                </motion.li>
              ))}
            </ul>
          </Chapitre>
        </div>
      </div>

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
