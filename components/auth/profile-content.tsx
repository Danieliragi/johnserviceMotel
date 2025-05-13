"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, User, Phone, Mail, LogOut } from "lucide-react"
import { supabase } from "@/lib/supabase"

type UserProfile = {
  id: string
  nom_complet: string | null
  telephone: string
  email: string
  role: string
  date_creation: string
}

export default function ProfileContent() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [formData, setFormData] = useState({
    nom_complet: "",
    telephone: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase.from("utilisateurs").select("*").eq("id", user.id).single()

        if (error) {
          console.error("Error fetching profile:", error)
          return
        }

        setProfile({
          ...data,
          email: user.email || "",
        })

        setFormData({
          nom_complet: data.nom_complet || "",
          telephone: data.telephone || "",
        })
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Validate phone number format
    const phoneRegex = /^\+243[0-9]{9}$/
    if (!phoneRegex.test(formData.telephone)) {
      toast({
        title: "Format incorrect",
        description: "Le numéro de téléphone doit être au format +243 suivi de 9 chiffres.",
        variant: "destructive",
      })
      return
    }

    setUpdating(true)

    try {
      const { error } = await supabase
        .from("utilisateurs")
        .update({
          nom_complet: formData.nom_complet,
          telephone: formData.telephone,
        })
        .eq("id", user.id)

      if (error) {
        toast({
          title: "Erreur",
          description: error.message || "Une erreur s'est produite lors de la mise à jour du profil.",
          variant: "destructive",
        })
        return
      }

      // Update local state
      setProfile((prev) => {
        if (!prev) return null
        return {
          ...prev,
          nom_complet: formData.nom_complet,
          telephone: formData.telephone,
        }
      })

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      })
    } catch (error) {
      console.error("Update error:", error)
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p>Impossible de charger les informations du profil.</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">Mon Profil</TabsTrigger>
        <TabsTrigger value="reservations">Mes Réservations</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Consultez et modifiez vos informations personnelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p>{profile.email}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-gray-500">Date d'inscription</p>
                  <p>{formatDate(profile.date_creation)}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="nom_complet">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nom complet
                    </div>
                  </Label>
                  <Input
                    id="nom_complet"
                    name="nom_complet"
                    value={formData.nom_complet}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    disabled={updating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Téléphone (format: +243...)
                    </div>
                  </Label>
                  <Input
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="+243970000000"
                    disabled={updating}
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90" disabled={updating}>
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mise à jour...
                    </>
                  ) : (
                    "Mettre à jour le profil"
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <p className="text-sm text-gray-500">
              {profile.role === "admin" ? "Administrateur" : profile.role === "staff" ? "Personnel" : "Utilisateur"}
            </p>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="reservations" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Mes réservations</CardTitle>
            <CardDescription>Consultez l'historique de vos réservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>Vous n'avez pas encore de réservations.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
