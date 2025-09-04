import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, Trash, Eye, EyeSlash, Copy, DotsNine, Pencil, X, Check, 
  EnvelopeSimple, DiscordLogo, Globe, GithubLogo, InstagramLogo,
  TwitterLogo, LinkedinLogo, YoutubeLogo, TwitchLogo, PaintBrush,
  GameController, Heart, Star, BookOpen, Code, Camera, MusicNote,
  Coffee, Rocket, Lightning, Fire, MagnifyingGlass, Warning
} from '@phosphor-icons/react';

interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  isActive: boolean;
  position: number;
  clicks: number;
  icon?: string;
}

// Options d'icônes Phosphor disponibles
const ICON_OPTIONS = [
  { name: 'Email', icon: EnvelopeSimple, value: 'EnvelopeSimple' },
  { name: 'Discord', icon: DiscordLogo, value: 'DiscordLogo' },
  { name: 'Site Web', icon: Globe, value: 'Globe' },
  { name: 'GitHub', icon: GithubLogo, value: 'GithubLogo' },
  { name: 'Instagram', icon: InstagramLogo, value: 'InstagramLogo' },
  { name: 'Twitter', icon: TwitterLogo, value: 'TwitterLogo' },
  { name: 'LinkedIn', icon: LinkedinLogo, value: 'LinkedinLogo' },
  { name: 'YouTube', icon: YoutubeLogo, value: 'YoutubeLogo' },
  { name: 'Twitch', icon: TwitchLogo, value: 'TwitchLogo' },
  { name: 'Art', icon: PaintBrush, value: 'PaintBrush' },
  { name: 'Gaming', icon: GameController, value: 'GameController' },
  { name: 'Favoris', icon: Heart, value: 'Heart' },
  { name: 'Star', icon: Star, value: 'Star' },
  { name: 'Blog', icon: BookOpen, value: 'BookOpen' },
  { name: 'Code', icon: Code, value: 'Code' },
  { name: 'Photo', icon: Camera, value: 'Camera' },
  { name: 'Music', icon: MusicNote, value: 'MusicNote' },
  { name: 'Coffee', icon: Coffee, value: 'Coffee' },
  { name: 'Rocket', icon: Rocket, value: 'Rocket' },
  { name: 'Lightning', icon: Lightning, value: 'Lightning' },
  { name: 'Fire', icon: Fire, value: 'Fire' },
];

// Fonction pour obtenir l'icône à partir de la valeur
const getIconComponent = (iconValue: string) => {
  const iconOption = ICON_OPTIONS.find(opt => opt.value === iconValue);
  return iconOption ? iconOption.icon : Globe;
};

export const LinksManagerPage: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Site personnel',
      url: 'https://kaysuto.fr',
      description: 'Mon portfolio principal',
      isActive: true,
      position: 1,
      clicks: 156,
      icon: 'Globe'
    },
    {
      id: '2',
      title: 'GitHub',
      url: 'https://github.com/Kaysuto',
      description: 'Code & projets open source',
      isActive: true,
      position: 2,
      clicks: 89,
      icon: 'GithubLogo'
    },
    {
      id: '3',
      title: 'Discord',
      url: 'https://discord.gg/wJTfwPen',
      description: 'Rejoins mon serveur',
      isActive: true,
      position: 3,
      clicks: 234,
      icon: 'DiscordLogo'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Formulaire
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    icon: 'Globe'
  });

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLink) {
      // Modifier un lien existant
      setLinks(links.map(link => 
        link.id === editingLink.id 
          ? { ...link, ...formData }
          : link
      ));
      showToastMessage('Lien modifié avec succès');
    } else {
      // Créer un nouveau lien
      const newLink: Link = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        position: links.length + 1,
        clicks: 0
      };
      setLinks([...links, newLink]);
      showToastMessage('Nouveau lien créé avec succès');
    }
    
    closeModal();
  };

  const openModal = (link?: Link) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description || '',
        icon: link.icon || 'Globe'
      });
    } else {
      setEditingLink(null);
      setFormData({ title: '', url: '', description: '', icon: 'Globe' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
    setFormData({ title: '', url: '', description: '', icon: 'Globe' });
  };

  const toggleLinkStatus = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
    const link = links.find(l => l.id === id);
    showToastMessage(`Lien ${link?.isActive ? 'désactivé' : 'activé'}`);
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    showToastMessage('Lien supprimé');
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToastMessage('URL copiée dans le presse-papiers');
  };

  // Drag and Drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newLinks = [...links];
    const draggedLink = newLinks[draggedIndex];
    newLinks.splice(draggedIndex, 1);
    newLinks.splice(dropIndex, 0, draggedLink);

    // Mettre à jour les positions
    const updatedLinks = newLinks.map((link, index) => ({
      ...link,
      position: index + 1
    }));

    setLinks(updatedLinks);
    setDraggedIndex(null);
    showToastMessage('Ordre des liens mis à jour');
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.isActive).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestionnaire de Liens</h1>
          <p className="text-muted-foreground">Gérez vos liens sociaux et professionnels</p>
        </div>
        <Button 
          onClick={() => openModal()}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau lien
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total des liens</p>
              <p className="text-2xl font-bold text-foreground">{links.length}</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Liens actifs</p>
              <p className="text-2xl font-bold text-green-600">{activeLinks}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total des clics</p>
              <p className="text-2xl font-bold text-blue-600">{totalClicks}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <MagnifyingGlass className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Liste des liens */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Mes Liens</h2>
        </div>
        
        <div className="divide-y divide-border">
          {links
            .sort((a, b) => a.position - b.position)
            .map((link, index) => {
              const IconComponent = getIconComponent(link.icon || 'Globe');
              return (
                <div
                  key={link.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-move"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <DotsNine className="w-5 h-5 text-muted-foreground" />
                      
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground truncate">{link.title}</h3>
                          {!link.isActive && (
                            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs rounded-full">
                              Inactif
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                        {link.description && (
                          <p className="text-sm text-muted-foreground/80 truncate">{link.description}</p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{link.clicks} clics</p>
                        <p className="text-xs text-muted-foreground">Position {link.position}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(link.url)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleLinkStatus(link.id)}
                        className="h-8 w-8 p-0"
                      >
                        {link.isActive ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeSlash className="w-4 h-4 text-red-600" />
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openModal(link)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteLink(link.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-card rounded-2xl w-full max-w-md p-6 shadow-2xl border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                {editingLink ? 'Modifier le lien' : 'Nouveau lien'}
              </h3>
              <Button variant="outline" size="sm" onClick={closeModal} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Ex: Mon site web"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="https://exemple.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Description du lien"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Icône
                </label>
                <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                  {ICON_OPTIONS.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: option.value })}
                        className={`p-3 rounded-lg border transition-colors ${
                          formData.icon === option.value
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mx-auto text-foreground" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Annuler
                </Button>
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Check className="w-4 h-4 mr-2" />
                  {editingLink ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-card border border-border p-4 rounded-lg shadow-lg">
            <p className="text-sm text-foreground">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
