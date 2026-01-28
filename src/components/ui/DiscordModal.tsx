import { Modal } from "./Modal";
import { ExternalLink } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/hooks/use-theme";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.157 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
)

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscordModal({ isOpen, onClose }: DiscordModalProps) {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#D3C0B1' : '#C49D84';

  const handleOpenDiscord = () => {
    window.open("https://discord.gg/4fk7jZvKKw", "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-[1.5rem] bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
            <DiscordIcon className="h-10 w-10 text-accent" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground tracking-tight">Discord</h3>
            <p className="text-muted-foreground font-medium">
              Rejoignez ma communauté d'échange
            </p>
          </div>
        </div>
        
        <div className="bg-accent/5 rounded-[1.5rem] p-6 border border-accent/10">
          <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">
            Lien externe :
          </p>
          <div className="bg-background/50 border border-border/50 rounded-xl p-4">
            <code className="text-sm font-bold break-all font-mono" style={{ color: accentColor }}>
              https://discord.gg/4fk7jZvKKw
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
            onClick={handleOpenDiscord} 
            className="flex-1 h-14 rounded-2xl font-bold text-base shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
