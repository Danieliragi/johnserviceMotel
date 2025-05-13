"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export function LoginForm() {
  const [telephone, setTelephone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await login(telephone)

      if (result.success) {
        setMessage({ type: "success", text: "Connexion réussie! Redirection..." })
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Une erreur est survenue lors de la connexion" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Connexion</CardTitle>
        <CardDescription>Entrez votre numéro de téléphone pour vous connecter</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telephone">Numéro de téléphone</Label>
            <Input
              id="telephone"
              placeholder="+243XXXXXXXXX"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">Format: +243 suivi de 9 chiffres</p>
          </div>

          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center">
          <Link href="/auth/forgot-password" className="text-primary hover:underline">
            Mot de passe oublié?
          </Link>
        </div>
        <div className="text-sm text-center">
          Pas encore de compte?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            S'inscrire
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default LoginForm
