import { SimpleAdminModal } from "./SimpleAdminModal";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { Button } from "./button";

interface GitHubFooterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubFooterModal({ isOpen, onClose }: GitHubFooterModalProps) {
  return (
    <SimpleAdminModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-accent/10 p-3 rounded-xl">
            <GithubLogo size={24} className="text-accent" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Découvrez mes projets et contributions</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
        </p>
        
        <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
          <code className="text-sm text-foreground break-all font-mono">
            https://github.com/Kaysuto
          </code>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="hover:bg-accent/10"
          >
            Annuler
          </Button>
          <Button 
            onClick={() => {
              window.open("https://github.com/Kaysuto", "_blank", "noopener,noreferrer");
              onClose();
            }}
            className="bg-accent text-[#070201] dark:text-[#221512] hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
          >
            <GithubLogo className="w-4 h-4 mr-2" />
            Ouvrir GitHub
          </Button>
        </div>
      </div>
    </SimpleAdminModal>
  );
}

interface LinkedInFooterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LinkedInFooterModal({ isOpen, onClose }: LinkedInFooterModalProps) {
  return (
    <SimpleAdminModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="bg-accent/10 p-3 rounded-xl">
            <LinkedinLogo size={24} className="text-accent" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Connectons-nous sur LinkedIn</p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
        </p>
        
        <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
          <code className="text-sm text-foreground break-all font-mono">
            https://www.linkedin.com/in/enzo-lauret/
          </code>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="hover:bg-accent/10"
          >
            Annuler
          </Button>
          <Button 
            onClick={() => {
              window.open("https://www.linkedin.com/in/enzo-lauret/", "_blank", "noopener,noreferrer");
              onClose();
            }}
            className="bg-accent text-[#070201] dark:text-[#221512] hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
          >
            <LinkedinLogo className="w-4 h-4 mr-2" />
            Ouvrir LinkedIn
          </Button>
        </div>
      </div>
    </SimpleAdminModal>
  );
}