import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden theme-fade">
      {/* Background unifié */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-70 dark:opacity-35"
          style={{
            backgroundImage: `radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
          }}
        />

      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="theme-fade" role="main">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  );
}
