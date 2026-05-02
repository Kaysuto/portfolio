import React from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(ellipse, var(--accent) 0%, transparent 65%)" }}
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
