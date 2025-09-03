# 🌟 Portfolio Kimiya Kaysuto

> **Full-Stack### 🎨 Fonctionnalités

### 🏠 Section Héro
- Animation d'apparition fluide
- CTA avec modal téléchargement CV
- Particules flottantes interactives
- **Curseur animé adaptatif** : Souris desktop, doigt mobile

#### Curseur Adaptatif
- **Desktop (md+)** : Souris animée avec roulette qui bouge
- **Mobile (<md)** : Doigt stylisé avec animation de tap et glow
- **Responsive** : Changement automatique selon la taille d'écran
- **Accessibilité** : Labels ARIA et navigation clavier préservés

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
- **Cache optimisé** - Headers HTTP et Service Worker pour Lighthouse 100%

### Outils & Qualité
- **ESLint & Prettier** - Linting et formatage automatique
- **Phosphor Icons** - Bibliothèque d'icônes moderne
- **Terser** - Minification JavaScript avancée

## 🎨 Fonctionnalités

### � Fonctionnalités

### �🏠 Section Héro
- Animation d'apparition fluide
- CTA avec modal téléchargement CV
- Particules flottantes interactives
- **Curseur animé adaptatif** : Souris desktop, doigt mobile

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

## ⚠️ Avertissements et Solutions

### API Obsolète - StorageType.persistent

**Problème :** L'avertissement `StorageType.persistent est obsolète` peut apparaître dans la console du navigateur.

**Cause :** Cette API obsolète provient de la dépendance `@supabase/storage-js` utilisée par Supabase.

**Solutions appliquées :**
- ✅ Mise à jour de Supabase vers la dernière version (`@supabase/supabase-js@2.57.0`)
- ✅ Ajout de vérification API moderne dans le Service Worker
- ✅ Utilisation de `navigator.storage.persist()` comme alternative moderne

**Note :** Si l'avertissement persiste, il s'agit d'une dépendance externe qui sera corrigée dans les futures versions de Supabase.

## ⚡ Optimisations de Cache

### Headers HTTP Recommandés

Pour atteindre le score Lighthouse 100%, configurez ces headers sur votre serveur :

#### Apache (.htaccess)
```apache
# Ressources statiques - Cache agressif (1 an)
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2|woff)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Service Worker - Pas de cache
<FilesMatch "sw\.js$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
```

#### Nginx
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2|woff)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location = /sw.js {
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### Service Worker Optimisé

Le Service Worker inclut maintenant :
- ✅ Cache agressif pour les ressources statiques (simule 1 an)
- ✅ Cache intelligent avec timestamps personnalisés
- ✅ Gestion optimisée des polices Google Fonts
- ✅ Stratégie Network-First pour les autres ressources

### Fichiers Générés

- 📄 `.htaccess` - Configuration Apache prête à l'emploi
- 📄 `cache-headers.conf` - Configuration générique des headers

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
