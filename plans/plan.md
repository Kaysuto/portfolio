# Plan d'amélioration de la page Bio

L'objectif est d'intégrer 17 nouveaux liens et d'améliorer l'organisation visuelle de la page en les catégorisant.

## 1. Mise à jour des données ([`src/data/links.ts`](src/data/links.ts))
- [ ] Étendre l'interface `BioLink` pour inclure un champ `category`.
- [ ] Remplacer les liens existants par la nouvelle liste fournie.
- [ ] Assigner une catégorie à chaque lien (`social`, `community`, `websites`).

## 2. Mise à jour du service ([`src/services/bioLinksService.ts`](src/services/bioLinksService.ts))
- [ ] Mettre à jour `bioLinkIcons` pour mapper les nouveaux titres aux icônes Lucide.
- [ ] Ajouter une méthode pour récupérer les liens groupés par catégorie.

## 3. Amélioration de l'interface ([`src/pages/BioPage.tsx`](src/pages/BioPage.tsx))
- [ ] Importer les nouvelles icônes Lucide nécessaires (`Twitch`, `Music`, `Tv`, `Film`, `BarChart3`, `Smile`).
- [ ] Modifier le rendu pour afficher des sections par catégorie.
- [ ] Optimiser le design pour la densité d'informations (17 liens).

## 4. Validation
- [ ] Vérifier que tous les liens s'ouvrent correctement.
- [ ] Vérifier le responsive (mobile vs desktop).
