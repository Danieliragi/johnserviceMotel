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
    mot_de_passe: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.mot_de_passe === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })

export default function ClientRegisterForm() {
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
      mot_de_passe: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setErrorMessage(null)
      setSuccessMessage(null)
      setIsLoading(true)

      // Envoyer les données à l'API
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom_complet: values.nom_complet,
          email: values.email,
          telephone: values.telephone,
          mot_de_passe: values.mot_de_passe, // Idéalement, ce mot de passe devrait être hashé côté serveur
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de la création du compte")
      }

      // Succès
      setSuccessMessage("Compte créé avec succès. Vous pouvez maintenant vous connecter.")
      toast({
        title: "Compte créé avec succès",
        description: "Vous pouvez maintenant vous connecter",
      })

      // Redirection après un court délai
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
        <h1 className="text-3xl font-bold">Créer un compte client</h1>
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
            name="mot_de_passe"
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
