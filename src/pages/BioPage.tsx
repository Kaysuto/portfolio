import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { 
  ArrowUpRight, 
  Mail, 
  Globe, 
  Gamepad2, 
  Palette, 
  Ghost, 
  Paintbrush, 
  Link as LinkIcon,
  Loader2,
  AlertCircle,
  Tv,
  Film,
  Music,
  Disc
} from 'lucide-react';
import { GithubLogo as Github, TwitchLogo as Twitch } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { BioLinksService } from '@/services/bioLinksService';
import { useModal } from '@/hooks/useModal';
import { useSeo } from '@/hooks/useSeo';
import { useTheme } from '@/hooks/use-theme';

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

const BioPage: React.FC = () => {
  useSeo({
    title: "Kimiya - Bio",
    description: "Tous les liens de Kimiya Kaysuto : projets, réseaux sociaux, GitHub, Twitch et créations en un seul endroit.",
    path: "/bio",
    type: "profile",
  });
  const { theme } = useTheme();
  const [selectedLink, setSelectedLink] = useState<{name: string, url: string, description: string} | null>(null);
  const { isModalOpen, openModal: openModalBase, closeModal } = useModal();

  const groupedLinks = BioLinksService.getGroupedBioLinks();
  const isLoading = false;
  const error = null;

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'EnvelopeSimple': Mail,
      'DiscordLogo': Ghost,
      'Globe': Globe,
      'GameController': Gamepad2,
      'Palette': Palette,
      'SmileyXEyes': Ghost,
      'PaintBrush': Paintbrush,
      'GithubLogo': Github,
      'LinkSimple': LinkIcon,
      'Tv': Tv,
      'Film': Film,
      'Music': Music,
      'TwitchLogo': Twitch,
      'SpotifyLogo': Disc
    };
    const Icon = iconMap[iconName] || LinkIcon;
    return <Icon size={24} />;
  };

  const openModal = (link: {name: string, url: string, description: string}) => {
    setSelectedLink(link);
    openModalBase();
  };

  const handleLinkConfirm = () => {
    if (selectedLink) {
      window.open(selectedLink.url, '_blank', 'noopener,noreferrer');
      closeModal();
    }
  };

  const accentColor = theme === 'dark' ? '#D3C0B1' : '#C49D84';

  const categoryLabels: Record<string, string> = {
    'websites': 'Sites Web',
    'community': 'Communauté',
    'social': 'Social & Plateformes',
    'other': 'Autres'
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <main className="flex-1 py-24 md:py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
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

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
              Mes <span className="text-accent">Liens</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Retrouvez-moi sur mes différentes plateformes et projets.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" className="text-center py-20">
                <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-6" />
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Chargement...</p>
              </motion.div>
            ) : error ? (
              <motion.div key="error" className="text-center py-20 bg-destructive/5 border border-destructive/20 rounded-3xl p-12">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-6" />
                <p className="text-destructive text-lg mb-8 font-bold">Erreur de chargement</p>
                <Button onClick={() => window.location.reload()} variant="outline">Réessayer</Button>
              </motion.div>
            ) : (
              <div className="space-y-16">
                {Object.entries(groupedLinks).map(([category, links]) => (
                  <section key={category} className="space-y-6">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="text-sm font-bold uppercase tracking-[0.3em] text-accent/60 px-2"
                    >
                      {categoryLabels[category] || category}
                    </motion.h2>
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {links.map((link) => (
                        <motion.button
                          key={link.id}
                          variants={itemVariants}
                          whileHover={{ scale: 1.01, y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => openModal({
                            name: link.title,
                            url: link.url,
                            description: link.description || ''
                          })}
                          className="group relative p-4 bg-card/30 backdrop-blur-sm border border-border/40 rounded-2xl hover:shadow-xl transition-all duration-300 hover:border-accent/30 text-left w-full overflow-hidden"
                        >
                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-accent/5 p-3 rounded-xl group-hover:bg-accent/10 transition-all duration-300">
                                <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                                  {getIcon(link.icon || 'LinkSimple')}
                                </div>
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-bold text-base text-foreground group-hover:text-accent transition-colors duration-300 truncate">
                                  {link.title}
                                </h3>
                                <p className="text-xs text-muted-foreground truncate group-hover:text-foreground/70 transition-colors duration-300">
                                  {link.description}
                                </p>
                              </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-accent/30 group-hover:text-accent transition-colors duration-300 flex-shrink-0" />
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  </section>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="max-w-lg">
        {selectedLink && (
          <div className="space-y-8 p-2">
            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
                <div className="text-accent">
                  {getIcon(BioLinksService.getBioLinksSync().find(l => l.title === selectedLink.name)?.icon || 'LinkSimple')}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{selectedLink.name}</h3>
                <p className="text-sm text-muted-foreground font-medium">{selectedLink.description}</p>
              </div>
            </div>
            
            <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
              <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">Lien externe :</p>
              <div className="bg-background/50 border border-border/50 rounded-xl p-4">
                <code className="text-sm font-bold break-all font-mono" style={{ color: accentColor }}>
                  {selectedLink.url}
                </code>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" onClick={closeModal} className="flex-1 h-14 rounded-2xl font-bold">Annuler</Button>
              <Button onClick={handleLinkConfirm} className="flex-1 h-14 rounded-2xl font-bold shadow-lg" style={{ backgroundColor: "var(--accent)", color: "var(--background)" }}>
                <ArrowUpRight className="h-5 w-5 mr-2" /> Ouvrir
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BioPage;
