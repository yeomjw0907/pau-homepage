
import React, { useState } from 'react';
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
  ClockIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AcademicsProps {
  content: AcademicsContent;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

/**
 * Internal helper for detailed sub-page headers
 */
interface SubPageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  onBack: () => void;
}
const SubPageHeader: React.FC<SubPageHeaderProps> = ({ title, subtitle, icon: Icon, onBack }) => (
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
  const [selectedCourse, setSelectedCourse] = useState<{ className: string; description: string } | null>(null);

  // Course descriptions mapping
  const courseDescriptions: Record<string, string> = {
    "Introduction to Law": "This introductory course explores the foundational concepts of common law and the history of the American legal system. It provides students with an understanding of legal principles and case analysis.",
    "Contracts I": "This course examines the law governing private agreements, including the enforcement of promises, precontractual liability, and statutory requirements such as the statute of frauds. It covers the analysis of legal enforceability of agreements, breach of contract, and available remedies.",
    "Contracts II": "This course examines the law governing private agreements, including the enforcement of promises, precontractual liability, and statutory requirements such as the statute of frauds. It covers the analysis of legal enforceability of agreements, breach of contract, and available remedies.",
    "Torts I": "Focusing on personal injury law, this course examines negligence and the evolving nature of negligence law. It also covers intentional torts, contemporary rules, and strict liability.",
    "Torts II": "Focusing on personal injury law, this course examines negligence and the evolving nature of negligence law. It also covers intentional torts, contemporary rules, and strict liability.",
    "Criminal Law": "This course covers the core principles of criminal law, including the definitions of crime, actus reus, mens rea, and defenses like necessity, intoxication, and insanity.",
    "Legal Writing & Analysis": "Provides a rigorous foundation in legal reasoning, analytical thinking, and professional writing. Students will develop essential skills for crafting clear, concise, and well-structured responses to legal issues.",
    "FYLSX review": "Prepares students for the California First-Year Law Students' Examination through focused review of Contracts, Criminal Law, and Torts.",
    "Civil Procedure": "Explores civil litigation procedures, including the commencement of suits, pleadings, discovery, and trial processes.",
    "Property": "Examines property law, focusing on various property interests, landlord-tenant relationships, land use, and the sale and financing of real estate.",
    "Remedies": "Surveys the law of remedies, addressing what courts can do for claimants who have been wronged, covering both legal and equitable remedies.",
    "Criminal Procedure": "Focusing on constitutional constraints in criminal investigations, including searches and seizures, interrogations, and the right to counsel.",
    "Evidence": "Delves into the principles and application of evidence law, focusing on the Federal Rules of Evidence.",
    "Constitutional Law": "Explores the U.S. Constitution, including the distribution of governmental powers, judicial review, and individual rights (First Amendment).",
    "Business Associations": "A study of legal principles governing business entities and agency relationships (Partnerships, Corporations, LLCs).",
    "Community Property": "Detailed examination of California's community property system, covering property relations between spouses and domestic partners.",
    "Professional Responsibility": "Covers the law and ethics governing legal practice, including confidentiality, conflicts of interest, and the lawyer-client relationship.",
    "Wills & Succession": "Comprehensive study of succession law, focusing on the transfer of property upon death, intestate succession, and the validity of wills.",
    "California Civil Procedure": "Focuses on California's specific civil procedural rules and the jury trial system.",
    "Advanced Legal Research & Writing": "Refines legal research and writing skills for professional practice, emphasizing persuasive strategy in drafting legal documents.",
    "California Evidence": "Focuses on California's Evidence Code, comparing it to the Federal Rules of Evidence.",
    "Practical Competency Training": "Offers practical training through a law practice internship (Track 1) or an advanced in-class practical skills study (Track 2)."
  };

  const academicPortals = [
    {
      id: 'curriculum-schedule' as Page,
      title: "Curriculum and Schedule",
      desc: "Comprehensive 4-year roadmap for J.D. candidates.",
      icon: MapIcon,
      color: "text-pau-gold"
    },
    {
      id: 'bar-info' as Page,
      title: "The California State Bar",
      desc: "Information on FYLSX and California Bar Exam eligibility.",
      icon: CheckBadgeIcon,
      color: "text-blue-500"
    },
    {
      id: 'counseling' as Page,
      title: "Academic Counseling and Academic Support",
      desc: "One-on-one guidance to ensure your academic success.",
      icon: ChatBubbleLeftEllipsisIcon,
      color: "text-rose-500"
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
              title="Curriculum and Schedule" 
              subtitle="A rigorous 4-year academic sequence structured for bar readiness." 
              icon={MapIcon}
              onBack={() => onNavigate('home')}
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
               
               {/* Schedule Section */}
               <div className="mt-20 pt-16 border-t-2 border-pau-gold/30">
                 <div className="mb-10">
                   <h2 className="text-3xl font-serif font-bold text-pau-darkBlue mb-3">Schedule of Required Courses</h2>
                   <p className="text-gray-600 text-lg">Complete course schedule organized by year and trimester for the J.D. Program.</p>
                 </div>
                 
                 {/* Schedule by Year */}
                 <div className="space-y-12">
                   {[
                     {
                       year: "1L",
                       yearLabel: "First Year",
                       color: "pau-blue",
                       trimesters: [
                         {
                           name: "Fall (Sep.)",
                           courses: [
                             { classNum: "Law 100", className: "Introduction to Law", units: "1 unit", hours: "45 hours" },
                             { classNum: "Law 101", className: "Contracts I", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 103", className: "Torts I", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 105", className: "Criminal Law", units: "3.5 units", hours: "157.5 hours" }
                           ]
                         },
                         {
                           name: "Winter (Jan.)",
                           courses: [
                             { classNum: "Law 100", className: "Introduction to Law", units: "1 unit", hours: "45 hours" },
                             { classNum: "Law 101", className: "Contracts I", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 102", className: "Contracts II", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 103", className: "Torts I", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 104", className: "Torts II", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 105", className: "Criminal Law", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 106", className: "Legal Writing & Analysis", units: "2 units", hours: "90 hours" }
                           ]
                         },
                         {
                           name: "Spring (Apr.)",
                           courses: [
                             { classNum: "Law 100", className: "Introduction to Law", units: "1 unit", hours: "45 hours" },
                             { classNum: "Law 101", className: "Contracts I", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 102", className: "Contracts II", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 103", className: "Torts I", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 104", className: "Torts II", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "Law 105", className: "Criminal Law", units: "6 units", hours: "270 hours" },
                             { classNum: "Law 106", className: "Legal Writing & Analysis", units: "2 units", hours: "90 hours" },
                             { classNum: "Law 107", className: "FYLSX review", units: "3 units", hours: "135 hours" }
                           ]
                         }
                       ]
                     },
                     {
                       year: "2L",
                       yearLabel: "Second Year",
                       color: "pau-gold",
                       trimesters: [
                         {
                           name: "Spring (Mar.)",
                           courses: [
                             { classNum: "Law 201", className: "Civil Procedure", units: "9 units", hours: "405 hours" }
                           ]
                         },
                         {
                           name: "Summer (Jul.)",
                           courses: [
                             { classNum: "Law 202", className: "Property", units: "9 units", hours: "405 hours" }
                           ]
                         },
                         {
                           name: "Fall (Nov.)",
                           courses: [
                             { classNum: "Law 203", className: "Remedies", units: "4 units", hours: "180 hours" },
                             { classNum: "Law 204", className: "Criminal Procedure", units: "4 units", hours: "180 hours" }
                           ]
                         }
                       ]
                     },
                     {
                       year: "3L",
                       yearLabel: "Third Year",
                       color: "pau-blue",
                       trimesters: [
                         {
                           name: "Spring (Mar.)",
                           courses: [
                             { classNum: "Law 301", className: "Evidence", units: "9 units", hours: "405 hours" }
                           ]
                         },
                         {
                           name: "Summer (Jul.)",
                           courses: [
                             { classNum: "Law 302", className: "Constitutional Law", units: "9 units", hours: "405 hours" }
                           ]
                         },
                         {
                           name: "Fall (Nov.)",
                           courses: [
                             { classNum: "Law 303", className: "Business Associations", units: "4 units", hours: "180 hours" },
                             { classNum: "Law 304", className: "Community Property", units: "5 units", hours: "225 hours" }
                           ]
                         }
                       ]
                     },
                     {
                       year: "4L",
                       yearLabel: "Fourth Year",
                       color: "pau-gold",
                       trimesters: [
                         {
                           name: "Winter (Jan.)",
                           courses: [
                             { classNum: "Law 401", className: "Professional Responsibility", units: "4 units", hours: "180 hours" },
                             { classNum: "Law 402", className: "Wills & Succession", units: "5 units", hours: "225 hours" }
                           ]
                         },
                         {
                           name: "Summer (Jul.)",
                           courses: [
                             { classNum: "Law 403", className: "California Civil Procedure", units: "4 units", hours: "180 hours" },
                             { classNum: "Law 404", className: "California Evidence", units: "4 units", hours: "180 hours" }
                           ]
                         },
                         {
                           name: "Fall (Nov.)",
                           courses: [
                             { classNum: "Law 405", className: "Advanced Legal Research & Writing", units: "3 units", hours: "135 hours" },
                             { classNum: "Law 406", className: "Practical Competency Training", units: "6 units", hours: "270 hours" }
                           ]
                         }
                       ]
                     }
                   ].map((yearData, yearIdx) => {
                     const isBlue = yearData.color === "pau-blue";
                     return (
                     <div key={yearIdx} className="relative">
                       {/* Year Header */}
                       <div className="flex items-center gap-4 mb-6">
                         <div className={`flex items-center justify-center w-16 h-16 rounded-xl font-bold text-xl border-2 ${
                           isBlue 
                             ? 'bg-pau-blue/10 text-pau-blue border-pau-blue/30' 
                             : 'bg-pau-gold/10 text-pau-gold border-pau-gold/30'
                         }`}>
                           {yearData.year}
                         </div>
                         <div>
                           <h3 className="text-2xl font-serif font-bold text-pau-darkBlue">{yearData.yearLabel}</h3>
                           <p className="text-sm text-gray-500">Academic Year Schedule</p>
                         </div>
                       </div>

                       {/* Trimesters */}
                       <div className="space-y-6 ml-0 md:ml-20">
                         {yearData.trimesters.map((trimester, triIdx) => (
                           <div key={triIdx} className="relative">
                             {/* Trimester Header */}
                             <div className="flex items-center gap-3 mb-4">
                               <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                                 isBlue ? 'bg-pau-blue' : 'bg-pau-gold'
                               }`}></div>
                               <h4 className="text-lg font-bold text-pau-darkBlue">{trimester.name}</h4>
                               <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                             </div>

                             {/* Courses Grid */}
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
                               {trimester.courses.map((course, courseIdx) => (
                                 <div 
                                   key={courseIdx}
                                   onClick={() => {
                                     const description = courseDescriptions[course.className] || "Course description not available.";
                                     setSelectedCourse({ className: course.className, description });
                                   }}
                                   className="group bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-pau-blue/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                                 >
                                   <div className="flex items-start justify-between mb-3">
                                     <span className="font-mono text-sm font-bold text-pau-blue">{course.classNum}</span>
                                     <div className="flex items-center gap-2">
                                       <span className="text-xs bg-pau-gold/10 text-pau-darkBlue px-2 py-1 rounded font-semibold">{course.units}</span>
                                     </div>
                                   </div>
                                   <h5 className="font-semibold text-pau-darkBlue mb-2 group-hover:text-pau-blue transition-colors">
                                     {course.className}
                                   </h5>
                                   <div className="flex items-center gap-2 text-xs text-gray-500">
                                     <ClockIcon className="h-4 w-4" />
                                     <span>{course.hours}</span>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </div>
                         ))}
                       </div>

                       {/* Year Separator */}
                       {yearIdx < 3 && (
                         <div className="mt-12 pt-8 border-t border-gray-200"></div>
                       )}
                     </div>
                     );
                   })}
                 </div>
               </div>
            </div>
          </>
        );

      case 'bar-info':
        return (
          <>
            <SubPageHeader 
              title="The California State Bar" 
              subtitle="Compliance and requirements for California licensure." 
              icon={ShieldCheckIcon}
              onBack={() => onNavigate('home')}
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
              onBack={() => onNavigate('home')}
            />
            <div className="max-w-5xl mx-auto px-6 py-20">
               <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-10 mb-12">
                 <p className="text-gray-700 text-lg leading-relaxed mb-8">
                   In order to obtain a J.D. degree from PAUSL, students must fulfill the following requirements:
                 </p>
                 <ul className="space-y-6">
                   <li className="flex items-start group">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                       <CheckBadgeIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                     </div>
                     <span className="text-gray-700 text-lg pt-0.5">Complete a minimum of 864 hours of study annually, spanning forty-eight (48) to fifty-two (52) consecutive weeks, for a total of four (4) years.</span>
                   </li>
                   <li className="flex items-start group">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                       <CheckBadgeIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                     </div>
                     <span className="text-gray-700 text-lg pt-0.5">Each course entails a minimum of 140 Credit Hours (comprising three (3) units with forty-five (45) hours of class time/academic engagement and a minimum of ninety (90) study hours).</span>
                   </li>
                   <li className="flex items-start group">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                       <CheckBadgeIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                     </div>
                     <span className="text-gray-700 text-lg pt-0.5">Successfully pass the State Bar of California's First-Year Law Students' Examination (FYLSX) following the completion of their first year of study.</span>
                   </li>
                   <li className="flex items-start group">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                       <CheckBadgeIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                     </div>
                     <span className="text-gray-700 text-lg pt-0.5">Maintain a cumulative grade point average of 2.0 or higher throughout their tenure at the law school.</span>
                   </li>
                   <li className="flex items-start group">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                       <CheckBadgeIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                     </div>
                     <span className="text-gray-700 text-lg pt-0.5">Satisfy all financial obligations by paying tuition, fees, and any outstanding charges.</span>
                   </li>
                   <li className="flex items-start group">
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                       <CheckBadgeIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                     </div>
                     <span className="text-gray-700 text-lg pt-0.5">Successfully pass all required courses to qualify for the J.D. degree.</span>
                   </li>
                 </ul>
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
              onBack={() => onNavigate('home')}
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

      case 'counseling':
        return (
          <>
            <SubPageHeader 
              title="Academic Counseling and Academic Support" 
              subtitle="Personalized support to guide your law school journey." 
              icon={ChatBubbleLeftEllipsisIcon}
              onBack={() => onNavigate('home')}
            />
            <div className="max-w-5xl mx-auto px-6 py-20">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-serif font-bold text-pau-darkBlue">Dedicated to Your Success</h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      At PAU School of Law, we understand that online learning requires discipline and support. Our Academic Counseling office provides personalized guidance to help you manage your course load, prepare for exams, and balance your studies with professional and personal commitments.
                    </p>
                    <ul className="space-y-4 pt-4">
                      {[
                        "Individualized Study Plans",
                        "FYLSX Preparation Strategy",
                        "Performance Analysis & Feedback",
                        "Time Management Coaching"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-pau-blue font-medium">
                          <CheckBadgeIcon className="h-5 w-5 mr-3 text-pau-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-pau-light p-10 rounded-3xl border border-gray-100 shadow-lg text-center">
                     <UserGroupIcon className="h-16 w-16 text-pau-gold mx-auto mb-6" />
                     <h4 className="text-xl font-bold text-pau-darkBlue mb-4">Schedule an Appointment</h4>
                     <p className="text-sm text-gray-500 mb-8">
                       Counseling sessions are available via Zoom or phone. Current students can book directly through the student portal.
                     </p>
                     <button className="bg-pau-blue text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-pau-darkBlue transition-colors shadow-md">
                       Book Session
                     </button>
                  </div>
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
              {/* J.D. Program Overview */}
              <div className="mb-20 max-w-4xl mx-auto">
                <h2 className="text-4xl font-serif font-bold text-pau-darkBlue mb-8 text-center">J.D. Program Overview</h2>
                <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-10">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    The J.D. degree is a law school program designed to prepare students for law practice in California. Typically, law students must complete a J.D. degree to qualify for the bar exam and, upon passing, become licensed attorneys. As a State Bar of California registered correspondence law school, this J.D. Program is a part-time, four-year curriculum, enabling students to work full-time while studying law.
                  </p>
                </div>
              </div>

              <div className="mb-32">
                <div className="flex items-center space-x-4 mb-12">
                  <span className="h-px w-12 bg-pau-gold"></span>
                  <span className="text-pau-gold font-bold tracking-widest uppercase text-xs">Academic Portal</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {academicPortals.map((portal) => (
                    <button
                      key={portal.id}
                      onClick={() => onNavigate(portal.id)}
                      className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-pau-blue/20 transition-all duration-500 text-left flex flex-col h-full"
                    >
                      <div className={`p-3 bg-gray-50 rounded-xl mb-4 group-hover:bg-pau-blue group-hover:text-white transition-all duration-300 w-fit ${portal.color}`}>
                        <portal.icon className="h-6 w-6 stroke-1" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif group-hover:text-pau-blue transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow">
                        {portal.desc}
                      </p>
                      <div className="flex items-center text-[10px] font-bold text-pau-gold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        View <ArrowRightIcon className="ml-1 h-3 w-3" />
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
      
      {/* Course Description Modal - Global for all sub-pages */}
      {selectedCourse && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedCourse(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border-2 border-pau-gold/20 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="relative bg-gradient-to-r from-pau-darkBlue via-pau-blue to-pau-darkBlue px-8 py-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pau-gold to-transparent"></div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                    <BookOpenIcon className="h-8 w-8 text-pau-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                      {selectedCourse.className}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-pau-gold uppercase tracking-widest">Course Description</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2.5 hover:bg-white/10 rounded-xl transition-all group border border-white/20 hover:border-pau-gold"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-6 w-6 text-white group-hover:text-pau-gold transition-colors" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 bg-gradient-to-b from-white to-gray-50/50">
              <div className="prose prose-lg max-w-none">
                <div className="relative pl-6 border-l-4 border-pau-gold mb-6">
                  <p className="text-gray-800 leading-relaxed text-base md:text-lg font-light">
                    {selectedCourse.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <AcademicCapIcon className="h-5 w-5 text-pau-gold" />
                  <span className="font-medium">Pacific American University School of Law</span>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-6 py-2.5 bg-pau-blue text-white rounded-lg font-semibold hover:bg-pau-darkBlue transition-colors shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
