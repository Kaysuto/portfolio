import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Download, Eye, Users, Globe, TrendUp, Calendar, Share } from '@phosphor-icons/react';
import { AdminLayout } from '../components/AdminLayout';
import { StaggeredGrid, AnimatedContainer } from '../components/AnimatedComponents';

export const AnalyticsPage = () => {
  const navigate = useNavigate();

  // Vérifier authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Données simulées
  const stats = [
    { icon: Eye, label: "Vues Aujourd'hui", value: "1,284", change: "+12.5%", color: "text-blue-500" },
    { icon: Users, label: "Visiteurs Uniques", value: "892", change: "+8.2%", color: "text-green-500" },
    { icon: Globe, label: "Pages Vues", value: "2,547", change: "+15.3%", color: "text-purple-500" },
    { icon: TrendUp, label: "Taux de Rebond", value: "23.8%", change: "-2.1%", color: "text-orange-500" },
  ];

  const topPages = [
    { page: "/", views: 1284, percentage: 45 },
    { page: "/admin", views: 423, percentage: 15 },
    { page: "/projects", views: 312, percentage: 11 },
    { page: "/contact", views: 198, percentage: 7 },
    { page: "/about", views: 156, percentage: 5 },
  ];

  const topCountries = [
    { country: "France", flag: "🇫🇷", visits: 542, percentage: 42 },
    { country: "États-Unis", flag: "🇺🇸", visits: 234, percentage: 18 },
    { country: "Canada", flag: "🇨🇦", visits: 123, percentage: 9 },
    { country: "Allemagne", flag: "🇩🇪", visits: 98, percentage: 8 },
    { country: "Royaume-Uni", flag: "🇬🇧", visits: 76, percentage: 6 },
  ];

  const recentActivity = [
    { time: "Il y a 2 min", action: "Nouvelle visite", page: "/", country: "🇫🇷 France" },
    { time: "Il y a 5 min", action: "Page consultée", page: "/projects", country: "🇺🇸 États-Unis" },
    { time: "Il y a 8 min", action: "Nouvelle visite", page: "/admin", country: "🇨🇦 Canada" },
    { time: "Il y a 12 min", action: "Page consultée", page: "/contact", country: "🇫🇷 France" },
  ];

  return (
    <AdminLayout 
      title="Analytics & Statistiques" 
      subtitle="Suivez les performances de votre portfolio en temps réel"
      actions={
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-accent/30 hover:bg-accent/10"
          >
            <Share size={16} className="mr-2" />
            Partager
          </Button>
          <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Download size={16} className="mr-2" />
            Exporter
          </Button>
        </div>
      }
    >
      {/* Stats principales */}
      <StaggeredGrid 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        startDelay={0}
      >
        {stats.map((stat, index) => (
          <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <stat.icon size={20} className="text-accent" />
              </div>
              <span className={`text-xs font-medium ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
            </div>
          </div>
        ))}
      </StaggeredGrid>

      {/* Graphiques et données */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pages populaires */}
        <AnimatedContainer delay={4} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            <Eye size={20} className="mr-2 text-accent" />
            Pages Populaires
          </h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{page.page}</p>
                  <div className="w-full bg-accent/10 rounded-full h-2 mt-1">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-medium text-accent">{page.views}</p>
                  <p className="text-xs text-muted-foreground">{page.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedContainer>

        {/* Pays */}
        <AnimatedContainer delay={5} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            <Globe size={20} className="mr-2 text-accent" />
            Visiteurs par Pays
          </h3>
          <div className="space-y-4">
            {topCountries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium text-foreground">{country.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-accent/10 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${country.percentage * 2}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-accent font-medium w-12 text-right">{country.visits}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedContainer>
      </div>

      {/* Activité en temps réel */}
      <AnimatedContainer delay={6} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <TrendUp size={20} className="mr-2 text-accent" />
          Activité en Temps Réel
          <span className="ml-2 text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            Live
          </span>
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-accent/5 rounded-lg hover:bg-accent/10 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.page}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{activity.time}</p>
                <p className="text-xs text-accent">{activity.country}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedContainer>

      {/* Intégrations */}
      <StaggeredGrid 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        startDelay={7}
      >
        {[
          {
            title: "Google Analytics",
            description: "Connecté et synchronisé avec votre compte GA4",
            status: "Actif",
            action: "Configurer"
          },
          {
            title: "Cloudflare Analytics", 
            description: "Statistiques de performance et sécurité",
            status: "Actif",
            action: "Voir Dashboard"
          }
        ].map((integration, index) => (
          <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent/20 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-3 text-foreground">{integration.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">{integration.status}</span>
              <Button variant="outline" size="sm">{integration.action}</Button>
            </div>
          </div>
        ))}
      </StaggeredGrid>
    </AdminLayout>
  );
};
