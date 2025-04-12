import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type CompanyInfo = {
  id: string;
  name: string;
  industry: string;
  size: string;
  email: string;
  website?: string | null;
};

// Update the AppRole type to explicitly include "superadmin"
type AppRole = "user" | "admin" | "member" | "superadmin";

type UserRole = {
  role: AppRole;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  companyInfo: CompanyInfo | null;
  userRole: UserRole | null;
  loading: boolean;
  refreshCompanyInfo: () => Promise<void>;
  checkAdminStatus: (userId: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isSuperAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  companyInfo: null,
  userRole: null,
  loading: true,
  refreshCompanyInfo: async () => {},
  checkAdminStatus: async () => false,
  logout: async () => {},
  isSuperAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

  const fetchCompanyInfo = async (userId: string) => {
    try {
      const { data: userRole, error: roleError } = await supabase
        .from("user_roles")
        .select("company_id, role")
        .eq("user_id", userId)
        .single();

      if (roleError) {
        console.error("Fehler beim Abrufen der Benutzerrolle:", roleError);
        return;
      }

      const userRoleValue = userRole?.role as AppRole;
      if (userRoleValue === "superadmin") {
        setIsSuperAdmin(true);
        setUserRole({ role: "superadmin" });
        
        const { data: companies, error: companiesError } = await supabase
          .from("companies")
          .select("*")
          .limit(1)
          .single();
          
        if (companiesError) {
          console.error("Fehler beim Abrufen der Firmendaten für Superadmin:", companiesError);
          return;
        }
        
        setCompanyInfo(companies as CompanyInfo);
        return;
      }
      
      setIsSuperAdmin(false);

      if (!userRole?.company_id) {
        console.error("Keine Firma mit diesem Benutzer verknüpft");
        return;
      }

      setUserRole({ role: userRole.role as AppRole });

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

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .in("role", ["admin", "superadmin"])
        .maybeSingle();

      if (error) {
        console.error("Fehler bei der Überprüfung des Admin-Status:", error);
        return false;
      }

      const roleValue = data?.role as string;
      return roleValue === "admin" || roleValue === "superadmin";
    } catch (error) {
      console.error("Fehler bei der Überprüfung des Admin-Status:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setCompanyInfo(null);
      setUserRole(null);
      setIsSuperAdmin(false);
      
      // We don't need to clear session and user as onAuthStateChange will handle that
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Fehler beim Abmelden");
    }
  };

  useEffect(() => {
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
          setUserRole(null);
          setIsSuperAdmin(false);
        }
      }
    );

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
    <AuthContext.Provider value={{ 
      session, 
      user, 
      companyInfo, 
      userRole,
      loading, 
      refreshCompanyInfo, 
      checkAdminStatus,
      logout,
      isSuperAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
