
import React from 'react';
import { HomeContent, Clinic, SharedContent, Page } from '../types';
import { 
  ArrowRightIcon, 
  LightBulbIcon, 
  GlobeAmericasIcon, 
  ScaleIcon, 
  BuildingLibraryIcon, 
  GlobeAsiaAustraliaIcon, 
  UserGroupIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  ComputerDesktopIcon, 
  AcademicCapIcon, 
  PresentationChartBarIcon, 
  BanknotesIcon 
} from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
  onNavigate: (page: Page) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ content, shared, onClinicClick, onNavigate }) => {
  
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

  const careerPaths = [
    { 
      icon: GlobeAmericasIcon, 
      title: "International Business", 
      desc: "Navigate the complex landscape of global commerce and trade." 
    },
    { 
      icon: BuildingLibraryIcon, 
      title: "Corporate Governance", 
      desc: "Advise boards and executives on fiduciary duties and ethical compliance." 
    },
    { 
      icon: ScaleIcon, 
      title: "Legal Consulting", 
      desc: "Provide strategic legal insight to non-legal entities and organizations." 
    },
    { 
      icon: GlobeAsiaAustraliaIcon, 
      title: "Cross-border Trade", 
      desc: "Master the regulations governing imports, exports, and tariffs." 
    },
    { 
      icon: ScaleIcon, 
      title: "Regulatory Affairs", 
      desc: "Ensure compliance with government agencies like the FDA, SEC, and EPA." 
    },
    { 
      icon: AcademicCapIcon, 
      title: "U.S. Graduate Study", 
      desc: "Pursue advanced degrees like an LL.M. or S.J.D. at top universities." 
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
              Our Vision
            </span>
            
            <blockquote className="text-xl md:text-2xl font-serif leading-relaxed mb-10 text-white font-medium">
              "As educational borders dissolve, we nurture global leaders with critical perspectives. We are a platform for shaping thoughtful, solution-oriented professionals prepared to engage with the world's most pressing challenges."
            </blockquote>
            
            <div className="flex items-center space-x-3">
               <div className="w-8 h-px bg-gray-600"></div>
               <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold italic">Office of the Dean</span>
            </div>
          </div>

          {/* Right: Mission (White) */}
          {/* Increased top padding (pt-14 md:pt-16) to ensure 'Our Core Mission' is not too close to the top edge */}
          <div className="lg:col-span-3 bg-white p-10 md:p-12 pt-14 md:pt-16 flex flex-col">
             <h2 className="text-3xl font-serif font-bold text-pau-darkBlue mb-6">Our Core Mission</h2>
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
                     <h4 className="text-[11px] font-bold uppercase tracking-widest text-pau-darkBlue mb-2">{item.title}</h4>
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
             <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
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
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
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
                 <div className="w-12 h-12 rounded-full bg-pau-gold flex items-center justify-center text-pau-darkBlue font-bold font-serif text-xl">
                    ER
                 </div>
                 <div>
                   <p className="font-serif font-bold text-white">Elena Rodriguez</p>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500">Dean, School of Law</p>
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                {[
                  { val: "100%", label: "Online Coursework", sub: "Fully Remote" },
                  { val: "66%", label: "Asynchronous", sub: "Flexible Schedule" },
                  { val: "11:1", label: "Student-Faculty Ratio", sub: "Personal Attention" },
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
              <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                Our rigorous curriculum opens doors to diverse international fields, equipping you with the credentials needed for today's interconnected legal environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((path, i) => (
                <div key={i} className="bg-white p-8 border border-gray-100 hover:border-pau-gold/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
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

      {/* 5. CENTERS OF EXCELLENCE */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8">
               <div>
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-pau-darkBlue mb-4">Centers of Excellence</h2>
                 <p className="text-gray-500 font-light">Real-world experience in the areas that matter most.</p>
               </div>
               <button 
                onClick={() => onNavigate('centers')}
                className="mt-6 md:mt-0 flex items-center px-6 py-3 border border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-pau-darkBlue hover:text-white transition-all"
               >
                 View All Centers <ArrowRightIcon className="ml-2 h-3 w-3" />
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {clinicList.map((clinic, i) => (
                 <div key={i} className="border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => onClinicClick(clinic)}>
                    <div className="mb-6 p-3 bg-gray-50 w-fit rounded-lg group-hover:bg-pau-gold group-hover:text-white transition-colors text-gray-400">
                      <BuildingLibraryIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-pau-darkBlue mb-3 font-serif">{clinic.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light mb-8 line-clamp-3">
                      {clinic.description}
                    </p>
                    <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-pau-blue transition-colors">
                      Learn More <ArrowRightIcon className="ml-2 h-3 w-3" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};
