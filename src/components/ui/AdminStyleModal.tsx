import React, { useEffect, useRef } from 'react';
import { X } from '@phosphor-icons/react';
import { Button } from './button';
import { ModalPortal } from './ModalPortal';

interface AdminStyleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  isClosing?: boolean;
}

export function AdminStyleModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  className = "",
  isClosing = false
}: AdminStyleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const savedScrollY = useRef<number>(0);
  const isModalMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !isModalMounted.current) {
      // Modal s'ouvre - sauvegarder la position et bloquer le scroll
      isModalMounted.current = true;
      previousActiveElement.current = document.activeElement as HTMLElement;
      savedScrollY.current = window.scrollY;
      
      const body = document.body;
      
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${savedScrollY.current}px`;
      body.style.width = '100%';
      body.classList.add('modal-open');
      
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Effet séparé pour la fermeture avec gestion de l'animation
  useEffect(() => {
    if (!isOpen && isModalMounted.current) {
      // Attendre la fin de l'animation avant de restaurer
      const restoreScroll = () => {
        isModalMounted.current = false;
        
        const body = document.body;
        
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.classList.remove('modal-open');
        
        // Restaurer la position de scroll sans animation pour éviter les sauts
        setTimeout(() => {
          window.scrollTo({
            top: savedScrollY.current,
            behavior: 'instant'
          });
        }, 50); // Petit délai pour s'assurer que les styles sont appliqués
        
        setTimeout(() => {
          if (previousActiveElement.current) {
            try {
              previousActiveElement.current.focus();
            } catch (e) {
              // Ignorer les erreurs de focus
            }
          }
        }, 150);
      };

      // Si en cours de fermeture, attendre la fin de l'animation
      if (isClosing) {
        setTimeout(restoreScroll, 320); // Un peu plus long que l'animation (300ms)
      } else {
        restoreScroll();
      }
    }
  }, [isOpen, isClosing]);

  // Gestion des événements clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div 
        className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${
          isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
        }`}
        onClick={handleOverlayClick}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div 
          ref={modalRef}
          className={`relative bg-background border border-border rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto ${
            isClosing ? 'animate-modalSlideOut' : 'animate-modalSlideIn'
          } ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 id="modal-title" className="text-xl font-semibold">
                {title}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                aria-label="Fermer la modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}