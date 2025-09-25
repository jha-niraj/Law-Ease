"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search, 
  Star, 
  Clock, 
  Filter,
  Users,
  CheckCircle,
  Calendar,
  MessageSquare
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { LawyerBookingSheet } from "@/components/booking/lawyer-booking-sheet"

interface Lawyer {
    id: string
    userId: string
    user: {
        name: string
        image?: string
        email: string
    }
    experience: number
    specializations: string[]
    practiceAreas: string
    languages: string[]
    hourlyRate: number
    averageRating?: number
    totalBookings: number
    completedBookings: number
    isVerified: boolean
    isAvailableForBooking: boolean
    availabilities: Array<{
        dayOfWeek: number
        startTime: string
        endTime: string
        isAvailable: boolean
    }>
    reviews: Array<{
        rating: number
        comment?: string
        booking: {
            client: {
                name: string
            }
        }
    }>
}

const specializations = [
    "CONSTITUTIONAL", "CIVIL", "CRIMINAL", "FAMILY", "PROPERTY",
    "LABOR", "TAXATION", "CORPORATE", "CONSUMER", "IMMIGRATION",
    "INTELLECTUAL_PROPERTY", "ENVIRONMENTAL", "OTHER"
]

export default function LawyersPage() {
    const [lawyers, setLawyers] = useState<Lawyer[]>([])
    const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSpecialization, setSelectedSpecialization] = useState("")
    const [sortBy, setSortBy] = useState("rating")
    const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
    const [showBookingSheet, setShowBookingSheet] = useState(false)

    useEffect(() => {
        fetchLawyers()
    }, [])

  useEffect(() => {
    const filterLawyers = () => {
      let filtered = lawyers.filter(lawyer => lawyer.isVerified && lawyer.isAvailableForBooking)

      if (searchQuery) {
        filtered = filtered.filter(lawyer => 
          lawyer.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.practiceAreas.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.specializations.some(spec => 
            spec.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      }

      if (selectedSpecialization) {
        filtered = filtered.filter(lawyer => 
          lawyer.specializations.includes(selectedSpecialization)
        )
      }

      // Sort lawyers
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return (b.averageRating || 0) - (a.averageRating || 0)
          case "experience":
            return b.experience - a.experience
          case "price_low":
            return a.hourlyRate - b.hourlyRate
          case "price_high":
            return b.hourlyRate - a.hourlyRate
          default:
            return 0
        }
      })

      setFilteredLawyers(filtered)
    }

    filterLawyers()
  }, [lawyers, searchQuery, selectedSpecialization, sortBy])

    const fetchLawyers = async () => {
        try {
            // Mock data for now - replace with actual API call
            const mockLawyers: Lawyer[] = [
                {
                    id: "1",
                    userId: "lawyer1",
                    user: {
                        name: "Adv. Priya Sharma",
                        image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=400",
                        email: "priya.sharma@example.com"
                    },
                    experience: 8,
                    specializations: ["FAMILY", "CIVIL"],
                    practiceAreas: "Family disputes, divorce cases, property matters, civil litigation",
                    languages: ["English", "Hindi", "Punjabi"],
                    hourlyRate: 2500,
                    averageRating: 4.8,
                    totalBookings: 156,
                    completedBookings: 142,
                    isVerified: true,
                    isAvailableForBooking: true,
                    availabilities: [
                        { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isAvailable: true },
                        { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isAvailable: true },
                        { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", isAvailable: true },
                    ],
                    reviews: [
                        { rating: 5, comment: "Excellent lawyer, very professional", booking: { client: { name: "John Doe" } } },
                        { rating: 5, comment: "Helped me with my property case", booking: { client: { name: "Jane Smith" } } },
                    ]
                },
                {
                    id: "2",
                    userId: "lawyer2",
                    user: {
                        name: "Adv. Rajesh Kumar",
                        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                        email: "rajesh.kumar@example.com"
                    },
                    experience: 12,
                    specializations: ["CRIMINAL", "CONSTITUTIONAL"],
                    practiceAreas: "Criminal defense, constitutional matters, high court cases",
                    languages: ["English", "Hindi", "Bengali"],
                    hourlyRate: 3500,
                    averageRating: 4.9,
                    totalBookings: 203,
                    completedBookings: 189,
                    isVerified: true,
                    isAvailableForBooking: true,
                    availabilities: [
                        { dayOfWeek: 1, startTime: "10:00", endTime: "18:00", isAvailable: true },
                        { dayOfWeek: 3, startTime: "10:00", endTime: "18:00", isAvailable: true },
                        { dayOfWeek: 5, startTime: "10:00", endTime: "18:00", isAvailable: true },
                    ],
                    reviews: [
                        { rating: 5, comment: "Outstanding criminal lawyer", booking: { client: { name: "Mike Johnson" } } },
                    ]
                },
                {
                    id: "3",
                    userId: "lawyer3",
                    user: {
                        name: "Adv. Meera Patel",
                        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
                        email: "meera.patel@example.com"
                    },
                    experience: 6,
                    specializations: ["CORPORATE", "TAXATION"],
                    practiceAreas: "Corporate law, tax planning, business compliance, startup legal matters",
                    languages: ["English", "Hindi", "Gujarati"],
                    hourlyRate: 3000,
                    averageRating: 4.7,
                    totalBookings: 98,
                    completedBookings: 87,
                    isVerified: true,
                    isAvailableForBooking: true,
                    availabilities: [
                        { dayOfWeek: 2, startTime: "09:00", endTime: "16:00", isAvailable: true },
                        { dayOfWeek: 4, startTime: "09:00", endTime: "16:00", isAvailable: true },
                    ],
                    reviews: [
                        { rating: 5, comment: "Great for corporate matters", booking: { client: { name: "Sarah Wilson" } } },
                        { rating: 4, comment: "Very knowledgeable about tax law", booking: { client: { name: "David Brown" } } },
                    ]
                }
            ]
            setLawyers(mockLawyers)
    } catch {
      toast.error("Failed to fetch lawyers")
    } finally {
            setIsLoading(false)
        }
    }

    // Duplicate filterLawyers function removed

    const handleBookLawyer = (lawyer: Lawyer) => {
        setSelectedLawyer(lawyer)
        setShowBookingSheet(true)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Find Expert Lawyers
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Connect with verified legal professionals for your specific needs
                        </p>
                    </div>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search by name, practice area, or specialization..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                                    <SelectTrigger className="w-full md:w-48">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Specialization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Specializations</SelectItem>
                                        {specializations.map((spec) => (
                                            <SelectItem key={spec} value={spec}>
                                                {spec.replace(/_/g, ' ')}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-full md:w-40">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                        <SelectItem value="experience">Most Experienced</SelectItem>
                                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                    Found {filteredLawyers.length} verified lawyers
                </div>

                {/* Lawyers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLawyers.map((lawyer, index) => (
                        <motion.div
                            key={lawyer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={lawyer.user.image} />
                                            <AvatarFallback>
                                                {lawyer.user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                {lawyer.user.name}
                                                {lawyer.isVerified && (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {lawyer.experience} years experience
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Rating and Stats */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                            <span className="font-medium">
                                                {lawyer.averageRating?.toFixed(1) || "New"}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                ({lawyer.totalBookings} bookings)
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-lg">₹{lawyer.hourlyRate}/hr</div>
                                        </div>
                                    </div>

                                    {/* Specializations */}
                                    <div className="flex flex-wrap gap-1">
                                        {lawyer.specializations.slice(0, 3).map((spec) => (
                                            <Badge key={spec} variant="secondary" className="text-xs">
                                                {spec.replace(/_/g, ' ')}
                                            </Badge>
                                        ))}
                                        {lawyer.specializations.length > 3 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{lawyer.specializations.length - 3} more
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Practice Areas */}
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {lawyer.practiceAreas}
                                    </p>

                                    {/* Languages */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MessageSquare className="h-3 w-3" />
                                        <span>{lawyer.languages.join(", ")}</span>
                                    </div>

                                    {/* Availability Indicator */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="h-3 w-3 text-green-500" />
                                        <span className="text-green-600">Available for booking</span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <Button variant="outline" className="flex-1">
                                                    View Details
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                                                <SheetHeader>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-16 w-16">
                                                            <AvatarImage src={lawyer.user.image} />
                                                            <AvatarFallback>
                                                                {lawyer.user.name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <SheetTitle className="flex items-center gap-2">
                                                                {lawyer.user.name}
                                                                {lawyer.isVerified && (
                                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                                )}
                                                            </SheetTitle>
                                                            <SheetDescription>
                                                                {lawyer.experience} years of legal experience
                                                            </SheetDescription>
                                                        </div>
                                                    </div>
                                                </SheetHeader>

                                                <div className="space-y-6 mt-6">
                                                    {/* Stats */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="text-center p-3 bg-muted rounded-lg">
                                                            <div className="font-bold text-lg">
                                                                {lawyer.averageRating?.toFixed(1) || "New"}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">Rating</div>
                                                        </div>
                                                        <div className="text-center p-3 bg-muted rounded-lg">
                                                            <div className="font-bold text-lg">{lawyer.completedBookings}</div>
                                                            <div className="text-sm text-muted-foreground">Completed</div>
                                                        </div>
                                                    </div>

                                                    {/* Specializations */}
                                                    <div>
                                                        <h4 className="font-semibold mb-2">Specializations</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {lawyer.specializations.map((spec) => (
                                                                <Badge key={spec} variant="secondary">
                                                                    {spec.replace(/_/g, ' ')}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Practice Areas */}
                                                    <div>
                                                        <h4 className="font-semibold mb-2">Practice Areas</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {lawyer.practiceAreas}
                                                        </p>
                                                    </div>

                                                    {/* Languages */}
                                                    <div>
                                                        <h4 className="font-semibold mb-2">Languages</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {lawyer.languages.map((lang) => (
                                                                <Badge key={lang} variant="outline">
                                                                    {lang}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Reviews */}
                                                    {lawyer.reviews.length > 0 && (
                                                        <div>
                                                            <h4 className="font-semibold mb-2">Recent Reviews</h4>
                                                            <div className="space-y-3">
                                                                {lawyer.reviews.slice(0, 3).map((review, idx) => (
                                                                    <div key={idx} className="border rounded-lg p-3">
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <div className="flex">
                                                                                {[...Array(5)].map((_, i) => (
                                                                                    <Star
                                                                                        key={i}
                                                                                        className={`h-3 w-3 ${i < review.rating
                                                                                                ? 'text-yellow-500 fill-current'
                                                                                                : 'text-gray-300'
                                                                                            }`}
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                            <span className="text-sm font-medium">
                                                                                {review.booking.client.name}
                                                                            </span>
                                                                        </div>
                                                                        {review.comment && (
                                                                            <p className="text-sm text-muted-foreground">
                                                                                {review.comment}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Pricing */}
                                                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <div className="font-bold text-2xl">₹{lawyer.hourlyRate}</div>
                                                                <div className="text-sm text-muted-foreground">per hour</div>
                                                            </div>
                                                            <Button
                                                                onClick={() => handleBookLawyer(lawyer)}
                                                                className="bg-blue-600 hover:bg-blue-700"
                                                            >
                                                                <Calendar className="h-4 w-4 mr-2" />
                                                                Book Consultation
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SheetContent>
                                        </Sheet>

                                        <Button
                                            onClick={() => handleBookLawyer(lawyer)}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredLawyers.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No lawyers found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search criteria or filters
                        </p>
                    </div>
                )}
            </div>

            {/* Booking Sheet */}
            {selectedLawyer && (
                <LawyerBookingSheet
                    lawyer={selectedLawyer}
                    isOpen={showBookingSheet}
                    onClose={() => {
                        setShowBookingSheet(false)
                        setSelectedLawyer(null)
                    }}
                    onBookingComplete={() => {
                        setShowBookingSheet(false)
                        setSelectedLawyer(null)
                        toast.success("Booking request sent successfully!")
                    }}
                />
            )}
        </div>
    )
}
