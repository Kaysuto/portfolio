# Installation de la base de données Links

Ce dossier contient les scripts pour créer et gérer la table `links` dans Supabase.

## 📁 Fichiers

- **`create_links_table.sql`** - Script SQL complet avec diagnostics
- **`create_links_table_simple.sql`** - Script SQL simplifié (recommandé pour Supabase)
- **`../src/scripts/createLinksTable.ts`** - Script TypeScript pour l'application
- **`../setup-database.js`** - Script d'installation en ligne de commande

## 🚀 Installation rapide

### Option 1: Interface admin (Recommandé)
1. Aller sur `http://localhost:5173/admin/debug`
2. Cliquer sur "🏗️ Créer la table 'links'"
3. Puis "📥 Migrer les liens Bio vers Supabase"

### Option 2: Ligne de commande
```bash
node setup-database.js
```

### Option 3: SQL direct dans Supabase
1. Aller dans l'interface Supabase
2. Section "SQL Editor"
3. Copier-coller le contenu de `create_links_table_simple.sql` (recommandé)
   - Ou `create_links_table.sql` pour la version avec diagnostics
4. Exécuter

## 🗄️ Structure de la table

```sql
CREATE TABLE public.links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  type VARCHAR(50) CHECK (type IN ('github', 'live', 'social', 'bio_link', 'other')),
  is_active BOOLEAN DEFAULT true,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 📊 Types de liens supportés

- **`github`** - Liens GitHub (🐙)
- **`live`** - Sites web en ligne (🌐)
- **`social`** - Réseaux sociaux (👥)
- **`bio_link`** - Liens pour la page bio (🔗)
- **`other`** - Autres types de liens (🔗)

## 🔧 Fonctionnalités

- ✅ Génération automatique d'UUID
- ✅ Mise à jour automatique de `updated_at`
- ✅ Index optimisés pour les performances
- ✅ Contraintes de validation sur les types
- ✅ Support complet CRUD via TypeScript

## 🚨 Dépannage

### Erreur: "relation 'public.links' does not exist"
➡️ La table n'a pas été créée. Utilisez l'option 1 ou 2 ci-dessus.

### Erreur: "permission denied"
➡️ Vérifiez vos clés Supabase dans `.env` ou les variables d'environnement.

### Table existe mais migration échoue
➡️ Vérifiez les colonnes avec `\d links` dans l'éditeur SQL Supabase.

## 📋 Migration des liens Bio

Une fois la table créée, le script de migration ajoutera automatiquement:

1. Email (contact@kaysuto.fr)
2. Discord
3. Site personnel
4. Clover Games
5. DeviantArt
6. Emoji.gg
7. Pinterest
8. GitHub

Tous avec le type `bio_link` et actifs par défaut.

## 🔄 Gestion via l'admin

Après installation, tous les liens sont gérables via:
- `/admin/links` - Interface CRUD complète
- `/bio` - Affichage public des liens bio actifs

---

*Créé pour le portfolio Kimiya - Septembre 2025*
