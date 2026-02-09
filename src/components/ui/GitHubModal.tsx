import { Modal } from "./Modal";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/hooks/use-theme";

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubModal({ isOpen, onClose }: GitHubModalProps) {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#D3C0B1' : '#C49D84';

  const handleOpenGitHub = () => {
    window.open("https://github.com/Kaysuto", "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-[1.5rem] bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
            <Github className="h-10 w-10 text-accent" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground tracking-tight">GitHub</h3>
            <p className="text-muted-foreground font-medium">
              Découvrez tous mes projets open source
            </p>
          </div>
        </div>
        
        <div className="bg-accent/5 rounded-[1.5rem] p-6 border border-accent/10">
          <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">
            Lien externe :
          </p>
          <div className="bg-background/50 border border-border/50 rounded-xl p-4">
            <code className="text-sm font-bold break-all font-mono" style={{ color: accentColor }}>
              https://github.com/Kaysuto
            </code>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button 
            type="button"
            variant="outline" 
            onClick={onClose}
            className="flex-1 h-14 rounded-2xl border-border/50 hover:bg-accent/5 font-bold text-base"
          >
            Annuler
          </Button>
          <Button 
            type="button"
            onClick={handleOpenGitHub} 
            className="flex-1 h-14 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: accentColor, color: 'black' }}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Ouvrir
          </Button>
        </div>
      </div>
    </Modal>
  );
}
