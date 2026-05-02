import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Heart, 
  Linkedin, 
  MapPin, 
  Car, 
  ExternalLink,
  CheckCircle2,
  Globe,
  Code2,
  Layout as LayoutIcon,
  Database,
  Video,
  Smartphone,
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
import { Button } from '@/components/ui/button';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTheme } from '@/hooks/use-theme';
import { LinkedInFooterModal } from '@/components/ui/SocialModals';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const CVPage: React.FC = () => {
  useDocumentTitle("CV", { enableTypingAnimation: false });
  const { theme } = useTheme();
  const [isLinkedinModalOpen, setIsLinkedinModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<{name: string, slug: string, url: string, iconUrl?: string} | null>(null);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const accentColor = theme === 'dark' ? '#D3C0B1' : '#C49D84';

  const experiences = [
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

  const skills = [
    {
      category: "Systèmes",
      items: ["Windows", "MacOS", "Linux", "Cloud (AWS, Azure)"],
      icon: Globe
    },
    {
      category: "Réseaux",
      items: ["Administration serveurs", "Sécurité", "Architecture"],
      icon: Database
    },
    {
      category: "Web Marketing",
      items: ["SEO/SEA", "Analytics", "Réseaux sociaux"],
      icon: LayoutIcon
    },
    {
      category: "Outils",
      items: ["Bases de données SQL", "Gestion de projet", "Montage vidéo"],
      icon: Wrench
    }
  ];

  const tools = [
    { name: "React", slug: "react", url: "https://react.dev" },
    { name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org" },
    { name: "Next.js", slug: "nextdotjs", url: "https://nextjs.org" },
    { name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org" },
    { name: "Tailwind CSS", slug: "tailwindcss", url: "https://tailwindcss.com" },
    { name: "Docker", slug: "docker", url: "https://www.docker.com" },
    { name: "Nginx", slug: "nginx", url: "https://nginx.org" },
    { name: "Visual Studio Code", slug: "visualstudiocode", url: "https://code.visualstudio.com", iconUrl: "https://i.imgur.com/bMFlLET.png" },
  ];

  const interests = [
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

  const handleTechClick = (tech: any) => {
    setSelectedTech(tech);
    setIsTechModalOpen(true);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <main className="flex-1 py-24 md:py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button variant="ghost" className="mb-8 gap-2 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors">
                <ArrowLeft size={18} />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                Mon <span className="text-accent">CV</span>
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground font-medium">
                <div className="flex items-center gap-2 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <span>Technicien Data Center</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Langres, France</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                  <Car className="w-4 h-4 text-accent" />
                  <span>Permis B & Véhiculé</span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setIsLinkedinModalOpen(true)}
              className="w-full md:w-auto h-14 px-8 rounded-2xl font-bold shadow-lg transition-all hover:scale-105 flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)", color: "var(--background)" }}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Me contacter sur LinkedIn
            </Button>
          </motion.div>

          <LinkedInFooterModal
            isOpen={isLinkedinModalOpen}
            onClose={() => setIsLinkedinModalOpen(false)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: About, Skills, Education */}
            <div className="lg:col-span-1 space-y-12">
              {/* Skills */}
              <motion.section variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 mb-6 px-2">Compétences</h2>
                <div className="space-y-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-5 group hover:border-accent/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <skill.icon className="w-5 h-5 text-accent" />
                        <h3 className="font-bold text-foreground">{skill.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, i) => (
                          <span key={i} className="text-xs bg-accent/5 text-muted-foreground px-2 py-1 rounded-md border border-accent/5">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Tools */}
              <motion.section variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 mb-6 px-2">Outils & Techs</h2>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleTechClick(tool);
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl hover:border-accent/30 transition-all group cursor-pointer relative z-50"
                    >
                      <img
                        src={tool.iconUrl || `https://cdn.simpleicons.org/${tool.slug}`}
                        alt={tool.name}
                        className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all object-contain"
                      />
                      <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                        {tool.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.section>

              {/* Languages */}
              <motion.section variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 mb-6 px-2">Langues</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-card/30 border border-border/40 p-4 rounded-xl">
                    <span className="font-bold">Français</span>
                    <span className="text-accent text-sm">Maternel</span>
                  </div>
                  <div className="flex justify-between items-center bg-card/30 border border-border/40 p-4 rounded-xl">
                    <span className="font-bold">Anglais</span>
                    <span className="text-accent text-sm">Niveau B2 avancé</span>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Right Column: Experience, Education, Interests */}
            <div className="lg:col-span-2 space-y-12">
              {/* Experience */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 mb-8 px-2">Parcours Professionnel</h2>
                <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-accent/10">
                  {experiences.map((exp, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="relative pl-12"
                    >
                      <div className="absolute left-0 top-1 w-9 h-9 bg-background border-2 border-accent rounded-full flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                      </div>
                      <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-[2rem] p-8 hover:border-accent/30 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{exp.role}</h3>
                          <span className="text-sm font-bold text-accent/60 bg-accent/5 px-3 py-1 rounded-full">{exp.period}</span>
                        </div>
                        <p className="text-lg font-semibold text-foreground/80 mb-4">{exp.company}</p>
                        <ul className="space-y-3">
                          {exp.missions.map((mission, i) => (
                            <li key={i} className="flex items-start gap-3 text-muted-foreground">
                              <CheckCircle2 className="w-5 h-5 text-accent/40 mt-0.5 flex-shrink-0" />
                              <span>{mission}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 mb-8 px-2">Formations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="bg-card/30 border border-border/40 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="w-6 h-6 text-accent" />
                      <span className="font-bold text-accent">2022</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Titre professionnel (BAC+2) d'Assistant Web Marketing</h3>
                  </motion.div>
                  <motion.div 
                    variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="bg-card/30 border border-border/40 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="w-6 h-6 text-accent" />
                      <span className="font-bold text-accent">2020</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">BEP & BAC PRO Électrotechnique (MELEC)</h3>
                  </motion.div>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 mb-8 px-2">Certifications</h2>
                <motion.a
                  href="https://www.credly.com/badges/f518dc90-cbd2-4ec2-95e6-b58a35119ffc/linked_in?t=tardcp"
                  target="_blank"
                  rel="noreferrer"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-5 bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-accent/30 transition-all group"
                >
                  <div className="p-3 bg-accent/10 rounded-xl shrink-0 group-hover:bg-accent/20 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground group-hover:text-accent transition-colors">Introduction to Cybersecurity</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Cisco — Credly Badge</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                </motion.a>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-5 bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl p-6"
                >
                  <div className="p-3 bg-accent/10 rounded-xl shrink-0">
                    <Cpu className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">Introduction to IoT</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Cisco Networking Academy</p>
                  </div>
                </motion.div>
              </section>

              {/* Interests */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 mb-8 px-2">Centres d'Intérêt</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {interests.map((interest, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="flex flex-col items-center justify-center gap-4 bg-card/30 backdrop-blur-sm border border-border/40 p-6 rounded-[2rem] hover:border-accent/30 transition-all group text-center"
                    >
                      <div className="p-4 bg-accent/5 rounded-2xl group-hover:bg-accent/10 transition-colors">
                        <interest.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="font-bold text-sm tracking-tight text-foreground/90">{interest.name}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CVPage;
