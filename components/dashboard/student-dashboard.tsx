"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Bot, 
  MessageSquare, 
  Trophy, 
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  GraduationCap,
  Users,
  FileText
} from "lucide-react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import Link from "next/link"

interface StudentStats {
  totalAIConsultations: number
  totalStudyTime: number
  completedTopics: number
  currentStreak: number
  averageScore: number
  recentActivities: Array<{
    id: number
    type: string
    title: string
    timestamp: Date
    duration?: string
    score?: number
  }>
  upcomingDeadlines: Array<{
    id: number
    title: string
    dueDate: Date
    priority: string
  }>
  achievements: Array<{
    id: number
    title: string
    icon: string
    unlocked: boolean
  }>
}

export function StudentDashboard() {
  const { data: session } = useSession()
  const [stats] = useState<StudentStats>({
    totalAIConsultations: 12,
    totalStudyTime: 45, // hours
    completedTopics: 8,
    currentStreak: 5, // days
    averageScore: 85,
    recentActivities: [
      { id: 1, type: "ai_consultation", title: "Property Law Query", timestamp: new Date(), duration: "15 min" },
      { id: 2, type: "study", title: "Constitutional Law Chapter 3", timestamp: new Date(Date.now() - 86400000), duration: "45 min" },
      { id: 3, type: "quiz", title: "Criminal Law Quiz", timestamp: new Date(Date.now() - 172800000), score: 90 },
    ],
    upcomingDeadlines: [
      { id: 1, title: "Constitutional Law Assignment", dueDate: new Date(Date.now() + 604800000), priority: "high" },
      { id: 2, title: "Criminal Law Case Study", dueDate: new Date(Date.now() + 1209600000), priority: "medium" },
    ],
    achievements: [
      { id: 1, title: "First AI Consultation", icon: "🤖", unlocked: true },
      { id: 2, title: "Study Streak 5 Days", icon: "🔥", unlocked: true },
      { id: 3, title: "Quiz Master", icon: "🏆", unlocked: false },
    ]
  })
  // const [isLoading, setIsLoading] = useState(false)

  const studyProgress = (stats.completedTopics / 20) * 100 // Assuming 20 total topics

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
                    Continue your legal studies journey with AI-powered assistance
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Student
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stats.currentStreak} day study streak 🔥
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
                <CardTitle className="text-sm font-medium">AI Consultations</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAIConsultations}</div>
                <p className="text-xs text-muted-foreground">
                  Legal queries resolved
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
                <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudyTime}h</div>
                <p className="text-xs text-muted-foreground">
                  This month
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
                <CardTitle className="text-sm font-medium">Topics Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedTopics}/20</div>
                <Progress value={studyProgress} className="mt-2" />
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
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageScore}%</div>
                <p className="text-xs text-muted-foreground">
                  Quiz performance
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Mentor Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <CardTitle>AI Legal Mentor</CardTitle>
                </div>
                <CardDescription>
                  Get instant help with your legal studies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-3xl mb-2">🤖</div>
                  <p className="text-sm text-muted-foreground">
                    Ask questions, get explanations, and practice with our AI mentor
                  </p>
                </div>
                <Link href="/ai-mentor">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start AI Session
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === 'ai_consultation' && <Bot className="h-5 w-5 text-blue-500" />}
                      {activity.type === 'study' && <BookOpen className="h-5 w-5 text-green-500" />}
                      {activity.type === 'quiz' && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.duration || `Score: ${activity.score}%`}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Study Tools & Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Study Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/legal-library">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Legal Library
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <FileText className="h-4 w-4 mr-2" />
                  Practice Tests (Coming Soon)
                </Button>
                <Button variant="outline" className="w-full justify-start" disabled>
                  <Users className="h-4 w-4 mr-2" />
                  Study Groups (Coming Soon)
                </Button>
                <Link href="/lawyers">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Connect with Lawyers
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements & Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {stats.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`text-center p-4 border rounded-lg transition-colors ${
                        achievement.unlocked 
                          ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800' 
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{achievement.icon}</div>
                      <p className="text-xs font-medium">{achievement.title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-red-500" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.upcomingDeadlines.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No upcoming deadlines
                  </p>
                ) : (
                  stats.upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {deadline.dueDate.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}
                      >
                        {deadline.priority}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Study Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Study Progress
              </CardTitle>
              <CardDescription>
                Your learning journey in legal studies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Constitutional Law</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Criminal Law</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Civil Law</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Property Law</span>
                    <span>30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
