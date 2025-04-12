
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "sonner";

const AdminSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [email, setEmail] = useState("liam.ts@icloud.com");
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
      // Prüfen, ob der Benutzer existiert
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      let userId = userData?.user?.id;

      // Wenn kein Benutzer angemeldet ist, nach dem Benutzer in der auth.users-Tabelle suchen
      if (!userId) {
        const { data: authUser, error: authUserError } = await supabase
          .from("auth.users")
          .select("id")
          .eq("email", email)
          .single();

        if (authUserError) {
          // Benutzer existiert nicht, wir müssen dich informieren
          toast.error("Benutzer existiert nicht. Bitte registrieren Sie sich zuerst.", {
            description: "Nutzen Sie die Registrierungsseite, um einen Account anzulegen."
          });
          setIsLoading(false);
          return;
        }

        if (authUser) {
          userId = authUser.id;
        }
      }

      // Prüfen, ob bereits eine Rollenzuweisung für diesen Benutzer existiert
      const { data: existingRole, error: roleCheckError } = await supabase
        .from("user_roles")
        .select("id")
        .eq("user_id", userId)
        .eq("company_id", selectedCompany)
        .maybeSingle();

      if (roleCheckError) {
        throw roleCheckError;
      }

      // Wenn bereits eine Rollenzuweisung existiert, diese aktualisieren
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
        description: "Sie können sich jetzt als Administrator anmelden."
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
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-tactflux-input border border-tactflux-border text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-white">
                Unternehmen
              </label>
              <select
                id="company"
                value={selectedCompany || ""}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full p-2 rounded-md bg-tactflux-input border border-tactflux-border text-white"
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
    </div>
  );
};

export default AdminSetup;
