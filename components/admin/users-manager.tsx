"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Pencil, Trash2, Shield, User, UserCog, Phone } from "lucide-react"
import { toast } from "@/hooks/use-toast"

type UserType = {
  id: string
  role: string
  telephone: string
  nom_complet: string | null
  date_creation: string
  derniere_connexion: string | null
}

export default function UsersManager() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState({
    role: "user",
    telephone: "",
    nom_complet: "",
  })

  // Charger les utilisateurs
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/utilisateurs")
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs")
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingUser) {
        // Mise à jour d'un utilisateur existant
        const response = await fetch(`/api/utilisateurs/${editingUser.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Erreur lors de la mise à jour")
        }

        toast({
          title: "Succès",
          description: "Utilisateur mis à jour avec succès",
        })
      } else {
        // Création d'un nouvel utilisateur
        const response = await fetch("/api/utilisateurs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Erreur lors de la création")
        }

        toast({
          title: "Succès",
          description: "Nouvel utilisateur créé avec succès",
        })
      }

      // Réinitialiser le formulaire et rafraîchir la liste
      resetForm()
      fetchUsers()
    } catch (error: any) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (user: UserType) => {
    setEditingUser(user)
    setFormData({
      role: user.role,
      telephone: user.telephone,
      nom_complet: user.nom_complet || "",
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return
    }

    try {
      const response = await fetch(`/api/utilisateurs/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      toast({
        title: "Succès",
        description: "Utilisateur supprimé avec succès",
      })

      fetchUsers()
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingUser(null)
    setFormData({
      role: "user",
      telephone: "",
      nom_complet: "",
    })
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <Shield className="w-3 h-3 mr-1" /> Admin
          </Badge>
        )
      case "staff":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <UserCog className="w-3 h-3 mr-1" /> Staff
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <User className="w-3 h-3 mr-1" /> Utilisateur
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Jamais"
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel Utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone (format: +243...)</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  placeholder="+243970000000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nom_complet">Nom complet</Label>
                <Input
                  id="nom_complet"
                  name="nom_complet"
                  value={formData.nom_complet}
                  onChange={handleInputChange}
                  placeholder="Pascal Mumbere"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="staff">Personnel</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Annuler
                  </Button>
                </DialogClose>
                <Button type="submit">{editingUser ? "Mettre à jour" : "Ajouter"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-10">Chargement des utilisateurs...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.nom_complet || "Non spécifié"}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {user.telephone}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{formatDate(user.date_creation)}</TableCell>
                    <TableCell>{formatDate(user.derniere_connexion)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => handleEdit(user)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Modifier l'utilisateur</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="telephone">Téléphone</Label>
                                <Input
                                  id="telephone"
                                  name="telephone"
                                  value={formData.telephone}
                                  onChange={handleInputChange}
                                  placeholder="+243970000000"
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="nom_complet">Nom complet</Label>
                                <Input
                                  id="nom_complet"
                                  name="nom_complet"
                                  value={formData.nom_complet}
                                  onChange={handleInputChange}
                                  placeholder="Pascal Mumbere"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="role">Rôle</Label>
                                <Select value={formData.role} onValueChange={handleRoleChange}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un rôle" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                    <SelectItem value="staff">Personnel</SelectItem>
                                    <SelectItem value="user">Utilisateur</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Annuler
                                  </Button>
                                </DialogClose>
                                <Button type="submit">Mettre à jour</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <Button variant="destructive" size="icon" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
