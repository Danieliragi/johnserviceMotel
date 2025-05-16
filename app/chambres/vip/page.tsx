import type { Metadata } from "next"
import VIPRoomClientPage from "./VIPRoomClientPage"

export const metadata: Metadata = {
  title: "Chambre VIP - JohnService Motel",
  description:
    "Découvrez notre chambre VIP avec lit double confortable, coin salon et décoration élégante. Le summum du confort pour votre séjour au JohnService Motel.",
}

export default function VIPRoomPage() {
  return <VIPRoomClientPage />
}
