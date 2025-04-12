
import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

type PlanFeature = {
  name: string;
  free: boolean;
  pro: boolean;
  enterprise: boolean;
}

const planFeatures: PlanFeature[] = [
  { name: 'Dashboard-Basis', free: true, pro: true, enterprise: true },
  { name: 'PDF-Export', free: false, pro: true, enterprise: true },
  { name: 'CSV-Export', free: false, pro: true, enterprise: true },
  { name: 'Detailstatistiken', free: false, pro: true, enterprise: true },
  { name: 'API-Zugang', free: false, pro: false, enterprise: true },
  { name: 'Auto-Reports', free: false, pro: false, enterprise: true },
  { name: 'API-Keys', free: false, pro: false, enterprise: true },
  { name: 'SLA-Support', free: false, pro: false, enterprise: true },
];

const planColors = {
  free: 'bg-gray-500',
  pro: 'bg-blue-500',
  enterprise: 'bg-purple-500'
};

const planPrices = {
  free: '0€',
  pro: '49€',
  enterprise: '199€'
};

const Billing = () => {
  const { companyInfo, refreshCompanyInfo, userRole } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const currentPlan = companyInfo?.plan || 'free';
  const isAdmin = userRole?.role === 'admin';

  const handleUpgrade = async (newPlan: string) => {
    if (!isAdmin) {
      toast.error('Nur Administratoren können den Tarif ändern');
      return;
    }
    
    if (!companyInfo?.id) {
      toast.error('Unternehmensinformationen nicht gefunden');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('companies')
        .update({ plan: newPlan })
        .eq('id', companyInfo.id);
      
      if (error) {
        throw error;
      }
      
      await refreshCompanyInfo();
      toast.success(`Plan erfolgreich auf ${newPlan.toUpperCase()} aktualisiert`);
    } catch (error) {
      console.error('Fehler beim Upgrade:', error);
      toast.error('Fehler beim Upgrade des Plans');
    } finally {
      setLoading(false);
    }
  };

  // Determine which plans can be upgraded to
  const canUpgradeToPro = currentPlan === 'free';
  const canUpgradeToEnterprise = currentPlan === 'free' || currentPlan === 'pro';

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-tactflux-dark text-white">
        <header className="p-6 border-b border-tactflux-border">
          <h1 className="text-2xl font-bold">Abonnement & Tarife</h1>
          <p className="text-sm text-gray-300 mt-1">
            Verwalten Sie Ihren Unternehmenstarif und Abonnementdetails
          </p>
        </header>

        <main className="p-6">
          {!isAdmin && (
            <Alert className="mb-6 bg-tactflux-card border-amber-500">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription>
                Nur Administratoren können den Tarif ändern.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Aktueller Tarif</h2>
            <Card className="bg-tactflux-card border-tactflux-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {companyInfo?.name}
                  <Badge className={planColors[currentPlan as keyof typeof planColors]}>
                    {currentPlan.toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Monatlicher Preis: <span className="font-semibold">{planPrices[currentPlan as keyof typeof planPrices]}</span> / Monat</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold mb-4">Verfügbare Tarife</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Free Plan */}
            <Card className={`bg-tactflux-card border-tactflux-border ${currentPlan === 'free' ? 'ring-2 ring-gray-500' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>FREE</span>
                  <Badge className="bg-gray-500">Kostenlos</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">{planPrices.free}<span className="text-sm font-normal">/Monat</span></p>
                <ul className="space-y-3 mb-6">
                  {planFeatures.map((feature) => (
                    <li key={feature.name} className="flex items-center">
                      {feature.free ? (
                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="mr-2 h-5 w-5 text-red-500" />
                      )}
                      <span className={!feature.free ? 'text-gray-500' : ''}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                {currentPlan === 'free' ? (
                  <Button variant="outline" disabled className="w-full">Aktueller Tarif</Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleUpgrade('free')}
                    disabled={loading || !isAdmin}
                  >
                    Downgrade auf FREE
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className={`bg-tactflux-card border-tactflux-border ${currentPlan === 'pro' ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>PRO</span>
                  <Badge className="bg-blue-500">Professionell</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">{planPrices.pro}<span className="text-sm font-normal">/Monat</span></p>
                <ul className="space-y-3 mb-6">
                  {planFeatures.map((feature) => (
                    <li key={feature.name} className="flex items-center">
                      {feature.pro ? (
                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="mr-2 h-5 w-5 text-red-500" />
                      )}
                      <span className={!feature.pro ? 'text-gray-500' : ''}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                {currentPlan === 'pro' ? (
                  <Button variant="outline" disabled className="w-full">Aktueller Tarif</Button>
                ) : canUpgradeToPro ? (
                  <Button 
                    variant="tactflux-gradient" 
                    className="w-full"
                    onClick={() => handleUpgrade('pro')}
                    disabled={loading || !isAdmin}
                  >
                    Upgrade auf PRO
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleUpgrade('pro')}
                    disabled={loading || !isAdmin}
                  >
                    Downgrade auf PRO
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className={`bg-tactflux-card border-tactflux-border ${currentPlan === 'enterprise' ? 'ring-2 ring-purple-500' : ''}`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>ENTERPRISE</span>
                  <Badge className="bg-purple-500">Enterprise</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">{planPrices.enterprise}<span className="text-sm font-normal">/Monat</span></p>
                <ul className="space-y-3 mb-6">
                  {planFeatures.map((feature) => (
                    <li key={feature.name} className="flex items-center">
                      {feature.enterprise ? (
                        <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="mr-2 h-5 w-5 text-red-500" />
                      )}
                      <span className={!feature.enterprise ? 'text-gray-500' : ''}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
                {currentPlan === 'enterprise' ? (
                  <Button variant="outline" disabled className="w-full">Aktueller Tarif</Button>
                ) : (
                  <Button 
                    variant="tactflux-gradient"
                    className="w-full"
                    onClick={() => handleUpgrade('enterprise')}
                    disabled={loading || !isAdmin}
                  >
                    Upgrade auf ENTERPRISE
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Feature-Vergleich</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-tactflux-card border-tactflux-border rounded-md">
                <thead>
                  <tr className="border-b border-tactflux-border">
                    <th className="p-3 text-left">Feature</th>
                    <th className="p-3 text-center">FREE</th>
                    <th className="p-3 text-center">PRO</th>
                    <th className="p-3 text-center">ENTERPRISE</th>
                  </tr>
                </thead>
                <tbody>
                  {planFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-tactflux-border">
                      <td className="p-3">{feature.name}</td>
                      <td className="p-3 text-center">
                        {feature.free ? (
                          <CheckCircle2 className="inline h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="inline h-5 w-5 text-red-500" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {feature.pro ? (
                          <CheckCircle2 className="inline h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="inline h-5 w-5 text-red-500" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {feature.enterprise ? (
                          <CheckCircle2 className="inline h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="inline h-5 w-5 text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Billing;
