import type { Metadata } from "next"
import NotificationsClient from "./notifications-client"

export const metadata: Metadata = {
  title: "Notifications - JohnService Motel Admin",
  description: "Gérez vos notifications et alertes",
}

export default function NotificationsPage() {
  return <NotificationsClient />
}
