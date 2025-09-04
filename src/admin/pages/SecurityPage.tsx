import { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  KeyIcon,
  UserGroupIcon,
  LockClosedIcon,
  EyeIcon,
  ClockIcon,
  ComputerDesktopIcon,
  ShieldExclamationIcon,
  CogIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface SecurityAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  source: string;
  resolved: boolean;
}

interface LoginAttempt {
  id: string;
  email: string;
  ip: string;
  location: string;
  device: string;
  success: boolean;
  timestamp: string;
}

interface SecurityConfig {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordExpiry: number;
  ipWhitelist: boolean;
  auditLogging: boolean;
}

export const SecurityPage: React.FC = () => {
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [securityConfig, setSecurityConfig] = useState<SecurityConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts' | 'access' | 'config'>('overview');

  useEffect(() => {
    const loadSecurityData = async () => {
      try {
        // Simulation des données de sécurité
        const mockAlerts: SecurityAlert[] = [
          {
            id: '1',
            type: 'warning',
            title: 'Tentatives de connexion suspectes',
            description: '5 tentatives de connexion échouées depuis la même IP en 10 minutes',
            timestamp: '2024-01-15 14:25:12',
            source: 'Auth System',
            resolved: false
          },
          {
            id: '2',
            type: 'info',
            title: 'Mise à jour de sécurité disponible',
            description: 'Nouvelle mise à jour de sécurité disponible pour le système',
            timestamp: '2024-01-15 12:15:30',
            source: 'Update Manager',
            resolved: false
          },
          {
            id: '3',
            type: 'critical',
            title: 'Accès non autorisé détecté',
            description: 'Tentative d\'accès à des fichiers sensibles depuis une IP inconnue',
            timestamp: '2024-01-15 10:45:22',
            source: 'File Monitor',
            resolved: true
          },
          {
            id: '4',
            type: 'error',
            title: 'Échec de sauvegarde sécurisée',
            description: 'La sauvegarde chiffrée automatique a échoué',
            timestamp: '2024-01-15 08:30:15',
            source: 'Backup Service',
            resolved: false
          }
        ];

        const mockLoginAttempts: LoginAttempt[] = [
          {
            id: '1',
            email: 'admin@example.com',
            ip: '192.168.1.100',
            location: 'Paris, France',
            device: 'Chrome on Windows',
            success: true,
            timestamp: '2024-01-15 14:30:15'
          },
          {
            id: '2',
            email: 'admin@example.com',
            ip: '203.145.67.89',
            location: 'Unknown',
            device: 'Unknown Browser',
            success: false,
            timestamp: '2024-01-15 14:25:12'
          },
          {
            id: '3',
            email: 'test@example.com',
            ip: '10.0.0.45',
            location: 'Lyon, France',
            device: 'Firefox on macOS',
            success: false,
            timestamp: '2024-01-15 13:45:33'
          },
          {
            id: '4',
            email: 'admin@example.com',
            ip: '192.168.1.100',
            location: 'Paris, France',
            device: 'Chrome on Windows',
            success: true,
            timestamp: '2024-01-15 13:20:45'
          },
          {
            id: '5',
            email: 'hacker@malicious.com',
            ip: '45.123.45.67',
            location: 'Unknown',
            device: 'Bot/Script',
            success: false,
            timestamp: '2024-01-15 12:15:22'
          }
        ];

        const mockConfig: SecurityConfig = {
          twoFactorAuth: true,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          passwordExpiry: 90,
          ipWhitelist: false,
          auditLogging: true
        };

        setSecurityAlerts(mockAlerts);
        setLoginAttempts(mockLoginAttempts);
        setSecurityConfig(mockConfig);
      } catch (error) {
        console.error('Erreur chargement données sécurité:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSecurityData();
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <ShieldExclamationIcon className="w-5 h-5 text-error" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-error" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-warning" />;
      case 'info':
        return <ExclamationTriangleIcon className="w-5 h-5 text-info" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-base-content/50" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <div className="badge badge-error badge-sm">Critique</div>;
      case 'error':
        return <div className="badge badge-error badge-sm">Erreur</div>;
      case 'warning':
        return <div className="badge badge-warning badge-sm">Alerte</div>;
      case 'info':
        return <div className="badge badge-info badge-sm">Info</div>;
      default:
        return <div className="badge badge-ghost badge-sm">-</div>;
    }
  };

  const updateSecurityConfig = (key: keyof SecurityConfig, value: any) => {
    if (securityConfig) {
      setSecurityConfig({ ...securityConfig, [key]: value });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
            <ShieldCheckIcon className="w-8 h-8" />
            Sécurité
          </h1>
          <p className="text-base-content/70 mt-1">
            Surveillance de la sécurité et gestion des accès
          </p>
        </div>
        
        <button className="btn btn-primary">
          <ArrowPathIcon className="w-4 h-4" />
          Actualiser
        </button>
      </div>

      {/* Navigation par onglets */}
      <div className="tabs tabs-boxed">
        <button 
          className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <ShieldCheckIcon className="w-4 h-4 mr-2" />
          Vue d'ensemble
        </button>
        <button 
          className={`tab ${activeTab === 'alerts' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
          Alertes
        </button>
        <button 
          className={`tab ${activeTab === 'access' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('access')}
        >
          <EyeIcon className="w-4 h-4 mr-2" />
          Journaux d'accès
        </button>
        <button 
          className={`tab ${activeTab === 'config' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          <CogIcon className="w-4 h-4 mr-2" />
          Configuration
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Métriques de sécurité */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-success">
                  <ShieldCheckIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Niveau de sécurité</div>
                <div className="stat-value text-success">Élevé</div>
                <div className="stat-desc">87/100 points</div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-warning">
                  <ExclamationTriangleIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Alertes actives</div>
                <div className="stat-value text-warning">
                  {securityAlerts.filter(a => !a.resolved).length}
                </div>
                <div className="stat-desc">
                  {securityAlerts.filter(a => a.type === 'critical').length} critiques
                </div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-error">
                  <LockClosedIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Tentatives échouées</div>
                <div className="stat-value text-error">
                  {loginAttempts.filter(a => !a.success).length}
                </div>
                <div className="stat-desc">Dernières 24h</div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-success">
                  <KeyIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Connexions réussies</div>
                <div className="stat-value text-success">
                  {loginAttempts.filter(a => a.success).length}
                </div>
                <div className="stat-desc">Dernières 24h</div>
              </div>
            </div>
          </div>

          {/* Statut des fonctionnalités de sécurité */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Fonctionnalités de sécurité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <KeyIcon className="w-5 h-5" />
                    <span>Authentification à deux facteurs</span>
                  </div>
                  <div className="badge badge-success">Activé</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-5 h-5" />
                    <span>Expiration de session</span>
                  </div>
                  <div className="badge badge-success">30 min</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DocumentTextIcon className="w-5 h-5" />
                    <span>Journalisation d'audit</span>
                  </div>
                  <div className="badge badge-success">Activé</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <LockClosedIcon className="w-5 h-5" />
                    <span>Limitation tentatives</span>
                  </div>
                  <div className="badge badge-success">5 max</div>
                </div>
              </div>
            </div>
          </div>

          {/* Alertes récentes */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Alertes récentes</h3>
              <div className="space-y-3">
                {securityAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-base-200 rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{alert.title}</span>
                        {getAlertBadge(alert.type)}
                        {alert.resolved && <div className="badge badge-success badge-sm">Résolu</div>}
                      </div>
                      <p className="text-sm text-base-content/70">{alert.description}</p>
                      <div className="text-xs text-base-content/50 mt-1">
                        {alert.source} • {alert.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Toutes les alertes de sécurité</h3>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="card bg-base-200 shadow">
                    <div className="card-body p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{alert.title}</h4>
                              {getAlertBadge(alert.type)}
                              {alert.resolved && <div className="badge badge-success badge-sm">Résolu</div>}
                            </div>
                            <p className="text-sm text-base-content/70 mb-2">
                              {alert.description}
                            </p>
                            <div className="text-xs text-base-content/50">
                              {alert.source} • {alert.timestamp}
                            </div>
                          </div>
                        </div>
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                            ⋮
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Marquer résolu</a></li>
                            <li><a>Investiguer</a></li>
                            <li><a>Supprimer</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'access' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Tentatives de connexion récentes</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Adresse IP</th>
                      <th>Localisation</th>
                      <th>Appareil</th>
                      <th>Statut</th>
                      <th>Horodatage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginAttempts.map((attempt) => (
                      <tr key={attempt.id}>
                        <td className="font-medium">{attempt.email}</td>
                        <td className="font-mono text-sm">{attempt.ip}</td>
                        <td>{attempt.location}</td>
                        <td className="text-sm">{attempt.device}</td>
                        <td>
                          {attempt.success ? (
                            <div className="badge badge-success badge-sm">Réussi</div>
                          ) : (
                            <div className="badge badge-error badge-sm">Échec</div>
                          )}
                        </td>
                        <td className="text-sm text-base-content/60">
                          {attempt.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'config' && securityConfig && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Configuration de sécurité</h3>
              <div className="space-y-6">
                {/* Authentification */}
                <div>
                  <h4 className="font-semibold mb-4">Authentification</h4>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Authentification à deux facteurs</span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary" 
                          checked={securityConfig.twoFactorAuth}
                          onChange={(e) => updateSecurityConfig('twoFactorAuth', e.target.checked)}
                        />
                      </label>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Délai d'expiration de session (minutes)</span>
                      </label>
                      <input 
                        type="number" 
                        className="input input-bordered w-full max-w-xs" 
                        value={securityConfig.sessionTimeout}
                        onChange={(e) => updateSecurityConfig('sessionTimeout', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nombre maximum de tentatives de connexion</span>
                      </label>
                      <input 
                        type="number" 
                        className="input input-bordered w-full max-w-xs" 
                        value={securityConfig.maxLoginAttempts}
                        onChange={(e) => updateSecurityConfig('maxLoginAttempts', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                {/* Sécurité des mots de passe */}
                <div className="divider"></div>
                <div>
                  <h4 className="font-semibold mb-4">Mots de passe</h4>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Expiration des mots de passe (jours)</span>
                      </label>
                      <input 
                        type="number" 
                        className="input input-bordered w-full max-w-xs" 
                        value={securityConfig.passwordExpiry}
                        onChange={(e) => updateSecurityConfig('passwordExpiry', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>

                {/* Contrôle d'accès */}
                <div className="divider"></div>
                <div>
                  <h4 className="font-semibold mb-4">Contrôle d'accès</h4>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Liste blanche d'adresses IP</span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary" 
                          checked={securityConfig.ipWhitelist}
                          onChange={(e) => updateSecurityConfig('ipWhitelist', e.target.checked)}
                        />
                      </label>
                    </div>
                    
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Journalisation d'audit</span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary" 
                          checked={securityConfig.auditLogging}
                          onChange={(e) => updateSecurityConfig('auditLogging', e.target.checked)}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="divider"></div>
                <div className="flex gap-4">
                  <button className="btn btn-primary">
                    Sauvegarder les modifications
                  </button>
                  <button className="btn btn-outline">
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
