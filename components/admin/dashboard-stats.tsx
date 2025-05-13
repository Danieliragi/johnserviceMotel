"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { CalendarIcon, Users, BedDouble, CreditCard } from "lucide-react"

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalRevenue: 0,
    occupancyRate: 0,
    totalRooms: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // In a real implementation, these would be actual Supabase queries
        // For now, we'll use mock data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStats({
          totalReservations: 156,
          totalRevenue: 14850,
          occupancyRate: 72,
          totalRooms: 24,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Mock data for charts
  const monthlyRevenueData = [
    { name: "Jan", revenue: 4200 },
    { name: "Fév", revenue: 3800 },
    { name: "Mar", revenue: 5100 },
    { name: "Avr", revenue: 4700 },
    { name: "Mai", revenue: 5600 },
    { name: "Juin", revenue: 6800 },
    { name: "Juil", revenue: 8900 },
    { name: "Août", revenue: 9200 },
    { name: "Sep", revenue: 7100 },
    { name: "Oct", revenue: 5900 },
    { name: "Nov", revenue: 4800 },
    { name: "Déc", revenue: 6200 },
  ]

  const roomTypeData = [
    { name: "Standard", value: 12 },
    { name: "Familiale", value: 8 },
    { name: "Premium", value: 4 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Réservations Totales</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : stats.totalReservations}</div>
          <p className="text-xs text-muted-foreground">+2.1% par rapport au mois dernier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : `${stats.totalRevenue.toLocaleString()} €`}</div>
          <p className="text-xs text-muted-foreground">+10.5% par rapport au mois dernier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux d'Occupation</CardTitle>
          <BedDouble className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : `${stats.occupancyRate}%`}</div>
          <p className="text-xs text-muted-foreground">+5.2% par rapport au mois dernier</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chambres Totales</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{loading ? "..." : stats.totalRooms}</div>
          <p className="text-xs text-muted-foreground">+0 depuis le mois dernier</p>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Revenus Mensuels</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} €`, "Revenu"]} />
              <Bar dataKey="revenue" fill="#1e293b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Répartition des Chambres</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={roomTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {roomTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} chambres`, "Quantité"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
