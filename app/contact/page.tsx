import type { Metadata } from "next"
import { Phone, Mail, MessageSquare, MapPin, Clock } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact - John Services Motel",
  description:
    "Contactez-nous pour toute question ou réservation au John Services Motel. Notre équipe est disponible pour vous aider.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-Nous</h1>
            <p className="text-xl opacity-90">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollAnimation direction="left">
              <div className="bg-slate-50 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">Nos Coordonnées</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">Téléphone</h3>
                      <p className="text-slate-600 text-sm">+243 997 163 443</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">WhatsApp</h3>
                      <p className="text-slate-600 text-sm">
                        <a
                          href="https://wa.me/243997163443"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          +243 997 163 443
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">Email</h3>
                      <p className="text-slate-600 text-sm">johnservicesmotel@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">Adresse</h3>
                      <p className="text-slate-600 text-sm">Quartier: Le volcan, AV. Le messagé, N° 13B</p>
                      <p className="text-slate-600 text-sm">Goma, Nord-Kivu, RDC</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">Heures d&apos;ouverture</h3>
                      <p className="text-slate-600 text-sm">Réception: 24h/24, 7j/7</p>
                      <p className="text-slate-600 text-sm">check-in: 24h/24 -check-out: 10h</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-slate-800 text-sm mb-4">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61575803102763"
                      className="bg-slate-200 hover:bg-slate-300 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-5 w-5 text-slate-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://www.instagram.com/john_services_motel?utm_source=qr&igsh=MWV6OWxoN3Z2NWJ5cw=="
                      className="bg-slate-200 hover:bg-slate-300 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-5 w-5 text-slate-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href="https://x.com/John_SMotel?t=Muvk4gx1RnrOxsCFjVlH1A&s=09"
                      className="bg-slate-200 hover:bg-slate-300 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-5 w-5 text-slate-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <span className="sr-only">X (Twitter)</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/john-services-motel/"
                      className="bg-slate-200 hover:bg-slate-300 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="h-5 w-5 text-slate-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@john.services.motel?_t=ZM-8wLpXpOkfaw&_r=1"
                      className="bg-slate-200 hover:bg-slate-300 p-3 rounded-full transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
                        className="h-5 w-5 text-slate-700"
                      >
                        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                        <path d="M15 8a4 4 0 0 0 0 8" />
                        <path d="M15 8a4 4 0 0 1 4 4" />
                        <path d="M19 8h-4V4" />
                      </svg>
                      <span className="sr-only">TikTok</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-slate-50 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-slate-800">Envoyez-nous un message</h2>
                <ContactForm />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Questions Fréquentes</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Quelles sont les heures d&apos;arrivée et de départ?
                  </h3>
                  <p className="text-slate-600">
                    L&apos;heure d&apos;arrivée (check-in) est à partir de 14h00 et l&apos;heure de départ (check-out)
                    est jusqu&apos;à 11h00. Si vous avez besoin d&apos;arrangements spéciaux, veuillez nous contacter à
                    l&apos;avance.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Comment puis-je réserver une chambre?</h3>
                  <p className="text-slate-600">
                    Vous pouvez réserver une chambre directement sur notre site web, par téléphone, ou par email. Nous
                    recommandons de réserver à l&apos;avance pendant la haute saison pour garantir la disponibilité.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Acceptez-vous les animaux de compagnie?</h3>
                  <p className="text-slate-600">
                    Nous n&apos;acceptons pas les animaux de compagnie dans notre établissement, à l&apos;exception des
                    chiens d&apos;assistance. Nous vous remercions de votre compréhension.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Y a-t-il un restaurant sur place?</h3>
                  <p className="text-slate-600">
                    Oui, nous avons un restaurant sur place qui sert le petit-déjeuner, le déjeuner et le dîner. Nous
                    proposons une cuisine locale et internationale. Le service en chambre est également disponible.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Proposez-vous un service de navette depuis l&apos;aéroport?
                  </h3>
                  <p className="text-slate-600">
                    Oui, nous proposons un service de navette depuis l&apos;aéroport moyennant des frais
                    supplémentaires. Veuillez nous informer de vos détails de vol à l&apos;avance pour que nous
                    puissions organiser votre transfert.
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à réserver votre séjour?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Découvrez le confort et l&apos;hospitalité au John Services Motel. Réservez dès maintenant pour bénéficier
              de nos meilleurs tarifs.
            </p>
            <a
              href="/chambres"
              className="inline-block bg-white text-slate-900 py-3 px-8 rounded-md font-semibold hover:bg-slate-100 transition-colors"
            >
              Voir nos chambres
            </a>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
