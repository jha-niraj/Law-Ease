"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface CreateBookingData {
  lawyerId: string
  scheduledDate: Date
  scheduledTime: string
  duration: number
  clientMessage?: string
  hourlyRate: number
  platformFee: number
  totalAmount: number
}

export async function createBooking(bookingData: CreateBookingData) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    // Check if lawyer exists and is available for booking
    const lawyer = await prisma.lawyerProfile.findUnique({
      where: { userId: bookingData.lawyerId },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!lawyer) {
      return { success: false, error: "Lawyer not found" }
    }

    if (!lawyer.isAvailableForBooking) {
      return { success: false, error: "Lawyer is not available for booking" }
    }

    // Check if the time slot is available (simplified check)
    const dayOfWeek = bookingData.scheduledDate.getDay()
    const hasAvailability = await prisma.lawyerAvailability.findFirst({
      where: {
        lawyerProfileId: lawyer.id,
        dayOfWeek: dayOfWeek,
        isAvailable: true,
        startTime: { lte: bookingData.scheduledTime },
        endTime: { gt: bookingData.scheduledTime }
      }
    })

    if (!hasAvailability) {
      return { success: false, error: "Selected time slot is not available" }
    }

    // Check for conflicting bookings
    const existingBooking = await prisma.lawyerBooking.findFirst({
      where: {
        lawyerId: bookingData.lawyerId,
        scheduledDate: bookingData.scheduledDate,
        scheduledTime: bookingData.scheduledTime,
        status: {
          in: ['PENDING', 'CONFIRMED']
        }
      }
    })

    if (existingBooking) {
      return { success: false, error: "This time slot is already booked" }
    }

    // Create the booking
    const booking = await prisma.lawyerBooking.create({
      data: {
        lawyerId: bookingData.lawyerId,
        clientId: session.user.id,
        scheduledDate: bookingData.scheduledDate,
        scheduledTime: bookingData.scheduledTime,
        duration: bookingData.duration,
        clientMessage: bookingData.clientMessage,
        hourlyRate: bookingData.hourlyRate,
        platformFee: bookingData.platformFee,
        totalAmount: bookingData.totalAmount,
        status: 'PENDING'
      },
      include: {
        client: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Send email notifications
    try {
      // Email to lawyer
      await resend.emails.send({
        from: "LawEase <noreply@nirajjha.xyz>",
        to: lawyer.user.email,
        subject: "New Consultation Booking Request",
        html: `
          <h2>New Booking Request</h2>
          <p>You have received a new consultation booking request from ${booking.client.name}.</p>
          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Booking Details:</h3>
            <p><strong>Client:</strong> ${booking.client.name}</p>
            <p><strong>Date:</strong> ${bookingData.scheduledDate.toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${bookingData.scheduledTime}</p>
            <p><strong>Duration:</strong> ${bookingData.duration} minutes</p>
            <p><strong>Amount:</strong> ₹${bookingData.totalAmount}</p>
            ${bookingData.clientMessage ? `<p><strong>Message:</strong> ${bookingData.clientMessage}</p>` : ''}
          </div>
          <p>Please log in to your dashboard to accept or reject this booking request.</p>
          <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Dashboard</a>
        `
      })

      // Email to client
      await resend.emails.send({
        from: "LawEase <noreply@nirajjha.xyz>",
        to: booking.client.email,
        subject: "Booking Request Submitted",
        html: `
          <h2>Booking Request Submitted Successfully</h2>
          <p>Your consultation booking request has been sent to ${lawyer.user.name}.</p>
          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Booking Details:</h3>
            <p><strong>Lawyer:</strong> ${lawyer.user.name}</p>
            <p><strong>Date:</strong> ${bookingData.scheduledDate.toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${bookingData.scheduledTime}</p>
            <p><strong>Duration:</strong> ${bookingData.duration} minutes</p>
            <p><strong>Amount:</strong> ₹${bookingData.totalAmount}</p>
          </div>
          <p>You will receive an email notification once the lawyer responds to your request.</p>
          <p><strong>Note:</strong> Payment will be processed only after the lawyer accepts your booking.</p>
        `
      })
    } catch (emailError) {
      console.error("Failed to send notification emails:", emailError)
      // Don't fail the booking if email fails
    }

    revalidatePath("/dashboard")
    revalidatePath("/lawyers")
    
    return { 
      success: true, 
      message: "Booking request submitted successfully",
      bookingId: booking.id
    }

  } catch (error) {
    console.error("Error creating booking:", error)
    return { 
      success: false, 
      error: "Failed to create booking. Please try again." 
    }
  }
}

export async function getClientBookings(status?: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const whereClause: any = {
      clientId: session.user.id,
    }

    if (status) {
      whereClause.status = status
    }

    const bookings = await prisma.lawyerBooking.findMany({
      where: whereClause,
      include: {
        lawyer: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        lawyerProfile: {
          select: {
            experience: true,
            specializations: true
          }
        },
        review: true
      },
      orderBy: { scheduledDate: 'desc' }
    })

    return { success: true, bookings }

  } catch (error) {
    console.error("Error fetching client bookings:", error)
    return { success: false, error: "Failed to fetch bookings" }
  }
}

export async function cancelBooking(bookingId: string, reason?: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const booking = await prisma.lawyerBooking.findFirst({
      where: {
        id: bookingId,
        clientId: session.user.id
      },
      include: {
        lawyer: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!booking) {
      return { success: false, error: "Booking not found" }
    }

    if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
      return { success: false, error: "Cannot cancel this booking" }
    }

    // Check if cancellation is within allowed time (24 hours before)
    const bookingDateTime = new Date(booking.scheduledDate)
    const [hours, minutes] = booking.scheduledTime.split(':').map(Number)
    bookingDateTime.setHours(hours, minutes)
    
    const now = new Date()
    const timeDiff = bookingDateTime.getTime() - now.getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)

    if (hoursDiff < 24 && booking.status === 'CONFIRMED') {
      return { 
        success: false, 
        error: "Cannot cancel within 24 hours of the scheduled time" 
      }
    }

    await prisma.lawyerBooking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        clientMessage: reason ? `Cancellation reason: ${reason}` : booking.clientMessage
      }
    })

    // Notify lawyer
    try {
      await resend.emails.send({
        from: "LawEase <noreply@nirajjha.xyz>",
        to: booking.lawyer.email,
        subject: "Consultation Booking Cancelled",
        html: `
          <h2>Booking Cancelled</h2>
          <p>The consultation booking scheduled for ${booking.scheduledDate.toLocaleDateString()} at ${booking.scheduledTime} has been cancelled by the client.</p>
          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        `
      })
    } catch (emailError) {
      console.error("Failed to send cancellation email:", emailError)
    }

    revalidatePath("/dashboard")
    
    return { 
      success: true, 
      message: "Booking cancelled successfully" 
    }

  } catch (error) {
    console.error("Error cancelling booking:", error)
    return { 
      success: false, 
      error: "Failed to cancel booking" 
    }
  }
}

