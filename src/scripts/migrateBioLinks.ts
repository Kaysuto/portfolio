import { LinksService, CreateLinkData } from '../admin/services/linksService';

// Données des liens bio extraites de BioPage.tsx
const bioLinksData: CreateLinkData[] = [
  {
    title: 'Email',
    url: 'mailto:contact@kaysuto.fr',
    type: 'bio_link',
    description: 'Me contacter directement',
    is_active: true
  },
  {
    title: 'Discord',
    url: 'https://discord.gg/wJTfwPen',
    type: 'bio_link',
    description: 'Rejoins mon serveur',
    is_active: true
  },
  {
    title: 'Site personnel',
    url: 'https://kaysuto.fr',
    type: 'bio_link',
    description: 'Mon portfolio principal',
    is_active: true
  },
  {
    title: 'Clover Games',
    url: 'https://www.clovergames.fr',
    type: 'bio_link',
    description: 'Mon projet gaming',
    is_active: true
  },
  {
    title: 'DeviantArt',
    url: 'https://www.deviantart.com/kaysuto',
    type: 'bio_link',
    description: 'Mes créations artistiques',
    is_active: true
  },
  {
    title: 'Emoji.gg',
    url: 'https://emoji.gg/user/kaysuto',
    type: 'bio_link',
    description: 'Profil emoji (+100k)',
    is_active: true
  },
  {
    title: 'Pinterest',
    url: 'https://www.pinterest.fr/kaysuto/',
    type: 'bio_link',
    description: 'Mes inspirations',
    is_active: true
  },
  {
    title: 'GitHub',
    url: 'https://github.com/Kaysuto',
    type: 'bio_link',
    description: 'Code & projets open source',
    is_active: true
  }
];

export const migrateBioLinks = async () => {
  console.log('🚀 Démarrage de la migration des liens bio...');
  
  try {
    // Vérifier s'il y a déjà des liens bio
    const existingLinks = await LinksService.getAllLinks();
    const existingBioLinks = existingLinks.filter(link => link.type === 'bio_link');
    
    if (existingBioLinks.length > 0) {
      console.log(`⚠️  ${existingBioLinks.length} liens bio existants trouvés. Migration annulée.`);
      return { success: false, message: 'Des liens bio existent déjà' };
    }

    // Injecter les liens bio un par un
    const results: any[] = [];
    for (const linkData of bioLinksData) {
      try {
        const createdLink = await LinksService.createLink(linkData);
        results.push(createdLink);
        console.log(`✅ Lien créé: ${linkData.title}`);
      } catch (error) {
        console.error(`❌ Erreur pour ${linkData.title}:`, error);
        throw error;
      }
    }

    console.log(`🎉 Migration terminée! ${results.length} liens bio créés.`);
    return { 
      success: true, 
      message: `${results.length} liens bio migrés avec succès`,
      links: results 
    };

  } catch (error) {
    console.error('💥 Erreur lors de la migration:', error);
    return { 
      success: false, 
      message: `Erreur de migration: ${error.message}`,
      error 
    };
  }
};

// Fonction pour supprimer tous les liens bio (utile pour les tests)
export const cleanBioLinks = async () => {
  console.log('🧹 Suppression des liens bio...');
  
  try {
    const allLinks = await LinksService.getAllLinks();
    const bioLinks = allLinks.filter(link => link.type === 'bio_link');
    
    for (const link of bioLinks) {
      await LinksService.deleteLink(link.id);
      console.log(`🗑️  Supprimé: ${link.title}`);
    }
    
    console.log(`✅ ${bioLinks.length} liens bio supprimés.`);
    return { success: true, count: bioLinks.length };
    
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    return { success: false, error };
  }
};
