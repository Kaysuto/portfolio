-- Script de création de la table maintenance_config pour Supabase
-- Portfolio Kimiya - Configuration de maintenance

-- Créer la table maintenance_config
CREATE TABLE IF NOT EXISTS public.maintenance_config (
  -- Clé primaire UUID avec génération automatique
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Configuration de maintenance
  is_enabled BOOLEAN DEFAULT false NOT NULL,
  title VARCHAR(255) DEFAULT 'Maintenance en cours' NOT NULL,
  message TEXT DEFAULT 'Le site est temporairement en maintenance. Nous reviendrons bientôt.',
  
  -- Planification
  scheduled_start TIMESTAMPTZ,
  scheduled_end TIMESTAMPTZ,
  
  -- Contact
  contact_email VARCHAR(255) DEFAULT 'kaysuto@gmail.com',
  
  -- Métadonnées temporelles
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE public.maintenance_config ENABLE ROW LEVEL SECURITY;

-- Politique permettant la lecture publique
CREATE POLICY "Enable read access for all users" 
ON public.maintenance_config FOR SELECT 
USING (true);

-- Politique permettant l'écriture pour les admins uniquement
CREATE POLICY "Enable write access for admin users" 
ON public.maintenance_config FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);

-- Créer des index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_maintenance_config_enabled ON public.maintenance_config(is_enabled);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE TRIGGER handle_maintenance_config_updated_at
  BEFORE UPDATE ON public.maintenance_config
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insérer la configuration par défaut (une seule entrée)
INSERT INTO public.maintenance_config (is_enabled, title, message) VALUES
(false, 'Maintenance en cours', 'Le site est temporairement en maintenance. Nous reviendrons bientôt.')
ON CONFLICT DO NOTHING;
