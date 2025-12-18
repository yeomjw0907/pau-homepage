
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
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface AcademicsProps {
  content: AcademicsContent;
  onNavigate: (page: Page) => void;
}

export const Academics: React.FC<AcademicsProps> = ({ content, onNavigate }) => {
  const academicPortals = [
    {
      id: 'curriculum-schedule' as Page,
      title: "Curriculum",
      desc: "4-year JD roadmap and semester sequences.",
      icon: MapIcon,
      color: "text-pau-gold"
    },
    {
      id: 'bar-info' as Page,
      title: "Bar Info",
      desc: "California Bar & Baby Bar registration and requirements.",
      icon: CheckBadgeIcon,
      color: "text-blue-500"
    },
    {
      id: 'course-desc' as Page,
      title: "Course Descriptions",
      desc: "Detailed catalog of foundational and elective law courses.",
      icon: ListBulletIcon,
      color: "text-emerald-500"
    },
    {
      id: 'counseling' as Page,
      title: "Counseling",
      desc: "Academic advising, mentoring, and bar readiness support.",
      icon: ChatBubbleLeftEllipsisIcon,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
       {/* Hero Section */}
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
        
        {/* Academic Portal Grid - This replaces the empty feeling */}
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

        {/* Programs Detail Section */}
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
              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400 italic">
                  * Concentrations require a minimum of 12 elective units in the specified practice area.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
