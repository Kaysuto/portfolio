import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowsClockwise, Users, Eye, Link as LinkIcon, Gear, Shield, CheckCircle, Warning } from '@phosphor-icons/react';
import { DashboardService, DashboardStats, RecentActivity } from '../services/dashboardService';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    visitorsToday: 0,
    pageViews: 0,
    activeLinks: 0,
    totalLinks: 0,
    maintenanceMode: false,
    securityStatus: 'safe'
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const [statsData, activityData] = await Promise.all([
        DashboardService.getStats(),
        DashboardService.getRecentActivity()
      ]);

      setStats(statsData);
      setRecentActivity(activityData);
    } catch (err) {
      console.error('Erreur chargement dashboard:', err);
      setError('Erreur lors du chargement des données');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'danger': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return CheckCircle;
      case 'warning': return Warning;
      case 'danger': return Warning;
      default: return CheckCircle;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'à l\'instant';
    if (diffInMinutes < 60) return `il y a ${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `il y a ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `il y a ${diffInDays}j`;
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-7xl mx-auto h-full">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Tableau de</span>
            <br />
            <span className="text-accent">Bord</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Vue d'ensemble de votre portfolio
          </p>
        </div>

        <div className="space-y-6">
          {/* Header avec bouton refresh */}
          <div className="flex items-center justify-between bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Aperçu rapide</h2>
              <p className="text-muted-foreground">Statistiques en temps réel</p>
            </div>
            <Button
              onClick={loadDashboardData}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowsClockwise className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
          </div>

          {error && (
            <div className="bg-red-2 border border-red-6 rounded-lg p-4 dark:bg-red-3 dark:border-red-7">
              <div className="flex items-center gap-2">
                <Warning className="h-5 w-5 text-red-9" />
                <span className="text-red-11">{error}</span>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Visiteurs aujourd'hui</p>
                    <p className="text-2xl font-bold">{stats.visitorsToday}</p>
                    <p className="text-xs text-muted-foreground">Visiteurs uniques</p>
                  </div>
                  <Users className="h-8 w-8 text-cyan-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pages vues</p>
                    <p className="text-2xl font-bold">{stats.pageViews}</p>
                    <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                  </div>
                  <Eye className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-500/10 to-violet-600/10 border-violet-500/20 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Liens actifs</p>
                    <p className="text-2xl font-bold">{stats.activeLinks}</p>
                    <p className="text-xs text-muted-foreground">Sur {stats.totalLinks} liens totaux</p>
                  </div>
                  <LinkIcon className="h-8 w-8 text-violet-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-500/20 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">État système</p>
                    <p className={`text-2xl font-bold ${getStatusColor(stats.securityStatus)}`}>
                      {stats.securityStatus === 'safe' ? 'OK' : stats.securityStatus === 'warning' ? 'Attention' : 'Danger'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stats.maintenanceMode ? 'Mode maintenance actif' : 'Tous les services opérationnels'}
                    </p>
                  </div>
                  {React.createElement(getStatusIcon(stats.securityStatus), {
                    className: `h-8 w-8 ${getStatusColor(stats.securityStatus)}`
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="flex items-center gap-2 h-auto p-4" variant="outline">
              <Link to="/links">
                <LinkIcon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Gérer les liens</div>
                  <div className="text-sm text-muted-foreground">Ajouter, modifier, supprimer</div>
                </div>
              </Link>
            </Button>

            <Button asChild className="flex items-center gap-2 h-auto p-4" variant="outline">
              <Link to="/maintenance">
                <Gear className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Maintenance</div>
                  <div className="text-sm text-muted-foreground">
                    {stats.maintenanceMode ? 'Désactiver le mode' : 'Activer le mode'}
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild className="flex items-center gap-2 h-auto p-4" variant="outline">
              <Link to="/security">
                <Shield className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Sécurité</div>
                  <div className="text-sm text-muted-foreground">Gérer la whitelist IP</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Événements récents */}
      <Card>
        <CardHeader>
          <CardTitle>Événements récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <Badge variant="secondary">INFO</Badge>
                  <span className="text-sm">{activity.message}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-3">
                <Badge variant="secondary">INFO</Badge>
                <span className="text-sm">Aucune activité récente</span>
                <span className="text-xs text-muted-foreground ml-auto">à l'instant</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
}
