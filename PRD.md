# Portfolio Minimaliste pour Kimiya - PRD

Portfolio élégant pour Kimiya, Full-Stack Maker de 23 ans passionné par la création d'expériences numériques performantes et les modèles de langage.

**Experience Qualities**:
1. **Sophistiqué** - Design raffiné avec une palette noisette chaleureuse qui reflète l'expertise technique
2. **Fluide** - Animations subtiles et transitions naturelles pour une expérience utilisateur engageante
3. **Professionnel** - Présentation claire des compétences et projets avec un focus sur la qualité

**Complexity Level**: Content Showcase (information-focused)
Portfolio centré sur la présentation des compétences, projets et expertise technique avec quelques interactions pour améliorer l'engagement utilisateur.

## Essential Features

**Navigation Principal**
- Functionality: Barre de navigation fixe avec liens vers sections + contrôleur de thème
- Purpose: Navigation fluide et contrôle de l'apparence
- Trigger: Interaction utilisateur avec les liens ou le bouton thème
- Progression: Clic → Animation de scroll smooth → Arrivée section → Highlight nav actif
- Success criteria: Navigation responsive, smooth scroll, thème persistent

**Section Hero**
- Functionality: Présentation impactante avec nom, titre et description
- Purpose: Première impression forte et introduction personnelle
- Trigger: Chargement de page
- Progression: Chargement → Animation d'apparition progressive → CTA visible
- Success criteria: Typographie claire, animations fluides, responsive parfait

**Portfolio Projets**
- Functionality: Showcase de 3 projets principaux avec détails techniques
- Purpose: Démontrer l'expertise et la diversité des compétences
- Trigger: Scroll vers section ou navigation
- Progression: Arrivée section → Animation cartes → Hover effects → Détails visibles
- Success criteria: Cartes interactives, informations claires, design cohérent

**Intégration GitHub**
- Functionality: Statistiques dynamiques depuis l'API GitHub
- Purpose: Crédibilité technique avec données en temps réel
- Trigger: Chargement de composant
- Progression: Mount composant → API call → Affichage stats → Refresh périodique
- Success criteria: Données actualisées, gestion erreurs, design intégré

**Section Contact**
- Functionality: Informations de contact avec email principal
- Purpose: Faciliter la prise de contact professionnel
- Trigger: Navigation ou scroll
- Progression: Arrivée section → Animation → Email visible → Interaction possible
- Success criteria: Email cliquable, design accessible, informations claires

## Edge Case Handling

- **API GitHub indisponible**: Fallback avec données statiques et message discret
- **Connexion lente**: Loading states avec skeletons pour tous les éléments dynamiques
- **Navigation mobile**: Menu hamburger responsive avec animations fluides
- **Thème non supporté**: Fallback sur thème clair avec détection système
- **Contenu long**: Scrollbar personnalisée et pagination si nécessaire

## Design Direction

Design sophistiqué et minimaliste inspiré des interfaces modernes avec une approche "warm minimalism" - combinaison de simplicité et de chaleur humaine à travers la palette noisette. Interface riche en micro-interactions mais épurée visuellement.

## Color Selection

Palette analogique (nuances de brun/beige) créant une harmonie chaleureuse et professionnelle.

- **Primary Color**: Chocolat noisette raffiné (#A0724B) - Sérieux et expertise technique
- **Secondary Colors**: Crème noisette (#F5E6D3) pour les sections et accents subtils
- **Accent Color**: Noisette dorée (#D4A574) - CTA et éléments interactifs importants
- **Foreground/Background Pairings**:
  - Background (Fond principal #FFFEF9): Texte chocolat foncé (#3C2A1E) - Ratio 12.8:1 ✓
  - Card (Blanc crème #FEFCF9): Texte chocolat foncé (#3C2A1E) - Ratio 12.9:1 ✓
  - Primary (Chocolat noisette #A0724B): Texte crème (#F5E6D3) - Ratio 4.8:1 ✓
  - Accent (Noisette dorée #D4A574): Texte chocolat foncé (#3C2A1E) - Ratio 5.2:1 ✓

## Font Selection

Typographies modernes et lisibles évoquant le professionnalisme et l'élégance technique - Inter pour sa neutralité parfaite et sa lisibilité optimale sur tous supports.

- **Typographic Hierarchy**:
  - H1 (Nom principal): Inter Bold/48px/tight letter-spacing (-0.02em)
  - H2 (Sections): Inter SemiBold/32px/normal letter-spacing
  - H3 (Sous-titres): Inter Medium/24px/normal letter-spacing
  - Body (Texte principal): Inter Regular/16px/relaxed line-height (1.6)
  - Caption (Métadonnées): Inter Regular/14px/normal letter-spacing

## Animations

Animations subtiles et naturelles servant l'expérience sans être intrusives - mouvement organique reflétant la personnalité créative tout en restant professionnel.

- **Purposeful Meaning**: Animations de scroll progressif, hover effects sophistiqués, transitions d'état fluides
- **Hierarchy of Movement**: Hero (fade-in progressive), Cards (stagger animation), Navigation (smooth scroll), Interactions (micro-feedbacks)

## Component Selection

- **Components**: Cards pour projets, Button variants (primary/secondary), Avatar pour profil, Badge pour technologies, Separator pour divisions
- **Customizations**: Timeline personnalisée pour parcours, Stat cards pour GitHub metrics, Theme toggle avec animation
- **States**: Buttons (hover/active/focus avec couleurs palette), Cards (hover elevate), Links (underline animation)
- **Icon Selection**: Phosphor icons pour cohérence - Code, Database, Palette pour compétences, GitHub, Email, etc.
- **Spacing**: Système 4px base - sections (py-20), cards (p-6), éléments (gap-4/6/8)
- **Mobile**: Navigation collapse avec drawer, cards stack vertical, texte responsive, touch targets 44px minimum