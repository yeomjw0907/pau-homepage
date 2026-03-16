
export type SupportedLanguage =
  | 'English'
  | 'Spanish'
  | 'Chinese (Simplified)'
  | 'Korean'
  | 'Vietnamese'
  | 'Japanese'
  | 'French'
  | 'Tagalog';

export type Page =
  | 'home'
  | 'about' | 'history-mission' | 'bar-reg' | 'disclosure' | 'president-welcome' | 'dean-message' | 'admin-staffs' | 'catalog' | 'school-form' | 'faqs'
  | 'academics' | 'academic-calendar' | 'bar-info' | 'curriculum-schedule' | 'course-desc' | 'counseling' | 'grad-reqs'
  | 'admissions' | 'apply-now' | 'app-steps' | 'admission-reqs' | 'transfer-int' | 'tech-reqs'
  | 'tuition' | 'tuition-fees' | 'payment-plan' | 'refund-policy'
  | 'my-pausl' | 'weekly-dicta'
  | 'contact' | 'office-hours' | 'contact-info' | 'request-info'
  | 'centers' | 'student-resources' | 'clinic-detail' | 'faculty' | 'news' | 'notices' | 'news-detail' | 'library' | 'careers' | 'consumer-info' | 'admin';

export interface GlobalAlert {
  active: boolean;
  message: string;
  type: 'info' | 'warning' | 'emergency' | 'error';
}

export interface Statistic {
  label: string;
  value: string;
}

export interface Clinic {
  id: string;
  title: string;
  description: string;
  body: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  body: string;
  category: 'Academic' | 'Event' | 'General' | 'Career' | 'Newsletter' | 'Notice';
  images?: string[];
  isPinned?: boolean;
  /** Multilingual translations stored by admin save. Key = SupportedLanguage */
  translations?: Record<string, { title?: string; summary?: string; body?: string }>;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: 'clock' | 'academic' | 'currency';
}

export interface MissionItem {
  title: string;
  description: string;
  icon: 'globe' | 'innovation' | 'access';
}

export interface PathwayLink {
  label: string;
  targetPage: Page;
  description: string;
}

export interface CareerStat {
  label: string;
  value: string;
}

export interface GlobalFutureItem {
  title: string;
  description: string;
  detailTitle: string;
  detailBody: string;
  image: string;
  stats: CareerStat[];
  relatedPathways: PathwayLink[];
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageDesktop?: string;
  heroImageMobile?: string;
  visionStatement: string;
  visionAuthor?: string;
  missionTitle: string;
  missionDescription: string;
  missionPoints: MissionItem[];
  introTitle: string;
  introText: string;
  features: FeatureItem[];
  successTitle: string;
  successText: string;
  stats: Statistic[];
  globalFutureTitle: string;
  globalFutureIntro: string;
  globalFutureList: GlobalFutureItem[];
  globalFutureClosing: string;
  clinicsTitle: string;
  clinicsIntro: string;
  clinics: Clinic[];
  newsTitle: string;
  latestNews: NewsItem[];
}

