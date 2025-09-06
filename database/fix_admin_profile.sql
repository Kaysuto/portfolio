-- Script de vérification et correction du profil admin
-- À exécuter dans Supabase SQL Editor pour diagnostiquer le problème

-- 1. Vérifier si l'utilisateur existe dans auth.users
SELECT 
    id, 
    email, 
    created_at,
    email_confirmed_at,
    raw_user_meta_data
FROM auth.users 
WHERE email = 'kaysuto@gmail.com';

-- 2. Vérifier si le profil existe dans public.profiles
SELECT 
    id, 
    email, 
    nickname, 
    role, 
    is_admin, 
    created_at, 
    updated_at
FROM public.profiles 
WHERE email = 'kaysuto@gmail.com';

-- 3. Si le profil n'existe pas, le créer avec les droits admin
INSERT INTO public.profiles (id, email, nickname, role, is_admin)
SELECT 
    u.id, 
    u.email, 
    'Kimiya', 
    'admin', 
    true
FROM auth.users u
WHERE u.email = 'kaysuto@gmail.com'
AND NOT EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = u.id
);

-- 4. Si le profil existe mais n'est pas admin, le mettre à jour
UPDATE public.profiles 
SET 
    is_admin = true, 
    role = 'admin',
    nickname = 'Kimiya',
    updated_at = NOW()
WHERE email = 'kaysuto@gmail.com'
AND is_admin = false;

-- 5. Vérification finale
SELECT 
    'Profil admin configuré correctement!' as status,
    id, 
    email, 
    nickname, 
    role, 
    is_admin
FROM public.profiles 
WHERE email = 'kaysuto@gmail.com' 
AND is_admin = true;
