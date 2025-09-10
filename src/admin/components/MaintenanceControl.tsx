import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Wrench, CheckCircle, XCircle, Gear } from '@phosphor-icons/react';
import { getMaintenanceStatus, setMaintenanceStatus } from '../services/maintenanceService';
import { MaintenanceConfig } from '../types/admin';

interface MaintenanceControlProps {
  className?: string;
}

export const MaintenanceControl: React.FC<MaintenanceControlProps> = ({ className = '' }) => {
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [formData, setFormData] = React.useState({
    message: '',
    estimated_time: '',
  });

  const {
    data: maintenanceStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['maintenanceStatus'],
    queryFn: getMaintenanceStatus,
  });

  React.useEffect(() => {
    if (maintenanceStatus) {
      setFormData({
        message: maintenanceStatus.message || '',
        estimated_time: maintenanceStatus.estimated_time || '',
      });
    }
  }, [maintenanceStatus]);

  const mutation = useMutation({
    mutationFn: (config: MaintenanceConfig) => setMaintenanceStatus(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceStatus'] });
    },
  });

  const handleToggleMaintenance = () => {
    if (maintenanceStatus) {
      const newStatus = !maintenanceStatus.is_enabled;
      mutation.mutate({
        is_enabled: newStatus,
        message: formData.message,
        estimated_time: formData.estimated_time,
        id: '1',
        updated_at: new Date().toISOString()
      });
    }
  };
  
  const handleSave = () => {
    if (maintenanceStatus) {
      mutation.mutate({
        is_enabled: maintenanceStatus.is_enabled,
        message: formData.message,
        estimated_time: formData.estimated_time,
        id: '1',
        updated_at: new Date().toISOString()
      });
    }
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-6">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-500">
            <XCircle className="h-5 w-5" />
            <span>Erreur: {error.message}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      {/* Status Card */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/80 flex items-center justify-center">
                <Wrench size={20} className="text-[#231813] dark:text-[#231813]" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Mode Maintenance</h3>
                <p className="text-sm text-muted-foreground">
                  {maintenanceStatus?.is_enabled ? 'Site en maintenance' : 'Site opérationnel'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {maintenanceStatus?.is_enabled ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span className={`font-medium text-sm ${maintenanceStatus?.is_enabled ? 'text-red-500' : 'text-green-500'}`}>
                  {maintenanceStatus?.is_enabled ? 'Hors ligne' : 'En ligne'}
                </span>
              </div>
              <Switch
                checked={maintenanceStatus?.is_enabled ?? false}
                onCheckedChange={handleToggleMaintenance}
                disabled={mutation.isPending}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2"
              >
                <Gear size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          </div>

          {mutation.error && (
            <div className="mt-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700 dark:text-red-300">{mutation.error.message}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration Panel */}
      {isExpanded && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Gear className="h-5 w-5" />
              Configuration de la maintenance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maintenance-message" className="text-sm">Message d'affichage</Label>
              <Input
                id="maintenance-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Le site est temporairement en maintenance..."
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenance-time" className="text-sm">Temps estimé de retour</Label>
              <Input
                id="maintenance-time"
                value={formData.estimated_time}
                onChange={(e) => setFormData({ ...formData, estimated_time: e.target.value })}
                placeholder="2 heures, demain matin, etc."
                className="text-sm"
              />
            </div>

            <Button 
              onClick={handleSave} 
              disabled={mutation.isPending} 
              className="w-full bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813]"
              size="sm"
            >
              {mutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      {maintenanceStatus?.is_enabled && (
        <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/50">
          <CardHeader>
            <CardTitle className="text-orange-700 dark:text-orange-300 text-base">
              Aperçu de la page de maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 space-y-3">
              <Wrench className="h-12 w-12 mx-auto text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                Site en maintenance
              </h3>
              {maintenanceStatus?.message && (
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {maintenanceStatus.message}
                </p>
              )}
              {maintenanceStatus?.estimated_time && (
                <p className="text-xs text-orange-500 dark:text-orange-500">
                  Retour prévu : {maintenanceStatus.estimated_time}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
