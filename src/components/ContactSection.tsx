
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MailIcon, MessageSquare, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would send this data to your backend
    toast({
      title: "Nachricht gesendet",
      description: "Wir werden uns in Kürze mit Ihnen in Verbindung setzen.",
      duration: 5000,
    });
  };

  return (
    <section className="section-container" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit für den nächsten <span className="neon-text">Schritt?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Kontaktieren Sie uns für eine Beratung oder um mehr über TactFlux zu erfahren.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="rounded-full bg-tactflux-neon/10 p-3 mr-4">
                  <MailIcon size={24} className="text-tactflux-neon" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">E-Mail</h3>
                  <p className="text-gray-400">info@tactflux.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="rounded-full bg-tactflux-blue/10 p-3 mr-4">
                  <MessageSquare size={24} className="text-tactflux-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Live Chat</h3>
                  <p className="text-gray-400">Verfügbar werktags von 9:00 - 17:00 Uhr</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 animate-scale-in">
            <h3 className="text-2xl font-bold mb-4">Schreiben Sie uns</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Ihr Name" 
                    required 
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-Mail</label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="ihre.email@beispiel.de" 
                    required 
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Betreff</label>
                <Input 
                  id="subject" 
                  name="subject" 
                  placeholder="Worum geht es?" 
                  required 
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Nachricht</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Ihre Nachricht..." 
                  rows={5} 
                  required 
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-tactflux-neon hover:bg-tactflux-neon/90 text-black neon-border w-full"
              >
                Nachricht senden <Send size={16} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
