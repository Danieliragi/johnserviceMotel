import type { Metadata } from "next"
import AvisClient from "./avis-client"

export const metadata: Metadata = {
  title: "Avis Clients | John Services Motel",
  description:
    "Découvrez ce que nos clients pensent de leur séjour au John Services Motel. Consultez les avis sur nos chambres, notre restaurant et nos salles de réunion.",
}

export default function AvisPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Avis de nos clients</h1>
        <p className="text-gray-600 max-w-2xl">
          Découvrez ce que nos clients pensent de leur séjour au John Services Motel. Nous sommes fiers de la qualité de
          nos services et de l'accueil que nous réservons à nos clients.
        </p>
      </div>

      <AvisClient />
    </div>
  )
}
