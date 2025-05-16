export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
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
          client_id: string // UUID, référence à clients.id
          chambre_id: string // UUID, référence à chambres.id
          date_arrivee: string // timestamp
          date_depart: string // timestamp
          statut: string // "confirme", "annule", "attente"
          code_reservation: string // Code unique pour validation, envoyé par email
          mode_paiement: string // "cash", "mobile money", "carte-visa", "paypal"
          created_at: string // timestamp
        }
        Insert: {
          id?: string // UUID
          client_id: string
          chambre_id: string
          date_arrivee: string
          date_depart: string
          statut?: string // default: "attente"
          code_reservation?: string // Généré automatiquement si non fourni
          mode_paiement: string
          created_at?: string // default: now()
        }
        Update: {
          id?: string
          client_id?: string
          chambre_id?: string
          date_arrivee?: string
          date_depart?: string
          statut?: string
          code_reservation?: string
          mode_paiement?: string
          created_at?: string
        }
      }
      tables_restaurant: {
        Row: {
          id: string // UUID
          nom: string // Numéro ou nom de la table
          capacite: number // Nombre max de personnes
          disponible: boolean // Statut
        }
        Insert: {
          id?: string // UUID
          nom: string
          capacite: number
          disponible?: boolean // default: true
        }
        Update: {
          id?: string
          nom?: string
          capacite?: number
          disponible?: boolean
        }
      }
      reservations_restaurant: {
        Row: {
          id: string // UUID
          client_id: string // UUID (FK), référence à clients.id
          table_id: string // UUID (FK), référence à tables_restaurant.id
          date: string // TIMESTAMP, date et heure réservée
          statut: string // TEXT, Confirmé / Annulé / En attente
          nb_personnes: number // INTEGER, nombre de couverts
        }
        Insert: {
          id?: string // UUID
          client_id: string
          table_id: string
          date: string
          statut?: string // default: "En attente"
          nb_personnes: number
        }
        Update: {
          id?: string
          client_id?: string
          table_id?: string
          date?: string
          statut?: string
          nb_personnes?: number
        }
      }
      salles_reunion: {
        Row: {
          id: string // UUID
          nom: string // TEXT, Salle A, B, etc.
          capacite: number // INTEGER, Nombre de places
          equipements: string // TEXT, Projecteur, WiFi, micro
          prix_heure: number // INTEGER, Tarif horaire
          disponible: boolean // BOOLEAN, Statut
        }
        Insert: {
          id?: string // UUID
          nom: string
          capacite: number
          equipements: string
          prix_heure: number
          disponible?: boolean // default: true
        }
        Update: {
          id?: string
          nom?: string
          capacite?: number
          equipements?: string
          prix_heure?: number
          disponible?: boolean
        }
      }
      reservations_reunion: {
        Row: {
          id: string // UUID
          client_id: string // UUID (FK), référence à clients.id
          salle_id: string // UUID (FK), référence à salles_reunion.id
          date_debut: string // TIMESTAMP, début réunion
          date_reservation: string // TIMESTAMP, date de soumission de reservation
          date_fin: string // TIMESTAMP, fin prévue
          statut: string // TEXT, Confirmé / En attente / Annulé
        }
        Insert: {
          id?: string // UUID
          client_id: string
          salle_id: string
          date_debut: string
          date_reservation?: string // default: now()
          date_fin: string
          statut?: string // default: "En attente"
        }
        Update: {
          id?: string
          client_id?: string
          salle_id?: string
          date_debut?: string
          date_reservation?: string
          date_fin?: string
          statut?: string
        }
      }
      clients: {
        Row: {
          id: string // UUID
          nom_complet: string
          email: string
          telephone: string
          mot_de_passe: string | null
          created_at: string // timestamp
        }
        Insert: {
          id?: string // UUID
          nom_complet: string
          email: string
          telephone: string
          mot_de_passe?: string | null
          created_at?: string // timestamp (default: now())
        }
        Update: {
          id?: string // UUID
          nom_complet?: string
          email?: string
          telephone?: string
          mot_de_passe?: string | null
          created_at?: string // timestamp
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
          service_type: string // "chambre", "restaurant", "salle de reunion"
          note: number // 1 à 5 étoiles
          commentaire: string
          date: string // timestamp
          statut: string // "publier", "en attente", "rejete"
        }
        Insert: {
          id?: string // UUID
          client_id: string // UUID
          service_type: string
          note: number // 1 à 5 étoiles
          commentaire: string
          date?: string // timestamp
          statut?: string // default: "en attente"
        }
        Update: {
          id?: string // UUID
          client_id?: string // UUID
          service_type?: string
          note?: number // 1 à 5 étoiles
          commentaire?: string
          date?: string // timestamp
          statut?: string
        }
      }
      utilisateurs: {
        Row: {
          id: string // UUID
          role: string // 'admin', 'staff', 'user'
          telephone: string // format +243...
          nom_complet: string | null
          email: string | null
          date_creation: string // timestamp
          derniere_connexion: string | null // timestamp
          auth_id: string | null // Foreign key to auth.users
        }
        Insert: {
          id?: string // UUID
          role?: string // 'admin', 'staff', 'user' (default: 'user')
          telephone: string // format +243...
          email?: string | null
          nom_complet?: string | null
          date_creation?: string // timestamp (default: now())
          derniere_connexion?: string | null // timestamp
          auth_id?: string | null // Foreign key to auth.users
        }
        Update: {
          id?: string // UUID
          role?: string // 'admin', 'staff', 'user'
          telephone?: string // format +243...
          email?: string | null
          nom_complet?: string | null
          date_creation?: string // timestamp
          derniere_connexion?: string | null // timestamp
          auth_id?: string | null // Foreign key to auth.users
        }
      }
      paiements: {
        Row: {
          id: string // UUID
          client_id: string // UUID, référence à clients.id
          reservation_id: string // UUID, référence à reservations.id
          type: string // "chambre", "restauration", "salle de reunion"
          montant: number
          mode_paiement: string // "mobile money", "cash", "carte-visa", "paypal"
          date_paiement: string // timestamp
        }
        Insert: {
          id?: string // UUID
          client_id: string
          reservation_id: string
          type: string
          montant: number
          mode_paiement: string
          date_paiement?: string // timestamp (default: now())
        }
        Update: {
          id?: string
          client_id?: string
          reservation_id?: string
          type?: string
          montant?: number
          mode_paiement?: string
          date_paiement?: string
        }
      }
      factures: {
        Row: {
          id: string // UUID
          paiement_id: string // UUID, référence à paiements.id
          numero_facture: string // Format ex. : FAC-2025-0001
          date_emission: string // timestamp
          montant_total: number
          devise: string // "CDF", "USD"
          type_service: string // "chambre", "restaurant", "réunion"
          client_id: string // UUID, référence à clients.id
          statut: string // "Payée", "Partielle", "Annulée"
          lien_pdf: string | null // URL vers la facture téléchargeable
        }
        Insert: {
          id?: string // UUID
          paiement_id: string
          numero_facture: string
          date_emission?: string // timestamp (default: now())
          montant_total: number
          devise: string
          type_service: string
          client_id: string
          statut?: string // default: "Payée"
          lien_pdf?: string | null
        }
        Update: {
          id?: string
          paiement_id?: string
          numero_facture?: string
          date_emission?: string
          montant_total?: number
          devise?: string
          type_service?: string
          client_id?: string
          statut?: string
          lien_pdf?: string | null
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
