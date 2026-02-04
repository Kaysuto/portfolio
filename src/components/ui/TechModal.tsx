import { Modal } from "./Modal";
import { ExternalLink, Globe, Zap } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/hooks/use-theme";

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  techName: string;
  techUrl: string;
  techIcon: string;
  iconUrl?: string;
}

export function TechModal({ isOpen, onClose, techName, techUrl, techIcon, iconUrl }: TechModalProps) {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#D3C0B1' : '#C49D84';

  const handleOpenTech = () => {
    window.open(techUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-[1.5rem] bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner p-4">
            <img 
              src={iconUrl || `https://cdn.simpleicons.org/${techIcon}`} 
              alt={techName}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground tracking-tight">{techName}</h3>
            <p className="text-muted-foreground font-medium">
              Consulter la documentation officielle
            </p>
          </div>
        </div>
        
        <div className="bg-accent/5 rounded-[1.5rem] p-6 border border-accent/10">
          <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">
            Lien officiel :
          </p>
          <div className="bg-background/50 border border-border/50 rounded-xl p-4">
            <code className="text-sm font-bold break-all font-mono" style={{ color: accentColor }}>
              {techUrl}
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
            onClick={handleOpenTech} 
            className="flex-1 h-14 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: accentColor, color: 'black' }}
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Visiter
          </Button>
        </div>
      </div>
    </Modal>
  );
}
