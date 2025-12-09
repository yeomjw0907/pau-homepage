
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { HomeNews } from './components/HomeNews';
import { Footer } from './components/Footer';
import { Admissions } from './components/Admissions';
import { Academics } from './components/Academics';
import { Faculty } from './components/Faculty';
import { NoticeBoard } from './components/NoticeBoard';
import { NewsDetail } from './components/NewsDetail';
import { Centers } from './components/Centers';
import { ClinicDetail } from './components/ClinicDetail';
import { Library } from './components/Library';
import { Careers } from './components/Careers';
import { Calendar } from './components/Calendar';
import { 
  SupportedLanguage, 
  HomeContent, 
  Page, 
  AdmissionsContent, 
  AcademicsContent, 
  FacultyContent,
  NoticesContent,
  NewsPageContent,
  NewsItem,
  CentersContent,
  Clinic,
  LibraryContent,
  CareersContent,
  CalendarContent,
  SharedContent
} from './types';
import { translateContent } from './services/geminiService';

// --- DATA DEFINITIONS ---

const CLINIC_DATA: Clinic[] = [
  {
    id: "clinic-tech",
    title: "High Tech Law Institute",
    description: "Partnering with Silicon Valley giants to address legal challenges in AI, patent law, and data privacy.",
    body: "The High Tech Law Institute at PAU Law is a world-renowned hub for the study of intellectual property and technology law. Located in the heart of Silicon Valley, the Institute leverages its proximity to tech giants like Google, Apple, and Meta to provide students with unparalleled networking and experiential learning opportunities.\n\nKey Programs:\n- **Patent Law Clinic**: Students work under the supervision of registered patent attorneys to draft claims for under-resourced inventors.\n- **Privacy & Data Security**: A seminar series featuring Chief Privacy Officers from Fortune 500 companies.\n- **AI Governance Lab**: A research initiative exploring the legal implications of Generative AI, algorithmic bias, and automated decision-making.\n\nThe Institute also hosts the annual 'Tech Law Summit', which attracts scholars and practitioners from around the globe to discuss the future of digital regulation."
  },
  {
    id: "clinic-immigration",
    title: "Immigration & Human Rights Clinic",
    description: "Providing pro bono legal representation to asylum seekers and immigrant families in the Bay Area.",
    body: "The Immigration & Human Rights Clinic provides vital legal services to the Bay Area's diverse immigrant communities. Under the guidance of experienced clinical professors, students take primary responsibility for cases involving asylum, U-visas, and deportation defense.\n\nStudents learn to:\n- Interview clients using trauma-informed techniques.\n- Draft affidavits and legal briefs for immigration court.\n- Represent clients in hearings before federal immigration judges.\n\nSince its founding, the clinic has secured asylum for over 200 individuals fleeing persecution. The clinic also engages in policy advocacy, working with local non-profits to improve conditions in detention centers."
  },
  {
    id: "clinic-startup",
    title: "Start-up Legal Garage",
    description: "Hands-on experience assisting early-stage startups with incorporation, IP strategy, and compliance.",
    body: "The Start-up Legal Garage offers students the unique opportunity to act as corporate counsel for early-stage companies. Students are paired with practicing attorneys from top law firms to assist startups with their foundational legal needs.\n\nScope of Work:\n- Entity Formation (LLC/C-Corp)\n- Intellectual Property Assignment & Protection\n- Employment Agreements & Equity Compensation\n- Terms of Service & Privacy Policies\n\nThis clinic is highly competitive and recommended for students interested in corporate transactional law. It provides a realistic simulation of life as a junior associate in a corporate practice group."
  }
];

