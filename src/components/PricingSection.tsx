import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Code, Shield, Zap, Clock, Users } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  borderClass: string;
  cardGlowClass: string;
  icon: React.ReactNode;
  delay?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular, 
  buttonText,
  borderClass,
  cardGlowClass,
  icon,
  delay = 0
}) => {
  return (
    <div 
      className={`glass-card p-6 relative reveal-on-scroll opacity-0 transition-all duration-500 hover:-translate-y-2 ${
        isPopular ? 'transform-gpu scale-105 border-tactflux-neon/30 shadow-lg' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-tactflux-neon text-black text-sm font-medium px-4 py-1 rounded-full">
          Beliebteste Option
        </div>
      )}
      
      <div className="mb-8 mt-4">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5">
            {icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 h-12">{description}</p>
        <div className="flex justify-center items-baseline">
          <span className="text-4xl font-extrabold">{price}</span>
          <span className="ml-1 text-gray-400">/ Monat</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check size={16} className="text-tactflux-success mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
      
      <div>
        <Button 
          className={`w-full ${cardGlowClass} ${borderClass} py-2 group`}
        >
          {buttonText}
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
        </Button>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const pricingOptions = [
    {
      title: "API Starter",
      price: "399 €",
      description: "Ideal für Start-ups und kleine Teams",
      features: [
        "Bis zu 50 Tests pro Monat",
        "REST API-Integration",
        "Creative Fit Score",
        "Support per E-Mail",
        "Bewerber-Dashboard Standard"
      ],
      isPopular: false,
      buttonText: "API-Zugang anfordern",
      borderClass: "border-tactflux-blue/40 hover:border-tactflux-blue/80",
      cardGlowClass: "bg-tactflux-blue/10 hover:bg-tactflux-blue/20 text-white",
      icon: <Code size={24} className="text-tactflux-blue" />
    },
    {
      title: "API Business",
      price: "699 €",
      description: "Für wachsende Unternehmen",
      features: [
        "Bis zu 200 Tests pro Monat",
        "Erweiterte API-Funktionen",
        "Detaillierte Analysen",
        "Branding-Anpassungen",
        "Prioritäts-Support",
        "Webhook-Integration"
      ],
      isPopular: true,
      buttonText: "API-Demo vereinbaren",
      borderClass: "neon-border",
      cardGlowClass: "bg-tactflux-neon/10 hover:bg-tactflux-neon/30 text-white",
      icon: <Zap size={24} className="text-tactflux-neon" />
    },
    {
      title: "API Enterprise",
      price: "Auf Anfrage",
      description: "Für Konzerne und Großunternehmen",
      features: [
        "Unbegrenzte Tests",
        "Vollständige API-Integration",
        "Dedizierter Account Manager",
        "White-Label-Lösung möglich",
        "On-Premise-Option",
        "Custom Analytics API"
      ],
      isPopular: false,
      buttonText: "Enterprise-Lösung anfragen",
      borderClass: "border-tactflux-purple/40 hover:border-tactflux-purple/80",
      cardGlowClass: "bg-tactflux-purple/10 hover:bg-tactflux-purple/20 text-white",
      icon: <Shield size={24} className="text-tactflux-purple" />
    }
  ];

  return (
    <section className="section-container bg-gradient-to-b from-tactflux-dark to-black relative" id="pricing" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-tactflux-blue/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-tactflux-purple/5 blur-3xl rounded-full"></div>
      
      <div className="text-center mb-16 reveal-on-scroll opacity-0">
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/20">
          <span className="text-white text-sm font-medium">API-Pakete für Ihr Business</span>
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="neon-text">Skalierbare</span> Preismodelle
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Wählen Sie das passende API-Paket für Ihre Recruiting-Anforderungen.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {pricingOptions.map((option, index) => (
          <PricingCard 
            key={index} 
            {...option} 
            delay={index * 150}
          />
        ))}
      </div>
      
      <div className="mt-16 text-center max-w-3xl mx-auto glass-card p-8 reveal-on-scroll opacity-0">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-tactflux-neon to-tactflux-blue bg-opacity-20 flex items-center justify-center">
            <Clock size={24} className="text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">ROI-Rechner</h3>
        <p className="text-gray-300 mb-8">
          Mit TactFlux senken Sie Recruiting-Kosten und treffen bessere Einstellungsentscheidungen:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="glass-card p-5 transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-lg font-semibold mb-3 text-tactflux-blue flex items-center justify-center">
              <Clock size={18} className="mr-2" />
              Zeit- & Kostenersparnis
            </h4>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-tactflux-blue mb-2">
                -42<span className="text-lg">%</span>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Reduzieren Sie die Zeit bis zur Einstellung und senken Sie die Kosten pro Einstellung um bis zu 35%.
              </p>
            </div>
          </div>
          
          <div className="glass-card p-5 transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-lg font-semibold mb-3 text-tactflux-neon flex items-center justify-center">
              <Users size={18} className="mr-2" />
              Candidate Experience
            </h4>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-tactflux-neon mb-2">
                96<span className="text-lg">%</span>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Der Bewerber berichtet von einer positiven Erfahrung, was direkt Ihre Employer Brand stärkt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
