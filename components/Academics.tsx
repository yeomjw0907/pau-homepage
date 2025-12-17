
import React from 'react';
import { AcademicsContent } from '../types';
import { BookOpenIcon, GlobeAmericasIcon, ScaleIcon } from '@heroicons/react/24/outline';

interface AcademicsProps {
  content: AcademicsContent;
}

export const Academics: React.FC<AcademicsProps> = ({ content }) => {
  return (
    <div className="bg-white min-h-screen">
       {/* Hero */}
       <div className="relative bg-pau-darkBlue pt-44 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544928147-79a2e746b531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Law Library"
            className="w-full h-full object-cover opacity-40"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-pau-darkBlue/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl font-serif font-bold text-white sm:text-6xl mb-6">{content.title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Programs Grid */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-pau-blue inline-block relative">
              {content.programsTitle}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-pau-gold"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {content.programs.map((prog, idx) => (
              <div key={idx} className="group relative bg-white p-10 rounded-xl shadow-soft border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pau-blue to-pau-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-14 h-14 bg-pau-light rounded-lg flex items-center justify-center text-pau-blue mb-6 group-hover:bg-pau-blue group-hover:text-white transition-colors duration-300">
                   {idx === 0 ? <ScaleIcon className="h-8 w-8" /> : <GlobeAmericasIcon className="h-8 w-8" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors">{prog.name}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{prog.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Concentrations */}
        <div className="bg-pau-light rounded-3xl p-10 sm:p-16">
          <h2 className="text-3xl font-serif font-bold text-pau-blue mb-10 text-center">{content.concentrationsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.concentrations.map((conc, idx) => (
              <div key={idx} className="flex items-center p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-pau-gold hover:shadow-md transition-all duration-300 group cursor-default">
                <div className="flex-shrink-0 mr-4">
                  <BookOpenIcon className="h-6 w-6 text-gray-400 group-hover:text-pau-gold transition-colors" />
                </div>
                <span className="text-lg font-medium text-gray-800 group-hover:text-pau-blue transition-colors">{conc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};