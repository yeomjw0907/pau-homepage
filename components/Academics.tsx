
import React from 'react';
import { AcademicsContent, Page } from '../types';
import { 
  BookOpenIcon, 
  GlobeAmericasIcon, 
  ScaleIcon, 
  MapIcon, 
  CheckBadgeIcon, 
  ListBulletIcon, 
  ChatBubbleLeftEllipsisIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  DocumentDuplicateIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface AcademicsProps {
  content: AcademicsContent;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

/**
 * Internal helper for detailed sub-page headers
 */
const SubPageHeader = ({ title, subtitle, icon: Icon, onBack }: any) => (
  <div className="bg-pau-darkBlue pt-44 pb-20 px-6">
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center text-pau-gold hover:text-white transition-colors mb-10 group text-xs font-bold uppercase tracking-widest"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Academics Overview
      </button>
      <div className="flex items-start gap-6 animate-fade-in-up">
        <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
          <Icon className="h-10 w-10 text-pau-gold" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-gray-300 font-light max-w-2xl">{subtitle}</p>
        </div>
      </div>
    </div>
  </div>
);

export const Academics: React.FC<AcademicsProps> = ({ content, onNavigate, currentPage }) => {
  const academicPortals = [
    {
      id: 'curriculum-schedule' as Page,
      title: "Curriculum",
      desc: "Comprehensive 4-year roadmap for J.D. candidates.",
      icon: MapIcon,
      color: "text-pau-gold"
    },
    {
      id: 'bar-info' as Page,
      title: "Bar Info",
      desc: "Information on FYLSX and California Bar Exam eligibility.",
      icon: CheckBadgeIcon,
      color: "text-blue-500"
    },
    {
      id: 'course-desc' as Page,
      title: "Course Catalog",
      desc: "Detailed descriptions of core and elective law courses.",
      icon: ListBulletIcon,
      color: "text-emerald-500"
    },
    {
      id: 'grad-reqs' as Page,
      title: "Graduation",
      desc: "Residency and unit requirements for the Juris Doctor degree.",
      icon: AcademicCapIcon,
      color: "text-purple-500"
    }
  ];

  // Render Logic based on Sub-pages
  const renderSubPage = () => {
    switch (currentPage) {
      case 'curriculum-schedule':
        return (
          <>
            <SubPageHeader 
              title="J.D. Curriculum" 
              subtitle="A rigorous 4-year academic sequence structured for bar readiness." 
              icon={MapIcon}
              onBack={() => onNavigate('academics')}
            />
            <div className="max-w-5xl mx-auto px-6 py-20">
               <div className="space-y-16">
                  {[
                    { 
                      year: "First Year (1L)", 
                      courses: [
                        "Introduction to Law", 
                        "Contracts I & II", 
                        "Torts I & II", 
                        "Criminal Law", 
                        "Legal Writing & Analysis", 
                        "FYLSX Review"
                      ] 
                    },
                    { 
                      year: "Second Year (2L)", 
                      courses: [
                        "Civil Procedure", 
                        "Property", 
                        "Remedies", 
                        "Criminal Procedure"
                      ] 
                    },
                    { 
                      year: "Third Year (3L)", 
                      courses: [
                        "Evidence", 
                        "Constitutional Law", 
                        "Business Associations", 
                        "Community Property"
                      ] 
                    },
                    { 
                      year: "Fourth Year (4L)", 
                      courses: [
                        "Professional Responsibility", 
                        "Wills & Succession", 
                        "California Civil Procedure", 
                        "California Evidence",
                        "Advanced Legal Research & Writing",
                        "Practical Competency Training"
                      ] 
                    }
                  ].map((row, i) => (
                    <div key={i} className="relative group">
                       <div className="absolute -left-4 top-0 bottom-0 w-1 bg-pau-gold/20 group-hover:bg-pau-gold transition-colors"></div>
                       <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-6 pl-4">{row.year}</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                          {row.courses.map(c => (
                            <div key={c} className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 font-medium hover:shadow-md transition-all">
                               {c}
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </>
        );

      case 'bar-info':
        return (
          <>
            <SubPageHeader 
              title="Bar Examination" 
              subtitle="Compliance and requirements for California licensure." 
              icon={ShieldCheckIcon}
              onBack={() => onNavigate('academics')}
            />
            <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
               <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-6">First-Year Law Students' Exam (FYLSX)</h3>
                  <p className="text-gray-600 leading-relaxed font-light mb-8">
                    In accordance with Section 6060(h) of the California Business and Professions Code, students at unaccredited law schools must pass the First-Year Law Students’ Examination (the "Baby Bar") within three administrations of first becoming eligible to take it.
                  </p>
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                    <p className="text-xs text-red-700 font-bold uppercase tracking-widest mb-2">Notice:</p>
                    <p className="text-sm text-red-800 italic">No credit for law study after the first year will be granted until the student has passed the FYLSX.</p>
                  </div>
               </div>

               <div className="bg-pau-darkBlue p-10 rounded-[40px] text-white shadow-2xl">
                  <h3 className="text-2xl font-serif font-bold text-pau-gold mb-6">General Bar Examination</h3>
                  <p className="text-gray-300 leading-relaxed font-light mb-8">
                    Graduates of PAU School of Law are eligible to sit for the California General Bar Examination upon successful completion of the 84-unit J.D. program and meeting all other moral character and legal requirements.
                  </p>
                  <a 
                    href="https://www.calbar.ca.gov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-white/10 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-pau-darkBlue transition-all text-center"
                  >
                    Visit California State Bar Website
                  </a>
               </div>
            </div>
          </>
        );

      case 'grad-reqs':
        return (
          <>
            <SubPageHeader 
              title="Graduation Requirements" 
              subtitle="The final steps toward becoming a Juris Doctor." 
              icon={AcademicCapIcon}
              onBack={() => onNavigate('academics')}
            />
            <div className="max-w-5xl mx-auto px-6 py-20">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    { title: "Academic Units", icon: DocumentDuplicateIcon, detail: "Successful completion of at least 84 semester units of law study." },
                    { title: "Residency", icon: ClockIcon, detail: "Minimum of four (4) years of law study with regular attendance." },
                    { title: "Core Curriculum", icon: BookOpenIcon, detail: "Passing grades in all mandatory foundational courses including Professional Responsibility." },
                    { title: "GPA Standing", icon: CheckBadgeIcon, detail: "Maintenance of a cumulative GPA of 2.0 or higher throughout the program." }
                  ].map((req, i) => (
                    <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-card flex gap-6">
                       <div className="p-3 bg-pau-light text-pau-blue rounded-xl h-fit">
                          <req.icon className="h-6 w-6" />
                       </div>
                       <div>
                          <h4 className="text-xl font-serif font-bold text-pau-darkBlue mb-2">{req.title}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed font-light">{req.detail}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </>
        );

      case 'course-desc':
        return (
          <>
            <SubPageHeader 
              title="Course Catalog" 
              subtitle="Explore the fundamental pillars of our legal instruction." 
              icon={ListBulletIcon}
              onBack={() => onNavigate('academics')}
            />
            <div className="max-w-5xl mx-auto px-6 py-20">
               <div className="grid grid-cols-1 gap-8">
                  {[
                    { name: "Torts", desc: "Examination of civil wrongs and liabilities arising from breaches of duty. Covers negligence, strict liability, and intentional torts." },
                    { name: "Contracts", desc: "Study of the creation, interpretation, and enforcement of legal agreements. Analyzes offer, acceptance, consideration, and remedies." },
                    { name: "Criminal Law", desc: "Analysis of the principles of criminal responsibility, encompassing both the actus reus and mens rea requirements." },
                    { name: "Real Property", desc: "Detailed study of rights in land, including estates, concurrent ownership, and landlord-tenant relations." }
                  ].map((course, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-pau-gold transition-colors">
                       <h3 className="text-xl font-bold text-pau-blue mb-3">{course.name}</h3>
                       <p className="text-gray-600 font-light leading-relaxed">{course.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </>
        );

      default:
        // Overview (default 'academics')
        return (
          <>
            <div className="relative bg-pau-darkBlue pt-44 pb-24 sm:pb-32 overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1544928147-79a2e746b531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Law Library"
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-pau-darkBlue/70 to-transparent" />
              </div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
                <div className="inline-flex p-3 bg-white/10 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                  <AcademicCapIcon className="h-10 w-10 text-pau-gold" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-white sm:text-6xl mb-6 tracking-tight">
                  {content.title}
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                  {content.intro}
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="mb-32">
                <div className="flex items-center space-x-4 mb-12">
                  <span className="h-px w-12 bg-pau-gold"></span>
                  <span className="text-pau-gold font-bold tracking-widest uppercase text-xs">Academic Portal</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {academicPortals.map((portal) => (
                    <button
                      key={portal.id}
                      onClick={() => onNavigate(portal.id)}
                      className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-pau-blue/20 transition-all duration-500 text-left flex flex-col h-full"
                    >
                      <div className={`p-4 bg-gray-50 rounded-xl mb-6 group-hover:bg-pau-blue group-hover:text-white transition-all duration-300 ${portal.color}`}>
                        <portal.icon className="h-8 w-8 stroke-1" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif group-hover:text-pau-blue transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                        {portal.desc}
                      </p>
                      <div className="flex items-center text-xs font-bold text-pau-gold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Explore Section <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                <div className="space-y-8">
                  <h2 className="text-3xl font-serif font-bold text-pau-blue border-b border-gray-100 pb-6">
                    {content.programsTitle}
                  </h2>
                  <div className="space-y-6">
                    {content.programs.map((prog, idx) => (
                      <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                        <h4 className="text-xl font-bold text-pau-darkBlue mb-3 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-pau-gold mr-3"></div>
                          {prog.name}
                        </h4>
                        <p className="text-gray-600 leading-relaxed font-light">{prog.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-pau-darkBlue p-12 rounded-3xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <ScaleIcon className="h-64 w-64" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl font-serif font-bold mb-10 text-pau-gold">
                      {content.concentrationsTitle}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      {content.concentrations.map((conc, idx) => (
                        <div key={idx} className="flex items-center group cursor-pointer">
                          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mr-4 group-hover:border-pau-gold group-hover:bg-pau-gold transition-all">
                            <BookOpenIcon className="h-4 w-4 text-white group-hover:text-pau-darkBlue" />
                          </div>
                          <span className="text-lg font-light text-gray-200 group-hover:text-white transition-colors">
                            {conc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {renderSubPage()}
    </div>
  );
};
