export type Piste = {
  id: string
  titre: string
  /** Facultatif : sans lui, le quai n'affiche que le titre plutôt qu'un tiret. */
  artiste?: string
  /** Fichier servi depuis `public/`, chemin absolu : « /audio/ma-piste.mp3 ». */
  src: string
  /**
   * Pochette optionnelle, dans `public/pochettes/`. Sans elle — ou si le
   * fichier est introuvable — le lecteur dessine le monogramme du titre.
   * Une image carrée d'environ 320 px suffit : elle est affichée en 48 px.
   */
  pochette?: string
  /**
   * Paroles synchronisées, au format LRC, dans `public/lyrics/` :
   *
   *   [00:12.30]Première phrase
   *   [00:16.80]La suivante
   *   [00:21.00]
   *
   * La ligne sans texte marque un silence — sans elle, la phrase précédente
   * resterait affichée pendant tout un pont instrumental. Sans fichier, le
   * panneau n'affiche simplement pas de zone de paroles.
   */
  paroles?: string
}

/**
 * La playlist du lecteur flottant.
 *
 * Les fichiers vivent dans `public/audio/` et sont servis tels quels. Ils sont
 * renommés en minuscules, sans espaces ni crochets : une URL comme
 * `/audio/NEFFEX%20-%20I%20WILL%20FIND%20A%20WAY%20%5BCopyright%20Free%5D.mp3`
 * finit toujours par se faire couper quelque part par un proxy ou un CDN.
 *
 * Aucun de ces fichiers ne portait de tag ID3 : titres et artistes sont donc
 * repris des noms de fichiers d'origine, et aucune pochette n'a pu être
 * extraite. Elles se déposent dans `public/pochettes/`.
 *
 * Les fichiers `.lrc` de `public/lyrics/` viennent de LRCLIB, base de paroles
 * ouverte et gratuite. Ils y ont été récupérés une fois et déposés en local :
 * interroger l'API depuis le navigateur du visiteur enverrait son adresse IP à
 * un tiers, ce qui n'irait pas avec la page « politique de cookies » du site.
 * Trois titres seulement y figurent, et deux d'entre eux sans horodatage.
 *
 * Droits : les deux titres NEFFEX sont publiés « Copyright Free » et demandent
 * un crédit à l'artiste. Les autres sont des œuvres commerciales ordinaires ;
 * les servir depuis kaysuto.fr reste une diffusion publique.
 */
export const PLAYLIST: Piste[] = [
  {
    id: "neffex-i-will-find-a-way",
    titre: "I Will Find a Way",
    artiste: "NEFFEX",
    src: "/audio/neffex-i-will-find-a-way.mp3",
    paroles: "/lyrics/neffex-i-will-find-a-way.lrc",
  },
  {
    id: "neffex-never-coming-back",
    titre: "Never Coming Back",
    artiste: "NEFFEX",
    src: "/audio/neffex-never-coming-back.mp3",
    paroles: "/lyrics/neffex-never-coming-back.lrc",
  },
  {
    id: "gameboyjones-hit-the-jackpot",
    titre: "Hit the Jackpot!",
    artiste: "Gameboy Jones",
    src: "/audio/gameboyjones-hit-the-jackpot.mp3",
  },
  {
    id: "silent-destined",
    titre: "Destined",
    artiste: "S!LENT",
    src: "/audio/silent-destined.mp3",
  },
  {
    id: "aria-byte-suicidal-love",
    titre: "Suicidal Love",
    artiste: "Aria Byte",
    src: "/audio/aria-byte-suicidal-love.mp3",
    paroles: "/lyrics/aria-byte-suicidal-love.lrc",
  },
  {
    id: "aria-byte-idk",
    titre: "iDK",
    artiste: "Aria Byte",
    src: "/audio/aria-byte-idk.mp3",
  },
  {
    id: "auritni-love-me-reckless",
    titre: "love me reckless (Slowed)",
    artiste: "auritni",
    src: "/audio/auritni-love-me-reckless-slowed.mp3",
  },
  {
    id: "drained",
    titre: "Drained",
    artiste: "auritni",
    src: "/audio/drained.mp3",
  },
]
