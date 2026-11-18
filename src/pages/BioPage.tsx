import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Globe,
  Gamepad2,
  Palette,
  Ghost,
  Paintbrush,
  Link as LinkIcon,
  Tv,
  Film,
  Music,
  Disc
} from 'lucide-react';
import { GithubLogo as Github, TwitchLogo as Twitch } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { ExternalLinkModal } from '@/components/ui/ExternalLinkModal';
import { BioLinksService } from '@/services/bioLinksService';
import { useModal } from '@/hooks/useModal';
import { useSeo } from '@/hooks/useSeo';
import { fadeInUp, staggerContainer, VIEWPORT, EASE_OUT } from '@/lib/animations';
import { useLangue, type Bilingue } from '@/lib/langue';

const MAP_ICONES: Record<string, React.ElementType> = {
  EnvelopeSimple: Mail,
  DiscordLogo: Ghost,
  Globe,
  GameController: Gamepad2,
  Palette,
  SmileyXEyes: Ghost,
  PaintBrush: Paintbrush,
  GithubLogo: Github,
  LinkSimple: LinkIcon,
  Tv,
  Film,
  Music,
  TwitchLogo: Twitch,
  SpotifyLogo: Disc,
};

const LIBELLES_CATEGORIE: Record<string, Bilingue> = {
  websites: { fr: 'Sites Web', en: 'Websites' },
  community: { fr: 'Communauté', en: 'Community' },
  social: { fr: 'Social & Plateformes', en: 'Social & platforms' },
  other: { fr: 'Autres', en: 'Other' },
};

function IconeLien({ nom, className }: { nom: string; className?: string }) {
  const Icone = MAP_ICONES[nom] ?? LinkIcon;
  return <Icone size={22} className={className} aria-hidden="true" />;
}

const BioPage: React.FC = () => {
  const { t, l } = useLangue();
  useSeo({
    title: "Kimiya - Bio",
    description: t(
      "Tous les liens de Kimiya : projets, réseaux sociaux, GitHub, Twitch et créations en un seul endroit.",
      "All of Kimiya's links in one place: projects, social media, GitHub, Twitch and creations."
    ),
    path: "/bio",
    type: "profile",
  });

  const [lienSelectionne, setLienSelectionne] = useState<{ name: string; url: string; description?: Bilingue; icon: string } | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  const liensGroupes = BioLinksService.getGroupedBioLinks();
  const nombreTotal = Object.values(liensGroupes).reduce((total, liens) => total + liens.length, 0);

  return (
    <div className="min-h-screen relative flex flex-col">
      <main className="flex-1 py-24 md:py-32 px-6 lg:px-12 relative z-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button variant="ghost" className="mb-10 text-muted-foreground hover:text-accent-texte">
                <ArrowLeft />
                {t("Retour à l'accueil", "Back to home")}
              </Button>
            </Link>
          </motion.div>

          {/* En-tête aligné à gauche, avec compteur en marge */}
          <motion.header
            className="relative flex flex-col items-start gap-4 pb-14 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="relative flex flex-col items-start">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-accent-texte mb-5">
                Bio
              </p>
              <h1 className="overflow-hidden pb-2 -mb-2 text-6xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-8xl">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
                >
                  {t(
                    <>Mes <span className="text-accent-texte">Liens</span></>,
                    <>My <span className="text-accent-texte">Links</span></>
                  )}
                </motion.span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t(
                  "Retrouvez-moi sur mes différentes plateformes et projets.",
                  "Find me across my platforms and projects."
                )}
              </p>
            </div>
            <p
              className="texte-contour pointer-events-none absolute -top-6 right-0 select-none text-[8rem] font-semibold leading-none tracking-[-0.06em] tabular-nums md:text-[13rem]"
              title={t(`${nombreTotal} liens`, `${nombreTotal} links`)}
            >
              {String(nombreTotal).padStart(2, '0')}
            </p>
          </motion.header>

          {/* Une catégorie par bande, intertitre centré au-dessus des liens */}
          <div>
            {Object.entries(liensGroupes).map(([categorie, liens]) => (
              <motion.section
                key={categorie}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="grid gap-6 border-t border-border/60 py-12 md:grid-cols-[13rem_1fr] md:gap-12"
              >
                <h2 className="flex items-center gap-3 self-start font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground md:sticky md:top-28">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  {LIBELLES_CATEGORIE[categorie] ? l(LIBELLES_CATEGORIE[categorie]) : categorie}
                </h2>

                <ul className="w-full min-w-0 divide-y divide-border/40">
                  {liens.map((lien) => (
                    <motion.li
                      key={lien.id}
                      variants={fadeInUp}
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <button
                        onClick={() => {
                          setLienSelectionne({
                            name: lien.title,
                            url: lien.url,
                            description: lien.description,
                            icon: lien.icon || 'LinkSimple',
                          });
                          openModal();
                        }}
                        className="group w-full flex items-center gap-4 py-4 text-left hover:bg-muted rounded-md px-2 -mx-2 transition-colors"
                      >
                        <span className="text-accent-texte shrink-0 group-hover:scale-110 transition-transform">
                          <IconeLien nom={lien.icon || 'LinkSimple'} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-base font-medium text-foreground group-hover:text-accent-texte transition-colors truncate">
                            {lien.title}
                          </span>
                          <span className="block text-sm text-muted-foreground truncate">
                            {lien.description && l(lien.description)}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="size-4 text-muted-foreground/50 group-hover:text-accent-texte group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                          aria-hidden="true"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>
        </div>
      </main>

      {lienSelectionne && (
        <ExternalLinkModal
          isOpen={isModalOpen}
          onClose={closeModal}
          icon={<IconeLien nom={lienSelectionne.icon} className="text-accent-texte" />}
          title={lienSelectionne.name}
          subtitle={lienSelectionne.description ? l(lienSelectionne.description) : ''}
          url={lienSelectionne.url}
        />
      )}
    </div>
  );
};

export default BioPage;
