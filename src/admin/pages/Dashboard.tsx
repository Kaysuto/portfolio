import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  ChartBar, 
  Users, 
  Eye, 
  TrendUp,
  Shield,
  Gear,
  Warning,
  CheckCircle
} from '@phosphor-icons/react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Vues totales',
      value: '12,543',
      change: '+12%',
      icon: Eye,
      color: 'accent'
    },
    {
      title: 'Visiteurs uniques',
      value: '8,921',
      change: '+8%',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Taux de conversion',
      value: '3.2%',
      change: '+0.5%',
      icon: TrendUp,
      color: 'secondary'
    },
    {
      title: 'Performance',
      value: '98%',
      change: '+2%',
      icon: ChartBar,
      color: 'accent'
    }
  ];

  const recentActivity = [
    { type: 'info', message: 'Nouvelle visite depuis la France', time: 'Il y a 2 minutes' },
    { type: 'success', message: 'Système mis à jour avec succès', time: 'Il y a 1 heure' },
    { type: 'warning', message: 'Espace disque à 85%', time: 'Il y a 3 heures' },
    { type: 'info', message: 'Nouvelle connexion admin', time: 'Il y a 5 heures' }
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen px-6 py-8">
        {/* Hero Section - style page d'accueil */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Tableau de</span>
              <br />
              <span className="text-accent">Bord</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Vue d'ensemble de votre portfolio
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fadeInUp animate-delay-200">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:bg-background/60 transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} className="text-accent" />
                    </div>
                    <span className="text-sm text-green-500 font-medium">
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

          {/* Quick Actions - style boutons page d'accueil */}
          <div className="mb-12 animate-fadeInUp animate-delay-400">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Actions rapides
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25">
                <ChartBar size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Voir Analytics
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                <Gear size={20} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Paramètres
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="animate-fadeInUp animate-delay-600">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Activité récente
            </h2>
            <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-background/20 transition-all duration-300"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'success' ? 'bg-green-500/20' :
                      activity.type === 'warning' ? 'bg-yellow-500/20' :
                      'bg-accent/20'
                    }`}>
                      {activity.type === 'success' ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : activity.type === 'warning' ? (
                        <Warning size={16} className="text-yellow-500" />
                      ) : (
                        <Shield size={16} className="text-accent" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">
                        {activity.message}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
