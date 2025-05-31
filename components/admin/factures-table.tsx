"use client"

import type React from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material"
import { format } from "date-fns"
import type { Facture } from "@/types"
import { useRouter } from "next/navigation"

interface FacturesTableProps {
  factures: Facture[]
}

const FacturesTable: React.FC<FacturesTableProps> = ({ factures }) => {
  const router = useRouter()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Client</TableCell>
            <TableCell align="right">Montant</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {factures.map((facture) => (
            <TableRow key={facture.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {facture.id}
              </TableCell>
              <TableCell align="right">{format(new Date(facture.date), "PPP")}</TableCell>
              <TableCell align="right">{facture.client}</TableCell>
              <TableCell align="right">{facture.montant}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => router.push(`/admin/factures/${facture.id}`)}>
                  Voir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FacturesTable
