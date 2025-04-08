
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MailIcon, MessageSquare, Send, CheckCircle } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Nachricht gesendet",
        description: "Wir werden uns in Kürze mit Ihnen in Verbindung setzen.",
        duration: 5000
      });
      
      // Reset form after some time
      setTimeout(() => {
        setIsSubmitted(false);
        if (formRef.current) formRef.current.reset();
      }, 3000);
    }, 1500);
  };
  
  return (
    <section className="section-container relative" id="contact">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-tactflux-neon opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-tactflux-blue opacity-5 blur-3xl rounded-full"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal-on-scroll opacity-0">
            <span className="inline-block px-3 py-1 mb-3 rounded-full bg-tactflux-blue/10 backdrop-blur-sm border border-tactflux-blue/30">
              <span className="text-tactflux-blue text-sm font-medium">Kontakt</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-left">
              Bereit für die <span className="neon-text">API-Integration?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 text-left">
              Kontaktieren Sie uns für eine Beratung oder Demo-Zugang zur TactFlux API.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start glass-card p-4 hover:bg-white/5 transition-colors duration-300">
                <div className="rounded-full bg-tactflux-neon/10 p-3 mr-4">
                  <MailIcon size={24} className="text-tactflux-neon" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium mb-1">E-Mail</h3>
                  <p className="text-gray-400">api@tactflux.com</p>
                </div>
              </div>
              
              <div className="flex items-start glass-card p-4 hover:bg-white/5 transition-colors duration-300">
                <div className="rounded-full bg-tactflux-blue/10 p-3 mr-4">
                  <MessageSquare size={24} className="text-tactflux-blue" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-medium mb-1">Live Support</h3>
                  <p className="text-gray-400">Verfügbar werktags von 9:00 - 17:00 Uhr</p>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-tactflux-success"></div>
                  <span className="text-sm text-gray-300">API-Dokumentation jetzt verfügbar</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 reveal-on-scroll opacity-0 relative overflow-hidden">
            {/* Animated gradients in the background */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-tactflux-neon/10 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-tactflux-blue/10 blur-3xl rounded-full"></div>
            
            <div className="relative">
              <h3 className="text-2xl font-bold mb-4">API-Zugang anfragen</h3>
              
              {isSubmitted ? (
                <div className="py-10 flex flex-col items-center text-tactflux-success animate-scale-in">
                  <CheckCircle size={48} className="mb-4" />
                  <h4 className="text-xl font-medium mb-2">Anfrage gesendet!</h4>
                  <p className="text-gray-300">Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Ihr Name" 
                        required 
                        className="bg-white/5 border-white/10 text-white focus:border-tactflux-blue/50 transition-colors" 
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
                        className="bg-white/5 border-white/10 text-white focus:border-tactflux-blue/50 transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Unternehmen</label>
                    <Input 
                      id="company" 
                      name="company" 
                      placeholder="Ihr Unternehmen" 
                      required 
                      className="bg-white/5 border-white/10 text-white focus:border-tactflux-blue/50 transition-colors" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Betreff</label>
                    <Input 
                      id="subject" 
                      name="subject" 
                      placeholder="API-Integration / Demo" 
                      required 
                      className="bg-white/5 border-white/10 text-white focus:border-tactflux-blue/50 transition-colors" 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Nachricht</label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Ihre Anfrage zur TactFlux API..." 
                      rows={4} 
                      required 
                      className="bg-white/5 border-white/10 text-white focus:border-tactflux-blue/50 transition-colors" 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full font-medium bg-gradient-to-r from-tactflux-neon via-tactflux-purple to-tactflux-blue hover:opacity-90 text-black border-none"
                  >
                    {isSubmitting ? (
                      <>Wird gesendet<span className="loading-dots"></span></>
                    ) : (
                      <>API-Zugang anfragen <Send size={16} className="ml-2" /></>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
