
import React, { useState, useEffect } from 'react';
import { 
  Page, 
  SupportedLanguage, 
  SharedContent, 
  DEFAULT_SHARED_CONTENT, 
  MOCK_HOME_CONTENT, 
  Clinic, 
  NewsItem 
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
import { Centers } from './components/Centers';
import { ClinicDetail } from './components/ClinicDetail';
import { Library } from './components/Library';
import { Careers } from './components/Careers';
import { Calendar } from './components/Calendar';
import { ConsumerInfo } from './components/ConsumerInfo';
import { Admin } from './components/Admin';
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
  IdentificationIcon
} from '@heroicons/react/24/outline';

/**
 * Internal helper component for page headers.
 */
const PageHeader: React.FC<{ title: string; subtitle: string; icon: any }> = ({ title, subtitle, icon: Icon }) => (
  <div className="bg-pau-darkBlue pt-44 pb-20 px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <Icon className="h-16 w-16 text-pau-gold mx-auto mb-6" />
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white whitespace-pre-line leading-tight">{title}</h1>
      <p className="mt-6 text-xl text-gray-300 font-light max-w-2xl mx-auto">{subtitle}</p>
    </div>
  </div>
);

/**
 * Internal helper component for section wrapping.
 */
const SectionWrapper: React.FC<{ title?: string; children: React.ReactNode; centered?: boolean }> = ({ title, children, centered = false }) => (
  <section className={`py-24 px-6 bg-white ${centered ? 'text-center' : ''}`}>
    <div className="max-w-7xl mx-auto">
      {title && (
        <div className={`flex items-center space-x-4 mb-16 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-12 bg-pau-gold"></span>
          <h2 className="text-pau-gold font-bold tracking-widest uppercase text-xs">{title}</h2>
        </div>
      )}
      {children}
    </div>
  </section>
);

const DocumentLink: React.FC<{ title: string; type?: string }> = ({ title, type = "PDF" }) => (
  <div className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-xl hover:border-pau-gold transition-all cursor-pointer group">
    <div className="flex items-center">
      <div className="p-4 bg-red-50 text-red-500 rounded-xl mr-5 group-hover:bg-red-500 group-hover:text-white transition-colors">
        <DocumentTextIcon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-bold text-pau-darkBlue text-lg">{title}</h4>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{type} Resource • Secure Download</p>
      </div>
    </div>
    <ArrowDownTrayIcon className="h-5 w-5 text-gray-300 group-hover:text-pau-gold transition-colors" />
  </div>
);

/**
 * Main App Component - Orchestrates navigation and content rendering.
 */
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  // State for Admin management
  const [homeContent, setHomeContent] = useState(MOCK_HOME_CONTENT);
  const [noticesContent, setNoticesContent] = useState({ 
    title: 'Campus Notices', 
    intro: 'Stay informed about upcoming events, academic deadlines, and policy changes.', 
    notices: [] 
  });
  const [facultyContent, setFacultyContent] = useState({ 
    title: 'Distinguished Faculty', 
    intro: 'Our professors are leaders in legal theory and practitioners with real-world impact.', 
    facultyList: [
      { 
        name: "Michael Marino, Esq.", 
        title: "Professor of Law", 
        education: "J.D., University of San Francisco", 
        bio: "Specialist in Legal Writing and FYLSX preparation with over 15 years of legal experience.", 
        expertise: ["Legal Writing", "FYLSX Specialist"] 
      },
      { 
        name: "Jonathan H. Levy", 
        title: "Professor of Law", 
        education: "J.D., Georgetown University Law Center", 
        bio: "Expert in Tort law with a focus on consumer protection and civil liability.", 
        expertise: ["Torts"] 
      },
      { 
        name: "Shandrea P. Williams", 
        title: "Professor of Law", 
        education: "J.D., Howard University School of Law", 
        bio: "Specializes in Contract law and commercial transactions.", 
        expertise: ["Contracts"] 
      },
      { 
        name: "John Chandler", 
        title: "Professor of Law", 
        education: "J.D., Stanford Law School", 
        bio: "Dedicated scholar in Criminal Law and procedure.", 
        expertise: ["Criminal Law"] 
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

  // Translation effect
  useEffect(() => {
    const handleTranslation = async () => {
      if (currentLang === 'English') return;
      setIsTranslating(true);
      try {
        const translated = await translateContent(MOCK_HOME_CONTENT, currentLang);
        setHomeContent(translated);
      } catch (err) {
        console.error("Translation failed", err);
      } finally {
        setIsTranslating(false);
      }
    };
    handleTranslation();
  }, [currentLang]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedClinic(null);
    setSelectedNews(null);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (selectedNews) {
      return <NewsDetail item={selectedNews} onBack={() => setSelectedNews(null)} shared={shared} />;
    }
    if (selectedClinic) {
      return <ClinicDetail clinic={selectedClinic} onBack={() => setSelectedClinic(null)} shared={shared} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero content={homeContent} shared={shared} onNavigate={handleNavigate} />
            <InfoSection content={homeContent} shared={shared} onClinicClick={setSelectedClinic} onNavigate={handleNavigate} />
            <HomeNews title={homeContent.newsTitle} newsItems={homeContent.latestNews} onNewsClick={setSelectedNews} onNavigate={handleNavigate} shared={shared} />
          </>
        );

      case 'history-mission':
        return (
          <>
            <PageHeader title={"Mission &\nIdentity"} subtitle="Forging excellence in legal education for a global community." icon={GlobeAmericasIcon} />
            <SectionWrapper title="Our Institutional Status">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="bg-pau-light p-10 rounded-[40px] border-l-8 border-pau-gold shadow-premium">
                  <h3 className="text-lg font-bold text-pau-blue uppercase tracking-widest mb-4">Official Designation</h3>
                  <p className="text-xl text-gray-700 leading-relaxed font-light">
                    Pacific American University School of Law is a <span className="font-bold text-pau-darkBlue">Registered Unaccredited Correspondence Law School</span> in the State of California. We operate in full compliance with the Committee of Bar Examiners of the State Bar of California.
                  </p>
                </div>
                <div className="text-center py-10">
                   <h3 className="text-4xl font-serif font-bold text-pau-darkBlue mb-6 italic">
                     "To nurture impactful, balanced-minded leaders, who are equipped to resolve complex global issues."
                   </h3>
                   <div className="w-16 h-1 bg-pau-gold mx-auto"></div>
                </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'president-welcome':
        return (
          <>
            <PageHeader title={"President's\nWelcome"} subtitle="A strategic vision for the next generation of legal leaders." icon={UserIcon} />
            <SectionWrapper>
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="w-full aspect-[3/4] bg-gray-200 rounded-[40px] overflow-hidden shadow-2xl relative">
                      <div className="absolute inset-0 bg-pau-blue/10 flex items-center justify-center">
                         <UserIcon className="h-32 w-32 text-white/40" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pau-darkBlue/90 to-transparent p-8">
                         <p className="text-white font-serif font-bold text-xl leading-tight">Dr. Hyun Joo Kang</p>
                         <p className="text-pau-gold text-[10px] font-bold uppercase tracking-widest mt-1">President, PAU</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-3xl font-serif font-bold text-pau-darkBlue leading-tight mb-10">
                      Welcome to Pacific American University.
                    </h2>
                    <div className="prose prose-lg text-gray-600 leading-relaxed font-light space-y-6">
                      <p>Our bold mission is to lower barriers to legal education through innovation. At PAU School of Law, we believe that professional legal training should be accessible to talented individuals regardless of their geographic location or personal circumstances.</p>
                      <p>By merging American-style legal instruction with flexible delivery methods, we prepare our students to master the complexities of the law and succeed in the professional landscape. Our commitment is to provide a rigorous and technologically advanced education that empowers you to become a force for positive change.</p>
                      <div className="pt-8 border-t border-gray-100">
                        <p className="font-serif text-3xl text-pau-blue">Dr. Hyun Joo Kang</p>
                        <p className="text-xs font-bold text-pau-gold uppercase tracking-[0.2em] mt-2">President & CEO, PAU</p>
                      </div>
                    </div>
                  </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'dean-message':
        return (
          <>
            <PageHeader title={"Dean's\nMessage"} subtitle="Academic excellence and Bar readiness." icon={AcademicCapIcon} />
            <SectionWrapper>
              <div className="max-w-3xl mx-auto text-center py-32 bg-pau-light rounded-[60px] border border-gray-100 shadow-inner">
                <AcademicCapIcon className="h-16 w-16 text-pau-gold mx-auto mb-8 opacity-40" />
                <h2 className="text-3xl font-serif font-bold text-pau-darkBlue mb-4">Dean's Message Coming Soon</h2>
                <p className="text-gray-500 font-light max-w-lg mx-auto leading-relaxed">
                  We are currently finalizing the official greeting from our Office of the Dean. Please check back soon for insights into our academic philosophy and student success strategies.
                </p>
              </div>
            </SectionWrapper>
          </>
        );

      case 'school-form':
        return (
          <>
            <PageHeader title={"School\nForms"} subtitle="Streamlining your administrative needs." icon={ClipboardDocumentListIcon} />
            <SectionWrapper title="Administrative Requests">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <DocumentLink title="Application for Admission" />
                  <DocumentLink title="Transcript Request Form" />
                  <DocumentLink title="Notice of Cancellation / Withdrawal" />
                  <DocumentLink title="Credit Card Authorization Form" />
               </div>
            </SectionWrapper>
          </>
        );

      case 'faqs':
        return (
          <>
            <PageHeader title={"Frequently Asked\nQuestions"} subtitle="Expert answers to your legal education queries." icon={QuestionMarkCircleIcon} />
            <SectionWrapper>
               <div className="max-w-4xl mx-auto space-y-10">
                  {[
                    { 
                      q: "Is the school accredited?", 
                      a: "No. Pacific American University School of Law is registered as an Unaccredited Correspondence Law School with the Committee of Bar Examiners of the State Bar of California." 
                    },
                    { 
                      q: "Can I take the Bar Exam?", 
                      a: "Yes. Graduates of our J.D. program are eligible to sit for the California Bar Examination, provided they meet all other State Bar requirements." 
                    },
                    { 
                      q: "Is the First-Year Law Students' Examination (FYLSX) required?", 
                      a: "Yes. In accordance with State Bar rules, students must pass the First-Year Law Students' Examination (commonly known as the 'Baby Bar') after completing their first year of law study to receive credit for further study." 
                    }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white p-12 rounded-[40px] shadow-premium border border-gray-50 hover:shadow-2xl transition-all">
                      <h4 className="text-2xl font-serif font-bold text-pau-blue mb-6 flex items-start">
                        <span className="text-pau-gold mr-4 font-sans">Q.</span>
                        {faq.q}
                      </h4>
                      <div className="text-gray-600 leading-relaxed font-light text-lg pl-12 border-l-2 border-pau-gold/20">
                        {faq.a}
                      </div>
                    </div>
                  ))}
               </div>
            </SectionWrapper>
          </>
        );

      case 'bar-reg':
        return (
          <>
            <PageHeader title={"Bar\nRegistration"} subtitle="Official status with the State Bar of California." icon={ShieldCheckIcon} />
            <SectionWrapper title="Approval & Registration">
               <div className="max-w-4xl mx-auto">
                  <div className="bg-white p-12 rounded-[50px] border-l-[12px] border-pau-gold shadow-premium">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-6">Committee of Bar Examiners Status</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-xl">
                      Pacific American University School of Law is registered with the Committee of Bar Examiners of the State Bar of California as an <span className="font-bold">Unaccredited Correspondence Law School</span>.
                    </p>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'disclosure':
        return (
          <>
            <PageHeader title={"Public\nDisclosures"} subtitle="Transparency and mandatory consumer data." icon={DocumentDuplicateIcon} />
            <SectionWrapper title="Mandatory Disclosure Statement">
               <div className="max-w-4xl mx-auto space-y-8">
                  <div className="bg-pau-light p-10 rounded-[40px] shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-6">Student Disclosure (Section 6061.7)</h3>
                    <ul className="space-y-6">
                      <li className="flex items-start gap-4">
                        <CheckBadgeIcon className="h-6 w-6 text-pau-gold flex-shrink-0 mt-1" />
                        <p className="text-gray-700">The method of instruction is principally by <span className="font-bold">correspondence</span>.</p>
                      </li>
                      <li className="flex items-start gap-4">
                        <CheckBadgeIcon className="h-6 w-6 text-pau-gold flex-shrink-0 mt-1" />
                        <p className="text-gray-700">Students must pass the <span className="font-bold">First-Year Law Students' Examination (FYLSX)</span> to receive credit for law study.</p>
                      </li>
                      <li className="flex items-start gap-4">
                        <CheckBadgeIcon className="h-6 w-6 text-pau-gold flex-shrink-0 mt-1" />
                        <p className="text-gray-700">Study at this school may not qualify a student to take the bar examination or satisfy admission requirements in <span className="font-bold">jurisdictions other than California</span>.</p>
                      </li>
                    </ul>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'catalog':
        return (
          <>
            <PageHeader title={"Academic\nCatalog"} subtitle="Official policies, curriculum, and program requirements." icon={BookOpenIcon} />
            <SectionWrapper centered>
                 <div className="max-w-2xl bg-white p-16 rounded-[60px] shadow-premium border border-gray-100 mx-auto">
                    <div className="p-8 bg-red-50 text-red-600 rounded-[32px] mb-10 shadow-inner inline-block">
                      <DocumentTextIcon className="h-24 w-24" />
                    </div>
                    <h3 className="text-4xl font-serif font-bold text-pau-blue mb-2">2026-2027 Catalog</h3>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-10">Official Academic Publication</p>
                    <button className="w-full bg-pau-blue text-white py-6 rounded-2xl font-bold uppercase tracking-widest shadow-glow hover:bg-pau-gold transition-all flex items-center justify-center gap-3">
                      <ArrowDownTrayIcon className="h-5 w-5" /> Download Official Catalog (PDF)
                    </button>
                 </div>
            </SectionWrapper>
          </>
        );

      case 'faculty':
        // Use the dedicated Faculty component for the faculty page
        return <Faculty content={facultyContent} shared={shared} />;

      case 'admin-staffs':
        return (
          <>
            <PageHeader title={"Admin &\nStaff"} subtitle="The leadership team dedicated to student success." icon={UserCircleIcon} />
            <SectionWrapper title="University Leadership">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  { name: "Dr. Hyun Joo Kang", role: "President & CEO" },
                  { name: "Phillip Bohl", role: "Associate Dean" },
                  { name: "Nam Hwan Jung", role: "Dean of Admissions" },
                  { name: "Joyee J. Jea", role: "IT and Marketing Director" }
                ].map((staff, i) => (
                  <div key={i} className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-premium hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-pau-light rounded-2xl flex items-center justify-center text-pau-gold">
                       <IdentificationIcon className="h-8 w-8" />
                    </div>
                    <div>
                       <h4 className="text-xl font-serif font-bold text-pau-darkBlue">{staff.name}</h4>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{staff.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </>
        );

      case 'admissions':
      case 'apply-now':
      case 'app-steps':
      case 'admission-reqs':
      case 'transfer-int':
      case 'tech-reqs':
        return <Admissions content={{
          title: 'Admissions',
          intro: 'Start your journey toward a legal career with Pacific American University.',
          deadlinesTitle: 'Application Deadlines',
          deadlines: [
            { term: 'Fall 2026', date: 'August 1, 2026', type: 'Regular Decision' },
            { term: 'Spring 2027', date: 'January 15, 2027', type: 'Priority' }
          ],
          requirementsTitle: 'Admission Requirements',
          requirements: [
            'Bachelor\'s Degree from an accredited institution',
            'LSAT or GRE score (Optional for 2026)',
            'Personal Statement',
            'Letters of Recommendation'
          ],
          tuitionTitle: 'Tuition & Value',
          tuitionInfo: 'We offer one of the most accessible JD programs in California.',
          tuitionCost: '$9,000',
          faqTitle: 'Admissions FAQ',
          faqs: [
            { question: 'Is the JD program online?', answer: 'Yes, our JD program is 100% online.' },
            { question: 'Do I need the LSAT?', answer: 'We currently have a test-optional policy.' }
          ]
        }} shared={shared} />;
      case 'academics':
      case 'academic-calendar':
      case 'bar-info':
      case 'curriculum-schedule':
      case 'course-desc':
      case 'counseling':
      case 'grad-reqs':
        return <Academics content={academicsContent} onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'notices':
        return <NoticeBoard content={noticesContent} onNewsClick={setSelectedNews} shared={shared} />;
      case 'centers':
        return <Centers content={{ title: 'Centers & Clinics', intro: 'Hands-on legal experience through our diverse clinical programs.', clinics: homeContent.clinics }} onClinicClick={setSelectedClinic} shared={shared} />;
      case 'library':
        return <Library content={{ title: 'Law Library', intro: 'Access premium legal databases and research support.', sections: [{ title: 'Westlaw Access', content: 'Available to all registered students.' }] }} shared={shared} />;
      case 'careers':
        return <Careers content={{ title: 'Career Services', intro: 'Empowering students to achieve their professional goals.', stats: [], services: [] }} />;
      case 'consumer-info':
        return <ConsumerInfo content={{ title: 'Consumer Information', intro: 'Transparent data about our JD program and student outcomes.', sections: [] }} />;
      case 'admin':
        return (
          <Admin 
            home={homeContent} setHome={setHomeContent}
            faculty={facultyContent} setFaculty={setFacultyContent}
            notices={noticesContent} setNotices={setNoticesContent}
            academics={academicsContent} setAcademics={setAcademicsContent}
          />
        );

      case 'tuition-fees':
        return (
          <>
            <PageHeader title={"Tuition &\nMandatory Fees"} subtitle="Transparent pricing for your legal professional investment." icon={CurrencyDollarIcon} />
            <SectionWrapper title="Cost of Attendance (2026-2027)">
               <div className="max-w-5xl mx-auto space-y-12">
                  {/* Tuition Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-pau-darkBlue p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 opacity-10"><BanknotesIcon className="h-32 w-32" /></div>
                       <h3 className="text-xl font-serif font-bold text-pau-gold mb-6 uppercase tracking-widest">Base Tuition</h3>
                       <div className="space-y-4">
                          <div className="flex justify-between border-b border-white/10 pb-4">
                             <span className="font-light">Per Trimester</span>
                             <span className="font-bold">$3,000.00</span>
                          </div>
                          <div className="flex justify-between border-b border-white/10 pb-4">
                             <span className="font-light">Annual (3 Trimesters)</span>
                             <span className="font-bold">$9,000.00</span>
                          </div>
                       </div>
                       <p className="mt-8 text-xs text-gray-400 italic leading-relaxed">
                         * Total 4-year estimated tuition & fees: $43,770 (excluding State Bar fees).
                       </p>
                    </div>

                    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-premium">
                       <h3 className="text-xl font-serif font-bold text-pau-blue mb-6 uppercase tracking-widest">Mandatory Fees</h3>
                       <div className="space-y-4 text-sm">
                          <div className="flex justify-between border-b border-gray-50 pb-3">
                             <span className="text-gray-600">Application Fee (One-time)</span>
                             <span className="font-bold text-pau-darkBlue">$70.00</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50 pb-3">
                             <span className="text-gray-600">Registration Fee (One-time)</span>
                             <span className="font-bold text-pau-darkBlue">$200.00</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50 pb-3">
                             <span className="text-gray-600">Annual Set-Up Fees (Software)</span>
                             <span className="font-bold text-pau-darkBlue">$500.00</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-50 pb-3">
                             <span className="text-gray-600">Student Services Fee (Annual)</span>
                             <span className="font-bold text-pau-darkBlue">$150.00</span>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                     <p className="text-sm text-gray-500 leading-relaxed text-center">
                       Total estimated 4-year cost including anticipated State Bar fees: <span className="font-bold text-pau-blue">$46,829</span>.
                       Costs are subject to change. Books and study materials are estimated at $1,000 per year.
                     </p>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'payment-plan':
        return (
          <>
            <PageHeader title={"Flexible\nPayment Plans"} subtitle="Financial structures tailored for working professionals." icon={CreditCardIcon} />
            <SectionWrapper title="Financing Options">
               <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-white p-12 rounded-[50px] shadow-premium border border-gray-100 hover:border-pau-gold transition-all group">
                     <div className="w-14 h-14 bg-pau-light rounded-2xl flex items-center justify-center text-pau-blue mb-8 group-hover:bg-pau-blue group-hover:text-white transition-all">
                        <CheckBadgeIcon className="h-8 w-8" />
                     </div>
                     <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-4">Option 1: Minimum Monthly</h3>
                     <p className="text-gray-600 mb-8 font-light">$350/month Minimum Payment Plan with 5% Annual Interest. Allows students to spread costs over a longer duration.</p>
                     <ul className="text-xs font-bold text-pau-gold uppercase tracking-widest space-y-2">
                        <li>• $100 Annual Setup Fee</li>
                        <li>• Flexible Extra Payments</li>
                     </ul>
                  </div>

                  <div className="bg-white p-12 rounded-[50px] shadow-premium border border-gray-100 hover:border-pau-blue transition-all group">
                     <div className="w-14 h-14 bg-pau-light rounded-2xl flex items-center justify-center text-pau-gold mb-8 group-hover:bg-pau-gold group-hover:text-white transition-all">
                        <ArrowPathIcon className="h-8 w-8" />
                     </div>
                     <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Option 2: 0% Interest</h3>
                     <p className="text-gray-600 mb-8 font-light">$750/month Maximum Payment Plan with 0% Interest. Tuition is entirely covered by the end of each trimester.</p>
                     <ul className="text-xs font-bold text-pau-blue uppercase tracking-widest space-y-2">
                        <li>• No Interest Charges</li>
                        <li>• Accelerated Debt Removal</li>
                     </ul>
                  </div>
               </div>

               <div className="max-w-3xl mx-auto mt-20 p-10 bg-red-50 rounded-[40px] border border-red-100 text-center">
                  <ExclamationCircleIcon className="h-10 w-10 text-red-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-red-900 mb-2 uppercase tracking-widest">Financial Aid Disclaimer</h4>
                  <p className="text-red-700 text-sm font-light">
                    Pacific American University School of Law does not participate in Federal or State financial aid programs (Title IV). Students are responsible for all tuition and fees.
                  </p>
               </div>
            </SectionWrapper>
          </>
        );

      case 'refund-policy':
        return (
          <>
            <PageHeader title={"Cancellation &\nRefund Policy"} subtitle="Your rights and institutional transparency." icon={ArrowPathIcon} />
            <SectionWrapper title="Tuition Protections">
               <div className="max-w-4xl mx-auto space-y-10">
                  <div className="bg-white p-12 rounded-[50px] shadow-premium border-l-[12px] border-pau-gold">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-6">Right to Cancel (7-Day Rule)</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-lg">
                      Students have the right to cancel the enrollment agreement and obtain a <span className="font-bold">100% refund</span> of all payments made if notice is provided within seven (7) days of signing the Enrollment Agreement or through the first class session, whichever is later.
                    </p>
                  </div>

                  <div className="bg-pau-light p-12 rounded-[50px] border border-gray-100">
                    <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-6">Pro-Rata Refunds</h3>
                    <p className="text-gray-600 leading-relaxed font-light mb-8">
                      After the initial 7-day cancellation period, refunds are calculated on a pro-rata basis according to the number of weeks completed in the 48-week academic year.
                    </p>
                    <div className="bg-white p-6 rounded-2xl border border-pau-gold/20 flex items-start gap-4">
                       <ExclamationCircleIcon className="h-6 w-6 text-pau-gold flex-shrink-0" />
                       <p className="text-xs text-gray-500 italic">
                         "No refunds will be issued to students who have completed 26 or more weeks of consecutive instruction."
                       </p>
                    </div>
                  </div>

                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest font-bold">Procedure</p>
                    <p className="text-gray-700 font-light max-w-xl mx-auto">
                      All cancellations and withdrawals must be submitted in writing via email to <span className="font-bold text-pau-blue">registrar@paucal.org</span> or by certified mail to the campus address.
                    </p>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'office-hours':
        return (
          <>
            <PageHeader title={"Office\nHours"} subtitle="Available for student support and administrative inquiries." icon={ClockIcon} />
            <SectionWrapper title="Regular Operations">
               <div className="max-w-4xl mx-auto bg-white p-12 rounded-[50px] shadow-premium border border-gray-100">
                  <div className="space-y-12">
                     <div className="flex flex-col md:flex-row justify-between items-center py-8 border-b border-gray-50">
                        <span className="text-2xl font-serif font-bold text-pau-darkBlue">Monday – Friday</span>
                        <div className="text-right mt-4 md:mt-0">
                           <p className="text-3xl font-bold text-pau-gold">9:00 AM – 12:00 PM</p>
                           <p className="text-3xl font-bold text-pau-gold">1:00 PM – 5:00 PM</p>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Pacific Time (PT)</p>
                        </div>
                     </div>
                     <div className="bg-pau-light p-8 rounded-3xl text-center">
                        <p className="text-gray-600 font-light italic">
                          "Our administrative offices are closed on weekends and all major public holidays."
                        </p>
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'contact-info':
        return (
          <>
            <PageHeader title={"Contact\nInformation"} subtitle="Direct lines to our academic and administrative offices." icon={PhoneIcon} />
            <SectionWrapper title="Connect with PAUSL">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  <div className="space-y-8">
                     <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 flex items-start gap-6">
                        <div className="p-4 bg-pau-light text-pau-blue rounded-2xl">
                           <MapPinIcon className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Campus Address</h4>
                           <p className="text-lg text-pau-darkBlue font-medium">3435 Wilshire Blvd. Suite 430<br />Los Angeles, CA 90010</p>
                        </div>
                     </div>
                     <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 flex items-start gap-6">
                        <div className="p-4 bg-pau-light text-pau-blue rounded-2xl">
                           <PhoneIcon className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone & Fax</h4>
                           <p className="text-lg text-pau-darkBlue font-medium">Tel: (213) 674-7174</p>
                           <p className="text-lg text-pau-darkBlue font-medium">Fax: (213) 674-7233</p>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-8">
                     <div className="bg-pau-darkBlue p-10 rounded-[40px] shadow-2xl text-white flex items-start gap-6">
                        <div className="p-4 bg-white/10 text-pau-gold rounded-2xl">
                           <EnvelopeIcon className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-pau-gold/60 uppercase tracking-widest mb-2">Email Inquiries</h4>
                           <p className="text-lg font-medium mb-1">General: info@paucal.org</p>
                           <p className="text-lg font-medium">Admissions: admissions@paucal.org</p>
                        </div>
                     </div>
                     <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 flex items-start gap-6">
                        <div className="p-4 bg-pau-light text-pau-blue rounded-2xl">
                           <GlobeAltIcon className="h-6 w-6" />
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Official Website</h4>
                           <p className="text-xl text-pau-blue font-bold tracking-tight">www.paucal.org</p>
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
            <PageHeader title={"Request\nInformation"} subtitle="Learn more about our programs and admissions process." icon={PaperAirplaneIcon} />
            <SectionWrapper title="Inquiry Form">
               <div className="max-w-4xl mx-auto bg-white p-12 lg:p-16 rounded-[60px] shadow-premium border border-gray-100">
                  <div className="mb-12 bg-blue-50 p-8 rounded-3xl border border-blue-100 text-center">
                     <p className="text-pau-blue font-medium text-lg leading-relaxed">
                        To request more information about our J.D. program or admissions, please email us directly at <span className="font-bold underline">admissions@paucal.org</span> or call <span className="font-bold">(213) 674-7174</span>.
                     </p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); alert("Please email admissions@paucal.org for immediate assistance and to receive a digital copy of our catalog."); }} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                           <input type="text" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-pau-gold focus:outline-none transition-all" placeholder="Enter your name" />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                           <input type="email" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-pau-gold focus:outline-none transition-all" placeholder="Enter your email" />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Message / Inquiry</label>
                        <textarea rows={5} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-pau-gold focus:outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                     </div>
                     <button type="submit" className="w-full py-5 bg-pau-darkBlue text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-pau-gold transition-all shadow-glow">
                        Submit Inquiry
                     </button>
                  </form>
               </div>
            </SectionWrapper>
          </>
        );

      default:
        return (
          <div className="pt-44 pb-20 text-center">
            <h1 className="text-3xl font-serif font-bold text-pau-blue mb-4">Under Construction</h1>
            <p className="text-gray-500">The page "{currentPage}" is currently being developed.</p>
            <button onClick={() => handleNavigate('home')} className="mt-8 text-pau-gold font-bold uppercase tracking-widest border-b border-pau-gold">Back to Home</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        isTranslating={isTranslating} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        shared={shared}
      />
      <main>
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} shared={shared} />
    </div>
  );
};

export default App;
