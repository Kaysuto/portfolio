import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Plus, Pencil, Trash, CheckCircle, X, Eye, EyeSlash, MagnifyingGlass, Funnel, ChartBar, Link as LinkIcon, Database, Wrench, Bug, CaretUp as ChevronUp, CaretDown as ChevronDown, CircleNotch as Loader2, MagnifyingGlass as Search, Terminal, Gear as Settings, GithubLogo as Github, Globe, ShareNetwork as Share, User } from '@phosphor-icons/react';
import { LinksService, PortfolioLink, CreateLinkData, UpdateLinkData } from '../services/linksService';
import { migrateBioLinks, cleanBioLinks } from '../../scripts/migrateBioLinks';
import { createLinksTable, checkTableExists, getTableInfo } from '../../scripts/createLinksTable';
import { useModal } from '../../hooks/useModal';

export default function LinksManager() {
  const [links, setLinks] = useState<PortfolioLink[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLink, setEditingLink] = useState<PortfolioLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { isModalOpen, modalMounted, isClosing, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | PortfolioLink['type']>('all');
  
  // États pour les fonctionnalités debug intégrées
  const [showDebugTools, setShowDebugTools] = useState(false);
  const [tableInfo, setTableInfo] = useState<any>(null);
  const [debugResult, setDebugResult] = useState<any>(null);
  const [debugLoading, setDebugLoading] = useState(false);
  
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
      console.error('❌ Erreur chargement liens:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des liens');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

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

  // Grouper les liens par type
  const linksByType = useMemo(() => {
    const grouped = filteredLinks.reduce((acc, link) => {
      if (!acc[link.type]) {
        acc[link.type] = [];
      }
      acc[link.type].push(link);
      return acc;
    }, {} as Record<string, PortfolioLink[]>);
    
    // Trier les groupes par ordre de préférence
    const typeOrder = ['bio_link', 'github', 'live', 'social', 'other'];
    const sortedGroups: Record<string, PortfolioLink[]> = {};
    
    typeOrder.forEach(type => {
      if (grouped[type]) {
        sortedGroups[type] = grouped[type];
      }
    });
    
    // Ajouter les types non prévus à la fin
    Object.keys(grouped).forEach(type => {
      if (!typeOrder.includes(type)) {
        sortedGroups[type] = grouped[type];
      }
    });
    
    return sortedGroups;
  }, [filteredLinks]);

  // Fonction pour obtenir le label du type
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'bio_link': 'Liens Bio',
      'github': 'GitHub',
      'live': 'Sites web',
      'social': 'Réseaux sociaux',
      'other': 'Autres'
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des liens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl space-y-6">
        
        {/* En-tête de page */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Gestion des <span className="text-accent">Liens</span>
            </h1>
            <p className="text-muted-foreground">
              Administration des liens de votre portfolio
            </p>
          </div>
          <Button 
            onClick={() => {
              setIsEditing(false);
              setEditingLink(null);
              setShowModal(true);
              openModal();
            }} 
            className="w-full sm:w-auto min-w-[140px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau lien
          </Button>
        </div>

        {/* Messages d'erreur */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <X className="h-5 w-5 text-destructive" />
              <span className="text-destructive">{error}</span>
            </div>
          </div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{links.length}</p>
                </div>
                <LinkIcon className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Actifs</p>
                  <p className="text-2xl font-bold">{links.filter(l => l.is_active).length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inactifs</p>
                  <p className="text-2xl font-bold">{links.filter(l => !l.is_active).length}</p>
                </div>
                <X className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Types</p>
                  <p className="text-2xl font-bold">{new Set(links.map(l => l.type)).size}</p>
                </div>
                <Database className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
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
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                  className="min-w-[80px]"
                >
                  Tous
                </Button>
                <Button
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('active')}
                  className="min-w-[80px]"
                >
                  Actifs
                </Button>
                <Button
                  variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('inactive')}
                  className="min-w-[80px]"
                >
                  Inactifs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des liens par type */}
        <Card>
          <CardHeader>
            <CardTitle>Liens ({links.length}) | Filtrés ({filteredLinks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(linksByType).length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <LinkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {links.length === 0 ? 'Aucun lien trouvé' : 'Aucun résultat'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {links.length === 0 
                      ? 'Créez votre premier lien pour commencer'
                      : 'Aucun lien ne correspond aux filtres appliqués'
                    }
                  </p>
                  {links.length === 0 && (
                    <Button onClick={() => openModal()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Créer un lien
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.entries(linksByType).map(([type, typeLinks]) => (
                  <div key={type} className="space-y-4">
                    <div className="border-b border-border pb-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {type === 'bio_link' && <User className="h-4 w-4" />}
                        {type === 'github' && <Github className="h-4 w-4" />}
                        {type === 'live' && <Globe className="h-4 w-4" />}
                        {type === 'social' && <Share className="h-4 w-4" />}
                        {type === 'other' && <LinkIcon className="h-4 w-4" />}
                        {getTypeLabel(type)} ({typeLinks.length})
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {typeLinks.map((link) => (
                        <Card key={link.id} className="border border-border hover:border-border-strong transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium text-foreground truncate">
                                    {link.title}
                                  </h4>
                                  <Badge 
                                    variant={link.is_active ? "default" : "secondary"}
                                    className="shrink-0"
                                  >
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
                                </div>
                                
                                <div className="flex items-center gap-2 mb-2">
                                  <p className="text-sm text-muted-foreground truncate flex-1">
                                    {link.url}
                                  </p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => window.open(link.url, '_blank')}
                                    className="h-6 w-6 p-0 shrink-0"
                                  >
                                    <LinkIcon className="h-3 w-3" />
                                  </Button>
                                </div>
                                
                                {link.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {link.description}
                                  </p>
                                )}
                                
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <ChartBar className="h-3 w-3" />
                                    {link.click_count || 0} clics
                                  </span>
                                </div>
                                
                                <div className="text-xs text-muted-foreground mt-1">
                                  Créé le {new Date(link.created_at).toLocaleDateString('fr-FR')}
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-1 shrink-0">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled
                                  className="h-8 px-2 opacity-50"
                                  title="Fonctionnalité à venir"
                                >
                                  {link.is_active ? <EyeSlash className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled
                                  className="h-8 px-2 opacity-50"
                                  title="Fonctionnalité à venir"
                                >
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  disabled
                                  className="h-8 px-2 opacity-50"
                                  title="Fonctionnalité à venir"
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
