
import React, { useState, useTransition, useEffect, useRef } from 'react';
import { HomeContent, Clinic, SharedContent, Page } from '../types';
import { 
  ArrowRightIcon, 
  LightBulbIcon, 
  GlobeAmericasIcon, 
  ScaleIcon, 
  BuildingLibraryIcon, 
  GlobeAsiaAustraliaIcon, 
  UserGroupIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  BanknotesIcon, 
  XMarkIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
  onNavigate: (page: Page) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ content, shared, onClinicClick, onNavigate }) => {
  const [activePath, setActivePath] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  const missionFeatures = [
    { 
      icon: LightBulbIcon, 
      title: "Innovation Without Boundaries", 
      desc: "Merging rigorous American legal instruction with flexible, technology-driven delivery systems." 
    },
    { 
      icon: GlobeAsiaAustraliaIcon, 
      title: "Global Accessibility", 
      desc: "Lowering barriers to entry and respecting global time zones to cultivate globally active professionals." 
    },
    { 
      icon: ScaleIcon, 
      title: "Real-World Mastery", 
      desc: "Combining dynamic video lectures with real-time sessions to ensure deep mastery of U.S. law." 
    }
  ];

  const features = [
    { 
      icon: ClockIcon, 
      title: "Flexible Learning", 
      desc: "Complete two-thirds of your coursework asynchronously on your schedule—anytime, anywhere, without sacrificing academic rigor." 
    },
    { 
      icon: UserGroupIcon, 
      title: "World-Class Mentorship", 
      desc: "Learn from experienced legal professionals who provide personalized feedback and guidance to help you succeed academically." 
    },
    { 
      icon: BanknotesIcon, 
      title: "Accessible Tuition", 
      desc: "We offer a high-quality legal education at a significantly lower cost than traditional U.S. law schools, making the J.D. dream accessible." 
    }
  ];

  // Focus trap and keyboard navigation for modal
  useEffect(() => {
    if (!activePath) return;

    const modal = modalRef.current;
    if (!modal) return;

    // Get all focusable elements
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    firstFocusableRef.current = focusableElements[0];
    lastFocusableRef.current = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstFocusableRef.current?.focus();

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePath(null);
      }
    };

    // Handle Tab key for focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    modal.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      modal.removeEventListener('keydown', handleTab);
    };
  }, [activePath]);

  const careerPaths = [
    { 
      icon: GlobeAmericasIcon, 
      title: "International Business", 
      desc: "Navigate the complex landscape of global commerce and trade.",
      image: "/images/info-international-business.jpg",
      details: {
        overview: "Prepare for a high-stakes career facilitating transactions between entities in different countries. This path focuses on the legal frameworks that govern international commerce, mergers and acquisitions, and joint ventures.",
        roles: ["International Contract Manager", "Trade Compliance Officer", "Global Business Developer", "Cross-Border Transaction Specialist"],
        courses: ["Contracts I & II", "Business Associations", "International Business Transactions", "Commercial Law"]
      }
    },
    { 
      icon: BuildingLibraryIcon, 
      title: "Corporate Governance", 
      desc: "Advise boards and executives on fiduciary duties and ethical compliance.",
      image: "/images/info-corporate-governance.jpg",
      details: {
        overview: "Corporate governance professionals ensure that companies operate within the law and adhere to ethical standards. This role is critical for maintaining investor confidence and managing corporate liability.",
        roles: ["Corporate Secretary", "Ethics & Compliance Director", "Board Advisor", "ESG (Environmental, Social, Governance) Consultant"],
        courses: ["Business Associations", "Professional Responsibility", "Securities Regulation", "Real Property"]
      }
    },
    { 
      icon: ScaleIcon, 
      title: "Legal Consulting", 
      desc: "Provide strategic legal insight to non-legal entities and organizations.",
      image: "/images/info-legal-consulting.jpg",
      details: {
        overview: "Leverage your J.D. to provide specialized advice to consulting firms, NGOs, and corporations. This path emphasizes problem-solving, risk assessment, and strategic planning rather than traditional litigation.",
        roles: ["Management Consultant", "Legal Operations Manager", "Risk Analyst", "Policy Advisor"],
        courses: ["Torts I & II", "Civil Procedure", "Legal Writing & Analysis", "Evidence"]
      }
    },
    { 
      icon: GlobeAsiaAustraliaIcon, 
      title: "Cross-border Trade", 
      desc: "Master the regulations governing imports, exports, and tariffs.",
      image: "/images/info-cross-border-trade.jpg",
      details: {
        overview: "Become an expert in the movement of goods, services, and capital across borders. This field requires deep knowledge of WTO rules, regional trade agreements (like USMCA), and customs regulations.",
        roles: ["Customs Broker", "Import/Export Control Analyst", "Supply Chain Compliance Manager", "Trade Policy Specialist"],
        courses: ["Constitutional Law", "Administrative Law", "International Law", "Contracts"]
      }
    },
    { 
      icon: ScaleIcon, 
      title: "Regulatory Affairs", 
      desc: "Ensure compliance with government agencies like the FDA, SEC, and EPA.",
      image: "/images/info-regulatory-affairs.jpg",
      details: {
        overview: "Regulatory affairs specialists act as the liaison between private industry and government regulatory agencies. They ensure that products and practices meet all safety, efficacy, and reporting standards.",
        roles: ["Regulatory Affairs Manager", "Compliance Auditor", "Government Relations Officer", "Quality Assurance Lead"],
        courses: ["Administrative Law", "Torts", "Health Law (Elective)", "Environmental Law (Elective)"]
      }
    },
    { 
      icon: AcademicCapIcon, 
      title: "Graduate Study", 
      desc: "Pursue advanced degrees at prestigious universities in US, Canada or London.",
      image: "/images/info-graduate-study.jpg",
      details: {
        overview: "For international students, the PAU J.D. serves as a robust foundation for admission into specialized LL.M. (Master of Laws) or S.J.D. programs at ABA-accredited universities in the United States.",
        roles: ["Legal Scholar / Academic", "Specialized Practitioner (Tax, IP)", "Judicial Clerkship", "Think Tank Researcher"],
        courses: ["Advanced Legal Research & Writing", "Constitutional Law", "Jurisprudence", "All Core Bar Courses"]
      }
    }
  ];

  const clinicList: Clinic[] = [
    { 
      id: "c1", 
      title: "High Tech Law Institute", 
      description: "Partnering with Silicon Valley giants to address legal challenges in AI, patent law, and data privacy.",
      body: "The High Tech Law Institute at PAU Law provides students with unparalleled access to the intersection of law and technology."
    },
    { 
      id: "c2", 
      title: "Immigration & Human Rights Clinic", 
      description: "Providing pro bono legal representation to asylum seekers and immigrant families in the Bay Area.",
      body: "Students represent real clients in administrative and federal court proceedings."
    },
    { 
      id: "c3", 
      title: "Start-up Legal Garage", 
      description: "Hands-on experience assisting early-stage startups with incorporation, IP strategy, and compliance.",
      body: "Matches law students with early-stage startups to provide essential legal services under supervision."
    }
  ];

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* 1. VISION & MISSION SPLIT SECTION */}
      {/* Removed negative margin (-mt-24) to stop overlapping. Added py-16 for spacing. */}
      <section className="relative z-10 max-w-5xl mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 shadow-2xl rounded-sm overflow-hidden bg-white">
          
          {/* Left: Vision (Dark Blue) */}
          <div className="lg:col-span-2 bg-[#051626] p-10 md:p-12 pt-14 md:pt-16 text-white flex flex-col justify-center relative">
            {/* Top gold line */}
            <div className="w-8 h-1 bg-pau-gold mb-8"></div>
            
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-pau-gold mb-6 block opacity-90">
              Our Mission
            </span>
            
            <blockquote className="text-xl md:text-2xl font-serif leading-relaxed mb-10 text-white font-medium">
              "As educational borders dissolve, we nurture global leaders with balanced, critical perspectives. We are a platform for shaping thoughtful, solution-oriented professionals prepared to engage with the world's most pressing challenges."
            </blockquote>
            
            <div className="flex items-center space-x-3">
               <div className="w-8 h-px bg-gray-600"></div>
               <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold italic">Office of the President</span>
            </div>
          </div>

          {/* Right: Mission (White) */}
          {/* Increased top padding (pt-14 md:pt-16) to ensure content is not too close to the top edge */}
          <div className="lg:col-span-3 bg-white p-10 md:p-12 pt-14 md:pt-16 flex flex-col">
             <p className="text-gray-500 font-light mb-10 leading-relaxed text-sm md:text-base border-b border-gray-100 pb-8">
               To redefine legal education by breaking down geographic barriers and empowering talented students worldwide.
             </p>
             
             <div className="space-y-8">
               {missionFeatures.map((item, i) => (
                 <div key={i} className="flex gap-5 group items-start">
                   <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-pau-gold group-hover:text-pau-gold transition-colors duration-300 bg-white">
                     <item.icon className="h-5 w-5 stroke-[1.5]" />
                   </div>
                   <div className="pt-1">
                     <h3 className="text-[11px] font-bold uppercase tracking-widest text-pau-darkBlue mb-2">{item.title}</h3>
                     <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 2. STUDY FROM ANYWHERE (Features) */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-pau-darkBlue mb-6">
               Study American Law From <br/> Anywhere
             </h2>
             <p className="text-lg text-gray-500 font-light max-w-2xl md:mx-auto leading-relaxed">
               A fully online J.D. program designed for motivated students seeking flexibility, world-class instruction, and a clear path to a California law license.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {features.map((feat, i) => (
               <div key={i} className="p-10 border border-gray-100 rounded-sm hover:shadow-xl hover:border-pau-gold/30 transition-all duration-300 group bg-white">
                 <feat.icon className="h-8 w-8 text-pau-blue mb-6 stroke-1 group-hover:scale-110 transition-transform origin-left" />
                 <h3 className="text-xl font-bold font-serif text-pau-darkBlue mb-4">{feat.title}</h3>
                 <p className="text-sm text-gray-500 leading-relaxed font-light">
                   {feat.desc}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* 3. STUDENT CENTERED (Dark Section) */}
      <section className="py-24 bg-[#051626] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('/images/patterns/pattern-cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
               <div className="flex items-center space-x-3 mb-6">
                 <div className="w-8 h-px bg-pau-gold"></div>
                 <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-pau-gold">Student Success</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                 A Student-Centered <br/> Law School
               </h2>
               <p className="text-gray-400 font-light text-lg leading-relaxed mb-10 max-w-lg">
                 From academic support to bar examination preparation, every part of the PAU Law program is designed to help you thrive. You'll receive structured guidance from your first course through your preparation for the California Bar.
               </p>
               
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pau-gold via-pau-goldDark to-pau-gold flex items-center justify-center text-pau-darkBlue font-bold font-serif text-lg shadow-lg ring-2 ring-pau-gold/30 hover:ring-pau-gold/50 transition-all duration-300 hover:scale-110">
                    <span className="tracking-tight">TPW</span>
                 </div>
                 <div>
                   <p className="font-serif font-bold text-white">Timothy P. Weimer</p>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500">Dean, School of Law</p>
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                {[
                  { val: "100%", label: "Online Coursework", sub: "Fully Remote" },
                  { val: "66%", label: "Asynchronous", sub: "Flexible Schedule" },
                  { val: "15:1", label: "Student-Faculty Ratio", sub: "Personal Attention" },
                  { val: "Included", label: "Bar Prep Support", sub: "Comprehensive" }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#051626] p-10 flex flex-col justify-center group hover:bg-white/5 transition-colors">
                    <span className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 group-hover:text-pau-gold transition-colors">{stat.val}</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{stat.label}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL CAREER PATHS */}
      <section className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-pau-darkBlue mb-6">Your Path to a Global Career</h2>
              <p className="text-lg text-gray-500 font-light max-w-2xl md:mx-auto leading-relaxed">
                Our rigorous curriculum opens doors to diverse international fields, equipping you with the credentials needed for today's interconnected legal environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((path, i) => (
                <div 
                  key={i} 
                  onClick={() => startTransition(() => setActivePath(path))}
                  className="bg-white p-8 border border-gray-100 hover:border-pau-gold/50 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                   <div className="w-10 h-10 rounded bg-blue-50 text-pau-blue flex items-center justify-center mb-6 group-hover:bg-pau-blue group-hover:text-white transition-colors">
                      <path.icon className="h-5 w-5" />
                   </div>
                   <h3 className="text-lg font-serif font-bold text-pau-darkBlue mb-3">{path.title}</h3>
                   <p className="text-xs text-gray-500 leading-relaxed font-light mb-6 min-h-[40px]">
                     {path.desc}
                   </p>
                   <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-pau-gold group-hover:text-pau-darkBlue transition-colors">
                     Explore Path <ArrowRightIcon className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* 5. CAREER PATH MODAL (REDESIGNED) */}
      {activePath && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            {/* Darker Overlay with Blur */}
            <div 
              className="fixed inset-0 bg-pau-darkBlue/80 backdrop-blur-md transition-opacity" 
              onClick={() => setActivePath(null)}
              aria-hidden="true"
            ></div>

            {/* Premium Modal Content */}
            {/* Removed border from the container for cleaner look as requested */}
            <div className="relative inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full animate-fade-in-up">
              
              {/* Image Header with Gradient Overlay */}
              <div className="relative h-80 w-full overflow-hidden bg-pau-darkBlue">
                <img 
                  src={activePath.image} 
                  alt={activePath.title}
                  className="w-full h-full object-cover transform scale-105"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-pau-darkBlue', 'to-pau-blue');
                  }}
                />
                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-pau-darkBlue/60 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full px-8 md:px-12 py-10 z-10">
                   <div className="flex items-end justify-between">
                     <div>
                        <span className="inline-block px-3 py-1 bg-white/10 text-pau-gold text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-white/20 backdrop-blur-md shadow-sm">
                          Career Pathway
                        </span>
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2 tracking-tight drop-shadow-md">
                          {activePath.title}
                        </h3>
                     </div>
                     
                     {/* Floating Glass Icon Badge */}
                     <div className="hidden md:flex h-20 w-20 bg-white/10 rounded-2xl items-center justify-center border border-white/20 backdrop-blur-md shadow-xl mb-2">
                       <activePath.icon className="h-10 w-10 text-white" />
                     </div>
                   </div>
                </div>

                <button 
                  onClick={() => setActivePath(null)}
                  aria-label="Close career pathway detail"
                  className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full p-2 z-20"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Body Content */}
              <div className="bg-gray-50 px-8 md:px-12 py-10">
                
                {/* Overview Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
                  <h4 className="text-xs font-bold text-pau-gold uppercase tracking-widest mb-4 flex items-center">
                    <LightBulbIcon className="h-4 w-4 mr-2" /> Strategic Overview
                  </h4>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif font-light">
                    "{activePath.details.overview}"
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:gap-8">
                  {/* Roles Card */}
                  <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-pau-blue hover:shadow-md transition-shadow">
                     <div className="flex items-center mb-6">
                       <div className="p-2 bg-blue-50 text-pau-blue rounded-lg mr-3">
                          <BriefcaseIcon className="h-6 w-6" />
                       </div>
                       <h4 className="text-lg font-bold text-pau-darkBlue font-serif">Potential Roles</h4>
                     </div>
                     <div className="flex flex-wrap gap-2">
                       {activePath.details.roles.map((role: string, i: number) => (
                         <span key={i} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wide border border-gray-100 hover:bg-pau-blue hover:text-white hover:border-pau-blue transition-colors cursor-default">
                           {role}
                         </span>
                       ))}
                     </div>
                  </div>
                </div>

              </div>

              {/* Footer Action */}
              <div className="bg-white px-8 md:px-12 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-gray-400 italic">
                    *Elective offerings are subject to academic year availability.
                  </p>
                  {/* <button 
                    onClick={() => {
                      setActivePath(null);
                      onNavigate('academics');
                    }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-pau-darkBlue text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-pau-gold hover:text-pau-darkBlue transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    View Academic Catalog <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </button> */}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
