
import React from 'react';
import { Button } from "@/components/ui/button";

const AboutUsSection: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden" id="about-us">
      <div className="absolute inset-0 bg-gradient-to-b from-tactflux-dark to-black opacity-50"></div>
      <div className="hero-glow absolute top-1/3 right-1/4 bg-tactflux-blue opacity-10"></div>
      <div className="hero-glow absolute bottom-1/3 left-1/4 bg-tactflux-purple opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Über <span className="text-tactflux-blue">Uns</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Wir revolutionieren die Art und Weise, wie Unternehmen kreative Talente entdecken und bewerten.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-tactflux-blue">Unsere Vision</h3>
            <p className="text-gray-300 mb-6">
              Wir glauben daran, dass kreatives Denken und Problemlösungsfähigkeiten entscheidende Faktoren für den Erfolg in der heutigen dynamischen Arbeitswelt sind. Unsere Mission ist es, Unternehmen dabei zu helfen, diese Fähigkeiten objektiv zu bewerten und die besten Talente zu finden.
            </p>
            <p className="text-gray-300">
              Mit unserem innovativen Bewerberbewertungssystem bieten wir eine umfassende Lösung, die über traditionelle Auswahlverfahren hinausgeht und tiefere Einblicke in die kreativen Fähigkeiten von Kandidaten ermöglicht.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 animate-scale-in">
              <h4 className="text-xl font-bold mb-2 text-tactflux-purple">Gegründet 2023</h4>
              <p className="text-gray-400">
                Aus der Idee geboren, den Rekrutierungsprozess zu revolutionieren und kreative Köpfe zu fördern.
              </p>
            </div>
            
            <div className="glass-card p-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <h4 className="text-xl font-bold mb-2 text-tactflux-neon">Team von Experten</h4>
              <p className="text-gray-400">
                Unser Team besteht aus Fachleuten aus den Bereichen Personalwesen, Psychologie und Technologie.
              </p>
            </div>
            
            <div className="glass-card p-6 animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <h4 className="text-xl font-bold mb-2 text-tactflux-blue">Kontinuierliche Innovation</h4>
              <p className="text-gray-400">
                Wir entwickeln unsere Plattform ständig weiter, um auf dem neuesten Stand der Technologie und Forschung zu bleiben.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="tactflux"
            className="text-white font-medium"
          >
            Kontaktieren Sie uns
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
