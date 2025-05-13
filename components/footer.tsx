import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ChevronRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative h-10 w-10 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/john-services-motel-logo.png"
                  alt="John Services Motel Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-white">JohnService Motel</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Votre hébergement idéal pour une étape confortable sur la route. Situé à proximité de l'autoroute A7.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4 border-b border-gray-800 pb-2">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Accueil
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
                  href="/tarifs"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Tarifs et offres
                </Link>
              </li>
              <li>
                <Link href="/avis" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-all -ml-5 group-hover:ml-0" />
                  Avis clients
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
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4 border-b border-gray-800 pb-2">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 group hover-scale">
                <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-slate-700 group-hover:text-white transition-colors mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-gray-400">123 Route Nationale, 84000 Avignon, France</span>
              </li>
              <li className="flex items-center gap-2 group hover-scale">
                <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-slate-700 group-hover:text-white transition-colors flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </span>
                <Link href="tel:+243998691478" className="text-gray-400 hover:text-white transition-colors">
                  +243 998 691 478
                </Link>
              </li>
              <li className="flex items-center gap-2 group hover-scale">
                <span className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-slate-700 group-hover:text-white transition-colors flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </span>
                <Link
                  href="mailto:contact@johnservicemotel.fr"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  contact@johnservicemotel.fr
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4 border-b border-gray-800 pb-2">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir nos offres spéciales et promotions exclusives.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white focus:border-slate-500"
                />
                <Button type="submit" className="rounded-l-none bg-slate-800 hover:bg-slate-700">
                  OK
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                En vous inscrivant, vous acceptez notre politique de confidentialité.
              </p>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} JohnService Motel. Tous droits réservés.
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
