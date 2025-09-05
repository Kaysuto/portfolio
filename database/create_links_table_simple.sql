-- Script simplifié de création de la table links pour Supabase
-- Portfolio Kimiya - Version compatible tous environnements

-- Créer la table links avec toutes les colonnes nécessaires
CREATE TABLE IF NOT EXISTS public.links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL DEFAULT 'other',
  is_active BOOLEAN DEFAULT true NOT NULL,
  click_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Contrainte pour valider les types
  CONSTRAINT valid_link_type 
    CHECK (type IN ('github', 'live', 'social', 'bio_link', 'other'))
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_links_type ON public.links(type);
CREATE INDEX IF NOT EXISTS idx_links_is_active ON public.links(is_active);
CREATE INDEX IF NOT EXISTS idx_links_created_at ON public.links(created_at);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour auto-update de updated_at
DROP TRIGGER IF EXISTS update_links_updated_at ON public.links;
CREATE TRIGGER update_links_updated_at 
    BEFORE UPDATE ON public.links 
    FOR EACH ROW 
    EXECUTE FUNCTION public.update_updated_at_column();

-- Message de confirmation
SELECT 
    'Table links créée avec succès!' as message,
    COUNT(*) as existing_rows
FROM public.links;
