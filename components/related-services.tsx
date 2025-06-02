"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Hotel, Utensils, Users } from "lucide-react"

export default function RelatedServices() {
  const pathname = usePathname()

  // Liste des services disponibles
  const services = [
    {
      title: "Hébergement",
      description: "Découvrez nos chambres confortables et élégantes",
      href: "/services/hebergement",
      icon: <Hotel className="h-6 w-6" />,
    },
    {
      title: "Restaurant",
      description: "Savourez une cuisine raffinée dans notre restaurant",
      href: "/services/restaurant",
      icon: <Utensils className="h-6 w-6" />,
    },
    {
      title: "Salles de réunion",
      description: "Organisez vos événements professionnels dans nos espaces dédiés",
      href: "/services/salles-reunion",
      icon: <Users className="h-6 w-6" />,
    },
  ]

  // Filtrer pour exclure le service actuel
  const relatedServices = services.filter((service) => service.href !== pathname)

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Autres services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedServices.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-1">{service.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
