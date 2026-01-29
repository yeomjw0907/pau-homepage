
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
    "Introduction to Law": "This introductory course explores the foundational concepts of common law and the history of the American legal system. It provides students with an understanding of legal principles and case analysis. (1 Unit - 45 hours)",
    "Contracts I": "This course examines the law governing private agreements, including the enforcement of promises, precontractual liability, and statutory requirements such as the statute of frauds. It covers the analysis of legal enforceability of agreements, breach of contract, and available remedies. Key issues include contract formation, the rights of parties under contracts, and performance conditions. (3.5 Units - 157.5 hours)",
    "Contracts II": "Continuation of Contracts I. This course examines the law governing private agreements, including the enforcement of promises, precontractual liability, and statutory requirements such as the statute of frauds. Emphasis will be placed on contract interpretation and the interrelationship with other areas of law such as torts, property, and restitution. (3.5 Units - 157.5 hours)",
    "Torts I": "Focusing on personal injury law, this course examines negligence and the evolving nature of negligence law. It also covers intentional torts, contemporary rules, and strict liability. The course explores alternative compensation systems such as no-fault insurance, addressing societal needs for victim compensation. (3.5 Units - 157.5 hours)",
    "Torts II": "Continuation of Torts I. Focusing on personal injury law, this course examines negligence and the evolving nature of negligence law. It also covers intentional torts, contemporary rules, and strict liability. (3.5 Units - 157.5 hours)",
    "Criminal Law": "This course covers the core principles of criminal law, including the definitions of crime, actus reus, mens rea, and doctrines such as ignorance of law and fact. It delves into defenses like necessity, intoxication, and insanity. The course offers an in-depth review of homicide and other offenses, focusing on the theoretical underpinnings of criminal law and its justification for punishment. (4 Units - 180 hours)",
    "Legal Writing & Analysis": "Legal Writing & Analysis is a two-credit course taken throughout the first year of law school. It provides a rigorous foundation in legal reasoning, analytical thinking, and professional writing. Students will develop essential skills for crafting clear, concise, and well-structured responses to legal issues through a series of targeted writing assignments. The course also offers a brief introduction to legal research, equipping students with the knowledge and tools to locate and interpret relevant legal authorities. Instruction is delivered through a combination of lectures and practical exercises designed to simulate real-world legal practice and reinforce core competencies. (2 Units - 90 hours)",
    "FYLSX Review": "This course prepares first-year law students for the California First-Year Law Students' Examination (FYLSX) through focused review of Contracts, Criminal Law, and Torts. Students develop doctrinal mastery, issue-spotting skills, and effective test-taking strategies through lectures, weekly practice quizzes, and timed simulated examinations. The course emphasizes accurate rule application, analytical precision, and performance under exam conditions, culminating in a final review and strategy session to support readiness for the FYLSX. (3 Units - 135 hours)",
    "Civil Procedure I": "This course explores civil litigation procedures, including the commencement of suits, pleadings, discovery, and trial processes. Topics covered include court jurisdiction, class actions, summary judgment, and the appeal process. (4.5 Units - 202.5 hours)",
    "Civil Procedure II": "Continuation of Civil Procedure I, exploring advanced civil litigation procedures. (4.5 Units - 202.5 hours)",
    "Property I": "This course examines property law, focusing on various property interests, landlord-tenant relationships, land use, and the sale and financing of real estate. (4.5 Units - 202.5 hours)",
    "Property II": "Continuation of Property I, examining advanced property law concepts. (4.5 Units - 202.5 hours)",
    "Remedies": "This course surveys the law of remedies, addressing what courts can do for claimants who have been wronged. It covers both legal and equitable remedies, with attention to their justifications and how they protect substantive rights. (4 Units - 180 hours)",
    "Criminal Procedure": "Focusing on constitutional constraints in criminal investigations, this course covers searches and seizures, interrogations, confessions, lineups, and the right to counsel under the Fourth, Fifth, and Sixth Amendments. (4 Units - 180 hours)",
    "Evidence I": "This course delves into the principles and application of evidence law, focusing on the Federal Rules of Evidence. Topics include relevance, credibility, hearsay, impeachment, and the presentation of evidence in court. (4.5 Units - 202.5 hours)",
    "Evidence II": "Continuation of Evidence I, covering advanced topics in evidence law. (4.5 Units - 202.5 hours)",
    "Constitutional Law I": "This course explores the U.S. Constitution, including the distribution of governmental powers, judicial review, and individual rights. A primary focus will be on the First Amendment and its guarantees of free speech, press, assembly, and religious freedom. (4.5 Units - 202.5 hours)",
    "Constitutional Law II": "Continuation of Constitutional Law I, exploring advanced constitutional topics. (4.5 Units - 202.5 hours)",
    "Business Associations": "This course provides a comprehensive study of the legal principles governing business entities and agency relationships. Students will explore the formation, rights, duties, and liabilities of agents, principals, and various business structures including general partnerships, limited partnerships, limited liability partnerships, corporations, limited liability companies, joint ventures, and sole proprietorships. Emphasis is placed on understanding fiduciary obligations, authority, liability in contract and tort, and the mechanisms of dissociation, dissolution, and corporate governance. The course also examines securities regulation, mergers and acquisitions, and the unique rules applicable to closely-held and non-profit corporations. (4 Units - 180 hours)",
    "Community Property": "As detailed examination of California's community property system, this course covers property relations between spouses and domestic partners, and the implications of divorce or death. The course prepares students for issues on the California State Bar Examination and encourages active participation through the 'assigned expert' system. (5 Units - 225 hours)",
    "Professional Responsibility": "This course covers the law and ethics governing legal practice, including the duty to represent clients competently, confidentiality, conflicts of interest, and the lawyer-client relationship. It examines the standards of conduct expected of attorneys. (4 Units - 180 hours)",
    "Wills & Succession": "This course provides a comprehensive study of succession law, focusing on the rules governing the transfer of property upon death. Students will explore the general provisions affecting married persons, contractual arrangements, and simultaneous death scenarios. The course examines intestate succession, the validity and execution of wills, and the doctrines surrounding revocation, revival, and omitted heirs. Special attention is given to the interpretation of testamentary instruments, the role of witnesses, and the choice of law in cross-jurisdictional contexts. (5 Units - 225 hours)",
    "California Civil Procedure": "This course focuses on California's civil procedural rules, including the rules governing civil proceedings and the jury trial system. (4 Units - 180 hours)",
    "Advanced Legal Research & Writing": "This course is designed to refine students' legal research and writing skills for professional practice. Building on foundational competencies, students will learn advanced techniques for locating, analyzing, and applying legal authority across jurisdictions. The writing component emphasizes clarity, precision, and persuasive strategy in drafting legal memoranda, motions, briefs, and client communications. (3 Units - 135 hours)",
    "California Evidence": "This course focuses on California's Evidence Code, comparing it to the Federal Rules of Evidence, with particular attention to areas where the California rules differ. (4 Units - 180 hours)",
    "Practical Competency Training": "This course offers practical training in legal practice, emphasizing the essential skills for ethical and competent lawyering. There are two available tracks: the first track (Track 1) is a legal internship/externship in a law practice environment focused on learning hands-on law practice skills and the second track (Track 2) is focused on an in-class academic study of advanced law practice skills. (6 Units - 270 hours)",
    "Bar Review (Elective)": "The California State Bar Examination review course includes comprehensive coverage of all subjects tested on the California State Bar Examination. These subjects encompass Business Associations, Contracts, Criminal Law and Procedure, Remedies, Civil Procedure, Evidence, Torts, Community Property, Professional Responsibility, Trusts, Constitutional Law, Real Property, and Wills and Succession. The course also delves into essay writing techniques, performance test strategies, and multiple-choice questions consistent with those found on the Multistate Bar Exam (MBE). Note that separate from the Bar Review course, 4L students will be able to register for Bar Prep with a $200 setup fee (any additional costs will be covered by the school), take the course after graduation, and continue to receive support from the school even after graduating. (4 Units - 180 hours)"
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
                        "Contracts I", 
                        "Contracts II",
                        "Torts I", 
                        "Torts II", 
                        "Criminal Law", 
                        "Legal Writing & Analysis", 
                        "FYLSX Review"
                      ] 
                    },
                    { 
                      year: "Second Year (2L)", 
                      courses: [
                        "Civil Procedure I",
                        "Civil Procedure II", 
                        "Property I",
                        "Property II", 
                        "Remedies", 
                        "Criminal Procedure"
                      ] 
                    },
                    { 
                      year: "Third Year (3L)", 
                      courses: [
                        "Evidence I",
                        "Evidence II", 
                        "Constitutional Law I",
                        "Constitutional Law II", 
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
                           name: "Fall (Sept.)",
                           courses: [
                             { classNum: "L100", className: "Introduction to Law", units: "1 unit", hours: "45 hours" },
                             { classNum: "L101", className: "Contracts I", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "L103", className: "Torts I", units: "3.5 units", hours: "157.5 hours" }
                           ]
                         },
                         {
                           name: "Winter (Jan.)",
                           courses: [
                             { classNum: "L105", className: "Criminal Law", units: "4 units", hours: "180 hours" },
                             { classNum: "L102", className: "Contracts II", units: "3.5 units", hours: "157.5 hours" }
                           ]
                         },
                         {
                           name: "Spring (May)",
                           courses: [
                             { classNum: "L104", className: "Torts II", units: "3.5 units", hours: "157.5 hours" },
                             { classNum: "L106", className: "Legal Writing & Analysis", units: "2 units", hours: "90 hours" },
                             { classNum: "L107", className: "FYLSX Review", units: "3 units", hours: "135 hours" }
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
                           name: "Fall (Sept.)",
                           courses: [
                             { classNum: "L201", className: "Civil Procedure I", units: "4.5 units", hours: "202.5 hours" },
                             { classNum: "L203", className: "Property I", units: "4.5 units", hours: "202.5 hours" }
                           ]
                         },
                         {
                           name: "Winter (Jan.)",
                           courses: [
                             { classNum: "L202", className: "Civil Procedure II", units: "4.5 units", hours: "202.5 hours" },
                             { classNum: "L204", className: "Property II", units: "4.5 units", hours: "202.5 hours" }
                           ]
                         },
                         {
                           name: "Spring (May)",
                           courses: [
                             { classNum: "L205", className: "Remedies", units: "4 units", hours: "180 hours" },
                             { classNum: "L206", className: "Criminal Procedure", units: "4 units", hours: "180 hours" }
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
                           name: "Fall (Sept.)",
                           courses: [
                             { classNum: "L301", className: "Constitutional Law I", units: "4.5 units", hours: "202.5 hours" },
                             { classNum: "L303", className: "Evidence I", units: "4.5 units", hours: "202.5 hours" }
                           ]
                         },
                         {
                           name: "Winter (Jan.)",
                           courses: [
                             { classNum: "L302", className: "Constitutional Law II", units: "4.5 units", hours: "202.5 hours" },
                             { classNum: "L304", className: "Evidence II", units: "4.5 units", hours: "202.5 hours" }
                           ]
                         },
                         {
                           name: "Spring (May)",
                           courses: [
                             { classNum: "L305", className: "Business Associations", units: "4 units", hours: "180 hours" },
                             { classNum: "L306", className: "Community Property", units: "5 units", hours: "225 hours" }
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
                           name: "Fall (Sept.)",
                           courses: [
                             { classNum: "L401", className: "Professional Responsibility", units: "4 units", hours: "180 hours" },
                             { classNum: "L402", className: "Wills & Succession", units: "5 units", hours: "225 hours" }
                           ]
                         },
                         {
                           name: "Winter (Jan.)",
                           courses: [
                             { classNum: "L403", className: "California Civil Procedure", units: "4 units", hours: "180 hours" },
                             { classNum: "L404", className: "California Evidence", units: "4 units", hours: "180 hours" }
                           ]
                         },
                         {
                           name: "Spring (May)",
                           courses: [
                             { classNum: "L405", className: "Advanced Legal Research & Writing", units: "3 units", hours: "135 hours" },
                             { classNum: "L406", className: "Practical Competency Training", units: "6 units", hours: "270 hours" },
                             { classNum: "L407", className: "Bar Review (Elective)", units: "4 units", hours: "180 hours" }
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
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-6">Student Registration</h3>
                  <p className="text-gray-600 leading-relaxed font-light mb-6">
                    Law school students must register as students with the State Bar of California. The registration form must be completed accurately under penalty of perjury.
                  </p>
                  <p className="text-gray-600 leading-relaxed font-light mb-6">
                    Potential students with any questions may contact the Committee of Bar Examiners of the State Bar of California at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
                    <p className="font-semibold text-pau-darkBlue mb-4">The State Bar of California</p>
                    <div className="space-y-3 text-gray-700">
                      <div>
                        <p className="font-semibold mb-1">Main Office:</p>
                        <p>180 Howard Street</p>
                        <p>San Francisco, CA 94105</p>
                        <p>(415) 538-2000</p>
                      </div>
                      <div className="pt-3 border-t border-gray-300">
                        <p className="font-semibold mb-1">Branch Office:</p>
                        <p>845 S. Figueroa St.</p>
                        <p>Los Angeles, CA 90017-2515</p>
                        <p>(213) 765-1000</p>
                      </div>
                      <div className="pt-3 border-t border-gray-300">
                        <a 
                          href="https://www.calbar.ca.gov" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pau-blue hover:text-pau-darkBlue underline font-semibold"
                        >
                          www.calbar.ca.gov
                        </a>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-6">First-Year Law Students' Exam (FYLSX)</h3>
                  <p className="text-gray-600 leading-relaxed font-light mb-6">
                    The method of instruction at this law school for the Juris Doctor (J.D.) degree program is principally by correspondence. Students enrolled in the J.D. degree program at this law school who successfully complete the first year of law study must pass the First-Year Law Students' Examination required by Business and Professions Code § 6060(h) and Title 4, Division 1, Chapter 1 Rule 4.3(I) of the of the Rules of the State Bar of California as part of the requirements to qualify to take the California Bar Examination. A student who passes the First-Year Law Students' Examination within three (3) administrations of the examination after first becoming eligible to take it will receive credit for all legal studies completed to the time the examination is passed. A student who does not pass the examination within three (3) administrations of the examination after first becoming eligible to take it must be promptly disqualified from the law school's J.D. degree program. If the dismissed student subsequently passes the examination, the student is eligible for re-enrollment in this law school's J.D. degree program, but will receive credit for only one year of legal study.
                  </p>
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                    <p className="text-xs text-red-700 font-bold uppercase tracking-widest mb-2">Notice:</p>
                    <p className="text-sm text-red-800 italic">No credit for law study after the first year will be granted until the student has passed the FYLSX.</p>
                  </div>
               </div>

               <div className="bg-pau-darkBlue p-10 rounded-[40px] text-white shadow-2xl">
                  <h3 className="text-2xl font-serif font-bold text-pau-gold mb-6">General Bar Examination</h3>
                  <p className="text-gray-300 leading-relaxed font-light mb-6">
                    Graduates of PAU School of Law are eligible to sit for the California General Bar Examination upon successful completion of the 84-unit J.D. program and meeting all other moral character and legal requirements.
                  </p>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-8">
                    <p className="text-gray-200 leading-relaxed font-light">
                      PAUSL offers 4L students an elective Bar Review course that provides comprehensive review of all exam subjects, timed writing assignments, and mock MBE exams to hone essential skills for the California Bar Examination.
                    </p>
                  </div>
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
            <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
              {/* Introduction */}
              <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100">
                <p className="text-gray-600 leading-relaxed font-light">
                  PAUSL provides academic counseling and related student support services to assist students in progressing successfully through the program. Academic counseling is available through faculty and staff and is designed to help students understand course expectations, develop effective study strategies, and navigate academic requirements.
                </p>
              </div>

              {/* Academic Counseling Group */}
              <div className="bg-white rounded-[40px] shadow-premium border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-pau-blue/5 to-pau-blue/10 px-10 py-8 border-b border-gray-100">
                  <h2 className="text-3xl font-serif font-bold text-pau-darkBlue">Academic Counseling</h2>
                </div>
                <div className="p-10 space-y-8">
                  {/* Academic Counseling */}
                  <div className="pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Academic Counseling</h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      Faculty provide guidance related to course content; study methods appropriate to correspondence legal education, time management, and preparation for assessments. Each course has a designated instructor who serves as the primary point of contact for academic support.
                    </p>
                  </div>

                  {/* Advising on Academic Policies and Procedures */}
                  <div className="pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Advising on Academic Policies and Procedures</h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      PAUSL informs students about academic policies, deadlines, and administrative requirements and provides assistance in understanding these policies as they relate to academic progress.
                    </p>
                  </div>

                  {/* Course Planning and Program Progression */}
                  <div className="pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Course Planning and Program Progression</h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      PAUSL provides guidance to help students understand the required course sequence and any available options within the program. Faculty and staff assist students in planning for successful progression through the curriculum.
                    </p>
                  </div>

                  {/* Transition Support */}
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Transition Support</h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      Students transferring into PAUSL or transitioning between stages of study may receive support to help ensure continuity of academic progress.
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Support Group */}
              <div className="bg-white rounded-[40px] shadow-premium border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-pau-blue/5 to-pau-blue/10 px-10 py-8 border-b border-gray-100">
                  <h2 className="text-3xl font-serif font-bold text-pau-darkBlue">Academic Support</h2>
                </div>
                <div className="p-10 space-y-8">
                  {/* Academic Support Resources */}
                  <div className="pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Academic Support Resources</h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      Students have access to faculty office hours, email support, and instructional guidance throughout the trimester. PAUSL also offers supplementary resources, including special lecture series, and materials available through PAUSL's membership in CALI.org.
                    </p>
                  </div>

                  {/* Availability */}
                  <div className="pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Availability</h3>
                    <p className="text-gray-600 leading-relaxed font-light">
                      Faculty and staff are available during posted office hours, typically 9:00 AM to 5:00 PM Pacific Time, Monday through Friday. Academic support is also available via email.
                    </p>
                  </div>

                  {/* Student Services: Academic Resources and Student Support at PAUSL */}
                  <div className="pt-8 border-t-2 border-gray-200">
                    <h3 className="text-2xl font-serif font-bold text-pau-blue mb-6">Student Services: Academic Resources and Student Support at PAUSL</h3>
                
                {/* Personalized Academic Advising */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Personalized Academic Advising</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    At PAUSL students benefit from direct engagement with faculty and dedicated support from the dean and associate dean. These faculty and staff are available for one-on-one guidance, helping students navigate course selections and plan their academic journey to ensure timely graduation. Particularly, the dean and associate dean lead workshops throughout the year to support student success.
                  </p>
                </div>

                {/* Targeted Academic Support */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Targeted Academic Support</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    Students are encouraged to schedule phone consultations with the associate dean to review midterm results and receive tailored advice for final exam preparation. This individualized support empowers students to perform at their best.
                  </p>
                </div>

                {/* Academic Success Program */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Academic Success Program</h3>
                  <p className="text-gray-600 leading-relaxed font-light mb-4">
                    Students who are admitted on academic probation or placed on probation during their studies are required to participate in PAUSL's Academic Success Program. However, all students are welcome to access additional academic resources, including a dedicated course site filled with tools and materials designed to enhance learning outcomes.
                  </p>
                </div>

                {/* Student ID Cards */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Student ID Cards</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    PAUSL student identification cards can be conveniently downloaded through the student portal, Populi.
                  </p>
                </div>

                {/* Weekly Dicta Newsletter */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Weekly Dicta Newsletter</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    PAUSL administration produced a weekly newsletter sent via email each week of the term. The Weekly Dicta provides timely updates, deadlines, and information related to the operations of the school, and other information of interest to students, staff, and faculty.
                  </p>
                </div>

                {/* Library, Study, and Research Tools */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Library, Study, and Research Tools</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    PAUSL provides access to Westlaw, offering comprehensive legal resources such as federal and state statutes, case law, textbooks, and scholarly journals. Students also benefit from CALI's interactive learning tools that include over 1,300 interactive CALI Lessons covering every aspect of the PAUSL curriculum and more, Lawdibles which is a recorded audio service that provides a law professor explaining a narrow area of law understandably and accurately in less than ten minutes, subject outlines that help bring additional structure and learning to students on all law school topic areas, plus other curated resources that support legal research and independent as well as collaborative study.
                  </p>
                </div>

                {/* Special Lecture Series */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Special Lecture Series</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    PAUSL hosts a series of distinguished lectures throughout the academic year, featuring guest speakers and experts who explore timely legal topics at no extra cost to students. Students are strongly encouraged to attend these sessions both for the value of the content shared as well as for the potential networking opportunities with both the presenter(s) and other attendees.
                  </p>
                </div>

                {/* Delta Theta Phi Membership */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Delta Theta Phi Membership</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    Eligible PAUSL law students who meet the required GPA threshold may join Delta Theta Phi, one of the nation's oldest law fraternities. Student members have the opportunity to further their academic pursuits through writing articles and/or editing the Adelphia Law Journal, which publishes thought-provoking articles on emerging legal issues and debates. Delta Theta Phi provides more than just a "club" of law students and lawyers, it can play a key role in both success in law school through collaborative assistance with peers and mentors as well as potential opportunities for future employment through this network of legal professionals. Other benefits include eligibility for scholarships, awards, prizes, and opportunities to develop leadership skills within a dynamic legal community.
                  </p>
                </div>

                {/* Transcript and Diploma Services */}
                <div>
                  <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">Transcript and Diploma Services</h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    PAUSL will provide students and alumni with official and unofficial copies of student transcripts, enrollment verifications, and duplicate diplomas upon request for a nominal fee. Please see the Tuition Fees and Costs section of the PAUSL catalog for the fee schedule.
                  </p>
                </div>
                  </div>
                </div>
              </div>

              {/* Academic Success Program (ASP) - Detailed */}
              <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100">
                <h2 className="text-3xl font-serif font-bold text-pau-darkBlue mb-8">Academic Success Program (ASP)</h2>
                <p className="text-gray-600 leading-relaxed font-light mb-6">
                  The Academic Success Program (ASP) at PAUSL is designed to support students who are either at risk of being placed on Academic Probation or are already on Academic Probation.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <span className="text-pau-gold font-bold mr-3">●</span>
                    <p className="text-gray-600 leading-relaxed font-light">
                      <strong>Mandatory Attendance:</strong> Students on Academic Probation, or those referred to ASP by a professor, are required to attend program sessions.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pau-gold font-bold mr-3">●</span>
                    <p className="text-gray-600 leading-relaxed font-light">
                      <strong>Dean's Sessions:</strong> These students must also participate in additional sessions with the Dean of the School of Law.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pau-gold font-bold mr-3">●</span>
                    <p className="text-gray-600 leading-relaxed font-light">
                      <strong>Focus Areas:</strong> ASP sessions emphasize reviewing course assignments, strengthening understanding of legal concepts, improving legal writing, practicing approaches to the MBE, and learning how to effectively use academic resources.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pau-gold font-bold mr-3">●</span>
                    <p className="text-gray-600 leading-relaxed font-light">
                      <strong>Priority:</strong> Work completed in ASP is supplementary and does not replace regular coursework or exam preparation.
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed font-light mb-6">
                  Professors may refer students to ASP based on midterm performance, even before formal Academic Probation status is assigned.
                </p>

                <p className="text-gray-600 leading-relaxed font-light mb-6">
                  Successful completion of ASP, and potential removal from Academic Probation, is determined by: 1) Overall course grades; 2) Test performance, 3) In-class assignment results, 4) Completion of ASP-specific assignments, 5) Feedback from professors and other faculty, and 6) Review and analysis by ASP administrators.
                </p>

                <p className="text-gray-600 leading-relaxed font-light">
                  Students may be required to participate in ASP multiple times during their academic journey at PAUSL.
                </p>
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
