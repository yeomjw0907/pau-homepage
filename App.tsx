import React, { useState, useEffect, useRef, useTransition } from 'react';
import { 
  Page, 
  SupportedLanguage, 
  SharedContent, 
  DEFAULT_SHARED_CONTENT, 
  MOCK_HOME_CONTENT, 
  Clinic, 
  NewsItem,
  GlobalAlert,
  AdmissionsContent
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
import { Admissions } from './components/Admissions';
import { Academics } from './components/Academics';
import { Faculty } from './components/Faculty';
import { HomeNews } from './components/HomeNews';
import { NoticeBoard } from './components/NoticeBoard';
import { NewsDetail } from './components/NewsDetail';
import { StudentResources } from './components/StudentResources';
import { ClinicDetail } from './components/ClinicDetail';
import { Library } from './components/Library';
import { Careers } from './components/Careers';
import { Calendar } from './components/Calendar';
import { ConsumerInfo } from './components/ConsumerInfo';
import { Admin } from './components/Admin';
import { TranslationOverlay } from './components/TranslationOverlay';
import { translateContent } from './services/geminiService';
import { 
  CurrencyDollarIcon, 
  BanknotesIcon, 
  CreditCardIcon, 
  CheckBadgeIcon, 
  ArrowPathIcon, 
  ExclamationCircleIcon,
  ClockIcon, 
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PaperAirplaneIcon,
  GlobeAmericasIcon,
  UserIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  BookOpenIcon,
  UserGroupIcon,
  UserCircleIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon,
  ClipboardDocumentListIcon,
  IdentificationIcon,
  NewspaperIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentCheckIcon,
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  InboxArrowDownIcon
} from '@heroicons/react/24/outline';

const PageHeader: React.FC<{ title: string; subtitle: string; icon: any }> = ({ title, subtitle, icon: Icon }) => (
  <div className="bg-pau-darkBlue pt-32 md:pt-44 pb-12 md:pb-20 px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <Icon className="h-10 md:h-16 w-10 md:w-16 text-pau-gold mx-auto mb-4 md:mb-6" />
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white whitespace-pre-line leading-snug md:leading-tight">{title}</h1>
      <p className="mt-4 md:mt-6 text-sm md:text-xl text-gray-300 font-light max-w-2xl mx-auto">{subtitle}</p>
    </div>
  </div>
);

const SectionWrapper: React.FC<{ title?: string; children: React.ReactNode; centered?: boolean }> = ({ title, children, centered = false }) => (
  <section className={`py-12 md:py-24 px-6 bg-white ${centered ? 'text-center' : ''}`}>
    <div className="max-w-7xl mx-auto">
      {title && (
        <div className={`flex items-center space-x-4 mb-8 md:mb-16 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 md:w-12 bg-pau-gold"></span>
          <h2 className="text-pau-gold font-bold tracking-widest uppercase text-[10px] md:text-xs">{title}</h2>
        </div>
      )}
      {children}
    </div>
  </section>
);

const DocumentLink: React.FC<{ title: string; type?: string }> = ({ title, type = "PDF" }) => (
  <div className="flex items-center justify-between p-4 md:p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-pau-gold transition-all cursor-pointer group">
    <div className="flex items-center">
      <div className="p-3 md:p-4 bg-red-50 text-red-500 rounded-xl mr-3 md:mr-5">
        <DocumentTextIcon className="h-5 md:h-6 w-5 md:w-6" />
      </div>
      <div>
        <h4 className="font-bold text-pau-darkBlue text-sm md:text-lg">{title}</h4>
        <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 md:mt-1">{type} Resource</p>
      </div>
    </div>
    <ArrowDownTrayIcon className="h-4 md:h-5 w-4 md:w-5 text-gray-300" />
  </div>
);

// Generic Page Component for static text content
const GenericPage: React.FC<{ 
  title: string; 
  subtitle: string; 
  icon: any; 
  content: React.ReactNode 
}> = ({ title, subtitle, icon, content }) => (
  <>
    <PageHeader title={title} subtitle={subtitle} icon={icon} />
    <SectionWrapper>
      <div className="max-w-4xl mx-auto prose prose-lg prose-blue text-gray-600">
        {content}
      </div>
    </SectionWrapper>
  </>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // Ref to track previous language to prevent initial English translation or loops
  const prevLangRef = useRef<SupportedLanguage>('English');

  // Global State for Content
  const [homeContent, setHomeContent] = useState(MOCK_HOME_CONTENT);
  const [globalAlert, setGlobalAlert] = useState<GlobalAlert>({
    active: false,
    message: '',
    type: 'info'
  });

  const [admissionsContent, setAdmissionsContent] = useState<AdmissionsContent>({
    title: 'Admissions',
    intro: 'Start your journey toward a legal career with Pacific American University.',
    deadlinesTitle: 'Application Deadlines',
    deadlines: [
      { term: 'Winter Intake', date: 'Starts January (Deadline: mid-November)', type: '1L Students' },
      { term: 'Spring Intake', date: 'Starts April (Deadline: mid-February)', type: '1L Students' },
      { term: 'Fall Intake', date: 'Starts September (Deadline: mid-July)', type: '1L Students' }
    ],
    requirementsTitle: 'Admission Requirements',
    requirements: ['Bachelor\'s Degree from an accredited institution', 'Personal Statement', 'Two Letters of Recommendation', 'LSAT Score (Optional)', 'Official Transcripts'],
    tuitionTitle: 'Tuition & Value',
    tuitionInfo: 'One of the most accessible JD programs in California. We believe in providing high-quality legal education without the crushing debt burden.',
    tuitionCost: '$9,000',
    faqTitle: 'Admissions FAQ',
    faqs: [
      { question: 'Is the program 100% online?', answer: 'Yes. PAUSL is a Registered Unaccredited Correspondence Law School. All lectures and coursework are delivered 100% online through our Learning Management System, Populi, allowing you to study from anywhere in the world.' },
      { question: 'Do I need to take the LSAT?', answer: 'While LSAT scores are considered if submitted, they are not mandatory for admission. We evaluate candidates holistically.' }
    ]
  });

  const [noticesContent, setNoticesContent] = useState({ 
    title: 'Campus Notices', 
    intro: 'Stay informed about upcoming events, academic deadlines, and policy changes.', 
    notices: [] 
  });

  const [weeklyDictaContent, setWeeklyDictaContent] = useState({
    title: 'Weekly Dicta',
    intro: 'Official announcements and updates for the PAU School of Law community.',
    notices: [
      {
        id: 'wd-2025-02-03',
        title: 'The Weekly Dicta — February 3, 2025',
        date: 'February 3, 2025',
        summary: 'Learning, Serving, and Leading Together — Pacific American University School of Law. Important dates for midterms, writing competition, and administrative deadlines.',
        category: 'Newsletter',
        isPinned: true,
        body: `
          <p><strong>Learning, Serving, and Leading Together — Pacific American University School of Law</strong></p>
          
          <p>Dear PAUSL Students, Faculty, and Staff,</p>
          <p>Warm greetings to each of you across our global learning community. As we advance through the term, we continue to build momentum — growing in knowledge, developing as leaders, and supporting one another from every corner of the world. Here are the key updates and opportunities for the week ahead.</p>
          
          <h3>📅 Important Dates This Week</h3>
          <p><strong>Tuesday, February 4</strong><br>Student Success Workshop: <em>Mastering Outlining for Midterms</em><br>Time: 5:00 PM PST | Location: Zoom (link in Populi)</p>
          <p><strong>Wednesday, February 5</strong><br>Legal Writing Club<br>Topic: <em>Using Precedent Effectively in Persuasive Writing</em><br>Time: 6:00 PM PST | Location: Zoom</p>
          <p style="color: #e53e3e;"><strong>⚠️ Deadline for Accommodation Requests for Midterms</strong></p>
          <p><strong>Friday, February 7</strong><br>Midterm Exam Schedules Posted<br>Check Course Documents in Populi for each class.</p>

          <h3>🎓 Academic Reminders</h3>
          <p><strong>Midterm Exams — Week of February 10</strong><br>Please review all exam instructions in advance. Students studying outside the U.S.: remember to confirm your local time-zone equivalents.</p>

          <h3>✍️ PAUSL Writing Competition: Now Open!</h3>
          <p>This year's theme:</p>
          <p><strong>"Innovative Approaches to Cross-Border Civil Dispute Resolution."</strong></p>
          <ul>
            <li><strong>Deadline:</strong> <strong>March 1</strong></li>
            <li><strong>Prize:</strong> $250 tuition credit + publication</li>
            <li><strong>Eligibility:</strong> Open to all PAUSL JD and non-JD students</li>
          </ul>

          <h3>🌐 Community Highlights</h3>
          <ul>
            <li><strong>New Student Group Launch:</strong> <em>The Global Justice Forum</em> begins this month—details to come.</li>
            <li><strong>Faculty Spotlight:</strong> Professor Kim recently published new scholarship on international mediation models.</li>
          </ul>
          <p>Have something to celebrate or share? Submit your announcements for next week's edition!</p>

          <h3>💰 Financial & Administrative Deadlines</h3>
          <p><strong>February 10 — Tuition Installment Due</strong><br>Submit payments via Populi Billing to avoid late fees.</p>
          <p><strong>February 15 — FAFSA Priority Deadline (U.S. Students)</strong><br>We strongly recommend submitting early for timely processing.</p>
          <p><strong>International Student Financial Documentation</strong><br>Upload updates through the Student Services portal on an ongoing basis.</p>

          <h3>💬 A Message for the Week</h3>
          <p><em>"As we continue our journey together, remember that legal education is not only the pursuit of knowledge, but also the preparation for a life of service. Your dedication, your voices, and your commitment to justice are building the community we envision at PAUSL."</em></p>
          
          <p>If you have items for next week's Weekly Dicta, please email <a href="mailto:admin@paucal.org" style="color: #2563eb; text-decoration: underline;">admin@paucal.org</a> by Thursday at noon.</p>
          
          <p>Wishing you a productive, connected, and meaningful week ahead.</p>
          <p><strong>— The PAUSL Administrative Team</strong></p>
        `
      }
    ]
  });

  const [facultyContent, setFacultyContent] = useState({ 
    title: 'Distinguished Faculty', 
    intro: 'Our professors are leaders in legal theory and practitioners with real-world impact.', 
    facultyList: [
      { 
        name: "Michael Marino", 
        credential: "Esq.",
        title: "Faculty (Teaches: Legal Writing, First-Year Skills, Bar Preparation)", 
        education: [
          "J.D., St. John's University School of Law (2004)",
          "B.A., The George Washington University (2000)"
        ], 
        bio: "Academic and Teaching Experience:\nMarino Legal Academy\nManaging Director | 2009 – Present\n● Lead curriculum design and academic programming for legal writing, first-year skills, and bar examination preparation across multiple jurisdictions\n● Teach and lecture on legal writing, issue spotting, rule synthesis, and exam-ready analytical structure\n● Develop instructional materials and assessment frameworks to support early law students and bar candidates\n● Oversee faculty, academic content, and regulatory compliance for a third-generation legal education organization founded in 1946\n\nAdjunct Professor / Legal Educator\nNew York Law School | Pacific American University\n● Taught Legal Writing, First-Year Skills, and Bar Preparation courses\n● Instructed students on essay organization, analytical clarity, time management, and exam performance\n● Provided academic support and mentoring to first-year and at-risk law students\n\nAcademic Support and Bar Passage Outcomes\n● Member of the academic support team that helped increase New York Law School's bar passage rate from the low-50 percent range to 94 percent\n\nPublications\n● Author and contributor, Westlaw's McKinney's Forms\n○ Draft and update commentary and forms relating to New York civil practice and procedure\n\nProfessional Legal Experience\nGraham Management LLC | Montecito, CA\nGeneral Counsel | 2019 – Present\n● Advise on legal compliance, contracts, intellectual property, and risk management\n● Draft and negotiate licensing, service, and sponsorship agreements\n● Manage trademark registration, licensing, and enforcement\n● Coordinate with outside counsel on litigation and regulatory matters\n\nSchwartz & Perry LLP | New York, NY\nAttorney | 2008 – 2009\n● Drafted and reviewed employment and service agreements\n● Assisted with litigation support, discovery, and document production\n● Conducted legal research on labor and intellectual property issues\n\nNew York Yankees | Bronx, NY\nLegal Intern | 2006\n● Assisted with licensing and sponsorship agreements\n● Conducted research on intellectual property and regulatory compliance\n\nLeadership and Service\nCold Spring School District | Montecito, CA\nBoard President | 2018 – Present\n● Provide governance oversight for district operations, compliance, and budgeting\n● Named 2024 Board Member of the Year, Small School Districts' Association (SSDA)\n\nProfessional Memberships\n● State Bar of California\n● New York State Bar", 
        expertise: ["Legal Writing", "First-Year Skills", "Bar Preparation", "Legal Education", "Contracts", "Intellectual Property", "Risk Management", "Legal Compliance", "Trademark Registration", "Licensing and Enforcement"],
        phone: "(917) 673-9618",
        email: "MMarino@MarinoLegal.com",
        category: "Faculty",
        photoUrl: "/images/faculty-michael-marino.jpg"
      },
      { 
        name: "Jonathan Levy", 
        credential: "Ph.D., J.D.",
        title: "Faculty (Teaches: Torts, International and Administrative Law, Introduction to Jurisprudence, Contracts, Family Law, Immigration, Legal Research, Bankruptcy, Copyrights, Evidence, Legal Ethics, Estates and Trusts, Constitutional Law)", 
        education: [
          "Ph.D. in Political Science, University of Cincinnati (2006)"
        ], 
        bio: "Qualifications\n● Dual qualified California Lawyer (Attorney) and English Solicitor\n● Practiced law in California and internationally for over 30 years\n\nAcademic and Teaching Experience\nSeveral Regionally Accredited Universities\nInstructor | 2006 – Present\n● Awarded PhD in Political Science (University of Cincinnati, 2006)\n● Instructed classes in Torts, International and Administrative Law, Introduction to Jurisprudence, Contracts, Family Law, Immigration, Legal Research, Bankruptcy, Copyrights, Evidence, Legal Ethics, Estates and Trusts and Constitutional Law since 2006\n\nLegal Practice as Attorney\n● Concentrates on cross-border issues including litigation, finance, securities, crypto assets, federal and company law\n\nLegal Practice as Solicitor\n● Focuses on the British overseas territories, capital markets, EU and national constitutional claims and petitions and bilateral and multilateral trade agreements and international organisations and tribunals", 
        expertise: ["Torts", "International and Administrative Law", "Introduction to Jurisprudence", "Contracts", "Family Law", "Immigration", "Legal Research", "Bankruptcy", "Copyrights", "Evidence", "Legal Ethics", "Estates and Trusts", "Constitutional Law", "Cross-border Issues", "Litigation", "Finance", "Securities", "Crypto Assets", "Federal and Company Law", "British Overseas Territories", "Capital Markets", "EU and National Constitutional Claims", "Bilateral and Multilateral Trade Agreements", "International Organisations and Tribunals"],
        phone: "(213) 674-7174",
        email: "jlevy@paucal.org",
        category: "Faculty",
        photoUrl: "/images/faculty-jonathan-levy.jpg"
      },
      { 
        name: "Shandrea P. Williams", 
        credential: "J.D.",
        title: "Faculty (Teaches: Contracts I & II)", 
        education: [
          "J.D., Loyola University School of Law (1994)",
          "B.A., Southern Agricultural & Mechanical University (1991)"
        ], 
        bio: "Qualifications\n● Attorney Licensed in Louisiana (1994)\n\nAcademic and Teaching Experience\nSouthern University Law Center\nAssociate Professor | 2021 – Present\nCo-Director, Common Law Bar Program | 2022 – Present\n\nConcord Law School at Purdue University Global\nProfessor | 2017 – 2023", 
        expertise: ["Contracts"],
        phone: "(213) 674-7174",
        email: "swilliams@paucal.org",
        category: "Faculty",
        photoUrl: "/images/faculty-shandrea-williams.jpg"
      },
      { 
        name: "John Jack Chandler", 
        credential: "J.D.",
        title: "Faculty (Teaches: Criminal Law, Legal Liability, Criminal Justice)", 
        education: [
          "J.D., Loyola Law School, Los Angeles",
          "B.A. in Criminal Justice, CSUF"
        ], 
        bio: "Law Enforcement Experience\nSouthern California\nLaw Enforcement Officer and Legal Attorney | 30 years\n● Work experience involved street policing, undercover work, SWAT training, divisional administration and in-house legal management\n\nLegal Practice\nPrivate Attorney and Legal Instructor | 25 years\n● Successful private attorney and legal instructor in both criminal law and legal liability\n\nTeaching Experience\nSantiago Canyon College | Palomar College | Westwood College\nInstructor | Assistant Chair to Criminal Justice\n● Instructed criminal law and related criminal justice courses\n\nUS Virgin Islands\nInstructor\n● Taught legal courses after retirement from law enforcement and legal practice", 
        expertise: ["Criminal Law", "Legal Liability", "Criminal Justice", "Law Enforcement", "Street Policing", "Undercover Work", "SWAT Training", "Divisional Administration", "In-house Legal Management"],
        phone: "(213) 674-7174",
        email: "jchandler@paucal.org",
        category: "Faculty",
        photoUrl: "/images/faculty-john-chandler.jpg"
      },
      { 
        name: "Hyun Joo Kang", 
        credential: "S.J.D.",
        title: "CEO & President", 
        education: [
          "LL.M. thesis & S.J.D., Indiana University Maurer School of Law (2010)",
          "LL.B., LL.M., Ph.D. coursework completed, Ewha Womans University"
        ], 
        bio: "Administrative Experience\nPacific American University\nPresident | 2022 – Present\n\nAcademic Experience\nKookmin University\nAdjunct Professor | 2019 – 2022\n\nProfessional Experience\nI-Sung Labor Law Firm\nSenior Advisor | 2019 – 2022\n\nKorea Labor Institute\nSenior Researcher | 1996 – 2004", 
        expertise: ["Educational Leadership", "Labor Law"],
        phone: "(213) 674-7174",
        email: "hjkang@paucal.org",
        category: "Staff",
        photoUrl: "/images/president-hyun-joo-kang.jpg"
      },
      { 
        name: "Phillip Bohl", 
        credential: "J.D., M.L.I.S.",
        title: "Associate Dean of the School of Law", 
        education: [
          "J.D., Pepperdine University School of Law (1992)",
          "M.L.I.S., San Jose State University (1999)",
          "B.A., Oral Roberts University (1989)"
        ], 
        bio: "Qualifications\n● Attorney Licensed in California\n\nAdministrative Experience\nPepperdine University School of Law\nAssistant Dean, Legal Technology Initiatives | 2023 – 2024\nAssistant Dean, Information Services | 2012 – 2023\nDirector of Information Services | 2001 – 2012", 
        expertise: ["Legal Technology", "Information Services"],
        phone: "(213) 674-7174",
        email: "pbohl@paucal.org",
        category: "Staff",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "Nam Hwan Jung", 
        credential: "Ed.D.",
        title: "Dean of Admissions", 
        education: [
          "Ed.D., LaSalle University Graduate School (1997)",
          "M.A., Dankook University Graduate School (1995)",
          "B.A., Kyungpook National University (1977)"
        ], 
        bio: "Administrative Experience\nKorea Admissions Research Institute\nDirector | 2000 – Present\n\nAcademic Experience\nHoseo University\nProfessor | 1999 – 2022\nAdmissions Officer | 2016 – 2022", 
        expertise: ["Admissions Management", "Higher Education"],
        phone: "(213) 674-7174",
        email: "nhjung@paucal.org",
        category: "Staff",
        photoUrl: "/images/admin-nam-hwan-jung.jpg"
      },
      { 
        name: "Joyee J. Jea", 
        credential: "J.D., LL.M.",
        title: "IT and Marketing Director", 
        education: [
          "LL.M., Regent University School of Law (2017)",
          "J.D., Handong International Law School (2017)",
          "B.A., Mechanical Engineering and Electronic Engineering, Handong Global University (2007)"
        ], 
        bio: "Professional Experience\nSeoul National University of Science and Tech. IACF\nMarketing Manager | 2024\n\nSungkyunkwan University Startup Center\nLab Startup Innovator | 2023\n\nNovick, Kim & Lee PLLC\nPatent Agent | 2013 – 2014", 
        expertise: ["Digital Marketing", "IT Systems"],
        phone: "(213) 674-7174",
        email: "jjea@paucal.org",
        category: "Staff",
        photoUrl: "/images/admin-joyee-jea.jpg"
      }
    ] 
  });

  const [academicsContent, setAcademicsContent] = useState({ 
    title: 'Academics', 
    intro: 'Rigorous legal training for the next generation of advocates.',
    programsTitle: 'Degree Programs',
    programs: [
      { name: 'Juris Doctor (JD)', description: 'A 4-year online program registered with the State Bar of California.' },
      { name: 'Master of Laws (LLM)', description: 'Advanced specialized legal study for international attorneys.' }
    ],
    concentrationsTitle: 'Concentrations',
    concentrations: ['Technology Law', 'Criminal Law', 'Business Law', 'Public Interest']
  });

  const shared: SharedContent = DEFAULT_SHARED_CONTENT;

  useEffect(() => {
    const handleTranslation = async () => {
      // Don't translate on initial mount if already English
      if (currentLang === 'English' && prevLangRef.current === 'English') return;
      
      setIsTranslating(true);
      
      // Helper to translate safely
      const translateSafe = async <T extends unknown>(content: T, lang: SupportedLanguage, sectionName: string): Promise<T> => {
        try {
          console.log(`[Translation] Starting translation for ${sectionName} to ${lang}`);
          const result = await translateContent(content, lang);
          console.log(`[Translation] Successfully translated ${sectionName}`);
          return result;
        } catch (e) {
          console.error(`[Translation] Failed to translate ${sectionName} to ${lang}:`, e);
          return content; // Fallback to original content on error
        }
      };

      try {
        // Execute translations sequentially to prevent rate limiting (429 Errors)
        // 1. Core Home Content
        const translatedHome = await translateSafe(homeContent, currentLang, 'Home Content');
        setHomeContent(translatedHome);

        // 2. Admissions
        const translatedAdmissions = await translateSafe(admissionsContent, currentLang, 'Admissions');
        setAdmissionsContent(translatedAdmissions);

        // 3. Academics
        const translatedAcademics = await translateSafe(academicsContent, currentLang, 'Academics');
        setAcademicsContent(translatedAcademics);

        // 4. Faculty (Can be large)
        const translatedFaculty = await translateSafe(facultyContent, currentLang, 'Faculty');
        setFacultyContent(translatedFaculty);

        // 5. Notices
        const translatedNotices = await translateSafe(noticesContent, currentLang, 'Notices');
        setNoticesContent(translatedNotices);

        // 6. Weekly Dicta (HTML content)
        const translatedWeeklyDicta = await translateSafe(weeklyDictaContent, currentLang, 'Weekly Dicta');
        setWeeklyDictaContent(translatedWeeklyDicta);

        console.log(`[Translation] All translations completed for ${currentLang}`);
      } catch (err) {
        console.error("[Translation] Translation process failed:", err);
        // Show user-friendly error message
        setGlobalAlert({
          active: true,
          message: `Translation to ${currentLang} failed. Please try again or refresh the page.`,
          type: 'error'
        });
      } finally {
        setIsTranslating(false);
        prevLangRef.current = currentLang;
      }
    };
    handleTranslation();
  }, [currentLang]);

  const handleNavigate = (page: Page) => {
    // Use startTransition to make navigation non-blocking
    startTransition(() => {
      setCurrentPage(page);
      setSelectedClinic(null);
      setSelectedNews(null);
    });
    // Defer scroll to next frame to avoid blocking
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const renderContent = () => {
    if (currentPage === 'admin') {
      return (
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
          globalAlert={globalAlert}
          setGlobalAlert={setGlobalAlert}
        />
      );
    }

    if (selectedNews) {
      return <NewsDetail item={selectedNews} onBack={() => setSelectedNews(null)} shared={shared} />;
    }
    if (selectedClinic) {
      return <ClinicDetail clinic={selectedClinic} onBack={() => setSelectedClinic(null)} shared={shared} />;
    }

    switch (currentPage) {
      // --- HOME & MAIN SECTIONS ---
      case 'home':
        return (
          <>
            <Hero content={homeContent} shared={shared} onNavigate={handleNavigate} />
            <InfoSection content={homeContent} shared={shared} onClinicClick={setSelectedClinic} onNavigate={handleNavigate} />
            <HomeNews title={homeContent.newsTitle} newsItems={homeContent.latestNews} onNewsClick={setSelectedNews} onNavigate={handleNavigate} shared={shared} />
          </>
        );

      // --- ABOUT SECTION PAGES ---
      case 'history-mission':
        return (
          <>
            <PageHeader title={"Mission &\nIdentity"} subtitle="Nurturing impactful leaders for a global society." icon={GlobeAmericasIcon} />
            
            {/* Mission Statement Section */}
            <SectionWrapper>
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-pau-darkBlue to-pau-blue p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-pau-gold opacity-5 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-pau-gold rounded-full flex items-center justify-center mr-4">
                        <GlobeAmericasIcon className="h-8 w-8 text-pau-darkBlue" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">Our Mission</h2>
                    </div>
                    
                    <blockquote className="text-lg md:text-2xl text-white leading-relaxed font-light italic border-l-4 border-pau-gold pl-6">
                      The mission of Pacific American University ("PAU") is to nurture impactful, balanced-minded leaders, who are equipped to resolve complex global issues, making a positive impact on the growth of a healthy and inclusive society through a student-centered academic community and programs.
                    </blockquote>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Core Values Section */}
            <SectionWrapper title="Our Core Values">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Value 1 */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-pau-gold transition-all duration-300 group">
                    <div className="w-14 h-14 bg-pau-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-pau-gold transition-colors">
                      <svg className="w-7 h-7 text-pau-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Student-Centered</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We prioritize individual student growth and success through personalized support and flexible learning pathways.
                    </p>
                  </div>

                  {/* Value 2 */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-pau-gold transition-all duration-300 group">
                    <div className="w-14 h-14 bg-pau-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-pau-gold transition-colors">
                      <svg className="w-7 h-7 text-pau-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Global Perspective</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We foster understanding of international legal systems and prepare students to address complex global challenges.
                    </p>
                  </div>

                  {/* Value 3 */}
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-pau-gold transition-all duration-300 group">
                    <div className="w-14 h-14 bg-pau-light rounded-xl flex items-center justify-center mb-6 group-hover:bg-pau-gold transition-colors">
                      <svg className="w-7 h-7 text-pau-blue group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Inclusive Excellence</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We cultivate a diverse and welcoming community that values every perspective and promotes equitable access to legal education.
                    </p>
                  </div>
                </div>
              </div>
            </SectionWrapper>

            {/* Institutional Status Section */}
            <SectionWrapper title="Institutional Status">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-12 rounded-3xl shadow-xl border-2 border-gray-200 relative">
                  <div className="absolute -top-6 left-8">
                    <div className="bg-pau-darkBlue px-6 py-3 rounded-full shadow-lg">
                      <span className="text-xs font-bold text-pau-gold uppercase tracking-widest">Official Designation</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                      Pacific American University School of Law is registered with the Committee of Bar Examiners of the State Bar of California as a{' '}
                      <span className="font-bold text-pau-darkBlue bg-pau-light px-3 py-1 rounded">Registered Unaccredited Correspondence Law School</span>.
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
                      PAUSL is not accredited by the State Bar of California or the American Bar Association.
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-500 italic">
                        This designation reflects our commitment to transparency and compliance with California legal education requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'president-welcome':
        return (
          <>
            <PageHeader title={"President's\nWelcome"} subtitle="A strategic vision for legal leaders." icon={UserIcon} />
            <SectionWrapper>
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
                  <div className="w-full sm:w-2/3 md:w-1/3 flex-shrink-0">
                    <div className="w-full aspect-[3/4] bg-gray-200 rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl relative">
                      <img 
                        src="/images/president-hyun-joo-kang.jpg" 
                        alt="Hyun Joo Kang" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pau-darkBlue/90 to-transparent p-6 md:p-8">
                         <div className="flex items-baseline gap-2">
                           <p className="text-white font-serif font-bold text-lg md:text-xl leading-tight">Hyun Joo Kang</p>
                           <span className="text-sm text-gray-300 italic">S.J.D.</span>
                         </div>
                         <p className="text-pau-gold text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-1">President, PAU</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-pau-darkBlue leading-tight mb-6 md:mb-10">
                      Welcome to Pacific American University.
                    </h2>
                    <div className="prose prose-sm md:prose-lg text-gray-600 leading-relaxed font-light space-y-4 md:space-y-6">
                      <p>Our mission is to lower barriers to legal education through innovation. We believe professional legal training should be accessible regardless of geographic location.</p>
                      <p>By merging American-style instruction with flexible delivery, we prepare students for success in the evolving legal landscape.</p>
                      <div className="pt-6 md:pt-8 border-t border-gray-100">
                        <div className="flex items-baseline gap-3">
                          <p className="font-serif text-2xl md:text-3xl text-pau-blue">Hyun Joo Kang</p>
                          <span className="text-lg text-gray-500 italic">S.J.D.</span>
                        </div>
                        <p className="text-[10px] md:text-xs font-bold text-pau-gold uppercase tracking-[0.2em] mt-2">President & CEO, PAU</p>
                      </div>
                    </div>
                  </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'dean-message':
        return (
          <GenericPage
            title="Dean's Message"
            subtitle="Academic leadership committed to student outcomes."
            icon={AcademicCapIcon}
            content={
              <>
                <p className="lead">To the Future Advocates of Tomorrow,</p>
                <p>Welcome to Pacific American University School of Law. As Dean, I am honored to lead an institution that is reshaping the landscape of legal education.</p>
                <p>We are not just an online law school; we are a community of scholars, practitioners, and students united by a common goal: to master the law and use it to effect positive change. Our curriculum is rigorous, designed to challenge you and prepare you for the realities of modern legal practice.</p>
                <p>Whether you aspire to practice in a courtroom, a corporate boardroom, or a public interest organization, your journey starts here. We are committed to providing you with the tools, mentorship, and opportunities you need to succeed.</p>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <p className="font-bold text-pau-darkBlue text-xl font-serif">Elena Rodriguez</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Dean, School of Law</p>
                </div>
              </>
            }
          />
        );

      case 'school-form':
        return (
          <>
            <PageHeader title={"School\nForms"} subtitle="Streamlining your administrative needs." icon={ClipboardDocumentListIcon} />
            <SectionWrapper title="Administrative Requests">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
                  <DocumentLink title="Application for Admission" />
                  <DocumentLink title="Transcript Request Form" />
                  <DocumentLink title="Notice of Cancellation / Withdrawal" />
                  <DocumentLink title="Credit Card Authorization Form" />
                  <DocumentLink title="Grade Appeal Petition" />
                  <DocumentLink title="Leave of Absence Request" />
               </div>
            </SectionWrapper>
          </>
        );

      case 'faqs':
        return (
          <>
            <PageHeader title={"Frequently Asked\nQuestions"} subtitle="Expert answers to your queries." icon={QuestionMarkCircleIcon} />
            <SectionWrapper>
               <div className="max-w-4xl mx-auto space-y-6 md:space-y-10">
                  {[
                    { 
                      q: "Is the school accredited?", 
                      a: "Pacific American University School of Law is registered as an Unaccredited Correspondence Law School with the Committee of Bar Examiners of the State Bar of California." 
                    },
                    { 
                      q: "Can I take the Bar Exam?", 
                      a: "Graduates are eligible to sit for the California Bar Examination, provided they meet all other State Bar requirements." 
                    },
                    {
                      q: "What technical equipment do I need?",
                      a: "Students must have a computer with reliable high-speed internet access, a webcam, and a microphone to participate in live sessions and access course materials."
                    },
                    {
                      q: "Is financial aid available?",
                      a: "PAU offers competitive tuition rates and flexible payment plans. We do not participate in federal financial aid programs (Title IV) at this time."
                    }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[40px] shadow-premium border border-gray-50">
                      <h4 className="text-lg md:text-2xl font-serif font-bold text-pau-blue mb-4">
                        <span className="text-pau-gold mr-3">Q.</span>{faq.q}
                      </h4>
                      <p className="text-sm md:text-lg text-gray-600 leading-relaxed font-light pl-8 border-l-2 border-pau-gold/20">
                        {faq.a}
                      </p>
                    </div>
                  ))}
               </div>
            </SectionWrapper>
          </>
        );

      case 'bar-reg':
        return (
          <>
            <PageHeader title={"Bar\nRegistration"} subtitle="Official status in California." icon={ShieldCheckIcon} />
            <SectionWrapper title="Approval & Registration">
               <div className="max-w-4xl mx-auto">
                  <div className="bg-white p-6 md:p-12 rounded-2xl md:rounded-[50px] border-l-4 md:border-l-[12px] border-pau-gold shadow-premium">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-pau-blue mb-4">Committee Status</h3>
                    <p className="text-sm md:text-xl text-gray-600 leading-relaxed font-light">
                      Pacific American University School of Law is registered with the Committee of Bar Examiners as an Unaccredited Correspondence Law School.
                    </p>
                  </div>
                  <div className="mt-12 text-gray-600 leading-relaxed">
                    <p className="mb-4">
                      The method of instruction at this law school for the Juris Doctor (J.D.) degree program is principally by correspondence.
                    </p>
                    <p>
                      Students studying at this law school who successfully complete the first-year law study must pass the First-Year Law Students' Examination required by Business and Professions Code §6060(h) and Rule 4.3(I) of the Rules of the State Bar of California as part of the requirements to qualify to take the California Bar Examination. A student who passes the First-Year Law Students' Examination within three (3) administrations of the examination after first becoming eligible to take it will receive credit for all legal studies completed to the time the examination is passed. A student who does not pass the examination within three (3) administrations of the examination after first becoming eligible to take it must be promptly disqualified from the law school's J.D. degree program. If the dismissed student subsequently passes the examination, the student is eligible for re-enrollment in this law school's J.D. degree program, but will receive no credit for any legal studies completed prior to the time of passing the examination.
                    </p>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'disclosure':
        return (
          <>
            <PageHeader title={"Disclosure"} subtitle="Transparency in our educational offering." icon={DocumentDuplicateIcon} />
            <SectionWrapper>
              <div className="max-w-4xl mx-auto space-y-8">
                 <p className="text-lg text-gray-700 leading-relaxed">
                   Pacific American University School of Law makes the following disclosures as required by the State Bar of California Guidelines for Unaccredited Law School Rules.
                 </p>
                 <div className="p-8 bg-gray-50 border-l-4 border-pau-darkBlue">
                   <h3 className="font-bold text-pau-darkBlue mb-4">Guideline 2.3(D) Compliance</h3>
                   <p className="text-sm text-gray-600">
                     The law school has not applied for accreditation in the last five years. The school’s assets and resources are primarily dedicated to providing distance legal education.
                   </p>
                 </div>
                 <a href="#" className="inline-flex items-center text-pau-gold font-bold uppercase tracking-widest text-xs hover:underline">
                   Download Full Disclosure Statement <ArrowRightIcon className="ml-2 h-4 w-4" />
                 </a>
              </div>
            </SectionWrapper>
          </>
        );

      case 'catalog':
        return (
          <>
             <PageHeader title={"School\nCatalog"} subtitle="Complete guide to policies and programs." icon={BookOpenIcon} />
             <SectionWrapper>
               <div className="max-w-4xl mx-auto flex flex-col items-center">
                  <div className="w-48 h-64 bg-gray-200 shadow-2xl mb-10 flex items-center justify-center rounded-r-2xl border-l-8 border-pau-darkBlue relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-500">
                     <div className="absolute inset-0 bg-gradient-to-br from-pau-blue to-pau-darkBlue"></div>
                     <div className="relative z-10 text-center text-white p-4">
                       <span className="block text-4xl font-serif font-bold mb-2">2025</span>
                       <span className="text-[10px] uppercase tracking-[0.2em] block">Academic Catalog</span>
                     </div>
                  </div>
                  <button className="bg-pau-gold text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-pau-darkBlue transition-colors shadow-lg">
                    Download PDF Catalog
                  </button>
               </div>
             </SectionWrapper>
          </>
        );

      case 'admin-staffs':
      case 'faculty':
        return (
          <Faculty content={facultyContent} shared={shared} currentPage={currentPage} onNavigate={handleNavigate} />
        );

      case 'consumer-info':
        return <ConsumerInfo content={{
          title: "Consumer Information",
          intro: "Essential data regarding our academic program, student body, and outcomes.",
          sections: [
            {
              id: "student-body",
              title: "Student Body Diversity",
              content: "PAU Law is committed to fostering a diverse academic environment. As a newly established program starting in 2026, historical student data is not yet available.",
              tableData: [
                { label: "Female Students", value: "N/A (New Program)" },
                { label: "Male Students", value: "N/A (New Program)" },
                { label: "Non-Binary / Other", value: "N/A (New Program)" },
                { label: "Minority Representation", value: "N/A (New Program)" }
              ]
            },
            {
              id: "refund-policy",
              title: "Refund Policy",
              content: "A student is entitled to receive a full refund of all payments made if they withdraw or cancel their enrollment within seven (7) days, by midnight (PST), from the date the Enrollment Agreement was signed.\n\nIf a student withdraws after instruction has begun, they are eligible for a prorated refund based on the unused portion of tuition and other refundable charges. Refundable tuition and fees refer to the remaining tuition and fees charged after deducting non-refundable fees that have already been retained."
            },
            {
              id: "disclosure",
              title: "Disclosure",
              subtitle: "Transparency in our educational offering.",
              content: "Pacific American University School of Law makes the following disclosures as required by the State Bar of California Guidelines for Unaccredited Law School Rules.\n\nGuideline 2.3(D) Compliance\nThe law school has not applied for accreditation in the last five years. The school's assets and resources are primarily dedicated to providing distance legal education.",
              hasDownloadButton: true
            }
          ]
        }} />;

      // --- ACADEMICS SECTIONS ---
      case 'academics':
      case 'curriculum-schedule':
      case 'bar-info':
      case 'course-desc':
      case 'counseling':
      case 'grad-reqs':
        return (
          <Academics content={academicsContent} onNavigate={handleNavigate} currentPage={currentPage} />
        );

      case 'centers':
      case 'student-resources':
        return <StudentResources 
          title="Student Success & Resources"
          subtitle="Comprehensive support systems designed to ensure academic achievement and professional growth."
          resources={[
            {
              title: "Academic Success Program (ASP)",
              description: "A dedicated program designed to support students in mastering legal concepts and improving exam performance. It includes mandatory sessions for students on academic probation and offers personalized guidance on legal writing, case analysis, and MBE strategies.",
              icon: "academic"
            },
            {
              title: "Online Legal Research (Westlaw & CALI)",
              description: "All students receive full access to Westlaw, the world's leading online legal research service, and a membership to CALI (Center for Computer-Assisted Legal Instruction), providing over 1,300 interactive tutorials across 32 legal subject areas.",
              icon: "research"
            },
            {
              title: "Delta Theta Phi Law Fraternity",
              description: "PAUSL hosts a chapter of Delta Theta Phi, one of the nation's oldest legal fraternities. Members gain access to a global network of legal professionals, leadership opportunities, and eligibility for scholarships and awards.",
              icon: "fraternity"
            }
          ]}
        />;
      
      case 'library':
        return <Library content={{
          title: "Law Library",
          intro: "Your gateway to comprehensive legal research resources.",
          sections: [
            { title: "Digital Collections", content: "Access Westlaw, LexisNexis, and HeinOnline from anywhere 24/7." },
            { title: "Research Guides", content: "Curated pathfinders for specific areas of law including Torts, Contracts, and Civil Procedure." },
            { title: "Reference Support", content: "Schedule a Zoom consultation with our reference librarians for research strategy assistance." }
          ]
        }} shared={shared} />;

      case 'academic-calendar':
        return <Calendar content={{
          title: "Academic Calendar",
          intro: "Key dates and deadlines for the 2026-2027 academic year.",
          events: [
            { date: "Aug 25, 2026", event: "Fall Semester Begins", type: "Academic" },
            { date: "Sept 7, 2026", event: "Labor Day (No Classes)", type: "Holiday" },
            { date: "Nov 26-27, 2026", event: "Thanksgiving Break", type: "Holiday" },
            { date: "Dec 14-18, 2026", event: "Final Examinations", type: "Exam" }
          ]
        }} shared={shared} />;

      // --- ADMISSIONS SECTIONS ---
      case 'admissions':
      case 'apply-now':
        return <Admissions content={admissionsContent} shared={shared} />;
      
      case 'careers':
        return <Careers content={{
          title: "Career Services",
          intro: "Empowering you to launch a successful legal career.",
          stats: [
             { label: "Employment Rate", value: "92%" },
             { label: "Bar Pass Rate", value: "85%" },
             { label: "Alumni Network", value: "2000+" }
          ],
          services: [
            { title: "Resume & Cover Letter Review", description: "Expert feedback to make your application materials stand out." },
            { title: "Mock Interviews", description: "Practice your interview skills with practicing attorneys." }
          ]
        }} />;

      case 'notices':
        return <NoticeBoard content={noticesContent} onNewsClick={setSelectedNews} shared={shared} />;
      
      case 'weekly-dicta':
        return <HomeNews title={weeklyDictaContent.title} newsItems={weeklyDictaContent.notices} onNewsClick={setSelectedNews} onNavigate={handleNavigate} shared={shared} />;

      // --- TUITION & OTHER ---
      case 'tuition-fees':
        return (
          <>
            <PageHeader title={"Tuition &\nCosts"} subtitle="Transparent pricing for your legal education." icon={CurrencyDollarIcon} />
            <SectionWrapper title="Schedule of Charges">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-12">
                  <div className="bg-pau-blue p-6 text-white text-center">
                    <h3 className="text-xl font-bold font-serif uppercase tracking-widest">2026-2027 Academic Year</h3>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-y-6 text-sm md:text-base">
                      <div className="font-bold text-pau-darkBlue">Tuition (per unit)</div>
                      <div className="text-right text-gray-600 font-mono">$300.00</div>
                      <div className="col-span-2 h-px bg-gray-100"></div>
                      
                      <div className="font-bold text-pau-darkBlue">Registration Fee (per semester)</div>
                      <div className="text-right text-gray-600 font-mono">$50.00</div>
                      <div className="col-span-2 h-px bg-gray-100"></div>

                      <div className="font-bold text-pau-darkBlue">Student Services Fee</div>
                      <div className="text-right text-gray-600 font-mono">$100.00</div>
                      <div className="col-span-2 h-px bg-gray-100"></div>

                      <div className="font-bold text-pau-darkBlue">Library Access Fee</div>
                      <div className="text-right text-gray-600 font-mono">$150.00</div>
                      
                      <div className="col-span-2 mt-6 p-4 bg-green-50 rounded-lg flex justify-between items-center border border-green-100">
                        <span className="font-bold text-green-800 uppercase tracking-wide">Estimated Annual Total (24 Units)</span>
                        <span className="font-bold text-xl text-green-700 font-mono">$7,800.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center">* Tuition and fees are subject to change. Books and supplies are not included.</p>
              </div>
            </SectionWrapper>
          </>
        );

      case 'payment-plan':
        return (
          <>
            <PageHeader title={"Payment\nPlans"} subtitle="Flexible options to manage your investment." icon={CreditCardIcon} />
            <SectionWrapper title="Financial Options">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Pay in Full", desc: "Pay the full semester tuition upfront.", detail: "0% Interest", note: "Best Value" },
                  { title: "Monthly Installments", desc: "Divide tuition into 4 monthly payments per semester.", detail: "$50 Setup Fee", note: "Most Popular" },
                  { title: "Employer Deferral", desc: "Defer payment until 30 days after grades are posted.", detail: "Company Sponsorship", note: "For Working Pros" }
                ].map((plan, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-xl hover:border-pau-gold transition-all group">
                    <div className="w-12 h-12 bg-pau-light rounded-full flex items-center justify-center mb-6 group-hover:bg-pau-blue group-hover:text-white transition-colors">
                      <CreditCardIcon className="h-6 w-6 text-pau-blue group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-pau-darkBlue mb-2 font-serif">{plan.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 min-h-[40px]">{plan.desc}</p>
                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                      <span className="font-bold text-pau-gold text-xs uppercase tracking-wider">{plan.detail}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold rounded">{plan.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </>
        );

      case 'refund-policy':
        return (
          <>
            <PageHeader title={"Refund\nPolicy"} subtitle="Fair and transparent withdrawal guidelines." icon={DocumentCheckIcon} />
            <SectionWrapper title="Withdrawal & Cancellations">
              <div className="max-w-4xl mx-auto space-y-10">
                <div className="p-8 bg-blue-50 border-l-4 border-pau-blue rounded-r-xl">
                  <h3 className="font-bold text-pau-blue mb-2 text-lg">Buyer's Right to Cancel</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You have the right to cancel this agreement and obtain a refund of charges paid through attendance at the first class session, or the seventh day after enrollment, whichever is later.
                  </p>
                </div>
                
                <div className="bg-white p-8 border border-gray-200 rounded-2xl">
                  <h4 className="font-bold text-pau-darkBlue mb-6 text-xl font-serif">Pro-Rata Refund Schedule</h4>
                  <div className="space-y-4">
                    {[
                      { time: "Before 1st day of class", refund: "100%" },
                      { time: "1st week of class (Drop/Add)", refund: "100%" },
                      { time: "Through 25% of the term", refund: "75%" },
                      { time: "Through 50% of the term", refund: "50%" },
                      { time: "Through 60% of the term", refund: "25%" },
                      { time: "After 60% of the term", refund: "0%" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded transition-colors">
                        <span className="text-gray-600 font-medium">{item.time}</span>
                        <span className="font-bold text-pau-darkBlue">{item.refund}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'tuition':
        return (
          <>
             <PageHeader title={"Tuition &\nFinancial Services"} subtitle="Investing in your future with transparent costs." icon={BanknotesIcon} />
             <SectionWrapper>
               <div className="max-w-4xl mx-auto space-y-12">
                  <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
                     <div className="flex-shrink-0 p-6 bg-green-50 rounded-full">
                       <CurrencyDollarIcon className="h-12 w-12 text-green-600" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-pau-darkBlue mb-2">J.D. Program Tuition</h3>
                       <p className="text-gray-600 leading-relaxed mb-4">
                         Tuition is charged on a per-unit basis. The current rate is <span className="font-bold text-green-700">$300 per unit</span>.
                       </p>
                       <p className="text-sm text-gray-500">Estimated annual tuition for a full-time student (24 units): <span className="font-bold text-gray-800">$7,200</span>.</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <button onClick={() => handleNavigate('payment-plan')} className="text-left bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-pau-gold hover:shadow-md transition-all group">
                        <h4 className="font-bold text-pau-blue mb-4 flex items-center group-hover:text-pau-gold transition-colors">
                          <CreditCardIcon className="h-5 w-5 mr-2" /> Payment Options
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                          <li>• Pay in full per semester</li>
                          <li>• Monthly installment plan (4 payments/semester)</li>
                          <li>• Employer reimbursement deferment</li>
                        </ul>
                     </button>
                     <button onClick={() => handleNavigate('refund-policy')} className="text-left bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-pau-gold hover:shadow-md transition-all group">
                        <h4 className="font-bold text-pau-blue mb-4 flex items-center group-hover:text-pau-gold transition-colors">
                          <DocumentCheckIcon className="h-5 w-5 mr-2" /> Refund Policy
                        </h4>
                        <p className="text-sm text-gray-600">
                          100% refund if withdrawn by the 1st week of classes. Prorated refunds available up to the 60% point of the semester.
                        </p>
                     </button>
                  </div>
               </div>
             </SectionWrapper>
          </>
        );

      case 'office-hours':
        return (
          <>
            <PageHeader title={"Office\nHours"} subtitle="We are available to assist you during these times." icon={ClockIcon} />
            <SectionWrapper title="Operating Schedule">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { dept: "General Administration", hours: ["Mon-Fri: 9:00 AM - 5:00 PM PST", "Sat-Sun: Closed"], icon: BuildingOffice2Icon },
                    { dept: "Admissions Office", hours: ["Mon-Fri: 8:00 AM - 6:00 PM PST", "Sat: By Appointment Only"], icon: UserGroupIcon },
                    { dept: "Registrar & Records", hours: ["Mon-Thu: 10:00 AM - 4:00 PM PST", "Fri: 10:00 AM - 2:00 PM PST"], icon: ClipboardDocumentListIcon },
                    { dept: "IT Support Helpdesk", hours: ["Mon-Sun: 7:00 AM - 10:00 PM PST", "Online Ticket: 24/7"], icon: ComputerDesktopIcon },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-pau-blue transition-colors">
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-pau-light text-pau-blue rounded-lg mr-4">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-pau-darkBlue">{item.dept}</h3>
                      </div>
                      <ul className="space-y-3">
                        {item.hours.map((h, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                             <ClockIcon className="h-4 w-4 mr-2 mt-0.5 text-pau-gold" />
                             {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-xs text-center rounded-lg border border-blue-100">
                  * Note: All times are in Pacific Standard Time (PST). Office hours may vary during holidays and semester breaks.
                </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'contact-info':
        return (
          <>
            <PageHeader title={"Contact\nInformation"} subtitle="Reach out to the right department." icon={PhoneIcon} />
            <SectionWrapper>
               <div className="max-w-5xl mx-auto">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    <div className="lg:col-span-1 bg-white p-8 rounded-2xl border border-gray-100 shadow-lg h-fit">
                       <h3 className="text-sm font-bold text-pau-gold uppercase tracking-widest mb-6">Mailing Address</h3>
                       <div className="flex items-start text-gray-700 mb-8">
                          <MapPinIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-pau-blue" />
                          <div>
                            <p className="font-bold text-pau-darkBlue">Pacific American University</p>
                            <p>School of Law</p>
                            <p>123 University Drive</p>
                            <p>Santa Clara, CA 95050</p>
                          </div>
                       </div>
                       <h3 className="text-sm font-bold text-pau-gold uppercase tracking-widest mb-6">Main Line</h3>
                       <div className="flex items-center text-gray-700">
                          <PhoneIcon className="h-5 w-5 mr-3 text-pau-blue" />
                          <p className="font-bold">(408) 555-0199</p>
                       </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                       <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-8">Department Directory</h3>
                       <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                          {[
                            { name: "Admissions Office", email: "admissions@pau.edu", phone: "Ext. 101" },
                            { name: "Registrar's Office", email: "registrar@pau.edu", phone: "Ext. 102" },
                            { name: "Student Services", email: "studentservices@pau.edu", phone: "Ext. 103" },
                            { name: "Financial Aid", email: "finance@pau.edu", phone: "Ext. 104" },
                            { name: "Technical Support", email: "support@pau.edu", phone: "Ext. 200" },
                            { name: "Law Library", email: "library@pau.edu", phone: "Ext. 300" },
                          ].map((dept, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                               <div className="mb-2 sm:mb-0">
                                 <h4 className="font-bold text-pau-darkBlue">{dept.name}</h4>
                               </div>
                               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                                  <a href={`mailto:${dept.email}`} className="flex items-center hover:text-pau-blue transition-colors">
                                    <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" /> {dept.email}
                                  </a>
                                  <span className="flex items-center">
                                    <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" /> {dept.phone}
                                  </span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 {/* Map Placeholder */}
                 <div className="w-full h-80 bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200">
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                      alt="Map Location" 
                      className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <button className="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-pau-blue flex items-center hover:scale-105 transition-transform">
                          <MapPinIcon className="h-5 w-5 mr-2 text-red-500" /> View on Google Maps
                       </button>
                    </div>
                 </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'request-info':
        return (
          <>
             <PageHeader title={"Request\nInformation"} subtitle="Tell us how we can help you." icon={InboxArrowDownIcon} />
             <SectionWrapper>
                <div className="max-w-4xl mx-auto">
                   <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                     <div className="text-center mb-10">
                       <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-4">Send us a Message</h3>
                       <p className="text-gray-500">Fill out the form below and our team will get back to you within 24 hours.</p>
                     </div>
                     <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">First Name</label>
                             <input type="text" className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-pau-blue/20 focus:border-pau-blue transition-all" placeholder="Jane" />
                           </div>
                           <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Last Name</label>
                             <input type="text" className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-pau-blue/20 focus:border-pau-blue transition-all" placeholder="Doe" />
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email Address</label>
                             <input type="email" className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-pau-blue/20 focus:border-pau-blue transition-all" placeholder="jane@example.com" />
                          </div>
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Inquiry Type</label>
                             <select className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-pau-blue/20 focus:border-pau-blue transition-all text-gray-600">
                                <option>General Admission</option>
                                <option>Program Details (J.D.)</option>
                                <option>Tuition & Financial Aid</option>
                                <option>Technical Issue</option>
                                <option>Other</option>
                             </select>
                          </div>
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Message</label>
                           <textarea rows={5} className="w-full p-4 border border-gray-200 bg-gray-50 rounded-xl focus:bg-white focus:ring-2 focus:ring-pau-blue/20 focus:border-pau-blue transition-all" placeholder="How can we assist you today?"></textarea>
                        </div>
                        <div className="flex justify-end">
                          <button className="bg-pau-gold text-white px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-pau-darkBlue transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Submit Inquiry
                          </button>
                        </div>
                     </form>
                  </div>
                </div>
             </SectionWrapper>
          </>
        );

      case 'contact':
        return (
          <>
            <PageHeader title={"Contact\nUs"} subtitle="We are here to assist you." icon={PhoneIcon} />
            <SectionWrapper>
               <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                     <button onClick={() => handleNavigate('office-hours')} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-pau-blue/30 transition-all group text-left">
                        <div className="w-12 h-12 bg-blue-50 text-pau-blue rounded-xl flex items-center justify-center mb-6 group-hover:bg-pau-blue group-hover:text-white transition-colors">
                           <ClockIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-pau-darkBlue mb-2 font-serif">Office Hours</h3>
                        <p className="text-gray-500 text-sm mb-4">View operating hours for all university departments.</p>
                        <span className="text-xs font-bold text-pau-gold uppercase tracking-wider group-hover:underline">View Schedule &rarr;</span>
                     </button>

                     <button onClick={() => handleNavigate('contact-info')} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-pau-blue/30 transition-all group text-left">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                           <BuildingOffice2Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-pau-darkBlue mb-2 font-serif">Department Directory</h3>
                        <p className="text-gray-500 text-sm mb-4">Find direct contact information for Admissions, IT, and more.</p>
                        <span className="text-xs font-bold text-pau-gold uppercase tracking-wider group-hover:underline">Browse Directory &rarr;</span>
                     </button>

                     <button onClick={() => handleNavigate('request-info')} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-pau-blue/30 transition-all group text-left">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                           <InboxArrowDownIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-pau-darkBlue mb-2 font-serif">Send a Message</h3>
                        <p className="text-gray-500 text-sm mb-4">Have a specific question? Submit an inquiry form directly.</p>
                        <span className="text-xs font-bold text-pau-gold uppercase tracking-wider group-hover:underline">Start Inquiry &rarr;</span>
                     </button>
                  </div>

                  <div className="bg-pau-darkBlue rounded-3xl p-12 text-center text-white relative overflow-hidden">
                     <div className="relative z-10">
                       <h2 className="text-3xl font-serif font-bold mb-6">Need Immediate Assistance?</h2>
                       <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                         Our admissions team is available to answer your questions by phone during regular business hours.
                       </p>
                       <a href="tel:+14085550199" className="inline-flex items-center bg-white text-pau-darkBlue px-8 py-4 rounded-full font-bold text-lg hover:bg-pau-gold hover:text-white transition-colors shadow-lg">
                          <PhoneIcon className="h-6 w-6 mr-3" /> (408) 555-0199
                       </a>
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'tech-reqs':
        return (
          <GenericPage
            title="Technology Requirements"
            subtitle="Ensuring you are connected for success."
            icon={ComputerDesktopIcon}
            content={
              <>
                <h3>Hardware Requirements</h3>
                <ul>
                  <li>Computer (PC or Mac) less than 4 years old</li>
                  <li>Webcam (internal or external)</li>
                  <li>Microphone and speakers (headset recommended)</li>
                  <li>Minimum 8GB RAM</li>
                </ul>
                <h3>Software & Connectivity</h3>
                <ul>
                  <li>High-speed internet connection (Broadband/Fiber recommended)</li>
                  <li>Google Chrome or Mozilla Firefox browser</li>
                  <li>Microsoft Office Suite (Student license provided)</li>
                  <li>Adobe Acrobat Reader</li>
                </ul>
              </>
            }
          />
        );
      
      case 'admission-reqs':
        return <Admissions content={admissionsContent} shared={shared} />;
      
      case 'app-steps':
        return (
          <GenericPage 
            title="Application Steps" 
            subtitle="Your roadmap to enrollment."
            icon={ClipboardDocumentListIcon}
            content={
              <ol>
                <li><strong>Submit Online Application:</strong> Complete the form via LSAC or our direct portal.</li>
                <li><strong>Request Transcripts:</strong> Have official transcripts sent from all undergraduate institutions.</li>
                <li><strong>Personal Statement:</strong> Upload a 2-3 page essay describing your motivation for studying law.</li>
                <li><strong>Letters of Recommendation:</strong> Two letters from academic or professional sources.</li>
                <li><strong>Interview:</strong> Selected candidates will be invited for a Zoom interview with the Admissions Committee.</li>
              </ol>
            }
          />
        );

      case 'transfer-int':
        return (
          <GenericPage
            title="Transfer & International"
            subtitle="Joining PAU from another institution or country."
            icon={GlobeAltIcon}
            content={
              <>
                <p>PAU welcomes transfer students from other state-accredited or ABA-accredited law schools. Transfer credit is evaluated on a case-by-case basis.</p>
                <h3>International Applicants</h3>
                <p>Applicants with degrees from outside the U.S. must have their transcripts evaluated by a credential evaluation service (e.g., WES, LSAC CAS).</p>
                <p><strong>TOEFL Requirement:</strong> Non-native English speakers must demonstrate proficiency with a minimum TOEFL score of 90 (iBT).</p>
              </>
            }
          />
        );

      default:
        // Fallback
        return (
          <div className="pt-44 pb-20 text-center">
            <h1 className="text-4xl text-gray-300 font-bold">Page Under Construction</h1>
            <p className="mt-4 text-gray-500">The requested page "{currentPage}" is currently being updated.</p>
            <button onClick={() => setCurrentPage('home')} className="mt-8 text-pau-blue hover:underline">Return Home</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {isTranslating && <TranslationOverlay lang={currentLang} />}
      
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        isTranslating={isTranslating} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        shared={shared}
        globalAlert={globalAlert}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} shared={shared} />
    </div>
  );
};

export default App;