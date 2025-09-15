# Architecture du Portfolio Kimiya

## Vue d'ensemble
Portfolio personnel minimaliste avec panel d'administration intégré. Stack moderne React + TypeScript + Vite avec thème dark/light.

## Structure du projet

```
kimiya-portfolio/
├── src/
│   ├── components/           # Composants UI réutilisables
│   │   └── ui/              # Composants UI de base (Button, Card, Input, Switch, etc.)
│   ├── admin/               # Interface d'administration
│   │   ├── components/      # Composants spécifiques admin
│   │   │   ├── ui/         # UI components admin (AdminButton, DashboardCard, etc.)
│   │   │   ├── AdminLayout.tsx
│   │   │   └── AnimatedComponents.tsx
│   │   ├── pages/          # Pages admin
│   │   │   ├── Dashboard.tsx    # Vue d'ensemble métriques
│   │   │   ├── Analytics.tsx    # Config GA/GTM
│   │   │   ├── LinksManager.tsx # Gestion liens portfolio
│   │   │   ├── Maintenance.tsx  # Mode maintenance
│   │   │   ├── Security.tsx     # Sécurité et IP whitelist
│   │   │   ├── Settings.tsx     # Paramètres généraux
│   │   │   └── Login.tsx        # Authentification
│   │   ├── services/       # Services API admin
│   │   ├── styles/         # Styles admin (admin.css)
│   │   └── types/          # Types TypeScript admin
│   ├── pages/              # Pages publiques
│   │   └── BioPage.tsx     # Page biographie
│   ├── hooks/              # Hooks React personnalisés (use-mobile.ts)
│   ├── lib/                # Utilitaires et configurations
│   │   ├── utils.ts        # Utilitaires (cn, cookies)
│   │   ├── supabase.ts     # Config Supabase
│   │   └── theme.ts        # Gestion thème
│   └── styles/             # Styles globaux (theme.css)
├── public/                 # Assets statiques (icons, manifest, sw.js)
├── dist/                   # Build de production
└── config files            # Vite, Tailwind, TypeScript, etc.
```

## Technologies principales

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool et dev server
# Architecture — kimiyas-minimalist-p

Mise à jour du 15 septembre 2025 — Vue d’ensemble de l’architecture, conventions et flux principaux du portfolio.

## 1) Vue d’ensemble
- SPA React 19 + TypeScript 5, outillée par Vite 6 et Tailwind CSS 4
- PWA: `public/manifest.json` + `public/sw.js`
- Optionnel: Supabase pour données dynamiques (`src/lib/supabase.ts`)
- Objectif: performance (Lighthouse 100), accessibilité, simplicité de maintenance

## 2) Structure du projet

```
src/
├─ components/           # Sections UI (Hero, About, Projects, Footer…) + ui/
├─ admin/                # Application admin (lazy), composants, pages, services
├─ hooks/                # Hooks maison (use-theme, use-mobile, useAuth, …)
├─ lib/                  # Utils/config (queryClient, supabase, theme, utils)
├─ pages/                # Pages publiques (BioPage, MaintenancePage)
└─ styles/               # Styles globaux (theme.css)

public/                  # Manifest, SW, icons, og-image, robots, sitemap
database/                # SQL et scripts DB (maintenance, liens, profils)
docs/                    # Mémoire consolidée Byterover
config (racine)          # tailwind.config.js, vite.config.ts, tsconfig.json
```

Routage: React Router 6, code-splitting par routes/sections (lazy + suspense).

## 3) Conventions & UI System
- Aliases (cf. `components.json`): `@/components`, `@/lib`, `@/hooks`, `@/components/ui`
- Design system léger basé Tailwind + composants UI (Radix/Headless pattern)
- Conventions TS: types explicites publics, props immutables, `React.memo` ciblé
- Accessibilité: rôles ARIA, focus visible, navigation clavier, contrastes WCAG

## 4) État & données
- Local: hooks + state local, Context pour thème et auth
- Réseau: `@tanstack/react-query` (`src/lib/queryClient.ts`) si données distantes
- Supabase (option): clé et URL via `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## 5) Performance
- Splitting: routes, vendor, icônes; lazy/suspense sur sections non critiques
- CSS critique: styles init minimaux, `content-visibility`, `prefetch/modulepreload`
- SW: cache agressif pour statiques; `network-first` pour le reste
- Web Vitals: intégration dans `src/main.tsx`

## 6) SEO
- `index.html`: meta OG/Twitter, favicon, preconnect; `public/sitemap.xml`, `robots.txt`
- JSON-LD (option) dans `index.html` ou composant dédié si besoin

## 7) Sécurité
- Pas de secrets en front; variables via `.env.local` non commité
- En-têtes recommandés côté hébergeur (voir README “Cache HTTP”)

## 8) Développement
Scripts `package.json`:
- `dev`: Vite dev server
- `build`: `tsc -b --noCheck` puis `vite build`
- `preview`: `vite preview`
- `lint`: `eslint .`

## 9) Admin (aperçu)
- `src/admin/AdminApp.tsx` routeur admin, pages sous `src/admin/pages/`
- `AuthGuard` pour routes protégées; session côté client minimaliste
- Pages: `Dashboard`, `Maintenance`, etc. (lazy + split)

## 10) Ajouts typiques
- Nouvelle page publique: créer composant + route, lazy si non critique
- Nouveau composant UI: dans `components/ui`, suivre pattern props typées + a11y
- Nouveau service: dans `lib/` (public) ou `admin/services/` (admin)

Notes
- Les artefacts de build (`dist/`) et fichiers d’audit sont ignorés via `.gitignore`.
- La mémoire consolidée est tenue dans `docs/byterover-memory.*`.