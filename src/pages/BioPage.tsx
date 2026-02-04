import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowUpRight, 
  Mail, 
  Globe, 
  Gamepad2, 
  Palette, 
  Ghost, 
  Paintbrush, 
  Github, 
  Link as LinkIcon,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { BioLinksService, BioLink } from '@/services/bioLinksService';
import { useModal } from '@/hooks/useModal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
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
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const BioPage: React.FC = () => {
  useDocumentTitle("Bio", { enableTypingAnimation: false });
  const { theme } = useTheme();
  const [selectedLink, setSelectedLink] = useState<{name: string, url: string, description: string} | null>(null);
  const { isModalOpen, modalMounted, isClosing, openModal: openModalBase, closeModal } = useModal();

  // Bio links are now static, no longer using useQuery
  const bioLinks = BioLinksService.getBioLinksSync();
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
      'LinkSimple': LinkIcon
    };
    const Icon = iconMap[iconName] || LinkIcon;
    return <Icon size={28} />;
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-40 right-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-40 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content with large vertical padding for spacing between navbar and footer */}
      <main className="flex-1 flex items-center justify-center py-32 md:py-48 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-6 tracking-tighter">
              Mes Liens
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Retrouvez-moi sur mes différentes plateformes et projets.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-6" />
                <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Chargement de l'univers...</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-destructive/5 border border-destructive/20 rounded-[2.5rem] p-12"
              >
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-6" />
                <p className="text-destructive text-lg mb-8 font-bold">Erreur lors du chargement des liens</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-destructive/30 hover:bg-destructive/10 rounded-xl px-8">
                  Réessayer
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
              >
                {bioLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({
                      name: link.title,
                      url: link.url,
                      description: link.description || ''
                    })}
                    className="group relative p-6 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2rem] hover:shadow-2xl transition-all duration-300 hover:border-accent/40 text-left w-full overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-5">
                        <div className="bg-accent/10 p-4 rounded-2xl group-hover:bg-accent/20 transition-all duration-300 group-hover:rotate-3 shadow-inner">
                          <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                            {getIcon(link.icon || 'LinkSimple')}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-xl text-foreground group-hover:text-accent transition-colors duration-300 tracking-tight">
                            {link.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors duration-300 font-medium">
                            {link.description}
                          </p>
                        </div>
                      </div>
                      <div className="bg-accent/5 p-2.5 rounded-xl group-hover:bg-accent/20 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-accent/50 group-hover:text-accent transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        maxWidth="max-w-lg"
      >
        {selectedLink && (
          <div className="space-y-8 p-2">
            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
                <div className="text-accent">
                  {getIcon(bioLinks.find(l => l.title === selectedLink.name)?.icon || 'LinkSimple')}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{selectedLink.name}</h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {selectedLink.description}
                </p>
              </div>
            </div>
            
            <div className="bg-accent/5 rounded-[1.5rem] p-6 border border-accent/10">
              <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">
                Lien externe :
              </p>
              <div className="bg-background/50 border border-border/50 rounded-xl p-4">
                <code className="text-sm font-bold break-all font-mono" style={{ color: accentColor }}>
                  {selectedLink.url}
                </code>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={closeModal}
                className="flex-1 h-14 rounded-2xl border-border/50 hover:bg-accent/5 font-bold"
              >
                Annuler
              </Button>
              <Button 
                type="button"
                onClick={handleLinkConfirm} 
                className="flex-1 h-14 rounded-2xl font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: accentColor, color: 'black' }}
              >
                <ArrowUpRight className="h-5 w-5 mr-2" />
                Ouvrir
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BioPage;
