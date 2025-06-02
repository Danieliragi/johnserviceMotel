import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Mail, Phone, MapPin, ChevronRight, X, Linkedin } from "lucide-react"

export default function Footer() {
  // TikTok icon is not available in lucide-react, so we'll create a custom one
  const TikTokIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      <path d="M15 8a4 4 0 0 0 0 8" />
      <path d="M15 8a4 4 0 0 1 4 4" />
      <path d="M19 8h-4V4" />
    </svg>
  )

  return (
    <footer className="bg-primary-950 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative h-10 w-10 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image src="/logo-motel-john.png" alt="John Services Motel Logo" fill className="object-contain" />
              </div>
              <span className="flex flex-col items-center leading-tight font-bold text-xl transition-colors duration-300 group-hover:text-slate-800">
                <span className="text-2xl">John</span>
                <span className="text-sm font-medium font-['Poppins']">Services Motel</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Votre hébergement idéal pour une étape confortable sur la route. Il est situé à l'adresse suivante : Si
              vous êtes au rond-point de Cukudu, continuez tout droit en direction de la BDGL, en diagonale par rapport
              à l'Ecobank.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61575803102763"
                className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/john_services_motel?utm_source=qr&igsh=MWV6OWxoN3Z2NWJ5cw=="
                className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://x.com/John_SMotel?t=Muvk4gx1RnrOxsCFjVlH1A&s=09"
                className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/john-services-motel/"
                className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@john.services.motel?_t=ZM-8wLpXpOkfaw&_r=1"
                className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"
              >
                <TikTokIcon />
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4 border-b border-primary-800 pb-2">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/about/documentation"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/about/gallery"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Galerie
                </Link>
              </li>
              <li>
                <Link
                  href="/tarifs"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/hebergement"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Hébergement
                </Link>
              </li>
              <li>
                <Link
                  href="/services/restaurant"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Salle & Restaurant
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/localisation"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Localisation
                </Link>
              </li>
              <li>
                <Link
                  href="/chambres"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Nos chambres
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4 border-b border-primary-800 pb-2">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 group hover-scale">
                <span className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white group-hover:bg-primary-500 transition-colors mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-gray-400">Quartier: Le volcan, AV. Le messager, N° 13B</span>
              </li>
              <li className="flex items-center gap-2 group hover-scale">
                <span className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white group-hover:bg-primary-500 transition-colors flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="text-gray-400">+243 997 163 443</span>
              </li>
              <li className="flex items-center gap-2 group hover-scale">
                <span className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white group-hover:bg-primary-500 transition-colors flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:johnservicesmotel@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  johnservicesmotel@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4 border-b border-primary-800 pb-2">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir nos offres spéciales et promotions exclusives.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="rounded-r-none bg-primary-800 border-primary-700 text-white focus:border-primary-500 placeholder:text-gray-300"
                />
                <Button type="submit" className="rounded-l-none bg-primary-600 hover:bg-primary-700">
                  OK
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                En vous inscrivant, vous acceptez notre politique de confidentialité.
              </p>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} John Services Motel. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/mentions-legales" className="text-gray-500 hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-gray-500 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/cgv" className="text-gray-500 hover:text-white transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
