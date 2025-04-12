
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, User, Mail, Building, Globe, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";

// Form schema für Validierung
const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Firmenname muss mindestens 2 Zeichen lang sein."
  }),
  industry: z.string().min(1, {
    message: "Bitte wählen Sie eine Branche aus."
  }),
  companySize: z.string().min(1, {
    message: "Bitte wählen Sie eine Unternehmensgröße aus."
  }),
  website: z.string().url({
    message: "Bitte geben Sie eine gültige URL ein."
  }).optional().or(z.literal('')),
  email: z.string().email({
    message: "Bitte geben Sie eine gültige E-Mail-Adresse ein."
  }),
  password: z.string().min(8, {
    message: "Passwort muss mindestens 8 Zeichen lang sein."
  }).regex(/^(?=.*[A-Z])(?=.*[0-9])/, {
    message: "Passwort muss mindestens einen Großbuchstaben und eine Zahl enthalten."
  }),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Sie müssen die AGB und Datenschutzerklärung akzeptieren.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"]
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
      industry: "",
      companySize: "",
      website: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    }
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted with values:", values);

      // Hier würde die Supabase-Integrationslogik kommen:
      // 1. Erstelle neuen Eintrag in 'companies' Tabelle
      // 2. Erstelle neuen User mit Supabase Auth
      // 3. Speichere User-Informationen in 'users' Tabelle mit Verknüpfung zu company_id und role="admin"
      // 4. Logge User automatisch ein
      // 5. Speichere user, role, companyId in sessionStorage oder Context

      // Erfolgs-Toast anzeigen
      toast({
        title: "Konto erfolgreich erstellt!",
        description: "Sie werden weitergeleitet..."
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
        description: "Bitte versuchen Sie es später erneut."
      });
    }
  };

  const industries = [
    "Automobil", "Bauwesen", "Bildung", "Dienstleistungen", "E-Commerce",
    "Energie", "Finanzen", "Gesundheitswesen", "Handel", "Immobilien",
    "IT & Software", "Logistik", "Maschinenbau", "Medien", "Telekommunikation",
    "Tourismus", "Versicherungen", "Sonstige"
  ];

  const companySizes = [
    { value: "1-10", label: "1–10 Mitarbeiter" },
    { value: "11-50", label: "11–50 Mitarbeiter" },
    { value: "51-200", label: "51–200 Mitarbeiter" },
    { value: "200+", label: "200+ Mitarbeiter" }
  ];

  return (
    <div className="min-h-screen bg-tactflux-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="hero-glow absolute top-1/4 left-1/4 bg-tactflux-neon opacity-20"></div>
      <div className="hero-glow absolute bottom-1/4 right-1/4 bg-tactflux-blue opacity-20"></div>
      
      <div className="glass-card border border-white/10 p-8 rounded-xl w-full max-w-2xl backdrop-blur-md bg-black/40 relative z-10 shadow-card">
        <div className="mb-8 flex justify-center my-6">
          <Logo />
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Unternehmenskonto erstellen</h1>
        <p className="mb-8 text-gray-300 text-center">
          Registrieren Sie Ihr Unternehmen und profitieren Sie von unseren Services.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Firmenname */}
              <FormField control={form.control} name="companyName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Firmenname</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Ihre Firma GmbH" {...field} className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue" />
                      <Building className="absolute right-3 top-2.5 h-5 w-5 text-tactflux-blue" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              {/* Branche */}
              <FormField control={form.control} name="industry" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Branche</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <div className="relative">
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-tactflux-blue">
                          <SelectValue placeholder="Branche auswählen" />
                        </SelectTrigger>
                        <Briefcase className="absolute right-10 top-2.5 h-5 w-5 text-tactflux-blue pointer-events-none" />
                      </div>
                    </FormControl>
                    <SelectContent className="max-h-[300px] bg-black/90 border-white/20 text-white">
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry} className="focus:bg-white/10 focus:text-white">
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              {/* Unternehmensgröße */}
              <FormField control={form.control} name="companySize" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Unternehmensgröße</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <div className="relative">
                        <SelectTrigger className="bg-white/10 border-white/20 text-white focus:ring-tactflux-blue">
                          <SelectValue placeholder="Unternehmensgröße wählen" />
                        </SelectTrigger>
                        <Users className="absolute right-10 top-2.5 h-5 w-5 text-tactflux-blue pointer-events-none" />
                      </div>
                    </FormControl>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      {companySizes.map(size => (
                        <SelectItem key={size.value} value={size.value} className="focus:bg-white/10 focus:text-white">
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              {/* Firmen-Website */}
              <FormField control={form.control} name="website" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Firmen-Website (optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="https://www.example.com" {...field} className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue" />
                      <Globe className="absolute right-3 top-2.5 h-5 w-5 text-tactflux-blue" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              {/* E-Mail */}
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Firmen-E-Mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="kontakt@ihre-firma.de" {...field} className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue" />
                      <Mail className="absolute right-3 top-2.5 h-5 w-5 text-tactflux-blue" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              {/* Passwort */}
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Passwort</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 Zeichen inkl. Großbuchstabe und Zahl"
                        {...field}
                        className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue pr-12"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-tactflux-blue"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />

              {/* Passwort bestätigen */}
              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Passwort bestätigen</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Passwort wiederholen"
                        {...field}
                        className="bg-white/10 border-white/20 text-white focus-visible:ring-tactflux-blue pr-12"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-tactflux-blue"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )} />
            </div>

            {/* AGB & Datenschutz Checkbox */}
            <FormField control={form.control} name="termsAccepted" render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-tactflux-blue data-[state=checked]:border-tactflux-blue"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-gray-300 text-sm font-normal">
                    Ich akzeptiere die <Link to="/agb" className="text-tactflux-blue hover:underline">AGB</Link> und 
                    <Link to="/datenschutz" className="text-tactflux-blue hover:underline"> Datenschutzerklärung</Link>
                  </FormLabel>
                  <FormMessage className="text-red-400" />
                </div>
              </FormItem>
            )} />

            <Button 
              type="submit" 
              variant="tactflux-gradient" 
              className="w-full font-medium mt-8 py-6 rounded-full"
            >
              Unternehmen registrieren
            </Button>
          </form>
        </Form>

        <div className="mt-8 text-center">
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
