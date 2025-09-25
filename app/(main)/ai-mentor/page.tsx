"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bot, ArrowRight, Loader2, MessageSquare, Scale, Sparkles, Volume2 } from "lucide-react"
import Link from "next/link"
import { VoiceMode } from "@/components/voice-mode"
import { 
  createLegalConsultation, 
  analyzeLegalProblem, 
  prepareVoiceSession, 
  startVoiceConversation, 
  endVoiceConversation 
} from "@/actions/ai-mentor.action"
import { toast } from "sonner"

export default function AIMentorPage() {
	const [problem, setProblem] = useState("")
	const [conversationSummary, setConversationSummary] = useState("")
	const [currentStep, setCurrentStep] = useState<'input' | 'analyzing' | 'preparing' | 'ready' | 'conversation' | 'summary'>('input')
	const [consultationId, setConsultationId] = useState<string | null>(null)
	const [sessionId, setSessionId] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!problem.trim()) return

		try {
			// Step 1: Create consultation
			setCurrentStep('analyzing')
			
			const createResult = await createLegalConsultation(problem)
			if (!createResult.success) {
				toast.error(createResult.error || "Failed to create consultation")
				setCurrentStep('input')
				return
			}

			setConsultationId(createResult.consultationId!)

			// Step 2: Analyze with OpenAI
			const analysisResult = await analyzeLegalProblem(createResult.consultationId!)
			if (!analysisResult.success) {
				toast.error(analysisResult.error || "Failed to analyze legal problem")
				setCurrentStep('input')
				return
			}

			setCurrentStep('preparing')

			// Step 3: Prepare voice session
			const voiceResult = await prepareVoiceSession(createResult.consultationId!)
			if (!voiceResult.success) {
				toast.error(voiceResult.error || "Failed to prepare voice session")
				setCurrentStep('input')
				return
			}

			setSessionId(voiceResult.sessionId!)
			setCurrentStep('ready')
			toast.success("Your AI legal advisor is ready!")

		} catch (error) {
			console.error("Error in handleSubmit:", error)
			toast.error("Something went wrong. Please try again.")
			setCurrentStep('input')
		}
	}

	const startConversation = async () => {
		if (!consultationId) return

		try {
			setCurrentStep('conversation')
			
			const result = await startVoiceConversation(consultationId)
			if (!result.success) {
				toast.error(result.error || "Failed to start conversation")
				setCurrentStep('ready')
				return
			}

			toast.success("Voice conversation started!")
		} catch (error) {
			console.error("Error starting conversation:", error)
			toast.error("Failed to start conversation")
			setCurrentStep('ready')
		}
	}

	const endConversation = async () => {
		if (!consultationId) return

		try {
			
			const result = await endVoiceConversation(consultationId)
			if (result.success) {
				setConversationSummary(result.summary || "Conversation completed successfully.")
				setCurrentStep('summary')
				toast.success("Conversation ended and summary generated!")
			} else {
				toast.error(result.error || "Failed to end conversation properly")
				setCurrentStep('summary')
				setConversationSummary("Conversation ended. Please consult a qualified lawyer for specific legal advice.")
			}
		} catch (error) {
			console.error("Error ending conversation:", error)
			toast.error("Failed to end conversation properly")
			setCurrentStep('summary')
			setConversationSummary("Conversation ended. Please consult a qualified lawyer for specific legal advice.")
		}
	}

	const resetSession = () => {
		setProblem("")
		setCurrentStep('input')
		setConversationSummary("")
		setConsultationId(null)
		setSessionId(null)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50 p-6">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Header */}
				<div className="text-center space-y-4">
					<Link href="/dashboard" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4">
						← Back to Dashboard
					</Link>
					<div className="space-y-2">
						<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
							AI Legal Mentor
						</h1>
						<p className="text-xl text-neutral-600">
							Describe your legal problem and get instant AI-powered guidance
						</p>
					</div>
					<div className="flex justify-center space-x-2">
						<Badge variant="outline" className="text-sm px-3 py-1">
							<Bot className="w-4 h-4 mr-1" />
							OpenAI Powered
						</Badge>
						<Badge variant="outline" className="text-sm px-3 py-1">
							<Volume2 className="w-4 h-4 mr-1" />
							Voice Conversations
						</Badge>
						<Badge variant="outline" className="text-sm px-3 py-1">
							<Scale className="w-4 h-4 mr-1" />
							Indian Law
						</Badge>
					</div>
				</div>

				{/* Main Content */}
				{currentStep === 'input' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl text-teal-800">Describe Your Legal Problem</CardTitle>
							<CardDescription className="text-lg">
								Be as detailed as possible. Our AI will analyze your situation based on Indian laws and constitution.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="space-y-2">
									<Textarea
										placeholder="Example: My landlord is asking me to vacate the property without giving proper notice. I have been living here for 2 years and have a rental agreement. What are my rights and what should I do?"
										value={problem}
										onChange={(e) => setProblem(e.target.value)}
										className="min-h-[120px] border-teal-200 focus:border-teal-300 focus:ring-teal-200"
										required
									/>
									<p className="text-sm text-neutral-500">
										Minimum 20 characters required for analysis
									</p>
								</div>
								<Button 
									type="submit" 
									size="lg" 
									className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
									disabled={problem.trim().length < 20}
								>
									Analyze My Legal Problem
									<ArrowRight className="ml-2 w-5 h-5" />
								</Button>
							</form>
						</CardContent>
					</Card>
				)}

				{currentStep === 'analyzing' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl">
						<CardContent className="text-center space-y-6 py-12">
							<div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
								<Loader2 className="w-8 h-8 text-white animate-spin" />
							</div>
							<div className="space-y-2">
								<h3 className="text-xl font-semibold text-teal-800">Analyzing Your Legal Issue</h3>
								<p className="text-neutral-600">
									Our AI is researching relevant Indian laws, constitutional articles, and legal procedures...
								</p>
							</div>
							<div className="flex justify-center space-x-4 text-sm text-neutral-500">
								<span className="flex items-center">
									<Sparkles className="w-4 h-4 mr-1" />
									Checking Constitution
								</span>
								<span className="flex items-center">
									<Scale className="w-4 h-4 mr-1" />
									Finding Relevant Laws
								</span>
								<span className="flex items-center">
									<MessageSquare className="w-4 h-4 mr-1" />
									Preparing Context
								</span>
							</div>
						</CardContent>
					</Card>
				)}

				{currentStep === 'preparing' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl">
						<CardContent className="text-center space-y-6 py-12">
							<div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
								<Loader2 className="w-8 h-8 text-white animate-spin" />
							</div>
							<div className="space-y-2">
								<h3 className="text-xl font-semibold text-emerald-800">Preparing Your Legal Advisor</h3>
								<p className="text-neutral-600">
									Setting up voice AI with your specific legal context and knowledge base...
								</p>
							</div>
							<div className="bg-emerald-50 p-4 rounded-lg">
								<p className="text-sm text-emerald-700">
									Your AI advisor will have comprehensive knowledge about your specific legal situation
								</p>
							</div>
						</CardContent>
					</Card>
				)}

				{(currentStep === 'ready' || currentStep === 'conversation') && (
					<VoiceMode
						isActive={currentStep === 'conversation'}
						onStart={startConversation}
						onEnd={endConversation}
						sessionId={sessionId || undefined}
					/>
				)}

				{currentStep === 'summary' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl">
						<CardHeader>
							<CardTitle className="text-xl text-teal-800">Conversation Summary</CardTitle>
							<CardDescription>
								Here&apos;s what we discussed about your legal issue
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="bg-teal-50 p-4 rounded-lg">
								<pre className="text-sm text-teal-800 whitespace-pre-wrap">{conversationSummary}</pre>
							</div>
							<div className="flex space-x-4">
								<Button 
									onClick={resetSession}
									variant="outline"
									className="flex-1"
								>
									Ask Another Question
								</Button>
								<Button 
									className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
									disabled
								>
									Connect with Lawyer (Coming Soon)
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Legal Disclaimer */}
				<Card className="bg-amber-50/80 border border-amber-200/50">
					<CardContent className="pt-6">
						<div className="text-center space-y-2">
							<h3 className="font-semibold text-amber-800">⚖️ Legal Disclaimer</h3>
							<p className="text-sm text-amber-700">
								This AI provides general legal information based on Indian laws for educational purposes only. 
								This is not legal advice. Always consult qualified legal professionals for specific legal matters.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}