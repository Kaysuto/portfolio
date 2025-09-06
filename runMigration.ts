#!/usr/bin/env tsx
/**
 * Script de migration de la base de données
 * Exécute toutes les migrations nécessaires pour créer les tables
 */

import { supabase } from './src/lib/supabase';
import * as fs from 'fs';
import * as path from 'path';

async function runMigration() {
  try {
    console.log('🚀 Début de la migration de la base de données...');

    // Créer les tables manuellement
    console.log('📝 Création des tables...');

    // 1. Créer la fonction handle_updated_at
    console.log('🔧 Création de la fonction handle_updated_at...');
    const { error: functionError } = await supabase.rpc('exec_sql', {
      sql: `
      CREATE OR REPLACE FUNCTION public.handle_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      `
    });

    if (functionError) {
      console.error('❌ Erreur création fonction:', functionError);
    } else {
      console.log('✅ Fonction handle_updated_at créée');
    }

    // 2. Créer la table profiles si elle n'existe pas
    console.log('👤 Création de la table profiles...');
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
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
      
      DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
      CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
      
      DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
      CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
      
      DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.profiles;
      CREATE POLICY "Enable insert for authenticated users" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
      
      CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
      `
    });

    if (profilesError) {
      console.error('❌ Erreur création profiles:', profilesError);
    } else {
      console.log('✅ Table profiles créée');
    }

    // 3. Créer le profil admin pour l'utilisateur existant
    console.log('👑 Création du profil admin...');
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (!usersError && users.users.length > 0) {
      const adminUser = users.users.find(u => u.email === 'kaysuto@gmail.com');
      if (adminUser) {
        const { error: insertError } = await supabase
          .from('profiles')
          .upsert({
            id: adminUser.id,
            email: adminUser.email,
            nickname: 'Kimiya',
            role: 'admin',
            is_admin: true
          });

        if (insertError) {
          console.error('❌ Erreur création profil admin:', insertError);
        } else {
          console.log('✅ Profil admin créé');
        }
      }
    }

    console.log('✅ Migration terminée avec succès!');

    // Vérifier que les tables existent
    console.log('🔍 Vérification des tables...');
    
    const tables = ['profiles', 'links', 'visitor_stats', 'maintenance_config'];
    for (const table of tables) {
      const { data: tableData, error: tableError } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (tableError) {
        console.error(`❌ Table ${table} introuvable:`, tableError.message);
      } else {
        console.log(`✅ Table ${table} existe et fonctionne`);
      }
    }

  } catch (error) {
    console.error('💥 Erreur fatale lors de la migration:', error);
  } finally {
    process.exit(0);
  }
}

// Exécuter la migration si le script est appelé directement
if (require.main === module) {
  runMigration();
}

export { runMigration };
