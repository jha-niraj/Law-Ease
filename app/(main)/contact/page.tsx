"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
  HeadphonesIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { submitContactForm, ContactFormInput } from "@/actions/contact.action"

const contactMethods = [
    {
        icon: <Mail className="h-8 w-8 text-blue-600" />,
        title: "Email Support",
        description: "Get detailed responses to your queries",
        contact: "support@lawease.in",
        response: "Within 24 hours",
        action: "mailto:support@lawease.in"
    },
    {
        icon: <Phone className="h-8 w-8 text-green-600" />,
        title: "Phone Support",
        description: "Speak directly with our support team",
        contact: "+91 98765 43210",
        response: "Mon-Fri, 9 AM - 6 PM",
        action: "tel:+919876543210"
    },
    {
        icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
        title: "Live Chat",
        description: "Real-time assistance for urgent matters",
        contact: "Available on website",
        response: "Instant response",
        action: "#"
    },
    {
        icon: <HeadphonesIcon className="h-8 w-8 text-indigo-600" />,
        title: "AI Assistant",
        description: "24/7 AI-powered legal guidance",
        contact: "Always available",
        response: "Immediate",
        action: "/ai-mentor"
    }
]

const offices = [
    {
        city: "New Delhi",
        address: "123 Connaught Place, New Delhi - 110001",
        phone: "+91 11 4567 8901",
        email: "delhi@lawease.in",
        type: "Headquarters"
    },
    {
        city: "Mumbai",
        address: "456 Bandra Kurla Complex, Mumbai - 400051",
        phone: "+91 22 9876 5432",
        email: "mumbai@lawease.in",
        type: "Regional Office"
    },
    {
        city: "Bangalore",
        address: "789 Koramangala, Bangalore - 560095",
        phone: "+91 80 1234 5678",
        email: "bangalore@lawease.in",
        type: "Tech Hub"
    },
    {
        city: "Chennai",
        address: "321 T. Nagar, Chennai - 600017",
        phone: "+91 44 8765 4321",
        email: "chennai@lawease.in",
        type: "Regional Office"
    }
]

