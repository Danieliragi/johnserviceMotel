"use server"

import { z } from "zod"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  subject: z.string().min(3, { message: "Le sujet doit contenir au moins 3 caractères" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    const result = contactFormSchema.safeParse({ name, email, subject, message })

    if (!result.success) {
      return {
        success: false,
        message: "Veuillez vérifier les informations saisies",
        errors: result.error.flatten().fieldErrors,
      }
    }

    // Prepare email content
    const emailContent = `
      Nouveau message de contact:
      
      Nom: ${name}
      Email: ${email}
      Sujet: ${subject}
      
      Message:
      ${message}
    `

    // Send email using Nodemailer or another email service
    // For now, we'll simulate sending an email
    console.log("Sending email to johnservicesmotel@gmail.com")
    console.log(emailContent)

    // In a real implementation, you would use an email service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Resend
    // - Amazon SES

    // For example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'Contact Form <contact@johnservicesmotel.com>',
    //   to: ['johnservicesmotel@gmail.com'],
    //   subject: `Contact Form: ${subject}`,
    //   text: emailContent,
    //   reply_to: email
    // });

    // Simulate a delay for the email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.",
    }
  }
}
