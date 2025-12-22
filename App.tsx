
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
  IdentificationIcon,
  NewspaperIcon
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('English');
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  
  const [homeContent, setHomeContent] = useState(MOCK_HOME_CONTENT);
  const [noticesContent, setNoticesContent] = useState({ 
    title: 'Campus Notices', 
    intro: 'Stay informed about upcoming events, academic deadlines, and policy changes.', 
    notices: [] 
  });

  const [weeklyDictaContent, setWeeklyDictaContent] = useState({
    title: 'Weekly Dicta',
    intro: 'Official announcements and student life updates for the PAU community.',
    notices: [
      {
        id: 'wd-1',
        title: 'Spring 2026 Semester Registration Now Live',
        date: 'Nov 15, 2025',
        summary: 'Enrollment for the Spring 2026 trimester is officially open for all returning and incoming students.',
        body: '<p>Pacific American University is pleased to announce that registration for the Spring 2026 semester is now officially open via Populi. Students should consult the Academic Calendar for deadline information and ensure all prerequisites for upper-division courses are met.</p>',
        category: 'Academic',
        isPinned: true
      },
      {
        id: 'wd-2',
        title: 'New Library Database Access: Westlaw Precision',
        date: 'Nov 12, 2025',
        summary: 'All PAU students now have access to the latest Westlaw Precision AI features for legal research.',
        body: '<p>The Law Library has successfully integrated Westlaw Precision. This updated suite includes advanced AI-driven research capabilities, enhanced Shepardizing tools, and faster document analysis. Training sessions will be held next Tuesday at 5 PM PST via Zoom.</p>',
        category: 'General'
      },
      {
        id: 'wd-3',
        title: 'Moot Court Competition Results',
        date: 'Nov 10, 2025',
        summary: 'Congratulations to our 3L finalists in the Fall 2025 Moot Court Invitational.',
        body: '<p>Last week\'s Moot Court competition showcased exceptional advocacy skills from our 3L class. Special congratulations to the winning team for their outstanding oral arguments on the 4th Amendment implications of biometric surveillance.</p>',
        category: 'Event'
      }
    ]
  });

  const [facultyContent, setFacultyContent] = useState({ 
    title: 'Distinguished Faculty', 
    intro: 'Our professors are leaders in legal theory and practitioners with real-world impact.', 
    facultyList: [
      { 
        name: "Michael Marino, Esq.", 
        title: "Professor of Law", 
        education: ["J.D., St. John's University School of Law"], 
        bio: "Attorney Licensed in CA & NY. Creator of Marino Legal Academy. Teaches Legal Writing & FYLSX. Professor Marino focuses on structured legal analysis and rigorous preparatory methodologies for bar examination success.", 
        expertise: ["Legal Writing", "FYLSX Review"],
        phone: "(213) 674-7174",
        email: "mmarino@paucal.org",
        category: "Faculty",
        photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "Jonathan H. Levy", 
        title: "Professor of Law", 
        education: ["J.D., Taft Law School", "Ph.D., Univ. of Cincinnati"], 
        bio: "Attorney Licensed in CA. Experienced Professor at Kaplan & South University. Dr. Levy brings over two decades of experience in both the legal profession and academia.", 
        expertise: ["Torts", "Intro to Law"],
        phone: "(213) 674-7174",
        email: "jlevy@paucal.org",
        category: "Faculty",
        photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "Shandrea P. Williams", 
        title: "Professor of Law", 
        education: ["J.D., Loyola University School of Law"], 
        bio: "Attorney Licensed in LA. Associate Professor at Southern University Law Center. Expert in contract formation, commercial transactions, and domestic relations.", 
        expertise: ["Contracts"],
        phone: "(213) 674-7174",
        email: "swilliams@paucal.org",
        category: "Faculty",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "John Chandler", 
        title: "Professor of Law", 
        education: ["J.D., Loyola Marymount University School of Law"], 
        bio: "Attorney Licensed in CA. Extensive teaching experience at Westwood & Rancho Santiago College. Specializes in criminal procedures and constitutional rights.", 
        expertise: ["Criminal Law"],
        phone: "(213) 674-7174",
        email: "jchandler@paucal.org",
        category: "Faculty",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "Dr. Hyun Joo Kang", 
        title: "President & CEO", 
        education: ["Ph.D., Education Leadership"], 
        bio: "Dr. Kang provides strategic direction and leadership for the University, ensuring the fulfillment of its mission to provide accessible legal education.", 
        expertise: ["Educational Management"],
        phone: "(213) 674-7174",
        email: "hjkang@paucal.org",
        category: "Staff",
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "Phillip Bohl", 
        title: "Associate Dean", 
        education: ["J.D., Pepperdine Law", "M.L.I.S., UCLA"], 
        bio: "Associate Dean Bohl manages academic programs and information resources, bridging the gap between library services and academic excellence.", 
        expertise: ["Academic Administration"],
        phone: "(213) 674-7174",
        email: "pbohl@paucal.org",
        category: "Staff",
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "Nam Hwan Jung", 
        title: "Dean of Admissions", 
        education: ["B.A., Political Science"], 
        bio: "Dean Jung oversees the recruitment and admission processes, dedicated to building a talented and diverse student body.", 
        expertise: ["Student Recruitment"],
        phone: "(213) 674-7174",
        email: "nhjung@paucal.org",
        category: "Staff",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400&q=80"
      },
      { 
        name: "Joyee J. Jea", 
        title: "IT and Marketing Director", 
        education: ["B.S., Communications & Tech"], 
        bio: "Director Jea leads the university's digital presence and technological infrastructure, ensuring a seamless online learning environment.", 
        expertise: ["Digital Marketing", "IT Systems"],
        phone: "(213) 674-7174",
        email: "jjea@paucal.org",
        category: "Staff",
        photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=400&h=400&q=80"
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
              <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                <div className="bg-pau-light p-6 md:p-10 rounded-2xl md:rounded-[40px] border-l-4 md:border-l-8 border-pau-gold shadow-premium">
                  <h3 className="text-sm md:text-lg font-bold text-pau-blue uppercase tracking-widest mb-4">Official Designation</h3>
                  <p className="text-base md:text-xl text-gray-700 leading-relaxed font-light">
                    Pacific American University School of Law is a <span className="font-bold text-pau-darkBlue">Registered Unaccredited Correspondence Law School</span> in the State of California.
                  </p>
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
                    <div className="w-full aspect-[3/4] bg-gray-200 rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl relative text-pau-blue flex items-center justify-center">
                      <UserIcon className="h-24 md:h-32 w-24 md:w-32 text-gray-300" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pau-darkBlue/90 to-transparent p-6 md:p-8">
                         <p className="text-white font-serif font-bold text-lg md:text-xl leading-tight">Dr. Hyun Joo Kang</p>
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
                        <p className="font-serif text-2xl md:text-3xl text-pau-blue">Dr. Hyun Joo Kang</p>
                        <p className="text-[10px] md:text-xs font-bold text-pau-gold uppercase tracking-[0.2em] mt-2">President & CEO, PAU</p>
                      </div>
                    </div>
                  </div>
              </div>
            </SectionWrapper>
          </>
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
               </div>
            </SectionWrapper>
          </>
        );

      case 'faculty':
      case 'admin-staffs':
        return <Faculty content={facultyContent} shared={shared} currentPage={currentPage} onNavigate={handleNavigate} />;

      case 'admissions':
      case 'apply-now':
        return <Admissions content={{
          title: 'Admissions',
          intro: 'Start your journey toward a legal career with Pacific American University.',
          deadlinesTitle: 'Application Deadlines',
          deadlines: [{ term: 'Fall 2026', date: 'August 1, 2026', type: 'Regular Decision' }],
          requirementsTitle: 'Admission Requirements',
          requirements: ['Bachelor\'s Degree', 'Personal Statement', 'Letters of Recommendation'],
          tuitionTitle: 'Tuition & Value',
          tuitionInfo: 'One of the most accessible JD programs in California.',
          tuitionCost: '$9,000',
          faqTitle: 'Admissions FAQ',
          faqs: [{ question: 'Is it online?', answer: 'Yes, 100% online.' }]
        }} shared={shared} />;
      
      case 'academics':
        return <Academics content={academicsContent} onNavigate={handleNavigate} currentPage={currentPage} />;
      
      case 'notices':
        return <NoticeBoard content={noticesContent} onNewsClick={setSelectedNews} shared={shared} />;

      case 'weekly-dicta':
        return <NoticeBoard content={weeklyDictaContent} onNewsClick={setSelectedNews} shared={shared} />;

      case 'contact-info':
        return (
          <>
            <PageHeader title={"Contact\nInformation"} subtitle="Direct lines to our offices." icon={PhoneIcon} />
            <SectionWrapper title="Connect with PAUSL">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                  <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[40px] shadow-premium border border-gray-100 flex items-start gap-4 md:gap-6">
                    <MapPinIcon className="h-5 md:h-6 w-5 md:w-6 text-pau-blue" />
                    <div>
                       <h4 className="text-[9px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Campus Address</h4>
                       <p className="text-sm md:text-lg text-pau-darkBlue font-medium">3435 Wilshire Blvd. Suite 430<br />Los Angeles, CA 90010</p>
                    </div>
                  </div>
                  <div className="bg-pau-darkBlue p-6 md:p-10 rounded-2xl md:rounded-[40px] text-white flex items-start gap-4 md:gap-6">
                    <PhoneIcon className="h-5 md:h-6 w-5 md:w-6 text-pau-gold" />
                    <div>
                       <h4 className="text-[9px] md:text-xs font-bold text-pau-gold/60 uppercase tracking-widest mb-1 md:mb-2">Direct Line</h4>
                       <p className="text-sm md:text-lg font-medium">Tel: (213) 674-7174</p>
                    </div>
                  </div>
               </div>
            </SectionWrapper>
          </>
        );

      default:
        return (
          <div className="pt-44 pb-20 text-center">
            <h1 className="text-2xl font-serif font-bold text-pau-blue mb-4">Under Construction</h1>
            <button onClick={() => handleNavigate('home')} className="mt-4 md:mt-8 text-pau-gold font-bold uppercase tracking-widest border-b border-pau-gold text-xs">Back to Home</button>
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
