"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, User, Mail, Phone, Shield, Calendar } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

export function ProfileManagement() {
  const { user, profile, refreshSession } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    nom_complet: "",
    telephone: "",
    email: "",
  })

  // Load user data
  useEffect(() => {
    if (profile) {
      setFormData({
        nom_complet: profile.nom_complet || "",
        telephone: profile.telephone || "",
        email: profile.email || "",
      })
    }
  }, [profile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const supabase = getSupabaseClient()
      if (!supabase || !profile) {
        throw new Error("Client non initialisé ou profil non disponible")
      }

      // Validate phone number format
      const phoneRegex = /^\+243[0-9]{9}$/
      if (!phoneRegex.test(formData.telephone)) {
        setMessage({
          type: "error",
          text: "Le numéro de téléphone doit être au format +243 suivi de 9 chiffres.",
        })
        return
      }

      // Update profile in database
      const { error } = await supabase
        .from("utilisateurs")
        .update({
          nom_complet: formData.nom_complet,
          telephone: formData.telephone,
        })
        .eq("id", profile.id)

      if (error) throw error

      // If email has changed, update it in auth
      if (user && formData.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email,
        })

        if (emailError) throw emailError

        setMessage({
          type: "success",
          text: "Profil mis à jour. Un email de vérification a été envoyé à votre nouvelle adresse email.",
        })
      } else {
        setMessage({
          type: "success",
          text: "Profil mis à jour avec succès.",
        })
      }

      // Refresh session to get updated user data
      await refreshSession()
    } catch (error) {
      console.error("Error updating profile:", error)
      setMessage({
        type: "error",
        text: "Une erreur s'est produite lors de la mise à jour du profil.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const supabase = getSupabaseClient()
      if (!supabase || !user?.email) {
        throw new Error("Client non initialisé ou email non disponible")
      }

      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Un email de réinitialisation de mot de passe a été envoyé à votre adresse email.",
      })
    } catch (error) {
      console.error("Error sending password reset:", error)
      setMessage({
        type: "error",
        text: "Une erreur s'est produite lors de l'envoi de l'email de réinitialisation.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Mon Profil</CardTitle>
        <CardDescription>Gérez vos informations personnelles et vos préférences</CardDescription>
      </CardHeader>

      <Tabs defaultValue="info">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-gray-100 rounded-full p-6 flex items-center justify-center">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-medium">{profile.nom_complet || "Utilisateur"}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  {profile.role === "admin" ? "Administrateur" : "Utilisateur"}
                </p>
                {user?.email && (
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                    {user.email_confirmed_at ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Vérifié</span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                        Non vérifié
                      </span>
                    )}
                  </p>
                )}
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {profile.telephone}
                </p>
                {profile.date_creation && (
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Membre depuis{" "}
                    {formatDistanceToNow(new Date(profile.date_creation), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </p>
                )}
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="nom_complet">Nom complet</Label>
                <Input
                  id="nom_complet"
                  name="nom_complet"
                  value={formData.nom_complet}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
                <p className="text-xs text-gray-500">Format: +243 suivi de 9 chiffres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSaving}
                />
                <p className="text-xs text-gray-500">
                  Si vous modifiez votre email, un lien de vérification sera envoyé à la nouvelle adresse.
                </p>
              </div>

              {message && (
                <Alert variant={message.type === "error" ? "destructive" : "default"}>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer les modifications"
                )}
              </Button>
            </form>
          </CardContent>
        </TabsContent>

        <TabsContent value="security">
          <CardContent className="space-y-4 pt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Sécurité du compte</h3>
              <p className="text-sm text-gray-600 mb-4">
                Vous pouvez modifier votre mot de passe ou activer l'authentification à deux facteurs pour renforcer la
                sécurité de votre compte.
              </p>

              <Button onClick={handleChangePassword} disabled={isLoading} variant="outline" className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Changer de mot de passe"
                )}
              </Button>
            </div>

            {message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter className="flex justify-between border-t pt-6">
        <p className="text-xs text-gray-500">
          Dernière connexion:{" "}
          {profile.derniere_connexion
            ? formatDistanceToNow(new Date(profile.derniere_connexion), {
                addSuffix: true,
                locale: fr,
              })
            : "Inconnue"}
        </p>
      </CardFooter>
    </Card>
  )
}
