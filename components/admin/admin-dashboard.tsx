"use client"

import { AdminGreeting } from "@/components/admin/greeting"
import { QuickStats } from "@/components/admin/quick-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { UpcomingReservations } from "@/components/admin/upcoming-reservations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <AdminGreeting />
      <QuickStats />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RecentActivity />
            <UpcomingReservations />

            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Taux d'occupation</CardTitle>
                <CardDescription>Occupation des chambres par type</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-[url('/abstract-geometric-TD.png')] bg-cover bg-center rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Graphique d'occupation</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenus mensuels</CardTitle>
                <CardDescription>Comparaison des revenus sur les 6 derniers mois</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-[url('/machine-learning-concept.png')] bg-cover bg-center rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Graphique des revenus</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taux de satisfaction</CardTitle>
                <CardDescription>Évaluation des clients par catégorie</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-[url('/abstract-geometric-TD.png')] bg-cover bg-center rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Graphique de satisfaction</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapports disponibles</CardTitle>
              <CardDescription>Téléchargez les rapports d'activité du motel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Rapport mensuel - Mai 2023</p>
                    <p className="text-sm text-muted-foreground">Résumé complet des activités du mois</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">Télécharger</button>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Analyse des réservations - T2 2023</p>
                    <p className="text-sm text-muted-foreground">Tendances et statistiques des réservations</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">Télécharger</button>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Rapport financier - Avril 2023</p>
                    <p className="text-sm text-muted-foreground">Revenus, dépenses et marges</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">Télécharger</button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Satisfaction client - Mai 2023</p>
                    <p className="text-sm text-muted-foreground">Analyse des avis et retours clients</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">Télécharger</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
