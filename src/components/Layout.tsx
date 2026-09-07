import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { LecteurAudio } from './LecteurAudio';
import { FondAnime } from './FondAnime';
import { Toaster } from './ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden theme-fade bg-background">
      {/* Posé ici et non dans une section : la couche est `fixed`, elle doit se
          placer une seule fois pour toutes les routes, sous le contenu en z-10.
          Aucun ancêtre ne porte de `transform` ni de `filter`, son bloc
          conteneur reste donc bien le viewport. */}
      <FondAnime />
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
  );
}
