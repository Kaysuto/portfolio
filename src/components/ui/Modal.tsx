import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
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
    const gererEchap = (evenement: KeyboardEvent) => {
      if (evenement.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', gererEchap);
    return () => document.removeEventListener('keydown', gererEchap);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
          {/* Arrière-plan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/70 backdrop-blur-xs"
          />

          {/* Panneau de la modale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            className={cn(
              "relative bg-popover text-popover-foreground ring-1 ring-foreground/10 rounded-xl w-full overflow-hidden",
              maxWidth,
              className
            )}
            role="dialog"
            aria-modal="true"
            onClick={(evenement) => evenement.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 grid place-items-center size-8 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>

            <div className="p-4 sm:p-5">
              {title && (
                <h2 className="text-sm font-medium text-foreground mb-4 pr-10">
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

