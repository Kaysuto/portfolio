# Plan de Refonte Visuelle - Identité "Kaysuto"

Ce plan vise à restaurer et moderniser l'identité visuelle originale du site kaysuto.fr, caractérisée par des tons chauds, terreux et une typographie Montserrat affirmée.

## 1. Charte Graphique

### Palette de Couleurs (Mode Sombre)
- **Fond (Background) :** `#14110F` (Brun-noir profond).
- **Surface (Cards/Modals) :** `#1C1816` avec bordure `#2D2421`.
- **Accent :** `#A68B7C` (Beige terreux) ou `#D4A373`.
- **Texte :**
  - Primaire : `#E6E1DF`
  - Secondaire : `#A68B7C`

### Palette de Couleurs (Mode Clair)
- **Fond (Background) :** `#F2EBE4`.
- **Texte :** `#2D2421`.

### Typographie
- **Police :** `Montserrat` (Google Fonts).
- **Style :** Poids `900` (Black) pour les titres, `italic` fréquent pour le style "Studio".

## 2. Composants d'Interface (UI)

### Cartes (Cards)
- Rayon de bordure : `2rem` (très arrondi).
- Bordures : `2px` solides.
- Style : "Glassmorphism" léger avec des tons bruns.

### Boutons
- Style : Très arrondis (`full` ou `2rem`).
- Typographie : `font-black`, `uppercase`, `italic`.

### Navigation
- Navbar avec liens centrés dans un conteneur arrondi.
- Utilisation de `framer-motion` pour des transitions fluides.

## 3. Étapes d'Implémentation (Mode Code requis)

1. **Restauration des Design Tokens :** Réinitialiser [`src/styles/theme.css`](src/styles/theme.css) avec les couleurs terreuses.
2. **Typographie :** Réinstaller `Montserrat` dans [`index.html`](index.html).
3. **Composants :** Redonner aux boutons et cartes leur aspect "Studio/Bold".
4. **Sections :** Réappliquer les styles spécifiques (Hero avec texte géant, badges arrondis).

---
*Note : Ce plan abandonne le style minimaliste Apple pour revenir à l'ADN visuel de Kaysuto.*
