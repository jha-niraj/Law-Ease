"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Camera, Edit, Lock, Trash2, User, MapPin, Phone, Calendar, MessageSquare, FileText, Crown } from "lucide-react"
import { toast } from "sonner"
import { updateProfile, uploadProfileImage, changePassword, deleteAccount } from "@/actions/profile.action"
import { uploadImageToCloudinary } from "@/actions/shared/upload.action"

interface User {
  id: string
  name: string
  email: string
  image?: string | null
  bio?: string | null
  location?: string | null
  phone?: string | null
  role: string
  totalConsultations: number
  totalDocuments: number
  membershipTier: string
  createdAt: string | Date
  updatedAt: string | Date
}

interface ProfileStats {
  memberSince: string
  totalConsultations: number
  totalDocuments: number
  membershipTier: string
}

interface MainProfileProps {
  user: User
  stats: ProfileStats
}

export function MainProfile({ user }: MainProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    location: user.location || "",
    phone: user.phone || "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [deleteData, setDeleteData] = useState({
    password: "",
    confirmText: "",
  })

  const handleProfileUpdate = async () => {
    try {
      const result = await updateProfile(formData)
      if (result.success) {
        toast.success("Profile updated successfully!")
        setIsEditing(false)
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        toast.error(result.error || "Failed to update profile")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const result = await uploadImageToCloudinary(formData)
      if (result.success && result.url) {
        // Update profile with new image
        const imageFormData = new FormData()
        imageFormData.append('image', file)
        
        const uploadResult = await uploadProfileImage(imageFormData)
        if (uploadResult.success) {
          toast.success("Profile image updated successfully!")
          window.location.reload()
        } else {
          toast.error(uploadResult.error || "Failed to update profile image")
        }
      } else {
        toast.error(result.message || "Failed to upload image")
      }
    } catch {
      toast.error("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handlePasswordChange = async () => {
    try {
      const result = await changePassword(passwordData)
      if (result.success) {
        toast.success("Password changed successfully!")
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        toast.error(result.error || "Failed to change password")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const result = await deleteAccount(deleteData)
      if (result.success) {
        toast.success("Account deleted successfully")
        // Redirect to home page
        window.location.href = "/"
      } else {
        toast.error(result.error || "Failed to delete account")
      }
    } catch {
      toast.error("Something went wrong")
    }
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30 dark:from-slate-900 dark:to-teal-900/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-xl dark:bg-gray-800/80 dark:border-teal-700/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-teal-200 dark:border-teal-700">
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-teal-100 dark:bg-teal-800">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full shadow-lg transition-colors">
                      <Camera className="w-4 h-4" />
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
												</div>
											</div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                    <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900 dark:text-teal-300">
                      <Crown className="w-3 h-3 mr-1" />
                      {user.membershipTier}
                    </Badge>
											</div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">{user.email}</p>
                  {user.bio && (
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{user.bio}</p>
                  )}
										</div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">{user.totalConsultations}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Consultations</div>
											</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">{user.totalDocuments}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Documents</div>
										</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">{memberSince.split(',')[1]}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Member Since</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Security</span>
								</TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Activity</span>
								</TabsTrigger>
							</TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
									<CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-teal-300 text-teal-700 hover:bg-teal-50 dark:border-teal-600 dark:text-teal-300"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
									</CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="City, State"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2 flex space-x-4">
                      <Button onClick={handleProfileUpdate} className="bg-teal-600 hover:bg-teal-700">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="font-medium">{user.location || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                        <p className="font-medium">{user.phone || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                        <p className="font-medium">{memberSince}</p>
                      </div>
                    </div>
                    {user.bio && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bio</p>
                        <p className="text-gray-800 dark:text-gray-200">{user.bio}</p>
                      </div>
                    )}
                  </div>
                )}
									</CardContent>
								</Card>
							</TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
									<CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
									</CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <Button onClick={handlePasswordChange} className="bg-teal-600 hover:bg-teal-700">
                    Update Password
                  </Button>
                </div>

                {/* Delete Account */}
                <div className="border-t pt-6">
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Danger Zone</h3>
                    <p className="text-red-600 dark:text-red-400 mb-4">
                      Once you delete your account, there is no going back. This will permanently delete your account and all associated data.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4 my-4">
                          <div>
                            <Label htmlFor="deletePassword">Enter your password to confirm</Label>
                            <Input
                              id="deletePassword"
                              type="password"
                              value={deleteData.password}
                              onChange={(e) => setDeleteData({ ...deleteData, password: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="confirmText">Type &quot;DELETE&quot; to confirm</Label>
                            <Input
                              id="confirmText"
                              value={deleteData.confirmText}
                              onChange={(e) => setDeleteData({ ...deleteData, confirmText: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={deleteData.confirmText !== "DELETE" || !deleteData.password}
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
									</CardContent>
								</Card>
							</TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{user.totalConsultations}</div>
                  <p className="text-gray-600 dark:text-gray-400">Total Consultations</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{user.totalDocuments}</div>
                  <p className="text-gray-600 dark:text-gray-400">Documents Processed</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
                <CardContent className="p-6 text-center">
                  <Crown className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{user.membershipTier}</div>
                  <p className="text-gray-600 dark:text-gray-400">Membership Tier</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
						</Tabs>
			</div>
		</div>
	)
}