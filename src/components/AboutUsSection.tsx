
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const AboutUsSection: React.FC = () => {
  // Sample ROI data for recruitment efficiency
  const roiData = [
    { month: "1", traditional: 100, withTactFlux: 100 },
    { month: "2", traditional: 110, withTactFlux: 130 },
    { month: "3", traditional: 120, withTactFlux: 170 },
    { month: "4", traditional: 130, withTactFlux: 220 },
    { month: "5", traditional: 140, withTactFlux: 280 },
    { month: "6", traditional: 150, withTactFlux: 350 },
  ];

  return (
    <section className="py-16 relative overflow-hidden" id="about-us">
      <div className="absolute inset-0 bg-gradient-to-b from-tactflux-dark to-black opacity-50"></div>
      <div className="hero-glow absolute top-1/3 right-1/4 bg-tactflux-blue opacity-10"></div>
      <div className="hero-glow absolute bottom-1/3 left-1/4 bg-tactflux-purple opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Die <span className="text-tactflux-blue">API-Lösung</span> für modernes Recruiting
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nahtlos in Ihre HR-Prozesse integrierbar. Skalierbar. Datengetrieben.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-tactflux-blue">Unser Versprechen an Unternehmen</h3>
            <p className="text-gray-300 mb-6">
              TactFlux erweitert Ihr bestehendes HR-System mit einer leistungsstarken API-Schnittstelle. Sie behalten Ihre gewohnten Prozesse bei und gewinnen gleichzeitig tiefe Einblicke in die tatsächlichen Fähigkeiten Ihrer Kandidaten.
            </p>
            <p className="text-gray-300 mb-6">
              Während Sie von effizienterem Recruiting und besseren Einstellungsentscheidungen profitieren, bieten Sie Ihren Bewerbern einen modernen, fairen Prozess – ein klares Statement für Ihre Employer Brand.
            </p>
            <div className="mt-6">
              <h4 className="text-lg font-bold mb-2 text-tactflux-neon">ROI Ihres Recruitings mit TactFlux</h4>
              <ChartContainer className="h-64" config={{
                traditional: { label: "Traditionelles Recruiting", color: "#6E59A5" },
                withTactFlux: { label: "Mit TactFlux", color: "#33C3F0" }
              }}>
                <LineChart data={roiData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="withTactFlux" stroke="#33C3F0" strokeWidth={2} />
                  <Line type="monotone" dataKey="traditional" stroke="#6E59A5" strokeWidth={2} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </LineChart>
              </ChartContainer>
              <p className="text-sm text-gray-400 mt-2 text-center">Effektivität des Recruiting-Prozesses über 6 Monate</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 animate-scale-in">
              <h4 className="text-xl font-bold mb-2 text-tactflux-purple">Einfache Integration</h4>
              <p className="text-gray-400">
                Dank RESTful API-Schnittstelle integriert sich TactFlux nahtlos in Ihre existierende HR-Software – ohne Systemwechsel, ohne komplexe IT-Projekte.
              </p>
            </div>
            
            <div className="glass-card p-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <h4 className="text-xl font-bold mb-2 text-tactflux-neon">Datenbasierte Entscheidungen</h4>
              <p className="text-gray-400">
                Der Creative Fit Score liefert objektive Daten über die kreativen Problemlösungsfähigkeiten und Anpassungsfähigkeit Ihrer Kandidaten.
              </p>
            </div>
            
            <div className="glass-card p-6 animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <h4 className="text-xl font-bold mb-2 text-tactflux-blue">Stärkung Ihrer Employer Brand</h4>
              <p className="text-gray-400">
                Bewerber schätzen faire, moderne Auswahlverfahren. Mit TactFlux zeigen Sie, dass bei Ihnen Talent über Formalien siegt.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="tactflux-static"
            size="cta"
            className="mx-auto py-2"
          >
            API-Demo anfordern
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
