# Plan de Refonte Graphique - Portfolio Kimiya

## 📊 Analyse Existante

| Élément | Actuel | Observation |
|---------|--------|-------------|
| **Accent** | `#B8956A` (doré/beige) | Conservé - identité forte |
| **Dark BG** | `#1a0f08` (chocolat) | Trop sombre, manque contraste |
| **Système** | Tailwind v4 + Shadcn + Radix | Infrastructure solide |
| **Contact** | Grid 3 cols, formulaire dense | Refonte complète nécessaire |

---

## 🎨 Nouvelle Palette Proposée

```css
/* Accent Principal - conservé */
--accent: #B8956A;
--accent-light: #D4B896;
--accent-dark: #9A7B54;

/* Nouveaux fonds - plus lumineux */
--bg-dark: #0F1419;        /* Bleu-noir profond */
--bg-card: #1A2332;        /* Bleu-gris élégant */
--bg-elevated: #243447;    /* Pour cartes/modals */

/* Neutres raffinés */
--text-primary: #F8FAFC;
--text-secondary: #94A3B8;
--text-muted: #64748B;

/* Accents secondaires */
--success: #10B981;
--info: #3B82F6;
--border: rgba(255,255,255,0.08);
```

---

## 🔄 Étapes d'Implémentation

### 1. Variables CSS Globales
**Fichier** : `src/main.css`
- [ ] Mettre à jour `:root` et `.dark` avec nouvelle palette
- [ ] Ajouter variables gradient et glow
- [ ] Harmoniser les tokens Shadcn

### 2. Refonte ContactSection
**Fichier** : `src/components/ContactSection.tsx`

**Structure proposée :**

```
┌─────────────────────────────────────────────────────┐
│  HEADER SECTION                                      │
│  Titre + Sous-titre centré                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────┐  ┌────────────────────────┐   │
│  │  INFOS CONTACT   │  │  FORMULAIRE            │   │
│  │                  │  │                        │   │
│  │  📧 Email        │  │  [Nom]      [Email]    │   │
│  │  copier/mailto   │  │                        │   │
│  │                  │  │  [Entreprise] [Sujet]  │   │
│  │  🟢 Disponible   │  │                        │   │
│  │                  │  │  [Type projet ▼]       │   │
│  │  ⚡ Réponse <24h │  │                        │   │
│  │                  │  │  [Message textarea]    │   │
│  │  📍 Localisation │  │                        │   │
│  └──────────────────┘  │  [====ENVOYER====]     │   │
│                        └────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Améliorations UX :**
- [ ] Layout inversé : infos à gauche (1/3), formulaire à droite (2/3)
- [ ] Supprimer champ "Budget" (barrière psychologique)
- [ ] Icônes Phosphor avec hover glow
- [ ] Labels flottants sur les inputs
- [ ] Validation temps réel avec feedback visuel
- [ ] Bouton envoi avec animation loading/success
- [ ] Card glassmorphism avec backdrop-blur

### 3. Propagation Charte Graphique
**Fichiers impactés :**
- [ ] `src/components/Navbar.tsx` - couleurs + effets hover
- [ ] `src/components/HeroSection.tsx` - gradients + accents
- [ ] `src/components/AboutSection.tsx` - cards + badges
- [ ] `src/components/ProjectsSection.tsx` - cartes projets
- [ ] `src/components/Footer.tsx` - cohérence globale

---

## 🎯 Spécifications Visuelles Contact

### Carte Glassmorphism
```css
.glass-card {
  background: rgba(26, 35, 50, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}
```

### Icônes Interactives
```css
.icon-hover {
  transition: all 0.3s ease;
}
.icon-hover:hover {
  color: var(--accent);
  filter: drop-shadow(0 0 8px var(--accent));
  transform: translateY(-2px);
}
```

### Inputs Modernisés
```css
.input-modern {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  transition: all 0.2s ease;
}
.input-modern:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(184,149,106,0.15);
}
```

---

## 📋 Checklist Finale

- [ ] Palette cohérente sur toutes les sections
- [ ] Contraste WCAG AA minimum (4.5:1)
- [ ] Animations fluides (60fps)
- [ ] Responsive mobile-first
- [ ] États hover/focus/active définis
- [ ] Dark/Light mode fonctionnel

---

## ⏭️ Prochaine Action

**Validation requise** : Ce plan correspond-il à votre vision ?
- Palette de couleurs ?
- Layout section contact ?
- Autre préférence ?

Une fois validé → Switch en mode **Code** pour implémentation.
