import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./button";

interface ExternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Visuel affiché dans la pastille d'en-tête (icône, logo, image…). */
  icon: ReactNode;
  title: string;
  subtitle: string;
  url: string;
  /** Libellé du bouton de confirmation. */
  actionLabel?: string;
  /** Intitulé au-dessus de l'URL. */
  linkLabel?: string;
}

/**
 * Interstitiel de confirmation avant d'ouvrir un lien externe.
 *
 * Toutes les modales de sortie du site (GitHub, LinkedIn, Discord, Ko-fi,
 * démos de projets, sites des technologies) partagent cette présentation :
 * en-tête illustré, URL en clair, puis « Annuler / Ouvrir ».
 */
export function ExternalLinkModal({
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
  url,
  actionLabel = "Ouvrir",
  linkLabel = "Lien externe :",
}: ExternalLinkModalProps) {
  const ouvrirLien = () => {
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 shrink-0 rounded-[1.5rem] bg-accent/10 flex items-center justify-center border border-accent/20 shadow-inner">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-3xl font-bold text-foreground tracking-tight">{title}</h3>
            <p className="text-muted-foreground font-medium">{subtitle}</p>
          </div>
        </div>

        <div className="bg-accent/5 rounded-[1.5rem] p-6 border border-accent/10">
          <p className="text-[10px] text-muted-foreground mb-4 font-bold uppercase tracking-widest">
            {linkLabel}
          </p>
          <div className="bg-background/50 border border-border/50 rounded-xl p-4">
            <code className="text-sm font-bold break-all font-mono text-accent">{url}</code>
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
            onClick={ouvrirLien}
            className="flex-1 h-14 rounded-2xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            {actionLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
