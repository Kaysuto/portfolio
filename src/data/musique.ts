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
   *
   * Le lecteur comprend aussi le LRC horodaté au mot, et c'est ce qu'il faut
   * viser : le remplissage karaoké suit alors le chant au lieu de le deviner.
   *
   *   [00:12.30] <00:12.30>Première <00:12.74>phrase<00:13.10>
   *
   * Le dernier repère, sans mot derrière, ferme le vers : sans lui le
   * remplissage s'étire jusqu'au vers suivant, silence compris.
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
 *
 * LRCLIB n'a d'horodatage que pour « Suicidal Love » et « Hit the Jackpot! ».
 * Les deux NEFFEX n'y sont qu'en texte brut, et « Destined », « iDK »,
 * « love me reckless » et « Drained » en sont absents : ne pas s'attendre à un
 * re-téléchargement fructueux tant que la base n'a pas bougé.
 *
 * Les trois autres `.lrc` ont donc été fabriqués en local, sans rien envoyer :
 * la voix est isolée de l'instrumental (Demucs), puis transcrite avec
 * horodatage au mot (Whisper). Pour les NEFFEX, cette transcription ne sert que
 * d'horloge — les mots restent ceux des paroles officielles, recalés dessus par
 * alignement global. Pour « iDK », dont aucune parole n'est publiée nulle part,
 * le texte lui-même vient de la transcription : il est fidèle dans l'ensemble
 * mais comporte forcément des mots mal entendus. À corriger à l'oreille si
 * l'artiste finit par publier ses paroles.
 *
 * Les deux fichiers LRCLIB sont passés par la même chaîne, mais seulement pour
 * gagner le découpage au mot : leurs repères de vers, écrits à la main, valent
 * mieux que l'alignement automatique sur les vers d'un seul mot (« So »,
 * « Suicide », les ad-libs), que celui-ci accroche volontiers à la mauvaise
 * occurrence. Les cinq fichiers portent donc un repère par mot.
 *
 * Exception pour « Hit the Jackpot! » : le fichier LRCLIB avance de 2,81 s sur
 * ce MP3-ci — masterisation différente, et l'écart est constant d'un bout à
 * l'autre (dérive mesurée : 0,09 s sur deux minutes). Ses vers ont donc été
 * décalés d'autant avant d'y superposer les mots. Si le fichier audio est un
 * jour remplacé par une autre version, ce décalage est à remesurer.
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
    paroles: "/lyrics/gameboyjones-hit-the-jackpot.lrc",
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
    paroles: "/lyrics/aria-byte-idk.lrc",
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
