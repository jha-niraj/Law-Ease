"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { LawyerSpecialization } from "@prisma/client"

interface LawyerProfileData {
  barRegistrationNumber: string
  experience: number
  selectedSpecializations: string[]
  practiceAreas: string
  education: string
  certifications: string
  languages: string[]
  hourlyRate: number
  currency: string
}

interface AvailabilitySlot {
  dayOfWeek: number
  startTime: string
  endTime: string
  isAvailable: boolean
}

export async function createLawyerProfile(
  profileData: LawyerProfileData, 
  availability: AvailabilitySlot[]
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    // Check if user has LAWYER role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== "LAWYER") {
      return { success: false, error: "Only lawyers can create lawyer profiles" }
    }

    // Check if lawyer profile already exists
    const existingProfile = await prisma.lawyerProfile.findUnique({
      where: { userId: session.user.id }
    })

    if (existingProfile) {
      return { success: false, error: "Lawyer profile already exists" }
    }

    // Create lawyer profile with availability in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create lawyer profile
      const lawyerProfile = await tx.lawyerProfile.create({
        data: {
          userId: session.user.id,
          barRegistrationNumber: profileData.barRegistrationNumber,
          experience: profileData.experience,
          specializations: profileData.selectedSpecializations as LawyerSpecialization[],
          practiceAreas: profileData.practiceAreas,
          education: profileData.education,
          certifications: profileData.certifications,
          languages: profileData.languages,
          hourlyRate: profileData.hourlyRate,
          currency: profileData.currency,
          isAvailableForBooking: false, // Will be enabled after verification
          profileCompleteness: 85, // Calculate based on filled fields
        }
      })

      // Create availability slots
      if (availability.length > 0) {
        await tx.lawyerAvailability.createMany({
          data: availability.map(slot => ({
            lawyerProfileId: lawyerProfile.id,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable,
          }))
        })
      }

      return lawyerProfile
    })

    revalidatePath("/dashboard")
    return { 
      success: true, 
      message: "Lawyer profile created successfully. Awaiting verification.",
      profileId: result.id
    }

  } catch (error) {
    console.error("Error creating lawyer profile:", error)
    return { 
      success: false, 
      error: "Failed to create lawyer profile. Please try again." 
    }
  }
}

export async function getLawyerProfile(userId?: string) {
  try {
    const session = await auth()
    const targetUserId = userId || session?.user?.id

    if (!targetUserId) {
      return { success: false, error: "User ID required" }
    }

    const profile = await prisma.lawyerProfile.findUnique({
      where: { userId: targetUserId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true
          }
        },
        availabilities: {
          orderBy: [
            { dayOfWeek: 'asc' },
            { startTime: 'asc' }
          ]
        },
        reviews: {
          include: {
            booking: {
              select: {
                client: {
                  select: {
                    name: true,
                    image: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            bookings: true,
            reviews: true
          }
        }
      }
    })

    if (!profile) {
      return { success: false, error: "Lawyer profile not found" }
    }

    return { success: true, profile }

  } catch (error) {
    console.error("Error fetching lawyer profile:", error)
    return { success: false, error: "Failed to fetch lawyer profile" }
  }
}

export async function updateLawyerProfile(
  profileData: Partial<LawyerProfileData>,
  availability?: AvailabilitySlot[]
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const result = await prisma.$transaction(async (tx) => {
      // Update lawyer profile
      const updatedProfile = await tx.lawyerProfile.update({
        where: { userId: session.user.id },
        data: {
          ...profileData,
          updatedAt: new Date(),
        }
      })

      // Update availability if provided
      if (availability) {
        // Delete existing availability
        await tx.lawyerAvailability.deleteMany({
          where: { lawyerProfileId: updatedProfile.id }
        })

        // Create new availability slots
        if (availability.length > 0) {
          await tx.lawyerAvailability.createMany({
            data: availability.map(slot => ({
              lawyerProfileId: updatedProfile.id,
              dayOfWeek: slot.dayOfWeek,
              startTime: slot.startTime,
              endTime: slot.endTime,
              isAvailable: slot.isAvailable,
            }))
          })
        }
      }

      return updatedProfile
    })

    revalidatePath("/profile")
    revalidatePath("/dashboard")
    
    return { 
      success: true, 
      message: "Profile updated successfully",
      profile: result
    }

  } catch (error) {
    console.error("Error updating lawyer profile:", error)
    return { 
      success: false, 
      error: "Failed to update profile. Please try again." 
    }
  }
}

export async function getLawyerBookings(status?: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const whereClause: any = {
      lawyerId: session.user.id,
    }

    if (status) {
      whereClause.status = status
    }

    const bookings = await prisma.lawyerBooking.findMany({
      where: whereClause,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        review: true
      },
      orderBy: { scheduledDate: 'desc' }
    })

    return { success: true, bookings }

  } catch (error) {
    console.error("Error fetching lawyer bookings:", error)
    return { success: false, error: "Failed to fetch bookings" }
  }
}

export async function updateBookingStatus(bookingId: string, status: string, lawyerNotes?: string) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const booking = await prisma.lawyerBooking.findFirst({
      where: {
        id: bookingId,
        lawyerId: session.user.id
      }
    })

    if (!booking) {
      return { success: false, error: "Booking not found" }
    }

    const updateData: any = {
      status,
      updatedAt: new Date(),
    }

    if (lawyerNotes) {
      updateData.lawyerNotes = lawyerNotes
    }

    if (status === 'CONFIRMED') {
      updateData.confirmedAt = new Date()
    } else if (status === 'COMPLETED') {
      updateData.completedAt = new Date()
    } else if (status === 'CANCELLED') {
      updateData.cancelledAt = new Date()
    }

    await prisma.lawyerBooking.update({
      where: { id: bookingId },
      data: updateData
    })

    // TODO: Send email notification to client
    
    revalidatePath("/dashboard")
    
    return { 
      success: true, 
      message: `Booking ${status.toLowerCase()} successfully` 
    }

  } catch (error) {
    console.error("Error updating booking status:", error)
    return { 
      success: false, 
      error: "Failed to update booking status" 
    }
  }
}

export async function getLawyerDashboardStats() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const profile = await prisma.lawyerProfile.findUnique({
      where: { userId: session.user.id },
      select: {
        totalBookings: true,
        completedBookings: true,
        averageRating: true,
        totalEarnings: true,
        isVerified: true,
        isAvailableForBooking: true,
      }
    })

    if (!profile) {
      return { success: false, error: "Lawyer profile not found" }
    }

    // Get recent bookings
    const recentBookings = await prisma.lawyerBooking.findMany({
      where: { lawyerId: session.user.id },
      include: {
        client: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    // Get pending bookings count
    const pendingBookingsCount = await prisma.lawyerBooking.count({
      where: {
        lawyerId: session.user.id,
        status: 'PENDING'
      }
    })

    // Get this month's earnings
    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)

    const thisMonthEarnings = await prisma.lawyerBooking.aggregate({
      where: {
        lawyerId: session.user.id,
        status: 'COMPLETED',
        completedAt: {
          gte: thisMonth
        }
      },
      _sum: {
        totalAmount: true
      }
    })

    return {
      success: true,
      stats: {
        ...profile,
        recentBookings,
        pendingBookingsCount,
        thisMonthEarnings: Number(thisMonthEarnings._sum.totalAmount) || 0
      }
    }

  } catch (error) {
    console.error("Error fetching lawyer dashboard stats:", error)
    return { 
      success: false, 
      error: "Failed to fetch dashboard stats" 
    }
  }
}
