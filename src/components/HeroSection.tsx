
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCountAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);
  
  const startCountAnimation = () => {
    const elements = document.querySelectorAll('.count-animation');
    elements.forEach((el) => {
      const target = parseInt(el.textContent || '0', 10);
      animateCount(el as HTMLElement, 0, target, 2000);
    });
  };
  
  const animateCount = (el: HTMLElement, start: number, end: number, duration: number) => {
    let startTime: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.textContent = value.toString();
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end.toString();
      }
    };
    
    window.requestAnimationFrame(step);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16" id="hero">
      {/* Dynamic background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-tactflux-dark to-black opacity-80"></div>
      <div className="hero-glow absolute top-1/4 left-1/4 bg-tactflux-neon opacity-20 animate-pulse-slow"></div>
      <div className="hero-glow absolute bottom-1/4 right-1/4 bg-tactflux-blue opacity-20 animate-pulse-slow"></div>
      <div className="hero-glow absolute top-1/2 right-1/3 bg-tactflux-purple opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left mb-10 md:mb-0 md:w-1/2 animate-fade-in">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-tactflux-neon/30">
              <span className="text-tactflux-neon text-sm font-medium">API-Lösung für Recruiting</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Faire Chancen für <span className="neon-text relative inline-block">Talente
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tactflux-neon via-tactflux-purple to-tactflux-blue"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Integrieren Sie unsere API und revolutionieren Sie Ihr HR-System mit interaktiven Tests, die das volle Potential Ihrer Bewerber zeigen.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection('features')}
                variant="tactflux-static"
                className="text-base px-6 py-2 hover:scale-105 active:scale-95 transition-transform duration-300 group"
              >
                API entdecken <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => scrollToSection('pricing')}
                className="text-tactflux-blue border-tactflux-blue/20 hover:bg-tactflux-blue/10 text-base px-6 py-2 hover:scale-105 active:scale-95 transition-transform duration-300"
              >
                Preise ansehen
              </Button>
            </div>
            
            <div className="flex items-center mt-8 space-x-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${
                      ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500'][i]
                    }`}
                  >
                    <span className="text-xs font-bold text-white">{String.fromCharCode(65 + i)}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-400">Bereits von <span className="text-white font-medium">150+ Unternehmen</span> genutzt</span>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-float">
            <div className="glass-card p-6 relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-tactflux-blue/20 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-tactflux-neon/20 blur-xl"></div>
              
              <div className="grid grid-cols-2 gap-4" ref={statsRef}>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center transform transition-transform hover:scale-105 duration-300">
                  <div className="text-3xl font-bold text-tactflux-neon count-animation">96</div>
                  <div className="text-sm text-gray-400">% positive Kandidaten-<br/>erfahrung</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center transform transition-transform hover:scale-105 duration-300">
                  <div className="text-3xl font-bold text-tactflux-blue count-animation">42</div>
                  <div className="text-sm text-gray-400">% kürzere<br/>Einstellungszeit</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center transform transition-transform hover:scale-105 duration-300">
                  <div className="text-3xl font-bold text-tactflux-purple count-animation">78</div>
                  <div className="text-sm text-gray-400">% Steigerung der<br/>Employer Brand</div>
                </div>
                <div className="glass-card p-4 h-32 flex flex-col justify-center items-center transform transition-transform hover:scale-105 duration-300">
                  <div className="text-3xl font-bold text-tactflux-success count-animation">3</div>
                  <div className="text-3xl font-bold text-tactflux-success">x</div>
                  <div className="text-sm text-gray-400">bessere Kandidaten-<br/>passung</div>
                </div>
              </div>
              
              <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-tactflux-blue/20 flex items-center justify-center mr-2">
                    <Code size={16} className="text-tactflux-blue" />
                  </div>
                  <span className="text-xs text-gray-300">API-First Design</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-tactflux-neon/20 flex items-center justify-center mr-2">
                    <Users size={16} className="text-tactflux-neon" />
                  </div>
                  <span className="text-xs text-gray-300">Bewerber-fokussiert</span>
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
