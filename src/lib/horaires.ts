/**
 * Le poste de Kimiya passe en horaires de nuit à cette date : 21:00 → 05:00 au
 * lieu de 08:00 → 17:00. La frise de la section « À propos » et la
 * description JSON-LD racontent cette journée, et doivent basculer ensemble.
 *
 * Une date écrite en ISO plutôt qu'un objet `Date` : c'est la journée de Kimiya
 * que le site raconte, pas celle du visiteur, donc la comparaison doit se faire
 * sur la date parisienne. Deux chaînes ISO se comparent lexicographiquement,
 * sans arithmétique de fuseau ni décalage d'un jour selon d'où l'on regarde.
 */
export const BASCULE_POSTE_DE_NUIT = '2026-09-14'

/** La date du jour à Paris, au format `AAAA-MM-JJ`. `fr-CA` est le seul locale
 *  courant dont le format court est déjà l'ISO. */
export function dateAParis(maintenant = new Date()) {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris' }).format(maintenant)
}

/** Vrai à partir du jour où le poste passe de nuit. */
export function enPosteDeNuit(maintenant = new Date()) {
  return dateAParis(maintenant) >= BASCULE_POSTE_DE_NUIT
}
