# AGENTS.md

Portfolio personnel de Kimiya (kaysuto.fr) : SPA React 19 + Vite + TypeScript + Tailwind CSS 4, composants shadcn (`components.json`), Framer Motion et three.js. Hébergé sur Coolify, sur un serveur personnel, derrière Cloudflare : pas de Vercel. Le formulaire de contact appelle `/api/contact` ; `api/contact.ts` est écrit au format des fonctions Vercel et la production ne répond pas comme lui, donc vérifier comment Coolify sert cette route avant d'y toucher. Lire `README.md` pour la vue d'ensemble.

## Commandes

```bash
npm run dev        # serveur de dev
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint
npm run build      # build de production
```

Aucun lanceur de tests configuré : vérifier avec `typecheck`, `lint` et `build`.

## Skills

Avant de coder, charger le skill qui correspond à la tâche, s'il est installé. Le style existant (`src/index.css`, composants shadcn) prime sur un skill en cas de conflit.

- Interface et finitions : `emil-design-eng`. Refonte demandée explicitement : `redesign-existing-projects`.
- Animations Framer Motion : `animate`, `choreograph` (entrées en cascade), `gestures` (tiroirs `vaul`, glisser), `animation-performance` (scène three.js, saccades) ; relire le diff avec `/review-animations`.
- Mobile et PWA : `mobile-native`. Toasts : `ask-sonner`. Accessibilité : `accessibility`. Performance et score Lighthouse : `performance`.
- Formulaire de contact (`api/contact.ts`) : `security-review`.
