
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

type Company = {
  id: string;
  name: string;
  industry: string;
  size: string;
  email: string;
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

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-tactflux-dark text-white">
        <header className="p-6 border-b border-tactflux-border">
          <h1 className="text-2xl font-bold">
            Admin Dashboard {isSuperAdmin && <span className="text-red-400 ml-2">(Superadmin)</span>}
          </h1>
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-tactflux-card p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Übersicht</h2>
              <p className="mb-2">Willkommen im Admin-Dashboard.</p>
              {isSuperAdmin && (
                <p className="text-red-400 font-medium">
                  Sie haben Superadmin-Rechte und können auf alle Firmendaten zugreifen.
                </p>
              )}
            </div>
            
            {isSuperAdmin && (
              <div className="bg-tactflux-card p-6 rounded-lg shadow-md lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Alle Firmen</h2>
                {loading ? (
                  <p>Lade Firmendaten...</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {companies.map((company) => (
                      <Card key={company.id} className="bg-tactflux-dark border-tactflux-border">
                        <CardHeader>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-300">Branche: {company.industry}</p>
                          <p className="text-sm text-gray-300">Größe: {company.size}</p>
                          <p className="text-sm text-gray-300">E-Mail: {company.email}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
