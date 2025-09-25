"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageSquare, Scale, Users, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { LawyerDashboard } from "@/components/dashboard/lawyer-dashboard"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"

export default function Dashboard() {
	const { data: session } = useSession()

	// Show role-specific dashboard
	if (session?.user?.role === "LAWYER") {
		return <LawyerDashboard />
	}

	if (session?.user?.role === "STUDENT") {
		return <StudentDashboard />
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50 p-6">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Welcome Section */}
				<div className="text-center space-y-4">
					<div className="space-y-2">
						<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
							Welcome to LawEase
						</h1>
						<p className="text-xl text-neutral-600">
							Hello, {session?.user?.name}! Your AI-powered legal assistant is ready to help.
						</p>
					</div>
					<Badge variant="outline" className="text-sm px-3 py-1">
						🇮🇳 Built for Indian Legal System
					</Badge>
				</div>

				{/* Main AI Mentor Card */}
				<Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
					<CardHeader className="text-center pb-4">
						<div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
							<Bot className="w-8 h-8 text-white" />
						</div>
						<CardTitle className="text-2xl text-teal-800">AI Legal Mentor</CardTitle>
						<CardDescription className="text-lg text-neutral-600">
							Get instant legal guidance powered by OpenAI and voice conversations through ElevenLabs
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<div className="flex items-center justify-center space-x-2 text-teal-600">
								<MessageSquare className="w-5 h-5" />
								<span className="text-sm font-medium">Voice Conversations</span>
							</div>
							<div className="flex items-center justify-center space-x-2 text-emerald-600">
								<Scale className="w-5 h-5" />
								<span className="text-sm font-medium">Indian Constitution</span>
							</div>
							<div className="flex items-center justify-center space-x-2 text-teal-600">
								<Sparkles className="w-5 h-5" />
								<span className="text-sm font-medium">AI-Powered Analysis</span>
							</div>
						</div>
						<Link href="/ai-mentor">
							<Button size="lg" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
								Start AI Legal Consultation
								<ArrowRight className="ml-2 w-5 h-5" />
							</Button>
						</Link>
					</CardContent>
				</Card>

				{/* Feature Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<Card className="bg-white/60 backdrop-blur-sm border border-neutral-200/50 hover:shadow-lg transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
								<Scale className="w-6 h-6 text-teal-600" />
							</div>
							<CardTitle className="text-lg">Know Your Rights</CardTitle>
							<CardDescription>
								Learn about your fundamental rights under the Indian Constitution
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full" disabled>
								Coming Soon
							</Button>
						</CardContent>
					</Card>

					<Card className="bg-white/60 backdrop-blur-sm border border-neutral-200/50 hover:shadow-lg transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
								<Users className="w-6 h-6 text-emerald-600" />
							</div>
							<CardTitle className="text-lg">Legal Aid</CardTitle>
							<CardDescription>
								Connect with legal aid services and check your eligibility
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full" disabled>
								Coming Soon
							</Button>
						</CardContent>
					</Card>

					<Card className="bg-white/60 backdrop-blur-sm border border-neutral-200/50 hover:shadow-lg transition-all duration-300">
						<CardHeader>
							<div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
								<MessageSquare className="w-6 h-6 text-purple-600" />
							</div>
							<CardTitle className="text-lg">Find Lawyers</CardTitle>
							<CardDescription>
								Connect with qualified lawyers and legal professionals
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full" disabled>
								Coming Soon
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Legal Disclaimer */}
				<Card className="bg-amber-50/80 border border-amber-200/50">
					<CardContent className="pt-6">
						<div className="text-center space-y-2">
							<h3 className="font-semibold text-amber-800">Important Legal Disclaimer</h3>
							<p className="text-sm text-amber-700">
								LawEase provides general legal information for educational purposes only. 
								This is not legal advice and should not be relied upon for specific legal matters. 
								Always consult with qualified legal professionals for your specific situation.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
