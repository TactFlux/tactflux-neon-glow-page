
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a component to handle external redirects properly
const ExternalRedirect = ({ to }: { to: string }) => {
  // Use useEffect to handle the redirection after component mount
  React.useEffect(() => {
    window.location.href = to;
  }, [to]);
  
  // Return loading state or null while redirecting
  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* External redirect handled with a dedicated component */}
          <Route path="/signup" element={<ExternalRedirect to="https://admin-app.tactflux.de/signup" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
