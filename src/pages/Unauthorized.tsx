
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-tactflux-dark text-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-tactflux-card border border-tactflux-border rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">Zugriff verweigert</h1>
          <p className="mb-6">Sie haben keine Berechtigung, auf diese Seite zuzugreifen.</p>
          <div className="flex justify-center space-x-4">
            <Button variant="tactflux" onClick={() => navigate('/')}>
              Zur Startseite
            </Button>
            <Button variant="outline" onClick={() => navigate('/login')}>
              Anmelden
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
