"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Camera, 
  Mail, 
  MessageSquare, 
  Award, 
  Trash2, 
  Loader2,
  CheckCircle,
  Star,
  DollarSign,
  Clock,
  Scale,
  Users
} from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import {
  updateProfile,
  changePassword,
  deleteAccount,
  UpdateProfileInput,
  ChangePasswordInput,
  DeleteAccountInput,
  uploadProfileImage
} from "@/actions/profile.action"
// import {
//   updateLawyerProfile
// } from "@/actions/lawyer.action"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

interface ProfileStats {
  memberSince: string
  totalConsultations: number
  totalDocuments: number
  membershipTier: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  image?: string | null
  bio?: string | null
  location?: string | null
  phone?: string | null
  role: string
}

interface LawyerProfileData {
  id: string
  barRegistrationNumber?: string
  experience?: number
  specializations: string[]
  practiceAreas?: string
  education?: string
  certifications?: string
  languages: string[]
  hourlyRate: number
  isVerified: boolean
  isAvailableForBooking: boolean
  totalBookings: number
  completedBookings: number
  averageRating?: number
  totalEarnings: number
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

interface LawyerProfileProps {
  user: UserProfile
  stats: ProfileStats
  lawyerProfile: LawyerProfileData
}

const daysOfWeek = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

export function LawyerProfile({ user: initialUser, lawyerProfile }: LawyerProfileProps) {
  const [user, setUser] = useState(initialUser)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  
  const [profileFormData, setProfileFormData] = useState<UpdateProfileInput>({
    name: initialUser.name,
    bio: initialUser.bio || "",
    location: initialUser.location || "",
    phone: initialUser.phone || "",
  })
  
  const [passwordFormData, setPasswordFormData] = useState<ChangePasswordInput>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  
  const [deleteAccountFormData, setDeleteAccountFormData] = useState<DeleteAccountInput>({
    password: "",
    confirmText: "",
  })
  
  const { update: updateSession } = useSession()
  const router = useRouter()

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setProfileFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleProfileSave = async () => {
    setIsSaving(true)
    try {
      const result = await updateProfile(profileFormData)
      if (result.success && result.user) {
        setUser({ ...result.user, role: user.role })
        toast.success("Profile updated successfully!")
        await updateSession({ user: { name: result.user.name, image: result.user.image } })
        setIsEditing(false)
      } else {
        toast.error(result.error || "Failed to update profile.")
      }
    } catch {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file.")
      return
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size must be less than 5MB.")
      return
    }

    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const result = await uploadProfileImage(formData)

      if (result.success && result.imageUrl) {
        setUser(prev => ({ ...prev, image: result.imageUrl || null }))
        toast.success("Profile image updated!")
        await updateSession({ user: { image: result.imageUrl } })
      } else {
        toast.error(result.error || "Failed to upload image.")
      }
    } catch {
      toast.error("An unexpected error occurred during image upload.")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPasswordFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    try {
      const result = await changePassword(passwordFormData)
      if (result.success) {
        toast.success(result.message)
        setPasswordFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        toast.error(result.error || "Failed to change password.")
      }
    } catch {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleDeleteAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setDeleteAccountFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleDeleteAccountSubmit = async () => {
    setIsDeletingAccount(true)
    try {
      const result = await deleteAccount(deleteAccountFormData)
      if (result.success) {
        toast.success(result.message)
        router.push('/signin')
      } else {
        toast.error(result.error || "Failed to delete account.")
      }
    } catch {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsDeletingAccount(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                Legal Professional Profile
              </CardTitle>
              {isEditing ? (
                <Button onClick={handleProfileSave} disabled={isSaving} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                  {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Save
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-950">
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-blue-300 shadow-md">
                    <AvatarImage src={user.image || "/placeholder-avatar.jpg"} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-3xl font-bold">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isSaving}
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">{user.name}</h2>
                    {lawyerProfile.isVerified && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4" /> {user.email}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Scale className="h-3 w-3" />
                      {lawyerProfile.experience} years experience
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {lawyerProfile.averageRating?.toFixed(1) || "New"} rating
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {lawyerProfile.completedBookings} consultations
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-center bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">₹{lawyerProfile.hourlyRate}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700 dark:text-blue-300">Hourly Rate</CardContent>
                </Card>
                <Card className="text-center bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardHeader className="pb-2">
                    <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl text-green-800 dark:text-green-200">{lawyerProfile.totalBookings}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-green-700 dark:text-green-300">Total Bookings</CardContent>
                </Card>
                <Card className="text-center bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <Award className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl text-purple-800 dark:text-purple-200">
                      {lawyerProfile.averageRating ? lawyerProfile.averageRating.toFixed(1) : "New"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-purple-700 dark:text-purple-300">Average Rating</CardContent>
                </Card>
                <Card className="text-center bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
                  <CardHeader className="pb-2">
                    <DollarSign className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                    <CardTitle className="text-2xl text-indigo-800 dark:text-indigo-200">₹{lawyerProfile.totalEarnings.toLocaleString()}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-indigo-700 dark:text-indigo-300">Total Earnings</CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      value={profileFormData.name} 
                      onChange={handleProfileChange} 
                      disabled={!isEditing || isSaving} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={profileFormData.location} 
                      onChange={handleProfileChange} 
                      disabled={!isEditing || isSaving} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={profileFormData.phone} 
                    onChange={handleProfileChange} 
                    disabled={!isEditing || isSaving} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profileFormData.bio} 
                    onChange={handleProfileChange} 
                    disabled={!isEditing || isSaving} 
                    rows={4} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Professional Details */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Professional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bar Registration Number</Label>
                    <p className="text-sm font-medium">{lawyerProfile.barRegistrationNumber || "Not provided"}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Experience</Label>
                    <p className="text-sm">{lawyerProfile.experience} years</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Specializations</Label>
                    <div className="flex flex-wrap gap-2">
                      {lawyerProfile.specializations.map((spec) => (
                        <Badge key={spec} variant="secondary">
                          {spec.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Languages</Label>
                    <div className="flex flex-wrap gap-2">
                      {lawyerProfile.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Practice Areas</Label>
                    <p className="text-sm text-muted-foreground">{lawyerProfile.practiceAreas || "Not specified"}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lawyerProfile.availabilities.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No availability set</p>
                  ) : (
                    lawyerProfile.availabilities.map((availability, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm font-medium">
                          {daysOfWeek[availability.dayOfWeek]}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {availability.startTime} - {availability.endTime}
                        </span>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews */}
            {lawyerProfile.reviews.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lawyerProfile.reviews.slice(0, 5).map((review, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{review.booking.client.name}</span>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-xl text-red-800 dark:text-red-200">Change Password</CardTitle>
                <CardDescription className="text-red-600 dark:text-red-400">Update your account password.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      value={passwordFormData.currentPassword} 
                      onChange={handlePasswordChange} 
                      disabled={isChangingPassword} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      value={passwordFormData.newPassword} 
                      onChange={handlePasswordChange} 
                      disabled={isChangingPassword} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={passwordFormData.confirmPassword} 
                      onChange={handlePasswordChange} 
                      disabled={isChangingPassword} 
                    />
                  </div>
                  <Button type="submit" disabled={isChangingPassword} className="bg-red-600 hover:bg-red-700 text-white">
                    {isChangingPassword ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-xl text-red-800 dark:text-red-200">Delete Account</CardTitle>
                <CardDescription className="text-red-600 dark:text-red-400">
                  Permanently delete your LawEase account and all associated data. This action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="delete-password">Your Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          value={deleteAccountFormData.password} 
                          onChange={handleDeleteAccountChange} 
                          disabled={isDeletingAccount} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-text">Type &quot;DELETE&quot; to confirm</Label>
                        <Input 
                          id="confirmText" 
                          value={deleteAccountFormData.confirmText} 
                          onChange={handleDeleteAccountChange} 
                          disabled={isDeletingAccount} 
                        />
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeletingAccount}>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteAccountSubmit} 
                        disabled={isDeletingAccount || deleteAccountFormData.confirmText !== "DELETE"}
                      >
                        {isDeletingAccount ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
