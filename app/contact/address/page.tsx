import type { Metadata } from "next"
import AddressPageClient from "./AddressPageClient"

export const metadata: Metadata = {
  title: "Adresse et Localisation - John Services Motel",
  description:
    "Trouvez facilement le John Services Motel à Goma. Adresse complète, coordonnées GPS et informations pratiques pour votre visite.",
}

export default function AddressPage() {
  return <AddressPageClient />
}
