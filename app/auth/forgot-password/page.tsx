import type { Metadata } from "next"
import Link from "next/link"
import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Mot de passe oublié - JohnService Motel",
  description: "Réinitialisez votre mot de passe JohnService Motel",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-md mx-auto shadow-md border border-gray-200">
        <CardHeader className="text-center space-y-1">
          <h1 className="text-3xl font-bold">Mot de passe oublié</h1>
          <p className="text-gray-600">Nous vous enverrons un lien pour réinitialiser votre mot de passe</p>
        </CardHeader>

        <CardContent>
          <ForgotPasswordForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Retour à la connexion
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
