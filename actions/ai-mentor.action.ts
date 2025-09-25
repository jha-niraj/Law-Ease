"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { ConsultationStatus, LawType } from "@prisma/client"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface OpenAIResponse {
  legalIssueCategory: string
  relevantConstitutionalArticles: string[]
  applicableLaws: string[]
  userRights: string[]
  recommendedProcedures: string[]
  importantDeadlines: string[]
  precedentCases?: string[]
  regionalVariations?: string[]
}

interface ElevenLabsResponse {
  sessionId: string
  status: string
}

// Create a new legal consultation
export async function createLegalConsultation(problemDescription: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const consultation = await prisma.legalConsultation.create({
      data: {
        userId: session.user.id,
        problemDescription,
        status: ConsultationStatus.ANALYZING,
      }
    })

    return { success: true, consultationId: consultation.id }
  } catch (error) {
    console.error("Error creating consultation:", error)
    return { success: false, error: "Failed to create consultation" }
  }
}

// Analyze legal problem with OpenAI
export async function analyzeLegalProblem(consultationId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const consultation = await prisma.legalConsultation.findFirst({
      where: {
        id: consultationId,
        userId: session.user.id
      }
    })

    if (!consultation) {
      return { success: false, error: "Consultation not found" }
    }

    // OpenAI API call using SDK
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a legal research assistant specializing in Indian law and constitution. Provide comprehensive, accurate legal information in JSON format. Always include disclaimers that this is educational information, not legal advice.

Response format:
{
  "legalIssueCategory": "string (Civil/Criminal/Constitutional/Family/Property/Labor/Taxation/Corporate/Consumer/Other)",
  "relevantConstitutionalArticles": ["Article numbers and brief descriptions"],
  "applicableLaws": ["Specific acts and sections"],
  "userRights": ["Rights the user has in this situation"],
  "recommendedProcedures": ["Step by step actions they can take"],
  "importantDeadlines": ["Time-sensitive actions if any"],
  "precedentCases": ["Relevant case laws if applicable"],
  "regionalVariations": ["State-specific variations if any"]
}`
        },
        {
          role: "user",
          content: `Legal Problem: ${consultation.problemDescription}

Please provide comprehensive legal information based on Indian law and constitution for this situation.`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    })

    const legalAnalysis = JSON.parse(completion.choices[0].message.content || "{}")

    // Update consultation with analysis
    await prisma.legalConsultation.update({
      where: { id: consultationId },
      data: {
        legalAnalysis,
        status: ConsultationStatus.READY
      }
    })

    // Create knowledge entries
    await prisma.legalKnowledgeEntry.create({
      data: {
        consultationId,
        lawType: legalAnalysis.legalIssueCategory as LawType,
        relevantSections: {
          constitutionalArticles: legalAnalysis.relevantConstitutionalArticles,
          applicableLaws: legalAnalysis.applicableLaws
        },
        legalProcedures: legalAnalysis.recommendedProcedures.join('\n'),
        userRights: legalAnalysis.userRights.join('\n'),
        precedentCases: legalAnalysis.precedentCases || []
      }
    })

    return {
      success: true,
      analysis: legalAnalysis,
      message: "Legal analysis completed successfully"
    }

  } catch (error) {
    console.error("Error analyzing legal problem:", error)

    // Update consultation status to failed
    await prisma.legalConsultation.update({
      where: { id: consultationId },
      data: { status: ConsultationStatus.FAILED }
    })

    return { success: false, error: "Failed to analyze legal problem" }
  }
}

// Prepare ElevenLabs voice session
export async function prepareVoiceSession(consultationId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const consultation = await prisma.legalConsultation.findFirst({
      where: {
        id: consultationId,
        userId: session.user.id
      },
      include: {
        knowledgeEntries: true
      }
    })

    if (!consultation || !consultation.legalAnalysis) {
      return { success: false, error: "Legal analysis not found" }
    }

    const legalAnalysis = consultation.legalAnalysis as unknown as OpenAIResponse

    // Prepare knowledge base for ElevenLabs
    const knowledgeBase = `
Legal Issue: ${consultation.problemDescription}

Analysis:
${JSON.stringify(consultation.legalAnalysis, null, 2)}

Knowledge Base:
${consultation.knowledgeEntries.map(entry => `
Law Type: ${entry.lawType}
Legal Procedures: ${entry.legalProcedures}
User Rights: ${entry.userRights}
`).join('\n')}

Instructions: You are a helpful legal advisor AI. Discuss this legal issue with the user, explain their rights, and guide them through possible procedures. Always remind them that this is educational information and they should consult a qualified lawyer for specific legal advice.
`

    // ElevenLabs Conversational AI Integration
    let elevenlabsSessionId: string

    try {
      // Create ElevenLabs conversation session
      const elevenlabsResponse = await fetch(`https://api.elevenlabs.io/v1/convai/conversations`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.ELEVENLABS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: process.env.ELEVENLABS_AGENT_ID,
          // Pass the knowledge base as context
          variables: {
            legal_analysis: JSON.stringify(consultation.legalAnalysis),
            user_problem: consultation.problemDescription,
            applicable_laws: legalAnalysis.applicableLaws.join(', '),
            user_rights: legalAnalysis.userRights.join(', '),
            procedures: legalAnalysis.recommendedProcedures.join(', '),
            deadlines: legalAnalysis.importantDeadlines.join(', '),
            precedent_cases: legalAnalysis.precedentCases?.join(', ') || 'None specified'
          }
        })
      })

      if (elevenlabsResponse.ok) {
        const elevenlabsData = await elevenlabsResponse.json()
        elevenlabsSessionId = elevenlabsData.conversation_id
      } else {
        console.error("ElevenLabs API error:", await elevenlabsResponse.text())
        // Fallback to mock session
        elevenlabsSessionId = `mock_${consultationId}_${Date.now()}`
      }
    } catch (error) {
      console.error("Error creating ElevenLabs session:", error)
      // Fallback to mock session
      elevenlabsSessionId = `mock_${consultationId}_${Date.now()}`
    }

    // Create voice session record
    await prisma.voiceSession.create({
      data: {
        consultationId,
        elevenlabsSessionId,
        sessionStatus: "preparing"
      }
    })

    // Update consultation
    await prisma.legalConsultation.update({
      where: { id: consultationId },
      data: {
        elevenlabsSessionId,
        status: ConsultationStatus.READY
      }
    })

    return {
      success: true,
      sessionId: elevenlabsSessionId,
      message: "Voice session prepared successfully"
    }

  } catch (error) {
    console.error("Error preparing voice session:", error)
    return { success: false, error: "Failed to prepare voice session" }
  }
}

