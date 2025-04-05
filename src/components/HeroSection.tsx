
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20" id="hero">
      {/* Background glow effects */}
      <div className="hero-glow absolute top-1/4 left-1/4 bg-tactflux-neon opacity-20"></div>
      <div className="hero-glow absolute bottom-1/4 right-1/4 bg-tactflux-blue opacity-20"></div>
      <div className="hero-glow absolute top-1/2 right-1/3 bg-tactflux-purple opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-left mb-10 md:mb-0 md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              TactFlux – <span className="neon-text">Kreativität</span> neu definiert
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg">
              Das kreative Bewerberbewertungssystem für Unternehmen, die das Beste suchen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection('cta')}
                className="bg-tactflux-blue hover:bg-tactflux-blue/90 text-black font-medium text-lg px-6 py-6 neon-border animate-glow"
              >
                Jetzt starten <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('features')}
                className="text-tactflux-blue border-tactflux-blue/20 hover:bg-tactflux-blue/10 text-lg px-6 py-6"
              >
                Mehr erfahren
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-float">
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-tactflux-neon opacity-20 blur-xl"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-neon">78,3</div>
                  <div className="text-sm text-gray-400">Ø Creative Fit Score</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-blue">1.245</div>
                  <div className="text-sm text-gray-400">Bewerber Gesamt</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-purple">438</div>
                  <div className="text-sm text-gray-400">Tests diesen Monat</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-success">156K</div>
                  <div className="text-sm text-gray-400">Datenpunkte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
