import { toast } from "@/components/ui/use-toast"

type AuthErrorCode =
  | "invalid_credentials"
  | "user_not_found"
  | "email_taken"
  | "phone_taken"
  | "weak_password"
  | "expired_token"
  | "invalid_token"
  | "rate_limit_exceeded"
  | "server_error"
  | "network_error"
  | "unknown_error"

const errorMessages: Record<AuthErrorCode, string> = {
  invalid_credentials: "Email ou mot de passe incorrect.",
  user_not_found: "Aucun utilisateur trouvé avec ces identifiants.",
  email_taken: "Cette adresse email est déjà utilisée.",
  phone_taken: "Ce numéro de téléphone est déjà utilisé.",
  weak_password: "Le mot de passe est trop faible. Il doit contenir au moins 6 caractères.",
  expired_token: "Votre session a expiré. Veuillez vous reconnecter.",
  invalid_token: "Lien invalide ou expiré. Veuillez réessayer.",
  rate_limit_exceeded: "Trop de tentatives. Veuillez réessayer plus tard.",
  server_error: "Une erreur serveur s'est produite. Veuillez réessayer plus tard.",
  network_error: "Problème de connexion. Vérifiez votre connexion internet.",
  unknown_error: "Une erreur inconnue s'est produite. Veuillez réessayer.",
}

export function getAuthErrorMessage(error: any): string {
  // Handle Supabase auth errors
  if (error?.message) {
    const message = error.message.toLowerCase()

    if (message.includes("invalid login credentials")) {
      return errorMessages.invalid_credentials
    }

    if (message.includes("user not found")) {
      return errorMessages.user_not_found
    }

    if (message.includes("email already taken")) {
      return errorMessages.email_taken
    }

    if (message.includes("password")) {
      return errorMessages.weak_password
    }

    if (message.includes("token expired")) {
      return errorMessages.expired_token
    }

    if (message.includes("invalid token")) {
      return errorMessages.invalid_token
    }

    if (message.includes("rate limit")) {
      return errorMessages.rate_limit_exceeded
    }

    // Return the original message if we can't categorize it
    return error.message
  }

  // Network errors
  if (error instanceof Error && error.message.includes("network")) {
    return errorMessages.network_error
  }

  // Default unknown error
  return errorMessages.unknown_error
}

export function handleAuthError(error: any, customMessage?: string) {
  console.error("Auth error:", error)

  const message = customMessage || getAuthErrorMessage(error)

  toast({
    title: "Erreur d'authentification",
    description: message,
    variant: "destructive",
  })
}
