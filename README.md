# 🌟 Portfolio — Kimiya Kaysuto

[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%25-brightgreen?logo=lighthouse&logoColor=white)](https://kimiya-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-teal?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

## 🚀 Aperçu

Portfolio moderne, minimaliste et performant (100% Lighthouse) avec thème dark/light, animations fluides et PWA.

### ✨ Points forts
- 🎯 Score Lighthouse 100% (Perf, A11y, SEO, Best Practices)
- 🌙 Thème adaptatif avec persistance
- 📱 PWA complète (installation, offline) via `public/manifest.json` et `public/sw.js`
- ⚡ Performance: code splitting, lazy loading, CSS critique
- ♿ Accessibilité: ARIA, navigation clavier, contrastes conformes

## 🛠️ Stack technique

- React 19, TypeScript 5, Vite 6, Tailwind CSS 4
- React Router 6, Web Vitals, Phosphor/Lucide Icons, Radix UI (sélecteurs/accessibles)

## 🎨 Fonctionnalités principales

- Héro avec particules, CTA CV, et curseur/interaction adaptative (desktop/mobile)
- Sections: À propos, Projets (filtrage), Contact (validation + liens sociaux)
- PWA avec cache intelligent dans `sw.js`

## 🚀 Démarrage

### Prérequis
- Node.js 18+
- npm (ou pnpm/yarn)

### Installation

```powershell
# Cloner
git clone https://github.com/Kaysuto/kimiyas-minimalist-p.git
cd kimiyas-minimalist-p

# Installer
npm install
```

### Scripts

```powershell
npm run dev       # Démarrer le serveur de dev
npm run build     # Build production (tsc + vite)
npm run preview   # Prévisualiser le build local
npm run lint      # Lint du code
```

## 📊 Optimisations Lighthouse

- Code splitting automatique (vendor, UI, icônes)
- Lazy loading des sections non-critiques
- CSS critique pour LCP rapide (< 1.5s cible)
- Headers de cache recommandés (voir plus bas)

## 📁 Structure du projet

```
kimiyas-minimalist-p/
├── public/                 # Assets statiques (manifest, sw.js, icons)
├── src/
│   ├── components/         # Composants (UI, sections)
│   ├── hooks/              # Hooks personnalisés
│   ├── lib/                # Config/utilitaires (supabase, theme, utils)
│   ├── pages/              # Pages (Bio, Maintenance)
│   └── styles/             # Styles globaux
├── docs/                   # Mémoire Byterover consolidée
├── dist/                   # Build (ignoré en CI)
└── config                  # Vite/Tailwind/TS (fichiers racine)
```

## 🌐 Déploiement

### Vercel (recommandé)
```powershell
npm i -g vercel
vercel --prod
```

### Build manuel
```powershell
npm run build
# Le dossier dist/ contient les fichiers statiques à déployer
```

## 🔧 Configuration

### Thème
- Persistance: cookie + localStorage
- Variables CSS pour transitions fluides

### PWA
- `public/manifest.json` et `public/sw.js`
- Stratégie cache: statiques agressifs + network-first pour le reste

### Analytics
- Web Vitals intégré (voir `src/main.tsx`)

## ⚡ Cache HTTP recommandé

Apache (.htaccess)
```apache
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2|woff)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "sw\.js$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
```

Nginx
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2|woff)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
location = /sw.js {
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## 🤝 Contribution

1) Fork, 2) branche `feature/...`, 3) commit, 4) push, 5) PR

## 📄 Licence

MIT — voir `LICENSE`.

## 📞 Contact

- Site: https://kimiya-portfolio.vercel.app
- GitHub: https://github.com/Kaysuto
- Contact: https://kimiya-portfolio.vercel.app/#contact

---
<div align="center">
  <p>Fait avec ❤️ et ☕</p>
  <p>© 2025 Kimiya Kaysuto</p>
</div>