export async function createReview(bookingId: string, rating: number, comment?: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const booking = await prisma.lawyerBooking.findFirst({
      where: {
        id: bookingId,
        clientId: session.user.id,
        status: 'COMPLETED'
      }
    })

    if (!booking) {
      return { success: false, error: "Booking not found or not completed" }
    }

    // Check if review already exists
    const existingReview = await prisma.lawyerReview.findUnique({
      where: { bookingId: bookingId }
    })

    if (existingReview) {
      return { success: false, error: "Review already exists for this booking" }
    }

    // Create review
    await prisma.lawyerReview.create({
      data: {
        bookingId: bookingId,
        lawyerId: booking.lawyerId,
        clientId: session.user.id,
        rating: rating,
        comment: comment
      }
    })

    // Update lawyer's average rating
    const allReviews = await prisma.lawyerReview.findMany({
      where: { lawyerId: booking.lawyerId }
    })

    const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length

    await prisma.lawyerProfile.update({
      where: { userId: booking.lawyerId },
      data: { averageRating: averageRating }
    })

    revalidatePath("/dashboard")
    revalidatePath("/lawyers")
    
    return { 
      success: true, 
      message: "Review submitted successfully" 
    }

  } catch (error) {
    console.error("Error creating review:", error)
    return { 
      success: false, 
      error: "Failed to submit review" 
    }
  }
}
