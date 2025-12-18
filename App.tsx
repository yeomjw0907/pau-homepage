
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';
import { Admissions } from './components/Admissions';
import { Academics } from './components/Academics';
import { Faculty } from './components/Faculty';
import { NewsDetail } from './components/NewsDetail';
import { ClinicDetail } from './components/ClinicDetail';
import { Admin } from './components/Admin';
import { HomeNews } from './components/HomeNews';
import { Calendar } from './components/Calendar';
import { 
  SupportedLanguage, 
  Page, 
  Clinic,
  SharedContent,
  FacultyMember,
  NewsItem,
  DEFAULT_SHARED_CONTENT,
  MOCK_HOME_CONTENT
} from './types';
import { translateContent } from './services/geminiService';
import { 
  ShieldCheckIcon, 
  AcademicCapIcon, 
  DocumentTextIcon, 
  ClockIcon,
  CheckBadgeIcon,
  ExclamationCircleIcon,
  DocumentDuplicateIcon,
  QuestionMarkCircleIcon,
  IdentificationIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  UserIcon,
  BookOpenIcon,
  GlobeAmericasIcon,
  ScaleIcon,
  BuildingLibraryIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  ListBulletIcon,
  ArrowRightIcon,
  ChatBubbleLeftEllipsisIcon,
  MapIcon,
  UserCircleIcon,
  UsersIcon,
  PencilSquareIcon,
  HeartIcon,
  ClipboardDocumentListIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  SignalIcon,
  ArrowUpTrayIcon,
  UserPlusIcon,
  NumberedListIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowPathIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  DevicePhoneMobileIcon,
  VideoCameraIcon,
  WifiIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';

// --- SHARED DATA ---
const NEWS_DATA: NewsItem[] = [
  {
    id: "n1",
    title: "PAUSL Team Ranks Top 10 in National Moot Court",
    date: "2024-05-15",
    summary: "Our advocacy team demonstrated exceptional skill in constitutional law arguments during the Chicago finals.",
    body: "<p>Pacific American University School of Law is proud to announce that its Moot Court Advocacy Team achieved a Top 10 ranking at the National Constitutional Law Competition held in Chicago last week.</p>",
    category: "Academic",
    isPinned: true
  }
];

const FACULTY_DATA: FacultyMember[] = [
  {
    name: "Dr. Elena Rodriguez",
    title: "Dean & Professor of Constitutional Law",
    education: "J.D., Stanford University; Ph.D., Yale",
    bio: "Dean Rodriguez has spent 20 years specializing in Civil Rights litigation.",
    expertise: ["Constitutional Law", "Civil Rights"]
  }
];

// --- HELPER COMPONENTS ---

const PageHeader: React.FC<{ title: string; subtitle: string; icon?: React.ElementType }> = ({ title, subtitle, icon: Icon }) => (
  <div className="relative bg-pau-darkBlue pt-56 pb-28 overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pau-blue/30 to-transparent"></div>
    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
      {Icon && (
        <div className="inline-flex p-4 bg-white/5 rounded-full border border-white/10 mb-8 backdrop-blur-sm">
          <Icon className="h-10 w-10 text-pau-gold" />
        </div>
      )}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
        {title}
      </h1>
      <div className="w-20 h-1 bg-pau-gold mx-auto mb-8"></div>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

const SectionWrapper: React.FC<{ children?: React.ReactNode, title?: string, centered?: boolean }> = ({ children, title, centered = false }) => (
  <div className={`max-w-7xl mx-auto px-6 py-24 animate-fade-in ${centered ? 'text-center' : ''}`}>
    {title && (
      <div className={`mb-16 ${centered ? 'flex flex-col items-center' : ''}`}>
        <h2 className="text-4xl font-serif font-bold text-pau-darkBlue mb-4">{title}</h2>
        <div className="w-16 h-1 bg-pau-gold"></div>
      </div>
    )}
    {children}
  </div>
);

const InfoCard: React.FC<{ icon: any, title: string, content: string | React.ReactNode, isDark?: boolean }> = ({ icon: Icon, title, content, isDark = false }) => (
  <div className={`p-10 rounded-2xl border transition-all duration-500 mb-10 group ${isDark ? 'bg-pau-darkBlue text-white border-white/10' : 'bg-white shadow-premium border-gray-100 hover:border-pau-gold/50'}`}>
    <div className="flex items-start mb-6">
      <div className={`p-4 rounded-xl mr-6 transition-all ${isDark ? 'bg-white/10 text-pau-gold' : 'bg-pau-light text-pau-blue group-hover:bg-pau-blue group-hover:text-white'}`}>
        <Icon className="h-7 w-7" />
      </div>
      <div className="flex-grow">
        <h3 className={`text-2xl font-serif font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <div className={`leading-relaxed text-lg font-light ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{content}</div>
      </div>
    </div>
  </div>
);

const DocumentLink: React.FC<{ title: string, type?: string }> = ({ title, type = "PDF" }) => (
  <div className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-pau-gold transition-all cursor-pointer group">
    <div className="flex items-center">
      <div className="p-3 bg-red-50 text-red-500 rounded-lg mr-4 group-hover:bg-pau-blue group-hover:text-white transition-colors">
        <DocumentTextIcon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-bold text-pau-darkBlue">{title}</h4>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{type} Download</p>
      </div>
    </div>
    <ArrowDownTrayIcon className="h-5 w-5 text-gray-300 group-hover:text-pau-gold transition-colors" />
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTranslating, setIsTranslating] = useState(false);
  const [sharedContent, setSharedContent] = useState<SharedContent>(DEFAULT_SHARED_CONTENT); 
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    if (lang === currentLang) return;
    setIsTranslating(true);
    setCurrentLang(lang);
    try {
       const translated = await translateContent(DEFAULT_SHARED_CONTENT, lang);
       setSharedContent(translated);
    } catch (e) { console.error(e); } finally { setIsTranslating(false); }
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedNewsItem(null);
    setSelectedClinic(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClinicClick = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setCurrentPage('clinic-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (selectedNewsItem) return <NewsDetail item={selectedNewsItem} onBack={() => setSelectedNewsItem(null)} shared={sharedContent} />;
    if (selectedClinic && currentPage === 'clinic-detail') return <ClinicDetail clinic={selectedClinic} onBack={() => handleNavigate('home')} shared={sharedContent} />;

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero content={{...MOCK_HOME_CONTENT, latestNews: NEWS_DATA}} shared={sharedContent} onNavigate={handleNavigate} />
            <InfoSection content={{...MOCK_HOME_CONTENT, latestNews: NEWS_DATA}} shared={sharedContent} onClinicClick={handleClinicClick} onNavigate={handleNavigate} />
            <HomeNews title="University News" newsItems={NEWS_DATA} onNewsClick={setSelectedNewsItem} shared={sharedContent} />
          </>
        );

      // --- ADMISSIONS SECTIONS ---
      case 'admission-reqs':
        return (
          <>
            <PageHeader title="Admission Requirements" subtitle="Evaluating candidates for a lifetime of legal excellence." icon={IdentificationIcon} />
            <SectionWrapper title="Eligibility Criteria">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoCard 
                    icon={AcademicCapIcon} 
                    title="Undergraduate Degree" 
                    content="Candidates must hold a Bachelor's degree (B.A., B.S., or equivalent) from a regionally accredited institution or a foreign institution recognized by the State Bar of California."
                  />
                  <InfoCard 
                    icon={ClipboardDocumentCheckIcon} 
                    title="Standardized Tests" 
                    content="Submission of a valid LSAT or GRE score is mandatory for all Juris Doctor applicants. Scores must be no more than five years old at the time of application."
                  />
                  <InfoCard 
                    icon={UserPlusIcon} 
                    title="Letters of Recommendation" 
                    content="At least two letters are required. We recommend one academic reference and one professional reference that can attest to your analytical and writing abilities."
                  />
                  <InfoCard 
                    icon={PencilSquareIcon} 
                    title="Personal Statement" 
                    content="A 500-750 word essay describing your motivation for practicing law, your unique life experiences, and how PAU Law fits your career goals."
                  />
               </div>
            </SectionWrapper>
          </>
        );

      case 'transfer-int':
        return (
          <>
            <PageHeader title="Transfer & International" subtitle="Broadening horizons, welcoming global perspectives." icon={GlobeAltIcon} />
            <SectionWrapper>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-white p-12 rounded-3xl shadow-premium border border-gray-100">
                     <h3 className="text-3xl font-serif font-bold text-pau-blue mb-8">Transfer Applicants</h3>
                     <p className="text-gray-600 mb-6 leading-relaxed">Students who have completed their first year of law study at an ABA-approved or California-accredited law school may apply for transfer.</p>
                     <ul className="space-y-4 mb-10">
                        <li className="flex items-start text-sm text-gray-700 font-medium"><CheckBadgeIcon className="h-5 w-5 mr-3 text-pau-gold" /> Maximum of 30 semester units may be transferred</li>
                        <li className="flex items-start text-sm text-gray-700 font-medium"><CheckBadgeIcon className="h-5 w-5 mr-3 text-pau-gold" /> Minimum GPA of 2.7 in prior law studies required</li>
                        <li className="flex items-start text-sm text-gray-700 font-medium"><CheckBadgeIcon className="h-5 w-5 mr-3 text-pau-gold" /> Dean's Certification of Good Standing required</li>
                     </ul>
                     <button className="text-pau-blue font-bold text-sm uppercase tracking-widest border-b-2 border-pau-blue pb-1 hover:text-pau-gold hover:border-pau-gold transition-all">Transfer Policies</button>
                  </div>
                  <div className="bg-pau-darkBlue p-12 rounded-3xl text-white shadow-xl">
                     <h3 className="text-3xl font-serif font-bold text-pau-gold mb-8">International Candidates</h3>
                     <p className="text-gray-300 mb-6 leading-relaxed">PAU Law values the diversity international students bring to our digital campus. Candidates with non-U.S. degrees must complete additional steps:</p>
                     <div className="space-y-8">
                        <div>
                           <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">1. Credential Evaluation</h4>
                           <p className="text-xs text-gray-400">All foreign transcripts must be evaluated by LSAC's CAS or a recognized agency like WES.</p>
                        </div>
                        <div>
                           <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">2. English Proficiency</h4>
                           <p className="text-xs text-gray-400">Non-native speakers must submit a TOEFL (min 100 iBT) or IELTS (min 7.0) score.</p>
                        </div>
                        <div>
                           <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-2">3. Distance Education Policy</h4>
                           <p className="text-xs text-gray-400">International students study remotely and do not require F-1 or J-1 visas for the online program.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'tech-reqs':
        return (
          <>
            <PageHeader title="Tech Requirements" subtitle="The essential toolkit for your digital JD." icon={ComputerDesktopIcon} />
            <SectionWrapper title="Systems & Connectivity">
               <div className="max-w-4xl mx-auto">
                  <div className="bg-white p-12 rounded-3xl shadow-premium border border-gray-100 mb-12">
                     <h3 className="text-2xl font-serif font-bold text-pau-blue mb-8">Minimum Hardware Specifications</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="flex items-start">
                           <CommandLineIcon className="h-6 w-6 text-pau-gold mr-4 mt-1" />
                           <div>
                              <p className="font-bold text-gray-900">Processor & RAM</p>
                              <p className="text-sm text-gray-500">Intel i5 (or equivalent) / 8GB RAM minimum</p>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <VideoCameraIcon className="h-6 w-6 text-pau-gold mr-4 mt-1" />
                           <div>
                              <p className="font-bold text-gray-900">Camera & Mic</p>
                              <p className="text-sm text-gray-500">720p HD Webcam / Noise-canceling microphone</p>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <WifiIcon className="h-6 w-6 text-pau-gold mr-4 mt-1" />
                           <div>
                              <p className="font-bold text-gray-900">Internet Connection</p>
                              <p className="text-sm text-gray-500">Minimum 10 Mbps Download / 5 Mbps Upload</p>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <ShieldCheckIcon className="h-6 w-6 text-pau-gold mr-4 mt-1" />
                           <div>
                              <p className="font-bold text-gray-900">Operating System</p>
                              <p className="text-sm text-gray-500">Windows 10+ / macOS Monterey+</p>
                           </div>
                        </div>
                     </div>
                     <div className="bg-pau-light p-6 rounded-xl border border-pau-blue/5">
                        <p className="text-sm text-pau-blue font-bold mb-2">Mandatory Software:</p>
                        <p className="text-xs text-gray-500">Google Chrome (latest), Microsoft Office 365 (Provided by school), and ExamSoft Examplify for proctored examinations.</p>
                     </div>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-8 rounded-r-xl">
                     <div className="flex">
                        <div className="flex-shrink-0">
                           <ExclamationCircleIcon className="h-6 w-6 text-orange-400" />
                        </div>
                        <div className="ml-4">
                           <h3 className="text-sm font-bold text-orange-800 uppercase tracking-widest mb-2">Online Examination Requirement</h3>
                           <p className="text-sm text-orange-700 leading-relaxed font-light">All JD students must have a computer that meets the requirements for Examplify. iPads and Chromebooks are currently <strong>NOT</strong> compatible with our examination software.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      // --- OTHER SECTIONS (KEPT AS IS) ---
      case 'office-hours':
        return (
          <>
            <PageHeader title="Office Hours" subtitle="We are here to assist your academic journey." icon={ClockIcon} />
            <SectionWrapper title="Standard Operating Hours">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-premium">
                     <h3 className="text-2xl font-serif font-bold text-pau-blue mb-8">Administrative Offices</h3>
                     <div className="space-y-6">
                        {[
                          { dept: "Admissions & Recruitment", hours: "Mon - Fri, 9 AM - 6 PM (PST)" },
                          { dept: "Registrar's Office", hours: "Mon - Thu, 10 AM - 5 PM (PST)" },
                          { dept: "Financial Aid Service", hours: "Tue - Fri, 10 AM - 4 PM (PST)" },
                          { dept: "Career Services", hours: "Mon - Fri, 9 AM - 5 PM (PST)" }
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-start pb-4 border-b border-gray-50">
                             <span className="font-bold text-gray-700">{item.dept}</span>
                             <span className="text-pau-blue text-sm">{item.hours}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="bg-pau-darkBlue p-10 rounded-3xl text-white shadow-xl">
                     <h3 className="text-2xl font-serif font-bold text-pau-gold mb-8">Academic Support</h3>
                     <div className="space-y-6">
                        {[
                          { dept: "Law Library (Online)", hours: "24 / 7 Access" },
                          { dept: "Reference Librarian", hours: "Mon - Fri, 11 AM - 8 PM (PST)" },
                          { dept: "Academic Success Center", hours: "By Appointment Only" },
                          { dept: "IT Support Desk", hours: "Mon - Sat, 8 AM - 10 PM (PST)" }
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-start pb-4 border-b border-white/10">
                             <span className="font-bold text-gray-200">{item.dept}</span>
                             <span className="text-pau-gold text-sm">{item.hours}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'contact-info':
        return (
          <>
            <PageHeader title="Contact Information" subtitle="Direct channels to our departments." icon={PhoneIcon} />
            <SectionWrapper>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                     <MapPinIcon className="h-12 w-12 text-pau-blue mx-auto mb-6" />
                     <h4 className="text-xl font-bold mb-4">Mailing Address</h4>
                     <p className="text-gray-500 font-light leading-relaxed">123 University Drive<br/>Santa Clara, CA 95050<br/>United States</p>
                  </div>
                  <div className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                     <PhoneIcon className="h-12 w-12 text-pau-blue mx-auto mb-6" />
                     <h4 className="text-xl font-bold mb-4">Phone Support</h4>
                     <p className="text-gray-500 font-light leading-relaxed">Main Line: (408) 555-0100<br/>Admissions: (408) 555-0199<br/>Registrar: (408) 555-0102</p>
                  </div>
                  <div className="p-10 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                     <EnvelopeIcon className="h-12 w-12 text-pau-blue mx-auto mb-6" />
                     <h4 className="text-xl font-bold mb-4">Email Inquiry</h4>
                     <p className="text-gray-500 font-light leading-relaxed">General: info@pau.edu<br/>Admissions: apply@pau.edu<br/>Support: it@pau.edu</p>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'request-info':
        return (
          <>
            <PageHeader title="Request Information" subtitle="Discover your future at PAU Law." icon={PaperAirplaneIcon} />
            <SectionWrapper>
               <div className="max-w-4xl mx-auto bg-white p-12 lg:p-20 rounded-3xl shadow-premium border border-gray-100">
                  <h3 className="text-3xl font-serif font-bold text-pau-darkBlue mb-10">Candidate Inquiry Form</h3>
                  <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Your request has been submitted successfully.'); }}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                           <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-pau-blue/5 focus:border-pau-blue transition-all" />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                           <input type="email" required className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-pau-blue/5 focus:border-pau-blue transition-all" />
                        </div>
                     </div>
                     <button type="submit" className="w-full bg-pau-blue text-white py-5 rounded-lg font-bold uppercase tracking-widest shadow-lg hover:bg-pau-gold transition-all">Submit Request</button>
                  </form>
               </div>
            </SectionWrapper>
          </>
        );

      case 'tuition-fees':
        return (
          <>
            <PageHeader title="Tuition & Fees" subtitle="Transparent pricing for your legal education." icon={CurrencyDollarIcon} />
            <SectionWrapper title="2024-2025 Academic Year">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                  <div className="bg-white p-10 rounded-3xl shadow-premium border border-gray-100">
                     <h3 className="text-2xl font-serif font-bold text-pau-blue mb-8">Base Tuition</h3>
                     <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                           <span className="text-gray-600">Per Credit Unit</span>
                           <span className="text-xl font-bold text-pau-darkBlue">$520</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                           <span className="text-gray-600">Annual Tuition (approx.)</span>
                           <span className="text-xl font-bold text-pau-darkBlue">$12,500</span>
                        </div>
                     </div>
                  </div>
                  <div className="bg-pau-darkBlue p-10 rounded-3xl shadow-xl text-white">
                     <h3 className="text-2xl font-serif font-bold text-pau-gold mb-8">Mandatory Fees</h3>
                     <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                           <span className="text-gray-300">Registration (Annual)</span>
                           <span className="text-xl font-bold">$250</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                           <span className="text-gray-300">Tech & Library Access</span>
                           <span className="text-xl font-bold">$300</span>
                        </div>
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'payment-plan':
        return (
          <>
            <PageHeader title="Payment Plans" subtitle="Flexible options to fit your financial life." icon={CreditCardIcon} />
            <SectionWrapper>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <InfoCard 
                    icon={BanknotesIcon} 
                    title="Full Annual Payment" 
                    content="Pay your entire year's tuition upfront and receive a 5% discount on your base tuition fees."
                  />
                  <InfoCard 
                    icon={ArrowPathIcon} 
                    title="Semester Installments" 
                    content="Divide your annual tuition into two semester payments due at the start of Fall and Spring."
                  />
               </div>
            </SectionWrapper>
          </>
        );

      case 'refund-policy':
        return (
          <>
            <PageHeader title="Refund Policy" subtitle="Fairness and transparency in withdrawals." icon={ShieldCheckIcon} />
            <SectionWrapper>
               <div className="max-w-4xl mx-auto">
                  <div className="bg-white p-12 rounded-3xl shadow-premium border border-gray-100 mb-12">
                     <h3 className="text-2xl font-serif font-bold text-pau-blue mb-8">Tuition Refund Schedule</h3>
                     <div className="space-y-2">
                        {[
                          { period: "Before first day of classes", refund: "100% of Tuition" },
                          { period: "Within Week 1 of Semester", refund: "90% of Tuition" },
                          { period: "Weeks 2 through 4 of Semester", refund: "50% of Tuition" },
                          { period: "After Week 8", refund: "No Refund" }
                        ].map((row, i) => (
                          <div key={i} className={`flex justify-between items-center p-5 rounded-lg ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                             <span className="font-bold text-gray-700">{row.period}</span>
                             <span className="text-pau-blue font-extrabold">{row.refund}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'admissions':
        return <Admissions content={{ title: "Admissions Gateway", intro: "Start your journey toward becoming a licensed advocate in California.", requirementsTitle: "Core Requirements", requirements: ["Conferred Bachelor's Degree", "LSAT or GRE Scores", "Personal Statement"], tuitionTitle: "Tuition & Investment", tuitionInfo: "Affordable legal education without compromising quality.", tuitionCost: "$12,500", deadlinesTitle: "Key Dates", deadlines: [{ term: "Fall 2024", date: "July 15", type: "Priority" }], faqTitle: "FAQs", faqs: [] }} shared={sharedContent} />;

      case 'app-steps':
        return (
          <>
            <PageHeader title="Application Steps" subtitle="A clear roadmap for your law school application." icon={NumberedListIcon} />
            <SectionWrapper title="Your Journey to PAU Law">
               <div className="max-w-4xl mx-auto space-y-12">
                  {[
                    { step: 1, title: "Create an LSAC Account", desc: "Most applications must be submitted via the Law School Admission Council (LSAC). Register at lsac.org to begin." },
                    { step: 2, title: "Register for the CAS", desc: "The Credential Assembly Service (CAS) centralizes your transcripts, letters of rec, and scores." },
                    { step: 3, title: "Take the LSAT or GRE", desc: "Ensure your scores are transmitted to PAU Law (Institution Code: 4921)." },
                    { step: 4, title: "Submit Transcripts", desc: "Request official transcripts from all post-secondary institutions attended." },
                    { step: 5, title: "Draft Personal Statement", desc: "A 2-3 page essay detailing your motivation for pursuing law and your unique background." },
                    { step: 6, title: "Final Submission", desc: "Complete the online application and pay the $60 application fee (fee waivers available)." }
                  ].map((s) => (
                    <div key={s.step} className="flex gap-8 group">
                       <div className="flex-shrink-0 w-16 h-16 rounded-full bg-pau-light border-2 border-pau-gold/30 flex items-center justify-center text-2xl font-serif font-bold text-pau-blue group-hover:bg-pau-gold group-hover:text-white transition-all">
                          {s.step}
                       </div>
                       <div className="pt-2">
                          <h3 className="text-xl font-bold text-pau-darkBlue mb-2">{s.title}</h3>
                          <p className="text-gray-600 leading-relaxed font-light">{s.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </SectionWrapper>
          </>
        );

      case 'academics':
        return <Academics onNavigate={handleNavigate} content={{ title: "Academic Excellence", intro: "A rigorous, tech-driven approach to legal education.", programsTitle: "Degree Programs", programs: [{ name: "Juris Doctor (JD)", description: "4-year bar-qualifying program." }], concentrationsTitle: "Concentrations", concentrations: ["Tech Law", "Civil Litigation", "Corporate Law"] }} />;

      case 'curriculum-schedule':
        return (
          <>
            <PageHeader title="Curriculum Roadmap" subtitle="A structured 4-year path to your Juris Doctor." icon={MapIcon} />
            <SectionWrapper title="JD Degree Sequence">
               <div className="space-y-10">
                  {[
                    { year: "1L: Foundations", subjects: ["Torts", "Contracts", "Criminal Law", "Legal Writing"], focus: "Mastering the fundamentals of legal reasoning." },
                    { year: "2L: Breadth", subjects: ["Property Law", "Civil Procedure", "Constitutional Law", "FYLSX Prep"], focus: "Expanding into regulatory and procedural law. Preparation for the Baby Bar." },
                    { year: "3L: Specialization", subjects: ["Evidence", "Business Associations", "Wills & Trusts", "Electives"], focus: "Developing expertise in specific practice areas." },
                    { year: "4L: Mastery", subjects: ["Criminal Procedure", "Remedies", "Bar Review Course", "Clinical Externship"], focus: "Intensive Bar exam preparation and practical clinical experience." }
                  ].map((level, idx) => (
                    <div key={idx} className="bg-white p-10 rounded-2xl shadow-premium border border-gray-100 flex flex-col md:flex-row gap-8 items-start hover:border-pau-gold transition-colors">
                       <div className="md:w-1/4">
                          <h3 className="text-3xl font-serif font-bold text-pau-blue mb-2">{level.year}</h3>
                          <div className="h-1 w-10 bg-pau-gold"></div>
                       </div>
                       <div className="md:w-3/4">
                          <p className="text-gray-600 mb-6 italic">{level.focus}</p>
                          <div className="grid grid-cols-2 gap-4">
                             {level.subjects.map((sub, sIdx) => (
                               <div key={sIdx} className="flex items-center text-sm font-bold text-pau-darkBlue">
                                  <ArrowRightIcon className="h-4 w-4 mr-2 text-pau-gold" /> {sub}
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </SectionWrapper>
          </>
        );

      case 'faculty':
        return <Faculty content={{ title: "Faculty", intro: "Distinguished scholars and legal practitioners.", facultyList: FACULTY_DATA }} shared={sharedContent} />;

      case 'admin':
        return <Admin home={MOCK_HOME_CONTENT} setHome={() => {}} admissions={{ requirements: [] }} setAdmissions={() => {}} academics={{ programs: [], concentrations: [] }} setAcademics={() => {}} faculty={{ facultyList: FACULTY_DATA }} setFaculty={() => {}} notices={{ notices: NEWS_DATA }} setNotices={() => {}} />;

      default:
        return (
          <div className="pt-60 pb-40 text-center animate-fade-in">
            <h2 className="text-3xl font-serif text-pau-darkBlue">Coming Soon</h2>
            <p className="text-gray-400 mt-4 font-light">We are finalizing the content for this section.</p>
            <button onClick={() => handleNavigate('home')} className="mt-12 bg-pau-gold text-white px-8 py-3 rounded-full font-bold hover:bg-pau-blue transition-all">Return Home</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pau-gold/30">
      <Navbar currentLang={currentLang} onLanguageChange={handleLanguageChange} isTranslating={isTranslating} currentPage={currentPage} onNavigate={handleNavigate} shared={sharedContent} />
      <main className="min-h-[80vh]">{renderContent()}</main>
      <Footer onNavigate={handleNavigate} shared={sharedContent} />
    </div>
  );
}
