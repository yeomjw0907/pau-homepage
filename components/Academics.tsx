import React from 'react';
import { AcademicsContent } from '../types';

interface AcademicsProps {
  content: AcademicsContent;
}

export const Academics: React.FC<AcademicsProps> = ({ content }) => {
  return (
    <div className="bg-white">
       {/* Hero */}
       <div className="relative bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544928147-79a2e746b531?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Law Library"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-extrabold text-white sm:text-5xl">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Programs Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-pau-blue mb-10 text-center">{content.programsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.programs.map((prog, idx) => (
              <div key={idx} className="bg-pau-light p-8 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{prog.name}</h3>
                <p className="text-gray-700 leading-relaxed">{prog.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Concentrations */}
        <div className="bg-white border-t border-gray-100 pt-16">
          <h2 className="text-3xl font-serif font-bold text-pau-blue mb-8">{content.concentrationsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.concentrations.map((conc, idx) => (
              <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-md border border-gray-100">
                <div className="h-2 w-2 bg-pau-gold rounded-full mr-3"></div>
                <span className="text-lg font-medium text-gray-800">{conc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
