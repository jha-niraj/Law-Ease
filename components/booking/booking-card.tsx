"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { 
  Calendar, 
  Clock, 
  User, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Phone,
  Video,
  DollarSign
} from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { updateBookingStatus } from "@/actions/lawyer.action"

interface BookingCardProps {
  booking: {
    id: string
    client: {
      id: string
      name: string
      email: string
      image?: string
    }
    scheduledDate: string
    scheduledTime: string
    duration: number
    status: string
    clientMessage?: string
    lawyerNotes?: string
    totalAmount: number
    bookedAt: string
  }
  onStatusUpdate?: () => void
}

export function BookingCard({ booking, onStatusUpdate }: BookingCardProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [lawyerNotes, setLawyerNotes] = useState(booking.lawyerNotes || "")

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      const result = await updateBookingStatus(
        booking.id, 
        newStatus, 
        lawyerNotes || undefined
      )
      
      if (result.success) {
        toast.success(result.message)
        onStatusUpdate?.()
      } else {
        toast.error(result.error || "Failed to update booking")
      }
    } catch {
      toast.error("Failed to update booking")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'CONFIRMED': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'REJECTED': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'CANCELLED': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={booking.client.image} />
                <AvatarFallback>
                  {booking.client.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{booking.client.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{booking.client.email}</p>
              </div>
            </div>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(booking.scheduledDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{booking.scheduledTime} ({booking.duration} min)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>₹{booking.totalAmount}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Booked {new Date(booking.bookedAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Client Message */}
          {booking.clientMessage && (
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Client Message:</span>
              </div>
              <p className="text-sm text-muted-foreground">{booking.clientMessage}</p>
            </div>
          )}

          {/* Lawyer Notes (for confirmed/completed bookings) */}
          {(booking.status === 'CONFIRMED' || booking.status === 'COMPLETED' || showNotes) && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Notes:</label>
              <Textarea
                value={lawyerNotes}
                onChange={(e) => setLawyerNotes(e.target.value)}
                placeholder="Add notes about this consultation..."
                rows={3}
                disabled={booking.status === 'COMPLETED'}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {booking.status === 'PENDING' && (
              <>
                <Button
                  onClick={() => {
                    setShowNotes(true)
                    setTimeout(() => handleStatusUpdate('CONFIRMED'), 100)
                  }}
                  disabled={isUpdating}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button
                  onClick={() => handleStatusUpdate('REJECTED')}
                  disabled={isUpdating}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </>
            )}

            {booking.status === 'CONFIRMED' && (
              <>
                <Button
                  onClick={() => handleStatusUpdate('COMPLETED')}
                  disabled={isUpdating}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled
                >
                  <Video className="h-4 w-4 mr-2" />
                  Join Call (Coming Soon)
                </Button>
              </>
            )}

            {booking.status === 'COMPLETED' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Consultation completed</span>
              </div>
            )}

            {booking.status === 'REJECTED' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Booking rejected</span>
              </div>
            )}

            {booking.status === 'CANCELLED' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <XCircle className="h-4 w-4 text-gray-500" />
                <span>Booking cancelled by client</span>
              </div>
            )}
          </div>

          {/* Contact Options (for confirmed bookings) */}
          {booking.status === 'CONFIRMED' && (
            <div className="border-t pt-3 mt-3">
              <p className="text-xs text-muted-foreground mb-2">Contact client:</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`mailto:${booking.client.email}`)}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Call (Coming Soon)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
