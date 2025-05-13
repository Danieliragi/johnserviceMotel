import type { Metadata } from "next"
import StandardRoomClientPage from "./StandardRoomClientPage"

export const metadata: Metadata = {
  title: "Chambre Standard - JohnService Motel",
  description:
    "Découvrez notre chambre Standard confortable avec lit queen size, salle de bain privée et toutes les commodités essentielles pour un séjour agréable.",
}

export default function StandardRoomPage() {
  return <StandardRoomClientPage />
}
