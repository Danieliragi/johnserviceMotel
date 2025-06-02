"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setUser as setReduxUser, clearUser } from "@/lib/redux/slices/authSlice"

type User = {
  id: string
  email?: string
  user_metadata?: {
    role?: string
  }
}

type Profile = {
  id: string
  nom_complet?: string
  telephone?: string
  email?: string
  role?: string
  date_creation?: string
}

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (data: Partial<Profile>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Create a conditional supabase client
  const supabase =
    supabaseUrl && supabaseAnonKey
      ? createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        })
      : null

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (!supabase) {
          console.warn("Supabase client not initialized - missing environment variables")
          setLoading(false)
          return
        }

        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          dispatch(setReduxUser(session.user))
          await fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error("Error fetching session:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()

    // Only set up auth state change listener if supabase client exists
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          dispatch(setReduxUser(session.user))
          await fetchUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
          dispatch(clearUser())
        }
        setLoading(false)
      })

      return () => {
        subscription.unsubscribe()
      }
    } else {
      setLoading(false)
    }
  }, [supabase, dispatch])

  const fetchUserProfile = async (userId: string) => {
    try {
      if (!supabase) {
        console.warn("Supabase client not initialized - cannot fetch user profile")
        return
      }

      // First try to find by auth_id
      let { data, error } = await supabase.from("utilisateurs").select("*").eq("auth_id", userId).single()

      // If not found, try to find by email
      if (error || !data) {
        const { data: userData } = await supabase.auth.getUser(userId)
        if (userData?.user?.email) {
          const { data: emailData } = await supabase
            .from("utilisateurs")
            .select("*")
            .eq("email", userData.user.email)
            .single()

          if (emailData) {
            // Update the auth_id if found by email
            await supabase.from("utilisateurs").update({ auth_id: userId }).eq("id", emailData.id)
            data = emailData
          }
        }
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      if (!supabase) {
        toast({
          title: "Service indisponible",
          description: "Le service d'authentification n'est pas configuré",
          variant: "destructive",
        })
        return { success: false, error: "Service d'authentification non configuré" }
      }

      setLoading(true)

      // Check if email already exists in auth
      const { data: existingUsers, error: emailCheckError } = await supabase
        .from("utilisateurs")
        .select("email")
        .eq("email", email)
        .limit(1)

      if (emailCheckError) {
        console.error("Error checking existing email:", emailCheckError)
      } else if (existingUsers && existingUsers.length > 0) {
        return {
          success: false,
          error: "Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.",
        }
      }

      // First create the profile in the database
      const profileData = {
        email: email,
        nom_complet: userData.nom_complet,
        telephone: userData.telephone,
        role: "user",
        date_creation: new Date().toISOString(),
        derniere_connexion: new Date().toISOString(),
      }

      const { data: newProfile, error: profileError } = await supabase.from("utilisateurs").insert(profileData).select()

      if (profileError) {
        console.error("Error creating profile:", profileError)
        return {
          success: false,
          error: `Erreur lors de la création du profil: ${profileError.message}`,
        }
      }

      // Then create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nom_complet: userData.nom_complet,
            telephone: userData.telephone,
            profile_id: newProfile?.[0]?.id,
          },
        },
      })

      if (error) {
        console.error("Error creating auth user:", error)

        // If auth user creation fails, delete the profile
        if (newProfile?.[0]?.id) {
          await supabase.from("utilisateurs").delete().eq("id", newProfile[0].id)
        }

        throw error
      }

      if (data.user && newProfile?.[0]?.id) {
        // Update the profile with the auth_id
        const { error: updateError } = await supabase
          .from("utilisateurs")
          .update({ auth_id: data.user.id })
          .eq("id", newProfile[0].id)

        if (updateError) {
          console.error("Error updating profile with auth_id:", updateError)
        }

        toast({
          title: "Compte créé avec succès",
          description: "Vous pouvez maintenant vous connecter",
          variant: "default",
        })

        return { success: true }
      }

      return { success: false, error: "Erreur lors de la création du compte" }
    } catch (error: any) {
      console.error("Error signing up:", error)
      toast({
        title: "Erreur lors de la création du compte",
        description: error.message || "Veuillez réessayer plus tard",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      if (!supabase) {
        toast({
          title: "Service indisponible",
          description: "Le service d'authentification n'est pas configuré",
          variant: "destructive",
        })
        return { success: false, error: "Service d'authentification non configuré" }
      }

      setLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        await fetchUserProfile(data.user.id)

        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur JohnService Motel",
          variant: "default",
        })

        router.push("/")
        return { success: true }
      }

      return { success: false, error: "Erreur lors de la connexion" }
    } catch (error: any) {
      console.error("Error signing in:", error)
      toast({
        title: "Erreur lors de la connexion",
        description: error.message || "Identifiants invalides",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      if (!supabase) {
        toast({
          title: "Service indisponible",
          description: "Le service d'authentification n'est pas configuré",
          variant: "destructive",
        })
        return
      }

      setLoading(true)
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      dispatch(clearUser())
      router.push("/")
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
        variant: "default",
      })
    } catch (error: any) {
      console.error("Error signing out:", error)
      toast({
        title: "Erreur lors de la déconnexion",
        description: error.message || "Veuillez réessayer plus tard",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      if (!supabase) {
        toast({
          title: "Service indisponible",
          description: "Le service d'authentification n'est pas configuré",
          variant: "destructive",
        })
        return { success: false, error: "Service d'authentification non configuré" }
      }

      setLoading(true)

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
      toast({
        title: "Erreur lors de la réinitialisation",
        description: error.message || "Veuillez réessayer plus tard",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (password: string) => {
    try {
      if (!supabase) {
        toast({
          title: "Service indisponible",
          description: "Le service d'authentification n'est pas configuré",
          variant: "destructive",
        })
        return { success: false, error: "Service d'authentification non configuré" }
      }

      setLoading(true)

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
      toast({
        title: "Erreur lors de la mise à jour",
        description: error.message || "Veuillez réessayer plus tard",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!supabase) {
        toast({
          title: "Service indisponible",
          description: "Le service d'authentification n'est pas configuré",
          variant: "destructive",
        })
        return { success: false, error: "Service d'authentification non configuré" }
      }

      setLoading(true)

      if (!profile?.id) {
        throw new Error("Profil non trouvé")
      }

      const { error } = await supabase.from("utilisateurs").update(data).eq("id", profile.id)

      if (error) {
        throw error
      }

      // Refresh profile
      await fetchUserProfile(user?.id || "")

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
        variant: "default",
      })

      return { success: true }
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Erreur lors de la mise à jour",
        description: error.message || "Veuillez réessayer plus tard",
        variant: "destructive",
      })
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
