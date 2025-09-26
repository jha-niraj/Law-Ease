"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  Globe, 
  Clock,
  Settings,
  Mail,
  Users,
  Trash2,
  Download
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const privacySections = [
  {
    id: "introduction",
    title: "1. Introduction and Scope",
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    content: `LawEase India Private Limited ("LawEase," "we," "us," or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, process, and protect your information when you use our platform and services.

**Our Commitment:**
- Transparency in data collection and usage
- Strong security measures to protect your information
- Compliance with applicable Indian privacy laws including the Information Technology Act, 2000
- Respect for your privacy choices and preferences

**Scope of This Policy:**
This Privacy Policy applies to all users of LawEase services, including:
- General users seeking legal information and consultations
- Law students accessing educational resources
- Legal professionals providing services through our platform
- Corporate clients using enterprise solutions

**Data Controller Information:**
LawEase India Private Limited acts as the data controller for personal information collected through our platform. We determine the purposes and means of processing your personal data in accordance with this Privacy Policy and applicable laws.

**Updates and Changes:**
We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable laws. We will notify you of material changes and obtain your consent where required by law.`
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    icon: <Database className="h-6 w-6 text-green-600" />,
    content: `**Personal Information:**
- **Identity Information:** Name, email address, phone number, date of birth, gender
- **Professional Information:** For lawyers - Bar registration number, educational qualifications, experience, specializations
- **Contact Information:** Mailing address, billing address, emergency contact details
- **Financial Information:** Payment methods, billing information, transaction history
- **Government IDs:** Aadhaar number, PAN card, passport details (for verification purposes)

**Usage Information:**
- **Platform Activity:** Pages visited, features used, time spent on platform
- **Consultation Data:** Chat logs, video call recordings (with consent), document uploads
- **Search Queries:** Legal topics searched, lawyer preferences, consultation history
- **Device Information:** IP address, browser type, operating system, device identifiers

**Communication Data:**
- **Messages:** Communications between users and lawyers, support tickets, feedback
- **Call Records:** Audio/video recordings of consultations (with explicit consent)
- **Email Communications:** Service emails, newsletters, promotional communications

**Legal Documents and Case Information:**
- **Document Uploads:** Legal documents, contracts, case files shared for review
- **Case Details:** Matter descriptions, legal issues, consultation notes
- **Research Data:** Legal research queries, document analysis requests

**Third-Party Information:**
- **Social Media:** Profile information from social login providers (Google, Facebook)
- **Professional Networks:** LinkedIn profile information for lawyer verification
- **Payment Processors:** Transaction data from payment gateway providers
- **Background Checks:** Verification data from third-party verification services

**Sensitive Personal Data:**
We may collect sensitive personal data including:
- **Health Information:** When relevant to legal matters (personal injury, medical malpractice)
- **Financial Details:** Income, assets, liabilities for financial legal matters
- **Biometric Data:** For enhanced security verification (optional)
- **Legal Proceedings:** Information about ongoing or past legal cases

**Children's Information:**
We do not knowingly collect personal information from children under 18 years of age without parental consent. If we discover we have collected such information, we will delete it promptly.`
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    icon: <Settings className="h-6 w-6 text-purple-600" />,
    content: `**Service Delivery:**
- **Platform Access:** Authenticate users and provide secure access to services
- **Consultation Matching:** Connect users with appropriate legal professionals
- **AI Services:** Provide personalized legal guidance and document analysis
- **Communication:** Facilitate secure communication between users and lawyers
- **Payment Processing:** Process payments and maintain transaction records

**Platform Improvement:**
- **Analytics:** Analyze usage patterns to improve user experience
- **Feature Development:** Develop new features based on user needs and feedback
- **Quality Assurance:** Monitor service quality and user satisfaction
- **Performance Optimization:** Optimize platform performance and reliability

**Legal and Compliance:**
- **Verification:** Verify lawyer credentials and user identities
- **Compliance Monitoring:** Ensure compliance with legal and regulatory requirements
- **Fraud Prevention:** Detect and prevent fraudulent activities
- **Legal Proceedings:** Respond to legal requests and court orders

**Marketing and Communications:**
- **Service Updates:** Notify users about platform updates and new features
- **Educational Content:** Share legal education and awareness materials
- **Promotional Communications:** Send relevant offers and promotions (with consent)
- **Newsletter:** Provide legal news and industry updates

**Research and Development:**
- **AI Training:** Improve AI models using anonymized data
- **Legal Research:** Conduct legal research and analysis for platform improvement
- **Market Research:** Understand user needs and market trends
- **Academic Research:** Support legal education and research initiatives

**Security and Safety:**
- **Account Security:** Protect user accounts from unauthorized access
- **Data Security:** Implement security measures to protect personal information
- **Platform Safety:** Maintain a safe environment for all users
- **Incident Response:** Respond to security incidents and data breaches

**Legal Basis for Processing:**
- **Contract:** Processing necessary for service delivery
- **Consent:** Explicit consent for marketing and optional features
- **Legal Obligation:** Compliance with applicable laws and regulations
- **Legitimate Interest:** Platform improvement and security measures`
  },
  {
    id: "information-sharing",
    title: "4. Information Sharing and Disclosure",
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    content: `**With Legal Professionals:**
- **Consultation Services:** Share necessary information with lawyers for consultation purposes
- **Case Management:** Provide case-related information to assigned legal professionals
- **Professional Verification:** Share credentials with verification partners
- **Quality Assurance:** Share feedback and ratings with legal professionals

**With Service Providers:**
- **Payment Processors:** Share payment information with secure payment gateways
- **Communication Services:** Use third-party services for video calls and messaging
- **Cloud Storage:** Store data with reputable cloud service providers
- **Analytics Providers:** Share anonymized usage data for platform analytics
- **Verification Services:** Share information with background check providers

**Legal Requirements:**
- **Court Orders:** Comply with valid court orders and legal processes
- **Regulatory Requests:** Respond to requests from regulatory authorities
- **Law Enforcement:** Cooperate with law enforcement investigations
- **Legal Proceedings:** Provide information in legal disputes involving LawEase

**Business Transfers:**
- **Mergers and Acquisitions:** Transfer data in case of business mergers or acquisitions
- **Asset Sales:** Include data in asset transfers with appropriate protections
- **Corporate Restructuring:** Transfer data during corporate restructuring

**With Your Consent:**
- **Third-Party Integrations:** Share data with third-party services you choose to connect
- **Research Participation:** Participate in research studies with your explicit consent
- **Marketing Partners:** Share information with marketing partners (with opt-in consent)

**Anonymized Data:**
- **Research Purposes:** Share anonymized data for legal research and studies
- **Industry Reports:** Contribute to industry reports and benchmarking
- **Platform Analytics:** Use aggregated data for platform improvement

**Emergency Situations:**
- **Life-Threatening Emergencies:** Share information to protect life and safety
- **Legal Emergencies:** Provide information to prevent serious legal harm
- **Platform Security:** Share information to protect platform security

**Data Minimization:**
We share only the minimum amount of information necessary for the specific purpose and ensure that recipients have appropriate data protection measures in place.`
  },
  {
    id: "data-security",
    title: "5. Data Security and Protection",
    icon: <Lock className="h-6 w-6 text-red-600" />,
    content: `**Technical Safeguards:**
- **Encryption:** All data transmitted and stored is encrypted using industry-standard protocols
- **Access Controls:** Multi-factor authentication and role-based access controls
- **Network Security:** Firewalls, intrusion detection, and secure network architecture
- **Regular Updates:** Regular security updates and patches for all systems
- **Secure Development:** Secure coding practices and regular security code reviews

**Physical Security:**
- **Data Centers:** Secure, certified data centers with 24/7 monitoring
- **Access Restrictions:** Limited physical access to servers and infrastructure
- **Environmental Controls:** Climate control and disaster protection measures
- **Backup Systems:** Secure, geographically distributed backup systems

**Organizational Measures:**
- **Security Training:** Regular security training for all employees
- **Background Checks:** Thorough background checks for employees with data access
- **Confidentiality Agreements:** Strict confidentiality agreements for all staff
- **Security Policies:** Comprehensive security policies and procedures
- **Incident Response:** Detailed incident response and breach notification procedures

**Data Classification:**
- **Public Data:** Non-sensitive information with standard protection
- **Internal Data:** Business information with enhanced protection
- **Confidential Data:** Sensitive personal data with strict access controls
- **Restricted Data:** Highly sensitive data with maximum security measures

**Attorney-Client Privilege Protection:**
- **Secure Communications:** End-to-end encrypted communication channels
- **Privilege Logs:** Detailed logs to maintain privilege protection
- **Access Restrictions:** Strict access controls for privileged communications
- **Legal Compliance:** Compliance with attorney-client privilege requirements

**Regular Security Assessments:**
- **Vulnerability Scanning:** Regular automated vulnerability assessments
- **Penetration Testing:** Annual third-party penetration testing
- **Security Audits:** Regular internal and external security audits
- **Compliance Reviews:** Regular compliance assessments and certifications

**Data Breach Response:**
- **Detection:** Real-time monitoring and breach detection systems
- **Response Team:** Dedicated incident response team available 24/7
- **Notification:** Prompt notification to affected users and authorities
- **Remediation:** Swift remediation measures to prevent further damage

**International Security Standards:**
- **ISO 27001:** Compliance with international security management standards
- **SOC 2:** Regular SOC 2 Type II audits for service organization controls
- **Industry Standards:** Adherence to legal industry security standards`
  },
  {
    id: "data-retention",
    title: "6. Data Retention and Deletion",
    icon: <Clock className="h-6 w-6 text-yellow-600" />,
    content: `**Retention Principles:**
- **Purpose Limitation:** Data retained only as long as necessary for stated purposes
- **Legal Requirements:** Compliance with legal retention requirements
- **Business Needs:** Retention based on legitimate business needs
- **User Preferences:** Respect for user deletion requests where legally permissible

**Retention Periods:**
- **Account Information:** Retained for the duration of account activity plus 7 years
- **Consultation Records:** Retained for 7 years after consultation completion
- **Financial Records:** Retained for 7 years as required by Indian tax laws
- **Legal Documents:** Retained as required by applicable legal retention periods
- **Communication Logs:** Retained for 3 years for quality and training purposes

**Active Account Data:**
- **Profile Information:** Maintained while account is active
- **Usage Data:** Aggregated data retained for analytics and improvement
- **Preference Settings:** Maintained to provide personalized services
- **Support History:** Retained to provide better customer support

**Inactive Account Data:**
- **Grace Period:** 2 years of inactivity before account deactivation
- **Data Archival:** Non-essential data archived after 1 year of inactivity
- **Account Deletion:** Automatic deletion after 3 years of inactivity
- **User Notification:** Advance notice before account deletion

**Legal Hold Requirements:**
- **Litigation Hold:** Data preserved when subject to legal proceedings
- **Regulatory Investigations:** Extended retention during investigations
- **Court Orders:** Compliance with specific court-ordered retention periods
- **Professional Obligations:** Lawyer work product retention requirements

**Secure Deletion:**
- **Data Wiping:** Secure deletion methods that prevent data recovery
- **Backup Deletion:** Removal from all backup systems and archives
- **Third-Party Deletion:** Ensuring deletion from third-party service providers
- **Verification:** Verification of complete data deletion

**User-Requested Deletion:**
- **Right to Deletion:** Users can request deletion of personal data
- **Verification Process:** Identity verification before processing deletion requests
- **Legal Limitations:** Explanation of legal limitations on data deletion
- **Deletion Timeline:** Processing deletion requests within 30 days

**Data Portability:**
- **Export Options:** Ability to export personal data in standard formats
- **Transfer Rights:** Assistance with data transfer to other service providers
- **Format Standards:** Data provided in commonly used, machine-readable formats

**Anonymization:**
- **Statistical Use:** Conversion of personal data to anonymous statistical data
- **Research Purposes:** Anonymized data for research and development
- **Irreversible Process:** Ensuring anonymization is irreversible`
  },
  {
    id: "user-rights",
    title: "7. Your Privacy Rights and Choices",
    icon: <UserCheck className="h-6 w-6 text-teal-600" />,
    content: `**Access Rights:**
- **Data Access:** Right to access personal data we hold about you
- **Information Request:** Detailed information about data processing activities
- **Copy Rights:** Right to receive copies of your personal data
- **Processing Details:** Information about how and why we process your data

**Correction and Update Rights:**
- **Data Correction:** Right to correct inaccurate or incomplete personal data
- **Profile Updates:** Ability to update profile information at any time
- **Professional Information:** Lawyers can update professional credentials and information
- **Contact Information:** Easy methods to update contact and communication preferences

**Deletion Rights:**
- **Account Deletion:** Right to request deletion of your account and associated data
- **Selective Deletion:** Ability to delete specific types of personal data
- **Legal Limitations:** Clear explanation of legal limitations on deletion rights
- **Verification Process:** Secure verification process for deletion requests

**Portability Rights:**
- **Data Export:** Right to export personal data in portable formats
- **Transfer Assistance:** Support for transferring data to other service providers
- **Standard Formats:** Data provided in JSON, CSV, or other standard formats
- **Secure Transfer:** Secure methods for data transfer

**Objection Rights:**
- **Processing Objection:** Right to object to certain types of data processing
- **Marketing Opt-out:** Easy opt-out from marketing communications
- **Profiling Objection:** Right to object to automated decision-making
- **Legitimate Interest:** Right to object to processing based on legitimate interests

**Consent Management:**
- **Consent Withdrawal:** Right to withdraw consent for data processing
- **Granular Controls:** Detailed controls over different types of data processing
- **Preference Center:** Centralized location to manage all privacy preferences
- **Real-time Updates:** Immediate effect of preference changes

**Communication Preferences:**
- **Email Preferences:** Control over different types of email communications
- **SMS Preferences:** Control over text message communications
- **Push Notifications:** Control over mobile app notifications
- **Marketing Communications:** Separate controls for promotional content

**Privacy Settings:**
- **Profile Visibility:** Control over profile visibility to other users
- **Search Visibility:** Control over appearance in lawyer search results
- **Data Sharing:** Control over data sharing with third parties
- **Analytics Participation:** Opt-out of analytics and research activities

**Exercising Your Rights:**
- **Contact Methods:** Multiple ways to contact us about privacy rights
- **Response Timeline:** We respond to requests within 30 days
- **Identity Verification:** Secure verification process for rights requests
- **Appeal Process:** Process for appealing decisions about rights requests

**Rights for Different User Types:**
- **General Users:** Standard privacy rights and controls
- **Law Students:** Additional rights related to educational data
- **Legal Professionals:** Professional-specific rights and obligations
- **Corporate Users:** Enterprise-level privacy controls and rights`
  },
  {
    id: "cookies-tracking",
    title: "8. Cookies and Tracking Technologies",
    icon: <Eye className="h-6 w-6 text-orange-600" />,
    content: `**Types of Cookies We Use:**
- **Essential Cookies:** Necessary for platform functionality and security
- **Performance Cookies:** Help us understand how users interact with our platform
- **Functional Cookies:** Remember user preferences and settings
- **Marketing Cookies:** Used to deliver relevant advertisements and content

**Essential Cookies:**
- **Authentication:** Maintain user login sessions securely
- **Security:** Protect against CSRF attacks and security threats
- **Load Balancing:** Distribute traffic across our servers
- **Error Tracking:** Identify and resolve technical issues

**Analytics and Performance:**
- **Google Analytics:** Understand user behavior and platform usage
- **Heatmaps:** Analyze user interaction patterns
- **Performance Monitoring:** Track page load times and platform performance
- **A/B Testing:** Test different features and improvements

**Functional Cookies:**
- **Language Preferences:** Remember selected language settings
- **UI Preferences:** Save customized interface settings
- **Location Data:** Remember location for relevant legal information
- **Accessibility Settings:** Maintain accessibility preferences

**Third-Party Cookies:**
- **Payment Processors:** Facilitate secure payment processing
- **Social Media:** Enable social media sharing and login features
- **Customer Support:** Power chat widgets and support tools
- **Video Services:** Enable video consultation features

**Cookie Management:**
- **Browser Controls:** Instructions for managing cookies in different browsers
- **Opt-out Options:** Methods to opt-out of non-essential cookies
- **Cookie Settings:** Platform-based cookie preference controls
- **Mobile App Settings:** App-specific tracking controls

**Local Storage and Other Technologies:**
- **Local Storage:** Store user preferences and application data
- **Session Storage:** Temporary storage for session-specific data
- **IndexedDB:** Store structured data for offline functionality
- **Web Beacons:** Track email opens and user engagement

**Mobile App Tracking:**
- **Device Identifiers:** Use advertising IDs for analytics and advertising
- **App Analytics:** Track app usage and performance metrics
- **Push Notifications:** Deliver relevant notifications and updates
- **Location Services:** Provide location-based legal information (with consent)

**Advertising and Marketing:**
- **Retargeting:** Show relevant ads to users who have visited our platform
- **Conversion Tracking:** Measure effectiveness of marketing campaigns
- **Audience Insights:** Understand user demographics and interests
- **Cross-Device Tracking:** Provide consistent experience across devices

**Your Choices:**
- **Cookie Preferences:** Granular controls over different cookie types
- **Browser Settings:** Instructions for blocking or deleting cookies
- **Do Not Track:** Respect for Do Not Track browser signals
- **Opt-out Links:** Direct links to opt-out of tracking services

**Updates to Cookie Policy:**
- **Policy Changes:** Notification of changes to cookie practices
- **New Technologies:** Information about new tracking technologies
- **Consent Updates:** Re-consent for material changes to cookie usage`
  },
  {
    id: "international-transfers",
    title: "9. International Data Transfers",
    icon: <Globe className="h-6 w-6 text-blue-500" />,
    content: `**Data Localization:**
- **Primary Storage:** Personal data of Indian users stored within India
- **Compliance:** Adherence to Indian data localization requirements
- **Backup Systems:** Secure backup systems within Indian jurisdiction
- **Processing Location:** Primary data processing conducted within India

**Cross-Border Transfers:**
- **Limited Transfers:** Minimal cross-border transfers only when necessary
- **Service Providers:** Some service providers may be located outside India
- **Adequate Protection:** Ensuring adequate protection for transferred data
- **User Consent:** Explicit consent for international transfers where required

**Safeguards for International Transfers:**
- **Adequacy Decisions:** Transfers to countries with adequate protection levels
- **Standard Contractual Clauses:** Use of approved contractual protections
- **Binding Corporate Rules:** Internal policies for multinational service providers
- **Certification Schemes:** Transfers under recognized certification programs

**Third-Party Service Providers:**
- **Cloud Services:** Some cloud infrastructure may be located internationally
- **Payment Processors:** International payment processing with adequate safeguards
- **Communication Tools:** Video conferencing and communication services
- **Analytics Providers:** International analytics services with privacy protections

**Legal Compliance:**
- **Indian Laws:** Primary compliance with Indian data protection laws
- **International Standards:** Adherence to international privacy standards
- **Regulatory Approvals:** Obtaining required approvals for data transfers
- **Ongoing Monitoring:** Regular review of international transfer arrangements

**User Rights for International Transfers:**
- **Transfer Notification:** Information about international data transfers
- **Objection Rights:** Right to object to international transfers
- **Alternative Services:** Provision of alternative services where possible
- **Data Subject Rights:** Ensuring rights remain enforceable across borders

**Security Measures:**
- **Encryption in Transit:** All international data transfers are encrypted
- **Secure Channels:** Use of secure communication channels for transfers
- **Access Controls:** Strict access controls for internationally transferred data
- **Audit Trails:** Detailed logs of all international data transfers

**Monitoring and Review:**
- **Regular Assessment:** Regular review of international transfer arrangements
- **Risk Assessment:** Ongoing assessment of risks to transferred data
- **Policy Updates:** Updates to transfer policies based on legal changes
- **Incident Response:** Procedures for handling international transfer incidents

**Specific Jurisdictions:**
- **United States:** Transfers under Privacy Shield or Standard Contractual Clauses
- **European Union:** Transfers under GDPR adequacy decisions or safeguards
- **Other Countries:** Case-by-case assessment of adequacy and safeguards`
  },
  {
    id: "childrens-privacy",
    title: "10. Children's Privacy Protection",
    icon: <Shield className="h-6 w-6 text-pink-600" />,
    content: `**Age Restrictions:**
- **Minimum Age:** Platform services are intended for users 18 years and older
- **Legal Capacity:** Users must have legal capacity to enter into contracts
- **Parental Consent:** Parental consent required for users under 18
- **Educational Exceptions:** Special provisions for educational institutions

**Parental Consent Process:**
- **Verification:** Robust verification of parental identity and consent
- **Consent Documentation:** Detailed documentation of parental consent
- **Ongoing Consent:** Periodic reconfirmation of parental consent
- **Withdrawal Rights:** Easy process for parents to withdraw consent

**Limited Data Collection:**
- **Minimal Data:** Collection of only essential data for minors
- **No Marketing:** No marketing communications to users under 18
- **Enhanced Protection:** Additional security measures for minor accounts
- **Regular Review:** Regular review of minor account activities

**Educational Context:**
- **School Programs:** Special provisions for educational institution partnerships
- **Teacher Supervision:** Requirements for teacher or supervisor involvement
- **Educational Purpose:** Data use limited to educational purposes only
- **COPPA Compliance:** Compliance with applicable children's privacy laws

**Parental Rights:**
- **Access Rights:** Parents can access their child's account information
- **Correction Rights:** Parents can correct their child's personal information
- **Deletion Rights:** Parents can request deletion of their child's data
- **Objection Rights:** Parents can object to certain data processing activities

**Safety Measures:**
- **Content Filtering:** Age-appropriate content filtering and moderation
- **Interaction Limits:** Restrictions on interactions with adult users
- **Monitoring Tools:** Enhanced monitoring for safety and security
- **Reporting Mechanisms:** Easy reporting of inappropriate content or behavior

**Data Sharing Restrictions:**
- **No Third-Party Sharing:** Strict limitations on sharing minor's data with third parties
- **Educational Partners:** Limited sharing with educational institution partners only
- **Legal Requirements:** Sharing only when required by law or court order
- **Parental Notification:** Notification to parents of any data sharing

**Account Management:**
- **Parental Controls:** Comprehensive parental control features
- **Activity Monitoring:** Parents can monitor their child's platform activity
- **Time Restrictions:** Parents can set time limits and usage restrictions
- **Content Controls:** Parents can control access to different types of content

**Transition to Adult Accounts:**
- **Age Verification:** Process for verifying when users reach majority
- **Account Migration:** Smooth transition from minor to adult account status
- **Consent Transfer:** Transfer of consent from parent to user
- **Privacy Settings:** Review and update of privacy settings upon transition`
  },
  {
    id: "contact-dpo",
    title: "11. Contact Information and Data Protection Officer",
    icon: <Mail className="h-6 w-6 text-gray-600" />,
    content: `**Data Protection Officer:**
- **Name:** Adv. Rajesh Kumar Sharma
- **Email:** dpo@lawease.in
- **Phone:** +91 11 4567 8901 (Ext: 101)
- **Address:** LawEase India Pvt. Ltd., 123 Connaught Place, New Delhi - 110001

**Privacy Inquiries:**
- **General Privacy:** privacy@lawease.in
- **Data Requests:** datarequests@lawease.in
- **Security Issues:** security@lawease.in
- **Compliance:** compliance@lawease.in

**Response Times:**
- **Acknowledgment:** Within 48 hours of receiving your inquiry
- **Full Response:** Within 30 days for most privacy requests
- **Complex Requests:** Up to 90 days with regular status updates
- **Urgent Matters:** Immediate response for security and safety issues

**How to Contact Us:**
- **Online Form:** Use our privacy contact form on the website
- **Email:** Send detailed inquiries to our privacy team
- **Phone:** Call during business hours for urgent privacy matters
- **Mail:** Send written requests to our registered office address

**Information to Include:**
- **Identity Verification:** Proof of identity for data requests
- **Specific Request:** Clear description of your privacy request
- **Account Information:** Account details to help us locate your data
- **Preferred Response:** How you would like us to respond to your request

**Business Hours:**
- **Phone Support:** Monday to Friday, 9:00 AM to 6:00 PM IST
- **Email Response:** 24/7 monitoring with response within 48 hours
- **Emergency Contact:** 24/7 availability for security incidents
- **Holiday Schedule:** Limited availability on national holidays

**Escalation Process:**
- **First Level:** Privacy team handles initial inquiries
- **Second Level:** Data Protection Officer for complex matters
- **Third Level:** Legal team for disputes and legal matters
- **External:** Regulatory authorities for unresolved complaints

**Regulatory Authorities:**
- **Primary Authority:** Ministry of Electronics and Information Technology (MeitY)
- **Sectoral Regulator:** Bar Council of India for legal profession matters
- **Cyber Crime:** National Cyber Crime Reporting Portal
- **Consumer Protection:** National Consumer Helpline

**International Users:**
- **EU Residents:** Contact our EU representative at eu-privacy@lawease.in
- **Other Countries:** Use general privacy contact for international inquiries
- **Language Support:** Available in English and major Indian languages
- **Time Zone Considerations:** Response times adjusted for different time zones

**Documentation Requirements:**
- **Identity Proof:** Government-issued ID for data requests
- **Authorization:** Power of attorney for third-party requests
- **Specific Details:** Clear description of the information or action requested
- **Preferred Format:** Specify format for data export requests`
  }
]

