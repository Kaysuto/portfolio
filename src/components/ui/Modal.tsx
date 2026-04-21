import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  isClosing?: boolean; // Gardé pour compatibilité mais géré par AnimatePresence
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
  className = "",
}: ModalProps) {
  // Gestion du scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermeture avec Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
          />
          
          {/* Modal Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative bg-card/90 backdrop-blur-2xl border border-border/50 rounded-[2.5rem] shadow-2xl w-full overflow-hidden",
              maxWidth,
              className
            )}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-accent/5 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all z-50"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-10">
              {title && (
                <h2 className="text-2xl font-bold text-foreground mb-8 tracking-tight">
                  {title}
                </h2>
              )}
              <div className="relative">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

