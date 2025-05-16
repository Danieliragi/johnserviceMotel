import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const userData = await request.json()
    const { email, password, nom_complet, telephone } = userData

    // Validate required fields
    if (!email || !password || !nom_complet || !telephone) {
      return NextResponse.json({ success: false, error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Get the Supabase client
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({ success: false, error: "Service d'authentification non disponible" }, { status: 500 })
    }

    // Check if user already exists by email
    const { data: existingUsersByEmail, error: emailCheckError } = await supabase
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
      return NextResponse.json({ success: false, error: "Cette adresse email est déjà utilisée" }, { status: 400 })
    }

    // Check if user already exists by phone
    const { data: existingUsersByPhone, error: phoneCheckError } = await supabase
      .from("utilisateurs")
      .select("id")
      .eq("telephone", telephone)
      .maybeSingle()

    if (phoneCheckError) {
      console.error("Error checking existing user by phone:", phoneCheckError)
      return NextResponse.json(
        { success: false, error: `Erreur lors de la vérification du téléphone: ${phoneCheckError.message}` },
        { status: 500 },
      )
    }

    if (existingUsersByPhone) {
      return NextResponse.json({ success: false, error: "Ce numéro de téléphone est déjà utilisé" }, { status: 400 })
    }

    // Sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/login`,
      },
    })

    if (signUpError) {
      console.error("Error signing up:", signUpError)
      return NextResponse.json(
        { success: false, error: `Erreur lors de l'inscription: ${signUpError.message}` },
        { status: 500 },
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { success: false, error: "Erreur lors de la création du compte: Aucun utilisateur créé" },
        { status: 500 },
      )
    }

    // Create user profile
    const { error: profileError } = await supabase.from("utilisateurs").insert({
      auth_id: authData.user.id,
      email,
      nom_complet,
      telephone,
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
      message: "Compte créé avec succès. Vous pouvez maintenant vous connecter.",
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
