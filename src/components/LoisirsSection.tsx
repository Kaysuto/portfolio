import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Check, Copy, ArrowUpRight } from "lucide-react"
import { toast } from "react-hot-toast"
import { TechModal } from "@/components/ui/TechModal"
import { ExternalLinkModal } from "@/components/ui/ExternalLinkModal"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { ANIMES, JEUX, CRYPTO, type Anime, type Loisir, type Parrainage } from "@/data/loisirs"
import { RangeeAffiches } from "@/components/ui/AfficheAnime"
import { useLangue, type Bilingue } from "@/lib/langue"

const icone = (loisir: Loisir) => loisir.iconUrl || `https://cdn.simpleicons.org/${loisir.slug}`

/** Un bloc de la section : l'intertitre et l'argument à gauche, les éléments à droite. */
function Bloc({ titre, texte, children }: { titre: string; texte: Bilingue; children: ReactNode }) {
  const { l } = useLangue()
  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-1 gap-8 border-t border-border/60 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16"
    >
      {/* Sur grand écran, l'argument reste en vue pendant que ses cartes défilent. */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <RailLabel>{titre}</RailLabel>
        <p className="mt-4 text-pretty text-base/relaxed text-muted-foreground md:text-lg/relaxed">{l(texte)}</p>
      </div>
      {children}
    </motion.div>
  )
}

/** Carte d'un jeu ou d'un service : cliquable seulement si elle a un site à ouvrir. */
function CarteLoisir({ loisir, onClic }: { loisir: Loisir; onClic: (loisir: Loisir) => void }) {
  const { l } = useLangue()
  return (
    <li>
      <button
        type="button"
        onClick={() => onClic(loisir)}
        className="group flex h-full w-full gap-4 rounded-xl border border-border bg-card p-4 text-left transition-[border-color,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-accent/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-muted ring-1 ring-foreground/5">
          <img src={icone(loisir)} alt="" aria-hidden="true" loading="lazy" className={`size-6 rounded object-contain ${loisir.sombre ? "dark:brightness-0 dark:invert" : ""}`} />
        </span>
        <span className="min-w-0">
          <span className="flex items-baseline gap-2">
            <span className="font-semibold text-foreground">{loisir.nom}</span>
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-texte"
            />
          </span>
          <span className="mt-0.5 block font-mono text-xs text-accent-texte">{l(loisir.detail)}</span>
          <span className="mt-2 block text-sm/relaxed text-muted-foreground text-pretty">{l(loisir.pourquoi)}</span>
        </span>
      </button>
    </li>
  )
}

/** Code de parrainage : copiable d'un clic, et le lien passe par la même confirmation que tout le site. */
function CarteParrainage({ parrainage, onOuvrir }: { parrainage: Parrainage; onOuvrir: (parrainage: Parrainage) => void }) {
  const { t, l } = useLangue()
  const [copie, setCopie] = useState(false)

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(parrainage.code)
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    } catch {
      toast.error(t("Erreur lors de la copie", "Couldn't copy the code"))
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-accent/40 bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-muted ring-1 ring-foreground/5">
          <img src={parrainage.iconUrl} alt="" aria-hidden="true" loading="lazy" className="size-6 rounded object-contain" />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-foreground">{parrainage.nom}</span>
          <span className="mt-0.5 block font-mono text-xs text-accent-texte">{l(parrainage.detail)}</span>
        </span>
        <span className="ml-auto rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {t("Publicité", "Ad")}
        </span>
      </div>
      <p className="text-sm/relaxed text-muted-foreground text-pretty">{l(parrainage.pourquoi)}</p>
      <p className="text-sm/relaxed text-foreground text-pretty">{l(parrainage.avantage)}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={copier}
          aria-label={t(`Copier le code ${parrainage.code}`, `Copy code ${parrainage.code}`)}
          className="flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 font-mono text-sm text-foreground transition-[background-color,scale] duration-150 hover:bg-muted active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {parrainage.code}
          {copie ? <Check className="size-4 text-success" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        </button>
        {parrainage.url && (
          <button
            type="button"
            onClick={() => onOuvrir(parrainage)}
            className="lien-souligne text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("Ouvrir le lien", "Open the link")}
          </button>
        )}
      </div>
    </div>
  )
}

