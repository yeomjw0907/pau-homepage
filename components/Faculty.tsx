
import React from 'react';
import { FacultyContent, SharedContent } from '../types';

interface FacultyProps {
  content: FacultyContent;
  shared: SharedContent;
}

export const Faculty: React.FC<FacultyProps> = ({ content, shared }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-pau-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-pau-blue text-center">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-600 text-center max-w-3xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {content.facultyList.map((prof, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="md:w-64 bg-gray-200 flex-shrink-0 min-h-[250px] relative">
                 {/* Placeholder for professor image */}
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                 </div>
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                  <h2 className="text-2xl font-bold text-pau-blue">{prof.name}</h2>
                  <span className="text-pau-gold font-serif italic">{prof.title}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{prof.education}</p>
                <p className="text-gray-700 leading-relaxed">{prof.bio}</p>
                
                <div className="mt-6">
                  <button className="text-sm font-semibold text-pau-blue hover:text-pau-gold transition-colors uppercase tracking-wide">
                    {shared.buttons.viewPublications} &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
