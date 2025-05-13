import type { Metadata } from "next"
import Link from "next/link"
import LoginForm from "@/components/auth/login-form"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Connexion - JohnService Motel",
  description: "Connectez-vous à votre compte JohnService Motel",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-md mx-auto border shadow-lg">
        <CardHeader className="text-center pb-2">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-gray-600 mt-2">Accédez à votre compte pour gérer vos réservations</p>
        </CardHeader>

        <CardContent className="pt-4">
          <LoginForm />
        </CardContent>

        <CardFooter className="flex justify-center pb-6 pt-2">
          <p className="text-sm text-gray-600">
            Vous n&apos;avez pas de compte ?{" "}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
