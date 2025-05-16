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
      <section className="relative h-[40vh] w-full overflow-hidden hero-gradient">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Nos Chambres</h1>
            <p className="text-xl text-white mb-8 max-w-2xl drop-shadow-md">
              Confort et tranquillité pour votre séjour, quelle que soit la durée
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-xl -mt-20 relative z-10 p-6 md:p-8 border border-gray-100 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center mr-3 text-lg">
              1
            </span>
            Vérifiez la disponibilité
          </h2>
          <BookingForm />
        </div>
      </section>

      {/* Rooms Filter Section */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
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
                description="Chambre confortable avec lit queen size et salle de bain privée."
                price={59}
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
                price={89}
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
                description="Chambre VIP élégante avec lit double, coin salon et décoration soignée."
                price={99}
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
                description="Chambre confortable avec lit queen size et salle de bain privée."
                price={59}
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
                price={89}
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
                price={99}
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
      </section>

      {/* Amenities Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium mb-3">
              Équipements
            </span>
            <h2 className="text-3xl font-bold">Tout pour votre confort</h2>
            <div className="w-20 h-1 bg-slate-800 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Wifi className="h-8 w-8 text-slate-800" />
              </div>
              <h3 className="font-bold mb-2">Wi-Fi Gratuit</h3>
              <p className="text-gray-600">Connexion haut débit dans toutes nos chambres</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Tv className="h-8 w-8 text-slate-800" />
              </div>
              <h3 className="font-bold mb-2">TV Écran Plat</h3>
              <p className="text-gray-600">Télévision avec chaînes internationales</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Bath className="h-8 w-8 text-slate-800" />
              </div>
              <h3 className="font-bold mb-2">Salle de Bain Privée</h3>
              <p className="text-gray-600">Avec douche, serviettes et produits d'accueil</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Snowflake className="h-8 w-8 text-slate-800" />
              </div>
              <h3 className="font-bold mb-2">Climatisation</h3>
              <p className="text-gray-600">Contrôle individuel de la température</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium mb-3">
            FAQ
          </span>
          <h2 className="text-3xl font-bold">Questions fréquentes</h2>
          <div className="w-20 h-1 bg-slate-800 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-3">À quelle heure est le check-in/check-out ?</h3>
            <p className="text-gray-600">
              Le check-in est disponible à partir de 14h00 et le check-out doit être effectué avant 11h00.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-3">Les animaux sont-ils acceptés ?</h3>
            <p className="text-gray-600">
              Oui, les animaux de compagnie sont les bienvenus avec un supplément de 15€ par nuit.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-3">Y a-t-il un petit-déjeuner ?</h3>
            <p className="text-gray-600">
              Oui, nous proposons un petit-déjeuner continental de 6h00 à 10h00 pour 9€ par personne.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-3">Le parking est-il gratuit ?</h3>
            <p className="text-gray-600">Oui, nous offrons un parking gratuit et sécurisé pour tous nos clients.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver votre chambre ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Profitez de nos tarifs avantageux et de notre emplacement idéal pour votre prochain séjour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100">
              Réserver maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-slate-700 transition-all duration-300"
            >
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
