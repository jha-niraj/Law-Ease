"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Calendar,
    Clock,
    DollarSign,
    Star,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Eye
} from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getLawyerDashboardStats, updateBookingStatus } from "@/actions/lawyer.action"
import { motion } from "framer-motion"
import Link from "next/link"

interface DashboardStats {
    totalBookings: number
    completedBookings: number
    averageRating: number | null
    totalEarnings: number
    isVerified: boolean
    isAvailableForBooking: boolean
    recentBookings: Array<{
        id: string
        client: { name: string; image?: string }
        scheduledDate: string
        scheduledTime: string
        status: string
    }>
    pendingBookingsCount: number
    thisMonthEarnings: number
}

export function LawyerDashboard() {
    const { data: session } = useSession()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchDashboardStats()
    }, [])

    const fetchDashboardStats = async () => {
        try {
            const result = await getLawyerDashboardStats()
      if (result.success && result.stats) {
        setStats({
          ...result.stats,
          averageRating: result.stats.averageRating ? Number(result.stats.averageRating) : null,
          totalEarnings: Number(result.stats.totalEarnings),
          recentBookings: result.stats.recentBookings.map(booking => ({
            ...booking,
            scheduledDate: booking.scheduledDate.toISOString(),
            status: booking.status as string
          }))
        })
            } else {
                toast.error(result.error || "Failed to fetch dashboard data")
            }
        } catch {
            toast.error("Failed to load dashboard")
        } finally {
            setIsLoading(false)
        }
    }

    const handleBookingAction = async (bookingId: string, action: string) => {
        try {
            const result = await updateBookingStatus(bookingId, action)
            if (result.success) {
                toast.success(result.message)
                fetchDashboardStats() // Refresh data
            } else {
                toast.error(result.error || "Failed to update booking")
            }
        } catch {
            toast.error("Failed to update booking")
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-8">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!stats) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
                <div className="max-w-7xl mx-auto text-center">
                    <Card className="p-8">
                        <CardContent>
                            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
                            <p className="text-muted-foreground mb-4">
                                Please complete your lawyer onboarding to access the dashboard.
                            </p>
                            <Link href="/lawyer-onboarding">
                                <Button>Complete Onboarding</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground">
                                        Welcome back, {session?.user?.name}
                                    </h1>
                                    <p className="text-muted-foreground mt-2">
                                        Manage your legal practice and client appointments
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="flex items-center gap-2">
                                            {stats.isVerified ? (
                                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    <AlertCircle className="h-3 w-3 mr-1" />
                                                    Pending Verification
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {stats.isAvailableForBooking ? "Available for booking" : "Unavailable"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.totalBookings}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.completedBookings} completed
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-amber-600">
                                    {stats.pendingBookingsCount}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Awaiting response
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₹{stats.thisMonthEarnings.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">
                                    Total earnings
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                                <Star className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-center gap-1">
                                    {stats.averageRating ? stats.averageRating.toFixed(1) : "N/A"}
                                    {stats.averageRating && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Average rating
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Recent Bookings */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Recent Bookings</CardTitle>
                                    <Link href="/bookings">
                                        <Button variant="outline" size="sm">
                                            View All
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {stats.recentBookings.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">
                                        No bookings yet. Your appointments will appear here.
                                    </p>
                                ) : (
                                    stats.recentBookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={booking.client.image} />
                                                    <AvatarFallback>
                                                        {booking.client.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{booking.client.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(booking.scheduledDate).toLocaleDateString()} at {booking.scheduledTime}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant={
                                                        booking.status === 'PENDING' ? 'secondary' :
                                                            booking.status === 'CONFIRMED' ? 'default' :
                                                                booking.status === 'COMPLETED' ? 'default' :
                                                                    'destructive'
                                                    }
                                                >
                                                    {booking.status}
                                                </Badge>
                                                {booking.status === 'PENDING' && (
                                                    <div className="flex gap-1">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleBookingAction(booking.id, 'CONFIRMED')}
                                                            className="h-8 px-2"
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleBookingAction(booking.id, 'REJECTED')}
                                                            className="h-8 px-2"
                                                        >
                                                            Reject
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Link href="/profile">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Profile
                                    </Button>
                                </Link>
                                <Link href="/bookings">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Manage Bookings
                                    </Button>
                                </Link>
                                <Link href="/availability">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Update Availability
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full justify-start" disabled>
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Analytics (Coming Soon)
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Profile Status */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Profile Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Verification</span>
                                        {stats.isVerified ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 text-amber-500" />
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Available for Booking</span>
                                        {stats.isAvailableForBooking ? (
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 text-amber-500" />
                                        )}
                                    </div>
                                </div>
                                {!stats.isVerified && (
                                    <p className="text-xs text-muted-foreground mt-3">
                                        Your profile is under review. You&apos;ll be notified once verified.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
