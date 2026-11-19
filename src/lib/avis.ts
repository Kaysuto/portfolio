/**
 * Avis des visiteurs : une note de 1 à 5, stockée dans Supabase.
 *
 * Appels directs à l'API REST de Supabase avec la clé publique : pas de
 * dépendance à ajouter, et la sécurité est portée par la base (table en
 * insertion seule, moyenne servie par une fonction, voir `supabase/avis.sql`).
 */

const URL_SUPABASE = import.meta.env.VITE_SUPABASE_URL as string | undefined
const CLE_PUBLIQUE = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** Sans configuration Supabase (build local sans `.env`), le bloc d'avis ne s'affiche pas. */
export const avisDisponibles = Boolean(URL_SUPABASE && CLE_PUBLIQUE)

const entetes = () => ({
  apikey: CLE_PUBLIQUE ?? "",
  Authorization: `Bearer ${CLE_PUBLIQUE ?? ""}`,
  "Content-Type": "application/json",
})

export type ResumeAvis = { moyenne: number; total: number }

export async function lireResumeAvis(): Promise<ResumeAvis | null> {
  if (!avisDisponibles) return null
  const reponse = await fetch(`${URL_SUPABASE}/rest/v1/rpc/resume_avis`, { method: "POST", headers: entetes(), body: "{}" })
  if (!reponse.ok) return null
  const [ligne] = (await reponse.json()) as Array<{ moyenne: number | string | null; total: number | string }>
  const total = Number(ligne?.total ?? 0)
  return total > 0 ? { moyenne: Number(ligne.moyenne), total } : { moyenne: 0, total: 0 }
}

export async function envoyerAvis(note: number): Promise<boolean> {
  if (!avisDisponibles || !Number.isInteger(note) || note < 1 || note > 5) return false
  const reponse = await fetch(`${URL_SUPABASE}/rest/v1/avis`, {
    method: "POST",
    headers: { ...entetes(), Prefer: "return=minimal" },
    body: JSON.stringify({ note }),
  })
  return reponse.ok
}

/**
 * Note déjà donnée depuis ce navigateur, pour ne pas voter deux fois.
 * shortcut: limite par navigateur seulement (contournable en vidant le stockage) ;
 * passer par une fonction serveur avec limite par IP si des votes en masse apparaissent.
 */
const CLE_STOCKAGE = "kimiya-avis"

export function noteDejaDonnee(): number | null {
  try {
    const valeur = Number(localStorage.getItem(CLE_STOCKAGE))
    return valeur >= 1 && valeur <= 5 ? valeur : null
  } catch {
    return null
  }
}

export function memoriserNote(note: number) {
  try {
    localStorage.setItem(CLE_STOCKAGE, String(note))
  } catch {
    // Sans stockage, le visiteur pourra revoter : sans gravité.
  }
}
