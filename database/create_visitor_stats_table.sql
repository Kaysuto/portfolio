-- Script de création de la table visitor_stats pour Supabase
-- Portfolio Kimiya - Statistiques de visiteurs

-- Créer la table visitor_stats
CREATE TABLE IF NOT EXISTS public.visitor_stats (
  -- Clé primaire UUID avec génération automatique
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Date de la statistique (une entrée par jour)
  date DATE NOT NULL UNIQUE,
  
  -- Statistiques journalières
  unique_visitors INTEGER DEFAULT 0 NOT NULL,
  total_page_views INTEGER DEFAULT 0 NOT NULL,
  bounce_rate DECIMAL(5,2) DEFAULT 0.00,
  
  -- Statistiques par page
  home_views INTEGER DEFAULT 0 NOT NULL,
  bio_views INTEGER DEFAULT 0 NOT NULL,
  admin_views INTEGER DEFAULT 0 NOT NULL,
  
  -- Métadonnées temporelles
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

-- Politique permettant la lecture pour les admins uniquement
CREATE POLICY "Enable read access for admin users" 
ON public.visitor_stats FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Politique permettant l'écriture pour les admins uniquement
CREATE POLICY "Enable write access for admin users" 
ON public.visitor_stats FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Créer des index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_visitor_stats_date ON public.visitor_stats(date);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_created_at ON public.visitor_stats(created_at);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE TRIGGER handle_visitor_stats_updated_at
  BEFORE UPDATE ON public.visitor_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insérer quelques données d'exemple pour les derniers jours
INSERT INTO public.visitor_stats (date, unique_visitors, total_page_views, home_views, bio_views, admin_views) VALUES
(CURRENT_DATE - INTERVAL '2 days', 45, 123, 89, 23, 11),
(CURRENT_DATE - INTERVAL '1 day', 52, 145, 102, 28, 15),
(CURRENT_DATE, 38, 98, 71, 18, 9)
ON CONFLICT (date) DO NOTHING;
