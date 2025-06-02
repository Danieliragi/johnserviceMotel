import type { Metadata } from "next"
import LoginPageClient from "./login-page-client"

export const metadata: Metadata = {
  title: "Connexion - John Services Motel",
  description: "Connectez-vous à votre compte JohnService Motel",
}

export default function LoginPage() {
  return <LoginPageClient />
}
