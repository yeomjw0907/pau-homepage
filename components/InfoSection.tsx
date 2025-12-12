
import React from 'react';
import { HomeContent, Clinic, SharedContent } from '../types';
import { AcademicCapIcon, BriefcaseIcon, ScaleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ content, shared, onClinicClick }) => {
  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-pau-gold font-semibold tracking-wide uppercase">{content.aboutEyebrow}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-pau-blue sm:text-4xl font-serif">
            {content.aboutTitle}
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
            {content.aboutText}
          </p>
        </div>

        {/* Dean's Message / Student Success & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-pau-light p-8 rounded-xl shadow-sm border-l-4 border-pau-gold">
            <h3 className="text-2xl font-serif font-bold text-pau-blue mb-4">{content.deansMessageTitle}</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{content.deansMessage}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {content.stats && content.stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
                <p className="text-4xl font-bold text-pau-blue mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clinics & Centers */}
        <div className="border-t border-gray-100 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">{content.clinicsTitle}</h2>
            <p className="mt-4 text-gray-500">{content.clinicsIntro}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.clinics && content.clinics.map((clinic, idx) => (
              <div key={clinic.id || idx} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:-translate-y-1 transition-transform duration-300">
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-pau-blue text-white mb-4">
                    {idx === 0 ? <AcademicCapIcon className="h-6 w-6" /> : 
                     idx === 1 ? <UserGroupIcon className="h-6 w-6" /> : 
                     <BriefcaseIcon className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{clinic.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {clinic.description}
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <button 
                    onClick={() => onClinicClick(clinic)}
                    className="text-pau-blue font-medium text-sm hover:text-pau-gold transition-colors flex items-center"
                  >
                    {shared.buttons.learnMore} <span aria-hidden="true" className="ml-1">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
