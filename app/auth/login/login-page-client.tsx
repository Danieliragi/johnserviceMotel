"use client"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import GoogleAuthButton from "@/components/auth/google-auth-button"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPageClient() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto relative">
        <div className="absolute left-1/2 -top-20 transform -translate-x-1/2 z-10">
          <div className="bg-white rounded-full p-3 shadow-md">
            <Image
              src="/john-services-logo.jpeg"
              alt="JohnService Motel Logo"
              width={100}
              height={100}
              className="rounded-full"
              priority
            />
          </div>
        </div>
        <Card className="max-w-md mx-auto border shadow-lg mt-14">
          <CardHeader className="text-center pb-2 pt-12">
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-gray-600 mt-2">Connectez-vous avec votre email ou Google</p>
          </CardHeader>

          <CardContent className="pt-4">
            <LoginForm onSubmit={async () => {}} loading={false} />

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Ou</span>
              </div>
            </div>

            <GoogleAuthButton mode="signin" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
