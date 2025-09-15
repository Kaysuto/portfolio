import React from 'react';
import { ArrowSquareOut } from '@phosphor-icons/react';
import { Button } from './button';
import { SimpleAdminModal } from './SimpleAdminModal';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectUrl: string;
}

export function DemoModal({
  isOpen,
  onClose,
  projectTitle,
  projectUrl
}: DemoModalProps) {
  const handleOpenDemo = () => {
    window.open(projectUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <SimpleAdminModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <ArrowSquareOut className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{projectTitle}</h3>
            <p className="text-sm text-muted-foreground">
              Accédez au projet en ligne
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-md p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
          </p>
          <div className="bg-background border border-border rounded-md p-3">
            <code className="text-sm text-foreground break-all font-mono">
              {projectUrl}
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
            onClick={handleOpenDemo}
            className="flex-1 bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813]"
          >
            <ArrowSquareOut className="h-4 w-4 mr-2" />
            Voir le projet
          </Button>
        </div>
      </div>
    </SimpleAdminModal>
  );
}