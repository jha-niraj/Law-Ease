"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Scale, 
  Users, 
  Target, 
  Heart, 
  Shield, 
  Zap, 
  Globe, 
  Award,
  MessageSquare,
  Bot,
  Gavel,
  CheckCircle,
  Star,
  TrendingUp,
  Lightbulb,
  UserCheck,
  Mail,
  Linkedin,
  Github
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const teamMembers = [
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=400",
    bio: "Former Supreme Court advocate with 15+ years experience. Passionate about making legal services accessible to everyone.",
    specialties: ["Constitutional Law", "Corporate Law", "Legal Tech"],
    email: "priya@lawease.in",
    linkedin: "https://linkedin.com/in/priyasharma"
  },
  {
    name: "Rajesh Kumar",
    role: "CTO & Co-Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Tech entrepreneur with expertise in AI/ML and legal technology. Previously built fintech solutions for emerging markets.",
    specialties: ["AI/ML", "Legal Tech", "Product Strategy"],
    email: "rajesh@lawease.in",
    linkedin: "https://linkedin.com/in/rajeshkumar",
    github: "https://github.com/rajeshkumar"
  },
  {
    name: "Dr. Meera Patel",
    role: "Head of Legal Research",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "PhD in Law from Harvard, specializing in Indian Constitutional Law and Legal Innovation. Published researcher with 50+ papers.",
    specialties: ["Legal Research", "Constitutional Law", "Policy"],
    email: "meera@lawease.in",
    linkedin: "https://linkedin.com/in/meeradrpatel"
  },
  {
    name: "Arjun Singh",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Product leader with experience at Google and Microsoft. Expert in building user-centric legal technology products.",
    specialties: ["Product Management", "UX Design", "Growth"],
    email: "arjun@lawease.in",
    linkedin: "https://linkedin.com/in/arjunsingh"
  },
  {
    name: "Anita Verma",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    bio: "Operations expert with MBA from IIM Bangalore. Specializes in scaling legal service operations and quality assurance.",
    specialties: ["Operations", "Quality Assurance", "Scaling"],
    email: "anita@lawease.in",
    linkedin: "https://linkedin.com/in/anitaverma"
  },
  {
    name: "Vikram Joshi",
    role: "Lead AI Engineer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    bio: "AI researcher from IIT Delhi with expertise in NLP and legal document processing. Building the future of legal AI.",
    specialties: ["AI/ML", "NLP", "Legal AI"],
    email: "vikram@lawease.in",
    linkedin: "https://linkedin.com/in/vikramjoshi",
    github: "https://github.com/vikramjoshi"
  }
]

const milestones = [
  {
    year: "2023",
    title: "Foundation",
    description: "LawEase was founded with a vision to democratize legal access in India",
    icon: <Lightbulb className="h-6 w-6" />
  },
  {
    year: "2023",
    title: "AI Development",
    description: "Launched our first AI-powered legal consultation system",
    icon: <Bot className="h-6 w-6" />
  },
  {
    year: "2024",
    title: "Lawyer Network",
    description: "Built India's first verified lawyer booking platform",
    icon: <Users className="h-6 w-6" />
  },
  {
    year: "2024",
    title: "Scale & Growth",
    description: "Serving 10,000+ users across 28 states in India",
    icon: <TrendingUp className="h-6 w-6" />
  }
]

const values = [
  {
    title: "Accessibility",
    description: "Making legal services accessible to every Indian, regardless of location or economic status",
    icon: <Globe className="h-8 w-8 text-blue-600" />
  },
  {
    title: "Trust & Transparency",
    description: "Building trust through verified lawyers, transparent pricing, and honest communication",
    icon: <Shield className="h-8 w-8 text-green-600" />
  },
  {
    title: "Innovation",
    description: "Leveraging cutting-edge AI and technology to revolutionize legal services",
    icon: <Zap className="h-8 w-8 text-purple-600" />
  },
  {
    title: "Quality",
    description: "Ensuring high-quality legal advice through rigorous verification and continuous improvement",
    icon: <Award className="h-8 w-8 text-yellow-600" />
  },
  {
    title: "Empowerment",
    description: "Empowering citizens with legal knowledge and connecting them with expert lawyers",
    icon: <UserCheck className="h-8 w-8 text-indigo-600" />
  },
  {
    title: "Social Impact",
    description: "Creating positive social impact by improving access to justice for all",
    icon: <Heart className="h-8 w-8 text-red-600" />
  }
]

const stats = [
  { number: "50,000+", label: "Users Served", icon: <Users className="h-6 w-6" /> },
  { number: "1,000+", label: "Verified Lawyers", icon: <Scale className="h-6 w-6" /> },
  { number: "100,000+", label: "AI Consultations", icon: <Bot className="h-6 w-6" /> },
  { number: "28", label: "States Covered", icon: <Globe className="h-6 w-6" /> },
  { number: "4.8/5", label: "User Rating", icon: <Star className="h-6 w-6" /> },
  { number: "24/7", label: "AI Support", icon: <MessageSquare className="h-6 w-6" /> }
]

export default function AboutPage() {
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
                  <Scale className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                </div>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight"
              >
                About LawEase
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-4xl mx-auto"
              >
                Democratizing legal access in India through AI-powered technology and verified legal professionals. 
                Making justice accessible, affordable, and understandable for every citizen.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
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
              Our Mission & Vision
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To bridge the justice gap in India by providing accessible, affordable, and reliable legal services 
                    through innovative technology and verified legal professionals.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Make legal services accessible in all Indian languages</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Connect citizens with verified legal professionals</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Provide AI-powered legal guidance 24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Gavel className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To create an India where every citizen has equal access to justice, legal knowledge, and 
                    professional legal representation, regardless of their socio-economic background.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Empower 100 million Indians with legal knowledge</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Build India&apos;s largest verified lawyer network</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Revolutionize legal services with AI technology</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Impact & Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to accessible justice is reflected in the lives we&apos;ve touched and the legal barriers we&apos;ve broken.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at LawEase, from product development to customer service.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {value.icon}
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a simple idea to India&apos;s leading legal technology platform.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <motion.div
              className="space-y-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative flex items-start gap-8"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    {milestone.icon}
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="text-sm">
                          {milestone.year}
                        </Badge>
                        <CardTitle className="text-xl">{milestone.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals behind LawEase, combining legal expertise with cutting-edge technology.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Link 
                        href={`mailto:${member.email}`}
                        className="text-muted-foreground hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                      </Link>
                      <Link 
                        href={member.linkedin}
                        className="text-muted-foreground hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                      {member.github && (
                        <Link 
                          href={member.github}
                          className="text-muted-foreground hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Ready to Experience Legal Services Reimagined?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of Indians who have already discovered a better way to access legal services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                >
                  Get Started Today
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-950/50 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
