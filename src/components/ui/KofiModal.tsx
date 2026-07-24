import { Coffee } from "lucide-react";
import { ExternalLinkModal } from "./ExternalLinkModal";

const URL_KOFI = "https://ko-fi.com/kaysuto";

interface KofiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KofiModal({ isOpen, onClose }: KofiModalProps) {
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Coffee className="h-10 w-10 text-accent" />}
      title="Soutenir mon travail"
      subtitle="Offrez-moi un café sur Ko-fi"
      url={URL_KOFI}
      actionLabel="Soutenir"
    />
  );
}
