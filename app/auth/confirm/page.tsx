"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function ConfirmPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        const token_hash = searchParams.get("token_hash")
        const type = searchParams.get("type")
        const next = searchParams.get("next") ?? "/"

        if (token_hash && type) {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          })

          if (error) {
            setError("Lien invalide ou expiré. Veuillez demander un nouveau lien.")
            setLoading(false)
            return
          }

          if (data.user) {
            setSuccess(true)
            setLoading(false)

            // Check if user profile exists
            const { data: profile } = await supabase
              .from("utilisateurs")
              .select("*")
              .eq("auth_id", data.user.id)
              .single()

            // Wait a moment to show success message
            setTimeout(() => {
              if (!profile) {
                // Redirect to complete profile
                router.push("/auth/complete-profile")
              } else if (profile.role === "admin") {
                // Redirect admin to dashboard
                router.push("/admin/dashboard")
              } else {
                // Redirect regular user to reservations or home
                router.push(next.startsWith("/") ? next : "/")
              }
            }, 2000)
          }
        } else {
          setError("Lien de confirmation invalide.")
          setLoading(false)
        }
      } catch (err) {
        console.error("Error confirming email:", err)
        setError("Une erreur est survenue lors de la confirmation.")
        setLoading(false)
      }
    }

    handleEmailConfirmation()
  }, [searchParams, router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Confirmation de votre compte</CardTitle>
          <CardDescription>Vérification de votre lien de confirmation...</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {loading && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">Confirmation en cours...</p>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <p className="text-sm text-green-600 font-medium">Compte confirmé avec succès !</p>
              <p className="text-xs text-gray-500">Redirection en cours...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="h-8 w-8 text-red-600" />
              <p className="text-sm text-red-600 font-medium">{error}</p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/auth/login">Retour à la connexion</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
