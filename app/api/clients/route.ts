import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  try {
    const { data, error } = await supabase.from("clients").select("*")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies })

  try {
    const body = await request.json()
    const { nom_complet, email, telephone } = body

    // First check if client exists with this email
    const { data: existingClient, error: searchError } = await supabase
      .from("clients")
      .select("*")
      .eq("email", email)
      .maybeSingle()

    if (searchError) {
      console.error("Error searching for client:", searchError)
      return NextResponse.json({ error: searchError.message }, { status: 500 })
    }

    // If client exists, return it
    if (existingClient) {
      return NextResponse.json(existingClient)
    }

    // If client doesn't exist, create a new one
    // First, let's check the table structure to see what columns are available
    const { data: tableInfo, error: tableError } = await supabase.rpc("get_table_columns", { table_name: "clients" })

    if (tableError) {
      console.error("Error getting table structure:", tableError)
      return NextResponse.json({ error: tableError.message }, { status: 500 })
    }

    // Create an object with only the columns that exist in the table
    const columnNames = tableInfo.map((col: any) => col.column_name)
    const clientData: Record<string, any> = {}

    // Map our fields to potential column names
    const fieldMappings = [
      { field: nom_complet, possibleColumns: ["nom_complet", "name", "full_name", "nom"] },
      { field: email, possibleColumns: ["email"] },
      { field: telephone, possibleColumns: ["telephone", "phone", "tel", "mobile"] },
    ]

    // For each field, find a matching column
    fieldMappings.forEach((mapping) => {
      const matchingColumn = mapping.possibleColumns.find((col) => columnNames.includes(col))
      if (matchingColumn && mapping.field) {
        clientData[matchingColumn] = mapping.field
      }
    })

    // Add created_at if it exists
    if (columnNames.includes("created_at")) {
      clientData.created_at = new Date().toISOString()
    }

    // Insert the new client
    const { data: newClient, error: insertError } = await supabase.from("clients").insert(clientData).select()

    if (insertError) {
      console.error("Error creating client:", insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json(newClient[0])
  } catch (error) {
    console.error("Error processing client request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
