"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Pencil, Trash2, Search, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

type User = {
  id: string
  nom_complet: string | null
  email: string | null
  telephone: string
  role: string
  date_creation: string
  derniere_connexion: string | null
  auth_id: string | null
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    nom_complet: "",
    email: "",
    telephone: "",
    role: "user",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not initialized")

      const { data, error } = await supabase
        .from("utilisateurs")
        .select("*")
        .order("date_creation", { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error("Error fetching users:", error)
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      nom_complet: "",
      email: "",
      telephone: "",
      role: "user",
    })
  }

  const openAddDialog = () => {
    resetForm()
    setIsAddDialogOpen(true)
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      nom_complet: user.nom_complet || "",
      email: user.email || "",
      telephone: user.telephone,
      role: user.role,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not initialized")

      // Validate phone number format
      const phoneRegex = /^\+243[0-9]{9}$/
      if (!phoneRegex.test(formData.telephone)) {
        toast({
          title: "Format incorrect",
          description: "Le numéro de téléphone doit être au format +243 suivi de 9 chiffres",
          variant: "destructive",
        })
        return
      }

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("utilisateurs")
        .select("id")
        .eq("telephone", formData.telephone)
        .maybeSingle()

      if (existingUser) {
        toast({
          title: "Utilisateur existant",
          description: "Un utilisateur avec ce numéro de téléphone existe déjà",
          variant: "destructive",
        })
        return
      }

      // Create user
      const { error } = await supabase.from("utilisateurs").insert({
        nom_complet: formData.nom_complet,
        email: formData.email,
        telephone: formData.telephone,
        role: formData.role,
        date_creation: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Succès",
        description: "Utilisateur ajouté avec succès",
      })

      setIsAddDialogOpen(false)
      resetForm()
      fetchUsers()
    } catch (error) {
      console.error("Error adding user:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'utilisateur",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    setIsSubmitting(true)

    try {
      const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not initialized")

      // Validate phone number format
      const phoneRegex = /^\+243[0-9]{9}$/
      if (!phoneRegex.test(formData.telephone)) {
        toast({
          title: "Format incorrect",
          description: "Le numéro de téléphone doit être au format +243 suivi de 9 chiffres",
          variant: "destructive",
        })
        return
      }

      // Check if phone number is already used by another user
      if (formData.telephone !== selectedUser.telephone) {
        const { data: existingUser } = await supabase
          .from("utilisateurs")
          .select("id")
          .eq("telephone", formData.telephone)
          .neq("id", selectedUser.id)
          .maybeSingle()

        if (existingUser) {
          toast({
            title: "Numéro déjà utilisé",
            description: "Ce numéro de téléphone est déjà utilisé par un autre utilisateur",
            variant: "destructive",
          })
          return
        }
      }

      // Update user
      const { error } = await supabase
        .from("utilisateurs")
        .update({
          nom_complet: formData.nom_complet,
          email: formData.email,
          telephone: formData.telephone,
          role: formData.role,
        })
        .eq("id", selectedUser.id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Utilisateur mis à jour avec succès",
      })

      setIsEditDialogOpen(false)
      fetchUsers()
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'utilisateur",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    setIsSubmitting(true)

    try {
      const supabase = getSupabaseClient()
      if (!supabase) throw new Error("Supabase client not initialized")

      // Delete user
      const { error } = await supabase.from("utilisateurs").delete().eq("id", selectedUser.id)

      if (error) throw error

      toast({
        title: "Succès",
        description: "Utilisateur supprimé avec succès",
      })

      setIsDeleteDialogOpen(false)
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.telephone.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </Button>
          <Button size="sm" onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nom_complet || "Non défini"}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>{user.email || "Non défini"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : user.role === "staff"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.date_creation
                      ? formatDistanceToNow(new Date(user.date_creation), {
                          addSuffix: true,
                          locale: fr,
                        })
                      : "Inconnue"}
                  </TableCell>
                  <TableCell>
                    {user.derniere_connexion
                      ? formatDistanceToNow(new Date(user.derniere_connexion), {
                          addSuffix: true,
                          locale: fr,
                        })
                      : "Jamais"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(user)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openDeleteDialog(user)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
            <DialogDescription>Créez un nouvel utilisateur dans le système.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nom_complet">Nom complet</Label>
                <Input
                  id="nom_complet"
                  name="nom_complet"
                  value={formData.nom_complet}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
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
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select value={formData.role} onValueChange={handleRoleChange} disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="staff">Personnel</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Créer l'utilisateur"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>Modifiez les informations de l'utilisateur.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditUser}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit_nom_complet">Nom complet</Label>
                <Input
                  id="edit_nom_complet"
                  name="nom_complet"
                  value={formData.nom_complet}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_telephone">Téléphone</Label>
                <Input
                  id="edit_telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <p className="text-xs text-gray-500">Format: +243 suivi de 9 chiffres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_email">Email</Label>
                <Input
                  id="edit_email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_role">Rôle</Label>
                <Select value={formData.role} onValueChange={handleRoleChange} disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="staff">Personnel</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  "Mettre à jour"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l'utilisateur</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium">
              Utilisateur: {selectedUser?.nom_complet || selectedUser?.telephone || "Utilisateur inconnu"}
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteUser} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
