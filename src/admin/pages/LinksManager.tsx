import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Plus, Pencil, Trash, CheckCircle, X, Eye, EyeSlash, MagnifyingGlass, Funnel, ChartBar, Link as LinkIcon } from '@phosphor-icons/react';
import { LinksService, PortfolioLink, CreateLinkData, UpdateLinkData } from '../services/linksService';

export default function LinksManager() {
  const [links, setLinks] = useState<PortfolioLink[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLink, setEditingLink] = useState<PortfolioLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | PortfolioLink['type']>('all');
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'other' as PortfolioLink['type'],
    description: '',
    is_active: true
  });

  const loadLinks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const linksData = await LinksService.getAllLinks();
      setLinks(linksData);
    } catch (err) {
      console.error('Erreur chargement liens:', err);
      setError('Erreur lors du chargement des liens');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      type: 'other',
      description: '',
      is_active: true
    });
    setIsEditing(false);
    setEditingLink(null);
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditing && editingLink) {
        const updateData: UpdateLinkData = {
          id: editingLink.id,
          ...formData
        };
        await LinksService.updateLink(updateData);
      } else {
        const createData: CreateLinkData = formData;
        await LinksService.createLink(createData);
      }

      await loadLinks();
      resetForm();
    } catch (err) {
      console.error('Erreur sauvegarde lien:', err);
      setError('Erreur lors de la sauvegarde du lien');
    }
  };

  const handleEdit = (link: PortfolioLink) => {
    setFormData({
      title: link.title,
      url: link.url,
      type: link.type,
      description: link.description || '',
      is_active: link.is_active
    });
    setIsEditing(true);
    setEditingLink(link);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) return;

    try {
      await LinksService.deleteLink(id);
      await loadLinks();
    } catch (err) {
      console.error('Erreur suppression lien:', err);
      setError('Erreur lors de la suppression du lien');
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await LinksService.toggleLinkStatus(id);
      await loadLinks();
    } catch (err) {
      console.error('Erreur toggle statut:', err);
      setError('Erreur lors du changement de statut');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'github': return 'bg-neutral-3 text-neutral-11 border-neutral-6';
      case 'live': return 'bg-green-3 text-green-11 border-green-6';
      case 'social': return 'bg-accent-3 text-accent-11 border-accent-6';
      default: return 'bg-accent-secondary-3 text-accent-secondary-11 border-accent-secondary-6';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'github': return '🐙';
      case 'live': return '🌐';
      case 'social': return '👥';
      default: return '🔗';
    }
  };

  // Filtrage et recherche des liens
  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === 'all' ||
                           (statusFilter === 'active' && link.is_active) ||
                           (statusFilter === 'inactive' && !link.is_active);

      const matchesType = typeFilter === 'all' || link.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [links, searchTerm, statusFilter, typeFilter]);

  // Statistiques des liens
  const linkStats = useMemo(() => {
    const total = links.length;
    const active = links.filter(link => link.is_active).length;
    const totalClicks = links.reduce((sum, link) => sum + link.click_count, 0);
    const avgClicks = total > 0 ? Math.round(totalClicks / total) : 0;

    return { total, active, totalClicks, avgClicks };
  }, [links]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-7xl mx-auto h-full">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Gestion des</span>
            <br />
            <span className="text-accent">Liens</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Administration des liens de votre portfolio
          </p>
        </div>

        <div className="space-y-6">
          {/* Header avec bouton */}
          <div className="flex items-center justify-between bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Liens du portfolio</h2>
              <p className="text-muted-foreground">Gérez vos liens et leur visibilité</p>
            </div>
            <Button onClick={() => {
              setIsEditing(false);
              setEditingLink(null);
              resetForm();
              setShowModal(true);
            }} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau lien
            </Button>
          </div>

      {error && (
        <div className="bg-red-2 border border-red-6 rounded-lg p-4 dark:bg-red-3 dark:border-red-7">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 text-red-9" />
            <span className="text-red-11">{error}</span>
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{linkStats.total}</p>
              </div>
              <LinkIcon className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Actifs</p>
                <p className="text-2xl font-bold">{linkStats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-violet-500/10 to-violet-600/10 border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clics</p>
                <p className="text-2xl font-bold">{linkStats.totalClicks}</p>
              </div>
              <ChartBar className="h-8 w-8 text-violet-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-500/20 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Moyenne</p>
                <p className="text-2xl font-bold">{linkStats.avgClicks}</p>
              </div>
              <ChartBar className="h-8 w-8 text-rose-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par titre, URL ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Tous
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Actifs
              </Button>
              <Button
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('inactive')}
              >
                Inactifs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {isEditing ? 'Modifier le lien' : 'Nouveau lien'}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowModal(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Titre du lien"
                  required
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PortfolioLink['type'] })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="github">GitHub</option>
                  <option value="live">Site web</option>
                  <option value="social">Réseau social</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <Label htmlFor="is_active">Statut</Label>
                <select
                  id="is_active"
                  value={formData.is_active.toString()}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="true">Actif</option>
                  <option value="false">Inactif</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description (optionnel)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description du lien"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEditing ? 'Modifier' : 'Créer'}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
          </div>
        </div>
      )}

      {/* Liste des liens */}
      <Card>
        <CardHeader>
          <CardTitle>Liens ({links.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLinks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {links.length === 0 ? 'Aucun lien trouvé. Créez votre premier lien !' : 'Aucun lien ne correspond aux filtres.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{link.title}</h3>
                      <Badge className={getTypeColor(link.type)}>
                        {getTypeIcon(link.type)} {link.type}
                      </Badge>
                      <Badge variant={link.is_active ? "default" : "secondary"}>
                        {link.is_active ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Actif
                          </>
                        ) : (
                          <>
                            <X className="h-3 w-3 mr-1" />
                            Inactif
                          </>
                        )}
                      </Badge>
                      {link.click_count > linkStats.avgClicks * 1.5 && (
                        <Badge className="bg-orange-3 text-orange-11 border-orange-6">
                          🔥 Populaire
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <span>{link.url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                        className="h-6 w-6 p-0"
                      >
                        <LinkIcon className="h-3 w-3" />
                      </Button>
                    </p>
                    {link.description && (
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-xs text-muted-foreground">
                        <ChartBar className="h-3 w-3 inline mr-1" />
                        {link.click_count} clics
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Créé le {new Date(link.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(link.id)}
                    >
                      {link.is_active ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(link)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(link.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
}
