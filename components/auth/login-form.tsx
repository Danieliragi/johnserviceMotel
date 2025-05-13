"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Cookies from "js-cookie"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulation de connexion avec des identifiants spécifiques
      if (email === "johnservicemotel@gmail.com" && password === "password123") {
        // Simuler un délai pour l'authentification
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Créer un utilisateur simulé
        const mockUser = {
          id: "mock-user-id",
          email: "johnservicemotel@gmail.com",
          user_metadata: {
            name: "Admin John Services",
            role: "admin",
          },
        }

        // Stocker l'utilisateur simulé dans le localStorage pour persister la session
        localStorage.setItem("mockUser", JSON.stringify(mockUser))

        // Définir un cookie pour que le middleware puisse détecter l'authentification simulée
        // Expiration de 7 jours
        Cookies.set("mockAuth", "true", { expires: 7, path: "/" })

        // Appeler signIn avec un objet simulé pour mettre à jour le contexte d'authentification
        await signIn(email, password, true, mockUser)

        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté en mode simulation.",
        })

        // Rediriger vers le tableau de bord admin
        router.push("/admin/dashboard")
        return
      }

      // Continuer avec le processus normal pour les autres identifiants
      const { error, success } = await signIn(email, password)

      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message || "Vérifiez vos identifiants et réessayez.",
          variant: "destructive",
        })
        return
      }

      if (success) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        })
        router.push("/")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Erreur de connexion",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Mot de passe</Label>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            onClick={() => router.push("/auth/forgot-password")}
          >
            Mot de passe oublié ?
          </button>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connexion en cours...
          </>
        ) : (
          "Se connecter"
        )}
      </Button>
    </form>
  )
}
