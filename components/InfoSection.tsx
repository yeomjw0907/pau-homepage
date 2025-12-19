
import React, { useState } from 'react';
import { HomeContent, Clinic, SharedContent, Page } from '../types';
import { 
  ArrowRightIcon, 
  LightBulbIcon, 
  GlobeAmericasIcon, 
  AcademicCapIcon,
  ScaleIcon,
  BuildingLibraryIcon,
  GlobeAsiaAustraliaIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  XMarkIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  ComputerDesktopIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
  onNavigate: (page: Page) => void;
}

interface CareerPath {
  icon: any;
  title: string;
  desc: string;
  details: {
    overview: string;
    focusAreas: string[];
    potentialRoles: string[];
    outlook: string;
  };
}

export const InfoSection: React.FC<InfoSectionProps> = ({ shared, onClinicClick, onNavigate }) => {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const careerPaths: CareerPath[] = [
    { 
      icon: GlobeAmericasIcon, 
      title: "International Business", 
      desc: "Navigate the complex landscape of global commerce and trade.",
      details: {
        overview: "As companies expand globally, the need for lawyers who understand multi-jurisdictional regulations and international trade law has never been greater.",
        focusAreas: ["Mergers & Acquisitions", "International Trade Treaties", "Cross-border Tax Planning"],
        potentialRoles: ["International Counsel", "Trade Compliance Officer", "Global M&A Attorney"],
        outlook: "High growth potential in emerging markets and global tech hubs."
      }
    },
    { 
      icon: BuildingLibraryIcon, 
      title: "Corporate Governance", 
      desc: "Advise boards and executives on fiduciary duties and ethical compliance.",
      details: {
        overview: "Ensure organizations operate within legal and ethical boundaries while managing risks and upholding shareholder interests.",
        focusAreas: ["Board Advisory", "ESG Compliance", "Securities Law"],
        potentialRoles: ["Chief Compliance Officer", "Corporate Secretary", "General Counsel"],
        outlook: "Steady demand due to increasing regulatory oversight globally."
      }
    },
    { 
      icon: PresentationChartBarIcon, 
      title: "Legal Consulting", 
      desc: "Provide strategic legal insight to non-legal entities and organizations.",
      details: {
        overview: "Bridge the gap between business strategy and legal requirements for major consulting firms and private equity groups.",
        focusAreas: ["Risk Management", "Strategic Policy", "Crisis Management"],
        potentialRoles: ["Strategy Consultant", "Policy Analyst", "Legal Risk Manager"],
        outlook: "Expanding field for J.D. holders in non-traditional legal roles."
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
      body: "Students in the Immigration and Human Rights Clinic represent real clients in administrative and federal court proceedings."
    },
    { 
      id: "c3", 
      title: "Start-up Legal Garage", 
      description: "Hands-on experience assisting early-stage startups with incorporation, IP strategy, and compliance.",
      body: "The Start-up Legal Garage matches law students with early-stage startups to provide essential legal services under attorney supervision."
    }
  ];

  // Restructured features to handle "INCLUDED" separately for design safety
  const studentFeatures = [
    { label: "100%", title: "ONLINE COURSEWORK", desc: "Access world-class legal education from any corner of the globe.", icon: ComputerDesktopIcon, isTextLabel: false },
    { label: "66%", title: "ASYNCHRONOUS", desc: "Learn at your own pace while maintaining your professional commitments.", icon: ClockIcon, isTextLabel: false },
    { label: "15:1", title: "STUDENT-FACULTY RATIO", desc: "Benefit from intimate class sizes and direct access to legal scholars.", icon: UserGroupIcon, isTextLabel: false },
    { label: "INCLUDED", title: "BAR PREP SUPPORT", desc: "Integrated California Bar preparation to ensure your professional licensure.", icon: CheckBadgeIcon, isTextLabel: true },
  ];

  return (
    <div className="bg-white font-sans">
      
      {/* SECTION: Founding Mission */}
      <section className="relative -mt-24 z-30 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl overflow-hidden rounded-[40px]">
          <div className="bg-[#051626] p-16 lg:p-24 text-white">
            <div className="w-12 h-[2px] bg-pau-gold mb-8"></div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-pau-gold mb-6">Our Founding Mission</p>
            <blockquote className="text-3xl font-serif font-bold leading-relaxed mb-12">
              "As educational borders dissolve, we nurture global leaders with critical perspectives. We are a platform for shaping thoughtful, solution-oriented professionals."
            </blockquote>
            <div className="flex items-center space-x-4 opacity-60">
              <div className="w-8 h-px bg-white"></div>
              <p className="text-xs font-serif italic">Office of the President</p>
            </div>
          </div>
          <div className="bg-white p-16 lg:p-24 text-gray-900 flex flex-col justify-center">
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-12">
              To redefine legal education by breaking down geographic barriers and empowering talented students worldwide.
            </p>
            <div className="space-y-10">
              {[
                { icon: LightBulbIcon, title: "Innovation Without Boundaries", desc: "Merging rigorous American legal instruction with flexible delivery." },
                { icon: GlobeAsiaAustraliaIcon, title: "Global Accessibility", desc: "Lowering barriers to entry and respecting global time zones." },
                { icon: AcademicCapIcon, title: "Real-World Mastery", desc: "Ensuring deep mastery of U.S. law through dynamic sessions." }
              ].map((item, i) => (
                <div key={i} className="flex space-x-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-pau-light group-hover:text-pau-blue transition-all">
                    <item.icon className="h-5 w-5 stroke-1" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STUDENT SUCCESS (PREMIUM 2x2 GRID) */}
      <section className="py-32 px-6 bg-[#FDFDFD] relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-pau-blue/[0.02] -skew-x-12 translate-x-1/4 -z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Column: Branding & Messaging */}
            <div className="lg:w-2/5 animate-fade-in">
              <div className="flex items-center space-x-4 mb-8">
                <span className="w-12 h-px bg-pau-gold"></span>
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-pau-gold">Excellence in Legal Ed</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-pau-darkBlue leading-[1.1] mb-10">
                STUDENT <br /><span className="text-pau-blue">SUCCESS</span>
              </h2>
              <div className="w-20 h-1 bg-pau-gold mb-10"></div>
              <p className="text-lg text-gray-500 font-light leading-relaxed mb-12 max-w-md">
                We've redesigned the law school experience. By focusing on accessibility and student outcomes, we ensure your journey to the Bar is supported by both technology and world-class faculty.
              </p>
              <div className="flex flex-col space-y-5 mb-12">
                 {[
                   { icon: SparklesIcon, text: "Premier Global Legal Network" },
                   { icon: ScaleIcon, text: "California Bar Registered Program" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center space-x-4 text-pau-darkBlue group cursor-default">
                     <div className="p-2 bg-pau-light rounded-lg group-hover:bg-pau-gold/10 transition-colors">
                       <item.icon className="h-5 w-5 text-pau-gold" />
                     </div>
                     <span className="font-bold text-[11px] uppercase tracking-[0.15em]">{item.text}</span>
                   </div>
                 ))}
              </div>
              <button 
                onClick={() => onNavigate('admissions')}
                className="group relative px-10 py-5 bg-pau-darkBlue text-white font-bold text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all hover:bg-pau-blue shadow-premium"
              >
                <span className="relative z-10">Start Your Application</span>
                <div className="absolute inset-0 bg-pau-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-0 opacity-10"></div>
              </button>
            </div>

            {/* Right Column: 2x2 Grid with Logic for "INCLUDED" overflow */}
            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {studentFeatures.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="relative bg-white p-10 lg:p-12 rounded-[32px] border-l-4 border-pau-gold shadow-card hover:shadow-premium hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
                >
                  {/* Background Icon Watermark */}
                  <div className="absolute -bottom-4 -right-4 text-gray-50 group-hover:text-pau-gold/[0.07] transition-colors duration-500 -z-0">
                     <feat.icon className="h-28 w-28 stroke-[0.5]" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 flex justify-between items-start">
                      {feat.isTextLabel ? (
                        /* "INCLUDED" case: Design it as a prominent badge to avoid box overflow */
                        <div className="inline-flex flex-col">
                           <span className="bg-pau-gold text-white text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase mb-4 shadow-sm group-hover:bg-pau-blue transition-colors">
                             Included
                           </span>
                           <span className="text-3xl font-serif font-bold text-pau-darkBlue leading-none group-hover:text-pau-gold transition-colors">
                             BAR PREP
                           </span>
                        </div>
                      ) : (
                        /* Numeric cases (100%, etc.) */
                        <span className="text-5xl lg:text-6xl font-serif font-bold text-pau-darkBlue tracking-tighter group-hover:text-pau-blue transition-colors duration-300">
                          {feat.label}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-[11px] font-extrabold tracking-[0.25em] text-pau-gold uppercase mb-5 group-hover:text-pau-darkBlue transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-light leading-relaxed max-w-[200px]">
                      {feat.desc}
                    </p>
                  </div>
                  
                  {/* Subtle hover line at the bottom */}
                  <div className="absolute bottom-0 left-0 h-1 bg-pau-blue w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: Study American Law */}
      <section className="py-32 px-6 text-center bg-gray-50/30">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-pau-blue mb-6">
          Study American Law From <br /> Anywhere
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          A fully online J.D. program designed for motivated students seeking flexibility and world-class instruction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-20">
          {[
            { icon: GlobeAmericasIcon, title: "Flexible Learning", desc: "Complete your coursework asynchronously on your schedule—anytime, anywhere." },
            { icon: UserGroupIcon, title: "World-Class Mentorship", desc: "Learn from experienced legal professionals who provide personalized feedback." },
            { icon: ScaleIcon, title: "Accessible Tuition", desc: "High-quality legal education at a significantly lower cost than traditional schools." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 hover:shadow-xl transition-all text-left">
              <feature.icon className="h-8 w-8 text-pau-blue mb-6 stroke-1" />
              <h3 className="text-lg font-bold mb-4 font-serif">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Global Career Path */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold text-pau-blue mb-6">Your Path to a Global Career</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Our rigorous curriculum opens doors to diverse international fields.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((item, i) => (
              <div key={i} className="bg-white p-10 border border-gray-100 rounded-3xl hover:shadow-lg transition-all flex flex-col h-full group">
                <item.icon className="h-6 w-6 text-pau-blue mb-8 stroke-1 group-hover:text-pau-gold transition-colors" />
                <h3 className="text-lg font-bold mb-4 font-serif">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light mb-8 flex-grow">{item.desc}</p>
                <button 
                  onClick={() => setSelectedPath(item)}
                  className="text-[10px] font-bold uppercase tracking-widest text-pau-gold flex items-center hover:translate-x-1 transition-transform"
                >
                  Explore Path <ArrowRightIcon className="ml-2 h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Clinics */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-pau-blue mb-4">Clinical Opportunities</h2>
          <p className="text-gray-500 font-light">Practical experience supervised by expert faculty.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {clinicList.map((clinic, i) => (
            <div key={i} className="group cursor-pointer" onClick={() => onClinicClick(clinic)}>
              <div className="w-12 h-12 rounded bg-pau-light flex items-center justify-center text-gray-300 mb-8 group-hover:bg-pau-blue group-hover:text-white transition-all">
                <BuildingLibraryIcon className="h-6 w-6 stroke-1" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif group-hover:text-pau-blue transition-colors">{clinic.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light mb-8 line-clamp-2">{clinic.description}</p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-pau-blue flex items-center">
                Learn More <ArrowRightIcon className="ml-2 h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER PATH MODAL */}
      {selectedPath && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-pau-darkBlue/90 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col animate-fade-in-up">
            <button 
              onClick={() => setSelectedPath(null)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-pau-blue hover:text-white transition-all z-10"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <div className="p-10 lg:p-16 overflow-y-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-pau-light rounded-2xl text-pau-blue">
                  <selectedPath.icon className="h-8 w-8" />
                </div>
                <div>
                   <p className="text-xs font-bold text-pau-gold uppercase tracking-[0.2em] mb-1">Career Pathway</p>
                   <h2 className="text-4xl font-serif font-bold text-pau-darkBlue">{selectedPath.title}</h2>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center">
                     <DocumentTextIcon className="h-5 w-5 mr-2 text-pau-gold" /> Overview
                   </h3>
                   <p className="text-gray-600 leading-relaxed font-light text-lg">
                     {selectedPath.details.overview}
                   </p>
                </div>
              </div>

              <div className="mt-12">
                 <button 
                  onClick={() => onNavigate('admissions')}
                  className="w-full bg-pau-blue text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-pau-gold transition-all shadow-lg"
                 >
                   Start Your Application
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
