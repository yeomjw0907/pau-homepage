
import React, { useState, useEffect, useRef } from 'react';
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
import { ConsumerInfo } from './components/ConsumerInfo';
import { Admin } from './components/Admin';
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
  SharedContent,
  ConsumerInfoContent,
  GlobalFutureItem
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
    rightsReserved: "Pacific American University School of Law. All rights reserved.",
    accreditation: "State Bar Registration",
    disclosure: "Pacific American University School of Law is accredited by the Committee of Bar Examiners of the State Bar of California. Study at, or graduation from, this law school may not qualify a student to take the bar examination or to satisfy the requirements for admission to practice in jurisdictions other than California. A student intending to seek admission to practice law in a jurisdiction other than California should contact the admitting authority in that jurisdiction for information regarding the legal education requirements in that jurisdiction for admission to the practice of law."
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
  heroTitle: "Legal Education\nWithout Borders",
  heroSubtitle: "Overcome geographic boundaries through innovation. Master American law from anywhere with our flexible, technology-driven J.D. program.",
  
  // Revised Vision & Mission Data
  visionStatement: "As educational borders dissolve, we nurture global leaders with critical perspectives. We are a platform for shaping thoughtful, solution-oriented professionals prepared to engage with the world’s most pressing challenges.",
  
  missionTitle: "",
  missionDescription: "To redefine legal education by breaking down geographic barriers and empowering talented students worldwide.",
  missionPoints: [
    {
      title: "Innovation Without Boundaries",
      description: "Merging rigorous American legal instruction with flexible, technology-driven delivery systems.",
      icon: "innovation"
    },
    {
      title: "Global Accessibility",
      description: "Lowering barriers to entry and respecting global time zones to cultivate globally active professionals.",
      icon: "access"
    },
    {
      title: "Real-World Mastery",
      description: "Combining dynamic video lectures with real-time sessions to ensure deep mastery of U.S. law.",
      icon: "globe"
    }
  ],

  introTitle: "Study American Law From Anywhere",
  introText: "A fully online J.D. program designed for motivated students seeking flexibility, world-class instruction, and a clear path to a California law license.",
  features: [
    {
      title: "Flexible Learning",
      description: "Complete two-thirds of your coursework asynchronously on your schedule—anytime, anywhere, without sacrificing academic rigor.",
      icon: "clock"
    },
    {
      title: "World-Class Mentorship",
      description: "Learn from experienced legal professionals and professors who provide personalized feedback and guidance to help you succeed academically.",
      icon: "academic"
    },
    {
      title: "Accessible Tuition",
      description: "We offer a high-quality legal education at a significantly lower cost than traditional U.S. law schools, making the J.D. dream accessible.",
      icon: "currency"
    }
  ],
  successTitle: "A Student-Centered Law School",
  successText: "From academic support to bar examination preparation, every part of the PAU Law program is designed to help you thrive. You’ll receive structured guidance from your first course through your preparation for the California Bar.",
  stats: [
    { label: "Online Coursework", value: "100%" },
    { label: "Asynchronous", value: "66%" },
    { label: "Student-Faculty Ratio", value: "15:1" },
    { label: "Bar Prep Support", value: "Included" }
  ],
  globalFutureTitle: "Your Path to a Global Career",
  globalFutureIntro: "Our rigorous curriculum opens doors to diverse international fields, equipping you with the credentials needed for today's interconnected legal environment.",
  globalFutureList: [
    {
      title: "International Business",
      description: "Navigate the complex landscape of global commerce and trade.",
      detailTitle: "International Business Law",
      detailBody: "Prepare for a dynamic career facilitating cross-border transactions, mergers, and acquisitions. Our curriculum focuses on international commercial arbitration, contract drafting for multinational entities, and understanding diverse legal systems to effectively advise global corporations.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      stats: [
        { label: "Growth Rate", value: "+12%" },
        { label: "Avg Starting Salary", value: "$160k" }
      ],
      relatedPathways: [
        { label: "JD Program", targetPage: "academics", description: "Core curriculum details" },
        { label: "Admissions", targetPage: "admissions", description: "Start your application" }
      ]
    },
    {
      title: "Corporate Governance",
      description: "Advise boards and executives on fiduciary duties and ethical compliance.",
      detailTitle: "Corporate Governance & Ethics",
      detailBody: "Become a trusted advisor to boards of directors and C-suite executives. You will master the intricate framework of rules, practices, and processes by which companies are directed and controlled, with a strong emphasis on ESG (Environmental, Social, and Governance) criteria.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      stats: [
        { label: "Demand", value: "High" },
        { label: "Sector", value: "Corporate" }
      ],
      relatedPathways: [
        { label: "High Tech Institute", targetPage: "centers", description: "Specialized training" },
        { label: "Faculty", targetPage: "faculty", description: "Meet our experts" }
      ]
    },
    {
      title: "Legal Consulting",
      description: "Provide strategic legal insight to non-legal entities and organizations.",
      detailTitle: "Strategic Legal Consulting",
      detailBody: "Move beyond traditional practice to offer high-level strategic advice. This path prepares you to work with management consulting firms, NGOs, and think tanks, applying legal reasoning to solve complex organizational challenges and risk management issues.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      stats: [
         { label: "Flexibility", value: "High" },
         { label: "Global Reach", value: "Yes" }
      ],
      relatedPathways: [
        { label: "Careers", targetPage: "careers", description: "Career support services" },
        { label: "News", targetPage: "news", description: "Industry insights" }
      ]
    },
    {
      title: "Cross-border Trade",
      description: "Master the regulations governing imports, exports, and tariffs.",
      detailTitle: "International Trade & Customs",
      detailBody: "Specialize in the laws that move the world economy. From WTO regulations to bilateral trade agreements and sanctions compliance, you will gain the expertise needed to guide logistics companies, manufacturers, and governments through the web of international trade laws.",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      stats: [
        { label: "Impact", value: "Global" },
        { label: "Specialization", value: "Trade" }
      ],
      relatedPathways: [
        { label: "Academics", targetPage: "academics", description: "View concentrations" },
        { label: "Library", targetPage: "library", description: "Research resources" }
      ]
    },
    {
      title: "Regulatory Affairs",
      description: "Ensure compliance with government agencies like the FDA, SEC, and EPA.",
      detailTitle: "Regulatory Affairs & Compliance",
      detailBody: "Serve as the vital link between industry and government. This career path focuses on ensuring that products and business practices comply with federal and state regulations. Key areas include healthcare (FDA), finance (SEC), and environmental protection (EPA).",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      stats: [
         { label: "Stability", value: "Very High" },
         { label: "Role", value: "In-House" }
      ],
      relatedPathways: [
        { label: "Centers", targetPage: "centers", description: "Policy research" },
        { label: "Careers", targetPage: "careers", description: "Placement stats" }
      ]
    },
    {
      title: "Graduate Study in US, Canada or London",
      description: "Pursue advanced degrees like an LL.M. or S.J.D. at top universities.",
      detailTitle: "Advanced Legal Studies",
      detailBody: "For those with academic aspirations, our J.D. program provides a rigorous foundation for further study. Many graduates go on to pursue specialized LL.M. degrees or S.J.D. doctorates at prestigious institutions, preparing for careers in legal academia or high-level policy research.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
      stats: [
         { label: "Academic", value: "Focus" },
         { label: "Next Step", value: "LL.M." }
      ],
      relatedPathways: [
        { label: "Faculty", targetPage: "faculty", description: "Academic mentorship" },
        { label: "Library", targetPage: "library", description: "Scholarly resources" }
      ]
    }
  ],
  globalFutureClosing: "Empowering students to build the knowledge and credentials needed in today’s global legal environment.",
  clinicsTitle: "",
  clinicsIntro: "",
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
  tuitionTitle: "Affordable Tuition Without Compromise",
  tuitionInfo: "Pacific American University’s School of Law is proud to offer a high-quality legal education at a significantly lower cost than traditional U.S. law schools, making the dream of earning a J.D. more accessible for students anywhere.",
  tuitionCost: "$28,450",
  faqTitle: "Frequently Asked Questions",
  faqs: [
    {
      question: "Is the LSAT required for admission?",
      answer: "PAU Law requires either a valid LSAT or GRE score for all JD applicants. However, we take a holistic approach to admissions, considering your scores alongside your professional experience and academic background."
    },
    {
      question: "Can I work full-time while enrolled in the program?",
      answer: "Yes. Our online JD program is specifically designed for working professionals. The asynchronous nature of 66% of the coursework allows you to study on your own schedule, though you must attend live sessions occasionally."
    },
    {
      question: "Do you accept transfer credits from other law schools?",
      answer: "Yes, we accept transfer credits from ABA-accredited or CBE-accredited law schools for students in good academic standing. A maximum of 30 units may be transferred upon review by the Academic Dean."
    },
    {
      question: "What is the minimum GPA requirement?",
      answer: "We do not have a strict minimum GPA cutoff. While academic performance is important, we also value leadership potential, work history, and your personal statement."
    }
  ]
};

