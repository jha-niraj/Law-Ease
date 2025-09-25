"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
  Scale,
  Users,
  BookOpen,
  MessageCircle,
  Shield,
  Globe,
  TrendingUp,
  Heart,
  Gavel,
  FileText,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

export default function LandingPage() {
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
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Navbar isLoggedIn={false} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight text-balance"
              >
                Law Ease – Law Made Simple, Justice Made Accessible
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-3xl mx-auto"
              >
                Empowering citizens, students, and legal practitioners with accessible legal information, multilingual
                support, and innovative tools for justice.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3"
                onClick={() => window.location.href = '/signup'}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-950/50 font-semibold transition-all duration-300 px-8 py-3"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Feature Icons */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center space-x-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">Legal AI</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium">Expert Network</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium">Legal Library</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              The Legal Access Challenge
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Millions struggle to understand their legal rights due to complex language, limited access, and language
              barriers.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">78%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">of citizens find legal documents too complex to understand</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 border-indigo-200 dark:border-indigo-800">
                <CardHeader>
                  <div className="mx-auto bg-indigo-100 dark:bg-indigo-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">500M+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    people lack access to legal information in their native language
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <div className="mx-auto bg-purple-100 dark:bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-400">65%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">increase in legal queries during digital transformation</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">Our Vision & Mission</h2>
              <div className="space-y-6">
                <motion.div
                  className="border-l-4 border-blue-500 dark:border-blue-400 pl-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">Vision</h3>
                  <p className="text-muted-foreground">
                    A world where legal knowledge is accessible to everyone, regardless of language, education, or
                    economic status.
                  </p>
                </motion.div>
                <motion.div
                  className="border-l-4 border-indigo-500 dark:border-indigo-400 pl-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mission</h3>
                  <p className="text-muted-foreground">
                    To democratize legal information through technology, making justice accessible, understandable, and
                    actionable for all.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="grid grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUp} className="text-center">
                  <Heart className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground">Empathy</h4>
                  <p className="text-sm text-muted-foreground">Understanding user needs</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center">
                  <Shield className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground">Trust</h4>
                  <p className="text-sm text-muted-foreground">Reliable legal information</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center">
                  <Globe className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground">Accessibility</h4>
                  <p className="text-sm text-muted-foreground">Available to everyone</p>
                </motion.div>
                <motion.div variants={fadeInUp} className="text-center">
                  <BookOpen className="h-12 w-12 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground">Education</h4>
                  <p className="text-sm text-muted-foreground">Learning-focused approach</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools designed to make legal information accessible and actionable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Multilingual Translation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Translate complex legal documents into simple, understandable language in multiple regional languages.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Document Summarizer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get concise summaries of lengthy legal documents with key points highlighted for quick understanding.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>AI Legal Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant answers to legal questions through our intelligent chatbot trained on legal databases.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Legal Aid Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with qualified legal aid services and lawyers based on your location and case requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Gavel className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Virtual Court Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access digital court proceedings and understand verdicts with simplified explanations and audio
                  support.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Educational Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access comprehensive study materials, videos, and interactive content for legal education and
                  awareness.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Designed for Every User</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tailored experiences for different user types and their unique legal needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="mx-auto bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl">Students</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Study materials, translations, summaries, and interactive learning tools
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="mx-auto bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl">Public</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Legal awareness, rights information, and access to legal aid services
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="mx-auto bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Gavel className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl">Practitioners</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Advanced tools, case management, and professional resources
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="pb-4">
                <div className="mx-auto bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Shield className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-xl">Administrators</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Platform management, content moderation, and system oversight
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accessibility & Inclusivity Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Accessibility & Inclusivity First
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Breaking down barriers to ensure legal information is accessible to everyone
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Voice Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Audio playback of legal content for visually impaired users and those who prefer auditory learning.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Multilingual Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Support for multiple regional languages with culturally appropriate legal interpretations and
                  explanations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Multi-Channel Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access through WhatsApp, Telegram, SMS, and voice calls for users with limited internet connectivity.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Making a Real Impact</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transforming lives through accessible legal information and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">1M+</div>
              <p className="text-muted-foreground">People Helped</p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">15+</div>
              <p className="text-muted-foreground">Languages Supported</p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">50K+</div>
              <p className="text-muted-foreground">Documents Simplified</p>
            </div>

            <div className="text-center">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">95%</div>
              <p className="text-muted-foreground">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="font-serif font-bold text-xl">Law Ease</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-4 max-w-md">
                Making legal information accessible to everyone through technology, multilingual support, and
                user-friendly interfaces.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-100">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-100">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">support@lawease.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">New Delhi, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="border-t border-slate-300 dark:border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              © 2025 Law Ease. All rights reserved. Making justice accessible to all.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}