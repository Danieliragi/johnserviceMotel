import { StarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  date: string
  rating: number
  text: string
  avatar?: string
  serviceType?: string // Nouveau prop
}

export default function TestimonialCard({ name, date, rating, text, avatar, serviceType }: TestimonialCardProps) {
  // Fonction pour obtenir le libellé du type de service
  const getServiceTypeLabel = (type?: string) => {
    if (!type) return null

    switch (type) {
      case "chambre":
        return "Chambre"
      case "restaurant":
        return "Restaurant"
      case "salle de reunion":
        return "Salle de réunion"
      default:
        return type
    }
  }

  return (
    <Card className="card-hover border-gray-200 h-full transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100">
              {avatar ? (
                <Image src={avatar || "/placeholder.svg"} alt={name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white font-medium">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>
          <div className="flex" aria-label={`Note: ${rating} sur 5 étoiles`}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {serviceType && (
          <div className="mb-3">
            <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
              {getServiceTypeLabel(serviceType)}
            </span>
          </div>
        )}

        <div className="relative">
          <span className="absolute -top-2 -left-1 text-4xl text-slate-200">"</span>
          <p className="text-gray-600 relative z-10 pl-3">{text}</p>
          <span className="absolute -bottom-5 -right-1 text-4xl text-slate-200">"</span>
        </div>
      </CardContent>
    </Card>
  )
}
