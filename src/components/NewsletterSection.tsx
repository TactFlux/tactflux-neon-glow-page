
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Newsletter-Anmeldung erfolgreich",
        description: "Vielen Dank für Ihre Anmeldung zu unserem Newsletter.",
        duration: 5000,
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-16 relative overflow-hidden" id="newsletter">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-tactflux-dark/80"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-tactflux-blue/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-tactflux-neon/10 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-glow p-8 backdrop-blur-md bg-black/20 rounded-xl border border-white/10 reveal-on-scroll opacity-0">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 mb-3 rounded-full bg-tactflux-blue/10 backdrop-blur-sm border border-tactflux-blue/30">
              <span className="text-tactflux-blue text-sm font-medium">API-Updates</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Bleiben Sie <span className="text-tactflux-blue">informiert</span>
            </h2>
            <p className="text-gray-300">
              Erhalten Sie Updates zur TactFlux API, Best Practices für Recruiting und Insights zur Candidate Experience.
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="flex items-center justify-center py-4 animate-fade-in">
              <div className="bg-tactflux-blue/10 text-tactflux-blue rounded-full p-2">
                <Check size={24} />
              </div>
              <p className="ml-3 text-white">Vielen Dank für Ihre Anmeldung!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Ihre E-Mail-Adresse" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="flex-grow bg-white/10 border-white/20 text-white focus:border-tactflux-blue/50"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-tactflux-blue hover:bg-tactflux-blue/90 text-white blue-neon-border whitespace-nowrap"
              >
                {isSubmitting ? 'Wird angemeldet...' : 'Abonnieren'}
              </Button>
            </form>
          )}
          
          <p className="text-xs text-gray-400 mt-4 text-center">
            Durch das Abonnieren stimmen Sie unseren Datenschutzbestimmungen zu. Sie können sich jederzeit abmelden.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
