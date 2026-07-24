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
import { Sticker } from '@/components/ui/Sticker';
import { BioLinksService } from '@/services/bioLinksService';
import { useModal } from '@/hooks/useModal';
import { useSeo } from '@/hooks/useSeo';
import { fadeInUp, staggerContainer, VIEWPORT } from '@/lib/animations';

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

const LIBELLES_CATEGORIE: Record<string, string> = {
  websites: 'Sites Web',
  community: 'Communauté',
  social: 'Social & Plateformes',
  other: 'Autres',
};

function IconeLien({ nom, className }: { nom: string; className?: string }) {
  const Icone = MAP_ICONES[nom] ?? LinkIcon;
  return <Icone size={22} className={className} aria-hidden="true" />;
}

const BioPage: React.FC = () => {
  useSeo({
    title: "Kimiya - Bio",
    description: "Tous les liens de Kimiya : projets, réseaux sociaux, GitHub, Twitch et créations en un seul endroit.",
    path: "/bio",
    type: "profile",
  });

  const [lienSelectionne, setLienSelectionne] = useState<{ name: string; url: string; description: string; icon: string } | null>(null);
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
              <Button variant="ghost" className="mb-10 gap-2 hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors">
                <ArrowLeft size={18} />
                Retour à l'accueil
              </Button>
            </Link>
          </motion.div>

          {/* En-tête aligné à gauche, avec compteur en marge */}
          <motion.header
            className="flex flex-wrap items-end justify-between gap-6 pb-10 mb-4 border-b border-border/60"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
                Bio
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                Mes <span className="text-accent">Liens</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium max-w-xl">
                Retrouvez-moi sur mes différentes plateformes et projets.
              </p>
            </div>
            <div className="flex items-end gap-5">
              <Sticker name="dodo" size={128} className="hidden sm:block" />
              <p className="text-5xl font-bold text-accent/25 tabular-nums leading-none">
                {String(nombreTotal).padStart(2, '0')}
              </p>
            </div>
          </motion.header>

          {/* Une catégorie par bande, étiquette collante à gauche */}
          <div className="divide-y divide-border/60">
            {Object.entries(liensGroupes).map(([categorie, liens]) => (
              <motion.section
                key={categorie}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="grid lg:grid-cols-12 gap-x-10 gap-y-5 py-10"
              >
                <div className="lg:col-span-3">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground lg:sticky lg:top-28">
                    {LIBELLES_CATEGORIE[categorie] || categorie}
                  </h2>
                </div>

                <ul className="lg:col-span-9 divide-y divide-border/40">
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
                            description: lien.description || '',
                            icon: lien.icon || 'LinkSimple',
                          });
                          openModal();
                        }}
                        className="group w-full flex items-center gap-5 py-4 text-left hover:bg-accent/[0.04] rounded-xl px-3 -mx-3 transition-colors"
                      >
                        <span className="text-accent shrink-0 group-hover:scale-110 transition-transform">
                          <IconeLien nom={lien.icon || 'LinkSimple'} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold text-base text-foreground group-hover:text-accent transition-colors truncate">
                            {lien.title}
                          </span>
                          <span className="block text-sm text-muted-foreground truncate">
                            {lien.description}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
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
          icon={<IconeLien nom={lienSelectionne.icon} className="text-accent" />}
          title={lienSelectionne.name}
          subtitle={lienSelectionne.description}
          url={lienSelectionne.url}
        />
      )}
    </div>
  );
};

export default BioPage;
