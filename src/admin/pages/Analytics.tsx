import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ChartBar, 
  GoogleLogo, 
  Tag, 
  Code, 
  CheckCircle,
  XCircle,
  Globe,
  Copy
} from '@phosphor-icons/react';

interface GoogleAnalyticsConfig {
  ga4_measurement_id: string;
  gtm_container_id: string;
  is_ga_enabled: boolean;
  is_gtm_enabled: boolean;
}

// Service pour Google Analytics
const GoogleAnalyticsService = {
  getConfig: async (): Promise<GoogleAnalyticsConfig> => {
    // Simulation - remplacer par votre API
    return {
      ga4_measurement_id: localStorage.getItem('ga4_measurement_id') || '',
      gtm_container_id: localStorage.getItem('gtm_container_id') || '',
      is_ga_enabled: localStorage.getItem('is_ga_enabled') === 'true',
      is_gtm_enabled: localStorage.getItem('is_gtm_enabled') === 'true'
    };
  },
  
  updateConfig: async (config: GoogleAnalyticsConfig): Promise<void> => {
    // Sauvegarde temporaire en localStorage
    localStorage.setItem('ga4_measurement_id', config.ga4_measurement_id);
    localStorage.setItem('gtm_container_id', config.gtm_container_id);
    localStorage.setItem('is_ga_enabled', config.is_ga_enabled.toString());
    localStorage.setItem('is_gtm_enabled', config.is_gtm_enabled.toString());
    
    console.log('Config sauvegardée:', config);
  },
  
  testConnection: async (measurementId: string): Promise<boolean> => {
    // Simulation du test de connexion
    return measurementId.startsWith('G-') && measurementId.length > 10;
  }
};

