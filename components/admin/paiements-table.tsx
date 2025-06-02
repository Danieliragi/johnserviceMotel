"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeletePaiementModal } from "./delete-paiement-modal"
import { EditPaiementModal } from "./edit-paiement-modal"

interface Paiement {
  id: string
  montant: number
  date: string
  type: string
  description: string
}

interface PaiementsTableProps {
  paiements: Paiement[]
  onPaiementUpdated: (updatedPaiement: Paiement) => void
  onPaiementDeleted: (paiementId: string) => void
}

export const PaiementsTable: React.FC<PaiementsTableProps> = ({ paiements, onPaiementUpdated, onPaiementDeleted }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(null)

  const handleEditPaiement = (paiement: Paiement) => {
    setSelectedPaiement(paiement)
    setIsEditOpen(true)
  }

  const handleDeletePaiement = (paiement: Paiement) => {
    setSelectedPaiement(paiement)
    setIsDeleteOpen(true)
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paiements.map((paiement) => (
            <TableRow key={paiement.id}>
              <TableCell className="font-medium">{paiement.id}</TableCell>
              <TableCell>{paiement.montant}€</TableCell>
              <TableCell>{format(new Date(paiement.date), "dd/MM/yyyy")}</TableCell>
              <TableCell>{paiement.type}</TableCell>
              <TableCell>{paiement.description}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Ouvrir le menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditPaiement(paiement)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeletePaiement(paiement)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPaiement && (
        <DeletePaiementModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          paiementId={selectedPaiement.id}
          paiementMontant={selectedPaiement.montant}
          onPaiementDeleted={onPaiementDeleted}
        />
      )}

      {selectedPaiement && (
        <EditPaiementModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          paiement={selectedPaiement}
          onPaiementUpdated={onPaiementUpdated}
        />
      )}
    </div>
  )
}

export default PaiementsTable
