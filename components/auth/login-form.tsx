"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { MagicLinkService } from "@/lib/magic-link-service"

interface LoginFormProps {
  onSubmit: (email: string, password?: string) => Promise<void>
  loading: boolean
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  const [useMagicLink, setUseMagicLink] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre adresse email et votre mot de passe.",
        variant: "destructive",
      })
      return
    }

    await onSubmit(email, password)
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre adresse email.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    const result = await MagicLinkService.sendMagicLink(email)

    if (result.success) {
      setMagicLinkSent(true)
    }

    setLoading(false)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={useMagicLink ? handleMagicLink : handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        {!useMagicLink && (
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!useMagicLink}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {useMagicLink ? "Envoi du lien..." : "Connexion..."}
            </>
          ) : useMagicLink ? (
            "Envoyer le lien de connexion"
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>

      {magicLinkSent && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            Un lien de connexion a été envoyé à votre adresse email. Cliquez sur le lien pour vous connecter
            automatiquement.
          </p>
        </div>
      )}

      <div className="text-center">
        <Button type="button" variant="link" onClick={() => setUseMagicLink(!useMagicLink)} className="text-sm">
          {useMagicLink ? "Utiliser mot de passe" : "Connexion sans mot de passe"}
        </Button>
      </div>
    </div>
  )
}