function Analytics() {
  const [config, setConfig] = useState<GoogleAnalyticsConfig>({
    ga4_measurement_id: '',
    gtm_container_id: '',
    is_ga_enabled: false,
    is_gtm_enabled: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<{
    ga: boolean | null;
    gtm: boolean | null;
  }>({ ga: null, gtm: null });

  const loadConfig = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await GoogleAnalyticsService.getConfig();
      setConfig(data);
    } catch (err) {
      console.error('Erreur chargement config:', err);
      setError('Erreur lors du chargement de la configuration');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await GoogleAnalyticsService.updateConfig(config);
      
      // Test des connexions si les services sont activés
      if (config.is_ga_enabled && config.ga4_measurement_id) {
        const gaStatus = await GoogleAnalyticsService.testConnection(config.ga4_measurement_id);
        setConnectionStatus(prev => ({ ...prev, ga: gaStatus }));
      }
      
      if (config.is_gtm_enabled && config.gtm_container_id) {
        const gtmStatus = config.gtm_container_id.startsWith('GTM-');
        setConnectionStatus(prev => ({ ...prev, gtm: gtmStatus }));
      }
      
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      setError('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestGA = async () => {
    if (!config.ga4_measurement_id) return;
    
    try {
      const status = await GoogleAnalyticsService.testConnection(config.ga4_measurement_id);
      setConnectionStatus(prev => ({ ...prev, ga: status }));
    } catch (err) {
      setConnectionStatus(prev => ({ ...prev, ga: false }));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateGAScript = () => {
    if (!config.ga4_measurement_id) return '';
    
    return `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${config.ga4_measurement_id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${config.ga4_measurement_id}');
</script>`;
  };

  const generateGTMScript = () => {
    if (!config.gtm_container_id) return '';
    
    return `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${config.gtm_container_id}');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config.gtm_container_id}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="max-w-6xl mx-auto h-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Analytics</span>
            <br />
            <span className="text-accent">Configuration</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Configuration Google Analytics et Tag Manager
          </p>
        </div>

        <div className="space-y-6">
          {error && (
            <div className="bg-red-2 border border-red-6 rounded-lg p-4 dark:bg-red-3 dark:border-red-7">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-9" />
                <span className="text-red-11">{error}</span>
              </div>
            </div>
          )}

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GoogleLogo className="h-5 w-5 text-blue-500" />
                  Google Analytics 4
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-background/40 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Statut</p>
                    <div className="flex items-center gap-2 mt-1">
                      {config.is_ga_enabled ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="default" className="bg-green-2 text-green-11 border-green-6">
                            Activé
                          </Badge>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-gray-500" />
                          <Badge variant="secondary">Désactivé</Badge>
                        </>
                      )}
                    </div>
                  </div>
                  {connectionStatus.ga !== null && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Connexion</p>
                      <div className="flex items-center gap-1 mt-1">
                        {connectionStatus.ga ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">
                          {connectionStatus.ga ? 'OK' : 'Erreur'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-purple-500" />
                  Google Tag Manager
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-background/40 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Statut</p>
                    <div className="flex items-center gap-2 mt-1">
                      {config.is_gtm_enabled ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge variant="default" className="bg-green-2 text-green-11 border-green-6">
                            Activé
                          </Badge>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-gray-500" />
                          <Badge variant="secondary">Désactivé</Badge>
                        </>
                      )}
                    </div>
                  </div>
                  {connectionStatus.gtm !== null && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Configuration</p>
                      <div className="flex items-center gap-1 mt-1">
                        {connectionStatus.gtm ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">
                          {connectionStatus.gtm ? 'Valide' : 'Invalide'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration */}
          <Card className="bg-background/40 backdrop-blur-md border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Configuration des services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Analytics 4 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ga-toggle" className="text-base font-medium">
                    Google Analytics 4
                  </Label>
                  <Switch
                    checked={config.is_ga_enabled}
                    onCheckedChange={(checked) => setConfig({ ...config, is_ga_enabled: checked })}
                    aria-label="Activer Google Analytics 4"
                  />
                </div>
                
                {config.is_ga_enabled && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="ga-id">Measurement ID</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="ga-id"
                          value={config.ga4_measurement_id}
                          onChange={(e) => 
                            setConfig({ ...config, ga4_measurement_id: e.target.value })
                          }
                          placeholder="G-XXXXXXXXXX"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleTestGA}
                          disabled={!config.ga4_measurement_id}
                        >
                          Tester
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Format: G-XXXXXXXXXX (trouvable dans Google Analytics)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Tag Manager */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gtm-toggle" className="text-base font-medium">
                    Google Tag Manager
                  </Label>
                  <Switch
                    checked={config.is_gtm_enabled}
                    onCheckedChange={(checked) => setConfig({ ...config, is_gtm_enabled: checked })}
                    aria-label="Activer Google Tag Manager"
                  />
                </div>
                
                {config.is_gtm_enabled && (
                  <div>
                    <Label htmlFor="gtm-id">Container ID</Label>
                    <Input
                      id="gtm-id"
                      value={config.gtm_container_id}
                      onChange={(e) => 
                        setConfig({ ...config, gtm_container_id: e.target.value })
                      }
                      placeholder="GTM-XXXXXXX"
                      className="mt-1"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Format: GTM-XXXXXXX (trouvable dans Google Tag Manager)
                    </p>
                  </div>
                )}
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="w-full">
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder la configuration'}
              </Button>
            </CardContent>
          </Card>

          {/* Code Generation */}
          {(config.is_ga_enabled || config.is_gtm_enabled) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Code d'intégration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {config.is_ga_enabled && config.ga4_measurement_id && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Code Google Analytics 4</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateGAScript())}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copier
                      </Button>
                    </div>
                    <pre className="bg-accent-2 border border-accent-6 rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{generateGAScript()}</code>
                    </pre>
                    <p className="text-sm text-muted-foreground">
                      À placer dans le &lt;head&gt; de votre site
                    </p>
                  </div>
                )}

                {config.is_gtm_enabled && config.gtm_container_id && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Code Google Tag Manager</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateGTMScript())}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copier
                      </Button>
                    </div>
                    <pre className="bg-accent-2 border border-accent-6 rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{generateGTMScript()}</code>
                    </pre>
                    <p className="text-sm text-muted-foreground">
                      Le premier script dans le &lt;head&gt;, le second juste après &lt;body&gt;
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
export { Analytics };
export default Analytics;
