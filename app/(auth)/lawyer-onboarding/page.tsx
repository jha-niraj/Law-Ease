"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, Clock, FileText, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { createLawyerProfile } from "@/actions/lawyer.action"

const specializations = [
    "CONSTITUTIONAL", "CIVIL", "CRIMINAL", "FAMILY", "PROPERTY",
    "LABOR", "TAXATION", "CORPORATE", "CONSUMER", "IMMIGRATION",
    "INTELLECTUAL_PROPERTY", "ENVIRONMENTAL", "OTHER"
]

const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
]

const daysOfWeek = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 1 },
    { name: "Tuesday", value: 2 },
    { name: "Wednesday", value: 3 },
    { name: "Thursday", value: 4 },
    { name: "Friday", value: 5 },
    { name: "Saturday", value: 6 }
]

interface AvailabilitySlot {
    dayOfWeek: number
    startTime: string
    endTime: string
    isAvailable: boolean
}

function LawyerOnboardingContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [, setEmail] = useState("")

    // Form data
    const [formData, setFormData] = useState({
        barRegistrationNumber: "",
        experience: "",
        selectedSpecializations: [] as string[],
        practiceAreas: "",
        education: "",
        certifications: "",
        languages: [] as string[],
        hourlyRate: "",
        currency: "INR",
    })

    const [availability, setAvailability] = useState<AvailabilitySlot[]>([])
    const [otherSpecialization, setOtherSpecialization] = useState("")
    const [newLanguage, setNewLanguage] = useState("")

    useEffect(() => {
        const emailParam = searchParams.get('email')
        if (emailParam) {
            setEmail(emailParam)
        }
    }, [searchParams])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSpecializationToggle = (specialization: string) => {
        setFormData(prev => ({
            ...prev,
            selectedSpecializations: prev.selectedSpecializations.includes(specialization)
                ? prev.selectedSpecializations.filter(s => s !== specialization)
                : [...prev.selectedSpecializations, specialization]
        }))
    }

    const applyOtherSpecialization = () => {
        const value = otherSpecialization.trim().toUpperCase().replace(/\s+/g, '_')
        if (!value) return
        if (!formData.selectedSpecializations.includes(value)) {
            setFormData(prev => ({
                ...prev,
                selectedSpecializations: [...prev.selectedSpecializations, value]
            }))
            setOtherSpecialization("")
            toast.success("Added custom specialization")
        }
    }

    const addLanguage = () => {
        if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
            setFormData(prev => ({
                ...prev,
                languages: [...prev.languages, newLanguage.trim()]
            }))
            setNewLanguage("")
        }
    }

    const removeLanguage = (language: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.filter(l => l !== language)
        }))
    }

    const addAvailabilitySlot = () => {
        setAvailability(prev => [...prev, {
            dayOfWeek: 1,
            startTime: "09:00",
            endTime: "17:00",
            isAvailable: true
        }])
    }

    const copySlotToWeekend = (index: number) => {
        const slot = availability[index]
        if (!slot) return
        const weekendDays = [0, 6]
        const newSlots: AvailabilitySlot[] = weekendDays.map(day => ({
            dayOfWeek: day,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable
        }))
        // Remove existing weekend slots to avoid duplicates
        setAvailability(prev => [
            ...prev.filter(s => !weekendDays.includes(s.dayOfWeek)),
            ...newSlots
        ])
        toast.success("Applied slot to weekend")
    }

    const copySlotToWeekdays = (index: number) => {
        const slot = availability[index]
        if (!slot) return
        const weekdays = [1,2,3,4,5]
        const newSlots: AvailabilitySlot[] = weekdays.map(day => ({
            dayOfWeek: day,
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: slot.isAvailable
        }))
        setAvailability(prev => [
            ...prev.filter(s => !weekdays.includes(s.dayOfWeek)),
            ...newSlots
        ])
        toast.success("Applied slot to all weekdays")
    }

    const updateAvailabilitySlot = (index: number, field: string, value: string | number | boolean) => {
        setAvailability(prev => prev.map((slot, i) =>
            i === index ? { ...slot, [field]: value } : slot
        ))
    }

    const removeAvailabilitySlot = (index: number) => {
        setAvailability(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const profileData = {
                ...formData,
                experience: parseInt(formData.experience),
                hourlyRate: parseFloat(formData.hourlyRate)
            }

            const result = await createLawyerProfile(profileData, availability)

            if (result.success) {
                toast.success(result.message)
                router.push("/dashboard")
            } else {
                toast.error(result.error || "Failed to create profile")
            }
        } catch {
            toast.error("Failed to create profile. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const stepVariants = {
        enter: { opacity: 0, x: 50 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <h1 className="text-3xl font-serif font-bold text-foreground">LawEase</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Complete Your Legal Professional Profile</h2>
                    <p className="text-muted-foreground">Help us verify your credentials and set up your practice</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {[1, 2, 3, 4].map((step) => (
                            <div key={step} className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                    }`}>
                                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                                </div>
                                {step < 4 && (
                                    <div className={`flex-1 h-1 mx-2 rounded ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Professional Info</span>
                        <span>Specializations</span>
                        <span>Availability</span>
                        <span>Review</span>
                    </div>
                </div>

                {/* Step Content */}
                <Card className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl">
                    <CardContent className="p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                variants={stepVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                {/* Step 1: Professional Information */}
                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-blue-600" />
                                                Professional Information
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="barRegistrationNumber">Bar Registration Number *</Label>
                                                <Input
                                                    id="barRegistrationNumber"
                                                    placeholder="e.g., D/123/2020"
                                                    value={formData.barRegistrationNumber}
                                                    onChange={(e) => handleInputChange('barRegistrationNumber', e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="experience">Years of Experience *</Label>
                                                <Input
                                                    id="experience"
                                                    type="number"
                                                    placeholder="e.g., 5"
                                                    value={formData.experience}
                                                    onChange={(e) => handleInputChange('experience', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="education">Education *</Label>
                                            <Textarea
                                                id="education"
                                                placeholder="e.g., LLB from Delhi University (2018), LLM in Constitutional Law from JNU (2020)"
                                                value={formData.education}
                                                onChange={(e) => handleInputChange('education', e.target.value)}
                                                rows={3}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="certifications">Certifications (Optional)</Label>
                                            <Textarea
                                                id="certifications"
                                                placeholder="Any additional certifications, awards, or recognitions"
                                                value={formData.certifications}
                                                onChange={(e) => handleInputChange('certifications', e.target.value)}
                                                rows={2}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Languages</Label>
                                            <div className="flex gap-2 mb-2">
                                                <Input
                                                    placeholder="Add a language"
                                                    value={newLanguage}
                                                    onChange={(e) => setNewLanguage(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                                                />
                                                <Button type="button" onClick={addLanguage} variant="outline">
                                                    Add
                                                </Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.languages.map((language, index) => (
                                                    <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeLanguage(language)}>
                                                        {language} ×
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Specializations */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                                <Scale className="h-5 w-5 text-blue-600" />
                                                Legal Specializations
                                            </h3>
                                            <p className="text-muted-foreground">Select your areas of expertise</p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {specializations.map((spec) => (
                                                <div key={spec} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={spec}
                                                        checked={formData.selectedSpecializations.includes(spec)}
                                                        onCheckedChange={() => handleSpecializationToggle(spec)}
                                                    />
                                                    <Label
                                                        htmlFor={spec}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                    >
                                                        {spec.replace(/_/g, ' ')}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Other specialization input when OTHER is selected */}
                                        {formData.selectedSpecializations.includes('OTHER') && (
                                            <div className="flex items-center gap-2 mt-2">
                                                <Input
                                                    placeholder="Enter your specialization"
                                                    value={otherSpecialization}
                                                    onChange={(e) => setOtherSpecialization(e.target.value)}
                                                />
                                                <Button type="button" variant="outline" onClick={applyOtherSpecialization}>Add</Button>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <Label htmlFor="practiceAreas">Detailed Practice Areas</Label>
                                            <Textarea
                                                id="practiceAreas"
                                                placeholder="Describe your specific areas of practice, types of cases you handle, etc."
                                                value={formData.practiceAreas}
                                                onChange={(e) => handleInputChange('practiceAreas', e.target.value)}
                                                rows={4}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
                                                <Input
                                                    id="hourlyRate"
                                                    type="number"
                                                    placeholder="e.g., 2000"
                                                    value={formData.hourlyRate}
                                                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                                                    required
                                                />
                                                <p className="text-xs text-muted-foreground">
                                                    Platform will add 15% service fee for clients
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Availability */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-blue-600" />
                                                Set Your Availability
                                            </h3>
                                            <p className="text-muted-foreground">When are you available for consultations?</p>
                                        </div>

                                        <div className="space-y-4">
                                            {availability.map((slot, index) => (
                                                <div key={index} className="flex flex-wrap items-center gap-3 p-4 border rounded-lg">
                                                    <Select
                                                        value={slot.dayOfWeek.toString()}
                                                        onValueChange={(value) => updateAvailabilitySlot(index, 'dayOfWeek', parseInt(value))}
                                                    >
                                                        <SelectTrigger className="w-32">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {daysOfWeek.map((day) => (
                                                                <SelectItem key={day.value} value={day.value.toString()}>
                                                                    {day.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    <Select
                                                        value={slot.startTime}
                                                        onValueChange={(value) => updateAvailabilitySlot(index, 'startTime', value)}
                                                    >
                                                        <SelectTrigger className="w-24">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {timeSlots.map((time) => (
                                                                <SelectItem key={time} value={time}>
                                                                    {time}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    <span className="text-muted-foreground">to</span>

                                                    <Select
                                                        value={slot.endTime}
                                                        onValueChange={(value) => updateAvailabilitySlot(index, 'endTime', value)}
                                                    >
                                                        <SelectTrigger className="w-24">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {timeSlots.map((time) => (
                                                                <SelectItem key={time} value={time}>
                                                                    {time}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    <div className="flex gap-2 ml-auto">
                                                        <Button type="button" variant="outline" size="sm" onClick={() => copySlotToWeekdays(index)}>Copy to Weekdays</Button>
                                                        <Button type="button" variant="outline" size="sm" onClick={() => copySlotToWeekend(index)}>Copy to Weekend</Button>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => removeAvailabilitySlot(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button type="button" variant="outline" onClick={addAvailabilitySlot}>
                                                Add Time Slot
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Review */}
                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                                Review Your Profile
                                            </h3>
                                            <p className="text-muted-foreground">Please review your information before submitting</p>
                                        </div>

                                        <div className="space-y-4">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">Professional Information</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2">
                                                    <p><strong>Bar Registration:</strong> {formData.barRegistrationNumber}</p>
                                                    <p><strong>Experience:</strong> {formData.experience} years</p>
                                                    <p><strong>Education:</strong> {formData.education}</p>
                                                    <p><strong>Languages:</strong> {formData.languages.join(', ')}</p>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">Specializations</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.selectedSpecializations.map((spec) => (
                                                            <Badge key={spec} variant="secondary">
                                                                {spec.replace(/_/g, ' ')}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <p className="mt-2"><strong>Hourly Rate:</strong> ₹{formData.hourlyRate}</p>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">Availability</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    {availability.map((slot, index) => (
                                                        <p key={index}>
                                                            {daysOfWeek.find(d => d.value === slot.dayOfWeek)?.name}: {slot.startTime} - {slot.endTime}
                                                        </p>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Next Steps</h4>
                                            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                                                <li>• Your profile will be reviewed by our team</li>
                                                <li>• We&apos;ll verify your credentials within 2-3 business days</li>
                                                <li>• You&apos;ll receive an email once verification is complete</li>
                                                <li>• After approval, you can start accepting bookings</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </Button>

                            {currentStep < 4 ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center gap-2"
                                >
                                    Next
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="flex items-center gap-2"
                                >
                                    {isLoading ? "Submitting..." : "Submit Profile"}
                                    <CheckCircle className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function LawyerOnboarding() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LawyerOnboardingContent />
        </Suspense>
    )
}