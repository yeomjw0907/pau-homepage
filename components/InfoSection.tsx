
import React from 'react';
import { HomeContent, Clinic, SharedContent } from '../types';
import { AcademicCapIcon, BriefcaseIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ content, shared, onClinicClick }) => {
  return (
    <div className="bg-white relative">
      {/* Decorative Top Border */}
      <div className="h-2 w-full bg-gradient-to-r from-pau-blue via-pau-gold to-pau-blue"></div>

      {/* About Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="lg:text-center mb-24">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-pau-blue text-xs font-bold tracking-widest uppercase mb-6">
            <SparklesIcon className="h-4 w-4 mr-2 text-pau-gold" />
            {content.aboutEyebrow}
          </span>
          <h2 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl font-serif">
            {content.aboutTitle}
          </h2>
          <p className="mt-6 max-w-3xl text-lg text-gray-600 lg:mx-auto leading-relaxed">
            {content.aboutText}
          </p>
        </div>

        {/* Dean's Message & Stats Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-32">
          
          {/* Dean's Message (Left 7/12) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative h-full bg-gradient-to-br from-pau-blue to-pau-darkBlue rounded-2xl p-10 md:p-14 shadow-2xl text-white overflow-hidden group border border-white/10">
              {/* Background decorative elements - Giant Quote Mark */}
              <div className="absolute top-0 right-8 text-pau-gold opacity-10 font-serif text-[12rem] leading-none select-none pointer-events-none transform translate-y-4">
                &rdquo;
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <div className="flex items-center space-x-3 mb-8">
                     <div className="h-[1px] w-8 bg-pau-gold"></div>
                     <h3 className="text-pau-gold font-bold tracking-widest uppercase text-sm">
                       Dean's Message
                     </h3>
                   </div>
                   
                   <h4 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-white leading-tight">
                     {content.deansMessageTitle}
                   </h4>
                   
                   {/* Improved Typography: Sans-serif, normal weight, white for clarity */}
                   <p className="text-lg md:text-xl text-white font-sans font-light leading-relaxed">
                     "{content.deansMessage}"
                   </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex items-center">
                   {/* Avatar / Initials */}
                   <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-pau-blue font-serif font-bold text-xl mr-5 shadow-lg">
                     ER
                   </div>
                   <div>
                     <p className="font-bold text-white text-lg font-serif">Elena Rodriguez</p>
                     <p className="text-sm text-pau-gold font-medium tracking-wide">Dean, School of Law</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid (Right 5/12) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            {content.stats && content.stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border-l-4 border-pau-gold shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center">
                <span className="text-5xl font-sans font-black text-gray-900 mb-2">{stat.value}</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clinics & Centers */}
        <div className="pt-10 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-pau-blue">{content.clinicsTitle}</h2>
              <p className="mt-3 text-lg text-gray-500">{content.clinicsIntro}</p>
            </div>
            <button className="hidden md:inline-flex items-center text-pau-gold font-bold uppercase text-sm tracking-widest hover:text-pau-blue transition-colors">
              View All Centers &rarr;
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.clinics && content.clinics.map((clinic, idx) => (
              <div 
                key={clinic.id || idx} 
                onClick={() => onClinicClick(clinic)}
                className="group relative bg-white rounded-lg p-8 shadow-soft border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer overflow-hidden"
              >
                {/* Hover Accent Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-pau-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="w-12 h-12 bg-pau-light rounded-lg flex items-center justify-center text-pau-blue mb-6 group-hover:bg-pau-blue group-hover:text-white transition-colors">
                    {idx === 0 ? <AcademicCapIcon className="h-6 w-6" /> : 
                     idx === 1 ? <UserGroupIcon className="h-6 w-6" /> : 
                     <BriefcaseIcon className="h-6 w-6" />}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pau-blue transition-colors">
                  {clinic.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {clinic.description}
                </p>
                
                <span className="inline-flex items-center text-sm font-bold text-pau-blue group-hover:underline decoration-pau-gold underline-offset-4">
                  {shared.buttons.learnMore}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
