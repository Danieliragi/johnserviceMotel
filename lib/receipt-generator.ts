import { jsPDF } from "jspdf"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface ReceiptData {
  paymentId: string
  amount: number
  date: string
  reservationCode: string
  paymentMethod: string
  checkIn: string
  checkOut: string
}

export async function generateReceipt(data: ReceiptData): Promise<string> {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Set font
  doc.setFont("helvetica")

  // Add hotel logo
  // In a real implementation, you would add the hotel logo here
  doc.setFontSize(22)
  doc.setTextColor(0, 0, 0)
  doc.text("JOHN SERVICES MOTEL", 105, 20, { align: "center" })

  // Add receipt title
  doc.setFontSize(18)
  doc.text("REÇU DE PAIEMENT", 105, 30, { align: "center" })

  // Add receipt number and date
  doc.setFontSize(10)
  doc.text(`Reçu N°: ${data.paymentId}`, 20, 45)
  doc.text(`Date: ${format(new Date(data.date), "dd MMMM yyyy", { locale: fr })}`, 190, 45, { align: "right" })

  // Add horizontal line
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 50, 190, 50)

  // Add reservation details
  doc.setFontSize(12)
  doc.text("Détails de la réservation", 20, 60)

  doc.setFontSize(10)
  doc.text(`Code de réservation: ${data.reservationCode}`, 20, 70)
  doc.text(
    `Date d'arrivée: ${format(new Date(data.checkIn), "dd MMMM yyyy", {
      locale: fr,
    })}`,
    20,
    80,
  )
  doc.text(
    `Date de départ: ${format(new Date(data.checkOut), "dd MMMM yyyy", {
      locale: fr,
    })}`,
    20,
    90,
  )

  // Add payment details
  doc.setFontSize(12)
  doc.text("Détails du paiement", 20, 110)

  doc.setFontSize(10)
  doc.text(`Méthode de paiement: ${data.paymentMethod === "carte-visa" ? "Carte Bancaire" : "Mobile Money"}`, 20, 120)
  doc.text(`Montant payé: $${data.amount.toFixed(2)} USD`, 20, 130)

  // Add horizontal line
  doc.line(20, 140, 190, 140)

  // Add footer
  doc.setFontSize(8)
  doc.text("Ce reçu est généré électroniquement et ne nécessite pas de signature.", 105, 180, { align: "center" })
  doc.text("John Services Motel - Bukavu, RD Congo", 105, 185, {
    align: "center",
  })
  doc.text("Tel: +243 997 163 443 - Email: contact@johnservicesmotel.com", 105, 190, {
    align: "center",
  })

  // Generate a blob URL for the PDF
  const pdfBlob = doc.output("blob")
  const pdfUrl = URL.createObjectURL(pdfBlob)

  // In a production environment, you might want to save this to a storage service
  // and return a permanent URL instead of a blob URL
  return pdfUrl
}

export async function emailReceipt(email: string, receiptData: ReceiptData): Promise<boolean> {
  try {
    // Generate the receipt
    const receiptUrl = await generateReceipt(receiptData)

    // In a real implementation, you would:
    // 1. Save the PDF to a storage service (e.g., Supabase Storage)
    // 2. Get a permanent URL for the PDF
    // 3. Send an email with the PDF attached or linked

    console.log(`[EMAIL SERVICE] Sending receipt to ${email}`)

    // Simulate email sending success
    // In production, replace with actual email sending logic
    const emailSent = true

    return emailSent
  } catch (error) {
    console.error("[EMAIL SERVICE] Error sending receipt:", error)
    return false
  }
}
