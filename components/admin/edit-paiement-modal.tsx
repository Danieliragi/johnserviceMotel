"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Paiement {
  id: string
  montant: number
  date: string
  type: string
  description: string
}

interface EditPaiementModalProps {
  isOpen: boolean
  onClose: () => void
  paiement: Paiement
  onPaiementUpdated: (updatedPaiement: Paiement) => void
}

export const EditPaiementModal: React.FC<EditPaiementModalProps> = ({
  isOpen,
  onClose,
  paiement,
  onPaiementUpdated,
}) => {
  const [formData, setFormData] = useState({
    montant: paiement.montant.toString(),
    date: paiement.date.split("T")[0], // Format YYYY-MM-DD for input
    type: paiement.type,
    description: paiement.description,
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/paiements/${paiement.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          montant: Number.parseFloat(formData.montant),
          date: formData.date,
          type: formData.type,
          description: formData.description,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du paiement")
      }

      const updatedPaiement = await response.json()
      onPaiementUpdated(updatedPaiement)
      toast({
        title: "Paiement mis à jour",
        description: "Le paiement a été mis à jour avec succès.",
      })
      onClose()
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du paiement.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le paiement</DialogTitle>
          <DialogDescription>Modifiez les informations du paiement ci-dessous.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="montant" className="text-right">
                Montant
              </Label>
              <Input
                id="montant"
                type="number"
                step="0.01"
                value={formData.montant}
                onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carte">Carte bancaire</SelectItem>
                  <SelectItem value="especes">Espèces</SelectItem>
                  <SelectItem value="cheque">Chèque</SelectItem>
                  <SelectItem value="virement">Virement</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isUpdating}>
              Annuler
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
