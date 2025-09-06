-- Script de diagnostic détaillé pour le problème d'authentification
-- À exécuter dans Supabase SQL Editor

-- 1. Vérifier l'utilisateur dans auth.users
SELECT 
    'Auth Users Check' as section,
    id, 
    email, 
    created_at,
    email_confirmed_at,
    last_sign_in_at,
    raw_user_meta_data
FROM auth.users 
WHERE email = 'kaysuto@gmail.com';

-- 2. Vérifier le profil dans profiles
SELECT 
    'Profile Check' as section,
    id, 
    email, 
    nickname, 
    role, 
    is_admin, 
    created_at, 
    updated_at
FROM public.profiles 
WHERE email = 'kaysuto@gmail.com';

-- 3. Vérifier si le profil est accessible via l'ID utilisateur (comme le fait AuthService.getProfile)
SELECT 
    'Profile by User ID' as section,
    p.id, 
    p.email, 
    p.nickname, 
    p.role, 
    p.is_admin, 
    p.created_at, 
    p.updated_at
FROM public.profiles p
INNER JOIN auth.users u ON u.id = p.id
WHERE u.email = 'kaysuto@gmail.com';

-- 4. Vérifier les politiques RLS sur la table profiles
SELECT 
    'RLS Policies Check' as section,
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- 5. Vérifier si RLS est activé sur la table profiles
SELECT 
    'RLS Status' as section,
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'profiles';

-- 6. Tester directement la requête que fait AuthService.getProfile
-- (Remplacez l'ID par l'ID réel de l'utilisateur)
SELECT 
    'Direct Profile Query Test' as section,
    *
FROM public.profiles 
WHERE id = (SELECT id FROM auth.users WHERE email = 'kaysuto@gmail.com')
LIMIT 1;

-- 7. Vérifier s'il y a des triggers ou fonctions qui interfèrent
SELECT 
    'Triggers Check' as section,
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'profiles';