const NEWS_DATA: NewsItem[] = [
  {
    id: "news-001",
    title: "PAU Law Team Wins National Moot Court Competition",
    date: "October 15, 2023",
    summary: "Our advanced advocacy team took home the top prize at the National Constitutional Law competition in Washington D.C.",
    body: "Pacific American University School of Law is proud to announce that our Moot Court Honor Board team has won first place at the 35th Annual National Constitutional Law Competition held in Washington D.C.\n\nThe team, comprised of 3L students Sarah Jenkins and Michael Chen, argued a complex case involving First Amendment rights in the digital age. They prevailed over teams from 40 other law schools across the country. In addition to the team championship, Sarah Jenkins was awarded 'Best Oralist' for the final round.\n\n'This victory is a testament to the hard work of our students and the dedication of our faculty coaches,' said Dean Elena Rodriguez. 'Our advocacy program continues to be one of the finest in the nation, preparing students for the rigors of appellate litigation.'",
    category: "Academic"
  },
  {
    id: "news-002",
    title: "New Partnership with Silicon Valley Tech Council",
    date: "October 02, 2023",
    summary: "A groundbreaking initiative to provide legal internships for students specializing in AI governance and ethics.",
    body: "PAU Law has officially signed a Memorandum of Understanding with the Silicon Valley Tech Council (SVTC) to launch the 'Future of Tech Law' internship program.\n\nStarting Spring 2024, select PAU Law students will be placed in in-house legal departments at leading tech companies to work specifically on issues related to Artificial Intelligence governance, data privacy compliance, and algorithmic bias. This partnership bridges the gap between legal education and the rapidly evolving needs of the technology sector.\n\n'Lawyers of tomorrow need to understand code as much as they understand the constitution,' remarked SVTC Director Marcus Thorne. This program ensures PAU graduates are ready on day one.",
    category: "Career"
  },
  {
    id: "news-003",
    title: "Fall Symposium: The Future of Digital Rights",
    date: "September 20, 2023",
    summary: "Join us for a day-long event featuring keynote speakers from the EFF and major tech policy think tanks.",
    body: "Registration is now open for the Annual PAU Law Fall Symposium. This year's theme, 'The Future of Digital Rights,' explores the intersection of civil liberties and surveillance technology.\n\nThe event will take place on November 10th in the Grand Hall. Keynote speakers include directors from the Electronic Frontier Foundation (EFF) and senior privacy counsel from Google and Meta. Panels will cover topics such as encryption backdoors, Section 230 reform, and the right to be forgotten.\n\nStudents, alumni, and the general public are invited to attend. MCLE credit is available for practicing attorneys.",
    category: "Event"
  }
];

const NOTICES_DATA: NewsItem[] = [
    {
      id: "notice-001",
      title: "Spring 2024 Course Registration Opens",
      date: "October 20, 2023",
      summary: "Registration for the Spring 2024 semester begins next Monday at 8:00 AM PST. Please consult with your academic advisor before selecting classes.",
      body: "Dear Students,\n\nRegistration for Spring 2024 classes will open on Monday, October 23, 2023, at 8:00 AM PST via the Student Portal.\n\nPlease note the following priority windows:\n- 3L Students: Monday, Oct 23\n- 2L Students: Tuesday, Oct 24\n- 1L Electives: Wednesday, Oct 25\n\nEnsure you have cleared any Bursar holds prior to registration. If you have questions regarding your degree progress, please schedule an appointment with the Office of Academic Affairs before Friday.",
      category: "Academic"
    },
    {
      id: "notice-002",
      title: "Library Hours Extended for Midterms",
      date: "October 18, 2023",
      summary: "The Law Library will be open 24 hours a day starting this Friday through the end of the examination period.",
      body: "To support students during the midterm examination period, the PAU Law Library will move to a 24-hour schedule effective Friday, October 20th.\n\nAccess after 10:00 PM will require a valid Student ID card. Coffee and snacks will be provided in the Student Lounge at midnight during this period.\n\nPlease remember to reserve study rooms in advance using the online booking system.",
      category: "General"
    },
    {
      id: "notice-003",
      title: "Pro Bono Recognition Ceremony",
      date: "November 05, 2023",
      summary: "Join us in the Grand Hall to celebrate students who have completed over 50 hours of pro bono service this year.",
      body: "The Public Interest Law Center invites you to the Annual Pro Bono Recognition Ceremony.\n\nWe will be honoring 45 students who have dedicated over 50 hours each to serving underrepresented communities this academic year. Awards will be presented by Justice Thorne.\n\nReception to follow in the Courtyard. All students and faculty are welcome.",
      category: "Event"
    },
    {
      id: "notice-004",
      title: "Guest Lecture: The Supreme Court and Tech Policy",
      date: "November 12, 2023",
      summary: "A special lecture by visiting scholar Dr. Emily Zhang, discussing recent SCOTUS rulings affecting the tech sector.",
      body: "The High Tech Law Institute presents a lunchtime lecture with Dr. Emily Zhang.\n\nTopic: 'The Roberts Court and the Internet: A New Era of Regulation?'\n\nDr. Zhang will discuss recent certiorari grants involving Section 230 and social media moderation. Lunch will be provided for the first 50 attendees.\n\nLocation: Room 204\nTime: 12:30 PM - 1:30 PM",
      category: "Academic"
    },
    {
      id: "notice-005",
      title: "On-Campus Interview (OCI) Week",
      date: "January 15, 2024",
      summary: "OCI bidding begins in December. Prepare your materials now for interviews with top national firms.",
      body: "Career Services is pleased to announce the schedule for Spring OCI Week.\n\nOver 30 employers from Big Law, government agencies, and public interest organizations will be on campus interviewing for Summer Associate positions.\n\nKey Dates:\n- Bidding Opens: Dec 1\n- Bidding Closes: Dec 15\n- Interview Schedules Released: Jan 5\n\nPlease attend the OCI Prep Workshop on Nov 30th for resume review and interview tips.",
      category: "Career"
    }
  ];

