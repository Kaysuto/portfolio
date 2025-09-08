import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Plus, Pencil, Trash, CheckCircle, X, Eye, EyeSlash, MagnifyingGlass, Funnel, ChartBar, Link as LinkIcon, Database, Wrench, Bug, CaretUp as ChevronUp, CaretDown as ChevronDown, CircleNotch as Loader2, Globe, Target, ArrowsClockwise, TestTube, LinkSimple, Rocket } from '@phosphor-icons/react';
import { LinksService, PortfolioLink, CreateLinkData, UpdateLinkData } from '../services/linksService';
import { migrateBioLinks, cleanBioLinks } from '../../scripts/migrateBioLinks';
import { createLinksTable, checkTableExists, getTableInfo } from '../../scripts/createLinksTable';
import { notifications } from '../../components/NotificationProvider';
import { useModal } from '../../hooks/useModal';

// Import des nouveaux composants admin
import {
  GlassCard,
  MetricGlassCard,
  adminDesignTokens
} from '../components';

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
      const fetchedLinks = await LinksService.getAllLinks();
      setLinks(fetchedLinks);
    } catch (err) {
      setError('Erreur lors du chargement des liens');
      console.error('Error loading links:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const linkStats = useMemo(() => {
    const total = links.length;
    const active = links.filter(link => link.is_active).length;
    const totalClicks = links.reduce((sum, link) => sum + (link.click_count || 0), 0);
    const avgClicks = total > 0 ? Math.round(totalClicks / total) : 0;
    return { total, active, totalClicks, avgClicks };
  }, [links]);

  const filteredLinks = useMemo(() => {
    return links.filter(link => {
      const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          link.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          link.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' ||
                          (statusFilter === 'active' && link.is_active) ||
                          (statusFilter === 'inactive' && !link.is_active);
      const matchesType = typeFilter === 'all' || link.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [links, searchTerm, statusFilter, typeFilter]);

  const handleEdit = (link: PortfolioLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      type: link.type,
      description: link.description || '',
      is_active: link.is_active
    });
    setIsEditing(true);
    openModal();
  };

  const handleToggleActive = async (link: PortfolioLink) => {
    try {
      await LinksService.updateLink({ id: link.id, is_active: !link.is_active });
      await loadLinks();
      notifications.success(`Lien ${!link.is_active ? 'activé' : 'désactivé'} avec succès`);
    } catch (err) {
      notifications.error('Erreur lors de la mise à jour du lien');
      console.error('Error toggling link active status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) return;
    try {
      await LinksService.deleteLink(id);
      await loadLinks();
      notifications.success('Lien supprimé avec succès');
    } catch (err) {
      notifications.error('Erreur lors de la suppression du lien');
      console.error('Error deleting link:', err);
    }
  };

  // Fonctions de debug
  const handleCheckTable = async () => {
    setDebugLoading(true);
    try {
      const exists = await checkTableExists();
      setDebugResult({ tableExists: exists });
    } catch (err) {
      setDebugResult({ error: err.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleCreateTable = async () => {
    setDebugLoading(true);
    try {
      await createLinksTable();
      setDebugResult({ tableCreated: true });
    } catch (err) {
      setDebugResult({ error: err.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleGetTableInfo = async () => {
    setDebugLoading(true);
    try {
      const info = await getTableInfo();
      setTableInfo(info);
    } catch (err) {
      setDebugResult({ error: err.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setDebugLoading(true);
    try {
      // Test de connexion à Supabase
      const testResult = await LinksService.getAllLinks();
      setDebugResult({ connectionTest: 'success', linksCount: testResult.length });
    } catch (err) {
      setDebugResult({ connectionTest: 'failed', error: err.message });
    } finally {
      setDebugLoading(false);
    }
  };

  const handleMigrateBioLinks = async () => {
    setDebugLoading(true);
    try {
      await migrateBioLinks();
      setDebugResult({ migration: 'success' });
      await loadLinks();
    } catch (err) {
      setDebugResult({ migration: 'failed', error: err.message });
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
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Errors */}
      {error && (
        <div className="bg-red-2 border border-red-6 rounded-lg p-4 dark:bg-red-3 dark:border-red-7">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 text-red-9" />
            <span className="text-red-11">{error}</span>
          </div>
        </div>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricGlassCard
          title="Total des liens"
          value={linkStats.total.toString()}
          icon={LinkIcon}
          delay={100}
        />
        <MetricGlassCard
          title="Liens actifs"
          value={linkStats.active.toString()}
          icon={CheckCircle}
          delay={200}
        />
        <MetricGlassCard
          title="Total des clics"
          value={linkStats.totalClicks.toString()}
          icon={ChartBar}
          delay={300}
        />
        <MetricGlassCard
          title="Clics par lien"
          value={linkStats.avgClicks.toString()}
          icon={Target}
          delay={400}
        />
      </div>

      {/* Outils de Debug */}
      <GlassCard
        title=""
        delay={500}
        className="mb-8"
      >
        <div className="space-y-4">
          {/* État de la base de données */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                État de la base de données
              </h4>
              <div className="space-y-3">
                <Button
                  onClick={handleCheckTable}
                  disabled={debugLoading}
                  variant="outline"
                  className="w-full justify-start border-orange-500/20 hover:bg-orange-500/10"
                >
                  {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Database className="h-4 w-4 mr-2" />}
                  Vérifier la table
                </Button>
                <Button
                  onClick={handleCreateTable}
                  disabled={debugLoading}
                  variant="outline"
                  className="w-full justify-start border-orange-500/20 hover:bg-orange-500/10"
                >
                  {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                  Créer la table
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Informations système
              </h4>
              <div className="space-y-3">
                <Button
                  onClick={handleGetTableInfo}
                  disabled={debugLoading}
                  variant="outline"
                  className="w-full justify-start border-orange-500/20 hover:bg-orange-500/10"
                >
                  {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Eye className="h-4 w-4 mr-2" />}
                  Infos table
                </Button>
                <Button
                  onClick={handleTestConnection}
                  disabled={debugLoading}
                  variant="outline"
                  className="w-full justify-start border-orange-500/20 hover:bg-orange-500/10"
                >
                  {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Globe className="h-4 w-4 mr-2" />}
                  Test connexion
                </Button>
              </div>
            </div>
          </div>

          {/* Résultats du debug */}
          {debugResult && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                Résultat du debug
              </h4>
              <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                {JSON.stringify(debugResult, null, 2)}
              </pre>
            </div>
          )}

          {/* Informations de la table */}
          {tableInfo && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Informations de la table
              </h4>
              <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                {JSON.stringify(tableInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Actions principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <GlassCard
          title=""
          delay={600}
        >
          <div className="space-y-4">
            <Button
              onClick={openModal}
              className="w-full bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau lien
            </Button>
          </div>
        </GlassCard>

        <GlassCard
          title=""
          delay={700}
        >
          <div className="space-y-4">
            <Button
              onClick={handleMigrateBioLinks}
              disabled={debugLoading}
              variant="outline"
              className="w-full border-accent/20 hover:bg-accent/10"
            >
              {debugLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Rocket className="h-4 w-4 mr-2" />}
              Migrer les données
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Liste des liens */}
      <GlassCard
        title=""
        delay={800}
      >
        <div className="space-y-3">
          {/* Filtres et recherche */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un lien..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | PortfolioLink['type'])}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="all">Tous les types</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="website">Site web</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>

          {/* Liste des liens */}
          <div className="space-y-4">
            {filteredLinks.length === 0 ? (
              <div className="text-center py-12">
                <LinkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun lien trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                    ? 'Aucun lien ne correspond à vos critères de recherche.'
                    : 'Vous n\'avez pas encore créé de liens.'}
                </p>
                <Button onClick={openModal} className="bg-accent hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer votre premier lien
                </Button>
              </div>
            ) : (
              filteredLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
                  style={{ animationDelay: `${900 + index * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{link.title}</h3>
                        <Badge
                          variant={link.is_active ? "default" : "secondary"}
                          className={link.is_active ? "bg-green-500/10 text-green-700 border-green-500/20" : ""}
                        >
                          {link.is_active ? 'Actif' : 'Inactif'}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {link.type}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{link.description || 'Aucune description'}</p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline flex items-center gap-1"
                      >
                        <Globe className="h-4 w-4" />
                        {link.url}
                      </a>
                      {link.click_count !== undefined && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <ChartBar className="h-4 w-4 inline mr-1" />
                          {link.click_count} clic{link.click_count > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(link)}
                        className="border-accent/20 hover:bg-accent/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(link)}
                        className={link.is_active ? "border-red-500/20 hover:bg-red-500/10" : "border-green-500/20 hover:bg-green-500/10"}
                      >
                        {link.is_active ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(link.id)}
                        className="border-red-500/20 hover:bg-red-500/10 text-red-600 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </GlassCard>
        </div>
      </div>
    </div>
  );
}
