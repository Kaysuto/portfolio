# Byterover Handbook

*Generated: 4 septembre 2025*

## Layer 1: System Overview

**Purpose**: Portfolio moderne et minimaliste pour Kimiya Kaysuto présentant une expertise polyvalente dans de multiples domaines technologiques. Portfolio Full-Stack avec optimisations Lighthouse 100%, thème dark/light adaptatif et fonctionnalités PWA complètes.

**Tech Stack**: 
- **Frontend**: React 19, TypeScript 5, Vite 6
- **Styling**: Tailwind CSS 4, Radix UI components
- **Icons**: Phosphor Icons, Heroicons
- **Database**: Supabase (avec @supabase/supabase-js)
- **Form Handling**: React Hook Form, Hookform Resolvers
- **State Management**: TanStack Query
- **Build**: Vite avec optimizations PWA
- **UI Components**: shadcn/ui avec Radix UI primitives

**Architecture**: 
- **Component-based Architecture** avec React
- **Layered structure**: components/, hooks/, lib/, styles/
- **PWA Architecture** avec service worker et manifest
- **Responsive Design** avec mobile-first approach
- **Theme System** dual (dark/light) avec persistence localStorage

**Key Technical Decisions**:
- Lighthouse 100% optimization prioritaire
- Système de thème dual adaptatif avec persistence
- Composants UI modulaires avec shadcn/ui + Radix UI
- PWA complète avec offline capabilities
- Performance optimisée avec lazy loading et code splitting

**Entry Points**: 
- `src/main.tsx` - Point d'entrée principal de l'application
- `src/App.tsx` - Composant racine avec routing et providers
- `index.html` - Template HTML avec optimisations SEO et performance

---

## Layer 2: Module Map

**Core Modules**:
- **HeroSection.tsx** - Section principale avec animation, CTA et particules interactives
- **AboutSection.tsx** - Présentation des compétences et expertise
- **ProjectsSection.tsx** - Showcase des projets avec ProjectCards
- **ContactSection.tsx** - Formulaire de contact et informations
- **Navbar.tsx** - Navigation avec toggle thème et liens
- **Footer.tsx** - Pied de page avec liens sociaux

