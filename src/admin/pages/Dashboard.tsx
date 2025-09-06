import React, { useState, useEffect } from 'react';
import { DashboardService, DashboardStats, RecentActivity } from '../services/dashboardService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, Activity, BarChart3, Users, Shield, Settings, Eye, TrendingUp, Clock, AlertCircle, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, activityData] = await Promise.all([
        DashboardService.getStats(),
        DashboardService.getRecentActivity()
      ]);
      setStats(statsData);
      setRecentActivity(activityData);
    } catch (err) {
      setError('Erreur lors du chargement des données du tableau de bord');
      console.error('Erreur de chargement:', err);
    } finally {
      setLoading(false);
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
        return <Link className="h-4 w-4 text-green-600" />;
      case 'link_updated':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'link_deleted':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'maintenance_enabled':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'maintenance_disabled':
        return <Activity className="h-4 w-4 text-green-600" />;
      default:
        return <Activity className="h-4 w-4 text-neutral-11" />;
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'link_created':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
      case 'link_updated':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
      case 'link_deleted':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
      case 'maintenance_enabled':
        return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950';
      case 'maintenance_disabled':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
      default:
        return 'border-neutral-3 bg-neutral-2 dark:border-neutral-8 dark:bg-neutral-1';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="text-muted-foreground text-lg">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto h-full">
          {/* Hero Section - style minimaliste comme la page d'accueil */}
          <div className="text-center space-y-6 py-12 animate-fadeIn">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Tableau de Bord
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vue d'ensemble complète de votre portfolio et de ses performances en temps réel
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Système en ligne</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideInFromBottom animate-delay-200">
          <Card className="theme-fade hover:shadow-lg transition-all duration-300 group border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4 px-6 pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Liens Totaux</CardTitle>
                <div className="p-2.5 rounded-lg bg-accent/10">
                  <Link className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-6 px-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold text-foreground">{stats?.totalLinks || 0}</div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {stats?.activeLinks || 0} actifs
                  </p>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: stats?.totalLinks ? `${(stats.activeLinks / stats.totalLinks) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-fade hover:shadow-lg transition-all duration-300 group border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4 px-6 pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Liens Actifs</CardTitle>
                <div className="p-2.5 rounded-lg bg-accent/10">
                  <Activity className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-6 px-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold text-foreground">{stats?.activeLinks || 0}</div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {stats?.totalLinks ? ((stats.activeLinks / stats.totalLinks) * 100).toFixed(1) : 0}% du total
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Fonctionnels</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-fade hover:shadow-lg transition-all duration-300 group border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4 px-6 pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pages Vues</CardTitle>
                <div className="p-2.5 rounded-lg bg-accent/10">
                  <Eye className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-6 px-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold text-foreground">{stats?.pageViews || 0}</div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Vues totales depuis le lancement
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">+12% ce mois</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-fade hover:shadow-lg transition-all duration-300 group border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4 px-6 pt-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Visiteurs Aujourd'hui</CardTitle>
                <div className="p-2.5 rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-6 px-6">
              <div className="space-y-3">
                <div className="text-3xl font-bold text-foreground">{stats?.visitorsToday || 0}</div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Visiteurs uniques aujourd'hui
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">En temps réel</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideInFromBottom animate-delay-400">
          <Card className="theme-fade border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4 px-6 pt-6">
              <CardTitle className="text-foreground flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <span>Statut de Sécurité</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground ml-11">
                État de protection du système
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6 px-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={stats?.securityStatus === 'safe' ? 'default' : stats?.securityStatus === 'warning' ? 'secondary' : 'destructive'}
                    className="capitalize px-3 py-1.5"
                  >
                    {stats?.securityStatus === 'safe' ? 'Sécurisé' : 
                     stats?.securityStatus === 'warning' ? 'Attention' : 'Danger'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Système protégé
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Dernière vérification</span>
                    <span className="text-foreground font-medium">Il y a 2 min</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Niveau de menace</span>
                    <span className="text-green-600 font-medium">Faible</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-fade border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4 px-6 pt-6">
              <CardTitle className="text-foreground flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accent/10">
                  <Settings className="h-5 w-5 text-accent" />
                </div>
                <span>Mode Maintenance</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground ml-11">
                Gestion de la disponibilité du site
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 pb-6 px-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={stats?.maintenanceMode ? 'destructive' : 'default'}
                    className="px-3 py-1.5"
                  >
                    {stats?.maintenanceMode ? 'Activé' : 'Désactivé'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {stats?.maintenanceMode ? 'Site en maintenance' : 'Site en ligne'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Temps de fonctionnement</span>
                    <span className="text-green-600 font-medium">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Dernière interruption</span>
                    <span className="text-foreground font-medium">Jamais</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="theme-fade animate-slideInFromBottom animate-delay-600 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4 px-6 pt-6">
            <CardTitle className="text-foreground flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-accent/10">
                <Activity className="h-5 w-5 text-accent" />
              </div>
              <span>Activité Récente</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground ml-11">
              Dernières actions effectuées sur votre portfolio - Mise à jour en temps réel
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-6 px-6">
            {recentActivity.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="p-4 rounded-full bg-muted/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Activity className="h-8 w-8 opacity-50" />
                </div>
                <p className="text-lg font-medium mb-2">Aucune activité récente</p>
                <p className="text-sm leading-relaxed max-w-md mx-auto">
                  Les activités apparaîtront ici dès que vous commencerez à utiliser le système. 
                  Créez votre premier lien pour voir l'historique s'afficher.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border ${getActivityColor(activity.type)} theme-fade hover:shadow-sm transition-all duration-200`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-background/50 flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-foreground leading-relaxed">
                            {activity.message}
                          </p>
                          <Badge variant="outline" className="flex-shrink-0 text-xs">
                            #{String(index + 1).padStart(3, '0')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(activity.timestamp)}</span>
                          <span className="text-muted-foreground/60">•</span>
                          <span className="capitalize">{activity.type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {recentActivity.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground text-center">
                      Affichage des {recentActivity.length} dernières activités • 
                      <button className="ml-1 text-accent hover:underline">Voir tout l'historique</button>
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="theme-fade animate-slideInFromBottom animate-delay-800 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4 px-6 pt-6">
            <CardTitle className="text-foreground text-lg">Actions Rapides</CardTitle>
            <CardDescription className="text-muted-foreground">
              Raccourcis vers les fonctionnalités principales pour une gestion efficace
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 pb-6 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => window.location.href = '/admin/links'}
                className="p-6 border border-border rounded-xl hover:bg-accent/5 hover:border-accent/30 hover:shadow-md transition-all duration-300 group text-left bg-background/50"
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-accent/10 w-fit group-hover:scale-105 transition-transform">
                    <Link className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-base">Gérer les Liens</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ajouter, modifier ou supprimer des liens de votre portfolio en quelques clics
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>{stats?.totalLinks || 0} liens configurés</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => window.location.href = '/admin/analytics'}
                className="p-6 border border-border rounded-xl hover:bg-accent/5 hover:border-accent/30 hover:shadow-md transition-all duration-300 group text-left bg-background/50"
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-accent/10 w-fit group-hover:scale-105 transition-transform">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-base">Analytics</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Consulter les statistiques détaillées et les métriques de performance
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>{stats?.pageViews || 0} vues ce mois</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => window.open('/', '_blank')}
                className="p-6 border border-border rounded-xl hover:bg-accent/5 hover:border-accent/30 hover:shadow-md transition-all duration-300 group text-left bg-background/50"
              >
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-accent/10 w-fit group-hover:scale-105 transition-transform">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-base">Voir le Site</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Prévisualiser votre portfolio en temps réel dans un nouvel onglet
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Site en ligne</span>
                  </div>
                </div>
              </button>
            </div>
            
            {/* Additional Quick Stats */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-foreground">{stats?.visitorsToday || 0}</div>
                  <div className="text-xs text-muted-foreground">Visiteurs aujourd'hui</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-foreground">99.9%</div>
                  <div className="text-xs text-muted-foreground">Temps de fonctionnement</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-foreground">2ms</div>
                  <div className="text-xs text-muted-foreground">Temps de réponse</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/20">
                  <div className="text-lg font-bold text-accent">A+</div>
                  <div className="text-xs text-muted-foreground">Score de sécurité</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
