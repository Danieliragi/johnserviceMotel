import { createClient } from "@/lib/supabase"

/**
 * Interface for reservation data needed for emails
 */
interface ReservationEmailData {
  id: string
  clientName: string
  clientEmail: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  numberOfGuests: number
  specialRequests?: string
}

/**
 * Interface for status update data
 */
interface StatusUpdateData {
  id: string
  clientName: string
  clientEmail: string
  previousStatus: string
  newStatus: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  message?: string
}

/**
 * Sends a confirmation email to the client after a reservation is made
 *
 * @param reservationData - The data of the reservation
 * @returns A promise that resolves to a boolean indicating if the email was sent successfully
 */
export async function sendReservationConfirmationEmail(reservationData: ReservationEmailData): Promise<boolean> {
  try {
    const supabase = createClient()

    // Log the email sending attempt
    await supabase.from("email_logs").insert({
      email_type: "reservation_confirmation",
      recipient: reservationData.clientEmail,
      reservation_id: reservationData.id,
      status: "pending",
      attempt_timestamp: new Date().toISOString(),
    })

    // In a production environment, you would integrate with an email service
    // like SendGrid, Mailgun, AWS SES, etc.
    console.log(`[EMAIL SERVICE] Sending confirmation email to ${reservationData.clientEmail}`)
    console.log(
      `[EMAIL SERVICE] Reservation details: Room ${reservationData.roomType}, Check-in: ${reservationData.checkInDate}, Check-out: ${reservationData.checkOutDate}`,
    )

    // Simulate email sending success
    // In production, replace with actual email sending logic
    const emailSent = true

    // Update the email log with the result
    await supabase
      .from("email_logs")
      .update({
        status: emailSent ? "sent" : "failed",
        sent_timestamp: emailSent ? new Date().toISOString() : null,
      })
      .eq("reservation_id", reservationData.id)
      .eq("email_type", "reservation_confirmation")

    return emailSent
  } catch (error) {
    console.error("[EMAIL SERVICE] Error sending confirmation email:", error)
    return false
  }
}

/**
 * Sends an email to the client when their reservation status is updated
 *
 * @param statusData - The data of the status update
 * @returns A promise that resolves to a boolean indicating if the email was sent successfully
 */
export async function sendReservationStatusUpdateEmail(statusData: StatusUpdateData): Promise<boolean> {
  try {
    const supabase = createClient()

    // Log the email sending attempt
    await supabase.from("email_logs").insert({
      email_type: "status_update",
      recipient: statusData.clientEmail,
      reservation_id: statusData.id,
      status: "pending",
      attempt_timestamp: new Date().toISOString(),
    })

    // In a production environment, you would integrate with an email service
    console.log(`[EMAIL SERVICE] Sending status update email to ${statusData.clientEmail}`)
    console.log(`[EMAIL SERVICE] Status changed from ${statusData.previousStatus} to ${statusData.newStatus}`)

    // Simulate email sending success
    // In production, replace with actual email sending logic
    const emailSent = true

    // Update the email log with the result
    await supabase
      .from("email_logs")
      .update({
        status: emailSent ? "sent" : "failed",
        sent_timestamp: emailSent ? new Date().toISOString() : null,
      })
      .eq("reservation_id", statusData.id)
      .eq("email_type", "status_update")

    return emailSent
  } catch (error) {
    console.error("[EMAIL SERVICE] Error sending status update email:", error)
    return false
  }
}

/**
 * Sends a reminder email to the client before their check-in date
 *
 * @param reservationData - The data of the reservation
 * @returns A promise that resolves to a boolean indicating if the email was sent successfully
 */
export async function sendReservationReminderEmail(reservationData: ReservationEmailData): Promise<boolean> {
  try {
    const supabase = createClient()

    // Log the email sending attempt
    await supabase.from("email_logs").insert({
      email_type: "reservation_reminder",
      recipient: reservationData.clientEmail,
      reservation_id: reservationData.id,
      status: "pending",
      attempt_timestamp: new Date().toISOString(),
    })

    console.log(`[EMAIL SERVICE] Sending reminder email to ${reservationData.clientEmail}`)

    // Simulate email sending success
    const emailSent = true

    // Update the email log with the result
    await supabase
      .from("email_logs")
      .update({
        status: emailSent ? "sent" : "failed",
        sent_timestamp: emailSent ? new Date().toISOString() : null,
      })
      .eq("reservation_id", reservationData.id)
      .eq("email_type", "reservation_reminder")

    return emailSent
  } catch (error) {
    console.error("[EMAIL SERVICE] Error sending reminder email:", error)
    return false
  }
}

/**
 * Sends a thank you email to the client after their stay
 *
 * @param reservationData - The data of the reservation
 * @returns A promise that resolves to a boolean indicating if the email was sent successfully
 */
export async function sendPostStayThankYouEmail(reservationData: ReservationEmailData): Promise<boolean> {
  try {
    const supabase = createClient()

    // Log the email sending attempt
    await supabase.from("email_logs").insert({
      email_type: "post_stay_thank_you",
      recipient: reservationData.clientEmail,
      reservation_id: reservationData.id,
      status: "pending",
      attempt_timestamp: new Date().toISOString(),
    })

    console.log(`[EMAIL SERVICE] Sending thank you email to ${reservationData.clientEmail}`)

    // Simulate email sending success
    const emailSent = true

    // Update the email log with the result
    await supabase
      .from("email_logs")
      .update({
        status: emailSent ? "sent" : "failed",
        sent_timestamp: emailSent ? new Date().toISOString() : null,
      })
      .eq("reservation_id", reservationData.id)
      .eq("email_type", "post_stay_thank_you")

    return emailSent
  } catch (error) {
    console.error("[EMAIL SERVICE] Error sending thank you email:", error)
    return false
  }
}
