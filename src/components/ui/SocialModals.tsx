import {
  LinkedinLogo as Linkedin,
  TwitchLogo as Twitch,
  YoutubeLogo as Youtube,
} from "@phosphor-icons/react";
import { ExternalLinkModal } from "./ExternalLinkModal";
import { GitHubModal } from "./GitHubModal";
import { useLangue } from "@/lib/langue";

const URL_LINKEDIN = "https://www.linkedin.com/in/enzo-lauret/";
const URL_YOUTUBE = "https://www.youtube.com/@Kaysuto";
const URL_TWITCH = "https://www.twitch.tv/kaysuto";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Le pied de page ouvre la même modale GitHub que la section Projets. */
export { GitHubModal as GitHubFooterModal };

export function LinkedInFooterModal({ isOpen, onClose }: SocialModalProps) {
  const { t } = useLangue();
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Linkedin className="size-6 text-accent-texte" />}
      title="LinkedIn"
      subtitle={t("Connectons-nous sur LinkedIn", "Let's connect on LinkedIn")}
      url={URL_LINKEDIN}
    />
  );
}

export function YouTubeFooterModal({ isOpen, onClose }: SocialModalProps) {
  const { t } = useLangue();
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Youtube className="size-6 text-accent-texte" />}
      title="YouTube"
      subtitle={t("Mes vidéos et projets en images", "My videos and projects on screen")}
      url={URL_YOUTUBE}
    />
  );
}

export function TwitchFooterModal({ isOpen, onClose }: SocialModalProps) {
  const { t } = useLangue();
  return (
    <ExternalLinkModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Twitch className="size-6 text-accent-texte" />}
      title="Twitch"
      subtitle={t("Mes streams en direct", "My live streams")}
      url={URL_TWITCH}
    />
  );
}
