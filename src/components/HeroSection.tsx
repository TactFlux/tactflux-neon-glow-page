
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
              Deine Talente. <span className="neon-text">Deine Bühne.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg">
              Zeige, was in dir steckt – jenseits von Lebenslauf und Zeugnissen. TactFlux revolutioniert, wie du im Bewerbungsprozess glänzen kannst.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection('cta')}
                variant="tactflux-static"
                className="text-lg px-6 py-2 hover:scale-105 active:scale-95 transition-transform duration-300"
              >
                Mehr erfahren <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('features')}
                className="text-tactflux-blue border-tactflux-blue/20 hover:bg-tactflux-blue/10 text-lg px-6 py-2 hover:scale-105 active:scale-95 transition-transform duration-300"
              >
                Wie es funktioniert
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-float">
            <div className="glass-card p-6 relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-tactflux-neon opacity-20 blur-xl"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-neon">96%</div>
                  <div className="text-sm text-gray-400">Positive Bewerber-Erfahrung</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-blue">8.500+</div>
                  <div className="text-sm text-gray-400">Bewerber entdeckt</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-purple">78%</div>
                  <div className="text-sm text-gray-400">Höhere Bewerber-Zufriedenheit</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-tactflux-success">100%</div>
                  <div className="text-sm text-gray-400">Chancengleichheit</div>
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
