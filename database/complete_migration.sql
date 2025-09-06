-- Script de migration complète pour la base de données Supabase
-- Portfolio Kimiya - Création de toutes les tables nécessaires

-- ÉTAPE 1: Créer la fonction handle_updated_at si elle n'existe pas
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ÉTAPE 2: Créer la table profiles (doit être créée en premier pour les références)
-- Inclure le contenu de create_profiles_table.sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nickname VARCHAR(100),
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL,
  preferences JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politiques pour profiles (supprimer d'abord si elles existent)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
CREATE POLICY "Enable insert for authenticated users" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Index pour profiles
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Fonction pour créer automatiquement un profil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nickname, role, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1)),
    'user',
    CASE 
      WHEN NEW.email = 'kaysuto@gmail.com' THEN true 
      ELSE false 
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour profiles
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insérer profil admin existant
INSERT INTO public.profiles (id, email, nickname, role, is_admin)
SELECT id, email, 'Kimiya', 'admin', true
FROM auth.users 
WHERE email = 'kaysuto@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  is_admin = true,
  role = 'admin',
  nickname = EXCLUDED.nickname,
  updated_at = NOW();

-- ÉTAPE 3: Créer les autres tables

-- Table links (déjà créée - vérifier qu'elle existe)
CREATE TABLE IF NOT EXISTS public.links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL CHECK (type IN ('github', 'live', 'social', 'bio_link', 'other')),
  is_active BOOLEAN DEFAULT true NOT NULL,
  click_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Politiques pour links
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.links;
CREATE POLICY "Enable read access for all users" ON public.links FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable write access for admin users" ON public.links;
CREATE POLICY "Enable write access for admin users" ON public.links FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Index pour links
CREATE INDEX IF NOT EXISTS idx_links_type ON public.links(type);
CREATE INDEX IF NOT EXISTS idx_links_active ON public.links(is_active);

-- Trigger pour links
CREATE OR REPLACE TRIGGER handle_links_updated_at
  BEFORE UPDATE ON public.links
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Table visitor_stats
CREATE TABLE IF NOT EXISTS public.visitor_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  unique_visitors INTEGER DEFAULT 0 NOT NULL,
  total_page_views INTEGER DEFAULT 0 NOT NULL,
  bounce_rate DECIMAL(5,2) DEFAULT 0.00,
  home_views INTEGER DEFAULT 0 NOT NULL,
  bio_views INTEGER DEFAULT 0 NOT NULL,
  admin_views INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Ajouter les colonnes manquantes si elles n'existent pas (pour une table existante)
DO $$ 
BEGIN
    -- Ajouter unique_visitors si elle n'existe pas
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='visitor_stats' AND column_name='unique_visitors') THEN
        ALTER TABLE public.visitor_stats ADD COLUMN unique_visitors INTEGER DEFAULT 0 NOT NULL;
    END IF;
    
    -- Ajouter total_page_views si elle n'existe pas
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='visitor_stats' AND column_name='total_page_views') THEN
        ALTER TABLE public.visitor_stats ADD COLUMN total_page_views INTEGER DEFAULT 0 NOT NULL;
    END IF;
    
    -- Ajouter bounce_rate si elle n'existe pas
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='visitor_stats' AND column_name='bounce_rate') THEN
        ALTER TABLE public.visitor_stats ADD COLUMN bounce_rate DECIMAL(5,2) DEFAULT 0.00;
    END IF;
    
    -- Ajouter home_views si elle n'existe pas
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='visitor_stats' AND column_name='home_views') THEN
        ALTER TABLE public.visitor_stats ADD COLUMN home_views INTEGER DEFAULT 0 NOT NULL;
    END IF;
    
    -- Ajouter bio_views si elle n'existe pas
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='visitor_stats' AND column_name='bio_views') THEN
        ALTER TABLE public.visitor_stats ADD COLUMN bio_views INTEGER DEFAULT 0 NOT NULL;
    END IF;
    
    -- Ajouter admin_views si elle n'existe pas
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='visitor_stats' AND column_name='admin_views') THEN
        ALTER TABLE public.visitor_stats ADD COLUMN admin_views INTEGER DEFAULT 0 NOT NULL;
    END IF;
    
    -- Ajouter la contrainte UNIQUE sur date si elle n'existe pas
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name='visitor_stats' AND constraint_type='UNIQUE' 
        AND constraint_name LIKE '%date%'
    ) THEN
        ALTER TABLE public.visitor_stats ADD CONSTRAINT visitor_stats_date_unique UNIQUE (date);
    END IF;
