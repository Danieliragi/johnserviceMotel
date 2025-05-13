"use client"

import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Calendar, DollarSign, Percent, Clock, Users, TrendingDown, TrendingUp } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"
import CountUp from "@/components/count-up"

export default function TarifsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image src="/comfortable-motel-beds.png" alt="Motel beds" fill className="object-cover" priority />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimation direction="up">
            <h1 className="text-center mb-4">Nos Tarifs</h1>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Des prix transparents et compétitifs pour un séjour confortable et sans surprise
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Price Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h2 className="text-center mb-12">Aperçu des Tarifs</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation direction="left" delay={100}>
              <Card className="border-2 hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-primary/5 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    Chambre Standard
                    <Badge variant="outline" className="bg-primary/10">
                      À partir de
                    </Badge>
                  </CardTitle>
                  <CardDescription>Confort essentiel pour tous les voyageurs</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-center mb-4 flex items-center justify-center">
                    <DollarSign className="h-6 w-6" />
                    <CountUp end={69} duration={2} />
                    <span className="text-sm text-muted-foreground ml-1">/nuit</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Lit double confortable</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Wi-Fi gratuit</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>TV écran plat</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-5 w-5 text-red-500 mr-2" />
                      <span className="text-muted-foreground">Petit-déjeuner (+$10)</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/chambres/standard" className="w-full">
                    <Button className="w-full">Voir les détails</Button>
                  </Link>
                </CardFooter>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <Card className="border-2 border-primary shadow-lg relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Plus Populaire
                </div>
                <CardHeader className="bg-primary/10 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    Chambre Familiale
                    <Badge variant="outline" className="bg-primary/20">
                      À partir de
                    </Badge>
                  </CardTitle>
                  <CardDescription>Idéal pour les familles jusqu'à 4 personnes</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-center mb-4 flex items-center justify-center">
                    <DollarSign className="h-6 w-6" />
                    <CountUp end={89} duration={2} />
                    <span className="text-sm text-muted-foreground ml-1">/nuit</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>2 lits doubles</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Wi-Fi gratuit</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Réfrigérateur</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Petit-déjeuner inclus</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/chambres/familiale" className="w-full">
                    <Button className="w-full" variant="default">
                      Voir les détails
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={300}>
              <Card className="border-2 hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-slate-800 text-white rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    Chambre Premium
                    <Badge variant="outline" className="bg-white/20 text-white">
                      À partir de
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-slate-200">
                    Expérience luxueuse pour les plus exigeants
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-center mb-4 flex items-center justify-center">
                    <DollarSign className="h-6 w-6" />
                    <CountUp end={129} duration={2} />
                    <span className="text-sm text-muted-foreground ml-1">/nuit</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Lit king-size</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Wi-Fi haut débit</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Minibar garni</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Petit-déjeuner gourmet</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/chambres/premium" className="w-full">
                    <Button className="w-full" variant="outline">
                      Voir les détails
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Seasonal Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h2 className="text-center mb-2">Tarifs Saisonniers</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Nos tarifs varient selon les saisons pour vous offrir les meilleures options tout au long de l'année
            </p>
          </ScrollAnimation>

          <Tabs defaultValue="standard" className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up" delay={200}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="familiale">Familiale</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
            </ScrollAnimation>

            <TabsContent value="standard">
              <ScrollAnimation direction="up" delay={300}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-3 text-left">Saison</th>
                        <th className="border p-3 text-left">Période</th>
                        <th className="border p-3 text-left">Prix/Nuit</th>
                        <th className="border p-3 text-left">Disponibilité</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingDown className="h-5 w-5 text-green-500 mr-2" />
                            Basse saison
                          </div>
                        </td>
                        <td className="border p-3">Nov - Mars (hors fêtes)</td>
                        <td className="border p-3 font-semibold">$69</td>
                        <td className="border p-3 text-green-600">Élevée</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-yellow-500 mr-2" />
                            Moyenne saison
                          </div>
                        </td>
                        <td className="border p-3">Avr - Mai, Sept - Oct</td>
                        <td className="border p-3 font-semibold">$79</td>
                        <td className="border p-3 text-yellow-600">Moyenne</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
                            Haute saison
                          </div>
                        </td>
                        <td className="border p-3">Juin - Août, fêtes</td>
                        <td className="border p-3 font-semibold">$89</td>
                        <td className="border p-3 text-red-600">Limitée</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollAnimation>
            </TabsContent>

            <TabsContent value="familiale">
              <ScrollAnimation direction="up" delay={300}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-3 text-left">Saison</th>
                        <th className="border p-3 text-left">Période</th>
                        <th className="border p-3 text-left">Prix/Nuit</th>
                        <th className="border p-3 text-left">Disponibilité</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingDown className="h-5 w-5 text-green-500 mr-2" />
                            Basse saison
                          </div>
                        </td>
                        <td className="border p-3">Nov - Mars (hors fêtes)</td>
                        <td className="border p-3 font-semibold">$89</td>
                        <td className="border p-3 text-green-600">Élevée</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-yellow-500 mr-2" />
                            Moyenne saison
                          </div>
                        </td>
                        <td className="border p-3">Avr - Mai, Sept - Oct</td>
                        <td className="border p-3 font-semibold">$109</td>
                        <td className="border p-3 text-yellow-600">Moyenne</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
                            Haute saison
                          </div>
                        </td>
                        <td className="border p-3">Juin - Août, fêtes</td>
                        <td className="border p-3 font-semibold">$129</td>
                        <td className="border p-3 text-red-600">Limitée</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollAnimation>
            </TabsContent>

            <TabsContent value="premium">
              <ScrollAnimation direction="up" delay={300}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-3 text-left">Saison</th>
                        <th className="border p-3 text-left">Période</th>
                        <th className="border p-3 text-left">Prix/Nuit</th>
                        <th className="border p-3 text-left">Disponibilité</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingDown className="h-5 w-5 text-green-500 mr-2" />
                            Basse saison
                          </div>
                        </td>
                        <td className="border p-3">Nov - Mars (hors fêtes)</td>
                        <td className="border p-3 font-semibold">$129</td>
                        <td className="border p-3 text-green-600">Élevée</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-yellow-500 mr-2" />
                            Moyenne saison
                          </div>
                        </td>
                        <td className="border p-3">Avr - Mai, Sept - Oct</td>
                        <td className="border p-3 font-semibold">$149</td>
                        <td className="border p-3 text-yellow-600">Moyenne</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="border p-3">
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
                            Haute saison
                          </div>
                        </td>
                        <td className="border p-3">Juin - Août, fêtes</td>
                        <td className="border p-3 font-semibold">$179</td>
                        <td className="border p-3 text-red-600">Limitée</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollAnimation>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h2 className="text-center mb-2">Offres Spéciales</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
              Profitez de nos promotions exclusives pour économiser sur votre prochain séjour
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation direction="left" delay={200}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <Badge className="self-start bg-yellow-500 text-white hover:bg-yellow-600">Économisez 15%</Badge>
                  <CardTitle className="mt-2">Réservation Anticipée</CardTitle>
                  <CardDescription className="text-slate-300">
                    Réservez 30 jours à l'avance et économisez
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Planifiez votre voyage à l'avance et bénéficiez d'une réduction de 15% sur toutes nos chambres.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Réservation 30 jours avant l'arrivée</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-white/50 text-white hover:bg-white/20 hover:text-white"
                  >
                    Réserver avec ce code: EARLY15
                  </Button>
                </CardFooter>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={300}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <Badge className="self-start bg-green-500 text-white hover:bg-green-600">Économisez 20%</Badge>
                  <CardTitle className="mt-2">Séjour Prolongé</CardTitle>
                  <CardDescription className="text-slate-300">Restez plus longtemps, payez moins</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Réservez 5 nuits ou plus et bénéficiez d'une réduction de 20% sur le prix total de votre séjour.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Minimum 5 nuits consécutives</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-white/50 text-white hover:bg-white/20 hover:text-white"
                  >
                    Réserver avec ce code: STAY20
                  </Button>
                </CardFooter>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={400}>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <Badge className="self-start bg-blue-500 text-white hover:bg-blue-600">Offre Spéciale</Badge>
                  <CardTitle className="mt-2">Pack Famille</CardTitle>
                  <CardDescription className="text-slate-300">Idéal pour les vacances en famille</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Chambre familiale + petit-déjeuner pour 4 personnes + 1 activité locale à prix réduit.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>Valable pour 2 adultes et 2 enfants</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-white/50 text-white hover:bg-white/20 hover:text-white"
                  >
                    Réserver avec ce code: FAMILY25
                  </Button>
                </CardFooter>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h2 className="text-center mb-2">Services Additionnels</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Personnalisez votre séjour avec nos services à la carte
            </p>
          </ScrollAnimation>

          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up" delay={200}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border p-3 text-left">Service</th>
                      <th className="border p-3 text-left">Description</th>
                      <th className="border p-3 text-left">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="border p-3 font-medium">Petit-déjeuner continental</td>
                      <td className="border p-3">Buffet continental avec boissons chaudes, jus, viennoiseries</td>
                      <td className="border p-3">$10 par personne</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border p-3 font-medium">Petit-déjeuner américain</td>
                      <td className="border p-3">Buffet complet avec plats chauds, œufs, bacon, pancakes</td>
                      <td className="border p-3">$15 par personne</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border p-3 font-medium">Lit supplémentaire</td>
                      <td className="border p-3">Lit d'appoint pour un invité supplémentaire</td>
                      <td className="border p-3">$20 par nuit</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border p-3 font-medium">Parking sécurisé</td>
                      <td className="border p-3">Stationnement surveillé avec caméras</td>
                      <td className="border p-3">$8 par jour</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border p-3 font-medium">Service de blanchisserie</td>
                      <td className="border p-3">Lavage et repassage de vos vêtements</td>
                      <td className="border p-3">À partir de $15</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border p-3 font-medium">Navette aéroport</td>
                      <td className="border p-3">Transport aller-retour vers l'aéroport</td>
                      <td className="border p-3">$30 par trajet</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border p-3 font-medium">Animaux de compagnie</td>
                      <td className="border p-3">Supplément pour accueillir votre animal</td>
                      <td className="border p-3">$15 par nuit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Booking Policies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h2 className="text-center mb-2">Politiques de Réservation</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Informations importantes concernant votre réservation
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ScrollAnimation direction="left" delay={200}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Conditions de réservation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Arrivée (check-in) à partir de 15h00</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Départ (check-out) avant 11h00</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pièce d'identité requise à l'arrivée</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Carte de crédit pour garantie</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dépôt de garantie de $50 remboursable</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={300}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Percent className="h-5 w-5 mr-2 text-primary" />
                    Politique d'annulation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Annulation gratuite jusqu'à 48h avant l'arrivée</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Annulation entre 24h et 48h: 50% du montant</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Annulation moins de 24h: 100% du montant</span>
                    </li>
                    <li className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Non-présentation: aucun remboursement</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Modification gratuite selon disponibilité</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <h2 className="text-center mb-2">Questions Fréquentes</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Réponses aux questions les plus courantes concernant nos tarifs
            </p>
          </ScrollAnimation>

          <div className="max-w-3xl mx-auto space-y-4">
            <ScrollAnimation direction="up" delay={200}>
              <Card>
                <CardHeader className="cursor-pointer" onClick={() => {}}>
                  <CardTitle className="text-lg">Comment puis-je obtenir le meilleur tarif?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Pour obtenir le meilleur tarif, nous vous recommandons de réserver directement sur notre site web,
                    de planifier votre séjour à l'avance (au moins 30 jours) et de vérifier nos offres spéciales. Les
                    séjours en semaine et en basse saison sont généralement moins chers.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={300}>
              <Card>
                <CardHeader className="cursor-pointer" onClick={() => {}}>
                  <CardTitle className="text-lg">Le petit-déjeuner est-il inclus dans le prix?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Le petit-déjeuner est inclus dans le prix des chambres Familiales et Premium. Pour les chambres
                    Standard, il est disponible en supplément à $10 par personne pour le continental et $15 pour
                    l'américain.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={400}>
              <Card>
                <CardHeader className="cursor-pointer" onClick={() => {}}>
                  <CardTitle className="text-lg">Y a-t-il des frais supplémentaires non mentionnés?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Tous nos tarifs affichés incluent les taxes. Les seuls frais supplémentaires concernent les services
                    additionnels que vous pourriez choisir (petit-déjeuner, parking, etc.) et la taxe de séjour locale
                    de $2 par personne et par nuit qui est collectée séparément.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={500}>
              <Card>
                <CardHeader className="cursor-pointer" onClick={() => {}}>
                  <CardTitle className="text-lg">Proposez-vous des tarifs spéciaux pour les groupes?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Oui, nous proposons des tarifs préférentiels pour les groupes de 5 chambres ou plus. Veuillez nous
                    contacter directement par téléphone ou email pour obtenir un devis personnalisé en fonction de vos
                    besoins spécifiques.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation direction="up">
            <h2 className="mb-4">Prêt à réserver votre séjour?</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              Réservez directement sur notre site pour bénéficier des meilleurs tarifs garantis et d'avantages
              exclusifs.
            </p>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/chambres">Voir nos chambres</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 hover:text-white"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
