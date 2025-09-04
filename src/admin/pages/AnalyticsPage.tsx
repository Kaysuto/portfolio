import { useEffect, useState } from 'react';
import { 
  ChartBarIcon, 
  CursorArrowRaysIcon, 
  EyeIcon, 
  UserGroupIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { DashboardCard } from '../components/ui/DashboardCard';
import { AnalyticsService } from '../services/adminServices';

interface AnalyticsData {
  visitors: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
  pageViews: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
  devices: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  countries: {
    name: string;
    visitors: number;
    percentage: number;
  }[];
  topPages: {
    path: string;
    views: number;
    percentage: number;
  }[];
  recentActivity: {
    timestamp: string;
    page: string;
    country: string;
    device: string;
  }[];
}

export const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // Simulation de données analytics
        const mockData: AnalyticsData = {
          visitors: {
            today: 127,
            week: 1043,
            month: 4521,
            total: 12847
          },
          pageViews: {
            today: 298,
            week: 2105,
            month: 8934,
            total: 25691
          },
          devices: {
            mobile: 65,
            desktop: 30,
            tablet: 5
          },
          countries: [
            { name: 'France', visitors: 1247, percentage: 42 },
            { name: 'Canada', visitors: 684, percentage: 23 },
            { name: 'Belgique', visitors: 432, percentage: 15 },
            { name: 'Suisse', visitors: 298, percentage: 10 },
            { name: 'Autres', visitors: 290, percentage: 10 }
          ],
          topPages: [
            { path: '/', views: 1523, percentage: 35 },
            { path: '/bio', views: 1124, percentage: 26 },
            { path: '/projects', views: 892, percentage: 21 },
            { path: '/about', views: 543, percentage: 12 },
            { path: '/contact', views: 267, percentage: 6 }
          ],
          recentActivity: [
            { timestamp: '2024-01-15 14:23', page: '/', country: 'France', device: 'Mobile' },
            { timestamp: '2024-01-15 14:19', page: '/bio', country: 'Canada', device: 'Desktop' },
            { timestamp: '2024-01-15 14:15', page: '/projects', country: 'Belgique', device: 'Mobile' },
            { timestamp: '2024-01-15 14:12', page: '/', country: 'France', device: 'Tablet' },
            { timestamp: '2024-01-15 14:08', page: '/about', country: 'Suisse', device: 'Desktop' }
          ]
        };
        setAnalyticsData(mockData);
      } catch (error) {
        console.error('Erreur chargement analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="alert alert-error">
        <span>Erreur lors du chargement des analytics</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Analytics</h1>
          <p className="text-base-content/70 mt-1">
            Analyse détaillée du trafic et des performances
          </p>
        </div>
        
        {/* Sélecteur de période */}
        <div className="tabs tabs-boxed">
          <button 
            className={`tab ${selectedPeriod === 'today' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPeriod('today')}
          >
            Aujourd'hui
          </button>
          <button 
            className={`tab ${selectedPeriod === 'week' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPeriod('week')}
          >
            Cette semaine
          </button>
          <button 
            className={`tab ${selectedPeriod === 'month' ? 'tab-active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Ce mois
          </button>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Visiteurs"
          value={analyticsData.visitors[selectedPeriod]}
          description="Visiteurs uniques"
          icon={<UserGroupIcon className="w-6 h-6" />}
          trend="up"
        />
        
        <DashboardCard
          title="Pages vues"
          value={analyticsData.pageViews[selectedPeriod]}
          description="Vues de pages totales"
          icon={<EyeIcon className="w-6 h-6" />}
          trend="up"
        />
        
        <DashboardCard
          title="Taux de rebond"
          value="24.5%"
          description="↓ -2.1% vs période précédente"
          icon={<ChartBarIcon className="w-6 h-6" />}
          trend="down"
        />
        
        <DashboardCard
          title="Durée moyenne"
          value="3m 42s"
          description="Temps passé sur le site"
          icon={<CalendarIcon className="w-6 h-6" />}
          trend="up"
        />
      </div>

      {/* Graphiques et données détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Types d'appareils */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <DevicePhoneMobileIcon className="w-5 h-5" />
              Répartition par appareil
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DevicePhoneMobileIcon className="w-4 h-4 text-primary" />
                  <span>Mobile</span>
                </div>
                <span className="font-semibold">{analyticsData.devices.mobile}%</span>
              </div>
              <progress 
                className="progress progress-primary w-full" 
                value={analyticsData.devices.mobile} 
                max="100"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ComputerDesktopIcon className="w-4 h-4 text-secondary" />
                  <span>Desktop</span>
                </div>
                <span className="font-semibold">{analyticsData.devices.desktop}%</span>
              </div>
              <progress 
                className="progress progress-secondary w-full" 
                value={analyticsData.devices.desktop} 
                max="100"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ComputerDesktopIcon className="w-4 h-4 text-accent" />
                  <span>Tablette</span>
                </div>
                <span className="font-semibold">{analyticsData.devices.tablet}%</span>
              </div>
              <progress 
                className="progress progress-accent w-full" 
                value={analyticsData.devices.tablet} 
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Top pays */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5" />
              Top pays
            </h3>
            <div className="space-y-3">
              {analyticsData.countries.map((country, index) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-outline badge-sm">{index + 1}</span>
                    <span>{country.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{country.visitors}</div>
                    <div className="text-xs text-base-content/60">{country.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pages populaires */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Pages les plus visitées</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Vues</th>
                  <th>Pourcentage</th>
                  <th>Tendance</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topPages.map((page, index) => (
                  <tr key={page.path}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="badge badge-ghost badge-sm">{index + 1}</span>
                        <code className="text-sm">{page.path}</code>
                      </div>
                    </td>
                    <td className="font-semibold">{page.views.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <progress 
                          className="progress progress-primary w-16" 
                          value={page.percentage} 
                          max="100"
                        />
                        <span className="text-sm">{page.percentage}%</span>
                      </div>
                    </td>
                    <td>
                      {index < 2 ? (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-4 h-4 text-error" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Activité en temps réel</h3>
          <div className="space-y-3">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-medium">
                      Visite sur <code className="text-sm">{activity.page}</code>
                    </div>
                    <div className="text-sm text-base-content/60">
                      {activity.country} • {activity.device}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-base-content/50">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
