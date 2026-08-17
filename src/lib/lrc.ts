export type MotParole = { temps: number; texte: string }

export type LigneParole = {
  temps: number
  texte: string
  /** Instant où le vers cesse d'être chanté, quand le fichier le précise. */
  fin?: number
  /** Découpage horodaté au mot, quand le fichier le porte. */
  mots?: MotParole[]
}

export type Paroles = {
  /** Vrai si le fichier porte des horodatages exploitables. */
  synchronise: boolean
  lignes: LigneParole[]
}

export const AUCUNE_PAROLE: Paroles = { synchronise: false, lignes: [] }

/*
  Un horodatage LRC : [mm:ss], [mm:ss.xx] ou [mm:ss.xxx]. Une même ligne peut en
  porter plusieurs quand un refrain revient — chacun donne alors une entrée.
*/
const MOTIF_HORODATAGE = /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g

/*
  Repère de mot du « enhanced LRC » : <mm:ss.xx> devant chaque mot, plus un
  dernier sans texte qui ferme le vers.

      [00:00.58] <00:00.58>I <00:01.10>wanna <00:01.56>taste<00:02.30>
*/
const MOTIF_MOT = /<(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?>/g

/** Balise de métadonnée LRC : [ar:…], [ti:…], [offset:…], [by:…]… */
const MOTIF_METADONNEE = /^\[[a-z]+:[^\]]*\]$/i

// « .45 » vaut 450 ms, pas 45 : la fraction est complétée à trois chiffres.
const enSecondes = (minutes: string, secondes: string, fraction?: string) =>
  Number(minutes) * 60 + Number(secondes) + (fraction ? Number(fraction.padEnd(3, "0")) / 1000 : 0)

/**
 * Découpe le corps d'un vers en mots horodatés, s'il en porte.
 *
 * Un repère suivi de rien n'est pas un mot vide : c'est la fin du vers. Sans
 * elle, le remplissage du dernier mot s'étirerait jusqu'au vers suivant, silence
 * compris.
 */
function analyserMots(corps: string): Pick<LigneParole, "texte" | "fin" | "mots"> {
  MOTIF_MOT.lastIndex = 0
  const reperes: { temps: number; repere: number; texte: number }[] = []
  let correspondance: RegExpExecArray | null

  while ((correspondance = MOTIF_MOT.exec(corps)) !== null) {
    const [entier, minutes, secondes, fraction] = correspondance
    reperes.push({
      temps: enSecondes(minutes, secondes, fraction),
      repere: correspondance.index,
      texte: correspondance.index + entier.length,
    })
  }

  if (reperes.length === 0) return { texte: corps.trim() }

  const mots: MotParole[] = []
  let fin: number | undefined

  reperes.forEach((repere, rang) => {
    const suivant = reperes[rang + 1]
    const texte = corps.slice(repere.texte, suivant ? suivant.repere : corps.length).trim()
    if (texte) mots.push({ temps: repere.temps, texte })
    else fin = repere.temps
  })

  return { texte: mots.map((mot) => mot.texte).join(" "), fin, mots: mots.length ? mots : undefined }
}

/**
 * Analyse un fichier de paroles, synchronisé ou non.
 *
 * Tous les fournisseurs ne publient pas de version horodatée : LRCLIB sert
 * souvent du texte brut. Aucune piste du site n'est dans ce cas aujourd'hui,
 * mais le repli reste — un `.lrc` déposé à la main sans horloge doit s'afficher
 * en bloc défilant plutôt que de passer pour un fichier cassé.
 *
 * Les lignes vides d'un fichier synchronisé sont conservées : elles marquent
 * les silences, et sans elles la dernière phrase resterait affichée pendant
 * tout un pont instrumental. Dans un texte simple, elles ne servent à rien et
 * sont écartées.
 */
export function analyserParoles(source: string): Paroles {
  const lignes: LigneParole[] = []

  for (const brute of source.split(/\r?\n/)) {
    MOTIF_HORODATAGE.lastIndex = 0
    const horodatages: number[] = []
    let finDesBalises = 0
    let correspondance: RegExpExecArray | null

    while ((correspondance = MOTIF_HORODATAGE.exec(brute)) !== null) {
      const [entier, minutes, secondes, fraction] = correspondance
      horodatages.push(enSecondes(minutes, secondes, fraction))
      finDesBalises = correspondance.index + entier.length
    }

    if (horodatages.length === 0) continue

    const corps = analyserMots(brute.slice(finDesBalises))
    for (const temps of horodatages) lignes.push({ temps, ...corps })
  }

  if (lignes.length > 0) {
    return { synchronise: true, lignes: lignes.sort((a, b) => a.temps - b.temps) }
  }

  const texteSimple = source
    .split(/\r?\n/)
    .map((ligne) => ligne.trim())
    .filter((ligne) => ligne.length > 0 && !MOTIF_METADONNEE.test(ligne))
    .map((texte) => ({ temps: 0, texte }))

  return { synchronise: false, lignes: texteSimple }
}

/** Rang de la ligne en cours à l'instant donné, `-1` avant la première. */
export function indexLigneCourante(lignes: LigneParole[], temps: number): number {
  let courant = -1
  for (let i = 0; i < lignes.length; i++) {
    if (lignes[i].temps > temps) break
    courant = i
  }
  return courant
}

/**
 * Fenêtre de chant de chaque mot du vers, en secondes.
 *
 * Les `.lrc` fabriqués en local portent un horodatage par mot : on le suit tel
 * quel. Ceux de LRCLIB n'ont qu'un repère par vers ; faute de mieux, la durée du
 * vers y est répartie au prorata du nombre de lettres. C'est grossier — jusqu'à
 * deux secondes d'écart sur un vers suivi d'un silence — mais ça vaut mieux
 * qu'un vers qui s'allume d'un bloc.
 */
export function fenetresDesMots(
  lignes: LigneParole[],
  rang: number,
  longueurs: number[],
  finDePiste: number
): Array<[number, number]> {
  const ligne = lignes[rang]
  if (!ligne || longueurs.length === 0) return []

  const finVers = ligne.fin ?? lignes[rang + 1]?.temps ?? finDePiste ?? ligne.temps + 4

  if (ligne.mots && ligne.mots.length === longueurs.length) {
    return ligne.mots.map((mot, i) => [mot.temps, ligne.mots![i + 1]?.temps ?? finVers])
  }

  const duree = Math.max(0.2, finVers - ligne.temps)
  const total = longueurs.reduce((somme, taille) => somme + taille + 1, 0)
  let cumul = 0
  return longueurs.map((taille) => {
    const ouverture = ligne.temps + (cumul / total) * duree
    cumul += taille + 1
    return [ouverture, ligne.temps + (cumul / total) * duree]
  })
}
