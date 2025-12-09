
import React from 'react';
import { AdmissionsContent, SharedContent } from '../types';
import { CalendarDaysIcon, CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface AdmissionsProps {
  content: AdmissionsContent;
  shared: SharedContent;
}

export const Admissions: React.FC<AdmissionsProps> = ({ content, shared }) => {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="bg-pau-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-pau-blue mb-6 border-b border-gray-200 pb-2">
                {content.requirementsTitle}
              </h2>
              <ul className="space-y-4">
                {content.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-pau-gold flex-shrink-0 mr-3" />
                    <span className="text-gray-700 text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tuition */}
            <section className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-pau-blue mr-3" />
                <h2 className="text-2xl font-serif font-bold text-gray-900">{content.tuitionTitle}</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {content.tuitionInfo}
              </p>
              <div className="text-4xl font-bold text-pau-blue">
                {content.tuitionCost} <span className="text-base font-normal text-gray-500">/ academic year</span>
              </div>
            </section>
          </div>

          {/* Sidebar / Dates */}
          <div className="lg:col-span-1">
             <div className="bg-pau-light rounded-lg p-6 sticky top-28 shadow-sm">
                <div className="flex items-center mb-6">
                  <CalendarDaysIcon className="h-6 w-6 text-pau-blue mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">{content.deadlinesTitle}</h3>
                </div>
                <div className="space-y-6">
                  {content.deadlines.map((deadline, idx) => (
                    <div key={idx} className="border-l-2 border-pau-gold pl-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{deadline.term}</p>
                      <p className="text-lg font-bold text-pau-blue">{deadline.date}</p>
                      <p className="text-sm text-gray-600">{deadline.type}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 bg-pau-gold text-white font-bold py-3 px-4 rounded hover:bg-yellow-600 transition-colors shadow-sm">
                  {shared.buttons.applyLsac}
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
