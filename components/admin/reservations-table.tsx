"use client"

import type React from "react"

import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { useState } from "react"
import type { Reservation } from "@/types"
import { deleteReservation } from "@/api/reservations"

interface ReservationsTableProps {
  reservations: Reservation[]
  refetchReservations: () => void
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({ reservations, refetchReservations }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null)
  const toast = useToast()

  const handleDeleteConfirmation = (reservationId: string) => {
    setSelectedReservationId(reservationId)
    onOpen()
  }

  const handleDelete = async () => {
    if (selectedReservationId) {
      try {
        await deleteReservation(selectedReservationId)
        toast({
          title: "Reservation deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        refetchReservations()
      } catch (error) {
        toast({
          title: "Error deleting reservation.",
          description: "Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      } finally {
        onClose()
        setSelectedReservationId(null)
      }
    }
  }

  return (
    <Box overflowX="auto">
      <Heading size="md" mb={4}>
        Reservations
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Guests</Th>
              <Th>Occasion</Th>
              <Th>Message</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservations.map((reservation) => (
              <Tr key={reservation.id}>
                <Td>{reservation.id}</Td>
                <Td>{reservation.name}</Td>
                <Td>{reservation.email}</Td>
                <Td>{reservation.phone}</Td>
                <Td>{format(new Date(reservation.date), "PPP")}</Td>
                <Td>{reservation.time}</Td>
                <Td>{reservation.guests}</Td>
                <Td>{reservation.occasion}</Td>
                <Td>{reservation.message}</Td>
                <Td>
                  <Button colorScheme="red" size="sm" onClick={() => handleDeleteConfirmation(reservation.id)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this reservation?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ReservationsTable
