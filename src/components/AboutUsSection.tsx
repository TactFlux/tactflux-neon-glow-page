
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
            Über <span className="text-tactflux-blue">TactFlux</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Wir geben Bewerbern eine faire Chance, ihr volles Potenzial zu zeigen – unabhängig von Lebenslauf oder formalen Qualifikationen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-tactflux-blue">Unsere Mission</h3>
            <p className="text-gray-300 mb-6">
              In einer Welt, in der Lebensläufe oft über Karrieren entscheiden, haben wir TactFlux entwickelt, um Bewerbern eine neue Art der Selbstdarstellung zu ermöglichen. Wir glauben an die verborgenen Talente, die in traditionellen Bewerbungsprozessen oft übersehen werden.
            </p>
            <p className="text-gray-300">
              Mit einer Kombination aus spielerischen Erlebnissen und objektiver Talentbewertung schaffen wir eine Bühne, auf der jeder Bewerber seine kreativen Problemlösungsfähigkeiten, Anpassungsfähigkeit und sozialen Kompetenzen authentisch zeigen kann.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 animate-scale-in">
              <h4 className="text-xl font-bold mb-2 text-tactflux-purple">Für Bewerber gemacht</h4>
              <p className="text-gray-400">
                TactFlux gibt dir die Chance, jenseits klassischer Kriterien zu überzeugen und deine einzigartigen Talente zu demonstrieren.
              </p>
            </div>
            
            <div className="glass-card p-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <h4 className="text-xl font-bold mb-2 text-tactflux-neon">Spielerische Erfahrung</h4>
              <p className="text-gray-400">
                Statt trockener Fragebögen bieten wir interaktive Herausforderungen, die deine kreative Problemlösungsfähigkeit auf die Probe stellen.
              </p>
            </div>
            
            <div className="glass-card p-6 animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <h4 className="text-xl font-bold mb-2 text-tactflux-blue">Sofortiges Feedback</h4>
              <p className="text-gray-400">
                Nach jedem Test erhältst du eine persönliche Auswertung mit Stärken und Entwicklungspotentialen – ein Mehrwert für deine Karriere.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="tactflux-static"
            size="cta"
            className="mx-auto"
          >
            Starte deine Reise
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
