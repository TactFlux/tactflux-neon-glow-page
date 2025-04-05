
import React from 'react';
import { Fingerprint, LineChart, BarChart3, Shield } from 'lucide-react';

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
      icon: <BarChart3 size={24} className="text-tactflux-neon" />,
      title: "Kreativitätstests",
      description: "Maßgeschneiderte Tests zur Bewertung der kreativen Problemlösungsfähigkeiten von Bewerbern.",
      gradient: "bg-gradient-to-br from-tactflux-neon/20 to-tactflux-neon/5"
    },
    {
      icon: <LineChart size={24} className="text-tactflux-blue" />,
      title: "Benutzeranalysen",
      description: "Detaillierte Einblicke in die Performance und kreative Denkprozesse jedes Bewerbers.",
      gradient: "bg-gradient-to-br from-tactflux-blue/20 to-tactflux-blue/5"
    },
    {
      icon: <Fingerprint size={24} className="text-tactflux-purple" />,
      title: "Branding",
      description: "Passe TactFlux an die CI deines Unternehmens an und biete ein konsistentes Bewerbererlebnis.",
      gradient: "bg-gradient-to-br from-tactflux-purple/20 to-tactflux-purple/5"
    },
    {
      icon: <Shield size={24} className="text-tactflux-success" />,
      title: "Sicherheit",
      description: "Höchste Datensicherheitsstandards zum Schutz sensibler Bewerberinformationen.",
      gradient: "bg-gradient-to-br from-tactflux-success/20 to-tactflux-success/5"
    }
  ];

  return (
    <section className="section-container" id="features">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Bewerberbewertung <span className="neon-text">neu gedacht</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          TactFlux bietet innovative Lösungen zur objektiven Bewertung kreativer Problemlösungsfähigkeiten.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <FeatureCard {...feature} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
