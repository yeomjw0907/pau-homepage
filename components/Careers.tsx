
import React, { useState } from 'react';
import { CareersContent } from '../types';
import { BriefcaseIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface CareersProps {
  content: CareersContent;
}

export const Careers: React.FC<CareersProps> = ({ content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("OCI Registration Submitted! Our Employer Relations team will contact you within 2 business days to schedule your interview dates.");
    setIsModalOpen(false);
  };

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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white text-pau-blue font-bold py-3 rounded hover:bg-gray-100 transition shadow-md"
            >
              Register for OCI
            </button>
          </div>
        </div>
      </div>

      {/* OCI Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Employer OCI Registration</h3>
                      <p className="text-sm text-gray-500 mt-1">Register your firm for the upcoming recruitment season.</p>
                    </div>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Firm / Organization Name</label>
                      <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900" placeholder="e.g. Pearson Hardman LLP" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                        <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Participation Type</label>
                      <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900">
                        <option>Early Interview Week (August)</option>
                        <option>Spring OCI (February)</option>
                        <option>Resume Collection Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Interview Format Preference</label>
                       <div className="mt-2 space-x-4">
                          <label className="inline-flex items-center">
                            <input type="radio" name="format" className="text-pau-blue focus:ring-pau-blue bg-white" defaultChecked />
                            <span className="ml-2 text-gray-700 text-sm">On-Campus</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input type="radio" name="format" className="text-pau-blue focus:ring-pau-blue bg-white" />
                            <span className="ml-2 text-gray-700 text-sm">Virtual</span>
                          </label>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pau-blue text-base font-medium text-white hover:bg-blue-800 sm:ml-3 sm:w-auto sm:text-sm">
                    Submit Registration
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
