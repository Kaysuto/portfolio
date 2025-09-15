import React from 'react';
import { GithubLogo } from '@phosphor-icons/react';
import { Button } from './button';
import { SimpleAdminModal } from './SimpleAdminModal';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubModal({
  isOpen,
  onClose
}: GitHubModalProps) {
  const handleOpenGitHub = () => {
    window.open("https://github.com/Kaysuto", "_blank", "noopener,noreferrer");
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
            onClick={onClose}
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
    </SimpleAdminModal>
  );
}