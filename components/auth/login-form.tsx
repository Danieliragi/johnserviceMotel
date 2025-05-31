"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface LoginFormProps {
  isRegisterMode?: boolean
}

export default function LoginForm({ isRegisterMode = false }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      // Check if email already exists in the database
      const { data: existingUsers, error: checkError } = await supabase
        .from("utilisateurs")
        .select("id")
        .eq("email", email)
        .limit(1)

      if (checkError) {
        console.error("Error checking existing user:", checkError)
      }

      // Send magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      // If this is a new user and we're in register mode, create a profile
      if (isRegisterMode && (!existingUsers || existingUsers.length === 0)) {
        // Create a basic profile in the database
        const { error: profileError } = await supabase.from("utilisateurs").insert({
          email: email,
          role: "user",
          date_creation: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Error creating profile:", profileError)
          // Continue anyway as the auth was successful
        }
      }

      setSuccess("Lien de connexion envoyé ! Vérifiez votre boîte de réception.")
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte de réception pour vous connecter",
      })
    } catch (error: any) {
      console.error("Authentication error:", error)
      setError(error.message || "Une erreur est survenue lors de l'envoi du lien")

      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Vérifiez votre email et réessayez",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Recevoir un lien de connexion"
        )}
      </Button>
    </form>
  )
}