const DEFAULT_SHARED_CONTENT: SharedContent = {
  nav: {
    home: "Home",
    admissions: "Admissions",
    academics: "Academics",
    degreePrograms: "Degree Programs",
    centersClinics: "Centers & Clinics",
    faculty: "Faculty",
    newsUpdates: "News & Updates",
    latestNews: "Latest News",
    noticeBoard: "Notice Board",
    language: "Language"
  },
  footer: {
    schoolDesc: "Pacific American University School of Law is dedicated to excellence in legal education, serving the diverse communities of California and beyond since 1978.",
    contact: "Contact",
    quickLinks: "Quick Links",
    applyNow: "Apply Now",
    academicCalendar: "Academic Calendar",
    lawLibrary: "Law Library",
    careerServices: "Career Services",
    rightsReserved: "Pacific American University School of Law. All rights reserved."
  },
  buttons: {
    applyNow: "Apply Now",
    requestInfo: "Request Info",
    learnMore: "Learn more",
    readMore: "Read more",
    readFullNotice: "Read full notice",
    backToList: "Back to List",
    backToCenters: "Back to Centers",
    exploreCenter: "Explore Center",
    contactDirector: "Contact Clinic Director",
    viewPublications: "View Full Publications",
    submitInquiry: "Submit Inquiry",
    cancel: "Cancel",
    chatLibrarian: "Chat with a Librarian",
    reserveRoom: "Reserve Study Room",
    downloadCalendar: "Download Full PDF Calendar",
    applyLsac: "Apply via LSAC"
  },
  labels: {
    interestedInClinic: "Interested in joining this clinic?",
    clinicPositions: "Clinical positions are open to 2L and 3L students. Applications open at the beginning of each semester.",
    clinicInquiryForm: "Clinic Inquiry Form",
    sendMessageTo: "Send a message to the director of the",
    fullName: "Full Name",
    pauEmail: "PAU Email Address",
    studentId: "Student ID",
    academicYear: "Academic Year",
    prerequisitesMet: "Prerequisites Met",
    prereqDetail: "I have completed or am currently enrolled in Evidence and Professional Responsibility.",
    statementInterest: "Statement of Interest",
    aboutPauNews: "About PAU News",
    aboutPauNewsDetail: "All articles are published by the Pacific American University Office of Communications. For press inquiries, please contact press@pau.edu."
  }
};

const DEFAULT_HOME_CONTENT: HomeContent = {
  heroTitle: "Innovating Justice in Silicon Valley",
  heroSubtitle: "Pacific American University School of Law combines rigorous legal theory with practical skills, located at the intersection of law, technology, and social justice.",
  aboutEyebrow: "Who We Are",
  aboutTitle: "A Legacy of Innovation",
  aboutText: "Since 1978, PAU Law has been a leader in experiential legal education. Located in Santa Clara County, we leverage our proximity to the world's leading tech companies to provide unmatched opportunities in Intellectual Property and Privacy Law, while maintaining a deep commitment to public service and community advocacy.",
  deansMessageTitle: "Welcome from Dean Elena Rodriguez",
  deansMessage: "At PAU Law, we don't just teach the law; we shape the future of the legal profession. Our curriculum is designed for the modern landscape, where lawyers must be agile, tech-savvy, and deeply ethical. Join a community that champions diversity and drives impact.",
  stats: [
    { label: "Bar Passage Rate (First-Time)", value: "86%" },
    { label: "Employment Rate (10 Months)", value: "92%" },
    { label: "Student-Faculty Ratio", value: "11:1" },
    { label: "Clinics & Externships", value: "14+" }
  ],
  clinicsTitle: "Centers of Excellence",
  clinicsIntro: "Real-world experience in the areas that matter most.",
  clinics: CLINIC_DATA,
  newsTitle: "Latest News & Headlines",
  latestNews: NEWS_DATA
};

