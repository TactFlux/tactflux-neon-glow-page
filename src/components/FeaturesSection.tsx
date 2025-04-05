
import React from 'react';
import { Fingerprint, LineChart, BarChart3, Shield, Award, Sparkles } from 'lucide-react';

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
  const features = [
    {
      icon: <Sparkles size={24} className="text-tactflux-neon" />,
      title: "Kreative Challenges",
      description: "Zeige deine einzigartigen Fähigkeiten in interaktiven Tests, die auf deinen Berufswunsch zugeschnitten sind.",
      gradient: "bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5"
    },
    {
      icon: <LineChart size={24} className="text-tactflux-blue" />,
      title: "Objektive Bewertung",
      description: "Dein Creative Fit Score macht deine Stärken sichtbar – unabhängig von Schulnoten oder Lebenslauf.",
      gradient: "bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5"
    },
    {
      icon: <Award size={24} className="text-tactflux-purple" />,
      title: "Digitale Anerkennung",
      description: "Teile dein TactFlux-Abzeichen in sozialen Netzwerken und zeige dein Potenzial anderen Arbeitgebern.",
      gradient: "bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5"
    },
    {
      icon: <Shield size={24} className="text-tactflux-success" />,
      title: "Faire Chancen",
      description: "Karrierewechsler und Quereinsteiger können durch kreative Problemlösung glänzen und neue Türen öffnen.",
      gradient: "bg-gradient-to-br from-tactflux-success/20 to-tactflux-success/5"
    }
  ];

  return (
    <section className="section-container" id="features">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Deine Chance zu <span className="neon-text">glänzen</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          TactFlux gibt dir die Möglichkeit, deine wahren Talente zu zeigen – jenseits von Noten und Lebenslaufstationen.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
      
      <div className="mt-16 glass-card p-8 animate-fade-in">
        <h3 className="text-2xl font-bold mb-6 text-center">So funktioniert <span className="text-tactflux-blue">TactFlux</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5">
              <span className="text-2xl font-bold text-tactflux-neon">1</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Interaktive Tests</h4>
            <p className="text-gray-400">Tauche ein in branchenspezifische Herausforderungen, die deine kreativen Problemlösungsfähigkeiten zeigen.</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5">
              <span className="text-2xl font-bold text-tactflux-blue">2</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">KI-Analyse</h4>
            <p className="text-gray-400">Die TactFlux-KI analysiert deine Antworten und bewertet deine Kreativität, Anpassungsfähigkeit und soziale Kompetenz.</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5">
              <span className="text-2xl font-bold text-tactflux-purple">3</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Persönliches Feedback</h4>
            <p className="text-gray-400">Erhalte einen detaillierten Bericht mit deinem Creative Fit Score und konkreten Entwicklungsmöglichkeiten.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
