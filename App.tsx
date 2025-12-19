
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
  UserGroupIcon,
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
  CommandLineIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  PresentationChartBarIcon,
  ClipboardDocumentIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronDownIcon
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
    bio: "Dean Rodriguez has spent 20 years specializing in Civil Rights litigation and has been leading PAU Law toward academic excellence since 2018.",
    expertise: ["Constitutional Law", "Civil Rights"]
  },
  {
    name: "Prof. Michael Chen",
    title: "Professor of Technology Law",
    education: "J.D., UC Berkeley; LL.M., Harvard",
    bio: "A pioneer in Silicon Valley tech regulations, Prof. Chen consults for major AI startups and leads our High Tech Law Institute.",
    expertise: ["Intellectual Property", "AI Ethics", "Patent Law"]
  }
];

// --- HELPER COMPONENTS (DESIGN SYSTEM) ---

const PageHeader: React.FC<{ title: string; subtitle: string; icon?: React.ElementType }> = ({ title, subtitle, icon: Icon }) => (
  <div className="relative bg-pau-darkBlue pt-56 pb-28 overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pau-blue/30 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pau-gold/30 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
      {Icon && (
        <div className="inline-flex p-4 bg-white/5 rounded-full border border-white/10 mb-8 backdrop-blur-sm shadow-glow">
          <Icon className="h-10 w-10 text-pau-gold" />
        </div>
      )}
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 whitespace-pre-line">
        {title}
      </h1>
      <div className="w-20 h-1 bg-pau-gold mx-auto mb-8 rounded-full"></div>
      <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
        {subtitle}
      </p>
    </div>
  </div>
);

const SectionWrapper: React.FC<{ children?: React.ReactNode, title?: string, centered?: boolean, bgColor?: string }> = ({ children, title, centered = false, bgColor = "bg-white" }) => (
  <div className={`${bgColor} py-24 border-b border-gray-100 last:border-0`}>
    <div className={`max-w-7xl mx-auto px-6 animate-fade-in ${centered ? 'text-center' : ''}`}>
      {title && (
        <div className={`mb-16 ${centered ? 'flex flex-col items-center' : ''}`}>
          <h2 className="text-4xl font-serif font-bold text-pau-darkBlue mb-4">{title}</h2>
          <div className="w-16 h-1 bg-pau-gold rounded-full"></div>
        </div>
      )}
      {children}
    </div>
  </div>
);

