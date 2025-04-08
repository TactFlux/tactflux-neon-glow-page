
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would send this to your newsletter service
    toast({
      title: "Newsletter-Anmeldung erfolgreich",
      description: "Vielen Dank für Ihre Anmeldung zu unserem Newsletter.",
      duration: 5000,
    });
  };

  return (
    <section className="py-16 relative overflow-hidden" id="newsletter">
      <div className="absolute inset-0 bg-gradient-to-r from-tactflux-blue/10 to-tactflux-blue/10 opacity-30"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-glow p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Bleiben Sie <span className="text-tactflux-blue">informiert</span>
            </h2>
            <p className="text-gray-300">
              Abonnieren Sie unseren Newsletter für die neuesten Updates, Tipps und Einblicke in die Welt der kreativen Bewerberbewertung.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Ihre E-Mail-Adresse" 
              required 
              className="flex-grow bg-white/5 border-white/10 text-white"
            />
            <Button 
              type="submit" 
              className="bg-tactflux-blue hover:bg-tactflux-blue/90 text-black blue-neon-border whitespace-nowrap"
            >
              Abonnieren
            </Button>
          </form>
          
          <p className="text-xs text-gray-400 mt-4 text-center">
            Durch das Abonnieren stimmen Sie unseren Datenschutzbestimmungen zu. Sie können sich jederzeit abmelden.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
