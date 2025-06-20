"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact-actions"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
    errors?: Record<string, string[]>
  }>({})

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const result = await submitContactForm(formData)
      setFormStatus(result)

      // Reset form if successful
      if (result.success) {
        const form = document.getElementById("contactForm") as HTMLFormElement
        form?.reset()
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "Une erreur s'est produite. Veuillez réessayer plus tard.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="contactForm" action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
          placeholder="Votre nom"
          required
          disabled={isSubmitting}
        />
        {formStatus.errors?.name && <p className="mt-1 text-sm text-destructive">{formStatus.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
          placeholder="votre@email.com"
          required
          disabled={isSubmitting}
        />
        {formStatus.errors?.email && <p className="mt-1 text-sm text-destructive">{formStatus.errors.email[0]}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">
          Sujet
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
          placeholder="Sujet de votre message"
          required
          disabled={isSubmitting}
        />
        {formStatus.errors?.subject && <p className="mt-1 text-sm text-destructive">{formStatus.errors.subject[0]}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
          placeholder="Votre message..."
          required
          disabled={isSubmitting}
        ></textarea>
        {formStatus.errors?.message && <p className="mt-1 text-sm text-destructive">{formStatus.errors.message[0]}</p>}
      </div>

      {formStatus.message && (
        <div
          className={`p-3 rounded-md ${formStatus.success ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}
        >
          {formStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-3 px-6 rounded-md transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Envoyer le message
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center mt-4">
        En soumettant ce formulaire, vous acceptez que nous utilisions vos informations pour vous répondre. Votre
        message sera envoyé à johnservicesmotel@gmail.com.
      </p>
    </form>
  )
}
