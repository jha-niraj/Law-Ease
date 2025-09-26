"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Scale,
    Shield,
    FileText,
    AlertTriangle,
    CheckCircle,
    Clock,
    Users,
    CreditCard,
    Gavel,
    Globe,
    Lock,
    UserCheck,
    Building,
    Mail
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const sections = [
    {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        icon: <CheckCircle className="h-6 w-6 text-green-600" />,
        content: `By accessing and using LawEase ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and LawEase India Private Limited ("LawEase," "we," "us," or "our") regarding your use of the LawEase platform and services.

By creating an account, accessing our website, mobile application, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.`
    },
    {
        id: "services",
        title: "2. Description of Services",
        icon: <Scale className="h-6 w-6 text-blue-600" />,
        content: `LawEase provides an online platform that connects users with verified legal professionals and offers AI-powered legal assistance. Our services include:

**AI Legal Mentor:**
- 24/7 AI-powered legal guidance and information
- Legal document analysis and review
- Case law research and legal precedent analysis
- General legal advice for common legal issues

**Lawyer Consultation Services:**
- Verified lawyer profiles and credentials
- Online booking system for legal consultations
- Secure video conferencing for remote consultations
- Document sharing and case management tools

**Educational Resources:**
- Legal education content for students and professionals
- Legal document templates and forms
- Legal news and updates
- Webinars and educational seminars

**Additional Services:**
- Legal document preparation assistance
- Court filing assistance (where applicable)
- Legal research services
- Multilingual support for Indian languages

LawEase acts as a technology platform facilitating connections between users and legal professionals. We do not practice law or provide legal services directly.`
    },
    {
        id: "eligibility",
        title: "3. User Eligibility and Registration",
        icon: <UserCheck className="h-6 w-6 text-purple-600" />,
        content: `**Eligibility Requirements:**
- You must be at least 18 years of age to use LawEase services
- You must be a resident of India or have legal matters pertaining to Indian law
- You must provide accurate and complete information during registration
- You must have the legal capacity to enter into binding contracts

**Account Registration:**
- You are responsible for maintaining the confidentiality of your account credentials
- You agree to notify us immediately of any unauthorized use of your account
- You may not transfer your account to another person without our written consent
- We reserve the right to suspend or terminate accounts that violate these Terms

**Verification Process:**
For lawyers joining the platform:
- Valid Bar Council registration and license verification
- Educational qualification verification
- Professional experience verification
- Background checks and reference verification
- Ongoing compliance with professional standards

**Account Types:**
- General Users: Access to AI mentor and lawyer consultation booking
- Students: Access to educational resources and discounted consultations
- Lawyers: Professional profiles and client management tools
- Corporate Users: Enterprise solutions and bulk consultation services`
    },
    {
        id: "usage",
        title: "4. Acceptable Use Policy",
        icon: <Shield className="h-6 w-6 text-indigo-600" />,
        content: `**Permitted Uses:**
- Seeking legitimate legal advice and consultation
- Using AI tools for legal research and document analysis
- Educational purposes and legal learning
- Professional networking within the legal community

**Prohibited Activities:**
You agree not to:
- Use the platform for any illegal or unauthorized purpose
- Impersonate any person or entity or provide false information
- Attempt to gain unauthorized access to other users' accounts or data
- Upload, post, or transmit any content that is harmful, threatening, abusive, or defamatory
- Use automated systems (bots, scrapers) to access or collect data from the platform
- Interfere with or disrupt the platform's functionality or security
- Circumvent any security measures or access controls
- Use the platform to solicit business outside of the designated channels

**Content Guidelines:**
- All user-generated content must be relevant and appropriate
- No sharing of confidential or privileged information in public forums
- Respect attorney-client privilege and confidentiality
- No spam, promotional content, or unauthorized advertising
- Compliance with applicable laws regarding content sharing

**Consequences of Violations:**
- Warning and account restrictions
- Temporary or permanent account suspension
- Legal action for severe violations
- Reporting to relevant authorities when required by law`
    },
    {
        id: "payments",
        title: "5. Payment Terms and Billing",
        icon: <CreditCard className="h-6 w-6 text-yellow-600" />,
        content: `**Pricing and Fees:**
- AI Mentor services are provided free of charge with usage limitations
- Lawyer consultation fees are set by individual lawyers and displayed transparently
- Platform fees and service charges are clearly disclosed before payment
- All prices are in Indian Rupees (INR) unless otherwise specified

**Payment Processing:**
- Payments are processed through secure, PCI-compliant payment gateways
- We accept major credit cards, debit cards, UPI, net banking, and digital wallets
- Payment must be completed before accessing paid services
- We use third-party payment processors and are not responsible for their services

**Refund Policy:**
- Consultations can be cancelled up to 2 hours before the scheduled time for full refund
- Cancellations within 2 hours are subject to a 25% cancellation fee
- No-shows by clients are not eligible for refunds
- Technical issues preventing service delivery will result in full refunds
- Refund processing may take 5-7 business days

**Platform Fees:**
- LawEase charges a platform fee for facilitating lawyer-client connections
- Platform fees are included in the total consultation fee displayed to users
- Lawyers receive their portion after deducting platform fees and applicable taxes
- Fee structures are subject to change with 30 days notice

**Billing Disputes:**
- Report billing disputes within 30 days of the transaction
- Provide detailed information about the disputed transaction
- We will investigate and respond within 10 business days
- Disputed amounts may be held pending resolution`
    },
    {
        id: "lawyer-terms",
        title: "6. Terms for Legal Professionals",
        icon: <Gavel className="h-6 w-6 text-red-600" />,
        content: `**Professional Standards:**
- Maintain valid Bar Council registration and professional licenses
- Comply with all applicable legal ethics and professional conduct rules
- Provide accurate information about qualifications and experience
- Maintain professional standards in all client interactions

**Service Obligations:**
- Respond to consultation requests within specified timeframes
- Provide competent and diligent legal services
- Maintain client confidentiality and attorney-client privilege
- Honor scheduled consultation appointments or provide adequate notice for rescheduling

**Platform Compliance:**
- Use only designated communication channels for client interactions
- Maintain updated professional profile information
- Participate in platform quality assurance programs
- Comply with platform policies and guidelines

**Fee Structure and Payments:**
- Set consultation fees within reasonable market ranges
- Honor quoted fees for scheduled consultations
- Payments are processed through the platform with applicable deductions
- Monthly payment statements and tax documentation provided

**Professional Liability:**
- Maintain professional liability insurance as required by law
- Assume full responsibility for legal advice and services provided
- Indemnify LawEase against claims arising from professional services
- Comply with all applicable laws and regulations

**Termination of Professional Accounts:**
- Either party may terminate the professional relationship with 30 days notice
- Immediate termination for violations of professional standards or platform policies
- Completion of ongoing client matters before account closure
- Data retention and transfer procedures for client matters`
    },
    {
        id: "privacy",
        title: "7. Privacy and Data Protection",
        icon: <Lock className="h-6 w-6 text-teal-600" />,
        content: `**Data Collection and Use:**
- We collect personal information necessary to provide our services
- Information is used solely for service delivery and platform improvement
- We comply with applicable data protection laws including the IT Act, 2000
- Detailed privacy practices are outlined in our Privacy Policy

**Client-Lawyer Confidentiality:**
- All communications between clients and lawyers are confidential
- We provide secure, encrypted communication channels
- Attorney-client privilege is maintained and protected
- No access to confidential communications without legal authorization

**Data Security Measures:**
- Industry-standard encryption for data transmission and storage
- Regular security audits and vulnerability assessments
- Access controls and authentication measures
- Incident response procedures for security breaches

**Data Retention:**
- Personal data is retained only as long as necessary for service provision
- Users can request data deletion subject to legal and regulatory requirements
- Backup data is securely stored and periodically purged
- Compliance with data localization requirements

**Third-Party Services:**
- We use trusted third-party services for payments, communications, and analytics
- Third-party privacy policies apply to their services
- We ensure appropriate data protection agreements with service providers
- Users are informed about third-party data sharing

**User Rights:**
- Access to personal data held by LawEase
- Correction of inaccurate or incomplete information
- Data portability where technically feasible
- Withdrawal of consent for non-essential data processing`
    },
    {
        id: "intellectual-property",
        title: "8. Intellectual Property Rights",
        icon: <FileText className="h-6 w-6 text-orange-600" />,
        content: `**LawEase Intellectual Property:**
- All platform content, design, software, and trademarks are owned by LawEase
- Users receive a limited, non-exclusive license to use the platform
- No right to reproduce, distribute, or create derivative works
- Protection under Indian copyright, trademark, and patent laws

**User-Generated Content:**
- Users retain ownership of content they create and upload
- Users grant LawEase a license to use content for platform operations
- Content must not infringe on third-party intellectual property rights
- We may remove content that violates intellectual property rights

**AI-Generated Content:**
- AI-generated legal advice and documents are for informational purposes only
- Users may use AI-generated content subject to these Terms
- No warranty regarding accuracy or completeness of AI-generated content
- Users assume responsibility for use of AI-generated content

**Lawyer Content:**
- Lawyers retain rights to their professional content and materials
- Platform license for content display and marketing purposes
- Respect for lawyer work product and professional materials
- Protection of confidential client information and work product

**Copyright Infringement:**
- We respond to valid copyright infringement notices
- DMCA-compliant takedown procedures
- Counter-notification process for disputed claims
- Account termination for repeat infringers

**Trademark Policy:**
- Respect for third-party trademarks and brand names
- Guidelines for use of LawEase trademarks and logos
- Prohibition on misleading or confusing trademark use
- Enforcement procedures for trademark violations`
    },
    {
        id: "disclaimers",
        title: "9. Disclaimers and Limitations",
        icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
        content: `**Service Disclaimers:**
- LawEase is a technology platform and does not practice law
- AI-generated content is for informational purposes only and not legal advice
- We do not guarantee outcomes of legal matters or consultations
- Platform availability may be subject to maintenance and technical issues

**No Attorney-Client Relationship:**
- No attorney-client relationship exists between users and LawEase
- Attorney-client relationships are formed directly between users and lawyers
- LawEase is not responsible for the quality of legal services provided by lawyers
- Users must independently verify lawyer credentials and qualifications

**Limitation of Liability:**
- LawEase liability is limited to the maximum extent permitted by law
- No liability for indirect, consequential, or punitive damages
- Total liability limited to the amount paid for services in the preceding 12 months
- No liability for third-party actions or content

**Technical Disclaimers:**
- Platform provided "as is" without warranties of any kind
- No guarantee of uninterrupted or error-free service
- No warranty regarding security or data integrity
- Users responsible for their own data backup and security measures

**Legal Advice Disclaimer:**
- Platform content is for general informational purposes only
- Not a substitute for professional legal advice
- Users should consult qualified lawyers for specific legal matters
- Laws and regulations vary by jurisdiction and change over time

**Third-Party Services:**
- No control over third-party service quality or availability
- No endorsement of third-party products or services
- Users assume risks associated with third-party services
- Separate terms may apply to third-party services`
    },
    {
        id: "termination",
        title: "10. Termination and Suspension",
        icon: <Clock className="h-6 w-6 text-gray-600" />,
        content: `**User Termination Rights:**
- Users may terminate their accounts at any time through account settings
- Termination does not affect completed transactions or ongoing legal matters
- Users remain responsible for any outstanding fees or obligations
- Data deletion procedures apply subject to legal retention requirements

**LawEase Termination Rights:**
- We may suspend or terminate accounts for violations of these Terms
- Immediate termination for illegal activities or security threats
- 30-day notice for non-material violations with opportunity to cure
- No refund for prepaid services in case of termination for cause

**Suspension Procedures:**
- Temporary suspension for investigation of potential violations
- Notice and opportunity to respond to suspension actions
- Restoration of accounts upon resolution of issues
- Escalation procedures for disputed suspensions

**Effect of Termination:**
- Loss of access to platform services and content
- Completion of ongoing legal matters outside the platform
- Data retention and deletion according to our Privacy Policy
- Survival of provisions that should reasonably survive termination

**Post-Termination Obligations:**
- Payment of outstanding fees and charges
- Return of any LawEase property or confidential information
- Compliance with confidentiality and non-disclosure obligations
- Cooperation with ongoing legal matters or investigations`
    },
    {
        id: "governing-law",
        title: "11. Governing Law and Dispute Resolution",
        icon: <Building className="h-6 w-6 text-slate-600" />,
        content: `**Governing Law:**
- These Terms are governed by the laws of India
- Indian courts have exclusive jurisdiction over disputes
- Compliance with applicable Indian regulations and statutes
- International users subject to Indian law for platform-related matters

**Dispute Resolution Process:**
1. **Direct Negotiation:** Parties attempt to resolve disputes through good faith negotiations
2. **Mediation:** Unresolved disputes subject to mediation by mutually agreed mediator
3. **Arbitration:** Final disputes resolved through arbitration under Indian Arbitration Act
4. **Court Proceedings:** Limited to enforcement of arbitration awards and injunctive relief

**Arbitration Procedures:**
- Single arbitrator appointed by mutual agreement or arbitration institution
- Seat of arbitration in New Delhi, India
- Proceedings conducted in English language
- Expedited procedures for disputes under ₹10,00,000

**Class Action Waiver:**
- Users waive rights to participate in class action lawsuits
- Individual arbitration required for all disputes
- No consolidation of claims without mutual consent
- Exceptions for small claims court proceedings

**Limitation Period:**
- Legal actions must be commenced within one year of the cause of action
- Discovery rule applies to unknown or undiscoverable claims
- Statutory limitation periods may apply to specific types of claims
- Waiver of longer limitation periods provided by law

**Emergency Relief:**
- Courts may grant injunctive relief for urgent matters
- Temporary restraining orders available for platform security issues
- No waiver of arbitration requirement for final resolution
- Expedited arbitration procedures for time-sensitive matters`
    },
    {
        id: "modifications",
        title: "12. Modifications and Updates",
        icon: <FileText className="h-6 w-6 text-violet-600" />,
        content: `**Terms Updates:**
- We reserve the right to modify these Terms at any time
- Material changes require 30 days advance notice to users
- Continued use of the platform constitutes acceptance of modified Terms
- Users may terminate accounts if they disagree with modifications

**Notification Methods:**
- Email notifications to registered email addresses
- Platform notifications and banners
- Updates posted on the Terms of Service page
- Mobile app push notifications for significant changes

**Version Control:**
- Each version of Terms is dated and archived
- Previous versions available for reference
- Clear indication of changes in new versions
- Legal effect of superseded versions

**User Consent:**
- Explicit consent required for material changes affecting user rights
- Opt-out procedures for users who disagree with changes
- Grandfathering of existing agreements where appropriate
- Clear explanation of changes and their implications

**Platform Updates:**
- Regular updates to improve functionality and security
- New features may be subject to additional terms
- Beta features may have separate terms and conditions
- Deprecation notices for discontinued features`
    }
]

