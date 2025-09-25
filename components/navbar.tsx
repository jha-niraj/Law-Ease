"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Scale } from "lucide-react"
import { useRouter } from "next/navigation" // Import useRouter for navigation
import { ThemeSwitcher } from "@/components/theme-switcher"
import Link from "next/link"

interface NavbarProps {
    isLoggedIn?: boolean
    userType?: "student" | "public" | null
}

export function Navbar({ isLoggedIn = false, userType = null }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter() // Initialize useRouter

    const handleNavClick = (section: string) => {
        if (!isLoggedIn) {
            alert("Please log in to access this section")
            router.push("/login") // Assuming a /login route for authentication
            return
        }

        if (isLoggedIn) {
            if (section === "student" && userType === "student") {
                router.push("/student")
            } else if (section === "public" && userType === "public") {
                router.push("/public")
            } else if (section === "home") {
                router.push("/")
            } else {
                // For other sections like 'about', 'contact' or if userType doesn't match section
                // In a real app, you might have specific routes for these or handle them differently
            }
        }
    }

    return (
        <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <span className="font-serif font-bold text-xl text-foreground">LawEase</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavClick("home")}
                            className="text-foreground hover:text-accent transition-colors font-medium"
                        >
                            Home
                        </button>
                        {isLoggedIn &&
                            userType === "student" && ( // Conditionally render Student link
                                <button
                                    onClick={() => handleNavClick("student")}
                                    className="text-foreground hover:text-accent transition-colors font-medium"
                                >
                                    Student
                                </button>
                            )}
                        {isLoggedIn &&
                            userType === "public" && ( // Conditionally render Public link
                                <button
                                    onClick={() => handleNavClick("public")}
                                    className="text-foreground hover:text-accent transition-colors font-medium"
                                >
                                    Public
                                </button>
                            )}
                        <button
                            onClick={() => handleNavClick("about")}
                            className="text-foreground hover:text-accent transition-colors font-medium"
                        >
                            About
                        </button>
                        <button
                            onClick={() => handleNavClick("contact")}
                            className="text-foreground hover:text-accent transition-colors font-medium"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Theme Switcher, Language Switcher & Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <ThemeSwitcher />

                        {!isLoggedIn ? (
                            <div className="hidden md:flex space-x-2">
                                <Button
                                    variant="outline"
                                    className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-950/50"
                                    onClick={() => router.push("/signup?ref=student")}
                                >
                                    Study
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-600 dark:text-indigo-300 dark:hover:bg-indigo-950/50"
                                    onClick={() => router.push("/signup?ref=lawyer")}
                                >
                                    Join as Lawyer
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-foreground hover:text-blue-600 dark:hover:text-blue-400"
                                    onClick={() => router.push("/signin")}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                                    onClick={() => router.push("/signup")}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                className="text-foreground hover:text-accent"
                                onClick={() => router.push("/logout")}
                            >
                                {" "}
                                {/* Add onClick for Logout */}
                                Logout
                            </Button>
                        )}

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => handleNavClick("home")}
                                className="text-left text-foreground hover:text-accent transition-colors font-medium py-2"
                            >
                                Home
                            </button>
                            {isLoggedIn &&
                                userType === "student" && ( // Conditionally render Student link
                                    <button
                                        onClick={() => handleNavClick("student")}
                                        className="text-left text-foreground hover:text-accent transition-colors font-medium py-2"
                                    >
                                        Student
                                    </button>
                                )}
                            {isLoggedIn &&
                                userType === "public" && ( // Conditionally render Public link
                                    <button
                                        onClick={() => handleNavClick("public")}
                                        className="text-left text-foreground hover:text-accent transition-colors font-medium py-2"
                                    >
                                        Public
                                    </button>
                                )}
                            <button
                                onClick={() => handleNavClick("about")}
                                className="text-left text-foreground hover:text-accent transition-colors font-medium py-2"
                            >
                                About
                            </button>
                            <button
                                onClick={() => handleNavClick("contact")}
                                className="text-left text-foreground hover:text-accent transition-colors font-medium py-2"
                            >
                                Contact
                            </button>

                            {!isLoggedIn && (
                                <div className="flex flex-col space-y-3 pt-4">
                                    <div className="flex space-x-2">
                                        <Button 
                                            variant="outline" 
                                            className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-50" 
                                            onClick={() => router.push("/signup?ref=student")}
                                        >
                                            Study
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className="flex-1 border-indigo-300 text-indigo-700 hover:bg-indigo-50" 
                                            onClick={() => router.push("/signup?ref=lawyer")}
                                        >
                                            Join as Lawyer
                                        </Button>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" className="flex-1" onClick={() => router.push("/signin")}>
                                            Sign In
                                        </Button>
                                        <Button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600" onClick={() => router.push("/signup")}>
                                            Sign Up
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}