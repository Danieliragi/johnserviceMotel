"use server"

import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

// Create a more direct Supabase client for server actions
const createServerActionClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export async function registerUser(userData: {
  email: string
  password: string
  nom_complet: string
  telephone: string
}) {
  try {
    const supabase = createServerActionClient()

    // First, check if a user with this email already exists in the utilisateurs table
    const { data: existingUsers, error: checkError } = await supabase
      .from("utilisateurs")
      .select("email")
      .eq("email", userData.email)
      .limit(1)

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      return {
        success: false,
        error: `Erreur lors de la vérification de l'email: ${checkError.message}`,
      }
    }

    if (existingUsers && existingUsers.length > 0) {
      return {
        success: false,
        error: "Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.",
      }
    }

    // Create the user profile first (without auth_id)
    const { data: profileData, error: profileError } = await supabase
      .from("utilisateurs")
      .insert({
        email: userData.email,
        nom_complet: userData.nom_complet,
        telephone: userData.telephone,
        role: "user",
        date_creation: new Date().toISOString(),
      })
      .select()

    if (profileError) {
      console.error("Error creating user profile:", profileError)
      return {
        success: false,
        error: `Erreur lors de la création du profil: ${profileError.message}`,
      }
    }

    // Now create the auth user
    // We'll use a simpler approach without metadata to avoid potential issues
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    })

    if (authError) {
      console.error("Error creating auth user:", authError)

      // Try to clean up the profile we created
      if (profileData && profileData.length > 0) {
        await supabase.from("utilisateurs").delete().eq("id", profileData[0].id)
      }

      return {
        success: false,
        error: `Erreur lors de la création du compte: ${authError.message}`,
      }
    }

    if (!authData.user) {
      // Clean up the profile we created
      if (profileData && profileData.length > 0) {
        await supabase.from("utilisateurs").delete().eq("id", profileData[0].id)
      }

      return {
        success: false,
        error: "Erreur lors de la création du compte: Aucun utilisateur créé",
      }
    }

    // Update the profile with the auth_id
    if (profileData && profileData.length > 0) {
      const { error: updateError } = await supabase
        .from("utilisateurs")
        .update({ auth_id: authData.user.id })
        .eq("id", profileData[0].id)

      if (updateError) {
        console.error("Error updating profile with auth_id:", updateError)
        // We don't return an error here as the user is still created
      }
    }

    return {
      success: true,
      message: "Compte créé avec succès. Vous pouvez maintenant vous connecter.",
    }
  } catch (error: any) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: `Erreur lors de l'inscription: ${error.message || "Une erreur inconnue s'est produite"}`,
    }
  }
}
