import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowUpRight, EnvelopeSimple, DiscordLogo, Globe, GameController, Palette, SmileyXEyes, PaintBrush, GithubLogo, LinkSimple, LinkedinLogo } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/Modal';
import { BioLinksService, BioLink } from '@/services/bioLinksService';
import { useModal } from '@/hooks/useModal';

const variantesConteneur: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const variantesElement: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function BioSection() {
  const [liensBio, setLiensBio] = useState<BioLink[]>([]);
  const [estEnChargement, setEstEnChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  const [lienSelectionne, setLienSelectionne] = useState<{name: string, url: string, description: string} | null>(null);
  const { isModalOpen, openModal: ouvrirModaleBase, closeModal } = useModal();

  const obtenirIcone = (nomIcone: string) => {
    const mapIcones: Record<string, any> = {
      'EnvelopeSimple': EnvelopeSimple,
      'DiscordLogo': DiscordLogo,
      'Globe': Globe,
      'GameController': GameController,
      'Palette': Palette,
      'SmileyXEyes': SmileyXEyes,
      'PaintBrush': PaintBrush,
      'GithubLogo': GithubLogo,
      'LinkedinLogo': LinkedinLogo,
      'LinkSimple': LinkSimple
    };
    return mapIcones[nomIcone] || LinkSimple;
  };

  useEffect(() => {
    const chargerLiensBio = async () => {
      try {
        setEstEnChargement(true);
        setErreur(null);
        const liens = await BioLinksService.getBioLinks();
        setLiensBio(liens);
      } catch {
        setErreur('Erreur lors du chargement des liens');
      } finally {
        setEstEnChargement(false);
      }
    };

    chargerLiensBio();
  }, []);

  const ouvrirModale = (lien: {name: string, url: string, description: string}) => {
    setLienSelectionne(lien);
    ouvrirModaleBase();
  };

  const gererConfirmationLien = () => {
    if (lienSelectionne) {
      window.open(lienSelectionne.url, '_blank', 'noopener,noreferrer');
      closeModal();
    }
  };

  return (
    <section id="bio" className="py-24 px-6 bg-background relative overflow-hidden">


      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-6 tracking-tight">
            Mes Liens
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Retrouvez-moi sur mes différentes plateformes et projets.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {estEnChargement ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-muted-foreground font-medium">Chargement de l'univers...</p>
            </motion.div>
          ) : erreur ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-destructive/5 border border-destructive/20 rounded-3xl p-8"
            >
              <p className="text-destructive text-lg mb-6 font-medium">❌ {erreur}</p>
              <Button onClick={() => window.location.reload()} variant="outline" className="border-destructive/30 hover:bg-destructive/10">
                Réessayer
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={variantesConteneur}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            >
              {liensBio.map((lien) => {
                const ComposantIcone = obtenirIcone(lien.icon || 'LinkSimple');
                return (
                  <motion.button
                    key={lien.id}
                    variants={variantesElement}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => ouvrirModale({
                      name: lien.title,
                      url: lien.url,
                      description: lien.description || ''
                    })}
                    className="group relative p-5 bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:border-accent/40 text-left w-full overflow-hidden"
                  >
                    {/* Effet lumineux au survol */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-5">
                        <div className="bg-accent/10 p-4 rounded-2xl group-hover:bg-accent/20 transition-all duration-300 group-hover:rotate-3">
                          <ComposantIcone size={28} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                            {lien.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors duration-300">
                            {lien.description}
                          </p>
                        </div>
                      </div>
                      <div className="bg-accent/5 p-2 rounded-xl group-hover:bg-accent/20 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-accent/50 group-hover:text-accent transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        maxWidth="max-w-lg"
      >
        {lienSelectionne && (
          <div className="space-y-8 p-2">
            <div className="flex items-center space-x-5">
              <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                {(() => {
                  const lien = liensBio.find(l => l.title === lienSelectionne.name);
                  if (lien) {
                    const ComposantIcone = obtenirIcone(lien.icon || 'LinkSimple');
                    return <ComposantIcone className="h-8 w-8 text-accent" />;
                  }
                  return <LinkSimple className="h-8 w-8 text-accent" />;
                })()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{lienSelectionne.name}</h3>
                <p className="text-muted-foreground">
                  {lienSelectionne.description}
                </p>
              </div>
            </div>

            <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
              <p className="text-sm text-muted-foreground mb-4">
                Vous allez être redirigé vers :
              </p>
              <div className="bg-background/50 border border-border/50 rounded-xl p-4">
                <code className="text-sm text-accent break-all font-mono">
                  {lienSelectionne.url}
                </code>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
                className="flex-1 h-12 rounded-xl border-border/50 hover:bg-accent/5"
              >
                Annuler
              </Button>
              <Button
                type="button"
                onClick={gererConfirmationLien}
                className="flex-1 h-12 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
              >
                <ArrowUpRight className="h-5 w-5 mr-2" />
                Ouvrir
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
