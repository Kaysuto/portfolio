import { ExternalLinkModal } from "./ExternalLinkModal";

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  techName: string;
  techUrl: string;
  /** Slug simpleicons, utilisé si aucune `iconUrl` n'est fournie. */
  techIcon: string;
  iconUrl?: string;
}

export function TechModal({ isOpen, onClose, techName, techUrl, techIcon, iconUrl }: TechModalProps) {
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={
        <img
          src={iconUrl || `https://cdn.simpleicons.org/${techIcon}`}
          alt={techName}
          className="w-12 h-12 object-contain"
        />
      }
      title={techName}
      subtitle="Visiter le site officiel"
      url={techUrl}
      actionLabel="Visiter"
      linkLabel="Lien officiel :"
    />
  );
}
