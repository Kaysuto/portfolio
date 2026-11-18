import { Globe } from "lucide-react";
import { ExternalLinkModal } from "./ExternalLinkModal";
import { useLangue } from "@/lib/langue";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectUrl: string;
}

export function DemoModal({ isOpen, onClose, projectTitle, projectUrl }: DemoModalProps) {
  const { t } = useLangue();
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Globe className="size-6 text-accent-texte" />}
      title={projectTitle}
      subtitle={t("Visiter le site en direct", "Visit the live site")}
      url={projectUrl}
      actionLabel={t("Lancer", "Launch")}
    />
  );
}
