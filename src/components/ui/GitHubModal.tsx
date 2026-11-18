import { GithubLogo as Github } from "@phosphor-icons/react";
import { ExternalLinkModal } from "./ExternalLinkModal";
import { useLangue } from "@/lib/langue";

const URL_GITHUB = "https://github.com/Kaysuto";

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubModal({ isOpen, onClose }: GitHubModalProps) {
  const { t } = useLangue();
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Github className="size-6 text-accent-texte" />}
      title="GitHub"
      subtitle={t("Découvrez tous mes projets open source", "Explore all my open source projects")}
      url={URL_GITHUB}
    />
  );
}
