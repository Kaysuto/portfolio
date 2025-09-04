import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Key, 
  Lock, 
  Warning,
  CheckCircle,
  Eye,
  UserCheck,
  ShieldCheck,
  Detective,
  FireExtinguisher
} from '@phosphor-icons/react';

export const SecurityPage: React.FC = () => {
  const securityMetrics = [
    {
      title: 'Tentatives de connexion',
      value: '156',
      change: '+23',
      status: 'safe',
      icon: Key,
      timeframe: 'dernières 24h'
    },
    {
      title: 'Accès bloqués',
      value: '12',
      change: '+4',
      status: 'warning',
      icon: Shield,
      timeframe: 'dernières 24h'
    },
    {
      title: 'Sessions actives',
      value: '3',
      change: '0',
      status: 'safe',
      icon: UserCheck,
      timeframe: 'maintenant'
    },
    {
      title: 'Vulnérabilités',
      value: '0',
      change: '-2',
      status: 'safe',
      icon: ShieldCheck,
      timeframe: 'scan complet'
    }
  ];

  const securityLogs = [
    {
      event: 'Connexion administrateur',
      user: 'admin@kimiya.dev',
      ip: '192.168.1.100',
      time: '14:32',
      status: 'success',
      severity: 'info'
    },
    {
      event: 'Tentative connexion échouée',
      user: 'unknown@suspicious.com',
      ip: '45.123.45.67',
      time: '14:15',
      status: 'blocked',
      severity: 'warning'
    },
    {
      event: 'Mise à jour certificat SSL',
      user: 'system',
      ip: 'localhost',
      time: '13:45',
      status: 'success',
      severity: 'info'
    },
    {
      event: 'Scan sécurité automatique',
      user: 'system',
      ip: 'localhost',
      time: '12:00',
      status: 'completed',
      severity: 'info'
    }
  ];

  const securityPolicies = [
    {
      policy: 'Authentification 2FA',
      status: 'active',
      description: 'Double authentification obligatoire'
    },
    {
      policy: 'Chiffrement données',
      status: 'active',
      description: 'AES-256 pour toutes les données'
    },
    {
      policy: 'Sessions sécurisées',
      status: 'active',
      description: 'Expiration automatique après 30min'
    },
    {
      policy: 'Audit des accès',
      status: 'active',
      description: 'Logging complet des connexions'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'danger': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getLogSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'error': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'blocked': return Shield;
      case 'completed': return CheckCircle;
      default: return Warning;
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Sécurité &</span>
              <br />
              <span className="text-accent">Protection</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Surveillance et protection du portfolio
            </p>
          </div>

          {/* Security Metrics */}
          <div className="mb-12 animate-fadeInUp animate-delay-200">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Detective size={28} className="text-accent" />
              Métriques de sécurité
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div
                    key={metric.title}
                    className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:bg-background/60 transition-all duration-300 hover:scale-105 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} className="text-accent" />
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                        {metric.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {metric.value}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {metric.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {metric.timeframe}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Security Logs */}
            <div className="animate-fadeInUp animate-delay-400">
              <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Eye size={24} className="text-accent" />
                  Logs de sécurité
                </h2>
                <div className="space-y-4">
                  {securityLogs.map((log, index) => {
                    const StatusIcon = getLogStatusIcon(log.status);
                    return (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-background/20 transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                          <StatusIcon size={16} className="text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground font-medium text-sm">{log.event}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLogSeverityColor(log.severity)}`}>
                              {log.severity}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-xs mb-1">{log.user}</p>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{log.ip}</span>
                            <span>{log.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Security Policies */}
            <div className="animate-fadeInUp animate-delay-500">
              <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Lock size={24} className="text-accent" />
                  Politiques de sécurité
                </h2>
                <div className="space-y-4">
                  {securityPolicies.map((policy, index) => (
                    <div key={policy.policy} className="flex items-center justify-between p-3 rounded-lg hover:bg-background/20 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle size={16} className="text-green-500" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{policy.policy}</p>
                          <p className="text-muted-foreground text-sm">{policy.description}</p>
                        </div>
                      </div>
                      <span className="text-green-500 text-sm font-medium">
                        {policy.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Security Actions */}
          <div className="text-center animate-fadeInUp animate-delay-600">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Actions de sécurité
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground p-6 h-auto flex-col group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25">
                <Shield size={32} className="mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Scan sécurité</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 p-6 h-auto flex-col group transition-all duration-300 hover:scale-105"
              >
                <Key size={32} className="mb-2 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-medium">Changer clés</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 p-6 h-auto flex-col group transition-all duration-300 hover:scale-105"
              >
                <FireExtinguisher size={32} className="mb-2 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Blocage IP</span>
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent/10 p-6 h-auto flex-col group transition-all duration-300 hover:scale-105"
              >
                <Eye size={32} className="mb-2 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-medium">Audit complet</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
