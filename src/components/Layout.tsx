import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { LecteurAudio } from './LecteurAudio';
import { Toaster } from './ui/sonner';
import { MotionConfig } from 'framer-motion';
import { BarreProgression } from './immersion/BarreProgression';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    // « réduire les animations » du système : Framer coupe alors tous les
    // déplacements du site et ne garde que les fondus.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen text-foreground relative overflow-x-clip theme-fade bg-background">
        {/* Grain posé une seule fois pour toutes les routes, sous le contenu en
            z-10. La couche est `fixed` : aucun ancêtre ne porte de `transform` ni
            de `filter`, son bloc conteneur reste donc bien le viewport. */}
        <div className="fond-grain" aria-hidden="true" />
        <BarreProgression />
        {/* pb : réserve la hauteur de la barre d'onglets mobile flottante — 3.5rem
            de haut, 0.75rem détachée du bas, plus une marge de respiration. */}
        <div className="relative z-10 pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] md:pb-0">
          <Navbar />
          <main className="theme-fade" role="main">
            {children}
          </main>
          <Footer />
        </div>
        <BackToTop />
        {/* Monté ici, hors des routes : le morceau ne s'interrompt pas quand on
            passe de l'accueil au CV. */}
        <LecteurAudio />
        <Toaster />
      </div>
    </MotionConfig>
  );
}
