import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
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
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-tactflux-dark bg-opacity-90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          <div className="hidden md:block">
            <nav className="flex space-x-10">
              <button onClick={() => scrollToSection('about-us')} className="text-white hover:text-tactflux-blue transition-colors">
                Über uns
              </button>
              <button onClick={() => scrollToSection('features')} className="text-white hover:text-tactflux-blue transition-colors">
                Überblick
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-white hover:text-tactflux-blue transition-colors">
                Abo-Preise
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-tactflux-blue transition-colors">
                Kontakt
              </button>
            </nav>
          </div>
          
          <div className="hidden md:block">
            <Button variant="tactflux" onClick={() => scrollToSection('cta')} className="shadow-lg text-white font-medium rounded-2xl">
              Jetzt starten
            </Button>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-tactflux-blue">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && <div className="md:hidden bg-tactflux-card bg-opacity-95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('about-us')} className="block px-3 py-2 text-white hover:text-tactflux-blue w-full text-left">
              Über uns
            </button>
            <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-white hover:text-tactflux-blue w-full text-left">
              Überblick
            </button>
            <button onClick={() => scrollToSection('pricing')} className="block px-3 py-2 text-white hover:text-tactflux-blue w-full text-left">
              Abo-Preise
            </button>
            <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-white hover:text-tactflux-blue w-full text-left">
              Kontakt
            </button>
            <Button variant="tactflux" className="w-full font-medium mt-4" onClick={() => scrollToSection('cta')}>
              Jetzt starten
            </Button>
          </div>
        </div>}
    </header>;
};
export default Header;