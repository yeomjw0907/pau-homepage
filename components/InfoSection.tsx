
import React from 'react';
import { HomeContent, Clinic, SharedContent } from '../types';
import { AcademicCapIcon, BriefcaseIcon, ScaleIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ content, shared, onClinicClick }) => {
  return (
    <div className="bg-white relative">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-50 to-white z-0" />

      {/* About Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="lg:text-center mb-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-pau-blue text-xs font-bold tracking-wide uppercase mb-4">
            <SparklesIcon className="h-4 w-4 mr-1 text-pau-gold" />
            {content.aboutEyebrow}
          </span>
          <h2 className="text-4xl leading-10 font-extrabold tracking-tight text-pau-blue sm:text-5xl font-serif">
            {content.aboutTitle}
          </h2>
          <p className="mt-6 max-w-3xl text-xl text-gray-500 lg:mx-auto leading-relaxed">
            {content.aboutText}
          </p>
        </div>

        {/* Dean's Message / Student Success & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Quote Style Dean's Message */}
          <div className="relative p-10 bg-pau-blue rounded-2xl shadow-xl text-white overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-pau-gold opacity-20">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21L14.017 18C14.017 16.096 14.713 15.013 16.104 14.752C16.924 14.597 17.65 13.974 17.65 12.923C17.65 11.872 17.151 11.393 16.035 11.393C15.111 11.393 14.07 10.963 14.07 9.471C14.07 7.979 15.345 6.438 17.227 6.438C19.109 6.438 20.384 7.979 20.384 9.471C20.384 10.963 19.343 11.393 19.343 12.923C19.343 14.453 20.069 15.076 20.889 15.231C22.28 15.492 22.976 16.575 22.976 18.479L22.976 21L14.017 21ZM5.017 21L5.017 18C5.017 16.096 5.713 15.013 7.104 14.752C7.924 14.597 8.65 13.974 8.65 12.923C8.65 11.872 8.151 11.393 7.035 11.393C6.111 11.393 5.07 10.963 5.07 9.471C5.07 7.979 6.345 6.438 8.227 6.438C10.109 6.438 11.384 7.979 11.384 9.471C11.384 10.963 10.343 11.393 10.343 12.923C10.343 14.453 11.069 15.076 11.889 15.231C13.28 15.492 13.976 16.575 13.976 18.479L13.976 21L5.017 21Z" />
              </svg>
            </div>
            <h3 className="relative text-2xl font-serif font-bold mb-6 border-b border-white/20 pb-4">{content.deansMessageTitle}</h3>
            <p className="relative text-gray-100 leading-relaxed text-lg italic font-light">"{content.deansMessage}"</p>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {content.stats && content.stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-lg transition-all duration-300 group">
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pau-blue to-pau-gold mb-2 group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
                <div className="h-1 w-12 bg-gray-200 mb-3 rounded-full"></div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clinics & Centers */}
        <div className="border-t border-gray-100 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">{content.clinicsTitle}</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{content.clinicsIntro}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.clinics && content.clinics.map((clinic, idx) => (
              <div 
                key={clinic.id || idx} 
                onClick={() => onClinicClick(clinic)}
                className="group flex flex-col bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <div className="h-2 bg-gradient-to-r from-pau-blue to-pau-gold w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 text-pau-blue mb-6 group-hover:bg-pau-blue group-hover:text-white transition-colors duration-300">
                    {idx === 0 ? <AcademicCapIcon className="h-7 w-7" /> : 
                     idx === 1 ? <UserGroupIcon className="h-7 w-7" /> : 
                     <BriefcaseIcon className="h-7 w-7" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pau-blue transition-colors">{clinic.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {clinic.description}
                  </p>
                  
                  <div className="flex items-center text-pau-gold font-bold text-sm uppercase tracking-wide mt-auto group-hover:translate-x-2 transition-transform">
                    {shared.buttons.learnMore} <span aria-hidden="true" className="ml-2">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
