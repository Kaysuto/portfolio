export type LigneParole = { temps: number; texte: string }

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

/** Balise de métadonnée LRC : [ar:…], [ti:…], [offset:…], [by:…]… */
const MOTIF_METADONNEE = /^\[[a-z]+:[^\]]*\]$/i

/**
 * Analyse un fichier de paroles, synchronisé ou non.
 *
 * Tous les fournisseurs ne publient pas de version horodatée — LRCLIB, par
 * exemple, n'a que du texte brut pour les deux titres NEFFEX. Plutôt que de
 * rendre un tableau vide et de faire croire à un fichier cassé, on retombe sur
 * le texte simple, que le lecteur affiche en bloc défilant.
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
      // « .45 » vaut 450 ms, pas 45 : la fraction est complétée à trois chiffres.
      const millisecondes = fraction ? Number(fraction.padEnd(3, "0")) / 1000 : 0
      horodatages.push(Number(minutes) * 60 + Number(secondes) + millisecondes)
      finDesBalises = correspondance.index + entier.length
    }

    if (horodatages.length === 0) continue

    const texte = brute.slice(finDesBalises).trim()
    for (const temps of horodatages) lignes.push({ temps, texte })
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