const DEFAULT_ACADEMICS_CONTENT: AcademicsContent = {
  title: "Prepare for a Global Legal Future",
  intro: "Study American law from anywhere in the world and open doors to careers in International business, Compliance and corporate governance, Legal consulting, Cross-border trade, Government and regulatory fields, and Further graduate study in the U.S. Pacific American University’s School of Law empowers students to build the knowledge and credentials needed in today’s global legal environment.",
  programsTitle: "Degree Programs",
  programs: [
    {
      name: "Juris Doctor (JD)",
      description: "A fully online J.D. program designed for motivated students. Complete two-thirds of your coursework asynchronously."
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
  title: "World-Class Faculty, Real Mentorship",
  intro: "Learn from experienced legal professionals and professors who are committed to your progress. Our faculty provide personalized feedback, supportive guidance, and accessible communication, helping you succeed academically and professionally.",
  facultyList: [
    {
      name: "Dean Elena Rodriguez",
      title: "Dean & Professor of Law",
      education: "JD, Yale Law School",
      bio: "Dean Rodriguez is a nationally recognized expert in Constitutional Law and Civil Rights. Before academia, she argued five cases before the U.S. Supreme Court.",
      expertise: ["Constitutional Law", "Civil Rights", "Leadership"]
    },
    {
      name: "Prof. David Chen",
      title: "Director, High Tech Law Institute",
      education: "JD, Stanford Law School",
      bio: "Professor Chen specializes in patent law and software copyright. He previously served as lead IP counsel for a major semiconductor company.",
      expertise: ["Technology & IP", "Patent Law", "Leadership"]
    },
    {
      name: "Prof. Sarah Johnson",
      title: "Professor of Criminal Law",
      education: "JD, Harvard Law School",
      bio: "A former federal prosecutor, Professor Johnson teaches Criminal Law, Evidence, and Trial Advocacy. Her research focuses on sentencing reform.",
      expertise: ["Criminal Law", "Evidence", "Trial Advocacy"]
    }
  ]
};

const DEFAULT_CENTERS_CONTENT: CentersContent = {
  title: "",
  intro: "",
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

const DEFAULT_CONSUMER_INFO_CONTENT: ConsumerInfoContent = {
  title: "Consumer Information & Required Disclosures",
  intro: "Pacific American University School of Law is committed to transparency. In compliance with the State Bar of California's regulations, we provide the following information to current and prospective students.",
  sections: [
    {
      id: "bar-passage",
      title: "Bar Examination Passage Data",
      content: "The following data reflects the cumulative pass rates for PAU Law graduates taking the California Bar Examination for the first time.",
      tableData: [
        { label: "July 2023 First-Time Pass Rate", value: "68%" },
        { label: "February 2023 First-Time Pass Rate", value: "54%" },
        { label: "5-Year Cumulative Pass Rate", value: "72%" },
        { label: "Statewide Average (July 2023)", value: "51%" }
      ]
    },
    {
      id: "employment",
      title: "Employment Statistics",
      content: "Employment outcomes for the Class of 2022, measured 10 months after graduation.",
      tableData: [
        { label: "Total Graduates", value: "120" },
        { label: "Employed - Bar Passage Required", value: "85 (70.8%)" },
        { label: "Employed - JD Advantage", value: "15 (12.5%)" },
        { label: "Unemployed - Seeking", value: "10 (8.3%)" },
        { label: "Pursuing Graduate Degree", value: "5 (4.2%)" }
      ]
    },
    {
      id: "attrition",
      title: "Attrition and Retention",
      content: "Attrition rates for the 2022-2023 Academic Year.",
      tableData: [
        { label: "1L Entering Class Size", value: "145" },
        { label: "Academic Disqualification", value: "12 (8.2%)" },
        { label: "Voluntary Withdrawal", value: "8 (5.5%)" },
        { label: "Overall 1L Retention Rate", value: "86.3%" }
      ]
    },
    {
      id: "refund",
      title: "Tuition Refund Policy",
      content: "Students who withdraw from the program may be eligible for a tuition refund based on the date of withdrawal. \n\n- Withdrawal before 1st day of class: 100% Refund\n- Withdrawal during 1st week: 80% Refund\n- Withdrawal during 2nd week: 60% Refund\n- Withdrawal during 3rd week: 40% Refund\n- Withdrawal after 3rd week: 0% Refund\n\nAll refund requests must be submitted in writing to the Office of the Bursar."
    }
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
  const [consumerInfoContent, setConsumerInfoContent] = useState<ConsumerInfoContent>(DEFAULT_CONSUMER_INFO_CONTENT);

  // Cache to store translated content promises: key = `${pageType}_${lang}` or `${id}_${lang}`
  // Storing Promises avoids race conditions and duplicate requests for the same content.
  const translationCache = useRef<Map<string, Promise<any>>>(new Map());

  // Optimized Helper: Check cache (Promise) -> Return Promise -> or Start new translation
  const getTranslatedData = <T extends unknown>(key: string, data: T, lang: SupportedLanguage): Promise<T> => {
    if (lang === 'English') return Promise.resolve(data);
    
    const cacheKey = `${key}_${lang}`;
    if (translationCache.current.has(cacheKey)) {
      return translationCache.current.get(cacheKey) as Promise<T>;
    }
    
    // Create the promise and cache it immediately
    const promise = translateContent(data, lang).catch(err => {
        // If it fails, remove from cache so it can be retried
        translationCache.current.delete(cacheKey);
        throw err;
    });

    translationCache.current.set(cacheKey, promise);
    return promise;
  };

  // Helper function to translate specific page content with granular parallelization
  const translatePageContent = async (page: Page, lang: SupportedLanguage) => {
    try {
      if (lang === 'English') {
        // Restore defaults synchronously
        switch (page) {
          case 'home': setHomeContent(DEFAULT_HOME_CONTENT); break;
          case 'news': setHomeContent(DEFAULT_HOME_CONTENT); break;
          case 'admissions': setAdmissionsContent(DEFAULT_ADMISSIONS_CONTENT); break;
          case 'academics': setAcademicsContent(DEFAULT_ACADEMICS_CONTENT); break;
          case 'faculty': setFacultyContent(DEFAULT_FACULTY_CONTENT); break;
          case 'notices': setNoticesContent(DEFAULT_NOTICES_CONTENT); break;
          case 'centers': setCentersContent(DEFAULT_CENTERS_CONTENT); break;
          case 'library': setLibraryContent(DEFAULT_LIBRARY_CONTENT); break;
          case 'careers': setCareersContent(DEFAULT_CAREERS_CONTENT); break;
          case 'calendar': setCalendarContent(DEFAULT_CALENDAR_CONTENT); break;
          case 'consumer-info': setConsumerInfoContent(DEFAULT_CONSUMER_INFO_CONTENT); break;
          case 'news-detail':
            if (selectedNewsItem) {
               const original = [...NEWS_DATA, ...NOTICES_DATA].find(i => i.id === selectedNewsItem.id);
               if (original) setSelectedNewsItem(original);
            }
            break;
          case 'clinic-detail':
            if (selectedClinic) {
              const original = CLINIC_DATA.find(c => c.id === selectedClinic.id);
              if (original) setSelectedClinic(original);
            }
            break;
        }
        return;
      }

      // Check for page-level cache first (for simple pages)
      const pageCacheKey = `${page}_${lang}`;
      
      switch (page) {
        case 'home':
        case 'news':
          {
            const baseContent = { ...DEFAULT_HOME_CONTENT, clinics: [], latestNews: [], globalFutureList: [] };
            
            // Fetch parts in parallel using the cache-aware helper
            const [tBase, tClinics, tNews, tGlobal] = await Promise.all([
               getTranslatedData(`home_base`, baseContent, lang),
               // Map through lists to ensure individual items are cached for detail views later
               Promise.all(DEFAULT_HOME_CONTENT.clinics.map(c => getTranslatedData(`clinic_${c.id}`, c, lang))),
               Promise.all(DEFAULT_HOME_CONTENT.latestNews.map(n => getTranslatedData(`news_${n.id}`, n, lang))),
               Promise.all(DEFAULT_HOME_CONTENT.globalFutureList.map(g => getTranslatedData(`home_future_${g.title}`, g, lang)))
            ]);

            setHomeContent({ 
              ...tBase, 
              clinics: tClinics, 
              latestNews: tNews,
              globalFutureList: tGlobal
            } as HomeContent);
          }
          break;

        case 'admissions':
          {
             const base = { ...DEFAULT_ADMISSIONS_CONTENT, deadlines: [], requirements: [], faqs: [] };
             const [tBase, tDeadlines, tRequirements, tFaqs] = await Promise.all([
                 getTranslatedData('admissions_base', base, lang),
                 Promise.all(DEFAULT_ADMISSIONS_CONTENT.deadlines.map((d, i) => getTranslatedData(`admissions_deadline_${i}`, d, lang))),
                 getTranslatedData('admissions_reqs', DEFAULT_ADMISSIONS_CONTENT.requirements, lang),
                 Promise.all(DEFAULT_ADMISSIONS_CONTENT.faqs.map((f, i) => getTranslatedData(`admissions_faq_${i}`, f, lang)))
             ]);
             setAdmissionsContent({ 
               ...tBase, 
               deadlines: tDeadlines, 
               requirements: tRequirements,
               faqs: tFaqs
             } as AdmissionsContent);
          }
          break;

        case 'academics':
          {
             const base = { ...DEFAULT_ACADEMICS_CONTENT, programs: [], concentrations: [] };
             const [tBase, tPrograms, tConcentrations] = await Promise.all([
                 getTranslatedData('academics_base', base, lang),
                 Promise.all(DEFAULT_ACADEMICS_CONTENT.programs.map((p, i) => getTranslatedData(`academics_prog_${i}`, p, lang))),
                 getTranslatedData('academics_conc', DEFAULT_ACADEMICS_CONTENT.concentrations, lang)
             ]);
             setAcademicsContent({ ...tBase, programs: tPrograms, concentrations: tConcentrations } as AcademicsContent);
          }
          break;

        case 'faculty':
          {
             const base = { ...DEFAULT_FACULTY_CONTENT, facultyList: [] };
             const [tBase, tList] = await Promise.all([
                 getTranslatedData('faculty_base', base, lang),
                 Promise.all(DEFAULT_FACULTY_CONTENT.facultyList.map((f, i) => getTranslatedData(`faculty_member_${i}`, f, lang)))
             ]);
             setFacultyContent({ ...tBase, facultyList: tList } as FacultyContent);
          }
          break;

        case 'notices':
          {
             const base = { ...DEFAULT_NOTICES_CONTENT, notices: [] };
             const [tBase, tList] = await Promise.all([
                 getTranslatedData('notices_base', base, lang),
                 Promise.all(DEFAULT_NOTICES_CONTENT.notices.map(n => getTranslatedData(`news_${n.id}`, n, lang)))
             ]);
             setNoticesContent({ ...tBase, notices: tList } as NoticesContent);
          }
          break;

        case 'centers':
          {
             const base = { ...DEFAULT_CENTERS_CONTENT, clinics: [] };
             const [tBase, tList] = await Promise.all([
                 getTranslatedData('centers_base', base, lang),
                 Promise.all(DEFAULT_CENTERS_CONTENT.clinics.map(c => getTranslatedData(`clinic_${c.id}`, c, lang)))
             ]);
             setCentersContent({ ...tBase, clinics: tList } as CentersContent);
          }
          break;

        case 'library':
          {
             const base = { ...DEFAULT_LIBRARY_CONTENT, sections: [] };
             const [tBase, tSections] = await Promise.all([
                 getTranslatedData('library_base', base, lang),
                 Promise.all(DEFAULT_LIBRARY_CONTENT.sections.map((s, i) => getTranslatedData(`library_section_${i}`, s, lang)))
             ]);
             setLibraryContent({ ...tBase, sections: tSections } as LibraryContent);
          }
          break;

        case 'careers':
          {
             const base = { ...DEFAULT_CAREERS_CONTENT, stats: [], services: [] };
             const [tBase, tStats, tServices] = await Promise.all([
                 getTranslatedData('careers_base', base, lang),
                 Promise.all(DEFAULT_CAREERS_CONTENT.stats.map((s, i) => getTranslatedData(`careers_stat_${i}`, s, lang))),
                 Promise.all(DEFAULT_CAREERS_CONTENT.services.map((s, i) => getTranslatedData(`careers_serv_${i}`, s, lang)))
             ]);
             setCareersContent({ ...tBase, stats: tStats, services: tServices } as CareersContent);
          }
          break;

        case 'calendar':
           {
              const base = { ...DEFAULT_CALENDAR_CONTENT, events: [] };
              const [tBase, tEvents] = await Promise.all([
                  getTranslatedData('calendar_base', base, lang),
                  Promise.all(DEFAULT_CALENDAR_CONTENT.events.map((e, i) => getTranslatedData(`calendar_evt_${i}`, e, lang)))
              ]);
              setCalendarContent({ ...tBase, events: tEvents } as CalendarContent);
           }
           break;

        case 'consumer-info':
          {
              const base = { ...DEFAULT_CONSUMER_INFO_CONTENT, sections: [] };
              const [tBase, tSections] = await Promise.all([
                  getTranslatedData('consumer_base', base, lang),
                  Promise.all(DEFAULT_CONSUMER_INFO_CONTENT.sections.map((s, i) => getTranslatedData(`consumer_sec_${i}`, s, lang)))
              ]);
              setConsumerInfoContent({ ...tBase, sections: tSections } as ConsumerInfoContent);
          }
          break;

        case 'news-detail':
          if (selectedNewsItem) {
             const originalItem = [...NEWS_DATA, ...NOTICES_DATA].find(i => i.id === selectedNewsItem.id);
             if (originalItem) {
               // Reuse cache key from list views
               const translatedItem = await getTranslatedData(`news_${originalItem.id}`, originalItem, lang);
               setSelectedNewsItem(translatedItem);
             }
          }
          break;
        case 'clinic-detail':
          if (selectedClinic) {
            const originalClinic = CLINIC_DATA.find(c => c.id === selectedClinic.id);
            if (originalClinic) {
              // Reuse cache key from list views
              const translatedClinic = await getTranslatedData(`clinic_${originalClinic.id}`, originalClinic, lang);
              setSelectedClinic(translatedClinic);
            }
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to translate page ${page}`, error);
    }
  };

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    if (lang === currentLang) return;
    
    setIsTranslating(true);
    setCurrentLang(lang);

    try {
       // Parallelize Shared content and Page content
       const sharedPromise = Promise.all([
           getTranslatedData('shared_nav', DEFAULT_SHARED_CONTENT.nav, lang),
           getTranslatedData('shared_footer', DEFAULT_SHARED_CONTENT.footer, lang),
           getTranslatedData('shared_buttons', DEFAULT_SHARED_CONTENT.buttons, lang),
           getTranslatedData('shared_labels', DEFAULT_SHARED_CONTENT.labels, lang)
       ]).then(([tNav, tFooter, tButtons, tLabels]) => {
           setSharedContent({
               nav: tNav,
               footer: tFooter,
               buttons: tButtons,
               labels: tLabels
           });
       });

       // We await both to ensure consistent UI state before stopping the loader
       await Promise.all([
         sharedPromise,
         translatePageContent(currentPage, lang)
       ]);

    } catch (error) {
      console.error("Translation failed", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleNavigate = async (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);

    if (currentLang !== 'English') {
      setIsTranslating(true);
      await translatePageContent(page, currentLang);
      setIsTranslating(false);
    }
  };

  const handleNewsClick = async (item: NewsItem) => {
    setSelectedNewsItem(item);
    setCurrentPage('news-detail');
    window.scrollTo(0, 0);

    if (currentLang !== 'English') {
      setIsTranslating(true);
      try {
        const translatedItem = await getTranslatedData(`news_${item.id}`, item, currentLang);
        setSelectedNewsItem(translatedItem);
      } catch (e) {
        console.error(e);
      } finally {
        setIsTranslating(false);
      }
    }
  };

  const handleClinicClick = async (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setCurrentPage('clinic-detail');
    window.scrollTo(0, 0);

    if (currentLang !== 'English') {
      setIsTranslating(true);
      try {
        const translatedClinic = await getTranslatedData(`clinic_${clinic.id}`, clinic, currentLang);
        setSelectedClinic(translatedClinic);
      } catch (e) {
        console.error(e);
      } finally {
        setIsTranslating(false);
      }
    }
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
            <InfoSection 
              content={homeContent} 
              shared={sharedContent} 
              onClinicClick={handleClinicClick} 
              onNavigate={handleNavigate} 
            />
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
             newsItems={homeContent.latestNews} 
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
        {currentPage === 'consumer-info' && <ConsumerInfo content={consumerInfoContent} />}
        {currentPage === 'admin' && (
          <Admin 
            home={homeContent} 
            setHome={setHomeContent}
            admissions={admissionsContent}
            setAdmissions={setAdmissionsContent}
            academics={academicsContent}
            setAcademics={setAcademicsContent}
            faculty={facultyContent}
            setFaculty={setFacultyContent}
            notices={noticesContent}
            setNotices={setNoticesContent}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} shared={sharedContent} />
    </div>
  );
}
