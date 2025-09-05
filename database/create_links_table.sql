-- Script de création de la table links pour Supabase
-- Portfolio Kimiya - Gestion des liens

-- Supprimer la table si elle existe (optionnel, à décommenter si besoin)
-- DROP TABLE IF EXISTS public.links;

-- Créer la table links
CREATE TABLE IF NOT EXISTS public.links (
  -- Clé primaire UUID avec génération automatique
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informations principales du lien
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  
  -- Type de lien avec contrainte
  type VARCHAR(50) NOT NULL CHECK (type IN ('github', 'live', 'social', 'bio_link', 'other')),
  
  -- État et statistiques
  is_active BOOLEAN DEFAULT true NOT NULL,
  click_count INTEGER DEFAULT 0 NOT NULL,
  
  -- Métadonnées temporelles
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Créer des index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_links_type ON public.links(type);
CREATE INDEX IF NOT EXISTS idx_links_is_active ON public.links(is_active);
CREATE INDEX IF NOT EXISTS idx_links_created_at ON public.links(created_at);

-- Créer un trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_links_updated_at 
    BEFORE UPDATE ON public.links 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Politique RLS (Row Level Security) - optionnel selon vos besoins de sécurité
-- ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique (pour la page bio)
-- CREATE POLICY "Allow public read access" ON public.links
--     FOR SELECT USING (true);

-- Politique pour permettre les modifications depuis l'admin (à adapter selon votre auth)
-- CREATE POLICY "Allow admin full access" ON public.links
--     USING (auth.role() = 'authenticated');

-- Insérer quelques données d'exemple (optionnel)
-- INSERT INTO public.links (title, url, type, description, is_active) VALUES
-- ('GitHub', 'https://github.com/exemple', 'github', 'Mon profil GitHub', true),
-- ('Portfolio', 'https://example.com', 'live', 'Mon site portfolio', true);

-- Vérifier la création de la table (remplace \d par une requête SQL standard)
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'links' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Message de confirmation
SELECT 'Table links créée avec succès!' as status;
