
import React from 'react';
import { CareersContent } from '../types';
import { BriefcaseIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface CareersProps {
  content: CareersContent;
}

export const Careers: React.FC<CareersProps> = ({ content }) => {
  return (
    <div className="bg-white min-h-screen">
       <div className="bg-gray-50 py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-pau-blue">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="text-4xl font-bold text-pau-gold mb-2">{stat.value}</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center">
              <BriefcaseIcon className="h-6 w-6 mr-2 text-pau-blue" />
              Our Services
            </h2>
            <div className="space-y-6">
              {content.services.map((service, idx) => (
                <div key={idx} className="border-l-4 border-pau-gold pl-4">
                  <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-pau-blue rounded-xl p-8 text-white">
            <h2 className="text-2xl font-serif font-bold mb-6">Employer Recruitment</h2>
            <p className="text-gray-200 mb-6">
              PAU Law students are trained to be practice-ready from day one. We invite legal employers to participate in our Fall and Spring On-Campus Interview (OCI) programs.
            </p>
            <ul className="space-y-3 mb-8 text-gray-300 text-sm">
              <li>• Early Interview Week (August)</li>
              <li>• Spring OCI (February)</li>
              <li>• Resume Collection Service</li>
            </ul>
            <button className="w-full bg-white text-pau-blue font-bold py-3 rounded hover:bg-gray-100 transition">
              Register for OCI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
