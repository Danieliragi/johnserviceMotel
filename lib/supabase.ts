import { createClient } from "@supabase/supabase-js"

// These environment variables need to be set in your .env.local file
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

// Replace the entire error-throwing block with this more graceful approach
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if we have the required environment variables
export const hasSupabaseCredentials = supabaseUrl !== "" && supabaseAnonKey !== ""

// Type definitions for database tables
export type Database = {
  public: {
    Tables: {
      chambres: {
        Row: {
          id: string // UUID
          nom: string
          prix: number
          capacite: number
          disponible: boolean
          description: string
          photo_url: string
        }
        Insert: {
          id?: string // UUID
          nom: string
          prix: number
          capacite: number
          disponible?: boolean
          description: string
          photo_url: string
        }
        Update: {
          id?: string // UUID
          nom?: string
          prix?: number
          capacite?: number
          disponible?: boolean
          description?: string
          photo_url?: string
        }
      }
      reservations: {
        Row: {
          id: string // UUID
          client_id: string // UUID
          chambre_id: string // UUID
          date_arrivee: string // timestamp
          date_depart: string // timestamp
          statut: string // "Confirmé", "En attente", "Annulé"
          moyen_paiement: string // "Cash", "Mobile Money", "Carte"
          code_reservation: string // Code unique pour validation
        }
        Insert: {
          id?: string // UUID
          client_id: string // UUID
          chambre_id: string // UUID
          date_arrivee: string // timestamp
          date_depart: string // timestamp
          statut?: string // "Confirmé", "En attente", "Annulé"
          moyen_paiement: string // "Cash", "Mobile Money", "Carte"
          code_reservation: string // Code unique pour validation
        }
        Update: {
          id?: string // UUID
          client_id?: string // UUID
          chambre_id?: string // UUID
          date_arrivee?: string // timestamp
          date_depart?: string // timestamp
          statut?: string // "Confirmé", "En attente", "Annulé"
          moyen_paiement?: string // "Cash", "Mobile Money", "Carte"
          code_reservation?: string // Code unique pour validation
        }
      }
      clients: {
        Row: {
          id: string // UUID
          nom: string
          telephone: string
          email: string | null
          localisation: string
        }
        Insert: {
          id?: string // UUID
          nom: string
          telephone: string
          email?: string | null
          localisation: string
        }
        Update: {
          id?: string // UUID
          nom?: string
          telephone?: string
          email?: string | null
          localisation?: string
        }
      }
      services: {
        Row: {
          id: string // UUID
          nom: string
          prix: number
          disponible: boolean
        }
        Insert: {
          id?: string // UUID
          nom: string
          prix: number
          disponible?: boolean
        }
        Update: {
          id?: string // UUID
          nom?: string
          prix?: number
          disponible?: boolean
        }
      }
      avis: {
        Row: {
          id: string // UUID
          client_id: string // UUID
          note: number // 1 à 5 étoiles
          commentaire: string
          date: string // timestamp
        }
        Insert: {
          id?: string // UUID
          client_id: string // UUID
          note: number // 1 à 5 étoiles
          commentaire: string
          date?: string // timestamp
        }
        Update: {
          id?: string // UUID
          client_id?: string // UUID
          note?: number // 1 à 5 étoiles
          commentaire?: string
          date?: string // timestamp
        }
      }
      utilisateurs: {
        Row: {
          id: string // UUID
          role: string // 'admin', 'staff', 'user'
          telephone: string // format +243...
          nom_complet: string | null
          date_creation: string // timestamp
          derniere_connexion: string | null // timestamp
        }
        Insert: {
          id?: string // UUID
          role?: string // 'admin', 'staff', 'user' (default: 'user')
          telephone: string // format +243...
          nom_complet?: string | null
          date_creation?: string // timestamp (default: now())
          derniere_connexion?: string | null // timestamp
        }
        Update: {
          id?: string // UUID
          role?: string // 'admin', 'staff', 'user'
          telephone?: string // format +243...
          nom_complet?: string | null
          date_creation?: string // timestamp
          derniere_connexion?: string | null // timestamp
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
