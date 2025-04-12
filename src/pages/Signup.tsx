
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TactFluxLogo from "@/components/TactFluxLogo";

// Form schema für Validierung
const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Firmenname muss mindestens 2 Zeichen lang sein.",
  }),
  email: z.string().email({
    message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  }),
  password: z.string().min(8, {
    message: "Passwort muss mindestens 8 Zeichen lang sein.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
});

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted with values:", values);
      
      // Hier würde die Supabase-Integrationslogik kommen
      // Für die Demonstration simulieren wir einfach einen erfolgreichen Signup

      // Erfolgs-Toast anzeigen
      toast({
        title: "Konto erfolgreich erstellt!",
        description: "Sie werden weitergeleitet...",
      });

      // Nach kurzer Verzögerung zum Dashboard weiterleiten
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Fehler bei der Registrierung",
        description: "Bitte versuchen Sie es später erneut.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-tactflux-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="hero-glow absolute top-1/4 left-1/4 bg-tactflux-neon opacity-20"></div>
      <div className="hero-glow absolute bottom-1/4 right-1/4 bg-tactflux-blue opacity-20"></div>
      
      <div className="glass-card border border-white/10 p-8 rounded-xl w-full max-w-md backdrop-blur-md bg-black/40 relative z-10 shadow-card">
        <div className="mb-6 flex justify-center">
          <TactFluxLogo />
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Konto erstellen</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Firmenname</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Ihre Firma GmbH" 
                        {...field} 
                        className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue"
                      />
                      <Building className="absolute right-3 top-2.5 h-5 w-5 text-tactflux-blue" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">E-Mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="ihre.email@beispiel.de" 
                        {...field} 
                        className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue"
                      />
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-tactflux-blue" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Passwort</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Passwort eingeben" 
                        {...field} 
                        className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-tactflux-blue"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Passwort bestätigen</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Passwort wiederholen" 
                        {...field} 
                        className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-tactflux-blue"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              variant="tactflux-gradient"
              className="w-full font-medium mt-6 rounded-full"
            >
              Registrieren
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Bereits registriert?{" "}
            <Link to="/" className="text-tactflux-blue hover:text-tactflux-purple hover:underline transition-colors">
              Zur Anmeldung
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
