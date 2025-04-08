
import React, { useRef, useEffect } from 'react';
import { Fingerprint, LineChart, Shield, Award, Sparkles, Code, Cpu, Zap, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, gradient, delay = 0 }) => {
  return (
    <div 
      className="glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg reveal-on-scroll opacity-0"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`rounded-full w-14 h-14 flex items-center justify-center mb-6 mx-auto ${gradient}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal-on-scroll');
            elements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, 200 * i);
            });
            observer.unobserve(entry.target);
          }
        });
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

  const companyFeatures = [
    {
      icon: <Code size={24} className="text-tactflux-blue" />,
      title: "REST API-Integration",
      description: "Nahtloser Anschluss an Ihre HR-Tools – ohne Systemwechsel, ohne IT-Projekt.",
      gradient: "bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5"
    },
    {
      icon: <LineChart size={24} className="text-tactflux-purple" />,
      title: "Analytische Einblicke",
      description: "Datengetriebene Visualisierungen der Creative Fit Scores für bessere Entscheidungen.",
      gradient: "bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5"
    },
    {
      icon: <Cpu size={24} className="text-tactflux-neon" />,
      title: "KI-Bewertung",
      description: "KI analysiert Bewerberantworten auf Kreativität und Problemlösungskompetenz in Echtzeit.",
      gradient: "bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5"
    },
    {
      icon: <Zap size={24} className="text-tactflux-success" />,
      title: "Enterprise-Ready",
      description: "DSGVO-konform, skalierbar und mit kontinuierlichen Updates für Ihre Anforderungen.",
      gradient: "bg-gradient-to-br from-tactflux-success/20 to-tactflux-success/5"
    }
  ];

  const candidateFeatures = [
    {
      icon: <Sparkles size={24} className="text-tactflux-neon" />,
      title: "Kreative Challenges",
      description: "Interaktive Tests, bei denen Bewerber ihre einzigartigen Fähigkeiten jenseits des CVs zeigen.",
      gradient: "bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5"
    },
    {
      icon: <LineChart size={24} className="text-tactflux-blue" />,
      title: "Objektive Bewertung",
      description: "Der Creative Fit Score macht wahre Talente sichtbar – unabhängig von formalen Qualifikationen.",
      gradient: "bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5"
    },
    {
      icon: <Award size={24} className="text-tactflux-purple" />,
      title: "Digitale Anerkennung",
      description: "Bewerber können ihre Erfolge in sozialen Netzwerken teilen und ihre Fähigkeiten präsentieren.",
      gradient: "bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5"
    },
    {
      icon: <Shield size={24} className="text-tactflux-success" />,
      title: "Faire Chancen",
      description: "Quereinsteiger und unkonventionelle Bewerber können durch tatsächliche Fähigkeiten überzeugen.",
      gradient: "bg-gradient-to-br from-tactflux-success/20 to-tactflux-success/5"
    }
  ];

  return (
    <section className="section-container relative" id="features" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-tactflux-blue opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-tactflux-neon opacity-5 blur-3xl rounded-full"></div>
      
      <div className="text-center mb-16 reveal-on-scroll opacity-0">
        <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-white text-sm font-medium">Unsere API-Lösung</span>
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Vorteile für <span className="neon-text">alle Beteiligten</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          TactFlux verbessert sowohl die Candidate Experience als auch Ihre Recruiting-Effizienz.
        </p>
      </div>
      
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center reveal-on-scroll opacity-0">
          <Zap size={22} className="mr-2 text-tactflux-blue" />
          Für <span className="text-tactflux-blue ml-2">Unternehmen</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companyFeatures.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature}
              delay={index * 100} 
            />
          ))}
        </div>
      </div>
      
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center reveal-on-scroll opacity-0">
          <Users size={22} className="mr-2 text-tactflux-purple" />
          Für <span className="text-tactflux-purple ml-2">Bewerber</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {candidateFeatures.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              delay={index * 100}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-16 glass-card p-8 reveal-on-scroll opacity-0">
        <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
          <Code size={20} className="mr-2 text-tactflux-blue" />
          Integration in <span className="text-tactflux-blue ml-2">3 einfachen Schritten</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {[
            {
              step: "1",
              title: "API-Anbindung",
              description: "Integration in wenigen Minuten – schnell und ohne IT-Projekt.",
              color: "neon"
            },
            {
              step: "2",
              title: "Bewerbertests",
              description: "Interaktive, branchenspezifische Tests für kreative Problemlösung.",
              color: "blue"
            },
            {
              step: "3",
              title: "Datengestützte Entscheidungen",
              description: "Automatische Ergebnisse mit klaren Scores und aussagekräftigen Analysen.",
              color: "purple"
            }
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className={`rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-tactflux-${item.color}/20 to-tactflux-${item.color}/5`}>
                <span className={`text-2xl font-bold text-tactflux-${item.color}`}>{item.step}</span>
              </div>
              
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-tactflux-blue/50 to-transparent" style={{ width: "calc(100% - 64px)", transform: "translateX(-50%)" }}></div>
              )}
              
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-6">
          <div className="bg-tactflux-card/50 rounded-lg p-3 px-5 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-tactflux-success animate-pulse"></div>
            <span className="text-sm text-gray-300">Einfache Integration mit RESTful API</span>
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-tactflux-blue font-medium">&lt;90 Minuten</span> bis zur ersten Implementierung
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
