"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface ActivityItem {
  id: string
  type: "reservation" | "payment" | "checkin" | "checkout" | "message" | "review"
  title: string
  description: string
  timestamp: Date
  user?: {
    name: string
    email: string
    avatar?: string
  }
  status?: "success" | "pending" | "error" | "warning"
}

const mockActivities: ActivityItem[] = [
  {
    id: "act-1",
    type: "reservation",
    title: "Nouvelle réservation",
    description: "Chambre Premium pour 3 nuits",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    user: {
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      avatar: "/diverse-avatars.png",
    },
    status: "success",
  },
  {
    id: "act-2",
    type: "payment",
    title: "Paiement reçu",
    description: "450€ pour la réservation #REF-2023-0589",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    user: {
      name: "Marie Laurent",
      email: "marie.laurent@example.com",
      avatar: "/diverse-avatars.png",
    },
    status: "success",
  },
  {
    id: "act-3",
    type: "checkin",
    title: "Check-in effectué",
    description: "Chambre 105 - Famille Martin",
    timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
    user: {
      name: "Pierre Martin",
      email: "pierre.martin@example.com",
    },
    status: "success",
  },
  {
    id: "act-4",
    type: "message",
    title: "Nouveau message",
    description: "Demande concernant le petit-déjeuner",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    user: {
      name: "Sophie Bernard",
      email: "sophie.bernard@example.com",
      avatar: "/diverse-avatars.png",
    },
    status: "pending",
  },
  {
    id: "act-5",
    type: "checkout",
    title: "Check-out effectué",
    description: "Chambre 203 - M. et Mme Dubois",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    user: {
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
    },
    status: "success",
  },
  {
    id: "act-6",
    type: "review",
    title: "Nouvel avis client",
    description: "4.5/5 - 'Excellent séjour, personnel attentionné'",
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    user: {
      name: "Claire Moreau",
      email: "claire.moreau@example.com",
      avatar: "/diverse-avatars.png",
    },
    status: "success",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "success":
      return "bg-green-500"
    case "pending":
      return "bg-yellow-500"
    case "error":
      return "bg-red-500"
    case "warning":
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

function getActivityBadge(type: string) {
  switch (type) {
    case "reservation":
      return (
        <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
          Réservation
        </Badge>
      )
    case "payment":
      return <Badge variant="success">Paiement</Badge>
    case "checkin":
      return (
        <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
          Check-in
        </Badge>
      )
    case "checkout":
      return (
        <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">
          Check-out
        </Badge>
      )
    case "message":
      return (
        <Badge variant="outline" className="border-primary/30 bg-primary/20 text-primary">
          Message
        </Badge>
      )
    case "review":
      return (
        <Badge variant="outline" className="border-pink-200 bg-pink-50 text-pink-700">
          Avis
        </Badge>
      )
    default:
      return <Badge variant="outline">Activité</Badge>
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>Les 6 dernières activités du motel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="relative mr-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activity.user?.avatar || "/placeholder.svg"} alt={activity.user?.name || ""} />
                  <AvatarFallback>
                    {activity.user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>
                {activity.status && (
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(activity.status)}`}
                  />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <div className="flex items-center gap-2">
                    {getActivityBadge(activity.type)}
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true, locale: fr })}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.user?.name} ({activity.user?.email})
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
