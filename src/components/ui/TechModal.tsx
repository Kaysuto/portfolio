import { ExternalLinkModal } from "./ExternalLinkModal";
import { useLangue } from "@/lib/langue";

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
  const { t } = useLangue();
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={
        <img
          src={iconUrl || `https://cdn.simpleicons.org/${techIcon}`}
          alt={techName}
          className="size-6 object-contain"
        />
      }
      title={techName}
      subtitle={t("Visiter le site officiel", "Visit the official website")}
      url={techUrl}
      actionLabel={t("Visiter", "Visit")}
      linkLabel={t("Lien officiel :", "Official link:")}
    />
  );
}
