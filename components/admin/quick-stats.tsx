"use client"

import type React from "react"

import { Users, BedDouble, Calendar, CreditCard, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  formatter?: (value: number) => string
}

function StatCard({
  title,
  value,
  icon,
  description,
  trend = "neutral",
  trendValue,
  formatter = (val) => val.toString(),
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatter(value)}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" && <TrendingUp className="mr-1 h-3 w-3 text-green-500" />}
          {trend === "down" && <TrendingDown className="mr-1 h-3 w-3 text-red-500" />}
          {trend === "neutral" && <Minus className="mr-1 h-3 w-3 text-gray-500" />}
          {trendValue && (
            <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""}>
              {trendValue}
            </span>
          )}{" "}
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export function QuickStats() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Réservations du mois"
        value={42}
        icon={<Calendar className="h-4 w-4" />}
        description="depuis le mois dernier"
        trend="up"
        trendValue="+12%"
      />
      <StatCard
        title="Taux d'occupation"
        value={87}
        icon={<BedDouble className="h-4 w-4" />}
        description="chambres occupées"
        trend="up"
        trendValue="+5%"
        formatter={(val) => `${val}%`}
      />
      <StatCard
        title="Nouveaux clients"
        value={18}
        icon={<Users className="h-4 w-4" />}
        description="cette semaine"
        trend="neutral"
        trendValue="0%"
      />
      <StatCard
        title="Revenu mensuel"
        value={24650}
        icon={<CreditCard className="h-4 w-4" />}
        description="depuis le mois dernier"
        trend="up"
        trendValue="+8%"
        formatter={formatCurrency}
      />
    </div>
  )
}
