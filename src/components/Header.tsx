
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { TactFluxLogo } from "./TactFluxLogo";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <TactFluxLogo className="h-8 w-auto" />
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link to="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link to="/features" className="transition-colors hover:text-foreground/80 hidden sm:block">
            Features
          </Link>
          <Link to="/pricing" className="transition-colors hover:text-foreground/80 hidden sm:block">
            Preise
          </Link>
          <Link to="/contact" className="transition-colors hover:text-foreground/80 hidden sm:block">
            Kontakt
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-2">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="tactflux">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => logout()}>Abmelden</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Anmelden</Button>
              </Link>
              <Link to="/signup">
                <Button variant="tactflux">Registrieren</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