export function LoisirsSection() {
  const { t, l } = useLangue()
  // Le contenu reste en place pendant la sortie de la modale : seul `ouvert` repasse à faux.
  const [loisir, setLoisir] = useState<Loisir | null>(null)
  const [parrainage, setParrainage] = useState<Parrainage | null>(null)
  const [ouvert, setOuvert] = useState<"loisir" | "parrainage" | "anilist" | "anime" | null>(null)
  const ouvrirLoisir = (choix: Loisir) => { setLoisir(choix); setOuvert("loisir") }
  const [anime, setAnime] = useState<Anime | null>(null)
  const ouvrirAnime = (choix: Anime) => { setAnime(choix); setOuvert("anime") }
  const ouvrirParrainage = (choix: Parrainage) => { setParrainage(choix); setOuvert("parrainage") }

  return (
    <section id="loisirs" className="py-10 lg:py-14 px-6 lg:px-12 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          title={t(<>Hors du <span className="text-accent-texte">code</span></>, <>Off the <span className="text-accent-texte">clock</span></>)}
          lead={t(
            "Ce qui m'occupe quand l'éditeur est fermé, et qui finit souvent par y revenir sous forme de projet.",
            "What keeps me busy once the editor is closed, and often comes back to it as a project."
          )}
        />

        <Bloc titre={t("Animés", "Anime")} texte={ANIMES.texte}>
          <div className="space-y-6">
            <ul className="flex flex-wrap items-center gap-2">
              {ANIMES.chiffres.map(({ valeur, libelle }) => (
                <li
                  key={libelle.fr}
                  className="flex items-baseline gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                >
                  <span className="text-base font-semibold tabular-nums text-foreground">{valeur}</span>
                  {l(libelle)}
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setOuvert("anilist")}
                  className="lien-souligne ml-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("Ma liste sur AniList", "My AniList")}
                </button>
              </li>
            </ul>
            <ul className="grid grid-cols-1 gap-3">
              {ANIMES.genres.map((genre) => (
                <motion.li key={genre.titre.fr} variants={fadeInUp} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-semibold tracking-tight text-foreground">{l(genre.titre)}</p>
                  <p className="mt-2 max-w-[60ch] text-sm/relaxed text-muted-foreground text-pretty">{l(genre.texte)}</p>
                  <RangeeAffiches titres={genre.titres} label={t("Titres préférés", "Favorite titles")} onClic={ouvrirAnime} />
                </motion.li>
              ))}
            </ul>
          </div>
        </Bloc>

        <Bloc titre={t("Jeux vidéo", "Video games")} texte={JEUX.texte}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {JEUX.liste.map((jeu) => (
              <CarteLoisir key={jeu.nom} loisir={jeu} onClic={ouvrirLoisir} />
            ))}
          </ul>
        </Bloc>

        <Bloc titre={t("Crypto", "Crypto")} texte={CRYPTO.texte}>
          <div className="space-y-4">
            <CarteParrainage parrainage={CRYPTO.parrainage} onOuvrir={ouvrirParrainage} />
            <p className="text-xs/relaxed text-muted-foreground text-pretty">{l(CRYPTO.avertissement)}</p>
            <button
              type="button"
              onClick={() => ouvrirAnime(CRYPTO.anime)}
              className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-3 text-left transition-[border-color,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-accent/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={CRYPTO.anime.affiche}
                alt=""
                width={320}
                height={453}
                loading="lazy"
                className="aspect-[2/3] w-16 shrink-0 rounded-md object-cover ring-1 ring-foreground/10"
              />
              <span className="min-w-0">
                <span className="block font-semibold text-foreground">{CRYPTO.anime.nom}</span>
                <span className="mt-1 block text-sm/relaxed text-muted-foreground text-pretty">{l(CRYPTO.anime.texte)}</span>
              </span>
            </button>
          </div>
        </Bloc>
      </motion.div>

      <TechModal
        isOpen={ouvert === "loisir"}
        onClose={() => setOuvert(null)}
        techName={loisir?.nom ?? ""}
        techUrl={loisir?.url ?? ""}
        techIcon={loisir?.slug ?? ""}
        iconUrl={loisir?.iconUrl}
      />
      <TechModal
        isOpen={ouvert === "anilist"}
        onClose={() => setOuvert(null)}
        techName="AniList"
        techUrl={ANIMES.profil}
        techIcon="anilist"
      />
      <ExternalLinkModal
        isOpen={ouvert === "anime"}
        onClose={() => setOuvert(null)}
        icon={<img src={anime?.affiche} alt="" className="size-full rounded-md object-cover" />}
        title={anime?.nom ?? ""}
        subtitle={t("Fiche sur AniList", "AniList page")}
        url={anime ? `https://anilist.co/anime/${anime.idAnilist}` : ""}
      />
      <ExternalLinkModal
        isOpen={ouvert === "parrainage"}
        onClose={() => setOuvert(null)}
        icon={<img src={parrainage?.iconUrl} alt="" className="size-6 object-contain" />}
        title={parrainage?.nom ?? ""}
        subtitle={t("Lien de parrainage", "Referral link")}
        url={parrainage?.url ?? ""}
      />
    </section>
  )
}
