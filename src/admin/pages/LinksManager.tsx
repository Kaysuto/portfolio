import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash, Eye, EyeSlash, Copy, DotsNine, Pencil, X, Check, 
  EnvelopeSimple, DiscordLogo, Globe, GithubLogo, InstagramLogo,
  TwitterLogo, LinkedinLogo, YoutubeLogo, TwitchLogo, PaintBrush,
  GameController, Heart, Star, BookOpen, Code, Camera, MusicNote,
  Coffee, Rocket, Lightning, Fire, MagnifyingGlass, Warning
} from '@phosphor-icons/react';
import { AdminLayout } from '../components/AdminLayout';
import { StaggeredGrid, AnimatedContainer } from '../components/AnimatedComponents';

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

export const LinksManagerPage = () => {
  const navigate = useNavigate();
  
  // État local pour les liens
  const [links, setLinks] = useState<Link[]>([
    { id: '1', title: 'Email', url: 'mailto:contact@kaysuto.fr', description: 'Me contacter directement', isActive: true, position: 1, clicks: 245, icon: 'EnvelopeSimple' },
    { id: '2', title: 'Discord', url: 'https://discord.gg/wJTfwPen', description: 'Rejoins mon serveur', isActive: true, position: 2, clicks: 189, icon: 'DiscordLogo' },
    { id: '3', title: 'Site personnel', url: 'https://kaysuto.fr', description: 'Mon portfolio principal', isActive: true, position: 3, clicks: 167, icon: 'Globe' },
    { id: '4', title: 'Clover Games', url: 'https://www.clovergames.fr', description: 'Mon projet gaming', isActive: true, position: 4, clicks: 134, icon: 'GameController' },
    { id: '5', title: 'DeviantArt', url: 'https://www.deviantart.com/kaysuto', description: 'Mes créations artistiques', isActive: true, position: 5, clicks: 98, icon: 'PaintBrush' },
    { id: '6', title: 'Emoji.gg', url: 'https://emoji.gg/user/kaysuto', description: 'Profil emoji (+100k)', isActive: true, position: 6, clicks: 76, icon: 'Heart' },
    { id: '7', title: 'Pinterest', url: 'https://www.pinterest.fr/kaysuto/', description: 'Mes inspirations', isActive: true, position: 7, clicks: 54, icon: 'Camera' },
    { id: '8', title: 'GitHub', url: 'https://github.com/Kaysuto', description: 'Code & projets open source', isActive: true, position: 8, clicks: 203, icon: 'GithubLogo' },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    icon: 'Globe'
  });

  // Vérifier authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Notification toast
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  // Actions sur les liens
  const toggleLinkActive = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
    showNotification('Statut du lien mis à jour', 'success');
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
    setShowDeleteConfirm(null);
    showNotification('Lien supprimé avec succès', 'success');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Lien copié dans le presse-papiers', 'success');
    } catch (err) {
      showNotification('Erreur lors de la copie', 'error');
    }
  };

  // Drag & Drop
  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = links.findIndex(link => link.id === draggedItem);
    const targetIndex = links.findIndex(link => link.id === targetId);

    const newLinks = [...links];
    const [removed] = newLinks.splice(draggedIndex, 1);
    newLinks.splice(targetIndex, 0, removed);

    // Recalculer les positions
    const updatedLinks = newLinks.map((link, index) => ({
      ...link,
      position: index + 1
    }));

    setLinks(updatedLinks);
    setDraggedItem(null);
    showNotification('Ordre des liens mis à jour', 'success');
  };

  // Formulaires
  const resetForm = () => {
    setFormData({ title: '', url: '', description: '', icon: 'Globe' });
    setEditingLink(null);
    setShowAddForm(false);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.url) {
      showNotification('Veuillez remplir les champs obligatoires', 'error');
      return;
    }

    if (editingLink) {
      // Édition
      setLinks(prev => prev.map(link => 
        link.id === editingLink.id 
          ? { ...link, ...formData }
          : link
      ));
      showNotification('Lien modifié avec succès', 'success');
    } else {
      // Ajout
      const newLink: Link = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        position: links.length + 1,
        clicks: 0
      };
      setLinks(prev => [...prev, newLink]);
      showNotification('Nouveau lien ajouté avec succès', 'success');
    }

    resetForm();
  };

  const startEdit = (link: Link) => {
    setFormData({
      title: link.title,
      url: link.url,
      description: link.description || '',
      icon: link.icon || 'Globe'
    });
    setEditingLink(link);
    setShowAddForm(true);
  };

  // Composant sélecteur d'icônes
  const IconSelector = () => (
    <div className="mt-2">
      <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto border border-border rounded-lg p-2">
        {ICON_OPTIONS.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
              className={`p-2 rounded-lg border transition-all duration-200 hover:scale-110 ${
                formData.icon === option.value
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border hover:border-accent/50'
              }`}
              title={option.name}
            >
              <IconComponent size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );

  // Modal de formulaire
  const FormModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md border border-border animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">
            {editingLink ? 'Modifier le lien' : 'Ajouter un lien'}
          </h3>
          <Button
            onClick={resetForm}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-accent/10"
          >
            <X size={16} />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Titre *</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Mon Awesome Lien"
              className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground">URL *</label>
            <input 
              type="url" 
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <input 
              type="text" 
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description courte..."
              className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Icône</label>
            <div className="flex items-center space-x-2 mt-1">
              {(() => {
                const IconComponent = getIconComponent(formData.icon);
                return <IconComponent size={24} className="text-accent" />;
              })()}
              <span className="text-sm text-muted-foreground">
                {ICON_OPTIONS.find(opt => opt.value === formData.icon)?.name || 'Site Web'}
              </span>
            </div>
            <IconSelector />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button
            onClick={resetForm}
            variant="outline"
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {editingLink ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </div>
    </div>
  );

  // Modal de confirmation de suppression
  const DeleteConfirmModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-sm border border-border animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
            <Warning size={24} className="text-destructive" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Supprimer le lien
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Êtes-vous sûr de vouloir supprimer ce lien ? Cette action ne peut pas être annulée.
          </p>
          <div className="flex space-x-3">
            <Button
              onClick={() => setShowDeleteConfirm(null)}
              variant="outline"
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={() => showDeleteConfirm && deleteLink(showDeleteConfirm)}
              variant="destructive"
              className="flex-1"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AdminLayout 
        title="Gestionnaire de Liens" 
        subtitle="Gérez vos liens avec une interface style solo.to"
        actions={
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground group transition-all duration-300 hover:scale-105"
          >
            <Plus size={16} className="mr-2 group-hover:animate-pulse" />
            Nouveau Lien
          </Button>
        }
      >
        {/* Stats rapides */}
        <StaggeredGrid 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          startDelay={0}
        >
          {[
            { label: "Total Liens", value: links.length, color: "text-foreground" },
            { label: "Actifs", value: links.filter(l => l.isActive).length, color: "text-green-500" },
            { label: "Total Clics", value: links.reduce((sum, l) => sum + l.clicks, 0), color: "text-accent" },
            { label: "Moy. Clics", value: Math.round(links.reduce((sum, l) => sum + l.clicks, 0) / links.length), color: "text-blue-500" }
          ].map((stat, index) => (
            <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border hover:border-accent/20 transition-all duration-300">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </StaggeredGrid>

        {/* Liste des liens avec animations */}
        <div className="space-y-4">
          {links
            .sort((a, b) => a.position - b.position)
            .map((link, index) => {
              const IconComponent = getIconComponent(link.icon || 'Globe');
              return (
                <AnimatedContainer
                  key={link.id}
                  delay={4 + index}
                  className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${
                    link.isActive 
                      ? 'border-accent/30 hover:border-accent/50' 
                      : 'border-border opacity-60 hover:opacity-80'
                  } ${draggedItem === link.id ? 'scale-105 shadow-xl' : ''}`}
                >
                  <div 
                    className="flex items-center justify-between cursor-move"
                    draggable
                    onDragStart={() => handleDragStart(link.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, link.id)}
                  >
                    {/* Drag handle et contenu */}
                    <div className="flex items-center space-x-4">
                      <div className="cursor-grab hover:cursor-grabbing p-2 hover:bg-accent/10 rounded-lg transition-all duration-200">
                        <DotsNine size={20} className="text-muted-foreground hover:text-accent" />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-accent">
                          <IconComponent size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                              {link.title}
                            </h3>
                            {!link.isActive && (
                              <span className="text-xs bg-orange-500/20 text-orange-600 px-2 py-1 rounded">
                                Inactif
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                          <p className="text-xs text-accent mt-1 font-mono">{link.url}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats et actions */}
                    <div className="flex items-center space-x-4">
                      {/* Clics */}
                      <div className="text-center">
                        <p className="text-sm font-bold text-foreground">{link.clicks}</p>
                        <p className="text-xs text-muted-foreground">clics</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        {/* Copier URL */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(link.url)}
                          className="p-2 hover:bg-accent/10 group/btn transition-all duration-300"
                          title="Copier le lien"
                        >
                          <Copy size={16} className="text-muted-foreground group-hover/btn:text-accent" />
                        </Button>

                        {/* Toggle actif/inactif */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLinkActive(link.id)}
                          className="p-2 hover:bg-accent/10 group/btn transition-all duration-300"
                          title={link.isActive ? "Désactiver" : "Activer"}
                        >
                          {link.isActive ? (
                            <Eye size={16} className="text-green-500 group-hover/btn:text-green-400" />
                          ) : (
                            <EyeSlash size={16} className="text-orange-500 group-hover/btn:text-orange-400" />
                          )}
                        </Button>

                        {/* Éditer */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(link)}
                          className="p-2 hover:bg-accent/10 group/btn transition-all duration-300"
                          title="Éditer"
                        >
                          <Pencil size={16} className="text-muted-foreground group-hover/btn:text-accent" />
                        </Button>

                        {/* Supprimer */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(link.id)}
                          className="p-2 hover:bg-destructive/10 group/btn transition-all duration-300"
                          title="Supprimer"
                        >
                          <Trash size={16} className="text-muted-foreground group-hover/btn:text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedContainer>
              );
            })}
        </div>

        {/* État vide */}
        {links.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Aucun lien</h3>
            <p className="text-muted-foreground mb-4">Créez votre premier lien pour commencer</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Plus size={16} className="mr-2" />
              Créer un Lien
            </Button>
          </div>
        )}
      </AdminLayout>

      {/* Modals à l'extérieur de la section */}
      {showAddForm && <FormModal />}
      {showDeleteConfirm && <DeleteConfirmModal />}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border animate-in slide-in-from-right-full duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' ? (
              <Check size={16} className="text-green-600" />
            ) : (
              <X size={16} className="text-red-600" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}
    </>
  );
};
