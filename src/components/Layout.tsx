import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PrivacyBadge } from './PrivacyBadge';
import { Toaster } from "sonner";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-fade">
      <div className="relative z-10">
        <Navbar />
        <main className="theme-fade" role="main">
          {children}
        </main>
        <Footer />
      </div>
      <PrivacyBadge />
      <Toaster />
    </div>
  );
}