const quickLinks = [
    { title: "Privacy Policy", href: "/privacy", icon: <Lock className="h-4 w-4" /> },
    { title: "Contact Us", href: "/contact", icon: <Mail className="h-4 w-4" /> },
    { title: "About LawEase", href: "/about", icon: <Users className="h-4 w-4" /> },
    { title: "Legal Disclaimer", href: "#disclaimers", icon: <AlertTriangle className="h-4 w-4" /> }
]

export default function TermsPage() {
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
                                Terms of Service
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-4xl mx-auto"
                            >
                                Comprehensive terms governing your use of LawEase platform and services.
                                Please read carefully to understand your rights and obligations.
                            </motion.p>
                        </div>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                Last Updated: January 15, 2024
                            </Badge>
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                                Version 2.1
                            </Badge>
                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                                Effective Immediately
                            </Badge>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Navigation */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Navigation</h2>
                        <p className="text-muted-foreground">Jump to specific sections or explore related policies</p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {quickLinks.map((link, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Link href={link.href}>
                                    <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                                        <CardContent className="p-4 text-center">
                                            <div className="flex justify-center mb-2">
                                                {link.icon}
                                            </div>
                                            <p className="text-sm font-medium">{link.title}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Important Notice */}
            <section className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                    <CardTitle className="text-xl text-amber-800 dark:text-amber-200">Important Legal Notice</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                                    By using LawEase, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                                    These terms constitute a legally binding agreement between you and LawEase India Private Limited.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4 mt-4">
                                    <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                                        <CheckCircle className="h-4 w-4" />
                                        <span>Legally Binding</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                                        <Globe className="h-4 w-4" />
                                        <span>Governed by Indian Law</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                                        <Shield className="h-4 w-4" />
                                        <span>User Protection</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Terms Sections */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="space-y-12"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {sections.map((section, index) => (
                            <motion.div key={section.id} variants={fadeInUp} id={section.id}>
                                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full p-3">
                                                {section.icon}
                                            </div>
                                            <div>
                                                <CardTitle className="text-2xl text-foreground">{section.title}</CardTitle>
                                                <CardDescription>
                                                    Section {index + 1} of our Terms of Service
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="prose prose-slate dark:prose-invert max-w-none">
                                            {section.content.split('\n\n').map((paragraph, idx) => {
                                                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                                                    // Handle bold headers
                                                    return (
                                                        <h4 key={idx} className="text-lg font-semibold text-foreground mt-6 mb-3">
                                                            {paragraph.slice(2, -2)}
                                                        </h4>
                                                    )
                                                } else if (paragraph.includes('**')) {
                                                    // Handle inline bold text
                                                    const parts = paragraph.split('**')
                                                    return (
                                                        <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                                                            {parts.map((part, partIdx) =>
                                                                partIdx % 2 === 0 ? part : <strong key={partIdx} className="text-foreground">{part}</strong>
                                                            )}
                                                        </p>
                                                    )
                                                } else if (paragraph.trim().startsWith('-')) {
                                                    // Handle bullet points
                                                    const items = paragraph.split('\n').filter(item => item.trim().startsWith('-'))
                                                    return (
                                                        <ul key={idx} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                                                            {items.map((item, itemIdx) => (
                                                                <li key={itemIdx} className="leading-relaxed">
                                                                    {item.trim().substring(1).trim()}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )
                                                } else if (paragraph.trim().match(/^\d+\./)) {
                                                    // Handle numbered lists
                                                    const items = paragraph.split('\n').filter(item => item.trim().match(/^\d+\./))
                                                    return (
                                                        <ol key={idx} className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                                                            {items.map((item, itemIdx) => (
                                                                <li key={itemIdx} className="leading-relaxed">
                                                                    {item.trim().replace(/^\d+\.\s*/, '')}
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    )
                                                } else {
                                                    // Regular paragraph
                                                    return (
                                                        <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                                                            {paragraph}
                                                        </p>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                            <CardHeader>
                                <CardTitle className="text-2xl">Questions About These Terms?</CardTitle>
                                <CardDescription>
                                    We&apos;re here to help clarify any questions you may have about our Terms of Service.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="text-left">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Building className="h-4 w-4" />
                                            Legal Department
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-1">LawEase India Private Limited</p>
                                        <p className="text-sm text-muted-foreground mb-1">123 Connaught Place</p>
                                        <p className="text-sm text-muted-foreground">New Delhi - 110001, India</p>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            Contact Information
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-1">Email: legal@lawease.in</p>
                                        <p className="text-sm text-muted-foreground mb-1">Phone: +91 11 4567 8901</p>
                                        <p className="text-sm text-muted-foreground">Support: support@lawease.in</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground">
                                        For immediate assistance with legal matters, please use our AI mentor or book a consultation with a verified lawyer.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
