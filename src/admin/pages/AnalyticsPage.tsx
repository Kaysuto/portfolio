import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  ChartLine, 
  Users, 
  Eye, 
  TrendUp,
  Globe,
  Clock,
  DeviceMobile,
  Monitor
} from '@phosphor-icons/react';

export const AnalyticsPage: React.FC = () => {
  const analyticsData = [
    {
      title: 'Visiteurs uniques',
      value: '8,921',
      change: '+12.5%',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Pages vues',
      value: '24,356',
      change: '+8.2%',
      icon: Eye,
      trend: 'up'
    },
    {
      title: 'Durée moyenne',
      value: '3m 42s',
      change: '+15.3%',
      icon: Clock,
      trend: 'up'
    },
    {
      title: 'Taux de rebond',
      value: '32.4%',
      change: '-2.1%',
      icon: TrendUp,
      trend: 'down'
    }
  ];

  const deviceStats = [
    { device: 'Desktop', percentage: 65, icon: Monitor },
    { device: 'Mobile', percentage: 30, icon: DeviceMobile },
    { device: 'Tablet', percentage: 5, icon: Globe }
  ];

  const topPages = [
    { page: '/', views: 12543, percentage: 45 },
    { page: '/projets', views: 8921, percentage: 32 },
    { page: '/apropos', views: 4532, percentage: 16 },
    { page: '/contact', views: 1876, percentage: 7 }
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Analytics &</span>
              <br />
              <span className="text-accent">Statistiques</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Analysez les performances de votre portfolio
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fadeInUp animate-delay-200">
            {analyticsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:bg-background/60 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} className="text-accent" />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Device Stats */}
            <div className="animate-fadeInUp animate-delay-400">
              <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Monitor size={24} className="text-accent" />
                  Répartition par appareil
                </h2>
                <div className="space-y-4">
                  {deviceStats.map((device, index) => {
                    const IconComponent = device.icon;
                    return (
                      <div key={device.device} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <IconComponent size={16} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-foreground font-medium">{device.device}</span>
                            <span className="text-muted-foreground text-sm">{device.percentage}%</span>
                          </div>
                          <div className="w-full bg-border/30 rounded-full h-2">
                            <div
                              className="bg-accent rounded-full h-2 transition-all duration-500"
                              style={{ width: `${device.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="animate-fadeInUp animate-delay-500">
              <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <ChartLine size={24} className="text-accent" />
                  Pages les plus visitées
                </h2>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between p-3 rounded-lg hover:bg-background/20 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{page.page}</p>
                          <p className="text-muted-foreground text-sm">{page.views.toLocaleString()} vues</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-accent font-medium">{page.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="text-center animate-fadeInUp animate-delay-600">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Outils d'analyse
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25">
                <ChartLine size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                Exporter rapport
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                <Globe size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Vue détaillée
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