**Data Layer**:
- **lib/supabase.ts** - Configuration et client Supabase
- **hooks/** - Custom hooks pour data fetching et state management
- **ProjectCards.tsx** - Gestion dynamique des projets depuis Supabase

**Integration Points**:
- **Supabase Integration** - Base de données pour projets dynamiques
- **PWA Integration** - Service worker dans public/sw.js
- **Theme System** - hooks/use-mobile.ts et gestion du thème

**Utilities**:
- **lib/utils.ts** - Fonctions utilitaires et helpers
- **ErrorFallback.tsx** - Gestion d'erreurs React
- **FloatingParticles.tsx** - Animations et effets visuels
- **ui/** - Composants UI réutilisables (shadcn/ui)

**Module Dependencies**:
- Tous les composants dépendent du theme system
- ProjectCards → Supabase pour données dynamiques
- Composants UI → Radix UI primitives
- Animations → Tailwind CSS et composants custom

---

## Layer 3: Integration Guide

**API Endpoints**:
- **Supabase Database** - Gestion des projets et données portfolio
- **Service Worker API** - Cache et fonctionnalités offline PWA
- **Theme API** - localStorage pour persistence du thème
- **Contact Form** - Potentielle intégration email (à implémenter)

**Configuration Files**:
- **vite.config.ts** - Configuration build Vite avec optimisations
- **tailwind.config.js** - Configuration Tailwind avec thème custom
- **tsconfig.json** - Configuration TypeScript
- **components.json** - Configuration shadcn/ui
- **theme.json** - Configuration des couleurs et thème
- **.env files** - Variables d'environnement pour Supabase

**External Integrations**:
- **Supabase** - Base de données cloud pour projets
- **Vercel** - Déploiement et hébergement
- **PWA** - Manifest et service worker pour installation
- **Lighthouse** - Optimisations performance automatisées

**Workflows**:
1. **Development**: `npm run dev` → Vite dev server
2. **Build**: `npm run build` → TypeScript + Vite build optimisé
3. **Preview**: `npm run preview` → Test du build en local
4. **Deploy**: Automatic via Vercel Git integration

**Interface Definitions**:
- **Project Interface** - Structure des données projets Supabase
- **Theme Interface** - Types pour système dark/light
- **Component Props** - TypeScript interfaces pour tous composants

---

## Layer 4: Extension Points

**Design Patterns**:
- **Component Composition** - Composants réutilisables avec props
- **Custom Hooks Pattern** - Logique métier extraite dans hooks/
- **Provider Pattern** - Theme et context providers
- **Render Props** - Pour composants complexes comme ProjectCards
- **Compound Components** - UI components avec sous-composants

**Extension Points**:
- **New Sections** - Ajout facile de nouvelles sections portfolio
- **Project Types** - Extension des types de projets dans ProjectCards
- **Theme Extensions** - Ajout de nouveaux thèmes dans le système
- **UI Components** - Extension des composants shadcn/ui existants
- **Animation System** - Ajout de nouvelles animations Tailwind

**Customization Areas**:
- **Color Palette** - theme.json et tailwind.config.js
- **Component Styling** - Tailwind classes et composants UI
- **Content Management** - Supabase pour contenu dynamique
- **SEO Settings** - index.html meta tags et structured data
- **PWA Configuration** - manifest.json et service worker

**Plugin Architecture**:
- **Vite Plugins** - @tailwindcss/vite, PWA plugin
- **Radix UI Primitives** - Composants UI extensibles
- **Tailwind Plugins** - Container queries, custom utilities
- **React Query** - Data fetching et cache management

**Recent Changes**:
- Optimisations Lighthouse 100% implémentées
- Système de thème dual finalisé
- Composants UI shadcn/ui intégrés
- PWA complète avec service worker
- Performance optimizations avec lazy loading
- **ADMIN SYSTEM REDESIGN** - Refonte complète du système admin (septembre 2025)
- **Admin Components** - AdminLayout, Dashboard, AnalyticsPage avec design cohérent
- **Login Page Redesign** - Page de connexion admin avec thème principal
- **Glassmorphism UI** - Composants admin avec effets backdrop-blur et animations
- **LinksManager Implementation** - Gestionnaire de liens avec synchronisation Supabase/GitHub
- **Security Enhancements** - WhitelistGuard et authentification admin
- **Performance Optimizations** - Lazy loading et code splitting pour admin
- **ARCHITECTURE SIMPLIFIÉE** - Implémentation des recommandations Byterover (septembre 2025)
- **Base de données simplifiée** - 5 tables essentielles seulement (admin_users, ip_whitelist, portfolio_links, maintenance_config, visitor_stats)
- **WhitelistGuard simple** - Validation IP basique avec redirection automatique
- **Dashboard minimal** - Métriques essentielles avec actions rapides
- **CRUD liens basique** - Gestion simple avec drag & drop simulé
- **Maintenance configurable** - Toggle et message personnalisable
- **Analytics de base** - Statistiques essentielles sans complexité excessive

**New Admin Modules Added**:
- **AdminLayout.tsx** - Layout principal admin avec navbar et thème toggle
- **DashboardMinimal.tsx** - Dashboard simplifié avec métriques essentielles
- **LinksManagerSimple.tsx** - CRUD liens basique avec select HTML natif
- **MaintenancePageSimple.tsx** - Configuration maintenance avec checkbox HTML
- **AnalyticsPageSimple.tsx** - Analytics de base avec graphiques simulés
- **WhitelistGuardSimple.tsx** - Protection IP simple pour développement
- **Admin Routing** - Structure de navigation admin complète (/admin/*)
- **CLEANUP COMPLETED** - Suppression des doublons et composants inutiles
- **Simplified Architecture** - Versions simplifiées selon recommandations Byterover---

*Byterover handbook optimized for agent navigation and human developer onboarding*
*Last updated: 5 septembre 2025 - Admin system cleanup and simplified architecture*
