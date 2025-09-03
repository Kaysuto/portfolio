-- Script de diagnostic et correction RLS pour Supabase
-- Basé sur https://supabase.com/docs/guides/auth/row-level-security

-- =====================================================
-- ÉTAPE 1: DIAGNOSTIC DE LA CONFIGURATION ACTUELLE
-- =====================================================

-- Vérifier l'état RLS sur toutes les tables
SELECT
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Vérifier les policies existantes sur la table projects
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'projects'
ORDER BY policyname;

-- Vérifier les permissions sur la table projects
SELECT
    grantee,
    privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'projects'
ORDER BY grantee, privilege_type;

-- =====================================================
-- ÉTAPE 2: CORRECTIONS SELON LES RÉSULTATS
-- =====================================================

-- SI RLS EST ACTIVÉ SANS POLICIES APPROPRIÉES :
-- Créer une policy pour permettre les lectures publiques
CREATE POLICY "Public read access for projects" ON projects
FOR SELECT
USING (true);

-- SI VOUS VOULEZ DÉSACTIVER RLS COMPLETEMENT :
-- ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- ÉTAPE 3: TESTS DE VALIDATION
-- =====================================================

-- Tester l'accès à la table projects
SELECT COUNT(*) as total_projects FROM projects;

-- Tester avec les permissions actuelles
SELECT * FROM projects LIMIT 1;

-- =====================================================
-- ÉTAPE 4: CONFIGURATION RECOMMANDÉE POUR PROD
-- =====================================================

-- Activer RLS si désactivé
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Créer des policies plus restrictives pour la production
-- DROP POLICY IF EXISTS "Public read access for projects" ON projects;

-- Policy pour lecture publique (anonyme)
-- CREATE POLICY "Anonymous read projects" ON projects
-- FOR SELECT
-- TO anon
-- USING (true);

-- Policy pour lecture authentifiée
-- CREATE POLICY "Authenticated read projects" ON projects
-- FOR SELECT
-- TO authenticated
-- USING (true);

-- =====================================================
-- ÉTAPE 5: MONITORING ET LOGS
-- =====================================================

-- Voir les requêtes récentes sur la table projects
SELECT
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
WHERE query LIKE '%projects%'
ORDER BY total_time DESC
LIMIT 10;
