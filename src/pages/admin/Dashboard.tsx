
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import FeatureGate from '@/components/FeatureGate';
import { FileTextIcon, FileSpreadsheetIcon, KeyIcon, BarChart4Icon } from 'lucide-react';

type Company = {
  id: string;
  name: string;
  industry: string;
  size: string;
  email: string;
  plan: string;
};

const AdminDashboard = () => {
  const { isSuperAdmin, companyInfo } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // If user is superadmin, fetch all companies
    if (isSuperAdmin) {
      const fetchAllCompanies = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('companies')
            .select('*')
            .order('name');
            
          if (error) {
            throw error;
          }
          
          setCompanies(data || []);
        } catch (error) {
          console.error('Fehler beim Abrufen der Firmendaten:', error);
          toast.error('Fehler beim Laden der Firmendaten');
        } finally {
          setLoading(false);
        }
      };
      
      fetchAllCompanies();
    }
  }, [isSuperAdmin]);

  const handleExportCSV = () => {
    toast.success('CSV-Export gestartet');
  };

  const handleExportPDF = () => {
    toast.success('PDF-Export gestartet');
  };

  const handleGenerateAPIKey = () => {
    toast.success('API-Key generiert');
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-tactflux-dark text-white">
        <header className="p-6 border-b border-tactflux-border">
          <h1 className="text-2xl font-bold">
            Admin Dashboard {isSuperAdmin && <span className="text-red-400 ml-2">(Superadmin)</span>}
          </h1>
          {companyInfo && (
            <div className="mt-1 text-sm text-gray-300">
              Plan: <span className="font-medium text-tactflux-blue">{companyInfo.plan}</span>
            </div>
          )}
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-tactflux-card p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart4Icon className="mr-2 h-5 w-5" />
                Dashboard Übersicht
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-tactflux-dark border-tactflux-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Aktive Nutzer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">42</p>
                  </CardContent>
                </Card>
                
                <FeatureGate feature="advanced-stats">
                  <Card className="bg-tactflux-dark border-tactflux-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">24.8%</p>
                    </CardContent>
                  </Card>
                </FeatureGate>
                
                <FeatureGate feature="advanced-stats">
                  <Card className="bg-tactflux-dark border-tactflux-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Durchschn. Zeit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">5.2m</p>
                    </CardContent>
                  </Card>
                </FeatureGate>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Button variant="outline">Aktualisieren</Button>
                
                <FeatureGate 
                  feature="export-csv" 
                  fallback={
                    <Button variant="outline" disabled className="opacity-50">
                      <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
                      CSV Export
                    </Button>
                  }
                >
                  <Button variant="outline" onClick={handleExportCSV}>
                    <FileSpreadsheetIcon className="mr-2 h-4 w-4" />
                    CSV Export
                  </Button>
                </FeatureGate>
                
                <FeatureGate 
                  feature="export-pdf" 
                  fallback={
                    <Button variant="outline" disabled className="opacity-50">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      PDF Export
                    </Button>
                  }
                >
                  <Button variant="outline" onClick={handleExportPDF}>
                    <FileTextIcon className="mr-2 h-4 w-4" />
                    PDF Export
                  </Button>
                </FeatureGate>
              </div>
              
              <FeatureGate feature="api-access">
                <Card className="bg-tactflux-dark border-tactflux-border mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <KeyIcon className="mr-2 h-5 w-5" />
                      API Zugang
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-gray-300 mb-2">
                        Generieren Sie API-Keys für den Zugriff auf Ihre Daten über die API.
                      </p>
                      <Button onClick={handleGenerateAPIKey}>API-Key generieren</Button>
                    </div>
                  </CardContent>
                </Card>
              </FeatureGate>
            </div>
            
            {isSuperAdmin && (
              <div className="bg-tactflux-card p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Alle Firmen</h2>
                {loading ? (
                  <p>Lade Firmendaten...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Branche</TableHead>
                        <TableHead>Größe</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>{company.industry}</TableCell>
                          <TableCell>{company.size}</TableCell>
                          <TableCell>{company.email}</TableCell>
                          <TableCell>
                            <Badge className={
                              company.plan === 'enterprise' ? 'bg-purple-500' : 
                              company.plan === 'pro' ? 'bg-blue-500' : 
                              'bg-gray-500'
                            }>
                              {company.plan}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}

            <FeatureGate feature="custom-reports">
              <div className="bg-tactflux-card p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Benutzerdefinierte Berichte</h2>
                <p className="text-sm text-gray-300 mb-4">
                  Erstellen Sie benutzerdefinierte Berichte mit erweiterten Filteroptionen und Datenvisualisierungen.
                </p>
                <Button variant="tactflux">Bericht erstellen</Button>
              </div>
            </FeatureGate>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
