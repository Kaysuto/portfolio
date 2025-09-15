import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
  isClosing?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
  className = "",
  isClosing = false
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className={`relative bg-background border border-border rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-modalSlideOut' : 'animate-modalSlideIn'} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={title ? "p-6" : "p-4"}>
          {title ? (
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
          ) : (
            <div className="flex justify-end mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-7 w-7 p-0 absolute top-3 right-3"
                aria-label="Fermer la modal"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          <div className={title ? "" : "pt-2"}>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}