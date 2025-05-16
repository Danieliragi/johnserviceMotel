"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseClient } from "@/lib/supabase"

const formSchema = z
  .object({
    nom_complet: z.string().min(2, {
      message: "Le nom complet doit contenir au moins 2 caractères.",
    }),
    telephone: z
      .string()
      .min(10, {
        message: "Le numéro de téléphone doit contenir au moins 10 chiffres.",
      })
      .refine((val) => /^\+243[0-9]{9}$/.test(val), {
        message: "Le numéro de téléphone doit être au format +243 suivi de 9 chiffres.",
      }),
    email: z.string().email({
      message: "Veuillez entrer une adresse email valide.",
    }),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom_complet: "",
      telephone: "+243",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setErrorMessage(null)
      setSuccessMessage(null)
      setIsLoading(true)

      console.log("Form submitted", values)

      // Get Supabase client
      const supabase = getSupabaseClient()

      if (!supabase) {
        setErrorMessage("Service d'authentification non disponible")
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Service d'authentification non disponible",
        })
        return
      }

      // Check if user already exists by email
      const { data: existingUsersByEmail, error: emailCheckError } = await supabase
        .from("utilisateurs")
        .select("id")
        .eq("email", values.email)
        .maybeSingle()

      if (emailCheckError) {
        console.error("Error checking existing user by email:", emailCheckError)
        setErrorMessage(`Erreur lors de la vérification de l'email: ${emailCheckError.message}`)
        return
      }

      if (existingUsersByEmail) {
        setErrorMessage("Cette adresse email est déjà utilisée")
        return
      }

      // Check if user already exists by phone
      const { data: existingUsersByPhone, error: phoneCheckError } = await supabase
        .from("utilisateurs")
        .select("id")
        .eq("telephone", values.telephone)
        .maybeSingle()

      if (phoneCheckError) {
        console.error("Error checking existing user by phone:", phoneCheckError)
        setErrorMessage(`Erreur lors de la vérification du téléphone: ${phoneCheckError.message}`)
        return
      }

      if (existingUsersByPhone) {
        setErrorMessage("Ce numéro de téléphone est déjà utilisé")
        return
      }

      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })

      if (signUpError) {
        console.error("Error signing up:", signUpError)
        setErrorMessage(`Erreur lors de l'inscription: ${signUpError.message}`)
        return
      }

      if (!authData.user) {
        setErrorMessage("Erreur lors de la création du compte: Aucun utilisateur créé")
        return
      }

      // Create user profile
      const { error: profileError } = await supabase.from("utilisateurs").insert({
        auth_id: authData.user.id,
        email: values.email,
        nom_complet: values.nom_complet,
        telephone: values.telephone,
        role: "user",
        date_creation: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Error creating user profile:", profileError)
        setErrorMessage(`Erreur lors de la création du profil: ${profileError.message}`)
        return
      }

      // Success
      setSuccessMessage("Compte créé avec succès. Vous pouvez maintenant vous connecter.")
      toast({
        title: "Compte créé avec succès",
        description: "Vous pouvez maintenant vous connecter",
      })

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error: any) {
      console.error("Registration error:", error)
      setErrorMessage(error.message || "Une erreur est survenue lors de la création du compte")
      toast({
        variant: "destructive",
        title: "Erreur lors de la création du compte",
        description: error.message || "Veuillez réessayer plus tard",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Créer un compte</h1>
        <p className="text-gray-500">Entrez vos informations pour créer un compte</p>
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nom_complet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone (format: +243...)</FormLabel>
                <FormControl>
                  <Input placeholder="+243970000000" {...field} disabled={isLoading} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} disabled={isLoading} />
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création en cours...
              </>
            ) : (
              "Créer un compte"
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}
