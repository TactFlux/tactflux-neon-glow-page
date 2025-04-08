
import React from 'react';
import Logo from './Logo';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-black bg-opacity-80 backdrop-blur-sm pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Logo />
            <p className="mt-4 text-gray-400 text-sm text-left">
              Die API-Lösung für faires und modernes Recruiting mit interaktiven Bewerbertests.
            </p>
            <div className="flex space-x-4 mt-6">
              {[
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Instagram, href: "#", label: "Instagram" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-tactflux-blue transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-left">API & Produkt</h3>
            <ul className="space-y-2 text-left">
              {[
                { id: 'features', label: 'API-Features' },
                { id: 'pricing', label: 'Preismodelle' },
                { href: '#', label: 'API-Dokumentation' },
                { href: '#', label: 'Fallstudien' }
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => item.id ? scrollToSection(item.id) : window.location.href = item.href || '#'}
                    className="text-gray-400 hover:text-tactflux-blue transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-left">Unternehmen</h3>
            <ul className="space-y-2 text-left">
              {[
                { id: 'about-us', label: 'Über uns' },
                { href: '#', label: 'Blog' },
                { href: '#', label: 'Karriere' },
                { id: 'contact', label: 'Kontakt' }
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => item.id ? scrollToSection(item.id) : window.location.href = item.href || '#'}
                    className="text-gray-400 hover:text-tactflux-blue transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 text-left">Rechtliches</h3>
            <ul className="space-y-2 text-left">
              {[
                { href: '#', label: 'Datenschutz' },
                { href: '#', label: 'AGB' },
                { href: '#', label: 'Impressum' },
                { href: '#', label: 'Lizenzinformationen' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-tactflux-blue transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TactFlux GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex mt-4 md:mt-0 gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">Cookies</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">Sicherheit</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-xs transition-colors">Status</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
