import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowUpRight, EnvelopeSimple, DiscordLogo, Globe, GameController, Palette, SmileyXEyes, PaintBrush, GithubLogo, X, LinkSimple } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { BioLinksService, BioLink } from '@/services/bioLinksService';
import { useModal } from '@/hooks/useModal';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const BioPage: React.FC = () => {
  // Titre fixe sans animation
  useDocumentTitle("Bio", { enableTypingAnimation: false });

  // États pour les liens depuis la base de données
  const [bioLinks, setBioLinks] = useState<BioLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour le modal de confirmation
  const [selectedLink, setSelectedLink] = useState<{name: string, url: string, description: string} | null>(null);
  const { isModalOpen, modalMounted, isClosing, openModal: openModalBase, closeModal } = useModal();

  // Mapping des icônes Phosphor
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'EnvelopeSimple': EnvelopeSimple,
      'DiscordLogo': DiscordLogo,
      'Globe': Globe,
      'GameController': GameController,
      'Palette': Palette,
      'SmileyXEyes': SmileyXEyes,
      'PaintBrush': PaintBrush,
      'GithubLogo': GithubLogo,
      'LinkSimple': LinkSimple
    };
    return iconMap[iconName] || LinkSimple;
  };

  // Charger les liens bio depuis la base de données
  useEffect(() => {
    const loadBioLinks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const links = await BioLinksService.getBioLinks();
        setBioLinks(links);
      } catch (err) {
        setError('Erreur lors du chargement des liens');
      } finally {
        setIsLoading(false);
      }
    };

    loadBioLinks();
  }, []);

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

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        
        <main className="relative" role="main">
          {/* Animated background shapes */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-40 right-8 w-16 h-16 bg-accent/8 rounded-full animate-float-slow"></div>
            <div className="absolute top-1/4 left-6 w-12 h-12 bg-primary/10 rounded-full animate-float-medium"></div>
            <div className="absolute bottom-40 right-1/4 w-10 h-10 bg-secondary/15 rounded-full animate-float-fast"></div>
            <div className="absolute top-3/4 left-12 w-8 h-8 bg-accent/15 rounded-full animate-bounce-slow"></div>
            <div className="absolute bottom-20 left-8 w-14 h-14 bg-muted/20 rounded-full animate-pulse-slow"></div>
          </div>

          {/* Section Bio */}
          <section className="min-h-screen flex items-center justify-center px-6 pt-20 pb-20">
            <div className="container mx-auto max-w-4xl">
              {/* En-tête de la page bio */}
              <div className="text-center mb-12 animate-fadeInUp">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-4">
                  Mes Liens
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Retrouvez-moi sur mes différentes plateformes et projets
                </p>
              </div>

              {/* Grille de liens sociaux */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Chargement des liens...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-destructive mb-4">❌ {error}</p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Réessayer
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {bioLinks.map((link, index) => {
                    const IconComponent = getIcon(link.icon || 'LinkSimple');
                    return (
                      <button
                        key={link.id}
                        onClick={() => openModal({
                          name: link.title,
                          url: link.url,
                          description: link.description || ''
                        })}
                        className="group relative p-4 bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:scale-[1.02] hover:border-accent/40 animate-fadeInUp text-left w-full"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animationFillMode: 'backwards'
                        }}
                      >
                        {/* Effet de brillance sur hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-accent/10 p-3 rounded-xl group-hover:bg-accent/20 transition-colors duration-300">
                              <IconComponent size={24} className="text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                                {link.title}
                              </h3>
                              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                                {link.description}
                              </p>
                            </div>
                          </div>
                          <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                            <ArrowUpRight className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>

      {/* Modal de confirmation pour les liens */}
      <Modal
        isOpen={modalMounted}
        onClose={closeModal}
        title={selectedLink?.name || "Lien"}
        size="md"
      >
        {selectedLink && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-accent/10 p-3 rounded-xl">
                {(() => {
                  const link = bioLinks.find(l => l.title === selectedLink.name);
                  if (link) {
                    const IconComponent = getIcon(link.icon || 'LinkSimple');
                    return <IconComponent size={24} className="text-accent" />;
                  }
                  return <LinkSimple size={24} className="text-accent" />;
                })()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedLink.description}</h3>
                <p className="text-muted-foreground text-sm">Ouvrir dans un nouvel onglet</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
            </p>
            
            <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
              <code className="text-sm text-foreground break-all font-mono">
                {selectedLink.url}
              </code>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={closeModal}
                className="hover:bg-accent/10"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleLinkConfirm} 
                className="bg-accent text-[#070201] dark:text-[#221512] hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Ouvrir le lien
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BioPage;
