import ClientRegisterForm from "@/components/auth/client-register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inscription Client | John Services Motel",
  description: "Créez un compte client pour réserver facilement vos séjours au John Services Motel",
}

export default function ClientRegisterPage() {
  return (
    <div className="container max-w-md mx-auto py-10">
      <ClientRegisterForm />
    </div>
  )
}
