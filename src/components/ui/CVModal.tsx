import React from 'react';
import { Download } from '@phosphor-icons/react';
import { Button } from './button';
import { SimpleAdminModal } from './SimpleAdminModal';

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
  const handleDownloadCV = () => {
    window.open(cvUrl, "_blank", "noopener,noreferrer");
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
            <Download className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Mon CV</h3>
          </div>
        </div>

        <div className="bg-muted/50 rounded-md p-4">
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
    </SimpleAdminModal>
  );
}