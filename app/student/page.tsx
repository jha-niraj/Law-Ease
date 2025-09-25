"use client"

import { Button } from "@/components/ui/button"

import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BookOpen,
    FileText,
    MessageCircle,
    Users,
    GraduationCap,
    Lightbulb,
    Library,
    Search,
    CalendarDays,
} from "lucide-react"

export default function StudentLandingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar isLoggedIn={true} userType="student" />

            {/* Hero Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-accent/5 to-background">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-4 animate-fade-in-up">
                        Welcome, Future Legal Professional!
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-left animate-delay-200">
                        Your personalized hub for legal education, resources, and community support.
                    </p>
                </div>
            </section>

            {/* My Courses Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">My Courses</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Continue your legal learning journey with our structured courses.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <BookOpen className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle>Constitutional Law I</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Explore the foundational principles of constitutional law and governance.
                                </CardDescription>
                                <Button
                                    variant="outline"
                                    className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                                >
                                    Continue Course
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <FileText className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle>Criminal Procedure</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Understand the rules and procedures governing criminal investigations and trials.
                                </CardDescription>
                                <Button
                                    variant="outline"
                                    className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                                >
                                    Continue Course
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <GraduationCap className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle>Legal Research Methods</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Master the techniques for effective legal research and analysis.</CardDescription>
                                <Button
                                    variant="outline"
                                    className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                                >
                                    Continue Course
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Study Resources Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Study Resources</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Access a wealth of materials to aid your legal studies.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader className="pb-4">
                                <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <Library className="h-8 w-8 text-accent" />
                                </div>
                                <CardTitle className="text-xl">Case Briefs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center">Summaries of landmark cases for quick review.</CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader className="pb-4">
                                <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <Lightbulb className="h-8 w-8 text-accent" />
                                </div>
                                <CardTitle className="text-xl">Legal Concepts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center">
                                    Simplified explanations of complex legal terms.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader className="pb-4">
                                <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <Search className="h-8 w-8 text-accent" />
                                </div>
                                <CardTitle className="text-xl">Research Tools</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center">
                                    Access to legal databases and research guides.
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader className="pb-4">
                                <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <CalendarDays className="h-8 w-8 text-accent" />
                                </div>
                                <CardTitle className="text-xl">Exam Prep</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center">Practice questions and study plans for exams.</CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* AI Legal Assistant Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">AI Legal Assistant</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                        Get instant answers and guidance from our intelligent legal AI.
                    </p>
                    <div className="flex justify-center">
                        <Card className="w-full max-w-2xl p-8 text-center hover:shadow-lg transition-shadow">
                            <MessageCircle className="h-16 w-16 text-accent mx-auto mb-6" />
                            <CardTitle className="text-2xl mb-4">Ask a Question</CardTitle>
                            <CardDescription className="mb-6">
                                Type your legal query and get a concise, accurate response.
                            </CardDescription>
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                                Launch AI Chat
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Legal Document Templates Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Document Templates</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Access and customize essential legal document templates for your needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <FileText className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle>Contract Agreement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Standard contract template for various agreements.</CardDescription>
                                <Button
                                    variant="outline"
                                    className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                                >
                                    Download
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <FileText className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle>Non-Disclosure Agreement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Protect sensitive information with a robust NDA template.</CardDescription>
                                <Button
                                    variant="outline"
                                    className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                                >
                                    Download
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                            <CardHeader>
                                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                    <FileText className="h-6 w-6 text-accent" />
                                </div>
                                <CardTitle>Power of Attorney</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>Grant authority to another person for legal or financial matters.</CardDescription>
                                <Button
                                    variant="outline"
                                    className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                                >
                                    Download
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Community Forum Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Student Community Forum</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                        Connect with peers, discuss legal topics, and get support.
                    </p>
                    <div className="flex justify-center">
                        <Card className="w-full max-w-2xl p-8 text-center hover:shadow-lg transition-shadow">
                            <Users className="h-16 w-16 text-accent mx-auto mb-6" />
                            <CardTitle className="text-2xl mb-4">Join the Discussion</CardTitle>
                            <CardDescription className="mb-6">
                                Share insights, ask questions, and collaborate with other students.
                            </CardDescription>
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                                Go to Forum
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
}