END $$;

-- Politiques pour visitor_stats
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for admin users" ON public.visitor_stats;
CREATE POLICY "Enable read access for admin users" ON public.visitor_stats FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

DROP POLICY IF EXISTS "Enable write access for admin users" ON public.visitor_stats;
CREATE POLICY "Enable write access for admin users" ON public.visitor_stats FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Index pour visitor_stats
CREATE INDEX IF NOT EXISTS idx_visitor_stats_date ON public.visitor_stats(date);

-- Trigger pour visitor_stats
CREATE OR REPLACE TRIGGER handle_visitor_stats_updated_at
  BEFORE UPDATE ON public.visitor_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Données d'exemple pour visitor_stats (insertion sécurisée)
DO $$
BEGIN
    -- Vérifier si toutes les colonnes nécessaires existent et insérer une par une
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='visitor_stats' 
        AND column_name IN ('unique_visitors', 'total_page_views', 'home_views', 'bio_views', 'admin_views')
        GROUP BY table_name
        HAVING COUNT(*) = 5
    ) THEN
        -- Insérer les données une par une pour éviter les conflits
        INSERT INTO public.visitor_stats (date, unique_visitors, total_page_views, home_views, bio_views, admin_views) 
        SELECT CURRENT_DATE - INTERVAL '2 days', 45, 123, 89, 23, 11
        WHERE NOT EXISTS (SELECT 1 FROM public.visitor_stats WHERE date = CURRENT_DATE - INTERVAL '2 days');
        
        INSERT INTO public.visitor_stats (date, unique_visitors, total_page_views, home_views, bio_views, admin_views) 
        SELECT CURRENT_DATE - INTERVAL '1 day', 52, 145, 102, 28, 15
        WHERE NOT EXISTS (SELECT 1 FROM public.visitor_stats WHERE date = CURRENT_DATE - INTERVAL '1 day');
        
        INSERT INTO public.visitor_stats (date, unique_visitors, total_page_views, home_views, bio_views, admin_views) 
        SELECT CURRENT_DATE, 38, 98, 71, 18, 9
        WHERE NOT EXISTS (SELECT 1 FROM public.visitor_stats WHERE date = CURRENT_DATE);
    END IF;
END $$;

-- Table maintenance_config
CREATE TABLE IF NOT EXISTS public.maintenance_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  is_enabled BOOLEAN DEFAULT false NOT NULL,
  title VARCHAR(255) DEFAULT 'Maintenance en cours' NOT NULL,
  message TEXT DEFAULT 'Le site est temporairement en maintenance. Nous reviendrons bientôt.',
  scheduled_start TIMESTAMPTZ,
  scheduled_end TIMESTAMPTZ,
  contact_email VARCHAR(255) DEFAULT 'kaysuto@gmail.com',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Politiques pour maintenance_config
ALTER TABLE public.maintenance_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.maintenance_config;
CREATE POLICY "Enable read access for all users" ON public.maintenance_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable write access for admin users" ON public.maintenance_config;
CREATE POLICY "Enable write access for admin users" ON public.maintenance_config FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Index pour maintenance_config
CREATE INDEX IF NOT EXISTS idx_maintenance_config_enabled ON public.maintenance_config(is_enabled);

-- Trigger pour maintenance_config
CREATE OR REPLACE TRIGGER handle_maintenance_config_updated_at
  BEFORE UPDATE ON public.maintenance_config
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Configuration par défaut maintenance_config (insertion sécurisée)
INSERT INTO public.maintenance_config (is_enabled, title, message) 
SELECT false, 'Maintenance en cours', 'Le site est temporairement en maintenance. Nous reviendrons bientôt.'
WHERE NOT EXISTS (SELECT 1 FROM public.maintenance_config WHERE is_enabled = false);

-- Message de confirmation
SELECT 'Migration complète terminée avec succès!' as status;
