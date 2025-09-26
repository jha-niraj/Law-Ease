"use server"

import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject must be less than 200 characters"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message must be less than 2000 characters"),
  userType: z.enum(["GENERAL", "LAWYER", "STUDENT", "SUPPORT"]).optional(),
})

export type ContactFormInput = z.infer<typeof contactSchema>

export async function submitContactForm(data: ContactFormInput) {
  try {
    // Validate the input
    const validatedData = contactSchema.parse(data)

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        userType: validatedData.userType || "GENERAL",
      }
    })

    // Send notification email to admin
    try {
      await resend.emails.send({
        from: "LawEase Contact <noreply@nirajjha.xyz>",
        to: "admin@lawease.in", // Replace with actual admin email
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6, #6366f1); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
            </div>
            
            <div style="padding: 30px; background: #f8fafc; border-left: 4px solid #3b82f6;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Details</h2>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="margin: 10px 0;"><strong>Name:</strong> ${validatedData.name}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${validatedData.email}" style="color: #3b82f6;">${validatedData.email}</a></p>
                <p style="margin: 10px 0;"><strong>User Type:</strong> ${validatedData.userType || "GENERAL"}</p>
                <p style="margin: 10px 0;"><strong>Subject:</strong> ${validatedData.subject}</p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #1e293b; margin-bottom: 15px;">Message:</h3>
                <p style="line-height: 1.6; color: #475569; white-space: pre-wrap;">${validatedData.message}</p>
              </div>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${validatedData.email}" 
                   style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                  Reply to ${validatedData.name}
                </a>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
              <p>This message was sent via the LawEase contact form.</p>
              <p>Message ID: ${contactMessage.id}</p>
            </div>
          </div>
        `
      })
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError)
      // Don't fail the form submission if email fails
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: "LawEase Support <noreply@nirajjha.xyz>",
        to: validatedData.email,
        subject: "Thank you for contacting LawEase - We'll be in touch soon!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6, #6366f1); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Reaching Out!</h1>
            </div>
            
            <div style="padding: 30px; background: #f8fafc;">
              <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${validatedData.name},</h2>
                
                <p style="line-height: 1.6; color: #475569; margin-bottom: 20px;">
                  Thank you for contacting LawEase! We've received your message and our team will review it shortly.
                </p>
                
                <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                  <h3 style="color: #1e40af; margin-bottom: 15px;">Your Message Summary:</h3>
                  <p style="margin: 8px 0; color: #1e293b;"><strong>Subject:</strong> ${validatedData.subject}</p>
                  <p style="margin: 8px 0; color: #1e293b;"><strong>User Type:</strong> ${validatedData.userType || "GENERAL"}</p>
                  <p style="margin: 8px 0; color: #1e293b;"><strong>Message ID:</strong> ${contactMessage.id}</p>
                </div>
                
                <p style="line-height: 1.6; color: #475569; margin-bottom: 20px;">
                  <strong>What happens next?</strong>
                </p>
                
                <ul style="color: #475569; line-height: 1.6; margin-bottom: 25px;">
                  <li style="margin-bottom: 8px;">✅ Our support team will review your message within 24 hours</li>
                  <li style="margin-bottom: 8px;">📧 You'll receive a personalized response from our experts</li>
                  <li style="margin-bottom: 8px;">🔄 We may follow up with additional questions if needed</li>
                  <li style="margin-bottom: 8px;">⚡ For urgent legal matters, consider using our AI mentor for immediate assistance</li>
                </ul>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NEXTAUTH_URL}/ai-mentor" 
                     style="background: #3b82f6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; margin: 0 10px;">
                    Try AI Mentor
                  </a>
                  <a href="${process.env.NEXTAUTH_URL}/lawyers" 
                     style="background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; margin: 0 10px;">
                    Find Lawyers
                  </a>
                </div>
                
                <p style="line-height: 1.6; color: #475569; margin-top: 25px;">
                  If you have any urgent questions, feel free to reach out to us directly at 
                  <a href="mailto:support@lawease.in" style="color: #3b82f6;">support@lawease.in</a>
                </p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                  <p style="color: #64748b; font-size: 14px; margin: 0;">
                    Best regards,<br>
                    The LawEase Team<br>
                    <a href="${process.env.NEXTAUTH_URL}" style="color: #3b82f6;">www.lawease.in</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div style="padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
              <p>© 2024 LawEase. Making legal services accessible to all Indians.</p>
              <p>This is an automated confirmation email. Please do not reply directly to this email.</p>
            </div>
          </div>
        `
      })
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the form submission if email fails
    }

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
      messageId: contactMessage.id
    }

  } catch (error) {
    console.error("Error submitting contact form:", error)
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
        field: error.issues[0].path[0]
      }
    }
    
    return {
      success: false,
      error: "Failed to submit your message. Please try again later."
    }
  }
}

export async function getContactMessages(page: number = 1, limit: number = 20) {
  try {
    const skip = (page - 1) * limit

    const [messages, totalCount] = await Promise.all([
      prisma.contactMessage.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          message: true,
          userType: true,
          isRead: true,
          isResolved: true,
          createdAt: true,
        }
      }),
      prisma.contactMessage.count()
    ])

    return {
      success: true,
      messages,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    }

  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return {
      success: false,
      error: "Failed to fetch contact messages"
    }
  }
}

export async function markMessageAsRead(messageId: string) {
  try {
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true, updatedAt: new Date() }
    })

    return {
      success: true,
      message: "Message marked as read"
    }

  } catch (error) {
    console.error("Error marking message as read:", error)
    return {
      success: false,
      error: "Failed to update message status"
    }
  }
}

export async function markMessageAsResolved(messageId: string, adminNotes?: string) {
  try {
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { 
        isResolved: true, 
        isRead: true,
        adminNotes,
        updatedAt: new Date() 
      }
    })

    return {
      success: true,
      message: "Message marked as resolved"
    }

  } catch (error) {
    console.error("Error marking message as resolved:", error)
    return {
      success: false,
      error: "Failed to update message status"
    }
  }
}
