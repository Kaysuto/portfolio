import { Modal } from "./Modal";
import { Download, FileText } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "@/hooks/use-theme";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl: string;
}

export function CVModal({ isOpen, onClose, cvUrl }: CVModalProps) {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#D3C0B1' : '#C49D84';

  const handleDownloadCV = () => {
    window.open(cvUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-[1.5rem] bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
            <FileText className="h-10 w-10 text-accent" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground tracking-tight">Curriculum Vitae</h3>
            <p className="text-muted-foreground font-medium">
              Consulter ou télécharger mon parcours
            </p>
          </div>
        </div>
        
        <div className="bg-accent/5 rounded-[1.5rem] p-6 border border-accent/10">
          <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">
            Document :
          </p>
          <div className="bg-background/50 border border-border/50 rounded-xl p-4">
            <code className="text-sm font-bold break-all font-mono" style={{ color: accentColor }}>
              CV_Kimiya_Kaysuto.pdf
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
            onClick={handleDownloadCV} 
            className="flex-1 h-14 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: accentColor, color: 'black' }}
          >
            <Download className="h-5 w-5 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>
    </Modal>
  );
}
