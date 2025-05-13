"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getSupabaseClient } from "@/lib/supabase"

type User = {
  id: string
  role: string
  telephone: string
  nom_complet: string | null
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (telephone: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for user in localStorage on initial load
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error("Error checking authentication:", err)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const login = async (telephone: string): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true)
      setError(null)

      const supabase = getSupabaseClient()
      if (!supabase) {
        throw new Error("Supabase client is not initialized")
      }

      // Validate phone format
      const phoneRegex = /^\+243[0-9]{9}$/
      if (!phoneRegex.test(telephone)) {
        return {
          success: false,
          message: "Le format du numéro de téléphone doit être +243 suivi de 9 chiffres",
        }
      }

      // Find user by telephone
      const { data, error } = await supabase.from("utilisateurs").select("*").eq("telephone", telephone).single()

      if (error || !data) {
        return { success: false, message: "Utilisateur non trouvé" }
      }

      // Update last login
      await supabase.from("utilisateurs").update({ derniere_connexion: new Date().toISOString() }).eq("id", data.id)

      // Set user in state and localStorage
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))

      return { success: true, message: "Connexion réussie" }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue lors de la connexion"
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
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
