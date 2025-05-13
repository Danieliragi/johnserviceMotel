import type { Metadata } from "next"
import Link from "next/link"
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
          <p className="text-gray-600 mt-2">Connectez-vous avec votre email et mot de passe</p>
        </CardHeader>

        <CardContent className="pt-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="votre@email.com"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Se connecter
            </button>
          </form>
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
