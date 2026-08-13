import { Globe } from "lucide-react";
import { ExternalLinkModal } from "./ExternalLinkModal";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectUrl: string;
}

export function DemoModal({ isOpen, onClose, projectTitle, projectUrl }: DemoModalProps) {
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Globe className="size-6 text-accent-texte" />}
      title={projectTitle}
      subtitle="Visiter le site en direct"
      url={projectUrl}
      actionLabel="Lancer"
    />
  );
}
