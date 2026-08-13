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
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-12 shrink-0 rounded-md bg-muted flex items-center justify-center">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-medium text-foreground tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-muted-foreground mb-2 font-medium uppercase tracking-[0.2em]">
            {linkLabel}
          </p>
          <div className="bg-input/20 dark:bg-input/30 border border-input rounded-md px-3 py-2">
            <code className="text-sm break-all font-mono text-accent-texte">{url}</code>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-10">
            Annuler
          </Button>
          <Button
            type="button"
            onClick={ouvrirLien}
            className="flex-1 h-10"
          >
            <ExternalLink />
            {actionLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
