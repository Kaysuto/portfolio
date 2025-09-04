import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowUpRight, EnvelopeSimple, DiscordLogo, Globe, GameController, Palette, SmileyXEyes, PaintBrush, GithubLogo, X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

const BioPage: React.FC = () => {
  // États pour le modal de confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMounted, setModalMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedLink, setSelectedLink] = useState<{name: string, url: string, description: string} | null>(null);

  // Animation des éléments avec des délais échelonnés
  const animationDelay = (index: number) => ({
    animationDelay: `${index * 0.1}s`,
    animationFillMode: 'backwards' as const
  });

  // Fonctions pour gérer le modal
  const openModal = (link: {name: string, url: string, description: string}) => {
    setSelectedLink(link);
    setIsClosing(false);
    setModalMounted(true);
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeModal = () => {
    setIsClosing(true);
    setIsModalOpen(false);
    setTimeout(() => {
      setModalMounted(false);
      setIsClosing(false);
      setSelectedLink(null);
    }, 300);
  };

  const handleLinkConfirm = () => {
    if (selectedLink) {
      window.open(selectedLink.url, '_blank', 'noopener,noreferrer');
      closeModal();
    }
  };

  // Gestion des touches clavier
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  // Liens sociaux basés sur solo.to/kaysuto
  const socialLinks = [
    {
      name: 'Email',
      url: 'mailto:contact@kaysuto.fr',
      description: 'Me contacter directement',
      icon: EnvelopeSimple
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/wJTfwPen',
      description: 'Rejoins mon serveur',
      icon: DiscordLogo
    },
    {
      name: 'Site personnel',
      url: 'https://kaysuto.fr',
      description: 'Mon portfolio principal',
      icon: Globe
    },
    {
      name: 'Clover Games',
      url: 'https://www.clovergames.fr',
      description: 'Mon projet gaming',
      icon: GameController
    },
    {
      name: 'DeviantArt',
      url: 'https://www.deviantart.com/kaysuto',
      description: 'Mes créations artistiques',
      icon: Palette
    },
    {
      name: 'Emoji.gg',
      url: 'https://emoji.gg/user/kaysuto',
      description: 'Profil emoji (+100k)',
      icon: SmileyXEyes
    },
    {
      name: 'Pinterest',
      url: 'https://www.pinterest.fr/kaysuto/',
      description: 'Mes inspirations',
      icon: PaintBrush
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Kaysuto',
      description: 'Code & projets open source',
      icon: GithubLogo
    }
  ];

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <button
                      key={link.name}
                      onClick={() => openModal(link)}
                      className="group relative p-4 bg-card/80 backdrop-blur-sm border border-border/60 rounded-xl hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:scale-[1.02] hover:border-accent/40 animate-fadeInUp text-left w-full"
                      style={animationDelay(index)}
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
                              {link.name}
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
            </div>
          </section>
        </main>
        
        <Footer />
      </div>

      {/* Modal de confirmation pour les liens */}
      {modalMounted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isModalOpen && !isClosing ? 'opacity-100' : 'opacity-0'
            }`} 
            onClick={closeModal} 
          />
          <div
            className={`relative bg-card rounded-2xl w-full max-w-md p-6 shadow-2xl border border-border transition-all duration-300 ${
              isModalOpen && !isClosing 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-4'
            }`}
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Fermer"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={closeModal}
            >
              <X size={20} className="text-muted-foreground" />
            </button>
            
            {selectedLink && (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-accent/10 p-3 rounded-xl">
                    {(() => {
                      const link = socialLinks.find(l => l.name === selectedLink.name);
                      if (link) {
                        const IconComponent = link.icon;
                        return <IconComponent size={24} className="text-accent" />;
                      }
                      return null;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{selectedLink.name}</h3>
                    <p className="text-muted-foreground">{selectedLink.description}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
                </p>
                
                <div className="bg-muted/20 p-4 rounded-lg mb-6 border border-border/50">
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
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Ouvrir le lien
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BioPage;
