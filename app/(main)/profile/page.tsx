import { getProfile, getUserStats } from "@/actions/profile.action"
import { getLawyerProfile } from "@/actions/lawyer.action"
import { MainProfile } from "./_components/mainprofile"
import { LawyerProfile } from "./_components/lawyer-profile"

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
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
	const session = await auth();

	if (!session?.user) {
		redirect('/signin')
	}

	// Get different data based on user role
	const [profileData, statsData, lawyerData] = await Promise.all([
		getProfile(),
		getUserStats(),
		session.user.role === 'LAWYER' ? getLawyerProfile() : Promise.resolve({ success: false })
	])

	if (!profileData.success || !profileData.user) {
		return (
			<div className="min-h-screen bg-white dark:bg-neutral-950 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-red-600">Error loading profile</h1>
					<p className="text-neutral-600 dark:text-neutral-400 mt-2">Please try again later</p>
				</div>
			</div>
		)
	}

	const { user } = profileData
	const stats = statsData.success ? statsData.stats : null

	// Transform stats to ProfileStats format
	const profileStats = stats ? {
		memberSince: stats.memberSince || new Date().toISOString(),
		totalConsultations: stats.totalConsultations || 0,
		totalDocuments: stats.totalDocuments || 0,
		membershipTier: stats.membershipTier || "Basic"
	} : {
		memberSince: new Date().toISOString(),
		totalConsultations: 0,
		totalDocuments: 0,
		membershipTier: "Basic"
	}

	// Show role-specific profile
	if (session.user.role === 'LAWYER' && lawyerData.success && 'profile' in lawyerData) {
		return <LawyerProfile user={user} stats={profileStats} lawyerProfile={lawyerData.profile as LawyerProfileData} />
	}

	return <MainProfile user={user} stats={profileStats} />
}