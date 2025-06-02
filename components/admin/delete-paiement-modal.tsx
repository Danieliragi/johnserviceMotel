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
import { useToast } from "@/hooks/use-toast"

interface DeletePaiementModalProps {
  isOpen: boolean
  onClose: () => void
  paiementId: string
  paiementMontant: number
  onPaiementDeleted: (paiementId: string) => void
}

export const DeletePaiementModal: React.FC<DeletePaiementModalProps> = ({
  isOpen,
  onClose,
  paiementId,
  paiementMontant,
  onPaiementDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/paiements/${paiementId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du paiement")
      }

      onPaiementDeleted(paiementId)
      toast({
        title: "Paiement supprimé",
        description: "Le paiement a été supprimé avec succès.",
      })
      onClose()
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du paiement.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer le paiement</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce paiement de {paiementMontant}€ ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
