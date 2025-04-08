
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-tactflux-dark/90 backdrop-blur-md shadow-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 animate-fade-in">
            <Logo />
          </div>
          
          <div className="hidden md:block">
            <nav className="flex space-x-6">
              {[
                { id: 'about-us', label: 'Über uns' },
                { id: 'features', label: 'API-Features' },
                { id: 'pricing', label: 'Preise' },
                { id: 'contact', label: 'Kontakt' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="text-white group relative py-2"
                >
                  <span className="group-hover:text-tactflux-blue transition-colors duration-300">{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-tactflux-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="hidden md:block">
            <Button 
              variant="tactflux" 
              onClick={() => scrollToSection('cta')} 
              className="shadow-lg text-white font-medium rounded-2xl group transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>API testen</span>
              <ChevronDown className="ml-2 transition-transform group-hover:translate-y-1" size={16} />
            </Button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white hover:text-tactflux-blue transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-tactflux-card/90 backdrop-blur-lg animate-slide-in-top border-b border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {[
              { id: 'about-us', label: 'Über uns' },
              { id: 'features', label: 'API-Features' },
              { id: 'pricing', label: 'Preise' },
              { id: 'contact', label: 'Kontakt' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="block w-full px-3 py-2 text-left text-white hover:text-tactflux-blue hover:bg-white/5 rounded-lg transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="tactflux" 
              className="w-full font-medium mt-4" 
              onClick={() => scrollToSection('cta')}
            >
              API testen
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
