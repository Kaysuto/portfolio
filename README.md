# 🌟 Portfolio Kimiya Kaysuto

> **Full-Stack Maker polyvalent** - Expert en réseau, développement, design pixel art, création de mini-jeux Minecraft et bien plus encore.

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%25-brightgreen?logo=lighthouse&logoColor=white)](https://kimiya-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-teal?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

## 🚀 Aperçu

Portfolio moderne et minimaliste présentant mon expertise polyvalente dans de multiples domaines technologiques. Design élégant avec thème dark/light, animations fluides et optimisations Lighthouse 100%.

### ✨ Points forts
- 🎯 **Lighthouse 100%** sur tous les critères (Performance, Accessibilité, SEO, Meilleures Pratiques)
- 🌙 **Thème adaptatif** dark/light avec persistence
- 📱 **PWA complète** - Installation et mode hors ligne
- ⚡ **Performance optimale** - Code splitting et lazy loading
- 🎨 **Design responsive** - Mobile-first avec animations
- ♿ **Accessibilité** - ARIA, navigation clavier, lecteurs d'écran

## 🛠️ Stack Technique

### Frontend
- **React 19** - Framework avec dernières fonctionnalités
- **TypeScript 5** - Typage strict pour une meilleure robustesse
- **Vite 6** - Bundler ultra-rapide avec HMR
- **Tailwind CSS 4** - Framework CSS utilitaire moderne

### Performance & SEO
- **Service Worker** - Cache intelligent et mode hors ligne
- **Code Splitting** - Chargement optimisé par chunks
- **Critical CSS** - Styles critiques inlinés pour LCP
- **Web Vitals** - Monitoring des performances en temps réel
- **Meta tags** - SEO optimisé avec Open Graph et Twitter Cards

### Outils & Qualité
- **ESLint & Prettier** - Linting et formatage automatique
- **Phosphor Icons** - Bibliothèque d'icônes moderne
- **Terser** - Minification JavaScript avancée

## 🎨 Fonctionnalités

### 🏠 Section Héro
- Animation d'apparition fluide
- CTA avec modal téléchargement CV
- Particules flottantes interactives

### 👤 À Propos
- Présentation expertise polyvalente
- Grille de compétences techniques
- Animation au scroll

### 💼 Projets
- Intégration Supabase pour données dynamiques
- Filtrage par statut et technologie
- Cards interactives avec liens externes

### 📧 Contact
- Formulaire fonctionnel avec validation
- Dropdowns personnalisés sans bibliothèque
- Intégration réseaux sociaux

## 🚀 Installation & Développement

### Prérequis
- Node.js 18+
- npm ou pnpm

### Installation
```bash
# Cloner le repository
git clone https://github.com/Kaysuto/kimiyas-minimalist-p.git
cd kimiyas-minimalist-p

# Installer les dépendances
npm install

# Variables d'environnement (optionnel pour Supabase)
cp .env.example .env.local
# Configurer VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
```

### Scripts disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linter & formatage
npm run lint
npm run format

# Optimisations Lighthouse
node scripts/lighthouse-optimization.mjs
```

## 📊 Optimisations Lighthouse

### Performance (100/100)
- ⚡ Bundle optimisé : **261KB** gzippé
- 🔀 Code splitting automatique (React, Phosphor, composants)
- 📦 Lazy loading des sections non-critiques
- 🎨 CSS critique inliné pour LCP < 1.5s

### Accessibilité (100/100)
- 🏷️ ARIA labels complets
- ⌨️ Navigation clavier optimisée
- 📱 Support lecteurs d'écran
- 🎯 Ratios de contraste conformes WCAG 2.1

### Meilleures Pratiques (100/100)
- 🔒 Headers de sécurité configurés
- 📱 PWA complète avec manifest et service worker
- 🌐 HTTPS et protocoles sécurisés
- ⚠️ Gestion d'erreurs robuste

### SEO (100/100)
- 🏷️ Meta tags complets (Open Graph, Twitter Cards)
- 🗺️ Sitemap.xml et robots.txt optimisés
- 📊 Données structurées JSON-LD
- 📱 Mobile-friendly et responsive

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Build manuel
```bash
# Générer le build
npm run build

# Le dossier dist/ contient les fichiers statiques
# Déployable sur tout hébergeur statique
```

## 🔧 Configuration

### Thème
Le système de thème utilise une approche hybride :
- **Cookie** pour persistence serveur
- **localStorage** pour synchronisation client
- **CSS variables** pour transitions fluides

### PWA
Configuration complète dans :
- `public/manifest.json` - Métadonnées PWA
- `public/sw.js` - Service Worker avec cache intelligent
- Support installation et mode hors ligne

### Analytics (Optionnel)
Intégration Web Vitals pour monitoring :
```javascript
// Déjà configuré dans src/main.tsx
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'
```

## 📁 Structure du Projet

```
kimiyas-minimalist-p/
├── public/                 # Assets statiques
│   ├── manifest.json      # PWA manifest
│   ├── sw.js             # Service Worker
│   ├── robots.txt        # SEO robots
│   └── sitemap.xml       # Plan du site
├── src/
│   ├── components/       # Composants React
│   │   ├── ui/          # Composants UI réutilisables
│   │   └── ...          # Composants spécifiques
│   ├── hooks/           # Hooks personnalisés
│   ├── lib/             # Utilitaires et configuration
│   └── styles/          # Styles globaux
├── scripts/             # Scripts d'optimisation
└── docs/               # Documentation
```

## 🤝 Contribution

Les contributions sont bienvenues ! Merci de :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

**Kimiya Kaysuto** - Full-Stack Maker polyvalent

- 🌐 Portfolio: [kimiya-portfolio.vercel.app](https://kimiya-portfolio.vercel.app)
- 💼 GitHub: [@Kaysuto](https://github.com/Kaysuto)
- 📧 Email: [Contact via le portfolio](https://kimiya-portfolio.vercel.app/#contact)

---

<div align="center">
  <p>Fait avec ❤️ et beaucoup de ☕</p>
  <p>© 2025 Kimiya Kaysuto - Full-Stack Maker</p>
</div>
