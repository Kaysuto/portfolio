import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { Toaster } from './ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden theme-fade bg-background">
      {/*
        Texture de fond, unique pour tout le site.
        `fixed` plutôt qu'`absolute` : le navigateur ne peint qu'une couche de la
        taille du viewport, au lieu d'une couche haute comme le document entier
        qu'il faut repeindre au défilement.
      */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* pb : réserve la hauteur de la barre d'onglets mobile (+ zone sûre iOS). */}
      <div className="relative z-10 pb-[calc(env(safe-area-inset-bottom,0px)+4rem)] md:pb-0">
        <Navbar />
        <main className="theme-fade" role="main">
          {children}
        </main>
        <Footer />
      </div>
      <BackToTop />
      <Toaster />
    </div>
  );
}
