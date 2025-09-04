import { useEffect, useState } from 'react';
import { 
  EyeIcon, 
  EyeSlashIcon,
  LinkIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { DashboardCard } from '../components/ui/DashboardCard';

// Icônes Phosphor pour les liens sociaux
import { 
  EnvelopeSimple, 
  DiscordLogo, 
  Globe, 
  GithubLogo, 
  InstagramLogo,
  TwitterLogo, 
  LinkedinLogo, 
  YoutubeLogo, 
  TwitchLogo, 
  PaintBrush,
  GameController, 
  Heart, 
  Star, 
  BookOpen, 
  Code, 
  Camera, 
  MusicNote,
  Coffee, 
  Rocket, 
  Lightning, 
  Fire
} from '@phosphor-icons/react';

interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  isActive: boolean;
  position: number;
  clicks: number;
  icon: string;
}

interface LinkFormData {
  title: string;
  url: string;
  description: string;
  icon: string;
}

// Options d'icônes disponibles
const ICON_OPTIONS = [
  { name: 'Email', icon: EnvelopeSimple, value: 'EnvelopeSimple' },
  { name: 'Discord', icon: DiscordLogo, value: 'DiscordLogo' },
  { name: 'Site Web', icon: Globe, value: 'Globe' },
  { name: 'GitHub', icon: GithubLogo, value: 'GithubLogo' },
  { name: 'Instagram', icon: InstagramLogo, value: 'InstagramLogo' },
  { name: 'Twitter', icon: TwitterLogo, value: 'TwitterLogo' },
  { name: 'LinkedIn', icon: LinkedinLogo, value: 'LinkedinLogo' },
  { name: 'YouTube', icon: YoutubeLogo, value: 'YoutubeLogo' },
  { name: 'Twitch', icon: TwitchLogo, value: 'TwitchLogo' },
  { name: 'Art', icon: PaintBrush, value: 'PaintBrush' },
  { name: 'Gaming', icon: GameController, value: 'GameController' },
  { name: 'Favoris', icon: Heart, value: 'Heart' },
  { name: 'Star', icon: Star, value: 'Star' },
  { name: 'Blog', icon: BookOpen, value: 'BookOpen' },
  { name: 'Code', icon: Code, value: 'Code' },
  { name: 'Photo', icon: Camera, value: 'Camera' },
  { name: 'Music', icon: MusicNote, value: 'MusicNote' },
  { name: 'Coffee', icon: Coffee, value: 'Coffee' },
  { name: 'Rocket', icon: Rocket, value: 'Rocket' },
  { name: 'Lightning', icon: Lightning, value: 'Lightning' },
  { name: 'Fire', icon: Fire, value: 'Fire' },
];

// Fonction utilitaire pour obtenir le composant d'icône
const getIconComponent = (iconValue: string) => {
  const iconOption = ICON_OPTIONS.find(opt => opt.value === iconValue);
  return iconOption ? iconOption.icon : Globe;
};

