import { useEffect, useState } from 'react';
import { 
  EyeIcon, 
  CursorArrowRaysIcon, 
  LinkIcon, 
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  WrenchIcon,
  ShieldExclamationIcon
} from '@heroicons/react/24/outline';
import { DashboardCard } from '../components/ui/DashboardCard';
import { AnalyticsService } from '../services/adminServices';
import type { DashboardMetrics } from '../types/admin';

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await AnalyticsService.getDashboardMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Erreur chargement métriques:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="alert alert-error">
        <span>Erreur lors du chargement des métriques</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Tableau de bord</h1>
          <p className="text-base-content/70 mt-1">
            Vue d'ensemble de votre portfolio et analytics
          </p>
        </div>
        <div className="text-sm text-base-content/50">
          Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Visiteurs aujourd'hui"
          value={metrics.visitorsToday}
          description="↗︎ +12% par rapport à hier"
          icon={<UserGroupIcon className="w-6 h-6" />}
          trend="up"
        />
        
        <DashboardCard
          title="Pages vues"
          value={metrics.pageViewsToday}
          description="↗︎ +8% par rapport à hier"
          icon={<EyeIcon className="w-6 h-6" />}
          trend="up"
        />
        
        <DashboardCard
          title="Liens actifs"
          value={`${metrics.activeLinks}/${metrics.totalLinks}`}
          description={`${metrics.totalLinks - metrics.activeLinks} inactifs`}
          icon={<LinkIcon className="w-6 h-6" />}
          trend="neutral"
        />
        
        <DashboardCard
          title="Total clics"
          value={metrics.totalClicks}
          description="Tous les liens confondus"
          icon={<CursorArrowRaysIcon className="w-6 h-6" />}
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top liens */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <ArrowTrendingUpIcon className="w-5 h-5 text-primary" />
              Liens les plus populaires
            </h2>
            
            <div className="space-y-3 mt-4">
              {metrics.topLinks.length > 0 ? (
                metrics.topLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-base-content truncate">
                        {link.title}
                      </p>
                      <p className="text-xs text-base-content/70 truncate">
                        {link.url}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="badge badge-primary">{link.clicks}</span>
                      <span className="text-xs text-base-content/50">clics</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-base-content/50">
                  <LinkIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Aucun lien trouvé</p>
                  <p className="text-xs">Ajoutez des liens pour voir les statistiques</p>
                </div>
              )}
            </div>
            
            {metrics.topLinks.length > 0 && (
              <div className="card-actions justify-end mt-4">
                <a href="/admin/links" className="btn btn-primary btn-sm">
                  Gérer les liens
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Activité récente */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <EyeIcon className="w-5 h-5 text-primary" />
              Activité récente
            </h2>
            
            <div className="space-y-3 mt-4">
              <div className="alert alert-info">
                <span className="text-sm">
                  Système d'analytics en cours de développement
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-base-content/70">Nouveau visiteur</span>
                  <span className="text-xs text-base-content/50">Il y a 5 min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-base-content/70">Clic sur GitHub</span>
                  <span className="text-xs text-base-content/50">Il y a 12 min</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-base-content/70">Page projet visitée</span>
                  <span className="text-xs text-base-content/50">Il y a 18 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <a href="/admin/links" className="btn btn-outline btn-primary">
              <LinkIcon className="w-4 h-4 mr-2" />
              Ajouter un lien
            </a>
            <a href="/admin/maintenance" className="btn btn-outline btn-warning">
              <WrenchIcon className="w-4 h-4 mr-2" />
              Mode maintenance
            </a>
            <a href="/admin/security" className="btn btn-outline btn-secondary">
              <ShieldExclamationIcon className="w-4 h-4 mr-2" />
              Gérer la sécurité
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