export interface CentersContent {
  title: string;
  intro: string;
  clinics: Clinic[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AdmissionsContent {
  title: string;
  intro: string;
  deadlinesTitle: string;
  deadlines: { term: string; date: string; type: string }[];
  requirementsTitle: string;
  requirements: string[];
  tuitionTitle: string;
  tuitionInfo: string;
  tuitionCost: string;
  faqTitle: string;
  faqs: FAQItem[];
}

export interface AcademicsContent {
  title: string;
  intro: string;
  programsTitle: string;
  programs: { name: string; description: string }[];
  concentrationsTitle: string;
  concentrations: string[];
}

export interface FacultyMember {
  id?: string;
  name: string;
  credential?: string;
  title: string;
  additionalInfo?: string;
  education: string[];
  bio: string; // Brief bio
  background?: string; // HTML full background
  expertise: string[];
  phone?: string;
  email?: string;
  photoUrl?: string; // photo_url in DB
  category?: 'Faculty' | 'Staff' | 'Admin';
  isActive?: boolean; // is_active in DB
  sortOrder?: number; // sort_order in DB
}

export interface FacultyContent {
  title: string;
  intro: string;
  facultyList: FacultyMember[];
}

export interface NoticesContent {
  title: string;
  intro: string;
  notices: NewsItem[];
}

export interface NewsPageContent {
  title: string;
  intro: string;
  newsItems: NewsItem[];
}

export interface LibraryContent {
  title: string;
  intro: string;
  sections: { title: string; content: string }[];
}

export interface CareersContent {
  title: string;
  intro: string;
  stats: Statistic[];
  services: { title: string; description: string }[];
}

export interface CalendarContent {
  title: string;
  intro: string;
  events: { date: string; event: string; type: string }[];
}

export interface ConsumerInfoContent {
  title: string;
  intro: string;
  sections: {
    id: string;
    title: string;
    subtitle?: string;
    content?: string;
    tableData?: { label: string; value: string }[];
    hasDownloadButton?: boolean;
  }[];
}

export interface WeeklyDictaItem {
  id: string;
  title: string;
  publishDate: string; // map to publish_date
  intro: string;
  body?: string; // HTML content for the newsletter
  notices: NewsItem[];
  isPublished: boolean; // map to is_published
}

export interface RequestInfoItem {
  id: string;
  fullName: string; // full_name
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'contacted';
  adminNotes?: string; // admin_notes
  submittedAt: string; // submitted_at
  reviewedAt?: string; // reviewed_at
}

export interface SharedContent {
  nav: {
    home: string;
    about: string;
    admissions: string;
    academics: string;
    tuition: string;
    myPausl: string;
    contact: string;
    language: string;
    historyMission: string;
    barReg: string;
    disclosure: string;
    presidentWelcome: string;
    deanMessage: string;
    adminStaffs: string;
    faculty: string;
    catalog: string;
    schoolForm: string;
    faqs: string;
    academicCalendar: string;
    barInfo: string;
    curriculum: string;
    courseDesc: string;
    counseling: string;
    gradReqs: string;
    applyNow: string;
    appSteps: string;
    admissionReqs: string;
    transferInt: string;
    techReqs: string;
    tuitionFees: string;
    paymentPlan: string;
    refundPolicy: string;
    officeHours: string;
    contactInfo: string;
    requestInfo: string;
    weeklyDicta: string;
    library: string;
    centers: string;
    careers: string;
    consumerInfo: string;
  };
  footer: {
    schoolDesc: string;
    contact: string;
    quickLinks: string;
    applyNow: string;
    academicCalendar: string;
    lawLibrary: string;
    careerServices: string;
    rightsReserved: string;
    accreditation: string;
    disclosure: string;
    year: number; // Added dynamic year support
  };
  buttons: {
    applyNow: string;
    requestInfo: string;
    learnMore: string;
    readMore: string;
    readFullNotice: string;
    backToList: string;
    backToCenters: string;
    exploreCenter: string;
    contactDirector: string;
    viewPublications: string;
    submitInquiry: string;
    cancel: string;
    chatLibrarian: string;
    reserveRoom: string;
    downloadCalendar: string;
    applyLsac: string;
    viewAllAnnouncements: string;
  };
  homeCards?: {
    rollingAdmissions?: { title: string; date: string; summary: string };
    academicCalendar?: { title: string; date: string; summary: string };
    fylsx?: { title: string; date: string; summary: string };
    weeklyDicta?: { title: string; date: string; summary: string };
  };
  labels: {
    interestedInClinic: string;
    clinicPositions: string;
    universityUpdates: string;
    clinicInquiryForm: string;
    sendMessageTo: string;
    fullName: string;
    pauEmail: string;
    studentId: string;
    academicYear: string;
    prerequisitesMet: string;
    prereqDetail: string;
    statementInterest: string;
    aboutPauNews: string;
    aboutPauNewsDetail: string;
    // Faculty / common UI labels
    education?: string;
    background?: string;
    emailLabel?: string;
    pinned?: string;
    // Hero labels
    theFutureLegalEd?: string;
    scroll?: string;
  };
}

// Added ImageSize enum for architectural visualization
export enum ImageSize {
  Size_1K = '1K',
  Size_2K = '2K',
  Size_4K = '4K'
}

// Default Shared Content
export const DEFAULT_SHARED_CONTENT: SharedContent = {
  nav: {
    home: "Home",
    about: "About PAUSL",
    admissions: "Admissions",
    academics: "Academics",
    tuition: "Tuition",
    myPausl: "My PAUSL",
    contact: "Contact",
    language: "Language",
    historyMission: "History & Mission",
    barReg: "California State Bar Registration",
    disclosure: "Disclosure Statement",
    presidentWelcome: "President's Welcome",
    deanMessage: "Message from the Dean",
    adminStaffs: "Administrative Staff",
    faculty: "Faculty",
    catalog: "Catalog",
    schoolForm: "School Form",
    faqs: "FAQs",
    academicCalendar: "Academic Calendar",
    barInfo: "The California State Bar",
    curriculum: "Curriculum and Schedule",
    courseDesc: "Course Descriptions",
    counseling: "Academic Counseling and Academic Support",
    gradReqs: "Graduation Requirements",
    applyNow: "Apply Now",
    appSteps: "Application Steps",
    admissionReqs: "Admission Requirements",
    transferInt: "Transfer and International Students",
    techReqs: "Technical Requirements",
    tuitionFees: "Tuition & Fees",
    paymentPlan: "Payment Plan",
    refundPolicy: "Refund Policy",
    officeHours: "Office Hours",
    contactInfo: "Contact Info",
    requestInfo: "Request Info",
    weeklyDicta: "Weekly Dicta",
    library: "Law Library",
    centers: "Student Success & Resources",
    careers: "Career Services",
    consumerInfo: "Consumer Information",
  },
  footer: {
    schoolDesc: "Pacific American University School of Law is dedicated to providing high-quality, accessible legal education through innovative distance learning methods.",
    contact: "Contact Us",
    quickLinks: "Quick Links",
    applyNow: "Apply Now",
    academicCalendar: "Calendar",
    lawLibrary: "Library",
    careerServices: "Careers",
    rightsReserved: "Pacific American University. All Rights Reserved.",
    accreditation: "Accreditation",
    disclosure: "Pacific American University is a private institution. The JD program is registered with the State Bar of California.",
    year: new Date().getFullYear(),
  },
  buttons: {
    applyNow: "Apply Now",
    requestInfo: "Request Info",
    learnMore: "Learn More",
    readMore: "Read More",
    readFullNotice: "Read Full Notice",
    backToList: "Back to List",
    backToCenters: "Back to Centers",
    exploreCenter: "Explore Center",
    contactDirector: "Contact Director",
    viewPublications: "View Publications",
    submitInquiry: "Submit Inquiry",
    cancel: "Cancel",
    chatLibrarian: "Chat with Librarian",
    reserveRoom: "Reserve Room",
    downloadCalendar: "Download Calendar",
    applyLsac: "Apply Online",
    viewAllAnnouncements: "View All Announcements",
  },
  labels: {
    interestedInClinic: "Interested in this Clinic?",
    clinicPositions: "We accept applications for clinical positions year-round.",
    clinicInquiryForm: "Clinic Inquiry",
    sendMessageTo: "Send a message to",
    fullName: "Full Name",
    pauEmail: "PAU Email",
    studentId: "Student ID",
    academicYear: "Academic Year",
    prerequisitesMet: "Prerequisites Met",
    prereqDetail: "I have completed the required foundational courses.",
    statementInterest: "Statement of Interest",
    aboutPauNews: "About PAU News",
    aboutPauNewsDetail: "Official announcements and updates from the Pacific American University administration.",
    universityUpdates: "University Updates",
    education: "Education",
    background: "Background",
    emailLabel: "Email:",
    pinned: "Pinned",
    theFutureLegalEd: "The Future of Legal Education",
    scroll: "Scroll",
  },
  homeCards: {
    rollingAdmissions: { title: "Rolling Admissions", date: "Open Year-Round", summary: "Accepting applications year-round for Winter, Spring, and Fall terms." },
    academicCalendar: { title: "Academic Calendar & Start Dates", date: "2026-2027", summary: "All cohorts start in January, May, or September" },
    fylsx: { title: "FYLSX Requirement", date: "Important Notice", summary: "Students must pass the 'Baby Bar' (FYLSX) after the first year." },
    weeklyDicta: { title: "Weekly Dicta", date: "February 3, 2025", summary: "Learning, Serving, and Leading Together. Official announcements and updates for the PAU School of Law community." },
  },
};

// Default Home Content
export const MOCK_HOME_CONTENT: HomeContent = {
  heroTitle: "Legal Education\nWithout Borders",
  heroSubtitle: "The mission of Pacific American University (\"PAU\") is to nurture impactful, balanced-minded leaders, who are equipped to resolve complex global issues, making a positive impact on the growth of a healthy and inclusive society through a student-centered academic community and programs.",
  heroImageDesktop: "/images/hero-desktop.jpg",
  heroImageMobile: "/images/hero-mobile.jpg",
  visionStatement: "\u201cAs educational borders dissolve, we nurture global leaders with balanced, critical perspectives. We are a platform for shaping thoughtful, solution-oriented professionals prepared to engage with the world\u2019s most pressing challenges.\u201d",
  missionTitle: "Our Mission",
  missionDescription: "To redefine legal education by breaking down geographic barriers and empowering talented students worldwide.",
  missionPoints: [
    { title: "Innovation Without Boundaries", description: "Merging rigorous American legal instruction with flexible, technology-driven delivery systems.", icon: 'innovation' },
    { title: "Global Accessibility", description: "Lowering barriers to entry and respecting global time zones to cultivate globally active professionals.", icon: 'globe' },
    { title: "Real-World Mastery", description: "Combining dynamic video lectures with real-time sessions to ensure deep mastery of U.S. law.", icon: 'access' },
  ],
  introTitle: "Study American Law From\nAnywhere",
  introText: "A fully online J.D. program designed for motivated students seeking flexibility, world-class instruction, and a clear path to a California law license.",
  features: [
    { title: "Flexible Learning", description: "Complete two-thirds of your coursework asynchronously on your schedule\u2014anytime, anywhere, without sacrificing academic rigor.", icon: 'clock' },
    { title: "World-Class Mentorship", description: "Learn from experienced legal professionals who provide personalized feedback and guidance to help you succeed academically.", icon: 'academic' },
    { title: "Accessible Tuition", description: "We offer a high-quality legal education at a significantly lower cost than traditional U.S. law schools, making the J.D. dream accessible.", icon: 'currency' },
  ],
  successTitle: "A Student-Centered\nLaw School",
  successText: "From academic support to bar examination preparation, every part of the PAU Law program is designed to help you thrive. You\u2019ll receive structured guidance from your first course through your preparation for the California Bar.",
  stats: [
    { value: "100%", label: "Online Coursework" },
    { value: "66%", label: "Asynchronous" },
    { value: "15:1", label: "Student-Faculty Ratio" },
    { value: "Included", label: "Bar Prep Support" },
  ],
  globalFutureTitle: "Your Path to a Global Career",
  globalFutureIntro: "Our rigorous curriculum opens doors to diverse international fields, equipping you with the credentials needed for today\u2019s interconnected legal environment.",
  globalFutureList: [
    { title: "International Business", description: "Navigate the complex landscape of global commerce and trade.", detailTitle: "International Business", detailBody: "Prepare for a career facilitating transactions between entities in different countries.", image: "/images/info-international-business.jpg", stats: [], relatedPathways: [] },
    { title: "Corporate Governance", description: "Advise boards and executives on fiduciary duties and ethical compliance.", detailTitle: "Corporate Governance", detailBody: "Ensure companies operate within the law and adhere to ethical standards.", image: "/images/info-corporate-governance.jpg", stats: [], relatedPathways: [] },
    { title: "Legal Consulting", description: "Provide strategic legal insight to non-legal entities and organizations.", detailTitle: "Legal Consulting", detailBody: "Leverage your J.D. to provide specialized advice to consulting firms, NGOs, and corporations.", image: "/images/info-legal-consulting.jpg", stats: [], relatedPathways: [] },
    { title: "Cross-border Trade", description: "Master the regulations governing imports, exports, and tariffs.", detailTitle: "Cross-border Trade", detailBody: "Become an expert in the movement of goods, services, and capital across borders.", image: "/images/info-cross-border-trade.jpg", stats: [], relatedPathways: [] },
    { title: "Regulatory Affairs", description: "Ensure compliance with government agencies like the FDA, SEC, and EPA.", detailTitle: "Regulatory Affairs", detailBody: "Act as the liaison between private industry and government regulatory agencies.", image: "/images/info-regulatory-affairs.jpg", stats: [], relatedPathways: [] },
    { title: "Graduate Study", description: "Pursue advanced degrees at prestigious universities in US, Canada or London.", detailTitle: "Graduate Study", detailBody: "The PAU J.D. serves as a foundation for admission into specialized LL.M. programs.", image: "/images/info-graduate-study.jpg", stats: [], relatedPathways: [] },
  ],
  globalFutureClosing: "Join the next generation of legal leaders.",
  clinicsTitle: "Clinical Opportunities",
  clinicsIntro: "Gain hands-on experience through our specialized legal clinics.",
  clinics: [],
  newsTitle: "Latest News",
  latestNews: [],
};
