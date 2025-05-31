import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const { email } = userData

    // Validate required fields
    if (!email) {
      return NextResponse.json({ success: false, error: "L'email est requis" }, { status: 400 })
    }

    // Create a Supabase client with admin privileges
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check if user already exists by email
    const { data: existingUsersByEmail, error: emailCheckError } = await supabaseAdmin
      .from("utilisateurs")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (emailCheckError) {
      console.error("Error checking existing user by email:", emailCheckError)
      return NextResponse.json(
        { success: false, error: `Erreur lors de la vérification de l'email: ${emailCheckError.message}` },
        { status: 500 },
      )
    }

    if (existingUsersByEmail) {
      // If user exists, just send a magic link via client-side code
      return NextResponse.json({
        success: true,
        message: "Utilisateur existant, lien de connexion envoyé",
        userExists: true,
      })
    }

    // Generate a UUID for the user profile
    const profileId = uuidv4()

    // Create user profile with the admin client
    const { error: profileError } = await supabaseAdmin.from("utilisateurs").insert({
      id: profileId,
      email,
      role: "user",
      date_creation: new Date().toISOString(),
    })

    if (profileError) {
      console.error("Error creating user profile:", profileError)
      return NextResponse.json(
        { success: false, error: `Erreur lors de la création du profil: ${profileError.message}` },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Profil créé avec succès. Vérifiez votre email pour vous connecter.",
    })
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Erreur lors de l'inscription: ${error.message || "Une erreur inconnue s'est produite"}`,
      },
      { status: 500 },
    )
  }
}
