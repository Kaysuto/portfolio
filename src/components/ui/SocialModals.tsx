import { LinkedinLogo as Linkedin } from "@phosphor-icons/react";
import { ExternalLinkModal } from "./ExternalLinkModal";
import { GitHubModal } from "./GitHubModal";

const URL_LINKEDIN = "https://www.linkedin.com/in/enzo-lauret/";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Le pied de page ouvre la même modale GitHub que la section Projets. */
export { GitHubModal as GitHubFooterModal };

export function LinkedInFooterModal({ isOpen, onClose }: SocialModalProps) {
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Linkedin className="size-5 text-accent-texte" />}
      title="LinkedIn"
      subtitle="Connectons-nous sur LinkedIn"
      url={URL_LINKEDIN}
    />
  );
}
