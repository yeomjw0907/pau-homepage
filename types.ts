
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
  | 'admissions' 
  | 'academics' 
  | 'centers'
  | 'clinic-detail'
  | 'faculty' 
  | 'news'
  | 'notices' 
  | 'news-detail'
  | 'library'
  | 'careers'
  | 'calendar'
  | 'consumer-info'
  | 'admin';

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
  body: string; // Now stores HTML from rich text editor
  category: 'Academic' | 'Event' | 'General' | 'Career';
  images?: string[]; // Array of base64 or URL strings for multiple images
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
  title: string;
  education: string;
  bio: string;
  expertise: string[];
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
    content?: string;
    tableData?: { label: string; value: string }[];
  }[];
}

export enum ImageSize {
  Size_1K = '1K',
  Size_2K = '2K',
  Size_4K = '4K'
}

export interface SharedContent {
  nav: {
    home: string;
    admissions: string;
    academics: string;
    degreePrograms: string;
    centersClinics: string;
    faculty: string;
    newsUpdates: string;
    latestNews: string;
    noticeBoard: string;
    language: string;
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
