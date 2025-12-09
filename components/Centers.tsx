
import React from 'react';
import { CentersContent, Clinic, SharedContent } from '../types';
import { ScaleIcon } from '@heroicons/react/24/outline';

interface CentersProps {
  content: CentersContent;
  onClinicClick: (clinic: Clinic) => void;
  shared: SharedContent;
}

export const Centers: React.FC<CentersProps> = ({ content, onClinicClick, shared }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {content.clinics.map((clinic, idx) => (
            <div key={clinic.id} className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
               <div className="p-8">
                 <div className="flex items-center mb-6">
                    <div className="p-3 bg-pau-light rounded-lg text-pau-blue mr-4">
                       <ScaleIcon className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">{clinic.title}</h2>
                 </div>
                 <p className="text-gray-600 leading-relaxed mb-6">
                   {clinic.description}
                 </p>
                 <button 
                   onClick={() => onClinicClick(clinic)}
                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pau-blue hover:bg-blue-800 transition-colors"
                 >
                   {shared.buttons.exploreCenter}
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
