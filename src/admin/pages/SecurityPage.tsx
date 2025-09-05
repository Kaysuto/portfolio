import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Shield, 
  Key, 
  Warning,
  CheckCircle,
  Eye,
  UserCheck,
  Detective,
  FireExtinguisher,
  Plus,
  Trash,
  X
} from '@phosphor-icons/react';
import { SecurityService } from '../services/securityService';
import { IPWhitelistEntry } from '../services/securityService';

export const SecurityPage: React.FC = () => {
  const [ipWhitelist, setIpWhitelist] = useState<IPWhitelistEntry[]>([]);
  const [newIP, setNewIP] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadIPWhitelist();
  }, []);

  const loadIPWhitelist = async () => {
    try {
      setLoading(true);
      const whitelist = await SecurityService.getIPWhitelist();
      setIpWhitelist(whitelist);
    } catch (err) {
      setError('Erreur lors du chargement de la whitelist IP');
      console.error('Error loading IP whitelist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIP = async () => {
    if (!newIP.trim() || !newDescription.trim()) {
      setError('Veuillez saisir une adresse IP et une description');
      return;
    }

    try {
      setError(null);
      await SecurityService.addIPToWhitelist({
        ip_address: newIP.trim(),
        description: newDescription.trim()
      });
      setNewIP('');
      setNewDescription('');
      setSuccess('Adresse IP ajoutée avec succès');
      await loadIPWhitelist();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erreur lors de l\'ajout de l\'adresse IP');
      console.error('Error adding IP:', err);
    }
  };

  const handleRemoveIP = async (id: string) => {
    try {
      setError(null);
      await SecurityService.removeIPFromWhitelist(id);
      setSuccess('Adresse IP supprimée avec succès');
      await loadIPWhitelist();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Erreur lors de la suppression de l\'adresse IP');
      console.error('Error removing IP:', err);
    }
  };

  const securityMetrics = [
    {
      title: 'Adresses IP whitelistées',
      value: ipWhitelist.length.toString(),
      change: '+0',
      status: 'safe',
      icon: Shield,
      timeframe: 'actuellement'
    },
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
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-6xl mx-auto h-full">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fadeInUp">
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

        {/* IP Whitelist Management */}
        <div className="mb-12 animate-fadeInUp animate-delay-300">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Shield size={28} className="text-accent" />
            Gestion de la Whitelist IP
          </h2>

          {/* Add IP Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={20} />
                Ajouter une adresse IP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="newIP">Adresse IP</Label>
                  <Input
                    id="newIP"
                    placeholder="192.168.1.100"
                    value={newIP}
                    onChange={(e) => setNewIP(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="newDescription">Description</Label>
                  <Input
                    id="newDescription"
                    placeholder="Bureau principal"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddIP} className="w-full">
                    <Plus size={16} className="mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success/Error Messages */}
          {error && (
            <Alert className="mb-6 border-red-500/50">
              <X size={16} className="text-red-500" />
              <AlertDescription className="text-red-500">{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-6 border-green-500/50">
              <CheckCircle size={16} className="text-green-500" />
              <AlertDescription className="text-green-500">{success}</AlertDescription>
            </Alert>
          )}

          {/* IP Whitelist List */}
          <Card>
            <CardHeader>
              <CardTitle>Adresses IP autorisées</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Chargement...</p>
                </div>
              ) : ipWhitelist.length === 0 ? (
                <div className="text-center py-8">
                  <Shield size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune adresse IP dans la whitelist</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ipWhitelist.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-background/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <Shield size={20} className="text-accent" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{entry.ip_address}</p>
                          <p className="text-sm text-muted-foreground">{entry.description || 'Sans description'}</p>
                          <p className="text-xs text-muted-foreground">
                            Ajouté le {new Date(entry.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={entry.is_active ? "default" : "secondary"}>
                          {entry.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveIP(entry.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
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
  );
};
