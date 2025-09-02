import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getProjects() {
  try {
    // Évite les requêtes non sécurisées qui font échouer Lighthouse en local
    if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
      if (import.meta.env.DEV) {
        console.warn('[Supabase] URL non sécurisée détectée, fetch ignoré pour éviter le mixed content:', supabaseUrl)
      }
      return []
    }
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    return data;
  } catch (err: any) {
    // Fournir un message d'erreur plus explicite pour les erreurs réseau (ex: CORS / URL incorrecte)
    const message = err?.message || String(err);
    const hint = `Vérifiez VITE_SUPABASE_URL dans .env (actuellement: ${supabaseUrl}) et assurez-vous que le service Supabase est joignable et que les règles CORS autorisent l'origine de l'application.`;
    const wrapped = new Error(`Supabase error: ${message} — ${hint}`);
  // Pour debug côté front, conserver le message original dans la propriété cause si possible.
  (wrapped as any).cause = err;
  throw wrapped;
  }
}
