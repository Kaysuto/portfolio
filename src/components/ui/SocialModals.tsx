import { Modal } from "./Modal";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Button } from "./button";
import { useModal } from "@/hooks/useModal";
import { useEffect } from "react";

interface GitHubFooterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubFooterModal({ isOpen, onClose }: GitHubFooterModalProps) {
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

  const handleOpenGitHub = () => {
    window.open("https://github.com/Kaysuto", "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!modalMounted) return null;

  return (
    <Modal isOpen={modalMounted} onClose={handleClose} maxWidth="max-w-lg" isClosing={isClosing}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <GithubLogo className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium">@Kaysuto</h3>
            <p className="text-sm text-muted-foreground">
              Découvrez tous mes projets open source
            </p>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-md p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
          </p>
          <div className="bg-background border border-border rounded-md p-3">
            <code className="text-sm text-foreground break-all font-mono">
              https://github.com/Kaysuto
            </code>
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button 
            type="button"
            variant="outline" 
            onClick={handleClose}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button 
            type="button"
            onClick={handleOpenGitHub}
            className="flex-1 bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813]"
          >
            <GithubLogo className="h-4 w-4 mr-2" />
            Voir sur GitHub
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface LinkedInFooterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LinkedInFooterModal({ isOpen, onClose }: LinkedInFooterModalProps) {
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

  const handleOpenLinkedIn = () => {
    window.open("https://www.linkedin.com/in/enzo-lauret/", "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!modalMounted) return null;

  return (
    <Modal isOpen={modalMounted} onClose={handleClose} maxWidth="max-w-lg" isClosing={isClosing}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <LinkedinLogo className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Enzo Lauret</h3>
            <p className="text-sm text-muted-foreground">
              Connectons-nous sur LinkedIn
            </p>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-md p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
          </p>
          <div className="bg-background border border-border rounded-md p-3">
            <code className="text-sm text-foreground break-all font-mono">
              https://www.linkedin.com/in/enzo-lauret/
            </code>
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button 
            type="button"
            variant="outline" 
            onClick={handleClose}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button 
            type="button"
            onClick={handleOpenLinkedIn}
            className="flex-1 bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813]"
          >
            <LinkedinLogo className="h-4 w-4 mr-2" />
            Voir sur LinkedIn
          </Button>
        </div>
      </div>
    </Modal>
  );
}