
import React from 'react';
import { CentersContent, Clinic, SharedContent } from '../types';
import { ScaleIcon, BeakerIcon, GlobeAltIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface CentersProps {
  content: CentersContent;
  onClinicClick: (clinic: Clinic) => void;
  shared: SharedContent;
}

export const Centers: React.FC<CentersProps> = ({ content, onClinicClick, shared }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-pau-darkBlue pt-44 pb-24 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
             alt="Office background" 
             className="w-full h-full object-cover opacity-10"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-pau-darkBlue/90 to-pau-darkBlue" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl font-serif font-bold text-white sm:text-6xl mb-6">{content.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {content.clinics.map((clinic, idx) => (
            <div 
              key={clinic.id} 
              className="flex flex-col bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              onClick={() => onClinicClick(clinic)}
            >
               <div className="h-2 bg-gradient-to-r from-pau-blue to-pau-gold"></div>
               <div className="p-10 flex flex-col flex-grow">
                 <div className="mb-8">
                    <div className="w-16 h-16 bg-pau-light rounded-2xl flex items-center justify-center text-pau-blue group-hover:bg-pau-blue group-hover:text-white transition-colors duration-300 shadow-sm">
                       {idx === 0 ? <BeakerIcon className="h-8 w-8" /> : 
                        idx === 1 ? <GlobeAltIcon className="h-8 w-8" /> : 
                        <ScaleIcon className="h-8 w-8" />}
                    </div>
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-pau-blue transition-colors">{clinic.title}</h2>
                 <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                   {clinic.description}
                 </p>
                 <div 
                   className="inline-flex items-center text-sm font-bold text-pau-gold uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                 >
                   {shared.buttons.exploreCenter} <ArrowRightIcon className="ml-2 h-4 w-4" />
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};