export const LinksManager: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Site personnel',
      url: 'https://kaysuto.fr',
      description: 'Mon portfolio principal',
      isActive: true,
      position: 1,
      clicks: 156,
      icon: 'Globe'
    },
    {
      id: '2',
      title: 'GitHub',
      url: 'https://github.com/Kaysuto',
      description: 'Mes projets open source',
      isActive: true,
      position: 2,
      clicks: 89,
      icon: 'GithubLogo'
    },
    {
      id: '3',
      title: 'Discord',
      url: 'https://discord.gg/wJTfwPen',
      description: 'Rejoins mon serveur',
      isActive: true,
      position: 3,
      clicks: 234,
      icon: 'DiscordLogo'
    },
    {
      id: '4',
      title: 'Email',
      url: 'mailto:contact@kaysuto.fr',
      description: 'Me contacter directement',
      isActive: false,
      position: 4,
      clicks: 45,
      icon: 'EnvelopeSimple'
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    url: '',
    description: '',
    icon: 'Globe'
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Calculer les métriques
  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.isActive).length;
  const avgClicksPerLink = links.length > 0 ? Math.round(totalClicks / links.length) : 0;
  const activationRate = links.length > 0 ? Math.round((activeLinks / links.length) * 100) : 0;

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const openModal = (link?: Link) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        title: link.title,
        url: link.url,
        description: link.description || '',
        icon: link.icon
      });
    } else {
      setEditingLink(null);
      setFormData({
        title: '',
        url: '',
        description: '',
        icon: 'Globe'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
    setFormData({
      title: '',
      url: '',
      description: '',
      icon: 'Globe'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simuler un délai de traitement
    setTimeout(() => {
      if (editingLink) {
        // Modifier un lien existant
        setLinks(links.map(link => 
          link.id === editingLink.id 
            ? { ...link, ...formData }
            : link
        ));
        showToastMessage('Lien modifié avec succès');
      } else {
        // Créer un nouveau lien
        const newLink: Link = {
          id: Date.now().toString(),
          ...formData,
          isActive: true,
          position: links.length + 1,
          clicks: 0
        };
        setLinks([...links, newLink]);
        showToastMessage('Nouveau lien créé avec succès');
      }
      
      setLoading(false);
      closeModal();
    }, 500);
  };

  const toggleLinkStatus = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
    const link = links.find(l => l.id === id);
    showToastMessage(`Lien ${link?.isActive ? 'désactivé' : 'activé'}`);
  };

  const deleteLink = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lien ?')) {
      setLinks(links.filter(link => link.id !== id));
      showToastMessage('Lien supprimé avec succès');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToastMessage('URL copiée dans le presse-papiers');
  };

  return (
    <div className="space-y-6">
      {/* Header - Style identique au Dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Gestion des liens</h1>
          <p className="text-base-content/70 mt-1">
            Gérez vos liens sociaux et professionnels
          </p>
        </div>
        <button 
          onClick={() => openModal()}
          className="btn btn-primary"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Nouveau lien
        </button>
      </div>

      {/* Métriques principales - Style identique au Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total des liens"
          value={links.length}
          description="Liens configurés"
          icon={<LinkIcon className="w-6 h-6" />}
          trend="neutral"
        />
        
        <DashboardCard
          title="Liens actifs"
          value={activeLinks}
          description={`${links.length - activeLinks} inactifs`}
          icon={<EyeIcon className="w-6 h-6" />}
          trend={activeLinks > links.length / 2 ? "up" : "down"}
        />
        
        <DashboardCard
          title="Total des clics"
          value={totalClicks}
          description="Tous les liens confondus"
          icon={<DocumentDuplicateIcon className="w-6 h-6" />}
          trend="up"
        />
        
        <DashboardCard
          title="Taux d'activation"
          value={`${activationRate}%`}
          description={`Moyenne: ${avgClicksPerLink} clics/lien`}
          icon={<CheckIcon className="w-6 h-6" />}
          trend={activationRate > 75 ? "up" : activationRate > 50 ? "neutral" : "down"}
        />
      </div>

      {/* Tableau des liens - Style identique au Dashboard */}
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-header px-6 py-4 border-b border-base-300">
          <h2 className="text-lg font-semibold text-base-content">Liste des liens</h2>
        </div>
        
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="w-16">#</th>
                  <th>Lien</th>
                  <th className="hidden md:table-cell">URL</th>
                  <th className="w-24">Statut</th>
                  <th className="w-20">Clics</th>
                  <th className="w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links
                  .sort((a, b) => a.position - b.position)
                  .map((link) => {
                    const IconComponent = getIconComponent(link.icon);
                    return (
                      <tr key={link.id} className="hover:bg-base-200">
                        <td>
                          <span className="font-mono text-sm font-medium">
                            {link.position}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-base-content">
                                {link.title}
                              </div>
                              {link.description && (
                                <div className="text-sm text-base-content/70">
                                  {link.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell">
                          <code className="text-xs text-base-content/80 bg-base-200 px-2 py-1 rounded">
                            {link.url.length > 40 ? `${link.url.substring(0, 40)}...` : link.url}
                          </code>
                        </td>
                        <td>
                          {link.isActive ? (
                            <span className="badge badge-success badge-sm">
                              Actif
                            </span>
                          ) : (
                            <span className="badge badge-error badge-sm">
                              Inactif
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="font-mono text-sm font-medium">
                            {link.clicks.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center space-x-1">
                            <div className="tooltip" data-tip="Copier URL">
                              <button
                                onClick={() => copyToClipboard(link.url)}
                                className="btn btn-ghost btn-xs"
                              >
                                <DocumentDuplicateIcon className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="tooltip" data-tip={link.isActive ? 'Désactiver' : 'Activer'}>
                              <button
                                onClick={() => toggleLinkStatus(link.id)}
                                className={`btn btn-ghost btn-xs ${
                                  link.isActive ? 'text-success' : 'text-error'
                                }`}
                              >
                                {link.isActive ? (
                                  <EyeIcon className="w-4 h-4" />
                                ) : (
                                  <EyeSlashIcon className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            
                            <div className="tooltip" data-tip="Modifier">
                              <button
                                onClick={() => openModal(link)}
                                className="btn btn-ghost btn-xs"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="tooltip" data-tip="Supprimer">
                              <button
                                onClick={() => deleteLink(link.id)}
                                className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          
          {links.length === 0 && (
            <div className="text-center py-12">
              <LinkIcon className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-base-content/70 mb-2">
                Aucun lien configuré
              </h3>
              <p className="text-base-content/50 mb-4">
                Commencez par ajouter votre premier lien
              </p>
              <button 
                onClick={() => openModal()}
                className="btn btn-primary"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Créer le premier lien
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de création/édition */}
      {isModalOpen && (
        <>
          <input type="checkbox" id="link-modal" className="modal-toggle" checked={isModalOpen} readOnly />
          <div className="modal" role="dialog">
            <div className="modal-box w-11/12 max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-base-content">
                  {editingLink ? 'Modifier le lien' : 'Nouveau lien'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Titre *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input input-bordered w-full"
                      placeholder="Ex: Mon site web"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">URL *</span>
                    </label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="input input-bordered w-full"
                      placeholder="https://exemple.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Description</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="textarea textarea-bordered w-full"
                    placeholder="Description optionnelle du lien"
                    rows={3}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Icône</span>
                  </label>
                  <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto border border-base-300 rounded-lg p-4">
                    {ICON_OPTIONS.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <div
                          key={option.value}
                          className="tooltip"
                          data-tip={option.name}
                        >
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, icon: option.value })}
                            className={`btn btn-ghost btn-sm p-2 aspect-square ${
                              formData.icon === option.value
                                ? 'btn-primary'
                                : 'hover:bg-base-200'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="modal-action">
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    className="btn btn-ghost"
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                    ) : null}
                    {editingLink ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Toast de notification */}
      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
