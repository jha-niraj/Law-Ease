"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Bot, ArrowRight, Loader2, Scale, Sparkles, Volume2 } from "lucide-react"
import Link from "next/link"
import { ElevenLabsVoice } from "@/components/elevenlabs-voice"
import { 
  createLegalConsultation, 
  analyzeLegalProblem, 
  prepareVoiceSession, 
  startVoiceConversation, 
  endVoiceConversation 
} from "@/actions/ai-mentor.action"
import { toast } from "sonner"

interface LegalAnalysis {
	applicableLaws: string[]
	userRights: string[]
	recommendedProcedures: string[]
	importantDeadlines: string[]
	precedentCases?: string[]
}

export default function AIMentorPage() {
	const [problem, setProblem] = useState("")
	const [conversationSummary, setConversationSummary] = useState("")
	const [currentStep, setCurrentStep] = useState<'input' | 'analyzing' | 'preparing' | 'ready' | 'conversation' | 'summary'>('input')
	const [consultationId, setConsultationId] = useState<string | null>(null)
	const [sessionId, setSessionId] = useState<string | null>(null)
	const [analysis, setAnalysis] = useState<LegalAnalysis | null>(null)

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

			setAnalysis(analysisResult.analysis)
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
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50 dark:from-slate-900 dark:via-teal-900/30 dark:to-emerald-900/50 p-6">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Header */}
				<div className="text-center space-y-4">
					<div className="flex items-center justify-center space-x-3">
						<div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg">
							<Bot className="w-8 h-8 text-white" />
						</div>
						<h1 className="text-4xl font-bold text-gray-900 dark:text-white">AI Legal Mentor</h1>
					</div>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Get instant legal guidance powered by AI. Describe your legal issue and receive comprehensive analysis based on Indian law and constitution.
					</p>
				</div>

				{/* Progress Steps */}
				<div className="flex justify-center">
					<div className="flex items-center space-x-4">
						{['input', 'analyzing', 'preparing', 'ready', 'conversation', 'summary'].map((step, index) => {
							const isActive = currentStep === step
							const isCompleted = ['input', 'analyzing', 'preparing', 'ready', 'conversation', 'summary'].indexOf(currentStep) > index
							
							return (
								<div key={step} className="flex items-center">
									<div className={`
										w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
										${isActive ? 'bg-teal-600 text-white' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}
									`}>
										{index + 1}
									</div>
									{index < 5 && (
										<div className={`w-8 h-0.5 ${isCompleted ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
									)}
								</div>
							)
						})}
					</div>
				</div>

				{/* Input Form */}
				{currentStep === 'input' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl dark:bg-gray-800/80 dark:border-teal-700/50">
						<CardHeader>
							<CardTitle className="text-2xl text-teal-800 dark:text-teal-200">Describe Your Legal Issue</CardTitle>
							<CardDescription className="text-gray-600 dark:text-gray-400">
								Provide as much detail as possible about your legal problem for better analysis
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								<Textarea
									placeholder="e.g., My landlord is trying to evict me without proper notice, or I need help understanding property inheritance laws in India..."
									value={problem}
									onChange={(e) => setProblem(e.target.value)}
									rows={6}
									className="resize-y border-teal-200 focus:border-teal-500 dark:border-teal-700 dark:focus:border-teal-400"
								/>
								<Button 
									type="submit"
									size="lg"
									className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
								>
									<Sparkles className="mr-2 w-5 h-5" />
									Analyze Legal Issue
									<ArrowRight className="ml-2 w-5 h-5" />
								</Button>
							</form>
						</CardContent>
					</Card>
				)}

				{/* Analyzing State */}
				{currentStep === 'analyzing' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-xl dark:bg-gray-800/80 dark:border-blue-700/50">
						<CardContent className="text-center space-y-6 py-12">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
								<Loader2 className="w-8 h-8 text-white animate-spin" />
							</div>
							<div className="space-y-2">
								<h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Analyzing Your Legal Issue</h3>
								<p className="text-gray-600 dark:text-gray-400">
									Our AI is researching Indian laws and constitutional provisions relevant to your case...
								</p>
							</div>
							<div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
								<p className="text-sm text-blue-700 dark:text-blue-300">
									⚖️ Analyzing constitutional articles, applicable laws, and your legal rights
								</p>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Preparing Voice Session */}
				{currentStep === 'preparing' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50 shadow-xl dark:bg-gray-800/80 dark:border-purple-700/50">
						<CardContent className="text-center space-y-6 py-12">
							<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
								<Volume2 className="w-8 h-8 text-white animate-pulse" />
							</div>
							<div className="space-y-2">
								<h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">Preparing Your AI Advisor</h3>
								<p className="text-gray-600 dark:text-gray-400">
									Setting up your personalized legal consultation session...
								</p>
							</div>
							<div className="bg-purple-50 dark:bg-purple-950/50 p-4 rounded-lg">
								<p className="text-sm text-purple-700 dark:text-purple-300">
									🤖 Training AI with your case details and relevant legal knowledge
								</p>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Voice Mode */}
				{(currentStep === 'ready' || currentStep === 'conversation') && (
					<ElevenLabsVoice
						isActive={currentStep === 'conversation'}
						onStart={startConversation}
						onEnd={endConversation}
						sessionId={sessionId}
						legalAnalysis={analysis || undefined}
						userProblem={problem}
					/>
				)}

				{/* Summary */}
				{currentStep === 'summary' && (
					<Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl dark:bg-gray-800/80 dark:border-teal-700/50">
						<CardHeader>
							<CardTitle className="text-xl text-teal-800 dark:text-teal-200">Consultation Summary</CardTitle>
							<CardDescription>
								Here&apos;s what we discussed about your legal issue
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="bg-teal-50 dark:bg-teal-950/50 p-4 rounded-lg">
								<pre className="text-sm text-teal-800 dark:text-teal-200 whitespace-pre-wrap">{conversationSummary}</pre>
							</div>
							<div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
								<div className="flex items-start space-x-3">
									<Scale className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
									<div>
										<h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
											⚖️ Legal Disclaimer
										</h4>
										<p className="text-sm text-amber-700 dark:text-amber-300">
											This is educational information and should not be considered as legal advice. 
											Please consult with a qualified lawyer for specific legal guidance on your case.
										</p>
									</div>
								</div>
							</div>
							<div className="flex space-x-4">
								<Button 
									onClick={resetSession}
									variant="outline" 
									className="flex-1 border-teal-300 text-teal-700 hover:bg-teal-50 dark:border-teal-600 dark:text-teal-300 dark:hover:bg-teal-950"
								>
									New Consultation
								</Button>
								<Link href="/consultations" className="flex-1">
									<Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white">
										View All Consultations
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	)
}
