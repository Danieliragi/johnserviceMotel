import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, Tv, Bath, Snowflake, Search } from "lucide-react"
import BookingForm from "@/components/booking-form"
import { Input } from "@/components/ui/input"
import RoomCard from "@/components/room-card"

export const metadata: Metadata = {
  title: "Nos Chambres - John Services Motel",
  description: "Découvrez nos chambres confortables et abordables pour votre séjour au John Services Motel.",
}

export default function ChambresPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden bg-gradient-to-br from-primary-950 to-primary-800 px-4 md:px-8">
        <div className="max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Nos Chambres</h1>
            <p className="text-xl text-white mb-8 max-w-2xl drop-shadow-md">
              Confort et tranquillité pour votre séjour, quelle que soit la durée
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 -mt-20 z-10 p-8 md:p-12 animate-slide-up overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            {/* Content wrapper with relative positioning */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white flex items-center justify-center mr-5 text-xl font-bold shadow-xl ring-4 ring-primary/10">
                    1
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Réservez votre séjour
                    </h2>
                    <p className="text-gray-600 mt-2 text-lg">Trouvez votre chambre idéale en quelques clics</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg border border-primary/10">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced form container */}
              <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-2xl p-8 border border-gray-100/50 shadow-lg backdrop-blur-sm">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Filter Section */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold">Toutes nos chambres</h2>
              <p className="text-gray-600 mt-2">Trouvez la chambre idéale pour votre séjour</p>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Rechercher..." className="pl-10 w-full" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-auto">
              <TabsTrigger value="all" className="text-sm md:text-base">
                Toutes les chambres
              </TabsTrigger>
              <TabsTrigger value="standard" className="text-sm md:text-base">
                Standard
              </TabsTrigger>
              <TabsTrigger value="deluxe" className="text-sm md:text-base">
                De Luxe
              </TabsTrigger>
              <TabsTrigger value="vip" className="text-sm md:text-base">
                VIP
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <RoomCard
                  name="Chambre Standard"
                  description="Chambre confortable avec lit standard et salle de bain privée."
                  price={30}
                  image="/standard7.jpeg"
                  rating={3}
                  type="standard"
                  capacity={2}
                  features={["Wi-Fi", "TV", "Climatisation", "Salle de bain privée"]}
                  slug="standard"
                />

                <RoomCard
                  name="Chambre De Luxe"
                  description="Spacieuse chambre de luxe avec un lit double confortable et coin salon."
                  price={40}
                  image="/deluxe-room-1.jpeg"
                  rating={4}
                  type="deluxe"
                  capacity={2}
                  features={["Wi-Fi", "TV", "Climatisation", "Coin salon avec fauteuil", "Décoration élégante"]}
                  slug="deluxe"
                  popular={true}
                />

                <RoomCard
                  name="Chambre VIP"
                  description="Chambre VIP élégante avec lit double vip, coin salon et décoration soignée."
                  price={70}
                  image="/vip-swan1.jpeg"
                  rating={5}
                  type="vip"
                  capacity={2}
                  features={["Wi-Fi", "TV", "Climatisation", "Coin salon avec table", "Service de chambre"]}
                  slug="vip"
                />
              </div>
            </TabsContent>

            <TabsContent value="standard" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <RoomCard
                  name="Chambre Standard"
                  description="Chambre confortable avec lit standard et salle de bain privée."
                  price={30}
                  image="/standard7.jpeg"
                  rating={3}
                  type="standard"
                  capacity={2}
                  features={["Wi-Fi", "TV", "Climatisation", "Salle de bain privée"]}
                  slug="standard"
                />
              </div>
            </TabsContent>

            <TabsContent value="deluxe" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <RoomCard
                  name="Chambre De Luxe"
                  description="Spacieuse chambre de luxe avec un lit double confortable et coin salon."
                  price={40}
                  image="/deluxe-room-1.jpeg"
                  rating={4}
                  type="deluxe"
                  capacity={2}
                  features={["Wi-Fi", "TV", "Climatisation", "Coin salon avec fauteuil", "Décoration élégante"]}
                  slug="deluxe"
                  popular={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="vip" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <RoomCard
                  name="Chambre VIP"
                  description="Chambre VIP élégante avec lit double, coin salon et décoration soignée."
                  price={70}
                  image="/vip-swan1.jpeg"
                  rating={5}
                  type="vip"
                  capacity={2}
                  features={["Wi-Fi", "TV", "Climatisation", "Coin salon avec table", "Service de chambre"]}
                  slug="vip"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              Équipements
            </span>
            <h2 className="text-3xl font-bold">Tout pour votre confort</h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Wi-Fi Gratuit</h3>
              <p className="text-gray-600">Connexion haut débit dans toutes nos chambres</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Tv className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">TV Écran Plat</h3>
              <p className="text-gray-600">Télévision avec chaînes internationales</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Bath className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Salle de Bain Privée</h3>
              <p className="text-gray-600">Avec douche, serviettes et produits d'accueil</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Snowflake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Climatisation</h3>
              <p className="text-gray-600">Contrôle individuel de la température</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver votre chambre ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Profitez de nos tarifs avantageux et de notre emplacement idéal pour votre prochain séjour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Réserver maintenant
            </Button>
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 transition-all duration-300">
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
