# Configuration Supabase Self-Hosting - Solution Complète
# Basé sur https://supabase.com/docs/guides/self-hosting/docker

## 🔍 DIAGNOSTIC CONFIRMÉ
✅ Les deux endpoints Supabase fonctionnent parfaitement
✅ Les données sont accessibles (3 projets trouvés)
✅ Les headers CORS sont correctement configurés
❌ Le problème vient de la configuration côté client

## 🛠️ SOLUTIONS À APPLIQUER

### 1. Configuration RLS (Row Level Security)
Si RLS est activé sur la table `projects`, il faut soit :
- Désactiver RLS pour les lectures publiques
- Créer une policy qui autorise les lectures anonymes

### 2. Configuration du Proxy Vite
Le proxy doit transmettre tous les headers d'authentification.

### 3. Headers d'authentification côté client
S'assurer que les requêtes incluent :
- `apikey`: Clé d'API publique
- `Authorization`: Bearer token

## 📋 SCRIPTS DE CORRECTION

### Script SQL pour vérifier/corriger RLS
```sql
-- Vérifier si RLS est activé
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'projects';

-- Si RLS est activé, créer une policy pour les lectures publiques
CREATE POLICY "Public read access for projects" ON projects
FOR SELECT USING (true);

-- Ou désactiver RLS complètement (⚠️ à utiliser avec précaution)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
```

### Configuration alternative du client Supabase
```typescript
// Configuration avec gestion d'erreurs améliorée
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  }
});
```

## 🚀 PROCHAINES ÉTAPES

1. **Vérifier les règles RLS** dans votre dashboard Supabase
2. **Tester avec un client direct** (sans proxy) pour confirmer
3. **Corriger la configuration** selon les résultats

## 📚 RESSOURCES
- [Documentation Self-Hosting](https://supabase.com/docs/guides/self-hosting/docker)
- [Guide RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Configuration CORS](https://supabase.com/docs/guides/api/cors)
