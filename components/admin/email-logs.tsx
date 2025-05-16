"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface EmailLog {
  id: string
  email_type: string
  recipient: string
  reservation_id: string
  status: string
  attempt_timestamp: string
  sent_timestamp: string | null
  error_message: string | null
  created_at: string
}

export function EmailLogs() {
  const [logs, setLogs] = useState<EmailLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from("email_logs").select("*").order("attempt_timestamp", { ascending: false })

        if (filter !== "all") {
          query = query.eq("status", filter)
        }

        if (search) {
          query = query.or(`recipient.ilike.%${search}%,reservation_id.ilike.%${search}%`)
        }

        const { data, error } = await query

        if (error) {
          console.error("Error fetching email logs:", error)
          return
        }

        setLogs(data || [])
      } catch (error) {
        console.error("Error in email logs component:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmailLogs()
  }, [filter, search])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEmailTypeLabel = (type: string) => {
    switch (type) {
      case "reservation_confirmation":
        return "Confirmation de réservation"
      case "status_update":
        return "Mise à jour de statut"
      case "reservation_reminder":
        return "Rappel de réservation"
      case "post_stay_thank_you":
        return "Remerciement après séjour"
      default:
        return type
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logs des emails</CardTitle>
        <CardDescription>Historique des emails envoyés aux clients</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="w-full sm:w-1/3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="sent">Envoyés</SelectItem>
                <SelectItem value="failed">Échoués</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-2/3">
            <div className="flex gap-2">
              <Input
                placeholder="Rechercher par email ou ID de réservation"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <Button variant="ghost" onClick={() => setSearch("")}>
                  Effacer
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Aucun log d'email trouvé</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Destinataire</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de tentative</TableHead>
                  <TableHead>Date d'envoi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{getEmailTypeLabel(log.email_type)}</TableCell>
                    <TableCell>{log.recipient}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status === "sent" ? "Envoyé" : log.status === "failed" ? "Échoué" : "En attente"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(log.attempt_timestamp), "dd MMM yyyy HH:mm", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      {log.sent_timestamp
                        ? format(new Date(log.sent_timestamp), "dd MMM yyyy HH:mm", { locale: fr })
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
