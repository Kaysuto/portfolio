-- Script de test pour vérifier la table links
-- À exécuter après création pour valider l'installation

-- 1. Vérifier que la table existe et sa structure
SELECT 
    'Table links trouvée' as status,
    COUNT(*) as row_count
FROM public.links;

-- 2. Tester l'insertion d'un lien de test
INSERT INTO public.links (title, url, type, description, is_active) 
VALUES ('Test Link', 'https://example.com', 'other', 'Lien de test', true)
RETURNING id, title, type, created_at;

-- 3. Tester la mise à jour (doit déclencher le trigger updated_at)
UPDATE public.links 
SET description = 'Lien de test mis à jour'
WHERE title = 'Test Link'
RETURNING id, title, updated_at;

-- 4. Vérifier les contraintes de type
-- Cette requête doit échouer avec une erreur de contrainte
-- INSERT INTO public.links (title, url, type) VALUES ('Bad Type', 'https://example.com', 'invalid_type');

-- 5. Tester la récupération des liens bio
SELECT 
    id, title, url, type, is_active
FROM public.links 
WHERE type = 'bio_link'
ORDER BY created_at;

-- 6. Nettoyer le lien de test
DELETE FROM public.links WHERE title = 'Test Link';

-- 7. Message final
SELECT 
    'Tests terminés avec succès!' as result,
    'La table est prête pour la migration des liens bio' as next_step;
