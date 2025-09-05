import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Plus, Pencil, Trash, CheckCircle, X, Eye, EyeSlash, MagnifyingGlass, Funnel, ChartBar, Link as LinkIcon, Database, Wrench, Bug, CaretUp as ChevronUp, CaretDown as ChevronDown, CircleNotch as Loader2, Globe, Users, ChartBarHorizontal, Target, ArrowsClockwise, Lightbulb, Warning, TestTube, LinkSimple, Download, TrashSimple, Rocket } from '@phosphor-icons/react';
import { LinksService, PortfolioLink, CreateLinkData, UpdateLinkData } from '../services/linksService';
import { migrateBioLinks, cleanBioLinks } from '../../scripts/migrateBioLinks';
import { createLinksTable, checkTableExists, getTableInfo } from '../../scripts/createLinksTable';
import { testLinksService } from '../../scripts/testLinksService';
import { testSupabaseConnection } from '../../scripts/testSupabaseConnection';

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
      console.error('Erreur chargement liens:', err);
      setError('Erreur lors du chargement des liens');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
    checkTable(); // Vérifier l'état de la table au chargement
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
      case 'github': return <Database className="h-4 w-4" />;
      case 'live': return <Globe className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      default: return <LinkIcon className="h-4 w-4" />;
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

  // Fonctions de debug intégrées
  const checkTable = async () => {
    const tableStatus = await checkTableExists();
    const info = await getTableInfo();
    setTableInfo({ ...tableStatus, ...info });
  };

  const handleCreateTable = async () => {
    setDebugLoading(true);
    setDebugResult(null);
    
    try {
      const createResult = await createLinksTable();
      setDebugResult(createResult);
      await checkTable();
    } catch (error) {
      setDebugResult({ success: false, error: error.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleMigrate = async () => {
    setDebugLoading(true);
    setDebugResult(null);
    
    try {
      const migrationResult = await migrateBioLinks();
      setDebugResult(migrationResult);
      await loadLinks();
    } catch (error) {
      setDebugResult({ success: false, error: error.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleClean = async () => {
    setDebugLoading(true);
    setDebugResult(null);
    
    try {
      const cleanResult = await cleanBioLinks();
      setDebugResult(cleanResult);
      await loadLinks();
    } catch (error) {
      setDebugResult({ success: false, error: error.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleTestService = async () => {
    setDebugLoading(true);
    setDebugResult(null);
    
    try {
      const testResult = await testLinksService();
      setDebugResult(testResult);
    } catch (error) {
      setDebugResult({ success: false, error: error.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleTestSupabase = async () => {
    setDebugLoading(true);
    setDebugResult(null);
    
    try {
      const testResult = await testSupabaseConnection();
      setDebugResult(testResult);
    } catch (error) {
      setDebugResult({ success: false, error: error.message });
    } finally {
      setDebugLoading(false);
    }
  };

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
      {error && (
        <div className="bg-red-2 border border-red-6 rounded-lg p-4 dark:bg-red-3 dark:border-red-7">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 text-red-9" />
            <span className="text-red-11">{error}</span>
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/15 transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <LinkIcon className="h-6 w-6 text-cyan-600" />
                </div>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                  Portfolio
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total des liens</p>
                <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">{linkStats.total}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1 w-8 rounded bg-cyan-500/30"></div>
                  <span>Liens configurés</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-cyan-500/10">
                <div className="flex items-center gap-2">
                  <ChartBarHorizontal className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                  <p className="text-xs text-cyan-600 dark:text-cyan-400">
                    Base de données portfolio
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/15 transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  Actif
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Liens actifs</p>
                <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{linkStats.active}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1 w-8 rounded bg-emerald-500/30"></div>
                  <span>
                    {linkStats.total > 0 ? Math.round((linkStats.active / linkStats.total) * 100) : 0}% du total
                  </span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-emerald-500/10">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Visibles publiquement
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-violet-500/10 to-violet-600/10 border-violet-500/20 hover:shadow-xl hover:shadow-violet-500/15 transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <ChartBar className="h-6 w-6 text-violet-600" />
                </div>
                <Badge variant="outline" className="border-violet-500/30 text-violet-700 dark:text-violet-300">
                  Clics
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total des clics</p>
                <p className="text-3xl font-bold text-violet-700 dark:text-violet-300">{linkStats.totalClicks}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1 w-8 rounded bg-violet-500/30"></div>
                  <span>Engagement total</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-violet-500/10">
                <div className="flex items-center gap-2">
                  <ChartBar className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                  <p className="text-xs text-violet-600 dark:text-violet-400">
                    Interactions utilisateur
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-500/20 hover:shadow-xl hover:shadow-rose-500/15 transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <ChartBar className="h-6 w-6 text-rose-600" />
                </div>
                <Badge variant="outline" className="border-rose-500/30 text-rose-700 dark:text-rose-300">
                  Moyenne
                </Badge>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Clics par lien</p>
                <p className="text-3xl font-bold text-rose-700 dark:text-rose-300">{linkStats.avgClicks}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1 w-8 rounded bg-rose-500/30"></div>
                  <span>Performance moyenne</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-rose-500/10">
                <div className="flex items-center gap-2">
                  <Target className="h-3 w-3 text-rose-600 dark:text-rose-400" />
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    {linkStats.avgClicks > 5 ? 'Bon engagement' : 'Engagement modéré'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outils de Debug */}
      <Card className="mb-8 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-orange-600/5 dark:from-[#231813] dark:to-[#231813] shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Wrench className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Outils de Debug</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Administration avancée de la base de données
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDebugTools(!showDebugTools)}
              className="border-orange-500/20 hover:bg-orange-500/10 transition-all duration-200 min-w-[100px]"
            >
              {showDebugTools ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              {showDebugTools ? 'Masquer' : 'Afficher'}
            </Button>
          </div>
        </CardHeader>
        
        {showDebugTools && (
          <CardContent className="px-6 pb-6">
            <div className="space-y-8">
              {/* État de la base de données - Carte pleine largeur en haut */}
              <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-600/10 dark:bg-blue-900/10 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-blue-700 dark:text-blue-300">
                          État de la base de données
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Surveillance en temps réel de Supabase
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-700 dark:text-blue-300">
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {tableInfo ? (
                    <>
                      {/* Status principal */}
                      <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                        tableInfo.exists 
                          ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300' 
                          : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-4 h-4 rounded-full ${tableInfo.exists ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                            <div>
                              <p className="font-semibold text-lg">
                                {tableInfo.exists ? 'Table "links" opérationnelle' : 'Table "links" introuvable'}
                              </p>
                              <p className="text-sm opacity-75 mt-1">
                                {tableInfo.exists 
                                  ? 'Connexion établie et fonctionnelle'
                                  : 'Base de données non initialisée'
                                }
                              </p>
                            </div>
                          </div>
                          {tableInfo.exists && (
                            <div className="text-right">
                              <p className="text-2xl font-bold">
                                {tableInfo.count || 0}
                              </p>
                              <p className="text-sm opacity-75">
                                entrée{(tableInfo.count || 0) > 1 ? 's' : ''}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {tableInfo.exists && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-current/20">
                            <div className="text-center">
                              <p className="text-xs opacity-75">Dernière vérification</p>
                              <p className="font-medium">À l'instant</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs opacity-75">Statut</p>
                              <div className="flex items-center justify-center gap-1">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <p className="font-medium">En ligne</p>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-xs opacity-75">Performance</p>
                              <div className="flex items-center justify-center gap-1">
                                <Rocket className="h-3 w-3 text-blue-600" />
                                <p className="font-medium">Optimale</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Actions rapides */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button 
                          onClick={checkTable} 
                          disabled={debugLoading}
                          variant="outline"
                          className="h-12 flex items-center gap-3 border-blue-500/20 hover:bg-blue-500/5"
                        >
                          {debugLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : '🔄'}
                          <div className="text-left">
                            <p className="font-medium">Actualiser l'état</p>
                            <p className="text-xs text-muted-foreground">Recharger les informations</p>
                          </div>
                        </Button>
                        
                        <Button 
                          onClick={handleCreateTable} 
                          disabled={debugLoading || tableInfo?.exists}
                          variant={tableInfo?.exists ? "outline" : "default"}
                          className="h-12 flex items-center gap-3"
                        >
                          {debugLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Database className="h-5 w-5" />}
                          <div className="text-left">
                            <p className="font-medium">
                              {tableInfo?.exists ? 'Table créée' : 'Créer la table'}
                            </p>
                            <p className="text-xs opacity-75">
                              {tableInfo?.exists ? 'Déjà initialisée' : 'Initialiser la DB'}
                            </p>
                          </div>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center space-y-3">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
                        <p className="text-muted-foreground">Vérification en cours...</p>
                        <p className="text-xs text-muted-foreground">Connexion à Supabase</p>
                      </div>
                    </div>
                  )}
                  
                  {tableInfo?.error && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300">
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded bg-red-200 dark:bg-red-800">
                          <X className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Warning className="h-4 w-4" />
                            <p className="font-medium">Erreur de connexion</p>
                          </div>
                          <p className="text-sm mt-1 opacity-90">{tableInfo.error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

            {/* Actions organisées en grille 2x2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Migration des données */}
              <Card className="border-green-500/20 bg-green-500/5 dark:bg-green-900/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-base font-medium text-green-700 dark:text-green-300">
                    <Database className="h-5 w-5" />
                    � Migration des données
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Gestion des liens Bio existants
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleMigrate} 
                    disabled={debugLoading || !tableInfo?.exists}
                    className="w-full justify-start"
                    size="sm"
                  >
                    {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                    Migrer les liens Bio
                  </Button>
                  
                  <Button 
                    onClick={handleClean} 
                    disabled={debugLoading || !tableInfo?.exists}
                    variant="destructive"
                    className="w-full justify-start"
                    size="sm"
                  >
                    {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <TrashSimple className="h-4 w-4 mr-2" />}
                    Supprimer tous les liens
                  </Button>
                  
                  {!tableInfo?.exists && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-300">
                      <p className="text-xs text-center">
                      <div className="flex items-center gap-2">
                        <Warning className="h-3 w-3" />
                        <span>Table requise pour ces actions</span>
                      </div>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tests de connexion */}
              <Card className="border-amber-500/20 bg-amber-500/5 dark:bg-amber-900/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-base font-medium text-amber-700 dark:text-amber-300">
                    <Bug className="h-5 w-5" />
                    Tests de connexion
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Vérification des services
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleTestSupabase} 
                    disabled={debugLoading}
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <LinkSimple className="h-4 w-4 mr-2" />}
                    Tester Supabase
                  </Button>
                  
                  <Button 
                    onClick={handleTestService} 
                    disabled={debugLoading || !tableInfo?.exists}
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <TestTube className="h-4 w-4 mr-2" />}
                    Tester le service liens
                  </Button>
                  
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300">
                    <p className="text-xs text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <Lightbulb className="h-3 w-3" />
                      <span>Tests de diagnostic système</span>
                    </div>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Résultats des opérations debug */}
            {debugResult && (
              <Card className={`border shadow-md ${
                debugResult.success 
                  ? 'border-green-500/20 bg-gradient-to-br from-green-500/5 to-green-600/10' 
                  : 'border-red-500/20 bg-gradient-to-br from-red-500/5 to-red-600/10'
              }`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${
                      debugResult.success 
                        ? 'bg-green-500/10 border-green-500/20' 
                        : 'bg-red-500/10 border-red-500/20'
                    }`}>
                      {debugResult.success ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <X className="h-5 w-5 text-red-600" />
                      }
                    </div>
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {debugResult.success ? 'Opération réussie' : 'Erreur rencontrée'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {debugResult.success ? 'Action exécutée avec succès' : 'Une erreur s\'est produite'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-4 rounded-lg border ${
                    debugResult.success 
                      ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300'
                      : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300'
                  }`}>
                    <p className="font-medium mb-2">{debugResult.message}</p>
                    
                    {debugResult.links && (
                      <div className="mt-3 pt-3 border-t border-current/20">
                        <div className="flex items-center gap-2 text-sm font-medium mb-2">
                          <ChartBarHorizontal className="h-4 w-4" />
                          <span>Liens traités: {debugResult.links.length}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                          {debugResult.links.map((link: any, index: number) => (
                            <div key={index} className="text-xs p-2 rounded bg-current/10">
                              • {link.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {debugResult.error && (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">Détails techniques :</p>
                      <pre className="text-xs overflow-auto max-h-32 p-3 bg-background rounded border">
                        {JSON.stringify(debugResult.error, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Gestion des liens - Section fusionnée */}
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Liens ({links.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-blue-500/30 text-blue-700 dark:text-blue-300">
                {filteredLinks.length} résultat{filteredLinks.length > 1 ? 's' : ''}
              </Badge>
              {searchTerm && (
                <Badge variant="secondary" className="bg-orange-500/10 text-orange-700 dark:text-orange-300">
                  Recherche active
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Barre de recherche */}
          <div className="space-y-2 mb-4">
            <div className="relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre, URL ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-blue-500/50"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {/* Filtres et actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ChartBarHorizontal className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium text-muted-foreground">
                  Statut des liens
                </Label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                  className="h-12 flex items-center justify-center gap-2 text-xs px-2"
                >
                  <LinkIcon className="h-4 w-4" />
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Tous</span>
                    <span className="text-xs opacity-75">({links.length})</span>
                  </div>
                </Button>
                <Button
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('active')}
                  className="h-12 flex items-center justify-center gap-2 text-xs px-2 border-green-500/30 hover:bg-green-500/5"
                >
                  <CheckCircle className="h-4 w-4" />
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Actifs</span>
                    <span className="text-xs opacity-75">({linkStats.active})</span>
                  </div>
                </Button>
                <Button
                  variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('inactive')}
                  className="h-12 flex items-center justify-center gap-2 text-xs px-2 border-red-500/30 hover:bg-red-500/5"
                >
                  <X className="h-4 w-4" />
                  <div className="flex flex-col items-center">
                    <span className="font-medium">Inactifs</span>
                    <span className="text-xs opacity-75">({linkStats.total - linkStats.active})</span>
                  </div>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium text-muted-foreground">
                  Actions rapides
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="h-12 flex items-center justify-center gap-2 text-xs hover:bg-blue-500/5 px-2"
                >
                  <ArrowsClockwise className="h-4 w-4" />
                  <span className="font-medium">Réinitialiser</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(true)}
                  className="h-12 flex items-center justify-center gap-2 text-xs hover:bg-green-500/5 px-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="font-medium">Nouveau lien</span>
                </Button>
              </div>
            </div>
          </div>
          {/* Indicateurs de filtres actifs */}
          {(searchTerm || statusFilter !== 'all') && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Funnel className="h-4 w-4" />
                <p className="font-medium text-sm">Filtres actifs</p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                {searchTerm && (
                  <Badge variant="outline" className="border-blue-500/30">
                    Recherche: "{searchTerm}"
                  </Badge>
                )}
                {statusFilter !== 'all' && (
                  <Badge variant="outline" className="border-blue-500/30">
                    Statut: {statusFilter === 'active' ? 'Actifs' : 'Inactifs'}
                  </Badge>
                )}
              </div>
            </div>
          )}
          {/* Liste des liens ou message vide */}
          {filteredLinks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {links.length === 0 ? 'Aucun lien trouvé. Créez votre premier lien !' : 'Aucun lien ne correspond aux filtres.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLinks.map((link) => (
                <div key={link.id} className="flex items-start justify-between p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-medium truncate max-w-xs">{link.title}</h3>
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
                        <Badge className="bg-orange-3 text-orange-11 border-orange-6 flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          Populaire
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                      <span className="truncate max-w-xs">{link.url}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                        className="h-6 w-6 p-0 shrink-0"
                      >
                        <LinkIcon className="h-3 w-3" />
                      </Button>
                    </p>
                    {link.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{link.description}</p>
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
                  <div className="flex items-center gap-2 ml-4 shrink-0">
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

      {/* Modal */}
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
        </div>
      </div>
    </div>
  );
}