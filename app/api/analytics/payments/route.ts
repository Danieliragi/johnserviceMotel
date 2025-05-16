import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "month" // day, week, month, year
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined

    const supabase = createClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Calculate date range based on period
    let dateFilter = {}
    const now = new Date()

    if (startDate && endDate) {
      dateFilter = {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      }
    } else {
      const fromDate = new Date()

      switch (period) {
        case "day":
          fromDate.setDate(now.getDate() - 1)
          break
        case "week":
          fromDate.setDate(now.getDate() - 7)
          break
        case "month":
          fromDate.setMonth(now.getMonth() - 1)
          break
        case "year":
          fromDate.setFullYear(now.getFullYear() - 1)
          break
      }

      dateFilter = {
        timestamp: {
          gte: fromDate.toISOString(),
          lte: now.toISOString(),
        },
      }
    }

    // Get payment method distribution
    const { data: methodDistribution, error: methodError } = await supabase
      .from("payment_analytics")
      .select("payment_method, count(*)")
      .match(dateFilter)
      .group("payment_method")

    // Get success rate
    const { data: statusDistribution, error: statusError } = await supabase
      .from("payment_analytics")
      .select("status, count(*)")
      .match(dateFilter)
      .group("status")

    // Get total amount by day
    const { data: dailyAmounts, error: amountsError } = await supabase
      .from("payment_analytics")
      .select("amount, timestamp, status")
      .match(dateFilter)
      .eq("status", "success")
      .order("timestamp", { ascending: true })

    if (methodError || statusError || amountsError) {
      return NextResponse.json({ error: "Error fetching analytics data" }, { status: 500 })
    }

    // Process daily amounts into a chart-friendly format
    const dailyData: Record<string, number> = {}

    dailyAmounts?.forEach((item) => {
      const date = new Date(item.timestamp).toISOString().split("T")[0]
      dailyData[date] = (dailyData[date] || 0) + item.amount
    })

    const chartData = Object.entries(dailyData).map(([date, amount]) => ({
      date,
      amount,
    }))

    // Calculate success rate
    const totalTransactions =
      statusDistribution?.reduce((sum, item) => sum + Number.parseInt(item.count as string), 0) || 0

    const successTransactions = statusDistribution?.find((item) => item.status === "success")?.count || 0

    const successRate =
      totalTransactions > 0 ? (Number.parseInt(successTransactions as string) / totalTransactions) * 100 : 0

    return NextResponse.json({
      methodDistribution,
      statusDistribution,
      chartData,
      successRate: Math.round(successRate * 100) / 100, // Round to 2 decimal places
      totalTransactions,
    })
  } catch (error) {
    console.error("Error fetching payment analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
