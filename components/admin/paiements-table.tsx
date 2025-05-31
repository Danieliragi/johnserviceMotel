"use client"

import type React from "react"

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { useState } from "react"
import { DeleteIcon, EditIcon, MoreVerticalIcon } from "@chakra-ui/icons"
import { DeletePaiementModal } from "./delete-paiement-modal"
import { EditPaiementModal } from "./edit-paiement-modal"
import type { Paiement } from "@/types"

interface PaiementsTableProps {
  paiements: Paiement[]
  onPaiementUpdated: (updatedPaiement: Paiement) => void
  onPaiementDeleted: (paiementId: string) => void
}

export const PaiementsTable: React.FC<PaiementsTableProps> = ({ paiements, onPaiementUpdated, onPaiementDeleted }) => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(null)

  const handleEditPaiement = (paiement: Paiement) => {
    setSelectedPaiement(paiement)
    onEditOpen()
  }

  const handleDeletePaiement = (paiement: Paiement) => {
    setSelectedPaiement(paiement)
    onDeleteOpen()
  }

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Montant</Th>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paiements.map((paiement) => (
              <Tr key={paiement.id}>
                <Td>{paiement.id}</Td>
                <Td>{paiement.montant}</Td>
                <Td>{format(new Date(paiement.date), "PPP")}</Td>
                <Td>{paiement.type}</Td>
                <Td>{paiement.description}</Td>
                <Td>
                  <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<MoreVerticalIcon />} variant="outline" />
                    <MenuList>
                      <MenuItem icon={<EditIcon />} onClick={() => handleEditPaiement(paiement)}>
                        Modifier
                      </MenuItem>
                      <MenuItem icon={<DeleteIcon />} onClick={() => handleDeletePaiement(paiement)}>
                        Supprimer
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedPaiement && (
        <DeletePaiementModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          paiementId={selectedPaiement.id}
          paiementMontant={selectedPaiement.montant}
          onPaiementDeleted={onPaiementDeleted}
        />
      )}

      {selectedPaiement && (
        <EditPaiementModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          paiement={selectedPaiement}
          onPaiementUpdated={onPaiementUpdated}
        />
      )}
    </Box>
  )
}
