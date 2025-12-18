
import React, { useState } from 'react';
import { HomeContent, Clinic, SharedContent, Page } from '../types';
import { 
  ArrowRightIcon, 
  LightBulbIcon, 
  GlobeAmericasIcon, 
  AcademicCapIcon,
  ScaleIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  GlobeAsiaAustraliaIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  XMarkIcon,
  CheckCircleIcon,
  ChartBarIcon,
  AcademicCapIcon as DegreeIcon
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
    },
    { 
      icon: ArrowRightIcon, 
      title: "Cross-border Trade", 
      desc: "Master the regulations governing imports, exports, and tariffs.",
      details: {
        overview: "Become an expert in the laws that move the world's goods across oceans and borders.",
        focusAreas: ["WTO Regulations", "Customs Law", "International Sales of Goods"],
        potentialRoles: ["Trade Specialist", "Logistics Legal Counsel", "Customs Broker Attorney"],
        outlook: "Critical role in stabilizing and securing global supply chains."
      }
    },
    { 
      icon: BuildingOffice2Icon, 
      title: "Regulatory Affairs", 
      desc: "Ensure compliance with government agencies like the FDA, SEC, and EPA.",
      details: {
        overview: "Specialized knowledge in highly regulated industries like Pharmaceuticals, Energy, and Finance.",
        focusAreas: ["Administrative Law", "Industry Compliance", "Government Lobbying"],
        potentialRoles: ["Regulatory Counsel", "Public Policy Director", "Environmental Compliance Officer"],
        outlook: "Essential for industries navigating complex government bureaucracies."
      }
    },
    { 
      icon: DegreeIcon, 
      title: "Graduate Study", 
      desc: "Pursue advanced degrees like an LL.M. or S.J.D. at top universities.",
      details: {
        overview: "Use your J.D. from PAU Law as a stepping stone to elite academic and research positions worldwide.",
        focusAreas: ["Legal Research", "Academic Writing", "Specialized Law Degrees"],
        potentialRoles: ["Law Professor", "Legal Scholar", "Research Fellow"],
        outlook: "Opens doors to academia and specialized private practice."
      }
    }
  ];

  const clinicList: Clinic[] = [
    { 
      id: "c1", 
      title: "High Tech Law Institute", 
      description: "Partnering with Silicon Valley giants to address legal challenges in AI, patent law, and data privacy.",
      body: "The High Tech Law Institute at PAU Law provides students with unparalleled access to the intersection of law and technology. Working alongside faculty who are experts in Intellectual Property and Artificial Intelligence, students assist in research projects and pro-bono consulting for early-stage startups in the Santa Clara region. \n\nFocus areas include: \n- AI Ethics and Regulation\n- Patent Prosecution & Strategy\n- Data Privacy Compliance (GDPR/CCPA)\n- Emerging Tech Policy"
    },
    { 
      id: "c2", 
      title: "Immigration & Human Rights Clinic", 
      description: "Providing pro bono legal representation to asylum seekers and immigrant families in the Bay Area.",
      body: "Students in the Immigration and Human Rights Clinic represent real clients in administrative and federal court proceedings. Under the supervision of clinical faculty, students take the lead in interviewing clients, drafting briefs, and appearing at hearings. \n\nExperience gained: \n- Client counseling in traumatic contexts\n- Legal research on international human rights standards\n- Litigation skills in immigration court\n- Advocacy for vulnerable populations"
    },
    { 
      id: "c3", 
      title: "Start-up Legal Garage", 
      description: "Hands-on experience assisting early-stage startups with incorporation, IP strategy, and compliance.",
      body: "The Start-up Legal Garage matches law students with early-stage startups to provide essential legal services under attorney supervision. This clinic is perfect for students interested in venture capital, corporate law, and the Silicon Valley ecosystem.\n\nWork includes:\n- Drafting Articles of Incorporation\n- Employment Agreements\n- Trademark Registration\n- Seed Funding Legal Review"
    }
  ];

  return (
    <div className="bg-white font-sans">
      
      {/* SECTION: Founding Mission */}
      <section className="relative -mt-24 z-30 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl overflow-hidden">
          <div className="bg-[#051626] p-16 lg:p-24 text-white">
            <div className="w-12 h-[2px] bg-pau-gold mb-8"></div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-pau-gold mb-6">Our Founding Mission</p>
            <blockquote className="text-3xl font-serif font-bold leading-relaxed mb-12">
              "As educational borders dissolve, we nurture global leaders with critical perspectives. We are a platform for shaping thoughtful, solution-oriented professionals prepared to engage with the world's most pressing challenges."
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
                { icon: LightBulbIcon, title: "Innovation Without Boundaries", desc: "Merging rigorous American legal instruction with flexible, technology-driven delivery systems." },
                { icon: GlobeAsiaAustraliaIcon, title: "Global Accessibility", desc: "Lowering barriers to entry and respecting global time zones to cultivate globally active professionals." },
                { icon: AcademicCapIcon, title: "Real-World Mastery", desc: "Combining dynamic video lectures with real-time sessions to ensure deep mastery of U.S. law." }
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

      {/* SECTION: Study American Law */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-pau-blue mb-6">
          Study American Law From <br /> Anywhere
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          A fully online J.D. program designed for motivated students seeking flexibility, world-class instruction, and a clear path to a California law license.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-20">
          {[
            { icon: GlobeAmericasIcon, title: "Flexible Learning", desc: "Complete two-thirds of your coursework asynchronously on your schedule—anytime, anywhere, without sacrificing academic rigor." },
            { icon: UserGroupIcon, title: "World-Class Mentorship", desc: "Learn from experienced legal professionals and professors who provide personalized feedback and guidance to help you succeed academically." },
            { icon: ScaleIcon, title: "Accessible Tuition", desc: "We offer a high-quality legal education at a significantly lower cost than traditional U.S. law schools, making the J.D. dream accessible." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-10 border border-gray-50 hover:shadow-xl transition-all text-left">
              <feature.icon className="h-8 w-8 text-pau-blue mb-6 stroke-1" />
              <h3 className="text-lg font-bold mb-4 font-serif">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Global Career Path */}
      <section className="py-32 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold text-pau-blue mb-6">Your Path to a Global Career</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Our rigorous curriculum opens doors to diverse international fields, equipping you with the credentials needed for today's interconnected legal environment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerPaths.map((item, i) => (
              <div key={i} className="bg-white p-10 border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full group">
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
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col animate-fade-in-up">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center">
                      <AcademicCapIcon className="h-5 w-5 mr-2 text-pau-gold" /> Key Focus Areas
                    </h3>
                    <ul className="space-y-3">
                      {selectedPath.details.focusAreas.map((area, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircleIcon className="h-4 w-4 mr-2 text-pau-blue" /> {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center">
                      <BriefcaseIcon className="h-5 w-5 mr-2 text-pau-gold" /> Potential Roles
                    </h3>
                    <ul className="space-y-3">
                      {selectedPath.details.potentialRoles.map((role, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <ArrowRightIcon className="h-3 w-3 mr-2 text-pau-gold" /> {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-pau-light p-8 rounded-2xl border border-pau-blue/10">
                  <h3 className="text-sm font-bold text-pau-darkBlue uppercase tracking-widest mb-2 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2 text-pau-blue" /> Market Outlook
                  </h3>
                  <p className="text-gray-700 font-medium italic">
                    {selectedPath.details.outlook}
                  </p>
                </div>
              </div>

              <div className="mt-12">
                 <button 
                  onClick={() => onNavigate('admissions')}
                  className="w-full bg-pau-blue text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-pau-gold transition-all shadow-lg"
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
