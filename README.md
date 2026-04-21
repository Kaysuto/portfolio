# Portfolio — Kimiya Kaysuto

[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%25-brightgreen?logo=lighthouse&logoColor=white)](https://kimiya-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-teal?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Portfolio moderne et performant (score Lighthouse 100%) avec thème dark/light, animations fluides et support PWA.

## Stack

React 19 · TypeScript 5 · Vite 6 · Tailwind CSS 4 · React Router 6 · Radix UI · Phosphor Icons

## Démarrage

```bash
npm install
npm run dev       # Dev server — port 5000
npm run build     # tsc + vite build
npm run preview   # Prévisualiser le build
npm run lint      # ESLint
```

## Structure

```
src/
├── components/     # Sections UI (Hero, About, Projects, Contact…) + ui/
├── admin/          # Interface d'administration (lazy-loaded)
├── hooks/          # Hooks personnalisés (theme, mobile, auth…)
├── lib/            # Config & utilitaires (supabase, theme, queryClient)
├── pages/          # Pages publiques (Bio, CV, Mentions légales)
└── data/           # Données statiques (projets, liens)
public/             # manifest.json, sw.js, icons, robots, sitemap
```

## Fonctionnalités

- **PWA** — installation et mode offline via `public/sw.js`
- **Thème** — dark/light avec persistance cookie + localStorage (OKLch)
- **Performance** — code splitting (vendor/ui/icons), lazy loading, CSS critique
- **SEO** — JSON-LD structuré, meta OG/Twitter, sitemap, robots.txt
- **Accessibilité** — ARIA, navigation clavier, contrastes WCAG

## Déploiement

```bash
# Vercel (recommandé)
npm i -g vercel && vercel --prod

# Manuel — déployer le dossier dist/
npm run build
```

## Variables d'environnement

Copier `.env.example` en `.env.local` et remplir :

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Licence

MIT — voir `LICENSE`.

---

<div align="center">
  <p>© 2025 Kimiya Kaysuto · <a href="https://kimiya-portfolio.vercel.app">kimiya-portfolio.vercel.app</a></p>
</div>
