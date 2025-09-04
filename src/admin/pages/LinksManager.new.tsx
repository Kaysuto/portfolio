import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, Eye, EyeSlash, Copy, DotsNine, Pencil } from '@phosphor-icons/react';
import { AdminLayout } from '../components/AdminLayout';

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

export const LinksManagerPage = () => {
  const navigate = useNavigate();
  
  // État local pour les liens (simulé)
  const [links, setLinks] = useState<Link[]>([
    { id: '1', title: 'Portfolio GitHub', url: 'https://github.com/kaysuto', description: 'Mon code source', isActive: true, position: 1, clicks: 127, icon: '🚀' },
    { id: '2', title: 'LinkedIn Professionnel', url: 'https://linkedin.com/in/kimiya-kaysuto', description: 'Réseau professionnel', isActive: true, position: 2, clicks: 89, icon: '💼' },
    { id: '3', title: 'Email Contact', url: 'mailto:kimiya@kaysuto.dev', description: 'Contact direct', isActive: true, position: 3, clicks: 56, icon: '📧' },
    { id: '4', title: 'Discord Communauté', url: 'https://discord.gg/kaysuto', description: 'Communauté tech', isActive: false, position: 4, clicks: 23, icon: '🎮' },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Vérifier authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Actions sur les liens
  const toggleLinkActive = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  const AddLinkForm = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md border border-border">
        <h3 className="text-xl font-bold mb-4 text-foreground">Ajouter un Lien</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Titre</label>
            <input 
              type="text" 
              placeholder="Mon Awesome Lien"
              className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-foreground">URL</label>
            <input 
              type="url" 
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description (optionnel)</label>
            <input 
              type="text" 
              placeholder="Description courte..."
              className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Icône (emoji)</label>
            <input 
              type="text" 
              placeholder="🔗"
              className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground"
              maxLength={2}
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button
            onClick={() => setShowAddForm(false)}
            variant="outline"
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            onClick={() => setShowAddForm(false)}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );

  return (
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Liens</p>
          <p className="text-2xl font-bold text-foreground">{links.length}</p>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Actifs</p>
          <p className="text-2xl font-bold text-green-500">{links.filter(l => l.isActive).length}</p>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Clics</p>
          <p className="text-2xl font-bold text-accent">{links.reduce((sum, l) => sum + l.clicks, 0)}</p>
        </div>
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Moy. Clics</p>
          <p className="text-2xl font-bold text-blue-500">{Math.round(links.reduce((sum, l) => sum + l.clicks, 0) / links.length)}</p>
        </div>
      </div>

      {/* Liste des liens avec drag & drop */}
      <div className="space-y-4">
        {links
          .sort((a, b) => a.position - b.position)
          .map((link, index) => (
            <div
              key={link.id}
              className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group ${
                link.isActive 
                  ? 'border-accent/30 hover:border-accent/50' 
                  : 'border-border opacity-60 hover:opacity-80'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                {/* Drag handle */}
                <div className="flex items-center space-x-4">
                  <div className="cursor-grab hover:cursor-grabbing p-2 hover:bg-accent/10 rounded-lg transition-all duration-200">
                    <DotsNine size={20} className="text-muted-foreground hover:text-accent" />
                  </div>
                  
                  {/* Icône et contenu */}
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{link.icon}</div>
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
                      onClick={() => setEditingLink(link)}
                      className="p-2 hover:bg-accent/10 group/btn transition-all duration-300"
                      title="Éditer"
                    >
                      <Pencil size={16} className="text-muted-foreground group-hover/btn:text-accent" />
                    </Button>

                    {/* Supprimer */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLink(link.id)}
                      className="p-2 hover:bg-destructive/10 group/btn transition-all duration-300"
                      title="Supprimer"
                    >
                      <Trash size={16} className="text-muted-foreground group-hover/btn:text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

      {/* Formulaire d'ajout */}
      {showAddForm && <AddLinkForm />}
    </AdminLayout>
  );
};
