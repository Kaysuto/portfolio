import { useState } from 'react';
import { 
  CogIcon,
  UserIcon,
  BellIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ServerIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  timezone: string;
  language: string;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  securityAlerts: boolean;
  maintenanceAlerts: boolean;
  analyticsReports: boolean;
}

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'security' | 'backup'>('general');
  const [savedMessage, setSavedMessage] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: 'Kimiya Portfolio',
    siteDescription: 'Portfolio personnel et professionnel',
    contactEmail: 'kimiya@example.com',
    timezone: 'Europe/Paris',
    language: 'fr'
  });

  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    theme: 'auto',
    primaryColor: '#3B82F6',
    fontSize: 'medium',
    animations: true
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    securityAlerts: true,
    maintenanceAlerts: false,
    analyticsReports: true
  });

  const handleSave = () => {
    // Simulation de sauvegarde
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
            <CogIcon className="w-8 h-8" />
            Paramètres
          </h1>
          <p className="text-base-content/70 mt-1">
            Configuration générale de l'application admin
          </p>
        </div>
        
        {savedMessage && (
          <div className="alert alert-success shadow-lg w-auto">
            <CheckIcon className="w-6 h-6" />
            <span>Paramètres sauvegardés avec succès !</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation latérale */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <ul className="menu menu-vertical w-full">
                <li>
                  <button
                    className={`w-full justify-start ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                  >
                    <CogIcon className="w-4 h-4" />
                    Général
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full justify-start ${activeTab === 'appearance' ? 'active' : ''}`}
                    onClick={() => setActiveTab('appearance')}
                  >
                    <PaintBrushIcon className="w-4 h-4" />
                    Apparence
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full justify-start ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full justify-start ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                  >
                    <ShieldCheckIcon className="w-4 h-4" />
                    Sécurité
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full justify-start ${activeTab === 'backup' ? 'active' : ''}`}
                    onClick={() => setActiveTab('backup')}
                  >
                    <ServerIcon className="w-4 h-4" />
                    Sauvegarde
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Onglet Général */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Paramètres généraux</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Nom du site</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered" 
                        value={generalSettings.siteName}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          siteName: e.target.value
                        })}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email de contact</span>
                      </label>
                      <input 
                        type="email" 
                        className="input input-bordered" 
                        value={generalSettings.contactEmail}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          contactEmail: e.target.value
                        })}
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Description du site</span>
                    </label>
                    <textarea 
                      className="textarea textarea-bordered h-24"
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings({
                        ...generalSettings,
                        siteDescription: e.target.value
                      })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Fuseau horaire</span>
                      </label>
                      <select 
                        className="select select-bordered"
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          timezone: e.target.value
                        })}
                      >
                        <option value="Europe/Paris">Europe/Paris</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Langue</span>
                      </label>
                      <select 
                        className="select select-bordered"
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings({
                          ...generalSettings,
                          language: e.target.value
                        })}
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Apparence */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Apparence</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Thème</span>
                      </label>
                      <select 
                        className="select select-bordered"
                        value={appearanceSettings.theme}
                        onChange={(e) => setAppearanceSettings({
                          ...appearanceSettings,
                          theme: e.target.value as 'light' | 'dark' | 'auto'
                        })}
                      >
                        <option value="auto">Automatique</option>
                        <option value="light">Clair</option>
                        <option value="dark">Sombre</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Taille de police</span>
                      </label>
                      <select 
                        className="select select-bordered"
                        value={appearanceSettings.fontSize}
                        onChange={(e) => setAppearanceSettings({
                          ...appearanceSettings,
                          fontSize: e.target.value as 'small' | 'medium' | 'large'
                        })}
                      >
                        <option value="small">Petite</option>
                        <option value="medium">Moyenne</option>
                        <option value="large">Grande</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Couleur principale</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        className="w-16 h-10 border border-base-300 rounded-lg cursor-pointer"
                        value={appearanceSettings.primaryColor}
                        onChange={(e) => setAppearanceSettings({
                          ...appearanceSettings,
                          primaryColor: e.target.value
                        })}
                      />
                      <span className="text-sm text-base-content/70">
                        {appearanceSettings.primaryColor}
                      </span>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Activer les animations</span>
                      <input 
                        type="checkbox" 
                        className="toggle toggle-primary"
                        checked={appearanceSettings.animations}
                        onChange={(e) => setAppearanceSettings({
                          ...appearanceSettings,
                          animations: e.target.checked
                        })}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Onglet Notifications */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Notifications</h2>
                  
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Notifications par email</span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: e.target.checked
                          })}
                        />
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Alertes de sécurité</span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary"
                          checked={notificationSettings.securityAlerts}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            securityAlerts: e.target.checked
                          })}
                        />
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Alertes de maintenance</span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary"
                          checked={notificationSettings.maintenanceAlerts}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            maintenanceAlerts: e.target.checked
                          })}
                        />
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Rapports analytics</span>
                        <input 
                          type="checkbox" 
                          className="toggle toggle-primary"
                          checked={notificationSettings.analyticsReports}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            analyticsReports: e.target.checked
                          })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Sécurité */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Sécurité</h2>
                  
                  <div className="alert alert-info">
                    <span>Les paramètres de sécurité avancés sont disponibles dans la section Sécurité dédiée.</span>
                  </div>

                  <div className="space-y-4">
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h3 className="card-title text-lg">Changer le mot de passe</h3>
                        <div className="space-y-4">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Mot de passe actuel</span>
                            </label>
                            <input type="password" className="input input-bordered" />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Nouveau mot de passe</span>
                            </label>
                            <input type="password" className="input input-bordered" />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Confirmer le nouveau mot de passe</span>
                            </label>
                            <input type="password" className="input input-bordered" />
                          </div>
                          <button className="btn btn-primary">
                            Changer le mot de passe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Sauvegarde */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Sauvegarde et restauration</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h3 className="card-title text-lg">Sauvegarde manuelle</h3>
                        <p className="text-sm text-base-content/70 mb-4">
                          Créer une sauvegarde complète de vos données
                        </p>
                        <button className="btn btn-primary">
                          <ArrowPathIcon className="w-4 h-4" />
                          Créer une sauvegarde
                        </button>
                      </div>
                    </div>

                    <div className="card bg-base-200">
                      <div className="card-body">
                        <h3 className="card-title text-lg">Restaurer</h3>
                        <p className="text-sm text-base-content/70 mb-4">
                          Restaurer à partir d'une sauvegarde
                        </p>
                        <button className="btn btn-outline">
                          <DocumentTextIcon className="w-4 h-4" />
                          Choisir un fichier
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                      <h3 className="card-title text-lg">Sauvegarde automatique</h3>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">Activer la sauvegarde automatique</span>
                          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Fréquence</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs">
                          <option>Quotidienne</option>
                          <option>Hebdomadaire</option>
                          <option>Mensuelle</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
              <div className="divider"></div>
              <div className="flex justify-end gap-4">
                <button className="btn btn-outline">
                  Annuler
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Sauvegarder les modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
