import { useState, useEffect } from 'react';
import { 
  WrenchIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  CpuChipIcon,
  ServerIcon,
  CloudIcon,
  CircleStackIcon,
  BeakerIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface SystemStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  lastCheck: string;
  details: string;
  uptime?: string;
}

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  dueDate: string;
  estimatedDuration: string;
}

export const MaintenancePage: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'status' | 'tasks' | 'logs'>('status');

  useEffect(() => {
    const loadMaintenanceData = async () => {
      try {
        // Simulation des données de maintenance
        const mockSystemStatus: SystemStatus[] = [
          {
            name: 'Serveur Web',
            status: 'healthy',
            lastCheck: '2024-01-15 14:30:00',
            details: 'Fonctionnement normal',
            uptime: '99.9%'
          },
          {
            name: 'Base de données',
            status: 'healthy',
            lastCheck: '2024-01-15 14:29:45',
            details: 'Connexions: 23/100, Latence: 12ms',
            uptime: '99.8%'
          },
          {
            name: 'CDN',
            status: 'warning',
            lastCheck: '2024-01-15 14:25:12',
            details: 'Latence élevée détectée sur certains nodes',
            uptime: '98.5%'
          },
          {
            name: 'Service de cache',
            status: 'healthy',
            lastCheck: '2024-01-15 14:30:15',
            details: 'Taux de hit: 94.2%',
            uptime: '99.9%'
          },
          {
            name: 'Monitoring',
            status: 'healthy',
            lastCheck: '2024-01-15 14:30:30',
            details: 'Toutes les métriques collectées',
            uptime: '100%'
          }
        ];

        const mockMaintenanceTasks: MaintenanceTask[] = [
          {
            id: '1',
            title: 'Mise à jour sécurité serveur',
            description: 'Application des derniers correctifs de sécurité sur le serveur principal',
            priority: 'high',
            status: 'pending',
            assignedTo: 'DevOps Team',
            dueDate: '2024-01-20',
            estimatedDuration: '2h'
          },
          {
            id: '2',
            title: 'Optimisation base de données',
            description: 'Nettoyage des logs anciens et optimisation des index',
            priority: 'medium',
            status: 'in-progress',
            assignedTo: 'DBA Team',
            dueDate: '2024-01-18',
            estimatedDuration: '4h'
          },
          {
            id: '3',
            title: 'Sauvegarde complète',
            description: 'Sauvegarde complète du système et test de restauration',
            priority: 'high',
            status: 'completed',
            assignedTo: 'Backup Team',
            dueDate: '2024-01-15',
            estimatedDuration: '6h'
          },
          {
            id: '4',
            title: 'Audit de sécurité',
            description: 'Audit complet de la sécurité du système et des accès',
            priority: 'critical',
            status: 'pending',
            assignedTo: 'Security Team',
            dueDate: '2024-01-22',
            estimatedDuration: '8h'
          }
        ];

        setSystemStatus(mockSystemStatus);
        setMaintenanceTasks(mockMaintenanceTasks);
      } catch (error) {
        console.error('Erreur chargement données maintenance:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaintenanceData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon className="w-5 h-5 text-success" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-warning" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-error" />;
      default:
        return <ClockIcon className="w-5 h-5 text-base-content/50" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <div className="badge badge-success badge-sm">Sain</div>;
      case 'warning':
        return <div className="badge badge-warning badge-sm">Alerte</div>;
      case 'error':
        return <div className="badge badge-error badge-sm">Erreur</div>;
      default:
        return <div className="badge badge-ghost badge-sm">Inconnu</div>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <div className="badge badge-error badge-sm">Critique</div>;
      case 'high':
        return <div className="badge badge-warning badge-sm">Haute</div>;
      case 'medium':
        return <div className="badge badge-info badge-sm">Moyenne</div>;
      case 'low':
        return <div className="badge badge-ghost badge-sm">Basse</div>;
      default:
        return <div className="badge badge-ghost badge-sm">-</div>;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <div className="badge badge-success badge-sm">Terminé</div>;
      case 'in-progress':
        return <div className="badge badge-primary badge-sm">En cours</div>;
      case 'pending':
        return <div className="badge badge-warning badge-sm">En attente</div>;
      default:
        return <div className="badge badge-ghost badge-sm">-</div>;
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
            <WrenchIcon className="w-8 h-8" />
            Maintenance
          </h1>
          <p className="text-base-content/70 mt-1">
            Gestion de la maintenance système et des tâches
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
          className={`tab ${activeTab === 'status' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          <ServerIcon className="w-4 h-4 mr-2" />
          État du système
        </button>
        <button 
          className={`tab ${activeTab === 'tasks' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <WrenchIcon className="w-4 h-4 mr-2" />
          Tâches de maintenance
        </button>
        <button 
          className={`tab ${activeTab === 'logs' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <DocumentTextIcon className="w-4 h-4 mr-2" />
          Logs système
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          {/* Vue d'ensemble du système */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-success">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Services actifs</div>
                <div className="stat-value text-success">4/5</div>
                <div className="stat-desc">1 alerte</div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <CpuChipIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">CPU moyen</div>
                <div className="stat-value">23%</div>
                <div className="stat-desc">↗︎ +2% (1h)</div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-info">
                  <CircleStackIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Mémoire</div>
                <div className="stat-value">67%</div>
                <div className="stat-desc">5.4GB / 8GB</div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-warning">
                  <CloudIcon className="w-8 h-8" />
                </div>
                <div className="stat-title">Stockage</div>
                <div className="stat-value">45%</div>
                <div className="stat-desc">180GB / 400GB</div>
              </div>
            </div>
          </div>

          {/* État détaillé des services */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">État des services</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>État</th>
                      <th>Dernière vérification</th>
                      <th>Détails</th>
                      <th>Uptime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemStatus.map((service, index) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(service.status)}
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </td>
                        <td>{getStatusBadge(service.status)}</td>
                        <td className="text-sm text-base-content/60">
                          {service.lastCheck}
                        </td>
                        <td className="text-sm">{service.details}</td>
                        <td>
                          <div className="badge badge-outline badge-sm">
                            {service.uptime}
                          </div>
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

      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Résumé des tâches */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Total</div>
                <div className="stat-value">{maintenanceTasks.length}</div>
                <div className="stat-desc">Tâches de maintenance</div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">En attente</div>
                <div className="stat-value text-warning">
                  {maintenanceTasks.filter(t => t.status === 'pending').length}
                </div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">En cours</div>
                <div className="stat-value text-primary">
                  {maintenanceTasks.filter(t => t.status === 'in-progress').length}
                </div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Terminées</div>
                <div className="stat-value text-success">
                  {maintenanceTasks.filter(t => t.status === 'completed').length}
                </div>
              </div>
            </div>
          </div>

          {/* Liste des tâches */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h3 className="card-title">Tâches de maintenance</h3>
                <button className="btn btn-primary btn-sm">
                  <WrenchIcon className="w-4 h-4" />
                  Nouvelle tâche
                </button>
              </div>
              
              <div className="space-y-4">
                {maintenanceTasks.map((task) => (
                  <div key={task.id} className="card bg-base-200 shadow">
                    <div className="card-body p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{task.title}</h4>
                            {getPriorityBadge(task.priority)}
                            {getTaskStatusBadge(task.status)}
                          </div>
                          <p className="text-sm text-base-content/70 mb-3">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-base-content/60">
                            <span>Assigné à: {task.assignedTo}</span>
                            <span>Échéance: {task.dueDate}</span>
                            <span>Durée estimée: {task.estimatedDuration}</span>
                          </div>
                        </div>
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                            ⋮
                          </div>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Modifier</a></li>
                            <li><a>Marquer terminé</a></li>
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

      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">Logs système récents</h3>
              <div className="mockup-code">
                <pre data-prefix="[2024-01-15 14:30:15]"><code>INFO: Service web démarré avec succès</code></pre>
                <pre data-prefix="[2024-01-15 14:29:45]"><code>INFO: Connexion base de données établie</code></pre>
                <pre data-prefix="[2024-01-15 14:25:12]" className="text-warning"><code>WARN: Latence élevée détectée sur CDN node eu-west-1</code></pre>
                <pre data-prefix="[2024-01-15 14:20:03]"><code>INFO: Sauvegarde automatique terminée</code></pre>
                <pre data-prefix="[2024-01-15 14:15:21]"><code>INFO: Nettoyage des logs temporaires effectué</code></pre>
                <pre data-prefix="[2024-01-15 14:10:55]"><code>INFO: Vérification de sécurité planifiée</code></pre>
                <pre data-prefix="[2024-01-15 14:05:33]"><code>INFO: Mise à jour système appliquée</code></pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
