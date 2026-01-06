import React, { useState, useTransition, Suspense, lazy } from 'react';
import { 
  Page, 
  SupportedLanguage, 
  SharedContent, 
  DEFAULT_SHARED_CONTENT, 
  MOCK_HOME_CONTENT, 
  Clinic, 
  NewsItem,
  GlobalAlert,
  AdmissionsContent,
  FacultyContent,
  AcademicsContent
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
import { Careers } from './components/Careers';
import { ConsumerInfo } from './components/ConsumerInfo';
import { TranslationOverlay } from './components/TranslationOverlay';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Lazy load heavy or rarely accessed components
const Admin = lazy(() => import('./components/Admin').then(module => ({ default: module.Admin })));
const CampusVisualizer = lazy(() => import('./components/CampusVisualizer').then(module => ({ default: module.CampusVisualizer })));
const Calendar = lazy(() => import('./components/Calendar').then(module => ({ default: module.Calendar })));
const Library = lazy(() => import('./components/Library').then(module => ({ default: module.Library })));
import { PageHeader } from './components/common/PageHeader';
import { SectionWrapper } from './components/common/SectionWrapper';
import { GenericPage } from './components/common/GenericPage';
import { DocumentLink } from './components/common/DocumentLink';
import { InfoCard } from './components/common/InfoCard';
import { StepCard } from './components/common/StepCard';
import { SectionHeader } from './components/common/SectionHeader';
import { useTranslation } from './hooks/useTranslation';
import { DEFAULT_FACULTY_CONTENT } from './data/facultyData';
import { DEFAULT_ADMISSIONS_CONTENT } from './data/admissionsData';
import { DEFAULT_ACADEMICS_CONTENT } from './data/academicsData';
import { 
  CurrencyDollarIcon, 
  BanknotesIcon, 
  CreditCardIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  GlobeAmericasIcon,
  UserIcon,
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  BookOpenIcon,
  UserGroupIcon,
  ArrowRightIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentCheckIcon,
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  InboxArrowDownIcon,
  PlusIcon,
  MinusIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [, startTransition] = useTransition();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [disclosureOpenSections, setDisclosureOpenSections] = useState<Record<number, boolean>>({});

  // Global State for Content
  const [homeContent, setHomeContent] = useState(MOCK_HOME_CONTENT);
  const [globalAlert, setGlobalAlert] = useState<GlobalAlert>({
    active: false,
    message: '',
    type: 'info'
  });

  const [admissionsContent, setAdmissionsContent] = useState<AdmissionsContent>(DEFAULT_ADMISSIONS_CONTENT);

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

  const [facultyContent, setFacultyContent] = useState<FacultyContent>(DEFAULT_FACULTY_CONTENT);

  const [academicsContent, setAcademicsContent] = useState<AcademicsContent>(DEFAULT_ACADEMICS_CONTENT);

  const shared: SharedContent = DEFAULT_SHARED_CONTENT;

  // Use translation hook
  const { isTranslating } = useTranslation({
    currentLang,
    currentPage,
    homeContent,
    setHomeContent,
    admissionsContent,
    setAdmissionsContent,
    academicsContent,
    setAcademicsContent,
    facultyContent,
    setFacultyContent,
    weeklyDictaContent,
    setWeeklyDictaContent,
    noticesContent,
    setNoticesContent,
    setGlobalAlert
  });

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
        <Suspense fallback={<LoadingSpinner message="Loading admin panel..." />}>
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
        </Suspense>
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
            title="Message from the Dean"
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
            <PageHeader title={"California State Bar\nRegistration"} subtitle="Official status in California." icon={ShieldCheckIcon} />
            <SectionWrapper>
              <div className="max-w-5xl mx-auto space-y-16">
                {/* 1. Registration Status */}
                <div className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-pau-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-white p-10 md:p-14 rounded-3xl shadow-premium border-2 border-gray-100 hover:border-pau-gold/30 transition-all duration-300">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pau-gold to-pau-goldDark rounded-2xl flex items-center justify-center shadow-lg">
                        <ShieldCheckIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-10 h-10 bg-pau-gold/10 text-pau-gold rounded-full flex items-center justify-center font-bold text-lg">1</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-pau-darkBlue">Registration Status</h2>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed pl-24">
                      <p className="font-semibold text-xl text-pau-darkBlue mb-2">Registration as a Correspondence Law School</p>
                      <p className="text-lg leading-relaxed">
                        Pacific American University School of Law (PAUSL) is a correspondence law school registered with the Committee of Bar Examiners of the State Bar of California. As a registered unaccredited correspondence law school, PAUSL has the authority to grant the Juris Doctor (J.D.) degree. Graduates of the J.D. program who fulfill the requirements of the State Bar of California are eligible to take the California Bar Examination.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Law Student Registration */}
                <div className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-pau-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-gradient-to-br from-pau-blue/5 via-pau-light to-white p-10 md:p-14 rounded-3xl shadow-lg border-2 border-pau-blue/20 hover:border-pau-blue/40 transition-all duration-300">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pau-blue to-pau-darkBlue rounded-2xl flex items-center justify-center shadow-lg">
                        <UserGroupIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-10 h-10 bg-pau-blue/10 text-pau-blue rounded-full flex items-center justify-center font-bold text-lg">2</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-pau-darkBlue">Law Student Registration</h2>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-8 pl-24">
                      <div>
                        <h3 className="font-semibold text-xl text-pau-blue mb-4 flex items-center gap-2">
                          <ClockIcon className="h-5 w-5" />
                          Mandatory Registration within 90 Days
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          All students must register with the Committee of Bar Examiners of the State Bar of California. Registration must be completed online through the State Bar's website (calbar.ca.gov) within 90 days of commencing law studies.
                        </p>
                      </div>
                      <div className="bg-white p-8 rounded-2xl border-2 border-pau-blue/30 shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="p-6 bg-gradient-to-br from-pau-blue/5 to-transparent rounded-xl border border-pau-blue/20">
                            <p className="text-xs font-bold text-pau-blue uppercase tracking-widest mb-3">Registration Fee</p>
                            <p className="text-3xl font-bold text-pau-blue mb-2">$150</p>
                            <p className="text-sm text-gray-500 italic">(Subject to change by the State Bar)</p>
                          </div>
                          <div className="p-6 bg-gradient-to-br from-pau-gold/5 to-transparent rounded-xl border border-pau-gold/20">
                            <p className="text-xs font-bold text-pau-gold uppercase tracking-widest mb-3">Requirement</p>
                            <p className="text-gray-700 leading-relaxed">After registering, students must provide their Registration Number to the PAUSL Registrar's Office.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. First-Year Law Students' Examination (FYLSX) */}
                <div className="relative group">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-pau-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="bg-white p-10 md:p-14 rounded-3xl shadow-premium border-2 border-gray-100 hover:border-pau-gold/30 transition-all duration-300">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pau-gold to-pau-goldDark rounded-2xl flex items-center justify-center shadow-lg">
                        <DocumentCheckIcon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-10 h-10 bg-pau-gold/10 text-pau-gold rounded-full flex items-center justify-center font-bold text-lg">3</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-pau-darkBlue">First-Year Law Students' Examination</h2>
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">FYLSX / "Baby Bar"</p>
                      </div>
                    </div>
                    <div className="space-y-8 pl-24">
                      <div>
                        <h3 className="font-semibold text-xl text-pau-blue mb-4">The First-Year Law Students' Examination Requirement</h3>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          Students attending an unaccredited law school must take and pass the First-Year Law Students' Examination (FYLSX) after completing their first year of law study (approximately 27 units).
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-pau-gold/10 to-pau-gold/5 p-8 rounded-2xl border-2 border-pau-gold/30 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-pau-gold rounded-xl flex items-center justify-center">
                              <CheckBadgeIcon className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-sm font-bold text-pau-gold uppercase tracking-widest">Passing Requirement</p>
                          </div>
                          <p className="text-gray-700 leading-relaxed">Students must pass the FYLSX within three (3) administrations of the exam after becoming eligible to take it.</p>
                        </div>
                        <div className="bg-gradient-to-br from-pau-gold/10 to-pau-gold/5 p-8 rounded-2xl border-2 border-pau-gold/30 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-pau-gold rounded-xl flex items-center justify-center">
                              <AcademicCapIcon className="h-6 w-6 text-white" />
                            </div>
                            <p className="text-sm font-bold text-pau-gold uppercase tracking-widest">Credit Recognition</p>
                          </div>
                          <p className="text-gray-700 leading-relaxed">If the exam is passed within three administrations, the student receives credit for all law studies completed up to the time of passing. If passed later, only one year of credit will be awarded.</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-pau-light p-8 rounded-2xl border-l-4 border-pau-blue shadow-md">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-pau-blue rounded-lg flex items-center justify-center">
                            <DocumentTextIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-pau-blue uppercase tracking-widest mb-2">Exemption</p>
                            <p className="text-gray-700 leading-relaxed">Students who have completed at least two years of college work and subsequently passed the FYLSX (or are exempt based on State Bar rules) may proceed to upper-division studies.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Qualifications for Admission to Practice Law in California */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pau-darkBlue via-pau-blue to-pau-darkBlue"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-pau-gold opacity-5 rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                  <div className="relative p-10 md:p-14 rounded-3xl text-white shadow-2xl border-2 border-white/10">
                    <div className="flex items-start gap-6 mb-10">
                      <div className="flex-shrink-0 w-16 h-16 bg-pau-gold rounded-2xl flex items-center justify-center shadow-xl">
                        <CheckBadgeIcon className="h-8 w-8 text-pau-darkBlue" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-10 h-10 bg-pau-gold/20 text-pau-gold rounded-full flex items-center justify-center font-bold text-lg">4</span>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-pau-gold">Qualifications for Admission to Practice Law in California</h2>
                        </div>
                        <p className="text-gray-300 text-lg mt-4">To be certified to the California Supreme Court for admission to practice law, a student must:</p>
                      </div>
                    </div>
                    <div className="space-y-6 pl-24">
                      {[
                        { title: "Complete the J.D. Degree", desc: "Successfully finish the 4-year curriculum at PAUSL.", icon: AcademicCapIcon },
                        { title: "Pass the FYLSX", desc: "Unless exempt under State Bar rules.", icon: DocumentCheckIcon },
                        { title: "Moral Character Determination", desc: "Receive a positive moral character determination.", icon: ShieldCheckIcon },
                        { title: "Multistate Professional Responsibility Examination (MPRE)", desc: "Achieve a passing score on the MPRE.", icon: DocumentTextIcon },
                        { title: "California Bar Examination", desc: "Pass the final California Bar Examination.", icon: CheckBadgeIcon }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                          <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-pau-gold group-hover:scale-110 transition-all duration-300 border border-white/20">
                            <item.icon className="h-6 w-6 text-pau-gold group-hover:text-pau-darkBlue transition-colors" />
                          </div>
                          <div className="flex-grow pt-1">
                            <p className="font-semibold text-white text-lg mb-2 group-hover:text-pau-gold transition-colors">{item.title}</p>
                            <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'disclosure':
        const toggleDisclosureSection = (index: number) => {
          setDisclosureOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
        };

        return (
          <>
            <PageHeader title={"Disclosure\nStatement"} subtitle="Transparency in our educational offering." icon={DocumentDuplicateIcon} />
            <SectionWrapper>
              <div className="max-w-5xl mx-auto space-y-4">
                {/* 1. Instructional Method */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleDisclosureSection(1)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-white hover:bg-pau-blue/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pau-blue/10 rounded-lg flex items-center justify-center">
                        <DocumentTextIcon className="h-5 w-5 text-pau-blue" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-pau-darkBlue">1. Instructional Method</span>
                        <p className="text-xs text-pau-blue/70 uppercase tracking-widest mt-1">Degree and Instructional Method Disclosure</p>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      disclosureOpenSections[1] ? 'bg-pau-blue border-pau-blue text-white' : 'border-gray-300 text-gray-400'
                    }`}>
                      {disclosureOpenSections[1] ? (
                        <MinusIcon className="h-5 w-5" />
                      ) : (
                        <PlusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    disclosureOpenSections[1] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                        <p className="font-semibold text-lg text-pau-darkBlue">Method of Instruction</p>
                        <p>
                          The method of instruction at Pacific American University School of Law (PAUSL) for the Juris Doctor (J.D.) degree program is principally by correspondence. PAUSL is not accredited by the Committee of Bar Examiners of the State Bar of California, but is registered as an unaccredited correspondence law school.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. FYLSX Requirement */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleDisclosureSection(2)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-white hover:bg-pau-blue/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pau-gold/10 rounded-lg flex items-center justify-center">
                        <DocumentCheckIcon className="h-5 w-5 text-pau-gold" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-pau-darkBlue">2. First-Year Law Students' Examination (FYLSX)</span>
                        <p className="text-xs text-pau-blue/70 uppercase tracking-widest mt-1">First-Year Law Students' Examination Requirement</p>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      disclosureOpenSections[2] ? 'bg-pau-gold border-pau-gold text-white' : 'border-gray-300 text-gray-400'
                    }`}>
                      {disclosureOpenSections[2] ? (
                        <MinusIcon className="h-5 w-5" />
                      ) : (
                        <PlusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    disclosureOpenSections[2] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="mt-4 space-y-6 text-gray-700 leading-relaxed">
                        <p>
                          Students enrolled in the J.D. program must pass the First-Year Law Students' Examination (FYLSX) as required by Business and Professions Code section 6060(h).
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-pau-blue/5 p-5 rounded-lg border-l-4 border-pau-blue">
                            <p className="font-semibold text-pau-blue mb-2">Eligibility and Credit</p>
                            <p className="text-sm text-gray-700">A student who passes the FYLSX within three (3) administrations after first becoming eligible will receive credit for all legal studies completed up to the time of passing.</p>
                          </div>
                          <div className="bg-pau-gold/5 p-5 rounded-lg border-l-4 border-pau-gold">
                            <p className="font-semibold text-pau-darkBlue mb-2">Consequences of Failure</p>
                            <p className="text-sm text-gray-700">A student who does not pass within three administrations must be promptly disqualified from the J.D. program. If the student subsequently passes, they may re-enroll but will receive credit for only one year of study.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Practice in Other Jurisdictions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleDisclosureSection(3)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-white hover:bg-pau-blue/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pau-blue/10 rounded-lg flex items-center justify-center">
                        <GlobeAltIcon className="h-5 w-5 text-pau-blue" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-pau-darkBlue">3. Admission to Practice Law Outside California</span>
                        <p className="text-xs text-pau-blue/70 uppercase tracking-widest mt-1">Practice in Other Jurisdictions Disclosure</p>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      disclosureOpenSections[3] ? 'bg-pau-blue border-pau-blue text-white' : 'border-gray-300 text-gray-400'
                    }`}>
                      {disclosureOpenSections[3] ? (
                        <MinusIcon className="h-5 w-5" />
                      ) : (
                        <PlusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    disclosureOpenSections[3] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                        <p>
                          Study at, or graduation from, this law school may not qualify a student to take the bar examination or to satisfy the requirements for admission to practice in jurisdictions other than California. Students intending to seek admission outside California should contact the relevant admitting authority for specific legal education requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Financial Status */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleDisclosureSection(4)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-white hover:bg-pau-blue/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pau-gold/10 rounded-lg flex items-center justify-center">
                        <CurrencyDollarIcon className="h-5 w-5 text-pau-gold" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-pau-darkBlue">4. PAUSL Financial Disclosures</span>
                        <p className="text-xs text-pau-blue/70 uppercase tracking-widest mt-1">Financial Status (Projected 2026-2030)</p>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      disclosureOpenSections[4] ? 'bg-pau-gold border-pau-gold text-white' : 'border-gray-300 text-gray-400'
                    }`}>
                      {disclosureOpenSections[4] ? (
                        <MinusIcon className="h-5 w-5" />
                      ) : (
                        <PlusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    disclosureOpenSections[4] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="mt-4">
                        <p className="text-gray-700 leading-relaxed mb-6">
                          PAUSL maintains assets in excess of liabilities to ensure institutional stability.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-pau-darkBlue text-white">
                                <th className="px-6 py-4 text-left font-bold">Year</th>
                                <th className="px-6 py-4 text-right font-bold">Assets</th>
                                <th className="px-6 py-4 text-right font-bold">Liabilities</th>
                                <th className="px-6 py-4 text-right font-bold">Net Assets</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { year: '2026', assets: 379352, liabilities: 17486 },
                                { year: '2027', assets: 951645, liabilities: 215422 },
                                { year: '2028', assets: 2717265, liabilities: 631172 },
                                { year: '2029', assets: 3124855, liabilities: 662731 },
                                { year: '2030', assets: 3593583, liabilities: 695867 }
                              ].map((row, idx) => {
                                const netAssets = row.assets - row.liabilities;
                                return (
                                  <tr key={idx} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="px-6 py-4 font-bold text-pau-darkBlue">{row.year}</td>
                                    <td className="px-6 py-4 text-right font-mono text-gray-700">${row.assets.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-mono text-gray-700">${row.liabilities.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-mono font-bold text-pau-blue">${netAssets.toLocaleString()}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Pass Rates */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleDisclosureSection(5)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-white hover:bg-pau-blue/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-pau-blue/10 rounded-lg flex items-center justify-center">
                        <AcademicCapIcon className="h-5 w-5 text-pau-blue" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-pau-darkBlue">5. Examination Pass Rates</span>
                        <p className="text-xs text-pau-blue/70 uppercase tracking-widest mt-1">Examination Pass Rates Disclosure</p>
                      </div>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      disclosureOpenSections[5] ? 'bg-pau-blue border-pau-blue text-white' : 'border-gray-300 text-gray-400'
                    }`}>
                      {disclosureOpenSections[5] ? (
                        <MinusIcon className="h-5 w-5" />
                      ) : (
                        <PlusIcon className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    disclosureOpenSections[5] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                      <div className="mt-4 space-y-6">
                        <div className="bg-pau-blue/5 p-6 rounded-lg border-l-4 border-pau-blue">
                          <p className="font-semibold text-pau-blue mb-3 flex items-center gap-2">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            California First-Year Law Students' Examination (FYLSX)
                          </p>
                          <p className="text-gray-700 mb-2">
                            PAUSL expects its first eligible students to take the exam in 2027.
                          </p>
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <p className="text-sm text-gray-600 italic">
                              <strong>Note:</strong> Previous years (2021-2025) are N/A as the program is newly established. Data will be available starting in 2027.
                            </p>
                          </div>
                        </div>
                        <div className="bg-pau-gold/5 p-6 rounded-lg border-l-4 border-pau-gold">
                          <p className="font-semibold text-pau-darkBlue mb-3 flex items-center gap-2">
                            <ExclamationCircleIcon className="h-5 w-5" />
                            California Bar Examination
                          </p>
                          <p className="text-gray-700 mb-2">
                            PAUSL expects its first eligible students to take the Bar Exam in 2030.
                          </p>
                          <div className="bg-white p-4 rounded border border-gray-200">
                            <p className="text-sm text-gray-600 italic">
                              <strong>Note:</strong> Previous years (2021-2025) are N/A as the program is newly established. Data will be available starting in 2030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        return (
          <Suspense fallback={<LoadingSpinner message="Loading library..." />}>
            <Library content={{
              title: "Law Library",
              intro: "Your gateway to comprehensive legal research resources.",
              sections: [
                { title: "Digital Collections", content: "Access Westlaw, LexisNexis, and HeinOnline from anywhere 24/7." },
                { title: "Research Guides", content: "Curated pathfinders for specific areas of law including Torts, Contracts, and Civil Procedure." },
                { title: "Reference Support", content: "Schedule a Zoom consultation with our reference librarians for research strategy assistance." }
              ]
            }} shared={shared} />
          </Suspense>
        );

      case 'academic-calendar':
        return (
          <Suspense fallback={<LoadingSpinner message="Loading calendar..." />}>
            <Calendar content={{
              title: "Academic Calendar",
              intro: "Key dates and deadlines for the 2026-2027 academic year.",
              events: [
                { date: "Aug 25, 2026", event: "Fall Semester Begins", type: "Academic" },
                { date: "Sept 7, 2026", event: "Labor Day (No Classes)", type: "Holiday" },
                { date: "Nov 26-27, 2026", event: "Thanksgiving Break", type: "Holiday" },
                { date: "Dec 14-18, 2026", event: "Final Examinations", type: "Exam" }
              ]
            }} shared={shared} />
          </Suspense>
        );

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
                    { dept: "Admissions Office", hours: ["Mon-Fri: 9:00 AM - 5:00 PM PST", "Sat-Sun: Closed"], icon: UserGroupIcon },
                    { dept: "Registrar & Records", hours: ["Mon-Fri: 9:00 AM - 5:00 PM PST", "Sat-Sun: Closed"], icon: ClipboardDocumentListIcon },
                    { dept: "IT Support Helpdesk", hours: ["Mon-Fri: 9:00 AM - 5:00 PM PST", "Sat-Sun: Closed"], icon: ComputerDesktopIcon },
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
                            <p>3435 Wilshire Blvd. Suite 430,</p>
                            <p>Los Angeles, CA 90010</p>
                          </div>
                       </div>
                       <h3 className="text-sm font-bold text-pau-gold uppercase tracking-widest mb-6">Main Line</h3>
                       <div className="flex items-center text-gray-700">
                          <PhoneIcon className="h-5 w-5 mr-3 text-pau-blue" />
                          <p className="font-bold">(213) 674-7174</p>
                       </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                       <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-8">Department Directory</h3>
                       <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                          {[
                            { name: "Admissions Office", email: "admissions@pau.edu", phone: "Ext. 101" },
                            { name: "Registrar's Office", email: "registrar@pau.edu", phone: "Ext. 102" },
                            { name: "Student Services", email: "studentservices@pau.edu", phone: "Ext. 103" },
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
          <>
            <PageHeader 
            title="Technical Requirements"
            subtitle="Ensuring you are connected for success."
            icon={ComputerDesktopIcon}
            />
            <SectionWrapper>
              <div className="max-w-6xl mx-auto">
                {/* Hardware Requirements Section */}
                <div className="mb-12 md:mb-16">
                  <SectionHeader 
                    title="Hardware Requirements" 
                    icon={ComputerDesktopIcon} 
                    variant="blue"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <InfoCard 
                      title="Computer" 
                      description="PC or Mac less than 4 years old" 
                      variant="blue"
                    />
                    <InfoCard 
                      title="Webcam" 
                      description="Internal or external camera" 
                      variant="blue"
                    />
                    <InfoCard 
                      title="Audio Equipment" 
                      description="Microphone and speakers (headset recommended)" 
                      variant="blue"
                    />
                    <InfoCard 
                      title="Memory" 
                      description="Minimum 8GB RAM" 
                      variant="blue"
                    />
                  </div>
                </div>

                {/* Software & Connectivity Section */}
                <div>
                  <SectionHeader 
                    title="Software & Connectivity" 
                    icon={GlobeAltIcon} 
                    variant="gold"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <InfoCard 
                      title="Internet Connection" 
                      description="High-speed broadband or fiber recommended" 
                      variant="gold"
                    />
                    <InfoCard 
                      title="Web Browser" 
                      description="Google Chrome or Mozilla Firefox" 
                      variant="gold"
                    />
                    <InfoCard 
                      title="Adobe Acrobat Reader" 
                      description="Free PDF reader software" 
                      variant="gold"
                    />
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </>
        );
      
      case 'admission-reqs':
        return <Admissions content={admissionsContent} shared={shared} />;
      
      case 'app-steps':
        return (
          <>
            <PageHeader 
            title="Application Steps" 
            subtitle="Your roadmap to enrollment."
            icon={ClipboardDocumentListIcon}
            />
            <SectionWrapper>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6 md:space-y-8">
                  <StepCard 
                    stepNumber={1}
                    title="Submit Online Application"
                    description="Complete the form via LSAC or our direct portal."
                    icon={DocumentCheckIcon}
                  />
                  <StepCard 
                    stepNumber={2}
                    title="Request Transcripts"
                    description="Have official transcripts sent from all undergraduate institutions."
                    icon={DocumentDuplicateIcon}
                  />
                  <StepCard 
                    stepNumber={3}
                    title="Personal Statement"
                    description="Upload a 2-3 page essay describing your motivation for studying law."
                    icon={DocumentTextIcon}
                  />
                  <StepCard 
                    stepNumber={4}
                    title="Letters of Recommendation"
                    description="Two letters from academic or professional sources."
                    icon={UserGroupIcon}
                  />
                  <StepCard 
                    stepNumber={5}
                    title="Interview"
                    description="Selected candidates will be invited for a Zoom interview with the Admissions Committee."
                    icon={ChatBubbleBottomCenterTextIcon}
                    isLast
                  />
                </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'transfer-int':
        return (
          <>
            <PageHeader 
            title="Transfer and International Students"
            subtitle="Joining PAU from another institution or country."
            icon={GlobeAltIcon}
            />
            <SectionWrapper>
              <div className="max-w-7xl mx-auto">
                {/* Transfer Students Section */}
                <div className="mb-16 md:mb-20">
                  {/* Hero Header */}
                  <div className="relative bg-gradient-to-br from-pau-darkBlue via-pau-blue to-pau-darkBlue p-10 md:p-16 rounded-3xl shadow-2xl overflow-hidden mb-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pau-gold opacity-5 rounded-full -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-pau-gold opacity-5 rounded-full -ml-36 -mb-36"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-pau-gold rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                          <AcademicCapIcon className="h-8 w-8 text-pau-darkBlue" />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Transfer Students Policy</h2>
                          <div className="w-20 h-1 bg-pau-gold"></div>
                        </div>
                      </div>
                      <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                        PAUSL welcomes qualified transfer students and evaluates transfer credits in accordance with California State Bar requirements.
                      </p>
                    </div>
                  </div>

                  {/* Policy Cards Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Eligibility Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pau-blue to-pau-darkBlue rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <ShieldCheckIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Eligibility</h3>
                          <div className="w-12 h-0.5 bg-pau-gold mb-4"></div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Transfer credit is only granted to applicants meeting <span className="font-semibold text-pau-darkBlue">Section 6060(h)</span> requirements. You must have passed the <span className="font-semibold">FYLSX</span> or be exempt (advanced to 2L by an accredited law school).
                      </p>
                    </div>

                    {/* Credit Validity Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pau-blue to-pau-darkBlue rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <ClockIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Credit Validity</h3>
                          <div className="w-12 h-0.5 bg-pau-gold mb-4"></div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Courses must be completed within <span className="font-semibold text-pau-darkBlue">27 months</span> prior to enrollment (waived for those who passed FYLSX).
                      </p>
                    </div>

                    {/* Credit Limit Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pau-gold to-amber-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <CheckBadgeIcon className="h-6 w-6 text-pau-darkBlue" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Credit Limit</h3>
                          <div className="w-12 h-0.5 bg-pau-gold mb-4"></div>
                        </div>
                      </div>
                      <div className="bg-pau-gold/10 p-4 rounded-xl border border-pau-gold/20">
                        <p className="text-2xl font-bold text-pau-darkBlue mb-1">40 Units</p>
                        <p className="text-sm text-gray-600">Maximum transfer credit accepted</p>
                      </div>
                    </div>

                    {/* Evaluation Fee Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pau-gold to-amber-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <CurrencyDollarIcon className="h-6 w-6 text-pau-darkBlue" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Evaluation Fee</h3>
                          <div className="w-12 h-0.5 bg-pau-gold mb-4"></div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        <span className="font-semibold">$10 per unit</span> evaluation fee (non-refundable).
                      </p>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-lg font-bold text-pau-darkBlue">$10 per unit</p>
                        <p className="text-sm text-gray-600">Non-refundable evaluation fee</p>
                      </div>
                    </div>
                  </div>

                  {/* Starting Over Policy - Full Width */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg border-2 border-pau-gold/30 p-8 md:p-10">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-pau-gold rounded-xl flex items-center justify-center mr-5 flex-shrink-0">
                        <DocumentTextIcon className="h-6 w-6 text-pau-darkBlue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">"Starting Over"</h3>
                        <p className="text-gray-700 leading-relaxed">
                          If not seeking transfer credit, you must submit the <span className="font-semibold text-pau-darkBlue">"Starting First-Year Law Studies Over Certification"</span> to the State Bar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* International Applicants Section */}
                <div>
                  {/* Hero Header */}
                  <div className="relative bg-gradient-to-br from-pau-gold/30 via-amber-50 to-yellow-50 p-10 md:p-16 rounded-3xl border-2 border-pau-gold/40 shadow-xl mb-10 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pau-gold opacity-10 rounded-full -mr-48 -mt-48"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-pau-gold rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                          <GlobeAltIcon className="h-8 w-8 text-pau-darkBlue" />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-serif font-bold text-pau-darkBlue mb-2">International Students Requirements</h2>
                          <div className="w-20 h-1 bg-pau-gold"></div>
                        </div>
                      </div>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
                        PAUSL welcomes international students from around the world. All applicants must meet specific English proficiency and credential evaluation requirements.
                      </p>
                    </div>
                  </div>

                  {/* No ESL Instruction - Full Width Alert */}
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-5 flex-shrink-0">
                        <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-red-900 mb-3">No ESL</h3>
                        <p className="text-red-800 leading-relaxed">
                          PAUSL does not provide ESL instruction. <span className="font-semibold">High proficiency in oral and written English is mandatory.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* English Proficiency Methods */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-8">
                    <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-6 flex items-center">
                      <span className="w-10 h-1 bg-pau-gold mr-4"></span>
                      English Language Proficiency Requirements
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      Non-native English speakers must demonstrate proficiency through one of the following methods:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Prior Academic Study */}
                      <div className="bg-gradient-to-br from-blue-50 to-pau-light rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-pau-blue rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <AcademicCapIcon className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-pau-darkBlue">Prior Academic Study</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          <span className="font-semibold">2+ years of study</span> at an English-speaking college.
                        </p>
                      </div>

                      {/* TOEFL */}
                      <div className="bg-gradient-to-br from-blue-50 to-pau-light rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-pau-blue rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <DocumentCheckIcon className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-pau-darkBlue">TOEFL</h4>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          TOEFL: <span className="font-semibold">79</span> (iBT), <span className="font-semibold">213</span> (CBT), or <span className="font-semibold">550</span> (PBT).
                        </p>
                      </div>

                      {/* IELTS */}
                      <div className="bg-gradient-to-br from-blue-50 to-pau-light rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-pau-blue rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <CheckBadgeIcon className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-pau-darkBlue">IELTS</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          IELTS: <span className="font-semibold">6.0 or higher</span>.
                        </p>
                      </div>

                      {/* Duolingo */}
                      <div className="bg-gradient-to-br from-blue-50 to-pau-light rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-pau-blue rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                            <GlobeAltIcon className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-pau-darkBlue">Duolingo English Test</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          Duolingo: <span className="font-semibold">105 or higher</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transcript Evaluation */}
                  <div className="bg-gradient-to-br from-pau-darkBlue to-pau-blue rounded-2xl shadow-xl p-8 md:p-10 text-white mb-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-pau-gold rounded-xl flex items-center justify-center mr-5 flex-shrink-0">
                        <DocumentCheckIcon className="h-6 w-6 text-pau-darkBlue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold mb-4">Transcript Evaluation</h3>
                        <p className="text-white/90 leading-relaxed mb-4">
                          Degrees from outside the U.S. require evaluation from a <span className="font-semibold">State Bar-approved agency</span> (e.g., A2Z, ECE, IERF).
                        </p>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                          <p className="text-sm font-semibold mb-2 text-pau-gold">Approved Organizations:</p>
                          <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-white/20 rounded-lg text-sm">A2Z</span>
                            <span className="px-3 py-1 bg-white/20 rounded-lg text-sm">ECE</span>
                            <span className="px-3 py-1 bg-white/20 rounded-lg text-sm">IERF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Requirements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Official Transcripts */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pau-blue to-pau-darkBlue rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <DocumentTextIcon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">Official Transcripts</h3>
                          <div className="w-12 h-0.5 bg-pau-gold mb-4"></div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        All official transcripts must be sent <span className="font-semibold text-pau-darkBlue">directly from the issuing institution to PAUSL</span>.
                      </p>
                    </div>

                    {/* LSAC ID */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-pau-gold to-amber-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                          <CheckBadgeIcon className="h-6 w-6 text-pau-darkBlue" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-pau-darkBlue mb-3">LSAC ID</h3>
                          <div className="w-12 h-0.5 bg-pau-gold mb-4"></div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        All applicants must <span className="font-semibold text-pau-darkBlue">obtain and provide an LSAC number</span> on their application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </>
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
      
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-pau-blue focus:text-white focus:rounded-lg focus:font-bold focus:shadow-lg"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        isTranslating={isTranslating} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        shared={shared}
        globalAlert={globalAlert}
      />
      
      <main id="main-content" className="flex-grow" role="main" tabIndex={-1}>
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} shared={shared} />
    </div>
  );
};

export default App;