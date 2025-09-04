import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, Trash, Plus, Warning, CheckCircle } from '@phosphor-icons/react';
import { AdminLayout } from '../components/AdminLayout';
import { AnimatedContainer, StaggeredGrid } from '../components/AnimatedComponents';

export const SecurityPage = () => {
  const navigate = useNavigate();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [whitelistIPs, setWhitelistIPs] = useState([
    { ip: '127.0.0.1', label: 'Localhost', addedDate: '2024-01-15' },
    { ip: '192.168.1.100', label: 'Bureau Principal', addedDate: '2024-01-20' },
    { ip: '89.234.156.78', label: 'Domicile', addedDate: '2024-02-01' },
  ]);
  const [currentIP, setCurrentIP] = useState('89.234.156.78');

  // Vérifier authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Simuler la détection IP
  useEffect(() => {
    // En réalité, on récupérerait l'IP via une API
    setCurrentIP('89.234.156.78');
  }, []);

  const securityLogs = [
    { time: '2024-02-28 14:30', action: 'Connexion réussie', ip: '89.234.156.78', status: 'success' },
    { time: '2024-02-28 09:15', action: 'Tentative de connexion', ip: '45.123.67.89', status: 'blocked' },
    { time: '2024-02-27 16:45', action: 'Connexion réussie', ip: '192.168.1.100', status: 'success' },
    { time: '2024-02-27 11:20', action: 'IP ajoutée à la whitelist', ip: '89.234.156.78', status: 'info' },
    { time: '2024-02-26 08:30', action: 'Tentative de connexion', ip: '123.45.67.89', status: 'blocked' },
  ];

  const addWhitelistIP = () => {
    const ip = prompt('Entrez une adresse IP:');
    const label = prompt('Libellé (optionnel):');
    if (ip) {
      const newEntry = {
        ip,
        label: label || 'Sans nom',
        addedDate: new Date().toISOString().split('T')[0]
      };
      setWhitelistIPs([...whitelistIPs, newEntry]);
    }
  };

  const removeWhitelistIP = (ipToRemove: string) => {
    setWhitelistIPs(whitelistIPs.filter(item => item.ip !== ipToRemove));
  };

  const addCurrentIP = () => {
    if (!whitelistIPs.some(item => item.ip === currentIP)) {
      const newEntry = {
        ip: currentIP,
        label: 'IP Actuelle',
        addedDate: new Date().toISOString().split('T')[0]
      };
      setWhitelistIPs([...whitelistIPs, newEntry]);
    }
  };

  return (
    <AdminLayout 
      title="Sécurité & Accès" 
      subtitle="Gérez la sécurité et les accès autorisés à votre panel admin"
      actions={
        <div className="flex space-x-2">
          <Button
            onClick={addCurrentIP}
            variant="outline"
            className="border-accent/30 hover:bg-accent/10"
            disabled={whitelistIPs.some(item => item.ip === currentIP)}
          >
            <Plus size={16} className="mr-2" />
            Autoriser IP Actuelle
          </Button>
        </div>
      }
    >
      {/* Status sécurité */}
      <StaggeredGrid 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        startDelay={0}
      >
        {[
          {
            icon: Shield,
            title: "Protection Active",
            value: "Sécurisé",
            description: "Whitelist IP activée",
            color: "text-green-500"
          },
          {
            icon: Lock,
            title: "Authentification 2FA",
            value: twoFactorEnabled ? 'Activée' : 'Désactivée',
            description: "",
            color: twoFactorEnabled ? 'text-green-500' : 'text-orange-500',
            action: () => setTwoFactorEnabled(!twoFactorEnabled),
            actionText: twoFactorEnabled ? 'Désactiver' : 'Activer'
          },
          {
            icon: Eye,
            title: "IP Actuelle",
            value: currentIP,
            description: whitelistIPs.some(item => item.ip === currentIP) ? "✓ Autorisée" : "⚠ Non autorisée",
            color: "text-foreground",
            descColor: whitelistIPs.some(item => item.ip === currentIP) ? "text-green-500" : "text-orange-500"
          }
        ].map((stat, index) => (
          <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent/20 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <stat.icon size={20} className={stat.color} />
              <h3 className="font-semibold text-foreground">{stat.title}</h3>
            </div>
            <p className={`text-lg font-bold ${stat.color} ${index === 2 ? 'font-mono text-base' : 'text-2xl'}`}>
              {stat.value}
            </p>
            <p className={`text-sm ${stat.descColor || 'text-muted-foreground'}`}>
              {stat.description}
            </p>
            {stat.action && (
              <Button
                onClick={stat.action}
                variant="ghost"
                size="sm"
                className="mt-2 text-accent hover:bg-accent/10"
              >
                {stat.actionText}
              </Button>
            )}
          </div>
        ))}
      </StaggeredGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Whitelist IP */}
        <AnimatedContainer delay={3} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Shield size={20} className="mr-2 text-accent" />
              Whitelist IP
              <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                {whitelistIPs.length}
              </span>
            </h3>
            <Button
              onClick={addWhitelistIP}
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Plus size={14} className="mr-1" />
              Ajouter
            </Button>
          </div>
          
          <div className="space-y-3">
            {whitelistIPs.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/10"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-foreground">{item.ip}</span>
                    {item.ip === currentIP && (
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">
                        Actuelle
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">Ajoutée le {item.addedDate}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWhitelistIP(item.ip)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash size={14} />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-600">
              💡 Seules les IP de cette liste peuvent accéder au panel admin
            </p>
          </div>
        </AnimatedContainer>

        {/* Logs de sécurité */}
        <AnimatedContainer delay={4} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            <Warning size={20} className="mr-2 text-accent" />
            Logs de Sécurité
          </h3>
          
          <div className="space-y-3">
            {securityLogs.map((log, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-accent/5 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.status === 'success' ? 'bg-green-500' :
                    log.status === 'blocked' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground font-mono">{log.ip}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{log.time}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    log.status === 'success' ? 'bg-green-500/20 text-green-600' :
                    log.status === 'blocked' ? 'bg-red-500/20 text-red-600' :
                    'bg-blue-500/20 text-blue-600'
                  }`}>
                    {log.status === 'success' ? 'Autorisé' :
                     log.status === 'blocked' ? 'Bloqué' :
                     'Info'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full mt-4 border-accent/30 hover:bg-accent/10"
          >
            Voir tous les logs
          </Button>
        </AnimatedContainer>
      </div>

      {/* Configuration 2FA */}
      {twoFactorEnabled && (
        <AnimatedContainer delay={5} className="mt-8 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            <Lock size={20} className="mr-2 text-accent" />
            Configuration 2FA
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">QR Code</h4>
              <div className="bg-white p-4 rounded-lg border border-border">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                  QR Code pour Google Authenticator
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Codes de récupération</h4>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Conservez ces codes en sécurité :
                </p>
                <div className="space-y-1 font-mono text-xs">
                  <div>123456</div>
                  <div>789012</div>
                  <div>345678</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      )}
    </AdminLayout>
  );
};
