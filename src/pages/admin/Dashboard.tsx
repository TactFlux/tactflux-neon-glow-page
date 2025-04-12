
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { User, Clock, Users, Key } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ApiKey {
  id: string;
  api_key: string;
  created_at: string;
  last_used_at: string | null;
  description: string | null;
}

interface ReportRecipient {
  id: string;
  email: string;
  company_name: string | null;
  active: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, companyInfo, loading } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [recipients, setRecipients] = useState<ReportRecipient[]>([]);
  const [stats, setStats] = useState({
    totalTests: 0,
    completedTests: 0,
    sentReports: 0
  });
  const [loadingData, setLoadingData] = useState(true);
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signup");
    }
  }, [loading, user, navigate]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !companyInfo) return;
      
      try {
        setLoadingData(true);
        
        // Hole die API-Keys dieses Unternehmens
        const { data: userRoles } = await supabase
          .from("user_roles")
          .select("user_id")
          .eq("company_id", companyInfo.id);
        
        if (userRoles && userRoles.length > 0) {
          const userIds = userRoles.map(role => role.user_id);
          
          // API-Keys für alle Benutzer im Unternehmen
          const { data: keys } = await supabase
            .from("api_keys")
            .select("*")
            .in("user_id", userIds);
          
          setApiKeys(keys || []);
          
          // Report Empfänger für das Unternehmen
          const { data: reportRecipients } = await supabase
            .from("report_recipients")
            .select("*")
            .in("user_id", userIds);
          
          setRecipients(reportRecipients || []);
          
          // Statistiken 
          const { data: logs } = await supabase
            .from("report_delivery_logs")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(10);
          
          if (logs && logs.length > 0) {
            const totalTests = logs.reduce((sum, log) => sum + log.tests_count, 0);
            const completedTests = logs.reduce((sum, log) => sum + log.completed_tests_count, 0);
            const sentReports = logs.reduce((sum, log) => sum + log.recipients_count, 0);
            
            setStats({
              totalTests,
              completedTests,
              sentReports
            });
          }
        }
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      } finally {
        setLoadingData(false);
      }
    };
    
    fetchData();
  }, [user, companyInfo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <Skeleton className="h-12 w-1/3 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">
              {companyInfo ? `Willkommen, ${companyInfo.name}` : 'Admin Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              Hier finden Sie eine Übersicht aller Aktivitäten und Ressourcen Ihrer Organisation.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Statistik-Karten */}
            <Card className="bg-card text-foreground border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tests</CardTitle>
                <Users className="h-4 w-4 text-tactflux-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingData ? <Skeleton className="h-8 w-16" /> : stats.totalTests}</div>
                <p className="text-xs text-muted-foreground">
                  {loadingData ? <Skeleton className="h-4 w-24" /> : `${stats.completedTests} abgeschlossen`}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card text-foreground border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Berichte</CardTitle>
                <Clock className="h-4 w-4 text-tactflux-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingData ? <Skeleton className="h-8 w-16" /> : stats.sentReports}</div>
                <p className="text-xs text-muted-foreground">
                  {loadingData ? <Skeleton className="h-4 w-24" /> : `${recipients.length} Empfänger`}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card text-foreground border border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">API-Keys</CardTitle>
                <Key className="h-4 w-4 text-tactflux-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loadingData ? <Skeleton className="h-8 w-16" /> : apiKeys.length}</div>
                <p className="text-xs text-muted-foreground">
                  {loadingData ? <Skeleton className="h-4 w-24" /> : `Aktive API-Schlüssel`}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* API Keys Tabelle */}
          <Card className="mb-8 bg-card text-foreground border border-border">
            <CardHeader>
              <CardTitle>API-Schlüssel</CardTitle>
              <CardDescription className="text-muted-foreground">Verwalten Sie Ihre API-Schlüssel für den Zugriff auf die TactFlux API.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">Beschreibung</TableHead>
                      <TableHead className="text-foreground">Erstellt am</TableHead>
                      <TableHead className="text-foreground">Zuletzt verwendet</TableHead>
                      <TableHead className="text-foreground">Schlüssel (teilweise)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          Keine API-Schlüssel gefunden
                        </TableCell>
                      </TableRow>
                    ) : (
                      apiKeys.map((key) => (
                        <TableRow key={key.id}>
                          <TableCell className="text-foreground">{key.description || 'Kein Titel'}</TableCell>
                          <TableCell className="text-foreground">{new Date(key.created_at).toLocaleDateString('de-DE')}</TableCell>
                          <TableCell className="text-foreground">
                            {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString('de-DE') : 'Noch nicht verwendet'}
                          </TableCell>
                          <TableCell className="text-foreground">
                            {key.api_key.substring(0, 8)}...
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
                Neuen API-Schlüssel erstellen
              </Button>
            </CardFooter>
          </Card>

          {/* Report-Empfänger Tabelle */}
          <Card className="bg-card text-foreground border border-border">
            <CardHeader>
              <CardTitle>Report-Empfänger</CardTitle>
              <CardDescription className="text-muted-foreground">Personen, die Berichte von TactFlux erhalten.</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground">E-Mail</TableHead>
                      <TableHead className="text-foreground">Firma</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          Keine Empfänger gefunden
                        </TableCell>
                      </TableRow>
                    ) : (
                      recipients.map((recipient) => (
                        <TableRow key={recipient.id}>
                          <TableCell className="text-foreground">{recipient.email}</TableCell>
                          <TableCell className="text-foreground">{recipient.company_name || 'Nicht angegeben'}</TableCell>
                          <TableCell className="text-foreground">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${recipient.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {recipient.active ? 'Aktiv' : 'Inaktiv'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
                Empfänger hinzufügen
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
