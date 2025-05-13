"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import Cookies from "js-cookie"

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (
    email: string,
    password: string,
    isMockLogin?: boolean,
    mockUser?: User | null,
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signUp: (
    email: string,
    password: string,
    telephone: string,
    nom_complet: string,
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      setIsAuthenticated(!!session?.user)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function signIn(email: string, password: string, isMockLogin = false, mockUser: User | null = null) {
    setLoading(true)
    try {
      // Si c'est une connexion simulée avec un utilisateur mock
      if (isMockLogin && mockUser) {
        setUser(mockUser)
        setIsAuthenticated(true)
        setLoading(false)
        return { error: null, success: true }
      }

      // Sinon, continuer avec le processus normal de Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setLoading(false)
        return { error, success: false }
      }

      // Update user metadata in the utilisateurs table
      if (data.user) {
        await supabase.from("utilisateurs").upsert(
          {
            id: data.user.id,
            derniere_connexion: new Date().toISOString(),
          },
          { onConflict: "id" },
        )
      }

      setUser(data.user)
      setIsAuthenticated(true)
      setLoading(false)
      return { error: null, success: true }
    } catch (error) {
      console.error("Error signing in:", error)
      setLoading(false)
      return { error: error as Error, success: false }
    }
  }

  async function checkAuth() {
    setLoading(true)

    // Vérifier d'abord s'il y a un utilisateur simulé dans localStorage
    const mockUserString = localStorage.getItem("mockUser")
    const mockAuthCookie = Cookies.get("mockAuth")

    if (mockUserString && mockAuthCookie === "true") {
      try {
        const mockUser = JSON.parse(mockUserString)
        setUser(mockUser)
        setIsAuthenticated(true)
        setLoading(false)
        return true
      } catch (e) {
        // Si le JSON est invalide, supprimer l'entrée
        localStorage.removeItem("mockUser")
        Cookies.remove("mockAuth")
      }
    }

    // Sinon, vérifier avec Supabase
    try {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setUser(data.session.user)
        setIsAuthenticated(true)
        setLoading(false)
        return true
      } else {
        setUser(null)
        setIsAuthenticated(false)
        setLoading(false)
        return false
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
      return false
    }
  }

  const signUp = async (email: string, password: string, telephone: string, nom_complet: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            telephone,
            nom_complet,
          },
        },
      })

      if (error) throw error

      // Create a record in the utilisateurs table
      if (data.user) {
        await supabase.from("utilisateurs").insert({
          id: data.user.id,
          role: "user",
          telephone,
          nom_complet,
          date_creation: new Date().toISOString(),
        })
      }

      return { error: null, success: true }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: error as Error, success: false }
    }
  }

  async function signOut() {
    setLoading(true)

    // Vérifier s'il y a un utilisateur simulé
    const mockUserString = localStorage.getItem("mockUser")
    const mockAuthCookie = Cookies.get("mockAuth")

    if (mockUserString || mockAuthCookie) {
      localStorage.removeItem("mockUser")
      Cookies.remove("mockAuth", { path: "/" })
      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
      return
    }

    // Sinon, déconnexion normale via Supabase
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setLoading(false)
        return
      }

      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
      return
    } catch (error) {
      console.error("Error signing out:", error)
      setLoading(false)
      return
    }
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
