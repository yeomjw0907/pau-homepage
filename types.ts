
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
  type: 'info' | 'warning' | 'emergency';
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
  category: 'Academic' | 'Event' | 'General' | 'Career' | 'Newsletter';
  images?: string[]; 
  isPinned?: boolean;
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
  name: string;
  credential?: string;
  title: string;
  education: string[];
  bio: string;
  expertise: string[];
  phone?: string;
  email?: string;
  photoUrl?: string;
  category?: 'Faculty' | 'Staff';
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
  };
  labels: {
    interestedInClinic: string;
    clinicPositions: string;
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
    about: "About",
    admissions: "Admissions",
    academics: "Academics",
    tuition: "Tuition",
    myPausl: "My PAUSL",
    contact: "Contact",
    language: "Language",
    historyMission: "History & Mission",
    barReg: "Bar Registration",
    disclosure: "Disclosure",
    presidentWelcome: "President's Welcome",
    deanMessage: "Dean's Message",
    adminStaffs: "Admin & Staff",
    faculty: "Faculty",
    catalog: "Catalog",
    schoolForm: "School Form",
    faqs: "FAQs",
    academicCalendar: "Academic Calendar",
    barInfo: "Bar Info",
    curriculum: "Curriculum",
    courseDesc: "Course Descriptions",
    counseling: "Counseling",
    gradReqs: "Graduation Requirements",
    applyNow: "Apply Now",
    appSteps: "Application Steps",
    admissionReqs: "Admission Requirements",
    transferInt: "Transfer & International",
    techReqs: "Tech Requirements",
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
  },
};

// Default Home Content
export const MOCK_HOME_CONTENT: HomeContent = {
  heroTitle: "Empowering Advocates.\nTransforming Lives.",
  heroSubtitle: "Experience world-class legal education from the heart of Silicon Valley to wherever you are.",
  visionStatement: "Our vision is to provide an accessible gateway to the legal profession for students of all backgrounds.",
  missionTitle: "The PAU Mission",
  missionDescription: "We bridge the gap between academic theory and real-world legal practice through technology-driven pedagogy.",
  missionPoints: [
    { title: "Innovation", description: "Utilizing modern tools for legal research and education.", icon: 'innovation' },
    { title: "Access", description: "Providing opportunities for remote and non-traditional students.", icon: 'access' },
    { title: "Global Impact", description: "Preparing lawyers for an interconnected legal landscape.", icon: 'globe' },
  ],
  introTitle: "A New Paradigm in Law",
  introText: "Pacific American University School of Law offers a rigorous Juris Doctor program tailored for the modern era.",
  features: [
    { title: "Flexible Learning", description: "Study on your schedule with our robust online platform.", icon: 'clock' },
    { title: "Expert Faculty", description: "Learn from practicing attorneys and distinguished scholars.", icon: 'academic' },
    { title: "Affordable Education", description: "High-value JD program with competitive tuition rates.", icon: 'currency' },
  ],
  successTitle: "Proven Excellence",
  successText: "Our graduates are practicing in prestigious firms and public service across California.",
  stats: [
    { label: "Bar Pass Rate", value: "85%" },
    { label: "Employment", value: "92%" },
    { label: "Faculty", value: "45+" },
    { label: "Alumni", value: "2k+" },
  ],
  globalFutureTitle: "Your Global Future",
  globalFutureIntro: "Our JD program prepares you for diverse career paths in the legal sector.",
  globalFutureList: [
    { 
      title: "Technology Law", 
      description: "Specialize in IP, AI ethics, and Silicon Valley's unique legal needs.",
      detailTitle: "Innovation & Law",
      detailBody: "Lead the conversation in tech regulations.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      stats: [{ label: "Growth", value: "+20%" }],
      relatedPathways: [{ label: "IP Clinic", targetPage: "academics", description: "Hands-on tech law" }]
    },
  ],
  globalFutureClosing: "Join the next generation of legal leaders.",
  clinicsTitle: "Clinical Opportunities",
  clinicsIntro: "Gain hands-on experience through our specialized legal clinics.",
  clinics: [],
  newsTitle: "Latest News",
  latestNews: [],
};
