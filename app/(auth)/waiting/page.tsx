"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export default function Waiting() {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()

    const steps = [
        "Setting up your account...",
        "Preparing your learning environment...",
        "Customizing your experience...",
        "Almost there...",
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            if (progress < 100) {
                setProgress((prev) => {
                    const newProgress = prev + 1

                    // Update step based on progress
                    if (newProgress > 75) setCurrentStep(3)
                    else if (newProgress > 50) setCurrentStep(2)
                    else if (newProgress > 25) setCurrentStep(1)

                    return newProgress
                })
            } else {
                // Redirect when complete
                router.push("/dashboard")
            }
        }, 50)

        return () => clearTimeout(timer)
    }, [progress, router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-teal-800 mb-2">Setting up your account</h1>
                    <p className="text-teal-600">Please wait while we prepare your account</p>
                </div>
                <div className="flex flex-col items-center justify-center py-8 space-y-8">
                    <div className="relative w-32 h-32">
                        {progress < 100 ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full border-4 border-teal-200 border-t-teal-600 rounded-full"
                            />
                        ) : (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, ease: "backOut" }}
                                className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center"
                            >
                                <CheckCircle className="w-16 h-16 text-white" />
                            </motion.div>
                        )}
                    </div>
                    <Progress
                        value={progress}
                        className="w-full max-w-xs h-2"
                    />
                    <div className="text-center">
                        <p className="text-teal-600 font-medium">{steps[currentStep]}</p>
                        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                    </div>
                </div>
            </div>
        </div>
    )
}