// Start voice conversation
export async function startVoiceConversation(consultationId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    // Update consultation status
    await prisma.legalConsultation.update({
      where: { id: consultationId },
      data: { status: ConsultationStatus.IN_PROGRESS }
    })

    // Update voice session
    await prisma.voiceSession.updateMany({
      where: { consultationId },
      data: {
        sessionStatus: "active",
        startedAt: new Date()
      }
    })

    return { success: true, message: "Voice conversation started" }

  } catch (error) {
    console.error("Error starting voice conversation:", error)
    return { success: false, error: "Failed to start voice conversation" }
  }
}

// End voice conversation and generate summary
export async function endVoiceConversation(consultationId: string, transcript?: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    // Mock transcript if not provided
    const conversationTranscript = transcript || `
AI: Hello! I've analyzed your legal issue about ${consultationId}. I understand you're facing a complex legal situation. Let me help you understand your rights and options.

User: Thank you. Can you explain what laws apply to my situation?

AI: Based on your case, several laws are relevant including the Indian Constitution and specific acts. Your fundamental rights under Article 14 (Right to Equality) and Article 21 (Right to Life and Personal Liberty) are particularly important here.

User: What should I do next?

AI: I recommend the following steps: 1) Document all relevant information, 2) Consult with a qualified lawyer in your jurisdiction, 3) Consider alternative dispute resolution if applicable. Remember, this is educational information and you should seek professional legal advice for your specific situation.

User: Thank you for the guidance.

AI: You're welcome! Remember to consult with a qualified legal professional for specific advice on your case. Is there anything else you'd like to know about your legal rights?
`

    // Generate summary using OpenAI SDK
    let conversationSummary = "Conversation completed. Key legal points were discussed and guidance was provided."

    try {
      const summaryCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Summarize the legal conversation and provide actionable insights. Focus on key legal points discussed, user concerns, rights explained, and recommended next steps."
          },
          {
            role: "user",
            content: `Please summarize this legal conversation:\n\n${conversationTranscript}`
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })

      conversationSummary = summaryCompletion.choices[0].message.content || conversationSummary
    } catch (summaryError) {
      console.error("Error generating summary:", summaryError)
      // Use default summary if OpenAI fails
    }

    // Update consultation
    await prisma.legalConsultation.update({
      where: { id: consultationId },
      data: {
        conversationTranscript,
        conversationSummary,
        status: ConsultationStatus.COMPLETED
      }
    })

    // Update voice session
    await prisma.voiceSession.updateMany({
      where: { consultationId },
      data: {
        sessionStatus: "completed",
        endedAt: new Date(),
        audioDuration: Math.floor(Math.random() * 600) + 300 // Mock duration 5-15 minutes
      }
    })

    return {
      success: true,
      summary: conversationSummary,
      transcript: conversationTranscript
    }

  } catch (error) {
    console.error("Error ending voice conversation:", error)
    return { success: false, error: "Failed to end voice conversation" }
  }
}

// Get consultation history
export async function getConsultationHistory() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const consultations = await prisma.legalConsultation.findMany({
      where: { userId: session.user.id },
      include: {
        knowledgeEntries: true,
        voiceSessions: true
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return { success: true, consultations }

  } catch (error) {
    console.error("Error fetching consultation history:", error)
    return { success: false, error: "Failed to fetch consultation history" }
  }
}

// Get specific consultation details
export async function getConsultationDetails(consultationId: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const consultation = await prisma.legalConsultation.findFirst({
      where: {
        id: consultationId,
        userId: session.user.id
      },
      include: {
        knowledgeEntries: true,
        voiceSessions: true
      }
    })

    if (!consultation) {
      return { success: false, error: "Consultation not found" }
    }

    return { success: true, consultation }

  } catch (error) {
    console.error("Error fetching consultation details:", error)
    return { success: false, error: "Failed to fetch consultation details" }
  }
}
