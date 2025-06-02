import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "@/components/ui/use-toast"

export const MagicLinkService = {
  // Send magic link
  sendMagicLink: async (email: string, redirectTo?: string) => {
    try {
      const supabase = createClientComponentClient()

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm${redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : ""}`,
        },
      })

      if (error) {
        throw error
      }

      toast({
        title: "Lien envoyé !",
        description: "Vérifiez votre boîte de réception et cliquez sur le lien pour vous connecter.",
      })

      return { success: true }
    } catch (error: any) {
      console.error("Error sending magic link:", error)

      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le lien de connexion. Veuillez réessayer.",
        variant: "destructive",
      })

      return {
        success: false,
        error: error.message || "Erreur inconnue",
      }
    }
  },

  // Check if user exists
  checkUserExists: async (email: string) => {
    try {
      const supabase = createClientComponentClient()

      const { data, error } = await supabase.from("utilisateurs").select("id, role").eq("email", email).single()

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        throw error
      }

      return { exists: !!data, role: data?.role }
    } catch (error) {
      console.error("Error checking user:", error)
      return { exists: false, role: null }
    }
  },
}
