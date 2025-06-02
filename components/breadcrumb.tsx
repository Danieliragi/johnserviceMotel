"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function Breadcrumb() {
  const pathname = usePathname()

  // Si nous sommes sur la page d'accueil, ne pas afficher le breadcrumb
  if (pathname === "/") return null

  // Diviser le chemin en segments
  const segments = pathname.split("/").filter(Boolean)

  // Créer les éléments du breadcrumb
  const breadcrumbItems = segments.map((segment, index) => {
    // Construire le chemin pour ce segment
    const href = `/${segments.slice(0, index + 1).join("/")}`

    // Formater le texte du segment (première lettre en majuscule, remplacer les tirets par des espaces)
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

    // Traductions spécifiques pour certains segments
    const translations: Record<string, string> = {
      chambres: "Chambres",
      services: "Services",
      hebergement: "Hébergement",
      restaurant: "Restaurant",
      "salles-reunion": "Salles de réunion",
      tarifs: "Tarifs",
      avis: "Avis",
      localisation: "Localisation",
      contact: "Contact",
      standard: "Standard",
      deluxe: "De Luxe",
      vip: "VIP",
      auth: "Authentification",
      login: "Connexion",
      register: "Inscription",
      profile: "Profil",
      admin: "Administration",
    }

    if (translations[segment]) {
      label = translations[segment]
    }

    return {
      href,
      label,
      isCurrent: index === segments.length - 1,
    }
  })

  return (
    <nav aria-label="Fil d'Ariane" className="py-3 px-4 bg-gray-50 rounded-md mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-gray-500 hover:text-primary transition-colors flex items-center">
            <Home className="h-4 w-4" />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {item.isCurrent ? (
              <span className="font-medium text-primary" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link href={item.href} className="text-gray-500 hover:text-primary transition-colors">
                  {item.label}
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-400 ml-1" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
