import { Coffee } from "lucide-react";
import { ExternalLinkModal } from "./ExternalLinkModal";
import { useLangue } from "@/lib/langue";

const URL_KOFI = "https://ko-fi.com/kaysuto";

interface KofiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KofiModal({ isOpen, onClose }: KofiModalProps) {
  const { t } = useLangue();
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Coffee className="size-5 text-accent-texte" />}
      title={t("Soutenir mon travail", "Support my work")}
      subtitle={t("Offrez-moi un café sur Ko-fi", "Buy me a coffee on Ko-fi")}
      url={URL_KOFI}
      actionLabel={t("Soutenir", "Support")}
    />
  );
}
