import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden theme-fade bg-background">
      {/* Background unifié — scroll avec le contenu */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-35"
        style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10">
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