const faqs = [
    {
        question: "How quickly will I get a response?",
        answer: "We aim to respond to all inquiries within 24 hours. For urgent legal matters, we recommend using our AI mentor for immediate assistance."
    },
    {
        question: "Is the consultation free?",
        answer: "Our AI mentor provides free legal guidance 24/7. Consultations with verified lawyers are paid services with transparent pricing."
    },
    {
        question: "Do you provide services across India?",
        answer: "Yes, LawEase serves clients across all 28 states and 8 union territories of India with multilingual support."
    },
    {
        question: "How do I become a verified lawyer on LawEase?",
        answer: "Click 'Join as Lawyer' to start the verification process. We verify credentials, experience, and conduct background checks."
    }
]

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormInput>({
        name: "",
        email: "",
        subject: "",
        message: "",
        userType: "GENERAL"
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (field: keyof ContactFormInput, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const result = await submitContactForm(formData)

            if (result.success) {
                toast.success(result.message)
                setIsSubmitted(true)
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    userType: "GENERAL"
                })
            } else {
                toast.error(result.error || "Failed to send message")
            }
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
            setIsSubmitting(false)
        }
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <motion.div
                                className="flex justify-center"
                                variants={fadeInUp}
                            >
                                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4">
                                    <MessageSquare className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                                </div>
                            </motion.div>
                            <motion.h1
                                variants={fadeInUp}
                                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight"
                            >
                                Get in Touch
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-4xl mx-auto"
                            >
                                Have questions about legal services? Need help with our platform?
                                We&apos;re here to assist you every step of the way.
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                            Multiple Ways to Reach Us
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Choose the contact method that works best for you. We&apos;re committed to providing prompt and helpful responses.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {contactMethods.map((method, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                                    <CardHeader className="text-center">
                                        <div className="flex justify-center mb-4">
                                            {method.icon}
                                        </div>
                                        <CardTitle className="text-xl">{method.title}</CardTitle>
                                        <CardDescription>{method.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="text-center space-y-2">
                                        <p className="font-medium text-foreground">{method.contact}</p>
                                        <p className="text-sm text-muted-foreground">{method.response}</p>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-4"
                                            onClick={() => {
                                                if (method.action.startsWith('http') || method.action.startsWith('/')) {
                                                    window.open(method.action, '_blank')
                                                } else if (method.action.startsWith('mailto:') || method.action.startsWith('tel:')) {
                                                    window.location.href = method.action
                                                }
                                            }}
                                        >
                                            Contact Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                            Send us a Message
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Fill out the form below and we&apos;ll get back to you within 24 hours.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">Contact Form</CardTitle>
                                <CardDescription className="text-center">
                                    We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-center py-12"
                                    >
                                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                                        <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent Successfully!</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Thank you for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
                                        </p>
                                        <Button
                                            onClick={() => setIsSubmitted(false)}
                                            variant="outline"
                                        >
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Enter your full name"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="userType">I am a...</Label>
                                            <Select
                                                value={formData.userType}
                                                onValueChange={(value) => handleInputChange('userType', value)}
                                                disabled={isSubmitting}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your user type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="GENERAL">General User</SelectItem>
                                                    <SelectItem value="STUDENT">Law Student</SelectItem>
                                                    <SelectItem value="LAWYER">Legal Professional</SelectItem>
                                                    <SelectItem value="SUPPORT">Technical Support</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Input
                                                id="subject"
                                                placeholder="What is this message about?"
                                                value={formData.subject}
                                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message *</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Please provide details about your inquiry..."
                                                value={formData.message}
                                                onChange={(e) => handleInputChange('message', e.target.value)}
                                                rows={6}
                                                required
                                                disabled={isSubmitting}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                {formData.message.length}/2000 characters
                                            </p>
                                        </div>

                                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                                    <p className="font-medium mb-1">Quick Response Tips:</p>
                                                    <ul className="space-y-1 text-xs">
                                                        <li>• Be specific about your legal issue or technical problem</li>
                                                        <li>• Include relevant details like location, dates, or error messages</li>
                                                        <li>• For urgent matters, consider using our AI mentor or phone support</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending Message...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Office Locations */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                            Our Offices Across India
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Visit us at any of our offices or reach out to your nearest location for personalized assistance.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {offices.map((office, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Building className="h-6 w-6 text-blue-600" />
                                            <CardTitle className="text-xl">{office.city}</CardTitle>
                                        </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-sm font-medium text-blue-800 dark:text-blue-200 w-fit">
                      {office.type}
                    </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                                            <p className="text-sm text-muted-foreground">{office.address}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <a href={`tel:${office.phone}`} className="text-sm text-blue-600 hover:underline">
                                                {office.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <a href={`mailto:${office.email}`} className="text-sm text-blue-600 hover:underline">
                                                {office.email}
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Quick answers to common questions about LawEase services.
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {faqs.map((faq, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-3">
                                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2">
                                                <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            {faq.question}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Business Hours */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                            <CardHeader>
                                <div className="flex justify-center mb-4">
                                    <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                                </div>
                                <CardTitle className="text-2xl">Business Hours</CardTitle>
                                <CardDescription>When you can reach our support team</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">Phone & Live Chat Support</h4>
                                        <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                                        <p className="text-sm text-muted-foreground">Saturday: 10:00 AM - 4:00 PM IST</p>
                                        <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">AI Mentor & Email</h4>
                                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                                        <p className="text-sm text-muted-foreground">Instant AI responses</p>
                                        <p className="text-sm text-muted-foreground">Email replies within 24 hours</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Emergency Legal Matters:</strong> For urgent legal issues outside business hours,
                                        please use our AI mentor or send an email marked as &quot;URGENT&quot; in the subject line.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
