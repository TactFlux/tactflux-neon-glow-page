
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  borderClass: string;
  cardGlowClass: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular, 
  buttonText,
  borderClass,
  cardGlowClass
}) => {
  return (
    <div className={`glass-card p-6 relative ${isPopular ? 'transform-gpu scale-105 border border-tactflux-neon/30' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-tactflux-neon text-black text-sm font-medium px-4 py-1 rounded-full">
          Beliebteste Option
        </div>
      )}
      
      <div className="mb-8 mt-4">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex justify-center items-baseline">
          <span className="text-4xl font-extrabold">{price}</span>
          <span className="ml-1 text-gray-400">/ Monat</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check size={18} className="text-tactflux-success mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
      
      <div>
        <Button 
          className={`w-full ${cardGlowClass} ${borderClass} py-2`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const pricingOptions = [
    {
      title: "API Starter",
      price: "399 €",
      description: "Ideal für Start-ups und kleine Teams",
      features: [
        "Bis zu 50 Tests pro Monat",
        "Grundlegende API-Integration",
        "Standard Creative Fit Score",
        "Technischer Support per E-Mail",
        "Bewerber-Dashboard Standard"
      ],
      isPopular: false,
      buttonText: "API-Zugang anfordern",
      borderClass: "border-tactflux-blue/40 hover:border-tactflux-blue/80",
      cardGlowClass: "bg-tactflux-blue/10 hover:bg-tactflux-blue/20 text-white"
    },
    {
      title: "API Business",
      price: "699 €",
      description: "Für wachsende Unternehmen",
      features: [
        "Bis zu 200 Tests pro Monat",
        "Erweiterte API-Funktionen",
        "Detaillierte Kandidatenanalysen",
        "Branding-Anpassungen",
        "Prioritäts-Support",
        "Webhook-Unterstützung"
      ],
      isPopular: true,
      buttonText: "API-Demo vereinbaren",
      borderClass: "neon-border",
      cardGlowClass: "bg-tactflux-neon hover:bg-tactflux-neon/90 text-black"
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
        "Anpassbare Analysemodelle"
      ],
      isPopular: false,
      buttonText: "Enterprise-Lösung anfragen",
      borderClass: "border-tactflux-purple/40 hover:border-tactflux-purple/80",
      cardGlowClass: "bg-tactflux-purple/10 hover:bg-tactflux-purple/20 text-white"
    }
  ];

  return (
    <section className="section-container bg-gradient-to-b from-tactflux-dark to-black" id="pricing">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="neon-text">Flexible</span> API-Pakete
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Wählen Sie das passende Paket für Ihre Recruiting-Anforderungen und skalieren Sie nach Bedarf.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingOptions.map((option, index) => (
          <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <PricingCard {...option} />
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center max-w-3xl mx-auto glass-card p-8">
        <h3 className="text-2xl font-bold mb-4">Berechnen Sie Ihren ROI</h3>
        <p className="text-gray-300 mb-4">
          Mit TactFlux können Sie Ihre Recruiting-Kosten senken und gleichzeitig bessere Einstellungsentscheidungen treffen:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div className="glass-card p-4">
            <h4 className="text-lg font-semibold mb-2 text-tactflux-blue">Zeit- und Kostenersparnis</h4>
            <p className="text-sm text-gray-400">Reduzieren Sie die Zeit bis zur Einstellung um durchschnittlich 42% und senken Sie die Kosten pro Einstellung um bis zu 35%.</p>
          </div>
          <div className="glass-card p-4">
            <h4 className="text-lg font-semibold mb-2 text-tactflux-neon">Bessere Candidate Experience</h4>
            <p className="text-sm text-gray-400">96% der Bewerber berichten von einer positiven Erfahrung mit TactFlux, was direkt Ihre Employer Brand stärkt.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
