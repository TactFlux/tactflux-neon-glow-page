
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AdminSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin123!");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  // Fetch available companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data: companiesData, error } = await supabase
          .from("companies")
          .select("id, name")
          .order("name");

        if (error) {
          throw error;
        }

        if (companiesData) {
          setCompanies(companiesData);
          if (companiesData.length > 0) {
            setSelectedCompany(companiesData[0].id);
          }
        }
      } catch (error) {
        console.error("Fehler beim Laden der Unternehmen:", error);
        toast.error("Unternehmen konnten nicht geladen werden.");
      }
    };

    fetchCompanies();
  }, []);

  const setupAdminAccess = async () => {
    if (!selectedCompany || !email) {
      toast.error("Bitte wählen Sie ein Unternehmen und geben Sie eine E-Mail-Adresse ein.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Versuchen, einen neuen Benutzer zu erstellen (oder zu prüfen, ob er existiert)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password, // Verwenden des festgelegten Passworts
      });

      // Wenn der Benutzer bereits existiert, ist das kein Problem
      if (signUpError && !signUpError.message.includes("already")) {
        throw signUpError;
      }

      // 2. Anmelden als dieser Benutzer, um seine ID zu erhalten
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        // Wenn die Anmeldung fehlschlägt, zeigen wir eine hilfreiche Nachricht
        toast.error("Anmeldung fehlgeschlagen", {
          description: "Benutzer existiert möglicherweise bereits mit einem anderen Passwort."
        });
        // Dialog zum manuellen Login anzeigen
        setLoginEmail(email);
        setShowLoginDialog(true);
        setIsLoading(false);
        return;
      }

      const userId = signInData?.user?.id;
      
      if (!userId) {
        toast.error("Benutzer-ID konnte nicht ermittelt werden");
        setIsLoading(false);
        return;
      }

      // 3. Prüfen, ob bereits eine Rollenzuweisung existiert
      const { data: existingRole, error: roleCheckError } = await supabase
        .from("user_roles")
        .select("id")
        .eq("user_id", userId)
        .eq("company_id", selectedCompany)
        .maybeSingle();

      if (roleCheckError) {
        throw roleCheckError;
      }

      // 4. Rollenzuweisung aktualisieren oder erstellen
      if (existingRole) {
        const { error: updateError } = await supabase
          .from("user_roles")
          .update({ role: "admin" })
          .eq("id", existingRole.id);

        if (updateError) {
          throw updateError;
        }
      } else {
        // Neue Rollenzuweisung erstellen
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert({
            user_id: userId,
            company_id: selectedCompany,
            role: "admin"
          });

        if (insertError) {
          throw insertError;
        }
      }

      toast.success("Admin-Zugang erfolgreich eingerichtet!", {
        description: `Sie können sich jetzt als Administrator mit der E-Mail ${email} und dem Passwort "${password}" anmelden.`
      });

      // Zur Dashboard-Seite weiterleiten
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Fehler beim Einrichten des Admin-Zugangs:", error);
      toast.error("Fehler beim Einrichten des Admin-Zugangs", {
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualLogin = async () => {
    try {
      setIsLoading(true);
      
      // Anmelden mit den manuell eingegebenen Daten
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (signInError) {
        throw signInError;
      }

      const userId = signInData?.user?.id;

      if (!userId) {
        throw new Error("Benutzer-ID konnte nicht ermittelt werden");
      }

      // Rollenzuweisung erstellen oder aktualisieren
      const { data: existingRole } = await supabase
        .from("user_roles")
        .select("id")
        .eq("user_id", userId)
        .eq("company_id", selectedCompany)
        .maybeSingle();

      if (existingRole) {
        await supabase
          .from("user_roles")
          .update({ role: "admin" })
          .eq("id", existingRole.id);
      } else {
        await supabase
          .from("user_roles")
          .insert({
            user_id: userId,
            company_id: selectedCompany,
            role: "admin"
          });
      }

      toast.success("Admin-Rechte wurden erfolgreich zugewiesen!", {
        description: "Sie werden zum Dashboard weitergeleitet."
      });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Fehler beim manuellen Login:", error);
      toast.error("Anmeldung fehlgeschlagen", {
        description: error.message || "Bitte überprüfen Sie Ihre Anmeldedaten."
      });
    } finally {
      setIsLoading(false);
      setShowLoginDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-tactflux-dark text-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-md mx-auto bg-tactflux-card border border-tactflux-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Admin-Zugang einrichten</CardTitle>
            <CardDescription className="text-gray-300">
              Richten Sie einen Admin-Zugang für ein bestehendes Unternehmen ein.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                E-Mail-Adresse
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 border border-tactflux-border text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Passwort
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border border-tactflux-border text-white"
              />
              <p className="text-xs text-gray-400">
                Dieses Passwort wird für den Admin-Account verwendet.
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-white">
                Unternehmen
              </label>
              <select
                id="company"
                value={selectedCompany || ""}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-700 border border-tactflux-border text-white"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={setupAdminAccess}
              disabled={isLoading || !selectedCompany}
              className="w-full"
              variant="tactflux-gradient"
            >
              {isLoading ? "Wird eingerichtet..." : "Admin-Zugang einrichten"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Dialog für manuellen Login */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-tactflux-card border border-tactflux-border text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Manueller Login erforderlich</DialogTitle>
            <DialogDescription className="text-gray-300">
              Der Benutzer existiert bereits. Bitte geben Sie Ihre Login-Daten ein, um Admin-Rechte zuzuweisen.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-white">E-Mail</Label>
              <Input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-gray-700 border border-tactflux-border text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-white">Passwort</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-gray-700 border border-tactflux-border text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowLoginDialog(false)}
              className="bg-gray-700 text-white border-tactflux-border hover:bg-gray-600"
            >
              Abbrechen
            </Button>
            <Button 
              onClick={handleManualLogin} 
              disabled={isLoading}
              variant="tactflux-gradient"
            >
              {isLoading ? "Verarbeite..." : "Anmelden"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSetup;
