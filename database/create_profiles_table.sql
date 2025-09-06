-- Script de création de la table profiles pour Supabase Auth
-- Portfolio Kimiya - Gestion des profils utilisateurs

-- Créer la table profiles liée aux utilisateurs Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  -- Clé primaire liée à auth.users
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  
  -- Informations du profil
  nickname VARCHAR(100),
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' NOT NULL,
  is_admin BOOLEAN DEFAULT false NOT NULL,
  
  -- Configuration utilisateur
  preferences JSONB DEFAULT '{}' NOT NULL,
  
  -- Métadonnées temporelles
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Politique de sécurité RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politique permettant aux utilisateurs de voir leur propre profil
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Politique permettant aux utilisateurs de mettre à jour leur propre profil
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Politique permettant l'insertion de nouveaux profils (trigger)
CREATE POLICY "Enable insert for authenticated users" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Créer un index sur l'email
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Fonction pour créer automatiquement un profil lors de l'inscription
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

-- Trigger pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insérer un profil admin pour l'utilisateur existant (si nécessaire)
-- Cette ligne sera exécutée seulement si l'utilisateur existe déjà
INSERT INTO public.profiles (id, email, nickname, role, is_admin)
SELECT id, email, 'Kimiya', 'admin', true
FROM auth.users 
WHERE email = 'kaysuto@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  is_admin = true,
  role = 'admin',
  nickname = EXCLUDED.nickname,
  updated_at = NOW();
