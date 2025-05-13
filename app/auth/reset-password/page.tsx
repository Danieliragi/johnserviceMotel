import type { Metadata } from "next"
import Link from "next/link"
import ResetPasswordForm from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe - JohnService Motel",
  description: "Définissez un nouveau mot de passe pour votre compte JohnService Motel",
}

export default function ResetPasswordPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Réinitialiser le mot de passe</h1>
          <p className="text-gray-600 mt-2">Créez un nouveau mot de passe pour votre compte</p>
        </div>

        <ResetPasswordForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
