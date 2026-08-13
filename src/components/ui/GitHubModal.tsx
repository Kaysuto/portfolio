import { GithubLogo as Github } from "@phosphor-icons/react";
import { ExternalLinkModal } from "./ExternalLinkModal";

const URL_GITHUB = "https://github.com/Kaysuto";

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubModal({ isOpen, onClose }: GitHubModalProps) {
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Github className="size-6 text-accent-texte" />}
      title="GitHub"
      subtitle="Découvrez tous mes projets open source"
      url={URL_GITHUB}
    />
  );
}
