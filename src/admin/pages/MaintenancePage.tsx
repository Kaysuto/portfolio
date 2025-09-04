import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Database, 
  CloudArrowUp, 
  Warning,
  CheckCircle,
  Clock,
  HardDrives,
  Cpu,
  WifiHigh
} from '@phosphor-icons/react';

export const MaintenancePage: React.FC = () => {
  const systemStatus = [
    {
      service: 'Base de données',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '2 min',
      icon: Database
    },
    {
      service: 'Serveur web',
      status: 'healthy',
      uptime: '99.8%',
      lastCheck: '1 min',
      icon: CloudArrowUp
    },
    {
      service: 'CDN',
      status: 'healthy',
      uptime: '100%',
      lastCheck: '30 sec',
      icon: WifiHigh
    },
    {
      service: 'Cache Redis',
      status: 'warning',
      uptime: '98.5%',
      lastCheck: '5 min',
      icon: HardDrives
    }
  ];

  const maintenanceTasks = [
    {
      task: 'Mise à jour sécurité',
      priority: 'high',
      scheduled: '15:00 aujourd\'hui',
      duration: '30 min',
      status: 'pending'
    },
    {
      task: 'Nettoyage cache',
      priority: 'medium',
      scheduled: '02:00 demain',
      duration: '15 min',
      status: 'scheduled'
    },
    {
      task: 'Backup base données',
      priority: 'high',
      scheduled: 'Quotidien 01:00',
      duration: '45 min',
      status: 'active'
    },
    {
      task: 'Optimisation images',
      priority: 'low',
      scheduled: 'Hebdomadaire',
      duration: '60 min',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return Warning;
      case 'error': return Warning;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Maintenance &</span>
              <br />
              <span className="text-accent">Système</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Surveillance et maintenance du portfolio
            </p>
          </div>

          {/* System Status */}
          <div className="mb-12 animate-fadeInUp animate-delay-200">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Cpu size={28} className="text-accent" />
              État du système
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemStatus.map((service, index) => {
                const IconComponent = service.icon;
                const StatusIcon = getStatusIcon(service.status);
                return (
                  <div
                    key={service.service}
                    className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:bg-background/60 transition-all duration-300 hover:scale-105 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} className="text-accent" />
                      </div>
                      <StatusIcon size={20} className={getStatusColor(service.status)} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {service.service}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Uptime: <span className="text-foreground font-medium">{service.uptime}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Dernière vérif: <span className="text-foreground font-medium">{service.lastCheck}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Maintenance Tasks */}
          <div className="mb-12 animate-fadeInUp animate-delay-400">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Wrench size={28} className="text-accent" />
              Tâches de maintenance
            </h2>
            <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
              <div className="space-y-4">
                {maintenanceTasks.map((task, index) => (
                  <div
                    key={task.task}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg hover:bg-background/20 transition-all duration-300 border border-border/30"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{task.task}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                        <span>📅 {task.scheduled}</span>
                        <span>⏱️ {task.duration}</span>
                        <span>📊 {task.status}</span>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-accent text-accent hover:bg-accent/10"
                      >
                        Gérer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center animate-fadeInUp animate-delay-600">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground p-6 h-auto flex-col group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25">
                <Database size={32} className="mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Backup DB</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 p-6 h-auto flex-col group transition-all duration-300 hover:scale-105"
              >
                <HardDrives size={32} className="mb-2 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-medium">Vider cache</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 p-6 h-auto flex-col group transition-all duration-300 hover:scale-105"
              >
                <CloudArrowUp size={32} className="mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Déployer</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 p-6 h-auto flex-col group transition-all duration-300 hover:scale-105"
              >
                <Cpu size={32} className="mb-2 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-medium">Diagnostics</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
