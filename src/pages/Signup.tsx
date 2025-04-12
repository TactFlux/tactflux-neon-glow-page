
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import { toast } from "sonner";

// Validierungsschema für die Firmenregistrierung
const signupSchema = z.object({
  companyName: z.string().min(2, {
    message: "Der Firmenname muss mindestens 2 Zeichen lang sein.",
  }),
  industry: z.string().min(2, {
    message: "Bitte geben Sie eine Branche an.",
  }),
  companySize: z.enum(["1-10", "11-50", "51-200", "200+"], {
    required_error: "Bitte wählen Sie eine Unternehmensgröße aus.",
  }),
  website: z.string().url({
    message: "Bitte geben Sie eine gültige URL ein.",
  }).optional().or(z.literal("")),
  email: z.string().email({
    message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Das Passwort muss mindestens 8 Zeichen lang sein.",
    })
    .regex(/[A-Z]/, {
      message: "Das Passwort muss mindestens einen Großbuchstaben enthalten.",
    })
    .regex(/[a-z]/, {
      message: "Das Passwort muss mindestens einen Kleinbuchstaben enthalten.",
    })
    .regex(/[0-9]/, {
      message: "Das Passwort muss mindestens eine Zahl enthalten.",
    }),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Sie müssen die AGB akzeptieren."
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Die Passwörter stimmen nicht überein.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      companySize: "1-10",
      website: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      // Schritt 1: Benutzer erstellen
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (authError) {
        if (authError.message.includes("already")) {
          toast.error("Diese E-Mail wird bereits verwendet.");
        } else {
          toast.error("Fehler bei der Registrierung", {
            description: authError.message,
          });
        }
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        toast.error("Benutzer konnte nicht erstellt werden");
        setIsLoading(false);
        return;
      }

      const userId = authData.user.id;

      // Schritt 2: Firmendaten speichern
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: values.companyName,
          industry: values.industry,
          size: values.companySize as Database["public"]["Enums"]["company_size"],
          email: values.email,
          website: values.website || null,
        })
        .select()
        .single();

      if (companyError) {
        toast.error("Fehler beim Erstellen des Unternehmens", {
          description: companyError.message,
        });
        setIsLoading(false);
        return;
      }

      // Schritt 3: Benutzerrolle zuweisen
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: userId,
        company_id: companyData.id,
        role: "admin",
      });

      if (roleError) {
        toast.error("Fehler beim Zuweisen der Benutzerrolle", {
          description: roleError.message,
        });
        setIsLoading(false);
        return;
      }

      toast.success("Registrierung erfolgreich", {
        description: "Ihr Konto wurde erfolgreich erstellt.",
      });

      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Registrierungsfehler:", error);
      toast.error("Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tactflux-dark text-white">
      <Header />
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="max-w-md mx-auto bg-tactflux-card p-8 rounded-lg shadow-lg border border-tactflux-border">
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-white">Unternehmensregistrierung</h1>
            <p className="text-gray-300 mt-2">
              Erstellen Sie Ihr Firmenkonto bei TactFlux
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Firmenname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="TactFlux GmbH"
                        {...field}
                        className="bg-tactflux-input border-tactflux-border text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Branche</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="IT, Gesundheit, etc."
                        {...field}
                        className="bg-tactflux-input border-tactflux-border text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Unternehmensgröße</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-tactflux-border bg-tactflux-input text-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tactflux-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="1-10">1-10 Mitarbeiter</option>
                        <option value="11-50">11-50 Mitarbeiter</option>
                        <option value="51-200">51-200 Mitarbeiter</option>
                        <option value="200+">Über 200 Mitarbeiter</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Website (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.ihrefirma.de"
                        {...field}
                        className="bg-tactflux-input border-tactflux-border text-white"
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        placeholder="ihre.email@beispiel.de"
                        {...field}
                        autoComplete="email"
                        className="bg-tactflux-input border-tactflux-border text-white"
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        autoComplete="new-password"
                        className="bg-tactflux-input border-tactflux-border text-white"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      Mindestens 8 Zeichen, ein Großbuchstabe, ein
                      Kleinbuchstabe und eine Zahl.
                    </FormDescription>
                    <FormMessage />
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
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        autoComplete="new-password"
                        className="bg-tactflux-input border-tactflux-border text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-tactflux-blue"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-white">
                        Ich akzeptiere die{" "}
                        <a
                          href="#"
                          className="text-tactflux-blue hover:underline"
                        >
                          Allgemeinen Geschäftsbedingungen
                        </a>{" "}
                        und{" "}
                        <a
                          href="#"
                          className="text-tactflux-blue hover:underline"
                        >
                          Datenschutzrichtlinien
                        </a>
                        .
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                variant="tactflux-gradient"
                disabled={isLoading}
              >
                {isLoading ? "Wird registriert..." : "Registrierung abschließen"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
