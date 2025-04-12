
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Fingerprint, LineChart, BarChart3, Shield, Award, Sparkles, Code, BarChart, Cpu, Zap } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, gradient }) => {
  return (
    <div className="glass-card p-6 transition-all duration-300 hover:translate-y-[-5px]">
      <div className={`rounded-full w-14 h-14 flex items-center justify-center mb-6 mx-auto ${gradient}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const companyFeatures = [
    {
      icon: <Code size={24} className="text-tactflux-blue" />,
      title: "API-Integration",
      description: "Nahtloser Anschluss an Ihre bestehenden HR-Tools über unsere RESTful API – ohne Systemwechsel.",
      gradient: "bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5"
    },
    {
      icon: <BarChart size={24} className="text-tactflux-purple" />,
      title: "Analytische Einblicke",
      description: "Datengestützte Visualisierungen der Creative Fit Scores für fundierte Personalentscheidungen.",
      gradient: "bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5"
    },
    {
      icon: <Cpu size={24} className="text-tactflux-neon" />,
      title: "KI-gestützte Evaluierung",
      description: "Fortschrittliche KI analysiert Bewerberantworten auf Kreativität und Problemlösungskompetenz.",
      gradient: "bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5"
    },
    {
      icon: <Zap size={24} className="text-tactflux-success" />,
      title: "Enterprise-Ready",
      description: "DSGVO-konforme Prozesse, Skalierbarkeit und kontinuierliche Updates für Ihre Recruiting-Anforderungen.",
      gradient: "bg-gradient-to-br from-tactflux-success/20 to-tactflux-success/5"
    }
  ];

  const candidateFeatures = [
    {
      icon: <Sparkles size={24} className="text-tactflux-neon" />,
      title: "Kreative Challenges",
      description: "Interaktive Tests, mit denen Bewerber ihre einzigartigen Fähigkeiten fernab vom Lebenslauf demonstrieren können.",
      gradient: "bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5"
    },
    {
      icon: <LineChart size={24} className="text-tactflux-blue" />,
      title: "Objektive Bewertung",
      description: "Der Creative Fit Score macht die wahren Talente sichtbar – unabhängig von formalen Qualifikationen.",
      gradient: "bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5"
    },
    {
      icon: <Award size={24} className="text-tactflux-purple" />,
      title: "Digitale Anerkennung",
      description: "Bewerber können ihre TactFlux-Erfolge in sozialen Netzwerken teilen und ihre Fähigkeiten öffentlich machen.",
      gradient: "bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5"
    },
    {
      icon: <Shield size={24} className="text-tactflux-success" />,
      title: "Faire Chancen",
      description: "Quereinsteiger und unkonventionelle Bewerber können durch ihre tatsächlichen Fähigkeiten überzeugen.",
      gradient: "bg-gradient-to-br from-tactflux-success/20 to-tactflux-success/5"
    }
  ];

  return (
    <section className="section-container" id="features">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Vorteile für <span className="neon-text">alle Beteiligten</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          TactFlux verbessert sowohl die Candidate Experience als auch Ihre Recruiting-Effizienz.
        </p>
      </div>
      
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-center">Für <span className="text-tactflux-blue">Unternehmen</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyFeatures.map((feature, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-center">Für <span className="text-tactflux-purple">Bewerber</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {candidateFeatures.map((feature, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 glass-card p-8 animate-fade-in">
        <h3 className="text-2xl font-bold mb-6 text-center">So funktioniert die <span className="text-tactflux-blue">TactFlux-Integration</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5">
              <span className="text-2xl font-bold text-tactflux-neon">1</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">API-Anbindung</h4>
            <p className="text-gray-400">Integieren Sie TactFlux in wenigen Schritten über unsere API in Ihr HR-System – schnell und ohne IT-Projekt.</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5">
              <span className="text-2xl font-bold text-tactflux-blue">2</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Bewerbertest</h4>
            <p className="text-gray-400">Bewerber durchlaufen einen gamifizierten, branchenspezifischen Test, der kreative Problemlösung und Anpassungsfähigkeit prüft.</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5">
              <span className="text-2xl font-bold text-tactflux-purple">3</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Datengestützte Entscheidungen</h4>
            <p className="text-gray-400">Die Testergebnisse fließen automatisch zurück in Ihr HR-Tool – mit klaren Scores und aussagekräftigen Analysen.</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Button 
            asChild
            variant="tactflux-cta" 
            size="cta" 
            className="mx-auto shadow-neon-blue-hover ring-tactflux-blue ring-offset-2 focus:ring-2 transform transition-all hover:scale-105"
          >
            <Link to="/signup">
              Kostenlosen TactFlux-Account erstellen
            </Link>
          </Button>
          <p className="text-gray-400 mt-4">
            Sofort starten, keine Kreditkarte erforderlich
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
