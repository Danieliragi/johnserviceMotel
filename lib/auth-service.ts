import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"
import { toast } from "@/components/ui/use-toast"
import type { Database } from "./database.types"

// Error messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Les identifiants fournis sont incorrects.",
  EMAIL_IN_USE: "Cette adresse email est déjà utilisée.",
  PHONE_IN_USE: "Ce numéro de téléphone est déjà utilisé.",
  WEAK_PASSWORD:
    "Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule et un chiffre.",
  NETWORK_ERROR: "Problème de connexion au serveur. Veuillez vérifier votre connexion internet.",
  UNKNOWN_ERROR: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.",
  SESSION_EXPIRED: "Votre session a expiré. Veuillez vous reconnecter.",
  UNAUTHORIZED: "Vous n'êtes pas autorisé à effectuer cette action.",
}

// Password validation
const isPasswordStrong = (password: string): boolean => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
}

// Create a server-side supabase client (for use in Server Components, API routes, etc.)
export const createServerAuthClient = async () => {
  const { cookies } = await import("next/headers")
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}

// Get user session on the server
export async function getServerSession() {
  try {
    const supabase = await createServerAuthClient()
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting server session:", error)
      return null
    }

    return session
  } catch (error) {
    console.error("Error in getServerSession:", error)
    return null
  }
}

