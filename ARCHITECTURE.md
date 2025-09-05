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
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Routing côté client

### UI/UX
- **Phosphor Icons** - Bibliothèque d'icônes
- **Radix UI** - Composants accessibles
- **Framer Motion** - Animations fluides
- **Theme système** - Support dark/light mode automatique

### État et données
- **Local Storage** - Persistance locale (auth admin, préférences)
- **Supabase** - Base de données et auth (configuration présente)

## Architecture des composants

### Composants UI (`src/components/ui/`)
Composants de base réutilisables avec design system unifié :
- `Button` - Boutons avec variants (default, outline, ghost, etc.)
- `Card` - Conteneurs de contenu (CardHeader, CardContent, CardTitle)
- `Input`, `Label` - Formulaires typés
- `Switch` - Toggle moderne avec transitions
- `Badge` - Étiquettes avec variants sémantiques
- `Alert` - Messages de notification

### Admin Panel (`src/admin/`)

#### Pages principales
- **Dashboard** - Vue d'ensemble avec métriques temps réel
- **Analytics** - Configuration Google Analytics 4 + GTM
- **LinksManager** - Gestion CRUD des liens du portfolio
- **Maintenance** - Mode maintenance avec preview
- **Security** - Gestion sécurité et IP whitelist
- **Settings** - Paramètres généraux de l'app
- **Login** - Authentification admin avec session

#### Architecture admin
```
AdminApp (Router principal + lazy loading)
├── AdminLayout (Layout commun avec navigation)
│   ├── Navigation responsive
│   ├── Theme toggle (dark/light)
│   ├── Logout avec nettoyage session
│   └── Animations d'arrière-plan
└── Pages (Routes protégées par authentification)
```

### Services (`src/admin/services/`)
Couche d'abstraction pour les APIs avec interfaces TypeScript :
- `adminServices.ts` - Auth et gestion de session
- `analyticsService.ts` - Config Google Analytics/GTM
- `dashboardService.ts` - Métriques et statistiques
- `linksService.ts` - CRUD liens du portfolio
- `maintenanceService.ts` - Gestion mode maintenance
- `securityService.ts` - Sécurité et IP whitelist

## Routing et navigation

### Routes publiques
- `/` - Portfolio principal (PortfolioApp)
- `/bio` - Page biographie détaillée

### Routes admin (protégées)
Toutes sous `/admin/*` avec authentification requise :
- `/admin/login` - Connexion admin
- `/admin/dashboard` - Tableau de bord principal
- `/admin/analytics` - Configuration analytics
- `/admin/links` - Gestion liens
- `/admin/maintenance` - Mode maintenance
- `/admin/security` - Sécurité
- `/admin/settings` - Paramètres

## Thème et styling

### Système de thème
- **Variables CSS** custom properties pour dark/light mode
- **Tokens sémantiques** : accent, muted, foreground, background, etc.
- **Persistance** via localStorage + cookie fallback
- **Transitions** fluides entre thèmes

### Classes Tailwind principales
```css
/* Couleurs sémantiques */
bg-background, text-foreground    /* Base adaptative */
bg-accent, text-accent           /* Accent principal */
bg-muted, text-muted-foreground  /* Éléments secondaires */
border-border                    /* Bordures cohérentes */

/* Animations custom */
animate-fadeIn, animate-slideIn  /* Entrées */
animate-float, animate-pulse     /* Effets continus */
animate-delay-[x]               /* Délais échelonnés */
```

## Build et déploiement

### Configuration Vite
- **Alias** : `@/` pointe vers `src/`
- **Code splitting** : Chunks automatiques (vendor, icons, ui, admin)
- **Lazy loading** : Pages admin chargées à la demande
- **Optimisations** : Minification Terser, tree-shaking
- **Assets** : Hash automatique pour cache busting

### Scripts disponibles
```bash
npm run dev      # Dev server avec HMR
npm run build    # Build production (tsc + vite)
npm run preview  # Preview du build local
npm run lint     # ESLint
```

## Patterns et bonnes pratiques

### Composants React
- **Props typées** avec TypeScript strict
- **Forwarded refs** pour composants UI
- **Composition** plutôt qu'héritage
- **Lazy loading** avec React.lazy() pour optimisation

### Gestion d'état
- **useState** pour état local des composants
- **useEffect** pour effets de bord et cycles de vie
- **Context API** pour thème global et auth
- **Local Storage** pour persistance côté client

### Performance
- **Code splitting** par route et fonctionnalité
- **Import dynamique** pour les pages admin
- **Optimisation assets** (images, fonts)
- **Service Worker** pour cache stratégique

## Sécurité

### Authentification admin
- **Session locale** via localStorage
- **Routes protégées** avec redirection automatique
- **Validation inputs** côté client
- **Nettoyage session** à la déconnexion

### Données et API
- **Validation** des inputs utilisateur
- **Sanitisation** des données affichées
- **Headers sécurisés** (CSP, CORS dans config)
- **IP whitelist** configurable

## Maintenance et évolution

### Ajout d'une nouvelle page admin
1. Créer `src/admin/pages/NomPage.tsx` avec export nommé
2. Ajouter route dans `AdminApp.tsx` (lazy si besoin)
3. Ajouter navigation dans `AdminLayout.tsx`
4. Créer service correspondant si API nécessaire
5. Ajouter types dans `admin/types/`

### Ajout d'un composant UI
1. Créer `src/components/ui/nom-composant.tsx`
2. Utiliser le pattern Radix UI (forwardRef, variants)
3. Documenter les props TypeScript
4. Tester responsivité et accessibilité

### Débogage et monitoring
- **React DevTools** pour debug composants
- **TypeScript strict** pour erreurs compilation
- **Console réseau** pour debug API
- **Vite HMR** pour dev rapide

---

*Architecture mise à jour : 5 septembre 2025*
*Version nettoyée - fichiers inutiles supprimés*