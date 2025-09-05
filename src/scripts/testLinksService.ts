import { LinksService } from '../admin/services/linksService';

export const testLinksService = async () => {
  console.log('🧪 Test du service LinksService...');
  
  try {
    const links = await LinksService.getAllLinks();
    console.log('✅ Service fonctionne!');
    console.log('📊 Nombre de liens:', links.length);
    console.log('📋 Liens récupérés:', links);
    
    // Afficher les types de liens
    const linkTypes = links.reduce((acc, link) => {
      acc[link.type] = (acc[link.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('📈 Répartition par type:', linkTypes);
    
    return {
      success: true,
      count: links.length,
      links,
      types: linkTypes
    };
    
  } catch (error) {
    console.error('❌ Erreur service:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