const DEFAULT_ADMISSIONS_CONTENT: AdmissionsContent = {
  title: "Join the Next Generation of Legal Leaders",
  intro: "We seek diverse, driven individuals who are ready to make a difference. Our holistic review process looks beyond the numbers to find students with the passion and resilience to succeed.",
  deadlinesTitle: "Application Deadlines",
  deadlines: [
    { term: "Early Decision", date: "November 15", type: "Binding" },
    { term: "Regular Decision", date: "March 1", type: "Priority" },
    { term: "Transfer (Fall)", date: "July 1", type: "Rolling" }
  ],
  requirementsTitle: "Application Requirements",
  requirements: [
    "Completed application via LSAC",
    "Valid LSAT or GRE score (taken within last 5 years)",
    "Personal Statement (2-3 pages) detailing your unique perspective",
    "Two Letters of Recommendation",
    "Résumé / CV",
    "Character & Fitness Disclosure"
  ],
  tuitionTitle: "Tuition & Financial Aid",
  tuitionInfo: "We are committed to making legal education accessible. Over 85% of our students receive merit-based scholarships or need-based grants. Our financial aid counselors work individually with every admitted student.",
  tuitionCost: "$58,450"
};

const DEFAULT_ACADEMICS_CONTENT: AcademicsContent = {
  title: "A Curriculum for the 21st Century",
  intro: "PAU Law’s curriculum bridges the gap between theory and practice. From your first year, you will be solving real legal problems, drafting contracts, and advocating for clients.",
  programsTitle: "Degree Programs",
  programs: [
    {
      name: "Juris Doctor (JD)",
      description: "Our core three-year program prepares students for the Bar Exam and practice in any jurisdiction. Features a rigorous 1L foundation followed by broad elective freedom."
    },
    {
      name: "LLM in Technology & Privacy",
      description: "A specialized one-year degree for lawyers who want to master the laws governing the internet, artificial intelligence, and intellectual property."
    }
  ],
  concentrationsTitle: "Certificates & Concentrations",
  concentrations: [
    "Intellectual Property Law",
    "International & Comparative Law",
    "Public Interest & Social Justice",
    "Corporate Compliance",
    "Criminal Law Advocacy",
    "Environmental Law"
  ]
};

const DEFAULT_FACULTY_CONTENT: FacultyContent = {
  title: "Learn from the Masters",
  intro: "Our faculty includes former Supreme Court clerks, partners at major international firms, and leading researchers in tech policy. They are not just scholars; they are mentors.",
  facultyList: [
    {
      name: "Dean Elena Rodriguez",
      title: "Dean & Professor of Law",
      education: "JD, Yale Law School",
      bio: "Dean Rodriguez is a nationally recognized expert in Constitutional Law and Civil Rights. Before academia, she argued five cases before the U.S. Supreme Court."
    },
    {
      name: "Prof. David Chen",
      title: "Director, High Tech Law Institute",
      education: "JD, Stanford Law School",
      bio: "Professor Chen specializes in patent law and software copyright. He previously served as lead IP counsel for a major semiconductor company."
    },
    {
      name: "Prof. Sarah Johnson",
      title: "Professor of Criminal Law",
      education: "JD, Harvard Law School",
      bio: "A former federal prosecutor, Professor Johnson teaches Criminal Law, Evidence, and Trial Advocacy. Her research focuses on sentencing reform."
    }
  ]
};

const DEFAULT_CENTERS_CONTENT: CentersContent = {
  title: "Centers of Excellence",
  intro: "Our specialized centers provide the infrastructure for deep engagement with the most pressing legal issues of our time. Through clinics, research labs, and conferences, we drive the conversation forward.",
  clinics: CLINIC_DATA
};