const privacyHighlights = [
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Strong Security",
    description: "Enterprise-grade security measures protect your personal information"
  },
  {
    icon: <UserCheck className="h-8 w-8 text-green-600" />,
    title: "User Control",
    description: "Comprehensive controls over your data and privacy preferences"
  },
  {
    icon: <Lock className="h-8 w-8 text-purple-600" />,
    title: "Data Encryption",
    description: "All data encrypted in transit and at rest using industry standards"
  },
  {
    icon: <Globe className="h-8 w-8 text-indigo-600" />,
    title: "Legal Compliance",
    description: "Full compliance with Indian privacy laws and international standards"
  }
]

const quickActions = [
  { title: "Download Your Data", icon: <Download className="h-4 w-4" />, href: "/profile/data-export" },
  { title: "Privacy Settings", icon: <Settings className="h-4 w-4" />, href: "/profile/privacy" },
  { title: "Delete Account", icon: <Trash2 className="h-4 w-4" />, href: "/profile/delete-account" },
  { title: "Contact DPO", icon: <Mail className="h-4 w-4" />, href: "mailto:dpo@lawease.in" }
]

export default function PrivacyPage() {
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
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4">
                  <Shield className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight"
              >
                Privacy Policy
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-4xl mx-auto"
              >
                Your privacy is our priority. Learn how we collect, use, and protect your personal information 
                while providing world-class legal services.
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4"
            >
              <Badge variant="outline" className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                Last Updated: January 15, 2024
              </Badge>
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                IT Act 2000 Compliant
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Highlights */}
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
              Privacy at a Glance
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key highlights of how we protect your privacy and give you control over your personal information.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {privacyHighlights.map((highlight, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {highlight.icon}
                    </div>
                    <CardTitle className="text-xl">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Privacy Actions</h2>
            <p className="text-muted-foreground">Manage your privacy settings and data preferences</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {quickActions.map((action, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={action.href}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2">
                        {action.icon}
                      </div>
                      <p className="text-sm font-medium">{action.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {privacySections.map((section, index) => (
              <motion.div key={section.id} variants={fadeInUp} id={section.id}>
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full p-3">
                        {section.icon}
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-foreground">{section.title}</CardTitle>
                        <CardDescription>
                          Section {index + 1} of our Privacy Policy
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {section.content.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return (
                            <h4 key={idx} className="text-lg font-semibold text-foreground mt-6 mb-3">
                              {paragraph.slice(2, -2)}
                            </h4>
                          )
                        } else if (paragraph.includes('**')) {
                          const parts = paragraph.split('**')
                          return (
                            <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                              {parts.map((part, partIdx) => 
                                partIdx % 2 === 0 ? part : <strong key={partIdx} className="text-foreground">{part}</strong>
                              )}
                            </p>
                          )
                        } else if (paragraph.trim().startsWith('-')) {
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
                        } else {
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

      {/* Contact DPO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <UserCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl">Need Help with Privacy?</CardTitle>
                <CardDescription>
                  Our Data Protection Officer is here to assist you with any privacy-related questions or requests.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Data Protection Officer
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1">Adv. Rajesh Kumar Sharma</p>
                    <p className="text-sm text-muted-foreground mb-1">Email: dpo@lawease.in</p>
                    <p className="text-sm text-muted-foreground">Phone: +91 11 4567 8901 (Ext: 101)</p>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Response Times
                    </h4>
                    <p className="text-sm text-muted-foreground mb-1">Acknowledgment: Within 48 hours</p>
                    <p className="text-sm text-muted-foreground mb-1">Full Response: Within 30 days</p>
                    <p className="text-sm text-muted-foreground">Urgent Matters: Immediate</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Available 24/7 for security incidents and urgent privacy matters.</strong>
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
