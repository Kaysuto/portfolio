# Stickers du personnage

Les visuels servis sont dans `public/stickers/`, en **256×256 PNG transparent**.
Les originaux en 1254×1254 sont conservés dans `design/stickers-sources/`
(exclus du dépôt via `.gitignore`, ils pèsent ~10 Mo).

Pour en ajouter un : déposer le fichier dans `public/stickers/` puis l'inscrire
dans la table `STICKERS` de `src/components/ui/Sticker.tsx`.

## Correspondance actuelle

| Fichier | Sticker | Où il apparaît |
|---|---|---|
| `kimiya-salut.png` | main levée, sourire | Accueil — à côté de « Salut, je suis » |
| `kimiya-reflechit.png` | doigt sur le menton | À propos — rail « Mon parcours » (desktop) |
| `kimiya-dodo.png` | bâillement, ZZZ | À propos — face à « La nuit, je construis… » |
| `kimiya-motive.png` | poings levés, étincelles | Projets — à côté de « Voir tous mes projets » |
| `kimiya-pouce.png` | pouce levé | Contact — après l'envoi réussi du formulaire |
| `kimiya-coeur.png` | cœur avec les mains | Pied de page — bloc identité |

## Format

- **PNG à fond transparent** (les sources ont un fond blanc : le détourer, sinon
  un carré blanc apparaîtra sur le fond crème et sur le fond sombre).
- **256×256 px suffit** : la plus grande taille utilisée est 112 px, donc 256 px
  couvre les écrans à densité ×2. Les sources en 1250×1250 pèsent inutilement lourd.
- WebP accepté aussi — dans ce cas, mettre à jour les extensions dans
  `src/components/ui/Sticker.tsx`.

Tant qu'un fichier est absent, le composant `Sticker` ne rend rien : aucune
image cassée ne s'affiche, la mise en page reste correcte.
