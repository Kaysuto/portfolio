import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Gear, Play, Pause, Calendar, Users, Shield } from '@phosphor-icons/react';
import { AdminLayout } from '../components/AdminLayout';
import { AnimatedContainer, StaggeredGrid } from '../components/AnimatedComponents';

export const MaintenancePage = () => {
  const navigate = useNavigate();
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [customMessage, setCustomMessage] = useState('Site en maintenance. Nous serons de retour bientôt !');
  const [scheduledMaintenance, setScheduledMaintenance] = useState('');
  const [whitelistIPs, setWhitelistIPs] = useState(['127.0.0.1', '192.168.1.1']);

  // Vérifier authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const toggleMaintenanceMode = () => {
    setIsMaintenanceMode(!isMaintenanceMode);
    // TODO: Implementer la logique réelle
  };

  const addWhitelistIP = () => {
    const ip = prompt('Entrez une adresse IP à whitelist:');
    if (ip && !whitelistIPs.includes(ip)) {
      setWhitelistIPs([...whitelistIPs, ip]);
    }
  };

  const removeWhitelistIP = (ip: string) => {
    setWhitelistIPs(whitelistIPs.filter(whiteIP => whiteIP !== ip));
  };

  return (
    <AdminLayout 
      title="Mode Maintenance" 
      subtitle="Configurez et gérez le mode maintenance de votre site"
      actions={
        <Button
          onClick={toggleMaintenanceMode}
          className={`transition-all duration-300 ${
            isMaintenanceMode 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isMaintenanceMode ? (
            <>
              <Pause size={16} className="mr-2" />
              Désactiver Maintenance
            </>
          ) : (
            <>
              <Play size={16} className="mr-2" />
              Activer Maintenance
            </>
          )}
        </Button>
      }
    >
      {/* Status actuel */}
      <AnimatedContainer delay={0} className="mb-8">
        <div className={`bg-card/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 ${
          isMaintenanceMode 
            ? 'border-red-500/30 bg-red-500/5' 
            : 'border-green-500/30 bg-green-500/5'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                isMaintenanceMode ? 'bg-red-500/20' : 'bg-green-500/20'
              }`}>
                <Gear size={24} className={isMaintenanceMode ? 'text-red-500' : 'text-green-500'} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {isMaintenanceMode ? 'Site en Maintenance' : 'Site Opérationnel'}
                </h2>
                <p className="text-muted-foreground">
                  {isMaintenanceMode 
                    ? 'Les visiteurs voient la page de maintenance' 
                    : 'Le site fonctionne normalement'
                  }
                </p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isMaintenanceMode 
                ? 'bg-red-500/20 text-red-600' 
                : 'bg-green-500/20 text-green-600'
            }`}>
              {isMaintenanceMode ? 'MAINTENANCE' : 'OPÉRATIONNEL'}
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration du message */}
        <AnimatedContainer delay={1} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            <Gear size={20} className="mr-2 text-accent" />
            Message de Maintenance
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Message personnalisé
              </label>
              <textarea 
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Message affiché aux visiteurs..."
                className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Maintenance programmée
              </label>
              <input 
                type="datetime-local"
                value={scheduledMaintenance}
                onChange={(e) => setScheduledMaintenance(e.target.value)}
                className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Optionnel : programmer l'activation automatique
              </p>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-accent/30 hover:bg-accent/10"
            >
              Sauvegarder Configuration
            </Button>
          </div>
        </AnimatedContainer>

        {/* Whitelist IP */}
        <AnimatedContainer delay={2} className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
            <Shield size={20} className="mr-2 text-accent" />
            IP Autorisées
            <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded">
              {whitelistIPs.length}
            </span>
          </h3>
          
          <div className="space-y-3 mb-4">
            {whitelistIPs.map((ip, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-accent/5 rounded-lg"
              >
                <span className="text-sm font-mono text-foreground">{ip}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWhitelistIP(ip)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>

          <Button 
            onClick={addWhitelistIP}
            variant="outline" 
            className="w-full border-accent/30 hover:bg-accent/10"
          >
            Ajouter IP
          </Button>
          
          <p className="text-xs text-muted-foreground mt-2">
            Les IP de cette liste peuvent accéder au site même en mode maintenance
          </p>
        </AnimatedContainer>
      </div>

      {/* Prévisualisation */}
      <AnimatedContainer delay={3} className="mt-8 bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
          <Users size={20} className="mr-2 text-accent" />
          Prévisualisation - Page de Maintenance
        </h3>
        
        <div className="border border-border rounded-lg p-8 bg-background/50 text-center">
          <div className="text-4xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Site en Maintenance</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {customMessage}
          </p>
          {scheduledMaintenance && (
            <p className="text-sm text-accent">
              Retour prévu : {new Date(scheduledMaintenance).toLocaleString('fr-FR')}
            </p>
          )}
        </div>
      </AnimatedContainer>

      {/* Statistiques de maintenance */}
      <StaggeredGrid 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        startDelay={4}
      >
        {[
          { label: "Dernière Maintenance", value: "Il y a 15 jours" },
          { label: "Durée Moyenne", value: "2h 30min" },
          { label: "Uptime", value: "99.8%", color: "text-green-500" }
        ].map((stat, index) => (
          <div key={index} className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border text-center hover:border-accent/20 transition-all duration-300">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-lg font-bold ${stat.color || 'text-foreground'}`}>{stat.value}</p>
          </div>
        ))}
      </StaggeredGrid>
    </AdminLayout>
  );
};
