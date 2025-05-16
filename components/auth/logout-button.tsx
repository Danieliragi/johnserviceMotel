"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LogOut } from "lucide-react"

interface LogoutButtonProps extends ButtonProps {}

export function LogoutButton({ className, variant = "default", size, ...props }: LogoutButtonProps) {
  const { signOut } = useAuth()

  return (
    <Button variant={variant} size={size} className={className} onClick={() => signOut()} {...props}>
      <LogOut className="mr-2 h-4 w-4" />
      Se déconnecter
    </Button>
  )
}
