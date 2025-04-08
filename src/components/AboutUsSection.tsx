
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Zap, Cpu, Users } from 'lucide-react';

const AboutUsSection: React.FC = () => {
  // Sample ROI data for recruitment efficiency
  const roiData = [
    { month: "Jan", traditional: 100, withTactFlux: 100 },
    { month: "Feb", traditional: 110, withTactFlux: 130 },
    { month: "Mrz", traditional: 120, withTactFlux: 170 },
    { month: "Apr", traditional: 130, withTactFlux: 220 },
    { month: "Mai", traditional: 140, withTactFlux: 280 },
    { month: "Jun", traditional: 150, withTactFlux: 350 },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" id="about-us" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-tactflux-dark to-black opacity-50"></div>
      <div className="hero-glow absolute top-1/3 right-1/4 bg-tactflux-blue opacity-10 animate-pulse-slow"></div>
      <div className="hero-glow absolute bottom-1/3 left-1/4 bg-tactflux-purple opacity-10 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 reveal-on-scroll opacity-0">
          <span className="inline-block px-3 py-1 mb-3 rounded-full bg-tactflux-blue/10 backdrop-blur-sm border border-tactflux-blue/30">
            <span className="text-tactflux-blue text-sm font-medium">Die API-Revolution</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recruiting <span className="text-tactflux-blue">neu gedacht</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nahtlose Integration. Objektive Daten. Faire Chancen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8 reveal-on-scroll opacity-0">
            <h3 className="text-2xl font-bold mb-4 text-tactflux-blue flex items-center">
              <Zap size={24} className="mr-2 text-tactflux-neon" />
              API für mehr Recruiting-Power
            </h3>
            <p className="text-gray-300 mb-6">
              TactFlux erweitert Ihr HR-System mit einer leistungsstarken API. Behalten Sie Ihre gewohnten Prozesse bei und gewinnen Sie gleichzeitig tiefe Einblicke in die tatsächlichen Fähigkeiten Ihrer Kandidaten.
            </p>
            
            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4 text-tactflux-neon flex items-center">
                <Cpu size={20} className="mr-2" />
                ROI Ihres Recruitings mit TactFlux
              </h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ChartContainer config={{
                    traditional: { label: "Traditionelles Recruiting", color: "#6E59A5" },
                    withTactFlux: { label: "Mit TactFlux", color: "#33C3F0" }
                  }}>
                    <LineChart data={roiData} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
                      <Line 
                        type="monotone" 
                        dataKey="withTactFlux" 
                        stroke="#33C3F0" 
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="traditional" 
                        stroke="#6E59A5" 
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                      <CartesianGrid stroke="#444" strokeDasharray="5 5" opacity={0.3} />
                      <XAxis dataKey="month" tick={{ fill: '#aaa' }} />
                      <YAxis tick={{ fill: '#aaa' }} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        cursor={{ stroke: '#aaa', strokeWidth: 1, opacity: 0.3 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-400 mt-2 text-center">Effektivität des Recruiting-Prozesses über 6 Monate</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 reveal-on-scroll opacity-0 transform transition-all duration-300 hover:translate-y-[-5px]">
              <h4 className="text-xl font-bold mb-3 text-tactflux-purple">Nahtlose Integration</h4>
              <p className="text-gray-400">
                RESTful API-Schnittstelle, die sich in Sekunden in Ihre HR-Software integriert. Kein Systemwechsel, keine IT-Projekte.
              </p>
            </div>
            
            <div className="glass-card p-6 reveal-on-scroll opacity-0 transform transition-all duration-300 hover:translate-y-[-5px]" style={{ transitionDelay: '200ms' }}>
              <h4 className="text-xl font-bold mb-3 text-tactflux-neon">Datenbasierte Entscheidungen</h4>
              <p className="text-gray-400">
                Der Creative Fit Score liefert objektive Daten über die kreativen und adaptiven Fähigkeiten Ihrer Kandidaten.
              </p>
            </div>
            
            <div className="glass-card p-6 reveal-on-scroll opacity-0 transform transition-all duration-300 hover:translate-y-[-5px]" style={{ transitionDelay: '400ms' }}>
              <h4 className="text-xl font-bold mb-3 text-tactflux-blue flex items-center">
                <Users size={20} className="mr-2" />
                Kandidaten im Mittelpunkt
              </h4>
              <p className="text-gray-400">
                Bieten Sie Bewerbern die Bühne, die sie verdienen. Entdecken Sie versteckte Talente jenseits des Lebenslaufs.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center reveal-on-scroll opacity-0" style={{ transitionDelay: '600ms' }}>
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="tactflux-static"
            size="cta"
            className="mx-auto py-2 group"
          >
            API-Demo anfordern
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
