import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  Gear,
  User,
  Shield,
  Database,
  Bell,
  Palette,
  Globe,
  FloppyDisk,
  Info,
  Warning,
  CheckCircle
} from '@phosphor-icons/react';

// Import des nouveaux composants admin
import {
  GlassCard,
  adminDesignTokens
} from '../components';

export default function Settings() {
  const [settings, setSettings] = useState({
    // Profil
    displayName: 'Kimiya',
    email: 'admin@portfolio.com',
    bio: 'Développeur Full-Stack passionné',
    
    // Sécurité
    twoFactorEnabled: false,
    sessionTimeout: 60,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    
    // Portfolio
    maintenanceMode: false,
    publicAnalytics: false,
    allowComments: true,
    
    // Performance
    cacheEnabled: true,
    compressionEnabled: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Status bar */}
      {lastSaved && (
        <div className="bg-green-2 border border-green-6 rounded-lg p-4 dark:bg-green-3 dark:border-green-7">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-9" />
            <span className="text-green-11">Dernière sauvegarde : {lastSaved.toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Profil utilisateur */}
        {/* Profil */}
        <GlassCard
          title=""
          delay={100}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sm font-medium">
                  Nom d'affichage
                </Label>
                <Input
                  id="displayName"
                  value={settings.displayName}
                  onChange={(e) => handleSettingChange('displayName', e.target.value)}
                  placeholder="Votre nom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange('email', e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio" className="text-sm font-medium">
                  Biographie
                </Label>
                <textarea
                  id="bio"
                  rows={3}
                  value={settings.bio}
                  onChange={(e) => handleSettingChange('bio', e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Décrivez-vous en quelques mots..."
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Sécurité */}
        <GlassCard
          title=""
          delay={200}
        >
          <div className="space-y-8">

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Authentification à deux facteurs
                </Label>
                <p className="text-sm text-muted-foreground">
                  Sécurisez votre compte avec 2FA
                </p>
              </div>
              <Switch
                checked={settings.twoFactorEnabled}
                onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="sessionTimeout" className="text-sm font-medium">
                Délai d'expiration de session (minutes)
              </Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="15"
                max="480"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="h-12"
              />
            </div>

            <div className="pt-4">
              <Button variant="outline" size="sm" className="w-full h-12 border-accent/20 hover:bg-accent/10">
                Changer le mot de passe
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Notifications */}
        <GlassCard
          title=""
          delay={300}
        >
          <div className="space-y-8">

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Notifications par email
                </Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les mises à jour par email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Notifications push
                </Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir les notifications push
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
          </div>
        </GlassCard>

        {/* Portfolio */}
        <GlassCard
          title=""
          delay={400}
        >
          <div className="space-y-8">

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Mode maintenance
                </Label>
                <p className="text-sm text-muted-foreground">
                  Désactiver temporairement le site
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
                {settings.maintenanceMode && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    Actif
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Analytics publiques
                </Label>
                <p className="text-sm text-muted-foreground">
                  Afficher les statistiques publiquement
                </p>
              </div>
              <Switch
                checked={settings.publicAnalytics}
                onCheckedChange={(checked) => handleSettingChange('publicAnalytics', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Autoriser les commentaires
                </Label>
                <p className="text-sm text-muted-foreground">
                  Permettre les commentaires sur les projets
                </p>
              </div>
              <Switch
                checked={settings.allowComments}
                onCheckedChange={(checked) => handleSettingChange('allowComments', checked)}
              />
            </div>
          </div>
        </GlassCard>

        {/* Performance */}
        <GlassCard
          title=""
          delay={500}
          className="lg:col-span-2"
        >
          <div className="space-y-6">

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Cache activé
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Améliore la vitesse de chargement
                  </p>
                </div>
                <Switch
                  checked={settings.cacheEnabled}
                  onCheckedChange={(checked) => handleSettingChange('cacheEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Compression GZIP
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Réduit la taille des fichiers
                  </p>
                </div>
                <Switch
                  checked={settings.compressionEnabled}
                  onCheckedChange={(checked) => handleSettingChange('compressionEnabled', checked)}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sauvegarde...
            </>
          ) : (
            <>
              <FloppyDisk className="h-4 w-4 mr-2" />
              Sauvegarder
            </>
          )}
        </Button>
      </div>
        </div>
      </div>
    </div>
  );
}