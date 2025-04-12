
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

type FeatureGateProps = {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  hideAlert?: boolean;
};

const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  children, 
  fallback,
  hideAlert = false 
}) => {
  const { canAccessFeature, companyInfo, userRole } = useAuth();
  const hasAccess = canAccessFeature(feature);
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  if (hideAlert) {
    return null;
  }
  
  // Display which plan is needed for this feature
  const planInfo: Record<string, { name: string, color: string }> = {
    'export-csv': { name: 'Pro', color: 'bg-blue-500' },
    'export-pdf': { name: 'Pro', color: 'bg-blue-500' },
    'advanced-stats': { name: 'Pro', color: 'bg-blue-500' },
    'api-access': { name: 'Enterprise', color: 'bg-purple-500' },
    'api-keys': { name: 'Enterprise', color: 'bg-purple-500' },
    'custom-reports': { name: 'Enterprise', color: 'bg-purple-500' }
  };
  
  const planDetail = planInfo[feature] || { name: 'Pro oder Enterprise', color: 'bg-blue-500' };
  
  return (
    <Alert className="bg-tactflux-card border-tactflux-border shadow-md">
      <InfoIcon className="h-4 w-4 text-tactflux-blue" />
      <AlertTitle className="flex items-center gap-2">
        Feature nicht verfügbar
        <Badge className={planDetail.color}>{planDetail.name}</Badge>
      </AlertTitle>
      <AlertDescription className="text-sm text-gray-300 mt-2">
        Diese Funktion ist nur mit dem {planDetail.name}-Plan verfügbar.
        {companyInfo?.plan && <span> Ihr aktueller Plan: <Badge>{companyInfo.plan}</Badge></span>}
        {userRole?.role !== 'admin' && (
          <p className="mt-1">Kontaktieren Sie Ihren Administrator für Zugang oder ein Upgrade.</p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default FeatureGate;
