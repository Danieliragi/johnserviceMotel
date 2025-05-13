import type { Metadata } from "next"
import Link from "next/link"
import RegisterForm from "@/components/auth/register-form"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Créer un compte - JohnService Motel",
  description: "Créez votre compte pour réserver des chambres au JohnService Motel",
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-md border border-gray-200">
          <CardHeader className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Créer un compte</h1>
            <p className="text-gray-600">Rejoignez-nous pour bénéficier d&apos;avantages exclusifs</p>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
