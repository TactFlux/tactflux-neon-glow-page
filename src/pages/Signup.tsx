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

const formSchema = z.object({
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
  terms: z.boolean().refine((val) => val === true, {
    message: "Sie müssen die AGB akzeptieren."
  }),
});

const companyFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Der Firmenname muss mindestens 2 Zeichen lang sein.",
  }),
  industry: z.string().min(2, {
    message: "Bitte geben Sie eine Branche an.",
  }),
  companySize: z.enum(["1-10", "11-50", "51-200", "200+"], {
    required_error: "Bitte wählen Sie eine Unternehmensgröße aus.",
  }),
  companyEmail: z.string().email({
    message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  }),
  website: z.string().url({
    message: "Bitte geben Sie eine gültige URL ein.",
  }).optional(),
});

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      terms: false,
    },
  });

  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      companySize: "1-10" as const,
      companyEmail: "",
      website: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error("Fehler bei der Registrierung", {
          description: error.message,
        });
        return;
      }

      if (data.user) {
        setUserId(data.user.id);
        setCurrentStep(2);
        companyForm.setValue("companyEmail", values.email);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  const onCompanySubmit = async (values: z.infer<typeof companyFormSchema>) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: values.companyName,
          industry: values.industry,
          size: values.companySize as Database["public"]["Enums"]["company_size"],
          email: values.companyEmail,
          website: values.website || null,
        })
        .select()
        .single();

      if (companyError) {
        toast.error("Fehler beim Erstellen des Unternehmens", {
          description: companyError.message,
        });
        return;
      }

      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: userId,
        company_id: companyData.id,
        role: "admin",
      });

      if (roleError) {
        toast.error("Fehler beim Zuweisen der Benutzerrolle", {
          description: roleError.message,
        });
        return;
      }

      toast.success("Registrierung erfolgreich", {
        description: "Ihr Konto wurde erfolgreich erstellt.",
      });

      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Company registration error:", error);
      toast.error("Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tactflux-dark text-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto bg-tactflux-card p-8 rounded-lg shadow-lg border border-tactflux-border">
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-white">
              {currentStep === 1 ? "Konto erstellen" : "Unternehmensdaten"}
            </h1>
            <p className="text-gray-300 mt-2">
              {currentStep === 1
                ? "Erstellen Sie Ihr persönliches Konto bei TactFlux"
                : "Teilen Sie uns mehr über Ihr Unternehmen mit"}
            </p>
          </div>

          {currentStep === 1 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  {isLoading ? "Wird erstellt..." : "Konto erstellen"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...companyForm}>
              <form
                onSubmit={companyForm.handleSubmit(onCompanySubmit)}
                className="space-y-6"
              >
                <FormField
                  control={companyForm.control}
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
                  control={companyForm.control}
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
                  control={companyForm.control}
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
                  control={companyForm.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Firmen-E-Mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="kontakt@ihrefirma.de"
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
                  control={companyForm.control}
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
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-tactflux-border text-white bg-transparent hover:bg-tactflux-input hover:text-white"
                    onClick={() => setCurrentStep(1)}
                    disabled={isLoading}
                  >
                    Zurück
                  </Button>
                  <Button
                    type="submit"
                    variant="tactflux-gradient"
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Wird erstellt..." : "Registrierung abschließen"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
