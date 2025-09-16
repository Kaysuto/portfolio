import React, { useState, useEffect } from 'react';
import { DashboardService, DashboardStats, RecentActivity } from '../services/dashboardService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MaintenanceControl } from '../components/MaintenanceControl';
import {
  Link,
  Activity,
  Eye,
  Users,
  Shield,
  Wrench,
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';
import {
  ChartBar,
  GoogleLogo,
  Tag,
  Code,
  CheckCircle,
  XCircle,
  Globe,
  Copy
} from '@phosphor-icons/react';

// Import des nouveaux composants admin
import {
  GlassCard,
  MetricGlassCard,
  ActionGlassCard,
  adminDesignTokens
} from '../components';

interface GoogleAnalyticsConfig {
  ga4_measurement_id: string;
  gtm_container_id: string;
  is_ga_enabled: boolean;
  is_gtm_enabled: boolean;
}

// Service pour Google Analytics
const GoogleAnalyticsService = {
  getConfig: async (): Promise<GoogleAnalyticsConfig> => {
    // Simulation - remplacer par votre API
    return {
      ga4_measurement_id: localStorage.getItem('ga4_measurement_id') || '',
      gtm_container_id: localStorage.getItem('gtm_container_id') || '',
      is_ga_enabled: localStorage.getItem('is_ga_enabled') === 'true',
      is_gtm_enabled: localStorage.getItem('is_gtm_enabled') === 'true'
    };
  },
  
  updateConfig: async (config: GoogleAnalyticsConfig): Promise<void> => {
    // Sauvegarde temporaire en localStorage
    localStorage.setItem('ga4_measurement_id', config.ga4_measurement_id);
    localStorage.setItem('gtm_container_id', config.gtm_container_id);
    localStorage.setItem('is_ga_enabled', config.is_ga_enabled.toString());
    localStorage.setItem('is_gtm_enabled', config.is_gtm_enabled.toString());
  },
  
  testConnection: async (measurementId: string): Promise<boolean> => {
    // Simulation du test de connexion
    return measurementId.startsWith('G-') && measurementId.length > 10;
  }
};

export default function Dashboard() {
  // États pour le dashboard
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  // États pour les analytics
  const [analyticsConfig, setAnalyticsConfig] = useState<GoogleAnalyticsConfig>({
    ga4_measurement_id: '',
    gtm_container_id: '',
    is_ga_enabled: false,
    is_gtm_enabled: false
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadDashboardData();
    loadAnalyticsConfig();
  }, []);

  const loadDashboardData = async () => {
    try {
      setDashboardLoading(true);
      setDashboardError(null);
      const [statsData, activityData] = await Promise.all([
        DashboardService.getStats(),
        DashboardService.getRecentActivity()
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
    } catch (err) {
      setDashboardError('Erreur lors du chargement des données du tableau de bord');
      console.error('Erreur de chargement:', err);
    } finally {
      setDashboardLoading(false);
    }
  };

  const loadAnalyticsConfig = async () => {
    try {
      setAnalyticsLoading(true);
      setAnalyticsError(null);
      const config = await GoogleAnalyticsService.getConfig();
      setAnalyticsConfig(config);
    } catch (err) {
      setAnalyticsError('Erreur lors du chargement de la configuration Analytics');
      console.error('Erreur Analytics:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleAnalyticsConfigChange = (field: keyof GoogleAnalyticsConfig, value: string | boolean) => {
    setAnalyticsConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveAnalyticsConfig = async () => {
    try {
      await GoogleAnalyticsService.updateConfig(analyticsConfig);
      setConnectionStatus('success');
      setTimeout(() => setConnectionStatus('idle'), 3000);
    } catch (err) {
      setAnalyticsError('Erreur lors de la sauvegarde');
      setConnectionStatus('error');
    }
  };

  const testGAConnection = async () => {
    if (!analyticsConfig.ga4_measurement_id) return;
    
    setIsTestingConnection(true);
    try {
      const isValid = await GoogleAnalyticsService.testConnection(analyticsConfig.ga4_measurement_id);
      setConnectionStatus(isValid ? 'success' : 'error');
    } catch (err) {
      setConnectionStatus('error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'link_created':
        return <Link className="h-4 w-4 text-accent-foreground" />;
      case 'link_updated':
        return <Wrench className="h-4 w-4 text-accent-foreground" />;
      case 'link_deleted':
        return <AlertCircle className="h-4 w-4 text-neutral-11" />;
      case 'maintenance_enabled':
        return <Shield className="h-4 w-4 text-accent-foreground" />;
      case 'maintenance_disabled':
        return <Shield className="h-4 w-4 text-accent-foreground" />;
      default:
        return <Activity className="h-4 w-4 text-neutral-9" />;
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'link_created':
        return 'bg-accent-3 text-accent-11 border-accent-6';
      case 'link_updated':
        return 'bg-accent-secondary-3 text-accent-secondary-11 border-accent-secondary-6';
      case 'link_deleted':
        return 'bg-neutral-3 text-neutral-11 border-neutral-6';
      case 'maintenance_enabled':
        return 'bg-accent-3 text-accent-11 border-accent-6';
      case 'maintenance_disabled':
        return 'bg-accent-secondary-3 text-accent-secondary-11 border-accent-secondary-6';
      default:
        return 'bg-neutral-3 text-neutral-11 border-neutral-6';
    }
  };

  if (dashboardLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-accent-foreground" />
          <p className="text-sm text-muted-foreground">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Errors */}
      {(dashboardError || analyticsError) && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {dashboardError || analyticsError}
          </AlertDescription>
        </Alert>
      )}

      {/* Métriques */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <MetricGlassCard
            title="Liens actifs"
            value={stats.totalLinks.toString()}
            icon={Link}
            delay={100}
          />
          <MetricGlassCard
            title="Vues totales"
            value={stats.pageViews.toString()}
            icon={Eye}
            delay={200}
          />
          <MetricGlassCard
            title="Utilisateurs"
            value={stats.visitorsToday.toString()}
            icon={Users}
            delay={300}
          />
          <MetricGlassCard
            title="Sécurité"
            value={stats.securityStatus === 'safe' ? 'Sûr' :
                   stats.securityStatus === 'warning' ? 'Attention' : 'Danger'}
            icon={Shield}
            delay={400}
          />
        </div>
      )}

      {/* Contrôle de maintenance */}
      <MaintenanceControl />

      {/* Contenu principal */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Activité récente */}
        <GlassCard title="Activité récente" icon={Activity} delay={500}>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg bg-neutral-2/50 border border-neutral-6/20 transition-all duration-200 ${adminDesignTokens.effects.scale}`}>
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-2">
                      {activity.message}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`text-xs px-2 py-1 ${getActivityColor(activity.type)}`}>
                        {activity.type.replace('_', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-neutral-9 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Aucune activité récente</p>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Configuration Analytics */}
        <GlassCard title="Configuration Analytics" icon={ChartBar} delay={600}>
          <div className="space-y-6">
            {/* Google Analytics 4 */}
            <div className={`space-y-4 p-4 border rounded-lg bg-background transition-all duration-200 ${adminDesignTokens.effects.scale}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GoogleLogo className="h-5 w-5 text-accent-foreground" />
                  <Label className="text-sm font-medium">Google Analytics 4</Label>
                </div>
                <Switch
                  checked={analyticsConfig.is_ga_enabled}
                  onCheckedChange={(checked) => handleAnalyticsConfigChange('is_ga_enabled', checked)}
                />
              </div>

              {analyticsConfig.is_ga_enabled && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="ga4-id" className="text-xs font-medium text-muted-foreground">
                      Measurement ID
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="ga4-id"
                        placeholder="G-XXXXXXXXXX"
                        value={analyticsConfig.ga4_measurement_id}
                        onChange={(e) => handleAnalyticsConfigChange('ga4_measurement_id', e.target.value)}
                        className="text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={testGAConnection}
                        disabled={isTestingConnection || !analyticsConfig.ga4_measurement_id}
                        className="px-3"
                      >
                        {isTestingConnection ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          'Test'
                        )}
                      </Button>
                    </div>
                  </div>

                  {connectionStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-xs text-accent-secondary-11">
                      <CheckCircle className="h-3 w-3" />
                      <span>Connexion réussie</span>
                    </div>
                  )}

                  {connectionStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-xs text-neutral-11">
                      <XCircle className="h-3 w-3" />
                      <span>Erreur de connexion</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Google Tag Manager */}
            <div className={`space-y-4 p-4 border rounded-lg bg-background transition-all duration-200 ${adminDesignTokens.effects.scale}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Tag className="h-5 w-5 text-accent-foreground" />
                  <Label className="text-sm font-medium">Google Tag Manager</Label>
                </div>
                <Switch
                  checked={analyticsConfig.is_gtm_enabled}
                  onCheckedChange={(checked) => handleAnalyticsConfigChange('is_gtm_enabled', checked)}
                />
              </div>

              {analyticsConfig.is_gtm_enabled && (
                <div className="space-y-2">
                  <Label htmlFor="gtm-id" className="text-xs font-medium text-muted-foreground">
                    Container ID
                  </Label>
                  <Input
                    id="gtm-id"
                    placeholder="GTM-XXXXXXX"
                    value={analyticsConfig.gtm_container_id}
                    onChange={(e) => handleAnalyticsConfigChange('gtm_container_id', e.target.value)}
                    className="text-sm"
                  />
                </div>
              )}
            </div>

            {/* Save Button */}
            <Button onClick={saveAnalyticsConfig} className="w-full">
              Sauvegarder la configuration
            </Button>
          </div>
        </GlassCard>
      </div>
        </div>
      </div>
    </div>
  );
}
