
import React from 'react';
import { HomeContent, Clinic, SharedContent } from '../types';
import { AcademicCapIcon, BriefcaseIcon, UserGroupIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ content, shared, onClinicClick }) => {
  return (
    <div className="bg-pau-warm relative">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      {/* Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-pau-blue via-pau-gold to-pau-blue"></div>

      {/* About Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="lg:text-center mb-24 animate-fade-in">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-pau-blue text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <SparklesIcon className="h-4 w-4 mr-2 text-pau-gold" />
            {content.aboutEyebrow}
          </span>
          <h2 className="text-4xl leading-tight font-bold text-pau-darkBlue sm:text-5xl font-serif mb-6">
            {content.aboutTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-gray-600 lg:mx-auto leading-relaxed font-light">
            {content.aboutText}
          </p>
        </div>

        {/* Dean's Message & Stats Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-32">
          
          {/* Dean's Message (Left 7/12) */}
          <div className="lg:col-span-7 flex flex-col group">
            <div className="relative h-full bg-pau-blue rounded-3xl p-10 md:p-14 shadow-card text-white overflow-hidden border border-white/10 transition-transform duration-500 hover:scale-[1.01]">
              {/* Texture Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                   <div className="flex items-center space-x-4 mb-8">
                     <div className="h-[2px] w-12 bg-pau-gold"></div>
                     <h3 className="text-pau-gold font-bold tracking-widest uppercase text-sm">
                       Dean's Message
                     </h3>
                   </div>
                   
                   <h4 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-white leading-tight">
                     {content.deansMessageTitle}
                   </h4>
                   
                   <p className="text-lg md:text-xl text-gray-100 font-sans font-light leading-relaxed opacity-90">
                     "{content.deansMessage}"
                   </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex items-center">
                   <div className="h-16 w-16 rounded-full bg-pau-goldLight flex items-center justify-center text-pau-darkBlue font-serif font-bold text-2xl mr-5 shadow-lg ring-4 ring-white/10">
                     ER
                   </div>
                   <div>
                     <p className="font-bold text-white text-lg font-serif tracking-wide">Elena Rodriguez</p>
                     <p className="text-sm text-pau-gold font-medium tracking-widest uppercase">Dean, School of Law</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid (Right 5/12) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {content.stats && content.stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-card hover:border-pau-gold/30 transition-all duration-300 flex flex-col justify-center group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 transform group-hover:scale-110 transition-transform">
                   {/* Placeholder Icon based on index logic or random */}
                   <div className="h-16 w-16 bg-pau-blue rounded-full"></div>
                </div>
                <span className="text-5xl font-sans font-black text-pau-darkBlue mb-2 tracking-tight group-hover:text-pau-blue transition-colors">{stat.value}</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clinics & Centers */}
        <div className="pt-16 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-pau-darkBlue mb-4">{content.clinicsTitle}</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed">{content.clinicsIntro}</p>
            </div>
            <button className="hidden md:inline-flex items-center text-pau-blue font-bold uppercase text-xs tracking-widest hover:text-pau-gold transition-colors border-b-2 border-transparent hover:border-pau-gold pb-1 mt-6 md:mt-0">
              View All Centers <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.clinics && content.clinics.map((clinic, idx) => (
              <div 
                key={clinic.id || idx} 
                onClick={() => onClinicClick(clinic)}
                className="group relative bg-white rounded-xl p-8 shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-card cursor-pointer overflow-hidden flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-pau-light rounded-2xl flex items-center justify-center text-pau-blue mb-8 group-hover:bg-pau-blue group-hover:text-white transition-colors duration-300 shadow-inner">
                    {idx === 0 ? <AcademicCapIcon className="h-7 w-7" /> : 
                     idx === 1 ? <UserGroupIcon className="h-7 w-7" /> : 
                     <BriefcaseIcon className="h-7 w-7" />}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors font-serif">
                  {clinic.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {clinic.description}
                </p>
                
                <div className="flex items-center text-sm font-bold text-pau-blue group-hover:translate-x-2 transition-transform duration-300">
                  {shared.buttons.learnMore}
                  <ArrowRightIcon className="ml-2 h-4 w-4 text-pau-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
