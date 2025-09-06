import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Wrench, CheckCircle, XCircle } from '@phosphor-icons/react';
import { Switch } from '../../components/ui/switch'; // Assurez-vous que ce composant est disponible

import { getMaintenanceStatus, setMaintenanceStatus } from '../../admin/services/maintenanceService';

// Type pour la configuration de maintenance
interface MaintenanceConfig {
  is_enabled: boolean;
  message?: string;
  estimated_time?: string;
}

export default function Maintenance() {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: setMaintenanceStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenanceStatus'] });
    },
  });

  const handleToggleMaintenance = () => {
    if (maintenanceStatus) {
      mutation.mutate(!maintenanceStatus.is_enabled);
    }
  };
  
  const handleSave = () => {
    // La logique de sauvegarde pour le message et le temps estimé sera ajoutée ici
    console.log('Sauvegarde des autres configurations...');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-7xl mx-auto h-full">
        <div className="text-center mb-8 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Mode</span>
            <br />
            <span className="text-accent">Maintenance</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Gestion du mode maintenance du site
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Statut maintenance</h2>
              <p className="text-muted-foreground">
                {maintenanceStatus?.is_enabled ? 'Site en maintenance' : 'Site opérationnel'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {maintenanceStatus?.is_enabled ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span className={`font-medium ${maintenanceStatus?.is_enabled ? 'text-red-500' : 'text-green-500'}`}>
                  {maintenanceStatus?.is_enabled ? 'Maintenance' : 'En ligne'}
                </span>
              </div>
              <Switch
                checked={maintenanceStatus?.is_enabled ?? false}
                onCheckedChange={handleToggleMaintenance}
                disabled={mutation.isPending}
              />
            </div>
          </div>

          {mutation.error && (
            <div className="bg-red-2 border border-red-6 rounded-lg p-4 dark:bg-red-3 dark:border-red-7">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-9" />
                <span className="text-red-11">{mutation.error.message}</span>
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Configuration de la maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="message">Message d'affichage</Label>
                <Input
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Le site est temporairement en maintenance..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_time">Temps estimé de retour</Label>
                <Input
                  id="estimated_time"
                  value={formData.estimated_time}
                  onChange={(e) => setFormData({ ...formData, estimated_time: e.target.value })}
                  placeholder="2 heures, demain matin, etc."
                />
              </div>

              <Button onClick={handleSave} disabled={mutation.isPending} className="w-full">
                {mutation.isPending ? 'Sauvegarde...' : 'Sauvegarder la configuration'}
              </Button>
            </CardContent>
          </Card>

          {maintenanceStatus?.is_enabled && (
            <Card className="border-orange-6 bg-orange-2 dark:bg-orange-3 dark:border-orange-7">
              <CardHeader>
                <CardTitle className="text-orange-11 dark:text-orange-11">Aperçu de la page de maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 space-y-4">
                  <Wrench className="h-16 w-16 mx-auto text-orange-9" />
                  <h2 className="text-2xl font-bold text-orange-11">Site en maintenance</h2>
                  {formData.message && (
                    <p className="text-orange-11">{formData.message}</p>
                  )}
                  {formData.estimated_time && (
                    <p className="text-orange-11 opacity-80">
                      Retour prévu : {formData.estimated_time}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}