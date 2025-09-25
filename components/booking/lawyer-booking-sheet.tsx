"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  DollarSign, 
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { createBooking } from "@/actions/booking.action"

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
  hourlyRate: number
  availabilities: Array<{
    dayOfWeek: number
    startTime: string
    endTime: string
    isAvailable: boolean
  }>
}

interface LawyerBookingSheetProps {
  lawyer: Lawyer
  isOpen: boolean
  onClose: () => void
  onBookingComplete: () => void
}

// const daysOfWeek = [
//   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
// ]

export function LawyerBookingSheet({ lawyer, isOpen, onClose, onBookingComplete }: LawyerBookingSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [duration, setDuration] = useState("60")
  const [message, setMessage] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  const getAvailableDays = () => {
    return lawyer.availabilities
      .filter(av => av.isAvailable)
      .map(av => av.dayOfWeek)
  }

  const getAvailableTimeSlots = () => {
    if (!selectedDate) return []

    const dayOfWeek = selectedDate.getDay()
    const availability = lawyer.availabilities.find(av => 
      av.dayOfWeek === dayOfWeek && av.isAvailable
    )

    if (!availability) return []

    const slots = []
    const start = availability.startTime
    const end = availability.endTime
    
    // Generate time slots (simplified - in real app, check existing bookings)
    const startHour = parseInt(start.split(':')[0])
    const endHour = parseInt(end.split(':')[0])
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour + 0.5 < endHour) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
      }
    }

    return slots
  }

  const calculateTotal = () => {
    const durationHours = parseInt(duration) / 60
    const baseAmount = lawyer.hourlyRate * durationHours
    const platformFee = baseAmount * 0.15 // 15% platform fee
    return {
      baseAmount: baseAmount,
      platformFee: platformFee,
      total: baseAmount + platformFee
    }
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time")
      return
    }

    setIsBooking(true)
    try {
      const pricing = calculateTotal()
      
      const result = await createBooking({
        lawyerId: lawyer.userId,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        duration: parseInt(duration),
        clientMessage: message,
        hourlyRate: lawyer.hourlyRate,
        platformFee: pricing.platformFee,
        totalAmount: pricing.total
      })

      if (result.success) {
        onBookingComplete()
      } else {
        toast.error(result.error || "Failed to create booking")
      }
    } catch {
      toast.error("Failed to create booking")
    } finally {
      setIsBooking(false)
    }
  }

  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return date >= today && getAvailableDays().includes(dayOfWeek)
  }

  const pricing = calculateTotal()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
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
              <SheetTitle>Book Consultation</SheetTitle>
              <SheetDescription>
                Schedule a session with {lawyer.user.name}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Lawyer Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{lawyer.user.name}</h4>
              <Badge variant="secondary">{lawyer.experience} years exp</Badge>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {lawyer.specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} variant="outline" className="text-xs">
                  {spec.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>₹{lawyer.hourlyRate}/hour</span>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => !isDateAvailable(date)}
              className="rounded-md border"
            />
            {selectedDate && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Label className="text-base font-semibold mb-3 block">Select Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Choose available time" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTimeSlots().map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Duration Selection */}
          {selectedTime && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Label className="text-base font-semibold mb-3 block">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Message */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Message (Optional)
            </Label>
            <Textarea
              placeholder="Briefly describe your legal matter or questions..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Pricing Breakdown */}
          {selectedTime && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                  Pricing Breakdown
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Consultation ({parseInt(duration)} min)</span>
                    <span>₹{pricing.baseAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Platform fee (15%)</span>
                    <span>₹{pricing.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-1 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Booking Summary */}
          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="border rounded-lg p-4 space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Booking Summary
                </h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                    <span>{selectedDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{selectedTime} ({duration} minutes)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span>₹{pricing.total.toFixed(2)} total</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Important Notes */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <h5 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                  Important Notes:
                </h5>
                <ul className="text-amber-700 dark:text-amber-300 space-y-1 text-xs">
                  <li>• Your booking request will be sent to the lawyer for confirmation</li>
                  <li>• Payment will be processed only after the lawyer accepts</li>
                  <li>• You&apos;ll receive email updates about your booking status</li>
                  <li>• Cancellation is free up to 24 hours before the session</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isBooking}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || isBooking}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isBooking ? "Booking..." : `Book for ₹${pricing.total.toFixed(2)}`}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