const DEFAULT_NOTICES_CONTENT: NoticesContent = {
  title: "Student Notice Board",
  intro: "Important announcements, academic deadlines, and campus events for the PAU Law community.",
  notices: NOTICES_DATA
};

const DEFAULT_LIBRARY_CONTENT: LibraryContent = {
  title: "Mabury Law Library",
  intro: "The intellectual heart of the campus, providing access to extensive digital and print collections, quiet study spaces, and expert research support.",
  sections: [
    {
      title: "Hours of Operation",
      content: "Monday - Thursday: 7:00 AM - Midnight\nFriday: 7:00 AM - 10:00 PM\nSaturday - Sunday: 9:00 AM - 9:00 PM"
    },
    {
      title: "Collections",
      content: "Over 500,000 volumes including federal and state case law, statutes, and treatises. Comprehensive access to Westlaw, Lexis+, and Bloomberg Law."
    },
    {
      title: "Technology",
      content: "20 group study rooms equipped with large-format displays. Computer lab with legal practice software installed."
    }
  ]
};

const DEFAULT_CAREERS_CONTENT: CareersContent = {
  title: "Career Development Office",
  intro: "Our mission is to empower students and alumni to achieve their professional goals through personalized counseling, networking events, and recruitment programs.",
  stats: [
    { label: "Employed at Graduation", value: "78%" },
    { label: "Judicial Clerkships", value: "12%" },
    { label: "Median Starting Salary", value: "$145k" }
  ],
  services: [
    {
      title: "One-on-One Counseling",
      description: "Every student is assigned a dedicated career counselor in their 1L year."
    },
    {
      title: "Mock Interview Program",
      description: "Practice your interview skills with practicing attorneys from local firms."
    }
  ]
};

