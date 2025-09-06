-- Script pour créer la table ip_whitelist manquante
-- Cette table est nécessaire pour la fonctionnalité de sécurité IP

-- Créer la table ip_whitelist
CREATE TABLE IF NOT EXISTS public.ip_whitelist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address INET NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Créer un index sur l'adresse IP pour des recherches rapides
CREATE INDEX IF NOT EXISTS idx_ip_whitelist_ip_address ON public.ip_whitelist(ip_address);
CREATE INDEX IF NOT EXISTS idx_ip_whitelist_active ON public.ip_whitelist(is_active) WHERE is_active = true;

-- Activer RLS
ALTER TABLE public.ip_whitelist ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux admins de tout voir et gérer
CREATE POLICY "Admins can manage IP whitelist" ON public.ip_whitelist
    FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

-- Politique pour permettre à tous de lire (pour vérifier les IPs autorisées)
CREATE POLICY "Anyone can read active IP whitelist" ON public.ip_whitelist
    FOR SELECT 
    USING (is_active = true);

-- Fonction pour mettre à jour le updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_ip_whitelist_updated_at 
    BEFORE UPDATE ON public.ip_whitelist 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insérer quelques IPs de base (localhost pour le développement)
INSERT INTO public.ip_whitelist (ip_address, description, is_active, created_by)
SELECT 
    '127.0.0.1'::inet,
    'Localhost - développement',
    true,
    id
FROM auth.users 
WHERE email = 'kaysuto@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.ip_whitelist (ip_address, description, is_active, created_by)
SELECT 
    '::1'::inet,
    'IPv6 Localhost - développement',
    true,
    id
FROM auth.users 
WHERE email = 'kaysuto@gmail.com'
ON CONFLICT DO NOTHING;

-- Vérification finale
SELECT 
    'IP Whitelist created successfully!' as status,
    COUNT(*) as total_entries
FROM public.ip_whitelist;
