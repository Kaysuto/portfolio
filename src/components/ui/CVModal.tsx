import React, { useEffect } from 'react';
import { Download } from '@phosphor-icons/react';
import { Button } from './button';
import { Modal } from './Modal';
import { useModal } from '@/hooks/useModal';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl: string;
}

export function CVModal({
  isOpen,
  onClose,
  cvUrl
}: CVModalProps) {
  const { modalMounted, isClosing, openModal, closeModal } = useModal();

  // Synchroniser avec l'état externe
  useEffect(() => {
    if (isOpen && !modalMounted) {
      openModal();
    } else if (!isOpen && modalMounted) {
      closeModal();
    }
  }, [isOpen, modalMounted, openModal, closeModal]);

  const handleClose = () => {
    closeModal();
    // Appeler onClose après l'animation
    setTimeout(() => onClose(), 220);
  };

  const handleDownloadCV = () => {
    window.open(cvUrl, "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!modalMounted) return null;

  return (
    <Modal
      isOpen={modalMounted}
      onClose={handleClose}
      maxWidth="max-w-lg"
      isClosing={isClosing}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Download className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Mon CV</h3>
            <p className="text-sm text-muted-foreground">
              Découvrez mon parcours professionnel
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-md p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
          </p>
          <div className="bg-background border border-border rounded-md p-3">
            <code className="text-sm text-foreground break-all font-mono">
              {cvUrl}
            </code>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleDownloadCV}
            className="flex-1 bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813]"
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger CV
          </Button>
        </div>
      </div>
    </Modal>
  );
}