const InfoCard: React.FC<{ icon: any, title: string, content: string | React.ReactNode, isDark?: boolean }> = ({ icon: Icon, title, content, isDark = false }) => (
  <div className={`p-10 rounded-3xl border transition-all duration-500 mb-10 group ${isDark ? 'bg-pau-darkBlue text-white border-white/10 shadow-2xl' : 'bg-white shadow-premium border-gray-100 hover:border-pau-gold/50'}`}>
    <div className="flex items-start mb-6">
      <div className={`p-4 rounded-2xl mr-6 transition-all flex-shrink-0 ${isDark ? 'bg-white/10 text-pau-gold' : 'bg-pau-light text-pau-blue group-hover:bg-pau-blue group-hover:text-white'}`}>
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

      case 'history-mission':
        return (
          <>
            <PageHeader title={"History &\nMission"} subtitle="Forging excellence in legal education since 1978." icon={GlobeAmericasIcon} />
            <SectionWrapper title="A Legacy of Access">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 leading-relaxed font-light">
                    Founded in Santa Clara, California, PAU School of Law was established to break the traditional barriers of entry into the legal profession.
                  </p>
                  <p className="text-xl text-gray-600 leading-relaxed font-light">
                    By leveraging digital innovation, we provide a rigorous JD program that honors the diverse life experiences of our student body.
                  </p>
                </div>
                <div className="bg-pau-darkBlue p-12 rounded-[40px] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pau-gold/10 rounded-bl-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                  <h3 className="text-2xl font-serif font-bold text-pau-gold mb-8">Timeline of Excellence</h3>
                  <div className="space-y-8">
                    {[
                      { year: '1978', event: 'Founded in Santa Clara, California.' },
                      { year: '1995', event: 'Registered with the CA Committee of Bar Examiners.' },
                      { year: '2010', event: 'Launched pioneer Digital JD Program.' },
                      { year: '2024', event: 'Surpassed 2,500 active alumni globally.' }
                    ].map((m, i) => (
                      <div key={i} className="flex items-start space-x-6">
                        <span className="text-white font-bold font-serif text-lg bg-white/10 px-3 py-1 rounded border border-white/20">{m.year}</span>
                        <p className="text-gray-400 text-sm font-medium mt-1.5">{m.event}</p>
                      </div>
                    ))}
                  </div>
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
              <div className="max-w-5xl mx-auto bg-white p-10 lg:p-16 rounded-[60px] shadow-premium border border-gray-50 flex flex-col md:flex-row gap-16 items-center">
                  <div className="md:w-[40%] flex-shrink-0">
                    <div className="w-full aspect-[4/5] bg-gray-200 rounded-[40px] overflow-hidden shadow-2xl ring-12 ring-pau-light relative">
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=800&q=80" 
                        alt="President Mockup" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pau-darkBlue/80 to-transparent p-8">
                         <p className="text-white font-serif font-bold text-xl leading-tight">Dr. William J. Vance</p>
                         <p className="text-pau-gold text-[10px] font-bold uppercase tracking-widest mt-1">President, PAU</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-[60%]">
                    <div className="relative mb-10">
                      <div className="absolute -left-6 -top-4 text-pau-gold/20 text-8xl font-serif leading-none">"</div>
                      <h2 className="text-3xl lg:text-4xl font-serif font-bold text-pau-darkBlue leading-tight relative z-10">
                        Legal education must evolve with the world it serves.
                      </h2>
                    </div>
                    <div className="prose prose-lg text-gray-600 leading-relaxed font-light space-y-6">
                      <p>At Pacific American University School of Law, we don't just teach the law; we prepare you to master it in a global, digital-first context. Our mission is to ensure that talent and ambition are never limited by geographic boundaries.</p>
                      <p>As we navigate an increasingly complex legal landscape, our commitment remains fixed: providing a rigorous, accessible, and technologically advanced education that empowers you to become a licensed advocate and a force for positive change.</p>
                      <p>I welcome you to join our vibrant community of scholars and practitioners.</p>
                      <div className="pt-8 border-t border-gray-100">
                        <p className="font-serif text-3xl text-pau-blue">William J. Vance</p>
                        <p className="text-xs font-bold text-pau-gold uppercase tracking-[0.2em] mt-2">Office of the President</p>
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
            <PageHeader title={"Dean's\nMessage"} subtitle="Academic rigor and Bar readiness." icon={AcademicCapIcon} />
            <SectionWrapper>
              <div className="max-w-4xl mx-auto bg-pau-darkBlue p-12 lg:p-20 rounded-[60px] shadow-2xl text-white">
                <div className="flex flex-col md:flex-row gap-16 items-center mb-16 border-b border-white/10 pb-16">
                  <div className="md:w-1/3 text-center">
                    <div className="aspect-square w-40 h-40 bg-pau-gold rounded-full flex items-center justify-center text-pau-darkBlue text-6xl font-serif mx-auto shadow-glow transition-transform hover:scale-105 duration-500">ER</div>
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-4xl font-serif font-bold mb-4">Dr. Elena Rodriguez</h2>
                    <p className="text-pau-gold font-bold uppercase tracking-widest text-sm mb-6">Dean & Professor of Constitutional Law</p>
                    <div className="h-1 w-20 bg-pau-gold"></div>
                  </div>
                </div>
                <div className="prose prose-lg prose-invert text-gray-300 leading-relaxed font-light space-y-6">
                  <p>As Dean, my commitment is to provide a curriculum that is both theoretically profound and practically indispensable. Our J.D. program is built on the philosophy that modern lawyers must be technologically fluent and ethically anchored.</p>
                  <p>Our focus on the California Bar Examination is unparalleled. From day one, we integrate the skills necessary for success on the nation's most challenging licensure exam.</p>
                </div>
              </div>
            </SectionWrapper>
          </>
        );

      case 'academic-calendar':
        return (
          <>
            <PageHeader title={"Academic\nCalendar"} subtitle="Key milestones for the 2024-2025 academic year." icon={CalendarDaysIcon} />
            <SectionWrapper title="Semester Schedule">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {[
                    { 
                      semester: "Fall 2024", 
                      dates: [
                        { event: "Classes Begin", date: "Sep 2, 2024" },
                        { event: "Thanksgiving Break", date: "Nov 25-29, 2024" },
                        { event: "Final Exams", date: "Dec 14-21, 2024" },
                        { event: "Winter Break", date: "Dec 22 - Jan 12" }
                      ]
                    },
                    { 
                      semester: "Spring 2025", 
                      dates: [
                        { event: "Classes Begin", date: "Jan 13, 2025" },
                        { event: "Spring Break", date: "Mar 17-21, 2025" },
                        { event: "Final Exams", date: "May 10-17, 2025" },
                        { event: "Commencement", date: "May 31, 2025" }
                      ]
                    }
                  ].map((sem, i) => (
                    <div key={i} className="bg-white p-12 rounded-[40px] shadow-premium border border-gray-50">
                       <h3 className="text-3xl font-serif font-bold text-pau-blue mb-10 border-b border-pau-gold/20 pb-6">{sem.semester}</h3>
                       <div className="space-y-6">
                          {sem.dates.map((d, idx) => (
                            <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                               <span className="font-bold text-gray-800 text-lg">{d.event}</span>
                               <span className="text-pau-gold font-extrabold text-lg">{d.date}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </SectionWrapper>
          </>
        );

      case 'bar-info':
        return (
          <>
            <PageHeader title={"Bar Exam\nInformation"} subtitle="Your roadmap to California licensure." icon={ShieldCheckIcon} />
            <SectionWrapper title="The Licensure Path">
               <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-pau-darkBlue p-12 rounded-[50px] shadow-2xl text-white flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-pau-gold mb-8">Baby Bar (FYLSX)</h3>
                      <p className="text-gray-300 leading-relaxed font-light mb-10 italic">Mandatory for first-year students at unaccredited schools.</p>
                      <p className="text-gray-400 mb-8 text-sm leading-relaxed">It ensures you have the foundational analytical skills required for advanced legal study before proceeding to 2L.</p>
                    </div>
                    <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-pau-gold">
                       <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 mr-3" /> Administered June/October</li>
                       <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 mr-3" /> Covers Contracts, Torts, Crimes</li>
                    </ul>
                  </div>
                  <div className="bg-white p-12 rounded-[50px] shadow-premium border border-gray-100 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-pau-blue mb-8">General Bar Exam</h3>
                      <p className="text-gray-500 leading-relaxed font-light mb-10 italic">The final gateway to practice in California.</p>
                      <p className="text-gray-500 mb-8 text-sm leading-relaxed">Graduation from PAU qualifies you to take this exam upon satisfying all State Bar moral character requirements and passing the MPRE.</p>
                    </div>
                    <button className="w-full bg-pau-light py-5 rounded-2xl text-pau-blue font-bold uppercase tracking-widest hover:bg-pau-blue hover:text-white transition-all">Official State Bar Guide</button>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'course-desc':
        return (
          <>
            <PageHeader title={"Course\nDescriptions"} subtitle="Explore our foundational and specialized legal curriculum." icon={ListBulletIcon} />
            <SectionWrapper title="Core Curriculum Highlights">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { code: "LAW 101", name: "Contracts", desc: "Foundational study of offer, acceptance, consideration, and enforcement of legal agreements." },
                    { code: "LAW 102", name: "Torts", desc: "Analysis of non-contractual civil wrongs, negligence, strict liability, and intentional harms." },
                    { code: "LAW 205", name: "Constitutional Law", desc: "Powers of the Federal Government and Individual Rights under the U.S. Constitution." },
                    { code: "LAW 310", name: "Evidence", desc: "Rules governing the admissibility of proof in civil and criminal trials under the CA Evidence Code." }
                  ].map((course, i) => (
                    <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-premium hover:shadow-2xl transition-all group">
                       <span className="text-[10px] font-bold text-pau-gold uppercase tracking-[0.3em] mb-4 block group-hover:text-pau-blue transition-colors">{course.code}</span>
                       <h4 className="text-2xl font-serif font-bold text-pau-darkBlue mb-4">{course.name}</h4>
                       <p className="text-gray-500 leading-relaxed font-light">{course.desc}</p>
                    </div>
                  ))}
               </div>
            </SectionWrapper>
          </>
        );

      case 'counseling':
        return (
          <>
            <PageHeader title={"Counseling &\nAcademic Success"} subtitle="Dedicated support for your professional growth." icon={ChatBubbleLeftRightIcon} />
            <SectionWrapper title="Personalized Mentorship">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <InfoCard icon={UserCircleIcon} title="Faculty Mentors" content="Connect with practicing attorneys for real-world career guidance and clerkship opportunities." />
                  <InfoCard icon={PencilSquareIcon} title="Legal Writing Lab" content="Intensive coaching on legal analysis, case brief construction, and essay writing skills." />
                  <InfoCard icon={CheckBadgeIcon} title="Bar Success Program" content="Targeted workshops for FYLSX and General Bar preparation starting from your first semester." />
               </div>
            </SectionWrapper>
          </>
        );

      case 'grad-reqs':
        return (
          <>
            <PageHeader title={"Graduation\nRequirements"} subtitle="The roadmap to your Juris Doctor degree." icon={CheckBadgeIcon} />
            <SectionWrapper title="Degree Completion Criteria">
               <div className="max-w-4xl mx-auto bg-white p-12 lg:p-20 rounded-[60px] shadow-premium border border-gray-100">
                  <div className="space-y-12">
                     {[
                       { title: "84 Semester Units", desc: "Completion of all required doctrinal and clinical coursework within the specified timeframe." },
                       { title: "2.0 Minimum GPA", desc: "Maintain a cumulative Grade Point Average on a 4.0 scale throughout the program." },
                       { title: "Residency Requirement", desc: "Minimum of four years of law study in accordance with California State Bar rules." },
                       { title: "FYLSX Completion", desc: "Successful passing of the First-Year Law Students' Examination (if applicable)." }
                     ].map((item, i) => (
                       <div key={i} className="flex items-start gap-8">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pau-light flex items-center justify-center text-pau-gold">
                             <CheckCircleIcon className="h-6 w-6" />
                          </div>
                          <div>
                             <h4 className="text-2xl font-serif font-bold text-pau-blue mb-2">{item.title}</h4>
                             <p className="text-gray-600 leading-relaxed font-light text-lg">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'curriculum-schedule':
        return (
          <>
            <PageHeader title={"Curriculum\nRoadmap"} subtitle="A structured 4-year sequence for the modern advocate." icon={MapIcon} />
            <SectionWrapper title="Degree Sequence">
               <div className="space-y-12">
                  {[
                    { year: "1L", title: "Legal Foundations", subjects: ["Torts", "Contracts", "Criminal Law", "Legal Writing I"] },
                    { year: "2L", title: "Regulatory Depth", subjects: ["Property Law", "Civil Procedure", "Constitutional Law", "Legal Writing II"] },
                    { year: "3L", title: "Specialized Electives", subjects: ["Evidence", "Business Organizations", "Wills & Trusts", "Community Property"] },
                    { year: "4L", title: "Mastery & Bar Prep", subjects: ["Criminal Procedure", "Remedies", "Professional Responsibility", "Bar Review"] }
                  ].map((lvl, i) => (
                    <div key={i} className="bg-white p-12 rounded-[50px] shadow-premium border border-gray-100 flex flex-col md:flex-row gap-12 items-center hover:border-pau-gold transition-all duration-500">
                       <div className="md:w-1/4 text-center md:text-left">
                          <span className="text-6xl font-serif font-bold text-pau-gold/20 block mb-2">{lvl.year}</span>
                          <h3 className="text-xl font-serif font-bold text-pau-blue uppercase tracking-widest">{lvl.title}</h3>
                       </div>
                       <div className="md:w-3/4 grid grid-cols-2 gap-6">
                          {lvl.subjects.map((sub, j) => (
                             <div key={j} className="flex items-center text-lg text-gray-700 font-light">
                                <ArrowRightIcon className="h-5 w-5 mr-3 text-pau-gold" /> {sub}
                             </div>
                          ))}
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
            <PageHeader title={"Bar\nRegistration"} subtitle="Registered with the State Bar of California." icon={ShieldCheckIcon} />
            <SectionWrapper title="Institutional Status">
               <div className="max-w-4xl mx-auto space-y-12">
                  <div className="bg-white p-12 rounded-[40px] border-l-[12px] border-pau-gold shadow-premium">
                    <h3 className="text-3xl font-serif font-bold text-pau-blue mb-6">Official Notice</h3>
                    <p className="text-gray-600 leading-relaxed font-light text-xl">
                      Pacific American University School of Law is a private institution. The Juris Doctor (J.D.) program is registered with the Committee of Bar Examiners of the State Bar of California as an unaccredited distance-learning law school.
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
            <SectionWrapper title="Reports & Compliance">
               <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DocumentLink title="2023 Bar Pass Rate Report" />
                  <DocumentLink title="Section 6061.7 Disclosure" />
                  <DocumentLink title="Job Placement Data (2022-2023)" />
                  <DocumentLink title="Tuition & Refund Policies" />
               </div>
            </SectionWrapper>
          </>
        );

      case 'admin-staffs':
        return (
          <>
            <PageHeader title={"Admin &\nStaff"} subtitle="The team behind your academic success." icon={UsersIcon} />
            <SectionWrapper title="Leadership">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[
                  { name: "Dr. William J. Vance", role: "President" },
                  { name: "Dr. Elena Rodriguez", role: "Dean of Law" },
                  { name: "Sarah Montgomery, J.D.", role: "Associate Dean" }
                ].map((staff, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-premium hover:border-pau-gold transition-all text-center group">
                    <div className="w-24 h-24 bg-pau-light rounded-3xl mx-auto mb-6 flex items-center justify-center text-pau-blue group-hover:bg-pau-blue group-hover:text-white transition-all">
                       <UserIcon className="h-10 w-10" />
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-pau-darkBlue">{staff.name}</h4>
                    <p className="text-xs font-bold text-pau-gold uppercase tracking-[0.2em] mt-3">{staff.role}</p>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </>
        );

      case 'catalog':
        return (
          <>
            <PageHeader title={"School\nCatalog"} subtitle="Academic policies and program requirements." icon={BookOpenIcon} />
            <SectionWrapper centered>
                 <div className="max-w-2xl bg-white p-16 rounded-[60px] shadow-premium border border-gray-100 flex flex-col items-center">
                    <div className="p-8 bg-red-50 text-red-600 rounded-[32px] mb-10 shadow-inner">
                      <DocumentTextIcon className="h-24 w-24" />
                    </div>
                    <h3 className="text-4xl font-serif font-bold text-pau-blue mb-4">2024-2025 Catalog</h3>
                    <button className="w-full bg-pau-blue text-white py-6 rounded-2xl font-bold uppercase tracking-widest shadow-glow hover:bg-pau-gold transition-all transform hover:-translate-y-1">
                      Download Official Catalog (PDF)
                    </button>
                 </div>
            </SectionWrapper>
          </>
        );

      case 'school-form':
        return (
          <>
            <PageHeader title={"School\nForms"} subtitle="Streamlining your administrative needs." icon={ClipboardDocumentListIcon} />
            <SectionWrapper title="Online Request Center">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DocumentLink title="Official Transcript Request" />
                  <DocumentLink title="Notice of Withdrawal" />
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
                    { q: "Is PAU Law accredited by the ABA?", a: "No. PAU School of Law is registered with the Committee of Bar Examiners of the State Bar of California as an unaccredited distance-learning law school." }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white p-12 rounded-[40px] shadow-premium border border-gray-50 hover:shadow-2xl transition-all">
                      <h4 className="text-2xl font-serif font-bold text-pau-blue mb-6 flex items-start">
                        <span className="text-pau-gold mr-4">Q.</span>
                        {faq.q}
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-light text-lg pl-12 border-l-2 border-pau-gold/20">
                        {faq.a}
                      </p>
                    </div>
                  ))}
               </div>
            </SectionWrapper>
          </>
        );

      case 'admission-reqs':
        return (
          <>
            <PageHeader title={"Admission\nRequirements"} subtitle="Identifying the next generation of leaders." icon={IdentificationIcon} />
            <SectionWrapper title="Eligibility Criteria">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InfoCard icon={AcademicCapIcon} title="Undergrad Degree" content="A Bachelor's degree required from an accredited institution." />
                  <InfoCard icon={PencilSquareIcon} title="Personal Statement" content="A 500-word essay explaining your motivation for legal study." />
               </div>
            </SectionWrapper>
          </>
        );

      case 'tuition-fees':
        return (
          <>
            <PageHeader title={"Tuition &\nFees"} subtitle="Invest in your future with competitive pricing." icon={CurrencyDollarIcon} />
            <SectionWrapper title="2024-2025 Schedule">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-white p-12 rounded-[50px] shadow-premium border border-gray-50">
                     <h3 className="text-3xl font-serif font-bold text-pau-blue mb-10">Base Rates</h3>
                     <div className="space-y-6">
                        <div className="flex justify-between border-b pb-4"><span className="text-gray-600">Per Unit</span><span className="font-bold">$520</span></div>
                        <div className="flex justify-between border-b pb-4"><span className="text-gray-600">Annual Estimate</span><span className="font-bold">$12,500</span></div>
                     </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      case 'admissions':
        return <Admissions content={{ title: "Admissions Portal", intro: "Your gateway to a global legal career.", requirementsTitle: "Prerequisites", requirements: ["Bachelor's Degree", "LSAT Score"], tuitionTitle: "Financial Investment", tuitionInfo: "Designed for accessibility.", tuitionCost: "$12,500", deadlinesTitle: "Priority Deadlines", deadlines: [{ term: "Fall 2024", date: "July 15", type: "Priority" }], faqTitle: "FAQs", faqs: [] }} shared={sharedContent} />;

      case 'academics':
        return <Academics onNavigate={handleNavigate} content={{ title: "Academic Excellence", intro: "A rigorous approach to U.S. Law.", programsTitle: "Degree Programs", programs: [{ name: "JD", description: "4-year bar-qualifying Juris Doctor degree." }], concentrationsTitle: "Specializations", concentrations: ["Technology Law", "Civil Litigation"] }} />;

      case 'faculty':
        return <Faculty content={{ title: "Our Faculty", intro: "Distinguished legal scholars and practicing specialists.", facultyList: FACULTY_DATA }} shared={sharedContent} />;

      case 'admin':
        return <Admin home={MOCK_HOME_CONTENT} setHome={() => {}} admissions={{ requirements: [] }} setAdmissions={() => {}} academics={{ programs: [], concentrations: [] }} setAcademics={() => {}} faculty={{ facultyList: FACULTY_DATA }} setFaculty={() => {}} notices={{ notices: NEWS_DATA }} setNotices={() => {}} />;

      default:
        return (
          <div className="pt-60 pb-40 text-center animate-fade-in">
            <h2 className="text-3xl font-serif text-pau-darkBlue">Building Your Experience</h2>
            <button onClick={() => handleNavigate('home')} className="mt-12 bg-pau-gold text-white px-10 py-4 rounded-full font-bold">Return to Campus</button>
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
