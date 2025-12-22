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
      title: "Immigration Clinic", 
      description: "Providing pro bono legal representation to asylum seekers and immigrant families in the Bay Area.",
      body: "Students represent real clients in administrative and federal court proceedings."
    },
    { 
      id: "c3", 
      title: "Start-up Legal Garage", 
      description: "Hands-on experience assisting early-stage startups with incorporation and IP strategy.",
      body: "Matches law students with early-stage startups to provide essential legal services under supervision."
    }
  ];

  const studentFeatures = [
    { label: "100%", title: "ONLINE COURSEWORK", desc: "Access world-class legal education from any corner of the globe.", icon: ComputerDesktopIcon, isTextLabel: false },
    { label: "66%", title: "ASYNCHRONOUS", desc: "Learn at your own pace while maintaining your professional commitments.", icon: ClockIcon, isTextLabel: false },
    { label: "15:1", title: "FACULTY RATIO", desc: "Benefit from intimate class sizes and direct access to legal scholars.", icon: UserGroupIcon, isTextLabel: false },
    { label: "INCLUDED", title: "BAR PREP SUPPORT", desc: "Integrated California Bar preparation to ensure your professional licensure.", icon: CheckBadgeIcon, isTextLabel: true },
  ];

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* SECTION: Founding Mission */}
      <section className="relative -mt-16 md:-mt-24 z-30 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl overflow-hidden rounded-2xl md:rounded-[40px]">
          <div className="bg-[#051626] p-8 md:p-24 text-white">
            <div className="w-10 h-[2px] bg-pau-gold mb-6"></div>
            <p className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-pau-gold mb-4 md:mb-6">Our Founding Mission</p>
            <blockquote className="text-xl md:text-3xl font-serif font-bold leading-relaxed mb-8 md:mb-12">
              "Pacific American University School of Law is a <span className="text-pau-gold">Registered Unaccredited Correspondence Law School</span>."
            </blockquote>
            <div className="flex items-center space-x-4 opacity-60">
              <div className="w-6 h-px bg-white"></div>
              <p className="text-[10px] md:text-xs font-serif italic">Office of the President</p>
            </div>
          </div>
          <div className="bg-white p-8 md:p-24 text-gray-900 flex flex-col justify-center">
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed mb-8 md:mb-12">
              We offer a high-quality, 100% online Juris Doctor (J.D.) program designed to overcome geographic barriers.
            </p>
            <div className="space-y-6 md:space-y-10">
              {[
                { icon: LightBulbIcon, title: "Innovation", desc: "Merging rigorous instruction with flexible delivery." },
                { icon: GlobeAsiaAustraliaIcon, title: "Accessibility", desc: "Lowering barriers to entry globally." }
              ].map((item, i) => (
                <div key={i} className="flex space-x-4 md:space-x-6 group">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-pau-light group-hover:text-pau-blue transition-all">
                    <item.icon className="h-4 md:h-5 w-4 md:w-5 stroke-1" />
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest mb-1 md:mb-2">{item.title}</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: STUDENT SUCCESS */}
      <section className="py-16 md:py-32 px-4 md:px-6 bg-[#FDFDFD] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
            <div className="lg:w-2/5 animate-fade-in text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4 mb-6 md:mb-8">
                <span className="w-8 md:w-12 h-px bg-pau-gold"></span>
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-pau-gold">Success Matrix</span>
              </div>
              {/* Reduced font size for mobile: text-4xl instead of 5xl */}
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-pau-darkBlue leading-tight mb-6 md:mb-10">
                STUDENT <br className="hidden md:block" /><span className="text-pau-blue">SUCCESS</span>
              </h2>
              <p className="text-sm md:text-lg text-gray-500 font-light leading-relaxed mb-8 md:mb-12 max-w-md mx-auto lg:mx-0">
                Redesigned law school experience focusing on outcomes and accessibility.
              </p>
              <button 
                onClick={() => onNavigate('admissions')}
                className="px-8 py-4 md:px-10 md:py-5 bg-pau-darkBlue text-white font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-all shadow-premium"
              >
                Start Your Journey
              </button>
            </div>

            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
              {studentFeatures.map((feat, idx) => (
                <div key={idx} className="relative bg-white p-8 md:p-12 rounded-2xl md:rounded-[32px] border-l-4 border-pau-gold shadow-card hover:-translate-y-1 transition-all group overflow-hidden">
                  <div className="relative z-10">
                    <div className="mb-4 md:mb-6">
                      {feat.isTextLabel ? (
                        <div className="flex flex-col">
                           <span className="bg-pau-gold text-white text-[9px] md:text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-widest uppercase mb-2 w-fit">Included</span>
                           <span className="text-2xl md:text-3xl font-serif font-bold text-pau-darkBlue">BAR PREP</span>
                        </div>
                      ) : (
                        <span className="text-4xl md:text-6xl font-serif font-bold text-pau-darkBlue tracking-tighter">{feat.label}</span>
                      )}
                    </div>
                    <h4 className="text-[10px] md:text-[11px] font-extrabold tracking-widest text-pau-gold uppercase mb-3">{feat.title}</h4>
                    <p className="text-[12px] md:text-sm text-gray-500 font-light leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Study American Law */}
      <section className="py-16 md:py-32 px-4 md:px-6 text-center bg-gray-50/30">
        <h2 className="text-2xl md:text-5xl font-serif font-bold text-pau-blue mb-4 md:mb-6 leading-snug">
          Study American Law From <br className="hidden sm:block" /> Anywhere
        </h2>
        <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed px-4">
          A fully online J.D. program designed for motivated students seeking flexibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-6xl mx-auto mt-12 md:mt-20">
          {[
            { icon: GlobeAmericasIcon, title: "Flexible Learning", desc: "Complete coursework on your schedule—anytime, anywhere." },
            { icon: UserGroupIcon, title: "Mentorship", desc: "Learn from experienced legal professionals directly." },
            { icon: ScaleIcon, title: "Accessible", desc: "High-quality legal education at a significantly lower cost." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 text-left">
              <feature.icon className="h-6 w-6 text-pau-blue mb-4 stroke-1" />
              <h3 className="text-base md:text-lg font-bold mb-2 font-serif">{feature.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Clinics */}
      <section className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-pau-blue mb-2 md:mb-4">Clinical Opportunities</h2>
          <p className="text-sm md:text-base text-gray-500 font-light">Practical experience supervised by expert faculty.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {clinicList.map((clinic, i) => (
            <div key={i} className="group cursor-pointer p-6 md:p-0" onClick={() => onClinicClick(clinic)}>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-pau-light flex items-center justify-center text-gray-300 mb-6 md:mb-8 group-hover:bg-pau-blue group-hover:text-white transition-all">
                <BuildingLibraryIcon className="h-5 md:h-6 w-5 md:w-6 stroke-1" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 font-serif group-hover:text-pau-blue transition-colors">{clinic.title}</h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light mb-6 md:mb-8 line-clamp-2">{clinic.description}</p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-pau-blue flex items-center">
                Learn More <ArrowRightIcon className="ml-2 h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};