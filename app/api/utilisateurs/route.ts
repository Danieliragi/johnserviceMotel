import { type NextRequest, NextResponse } from "next/server"
import { supabase, hasSupabaseCredentials } from "@/lib/supabase"

// GET /api/utilisateurs - Récupérer tous les utilisateurs
export async function GET() {
  try {
    // Check if Supabase credentials are available
    if (!hasSupabaseCredentials || !supabase) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 503 })
    }

    const { data, error } = await supabase.from("utilisateurs").select("*").order("date_creation", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des utilisateurs" },
      { status: 500 },
    )
  }
}

// POST /api/utilisateurs - Créer un nouvel utilisateur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation de base
    if (!body.telephone) {
      return NextResponse.json({ error: "Le numéro de téléphone est obligatoire" }, { status: 400 })
    }

    // Valider le format du téléphone (+243...)
    const phoneRegex = /^\+243[0-9]{9}$/
    if (!phoneRegex.test(body.telephone)) {
      return NextResponse.json(
        { error: "Le format du numéro de téléphone doit être +243 suivi de 9 chiffres" },
        { status: 400 },
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase
      .from("utilisateurs")
      .select("id")
      .eq("telephone", body.telephone)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: "Un utilisateur avec ce numéro de téléphone existe déjà" }, { status: 409 })
    }

    // Créer l'utilisateur
    const newUser = {
      role: body.role || "user",
      telephone: body.telephone,
      nom_complet: body.nom_complet || null,
      date_creation: new Date().toISOString(),
      derniere_connexion: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("utilisateurs").insert(newUser).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de l'utilisateur" }, { status: 500 })
  }
}

// PATCH /api/utilisateurs/:id - Mettre à jour un utilisateur
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Valider le format du téléphone si fourni
    if (body.telephone) {
      const phoneRegex = /^\+243[0-9]{9}$/
      if (!phoneRegex.test(body.telephone)) {
        return NextResponse.json(
          { error: "Le format du numéro de téléphone doit être +243 suivi de 9 chiffres" },
          { status: 400 },
        )
      }
    }

    // Mettre à jour l'utilisateur
    const { data, error } = await supabase
      .from("utilisateurs")
      .update({
        role: body.role,
        telephone: body.telephone,
        nom_complet: body.nom_complet,
        derniere_connexion: body.derniere_connexion || new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la mise à jour de l'utilisateur" },
      { status: 500 },
    )
  }
}

// DELETE /api/utilisateurs/:id - Supprimer un utilisateur
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const { error } = await supabase.from("utilisateurs").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression de l'utilisateur" },
      { status: 500 },
    )
  }
}
