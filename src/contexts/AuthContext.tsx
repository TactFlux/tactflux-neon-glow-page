
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

type CompanyInfo = {
  id: string;
  name: string;
  industry: string;
  size: string;
  email: string;
  website?: string | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  companyInfo: CompanyInfo | null;
  loading: boolean;
  refreshCompanyInfo: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  companyInfo: null,
  loading: true,
  refreshCompanyInfo: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCompanyInfo = async (userId: string) => {
    try {
      // Hole die Benutzerrolle und die zugehörige Company ID
      const { data: userRole, error: roleError } = await supabase
        .from("user_roles")
        .select("company_id")
        .eq("user_id", userId)
        .single();

      if (roleError) {
        console.error("Fehler beim Abrufen der Benutzerrolle:", roleError);
        return;
      }

      if (!userRole?.company_id) {
        console.error("Keine Firma mit diesem Benutzer verknüpft");
        return;
      }

      // Hole die Firmendaten
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("*")
        .eq("id", userRole.company_id)
        .single();

      if (companyError) {
        console.error("Fehler beim Abrufen der Firmendaten:", companyError);
        return;
      }

      setCompanyInfo(company as CompanyInfo);
    } catch (error) {
      console.error("Fehler beim Abrufen der Firmendaten:", error);
    }
  };

  const refreshCompanyInfo = async () => {
    if (user?.id) {
      await fetchCompanyInfo(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchCompanyInfo(session.user.id);
          }, 0);
        } else {
          setCompanyInfo(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchCompanyInfo(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, companyInfo, loading, refreshCompanyInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
