"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function CompleteProfilePage() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    nom_complet: "",
    telephone: "",
  })
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        router.push("/auth/login")
        return
      }

      setUser(session.user)

      // Check if profile already exists
      const { data: profile } = await supabase.from("utilisateurs").select("*").eq("auth_id", session.user.id).single()

      if (profile) {
        // Profile exists, redirect based on role
        if (profile.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/reservations")
        }
      }
    }

    getUser()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      // Create user profile
      const { error } = await supabase.from("utilisateurs").insert({
        auth_id: user.id,
        email: user.email,
        nom_complet: formData.nom_complet,
        telephone: formData.telephone,
        role: "user",
        date_creation: new Date().toISOString(),
        derniere_connexion: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Profil créé avec succès",
        description: "Bienvenue sur John Services Motel !",
      })

      // Redirect to reservations page
      router.push("/reservations")
    } catch (error: any) {
      console.error("Error creating profile:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer votre profil. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complétez votre profil</CardTitle>
          <CardDescription>Quelques informations supplémentaires pour finaliser votre inscription</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom_complet">Nom complet *</Label>
              <Input
                id="nom_complet"
                type="text"
                value={formData.nom_complet}
                onChange={(e) => setFormData({ ...formData, nom_complet: e.target.value })}
                required
                placeholder="Votre nom complet"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                type="tel"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                placeholder="Votre numéro de téléphone"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création du profil...
                </>
              ) : (
                "Finaliser mon inscription"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
