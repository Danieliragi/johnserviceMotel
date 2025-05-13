"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, CheckCircle, Clock, Filter, MoreHorizontal, Trash2, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

type NotificationType = "reservation" | "payment" | "message" | "system" | "maintenance"
type NotificationPriority = "high" | "medium" | "low"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: NotificationPriority
  actionUrl?: string
  user?: {
    name: string
    email: string
  }
}

// Données fictives pour les notifications
const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "reservation",
    title: "Nouvelle réservation",
    message: "Jean Dupont a réservé une chambre Premium pour 3 nuits à partir du 15 mai.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    priority: "medium",
    actionUrl: "/admin/reservations/123",
    user: {
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
    },
  },
  {
    id: "notif-2",
    type: "payment",
    title: "Paiement reçu",
    message: "Un paiement de 450€ a été reçu pour la réservation #REF-2023-0589.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
    priority: "medium",
    actionUrl: "/admin/payments/456",
  },
  {
    id: "notif-3",
    type: "message",
    title: "Nouveau message client",
    message: "Marie Laurent a envoyé un message concernant sa réservation du 20 mai.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    read: true,
    priority: "high",
    actionUrl: "/admin/messages/789",
    user: {
      name: "Marie Laurent",
      email: "marie.laurent@example.com",
    },
  },
  {
    id: "notif-4",
    type: "system",
    title: "Mise à jour système",
    message: "Le système de réservation a été mis à jour vers la version 2.5.0.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    priority: "low",
  },
  {
    id: "notif-5",
    type: "maintenance",
    title: "Alerte maintenance",
    message: "La chambre 203 nécessite une intervention de plomberie urgente.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    priority: "high",
    actionUrl: "/admin/maintenance/101",
  },
  {
    id: "notif-6",
    type: "reservation",
    title: "Réservation annulée",
    message: "La réservation #REF-2023-0590 a été annulée par le client.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    read: false,
    priority: "medium",
    actionUrl: "/admin/reservations/124",
  },
  {
    id: "notif-7",
    type: "system",
    title: "Sauvegarde automatique",
    message: "La sauvegarde quotidienne des données a été effectuée avec succès.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    read: true,
    priority: "low",
  },
]

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "reservation":
      return <Clock className="h-5 w-5 text-blue-500" />
    case "payment":
      return <div className="text-green-500">💰</div>
    case "message":
      return <div className="text-purple-500">✉️</div>
    case "system":
      return <div className="text-gray-500">🔧</div>
    case "maintenance":
      return <div className="text-red-500">🔨</div>
    default:
      return <Bell className="h-5 w-5" />
  }
}

function getNotificationBadge(type: NotificationType) {
  switch (type) {
    case "reservation":
      return (
        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
          Réservation
        </Badge>
      )
    case "payment":
      return (
        <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
          Paiement
        </Badge>
      )
    case "message":
      return (
        <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
          Message
        </Badge>
      )
    case "system":
      return (
        <Badge variant="outline" className="border-gray-200 bg-gray-50 text-gray-700">
          Système
        </Badge>
      )
    case "maintenance":
      return (
        <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
          Maintenance
        </Badge>
      )
    default:
      return <Badge variant="outline">Notification</Badge>
  }
}

function getPriorityIndicator(priority: NotificationPriority) {
  switch (priority) {
    case "high":
      return <span className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-l-md" />
    case "medium":
      return <span className="absolute left-0 top-0 h-full w-1 bg-yellow-500 rounded-l-md" />
    case "low":
      return <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l-md" />
    default:
      return null
  }
}

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredNotifications = notifications.filter((notification) => {
    // Filtrer par onglet (tous, non lus, lus)
    if (activeTab === "unread" && notification.read) return false
    if (activeTab === "read" && !notification.read) return false

    // Filtrer par type
    if (typeFilter !== "all" && notification.type !== typeFilter) return false

    return true
  })

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: false } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Gérez vos notifications et restez informé des activités importantes du motel
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                Toutes <span className="ml-1 text-xs">({notifications.length})</span>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Non lues <span className="ml-1 text-xs">({unreadCount})</span>
              </TabsTrigger>
              <TabsTrigger value="read">
                Lues <span className="ml-1 text-xs">({notifications.length - unreadCount})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filtrer par type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="reservation">Réservations</SelectItem>
                <SelectItem value="payment">Paiements</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="system">Système</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Centre de notifications</CardTitle>
            <CardDescription>
              {filteredNotifications.length > 0
                ? `${filteredNotifications.length} notification${filteredNotifications.length > 1 ? "s" : ""}`
                : "Aucune notification"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">Aucune notification</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "unread"
                    ? "Vous avez lu toutes vos notifications."
                    : activeTab === "read"
                      ? "Vous n'avez pas encore de notifications lues."
                      : "Vous n'avez pas encore de notifications."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative flex items-start p-4 rounded-md border ${
                      notification.read ? "bg-background" : "bg-muted/30"
                    }`}
                  >
                    {getPriorityIndicator(notification.priority)}
                    <div className="mr-4 mt-0.5">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${notification.read ? "" : "font-semibold"}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-2">
                          {getNotificationBadge(notification.type)}
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: fr })}
                          </span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {notification.read ? (
                                <DropdownMenuItem onClick={() => markAsUnread(notification.id)}>
                                  Marquer comme non lu
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  Marquer comme lu
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      {notification.user && (
                        <div className="flex items-center gap-1 mt-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {notification.user.name} ({notification.user.email})
                          </span>
                        </div>
                      )}
                      {notification.actionUrl && (
                        <div className="mt-2">
                          <Button variant="link" size="sm" className="h-auto p-0 text-sm" asChild>
                            <a href={notification.actionUrl}>Voir les détails</a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