const DEFAULT_CALENDAR_CONTENT: CalendarContent = {
  title: "Academic Calendar",
  intro: "Key dates for the 2023-2024 academic year.",
  events: [
    { date: "Aug 21", event: "First Day of Classes", type: "Fall 2023" },
    { date: "Nov 22-24", event: "Thanksgiving Recess", type: "Holiday" },
    { date: "Dec 4", event: "Last Day of Classes", type: "Fall 2023" },
    { date: "Dec 6-18", event: "Final Examination Period", type: "Exams" },
    { date: "Jan 8", event: "First Day of Classes", type: "Spring 2024" }
  ]
};

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Specific Item State for Details
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  // Content State
  const [sharedContent, setSharedContent] = useState<SharedContent>(DEFAULT_SHARED_CONTENT);
  const [homeContent, setHomeContent] = useState<HomeContent>(DEFAULT_HOME_CONTENT);
  const [admissionsContent, setAdmissionsContent] = useState<AdmissionsContent>(DEFAULT_ADMISSIONS_CONTENT);
  const [academicsContent, setAcademicsContent] = useState<AcademicsContent>(DEFAULT_ACADEMICS_CONTENT);
  const [facultyContent, setFacultyContent] = useState<FacultyContent>(DEFAULT_FACULTY_CONTENT);
  const [noticesContent, setNoticesContent] = useState<NoticesContent>(DEFAULT_NOTICES_CONTENT);
  const [centersContent, setCentersContent] = useState<CentersContent>(DEFAULT_CENTERS_CONTENT);
  const [libraryContent, setLibraryContent] = useState<LibraryContent>(DEFAULT_LIBRARY_CONTENT);
  const [careersContent, setCareersContent] = useState<CareersContent>(DEFAULT_CAREERS_CONTENT);
  const [calendarContent, setCalendarContent] = useState<CalendarContent>(DEFAULT_CALENDAR_CONTENT);

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    if (lang === currentLang) return;
    
    setIsTranslating(true);
    setCurrentLang(lang);

    try {
      // 1. Translate Shared Strings (Nav, Footer, Buttons)
      const translatedShared = await translateContent(DEFAULT_SHARED_CONTENT, lang);
      setSharedContent(translatedShared);

      // 2. Translate Page Content
      // Optimization: In a real app, we might only translate the visible page, 
      // but here we'll do the core ones to ensure smooth navigation.
      const tHome = await translateContent(DEFAULT_HOME_CONTENT, lang);
      setHomeContent(tHome);

      const tAdmissions = await translateContent(DEFAULT_ADMISSIONS_CONTENT, lang);
      setAdmissionsContent(tAdmissions);

      const tAcademics = await translateContent(DEFAULT_ACADEMICS_CONTENT, lang);
      setAcademicsContent(tAcademics);

      const tFaculty = await translateContent(DEFAULT_FACULTY_CONTENT, lang);
      setFacultyContent(tFaculty);
      
      const tNotices = await translateContent(DEFAULT_NOTICES_CONTENT, lang);
      setNoticesContent(tNotices);

      const tCenters = await translateContent(DEFAULT_CENTERS_CONTENT, lang);
      setCentersContent(tCenters);
      
      const tLibrary = await translateContent(DEFAULT_LIBRARY_CONTENT, lang);
      setLibraryContent(tLibrary);
      
      const tCareers = await translateContent(DEFAULT_CAREERS_CONTENT, lang);
      setCareersContent(tCareers);
      
      const tCalendar = await translateContent(DEFAULT_CALENDAR_CONTENT, lang);
      setCalendarContent(tCalendar);

      // 3. Handle Detail Pages Translation
      if (currentPage === 'news-detail' && selectedNewsItem) {
        // Find original english item to translate from
        const originalItem = [...NEWS_DATA, ...NOTICES_DATA].find(i => i.id === selectedNewsItem.id);
        if (originalItem) {
          const translatedItem = await translateContent(originalItem, lang);
          setSelectedNewsItem(translatedItem);
        }
      }

      if (currentPage === 'clinic-detail' && selectedClinic) {
        const originalClinic = CLINIC_DATA.find(c => c.id === selectedClinic.id);
        if (originalClinic) {
          const translatedClinic = await translateContent(originalClinic, lang);
          setSelectedClinic(translatedClinic);
        }
      }

    } catch (error) {
      console.error("Translation failed", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleNewsClick = (item: NewsItem) => {
    setSelectedNewsItem(item);
    setCurrentPage('news-detail');
    window.scrollTo(0, 0);
  };

  const handleClinicClick = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setCurrentPage('clinic-detail');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar 
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isTranslating={isTranslating}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        shared={sharedContent}
      />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero content={homeContent} shared={sharedContent} onNavigate={handleNavigate} />
            <InfoSection content={homeContent} shared={sharedContent} onClinicClick={handleClinicClick} />
            <HomeNews 
              title={homeContent.newsTitle} 
              newsItems={homeContent.latestNews} 
              onNewsClick={handleNewsClick}
              shared={sharedContent}
            />
          </>
        )}
        
        {currentPage === 'admissions' && <Admissions content={admissionsContent} shared={sharedContent} />}
        {currentPage === 'academics' && <Academics content={academicsContent} />}
        {currentPage === 'faculty' && <Faculty content={facultyContent} shared={sharedContent} />}
        
        {currentPage === 'news' && (
          <HomeNews 
             title={sharedContent.nav.latestNews}
             newsItems={homeContent.latestNews} // Using same source for now, effectively "All News"
             onNewsClick={handleNewsClick}
             shared={sharedContent}
          />
        )}
        
        {currentPage === 'notices' && (
          <NoticeBoard 
            content={noticesContent} 
            onNewsClick={handleNewsClick}
            shared={sharedContent}
          />
        )}

        {currentPage === 'news-detail' && selectedNewsItem && (
          <NewsDetail 
            item={selectedNewsItem} 
            onBack={() => handleNavigate('news')}
            shared={sharedContent}
          />
        )}

        {currentPage === 'centers' && (
          <Centers 
            content={centersContent} 
            onClinicClick={handleClinicClick} 
            shared={sharedContent}
          />
        )}

        {currentPage === 'clinic-detail' && selectedClinic && (
          <ClinicDetail 
            clinic={selectedClinic} 
            onBack={() => handleNavigate('centers')} 
            shared={sharedContent}
          />
        )}

        {currentPage === 'library' && <Library content={libraryContent} shared={sharedContent} />}
        {currentPage === 'careers' && <Careers content={careersContent} />}
        {currentPage === 'calendar' && <Calendar content={calendarContent} shared={sharedContent} />}
      </main>

      <Footer onNavigate={handleNavigate} shared={sharedContent} />
    </div>
  );
}