// Get user profile from the database
export async function getUserProfile(userId: string) {
  try {
    const supabase = await createServerAuthClient()
    const { data, error } = await supabase.from("utilisateurs").select("*").eq("auth_id", userId).single()

    if (error) {
      console.error("Error getting user profile:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    return null
  }
}

// Require authentication or redirect
export async function requireAuth(redirectTo = "/auth/login") {
  const session = await getServerSession()

  if (!session) {
    const { redirect } = await import("next/navigation")
    redirect(redirectTo)
  }

  return session
}

// Require admin role or redirect
export async function requireAdmin(redirectTo = "/") {
  const session = await getServerSession()

  if (!session) {
    const { redirect } = await import("next/navigation")
    redirect("/auth/login")
  }

  const profile = await getUserProfile(session.user.id)

  if (!profile || profile.role !== "admin") {
    const { redirect } = await import("next/navigation")
    redirect(redirectTo)
  }

  return { session, profile }
}

// Client-side auth service
export const AuthService = {
  // Sign up a new user
  signUp: async (email: string, password: string, userData: any) => {
    try {
      const supabase = createClientComponentClient<Database>()

      // Validate password strength
      if (!isPasswordStrong(password)) {
        return {
          success: false,
          error: ERROR_MESSAGES.WEAK_PASSWORD,
        }
      }

      // Check if email already exists
      const { data: existingUsers, error: emailCheckError } = await supabase
        .from("utilisateurs")
        .select("email")
        .eq("email", email)
        .limit(1)

      if (emailCheckError) {
        console.error("Error checking existing email:", emailCheckError)
        return {
          success: false,
          error: ERROR_MESSAGES.UNKNOWN_ERROR,
        }
      }

      if (existingUsers && existingUsers.length > 0) {
        return {
          success: false,
          error: ERROR_MESSAGES.EMAIL_IN_USE,
        }
      }

      // Check if phone already exists
      if (userData.telephone) {
        const { data: existingPhones, error: phoneCheckError } = await supabase
          .from("utilisateurs")
          .select("telephone")
          .eq("telephone", userData.telephone)
          .limit(1)

        if (phoneCheckError) {
          console.error("Error checking existing phone:", phoneCheckError)
        } else if (existingPhones && existingPhones.length > 0) {
          return {
            success: false,
            error: ERROR_MESSAGES.PHONE_IN_USE,
          }
        }
      }

      // First create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nom_complet: userData.nom_complet,
            telephone: userData.telephone,
          },
        },
      })

      if (error) {
        console.error("Error creating auth user:", error)
        return {
          success: false,
          error: error.message,
        }
      }

      if (!data.user) {
        return {
          success: false,
          error: "Erreur lors de la création du compte",
        }
      }

      // Then create profile with auth_id
      const profileData = {
        auth_id: data.user.id,
        email: email,
        nom_complet: userData.nom_complet,
        telephone: userData.telephone,
        role: "user",
        date_creation: new Date().toISOString(),
      }

      const { error: profileError } = await supabase.from("utilisateurs").insert(profileData)

      if (profileError) {
        console.error("Error creating profile:", profileError)
        return {
          success: false,
          error: `Erreur lors de la création du profil: ${profileError.message}`,
        }
      }

      toast({
        title: "Compte créé avec succès",
        description: "Vous pouvez maintenant vous connecter",
        variant: "default",
      })

      return { success: true }
    } catch (error: any) {
      console.error("Error signing up:", error)

      // Handle network errors
      if (error.message?.includes("network") || error.message?.includes("fetch")) {
        return {
          success: false,
          error: ERROR_MESSAGES.NETWORK_ERROR,
        }
      }

      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      }
    }
  },

  // Sign in an existing user
  signIn: async (email: string, password: string) => {
    try {
      const supabase = createClientComponentClient<Database>()

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          return {
            success: false,
            error: ERROR_MESSAGES.INVALID_CREDENTIALS,
          }
        }

        throw error
      }

      if (data.user) {
        // Update last login time
        const { error: updateError } = await supabase
          .from("utilisateurs")
          .update({ derniere_connexion: new Date().toISOString() })
          .eq("auth_id", data.user.id)

        if (updateError) {
          console.error("Error updating last login:", updateError)
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur JohnService Motel",
          variant: "default",
        })

        return { success: true, user: data.user }
      }

      return {
        success: false,
        error: "Erreur lors de la connexion",
      }
    } catch (error: any) {
      console.error("Error signing in:", error)

      // Handle network errors
      if (error.message?.includes("network") || error.message?.includes("fetch")) {
        return {
          success: false,
          error: ERROR_MESSAGES.NETWORK_ERROR,
        }
      }

      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      }
    }
  },

  // Sign out the current user
  signOut: async () => {
    try {
      const supabase = createClientComponentClient<Database>()

      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
        variant: "default",
      })

      return { success: true }
    } catch (error: any) {
      console.error("Error signing out:", error)

      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      }
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      const supabase = createClientComponentClient<Database>()

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe",
        variant: "default",
      })

      return { success: true }
    } catch (error: any) {
      console.error("Error resetting password:", error)

      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      }
    }
  },

  // Update password
  updatePassword: async (password: string) => {
    try {
      const supabase = createClientComponentClient<Database>()

      // Validate password strength
      if (!isPasswordStrong(password)) {
        return {
          success: false,
          error: ERROR_MESSAGES.WEAK_PASSWORD,
        }
      }

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès",
        variant: "default",
      })

      return { success: true }
    } catch (error: any) {
      console.error("Error updating password:", error)

      // Handle session expired errors
      if (error.message?.includes("session") || error.message?.includes("token")) {
        return {
          success: false,
          error: ERROR_MESSAGES.SESSION_EXPIRED,
        }
      }

      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      }
    }
  },

  // Update user profile
  updateProfile: async (userId: string, data: any) => {
    try {
      const supabase = createClientComponentClient<Database>()

      // Check if email is being changed and if it's already in use
      if (data.email) {
        const { data: existingUsers, error: emailCheckError } = await supabase
          .from("utilisateurs")
          .select("id, email")
          .eq("email", data.email)
          .neq("auth_id", userId)
          .limit(1)

        if (emailCheckError) {
          console.error("Error checking existing email:", emailCheckError)
        } else if (existingUsers && existingUsers.length > 0) {
          return {
            success: false,
            error: ERROR_MESSAGES.EMAIL_IN_USE,
          }
        }
      }

      // Check if phone is being changed and if it's already in use
      if (data.telephone) {
        const { data: existingPhones, error: phoneCheckError } = await supabase
          .from("utilisateurs")
          .select("id, telephone")
          .eq("telephone", data.telephone)
          .neq("auth_id", userId)
          .limit(1)

        if (phoneCheckError) {
          console.error("Error checking existing phone:", phoneCheckError)
        } else if (existingPhones && existingPhones.length > 0) {
          return {
            success: false,
            error: ERROR_MESSAGES.PHONE_IN_USE,
          }
        }
      }

      // Get the profile ID
      const { data: profile, error: profileError } = await supabase
        .from("utilisateurs")
        .select("id")
        .eq("auth_id", userId)
        .single()

      if (profileError) {
        console.error("Error getting profile:", profileError)
        return {
          success: false,
          error: "Profil non trouvé",
        }
      }

      // Update the profile
      const { error: updateError } = await supabase.from("utilisateurs").update(data).eq("id", profile.id)

      if (updateError) {
        throw updateError
      }

      // If email is being updated, update auth email too
      if (data.email) {
        const { error: authUpdateError } = await supabase.auth.updateUser({
          email: data.email,
        })

        if (authUpdateError) {
          console.error("Error updating auth email:", authUpdateError)
          // We don't return an error here as the profile was still updated
        }
      }

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
        variant: "default",
      })

      return { success: true }
    } catch (error: any) {
      console.error("Error updating profile:", error)

      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      }
    }
  },

  // Check if user has a specific role
  hasRole: async (role: string) => {
    try {
      const supabase = createClientComponentClient<Database>()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return false
      }

      const { data, error } = await supabase.from("utilisateurs").select("role").eq("auth_id", session.user.id).single()

      if (error || !data) {
        return false
      }

      return data.role === role
    } catch (error) {
      console.error("Error checking role:", error)
      return false
    }
  },

  // Get current user session
  getSession: async () => {
    try {
      const supabase = createClientComponentClient<Database>()
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        throw error
      }

      return session
    } catch (error) {
      console.error("Error getting session:", error)
      return null
    }
  },

  // Get current user profile
  getCurrentProfile: async () => {
    try {
      const supabase = createClientComponentClient<Database>()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return null
      }

      const { data, error } = await supabase.from("utilisateurs").select("*").eq("auth_id", session.user.id).single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error("Error getting current profile:", error)
      return null
    }
  },
}
