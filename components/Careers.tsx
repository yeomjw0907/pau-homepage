
import React, { useState } from 'react';
import { CareersContent } from '../types';
import { BriefcaseIcon, XMarkIcon, BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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
       {/* Hero */}
       <div className="bg-pau-darkBlue py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
           <h1 className="text-4xl font-serif font-bold text-white sm:text-5xl">{content.title}</h1>
           <p className="mt-6 text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="text-5xl font-extrabold text-pau-gold mb-3 group-hover:scale-105 transition-transform duration-300">{stat.value}</div>
              <div className="h-1 w-12 bg-gray-100 mx-auto mb-4 rounded-full"></div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center mb-8">
               <div className="p-3 bg-pau-light rounded-lg text-pau-blue mr-4">
                 <BriefcaseIcon className="h-8 w-8" />
               </div>
               <h2 className="text-3xl font-serif font-bold text-gray-900">Student Services</h2>
            </div>
            
            <div className="space-y-8">
              {content.services.map((service, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-lg border-l-4 border-pau-gold shadow-sm">
                  <h3 className="text-xl font-bold text-pau-blue mb-2">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-pau-gold shadow-sm">
                  <h3 className="text-xl font-bold text-pau-blue mb-2">Alumni Network Access</h3>
                  <p className="text-gray-600 leading-relaxed">Connect with our vast network of alumni practicing in top firms, government agencies, and non-profits worldwide.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pau-blue to-pau-darkBlue rounded-2xl p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <BuildingOfficeIcon className="h-40 w-40" />
            </div>
            <div className="relative z-10">
               <h2 className="text-3xl font-serif font-bold mb-6 flex items-center">
                 Employer Recruitment
               </h2>
               <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                 PAU Law students are trained to be practice-ready from day one. We invite legal employers to participate in our Fall and Spring On-Campus Interview (OCI) programs.
               </p>
               
               <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20 mb-8">
                 <h4 className="font-bold text-pau-gold uppercase tracking-wider text-sm mb-4">Recruitment Calendar</h4>
                 <ul className="space-y-3 text-sm text-gray-200">
                   <li className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3"></span>Early Interview Week (August)</li>
                   <li className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3"></span>Spring OCI (February)</li>
                   <li className="flex items-center"><span className="w-2 h-2 bg-white rounded-full mr-3"></span>Resume Collection Service</li>
                 </ul>
               </div>

               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="w-full bg-white text-pau-blue font-bold py-4 rounded-lg hover:bg-pau-gold hover:text-white transition-all duration-300 shadow-md flex justify-center items-center"
               >
                 <UserGroupIcon className="h-5 w-5 mr-2" />
                 Register for OCI
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* OCI Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
               <div className="bg-pau-blue px-6 py-4 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-white">Employer OCI Registration</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                   <XMarkIcon className="h-6 w-6" />
                 </button>
               </div>
              
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Firm / Organization Name</label>
                      <input type="text" required className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm" placeholder="e.g. Pearson Hardman LLP" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Contact Person</label>
                        <input type="text" required className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email Address</label>
                        <input type="email" required className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Participation Type</label>
                      <select className="block w-full border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-gray-900 focus:ring-pau-blue focus:border-pau-blue sm:text-sm">
                        <option>Early Interview Week (August)</option>
                        <option>Spring OCI (February)</option>
                        <option>Resume Collection Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Interview Format Preference</label>
                       <div className="flex space-x-6">
                          <label className="inline-flex items-center group cursor-pointer">
                            <input type="radio" name="format" className="text-pau-blue focus:ring-pau-blue bg-white border-gray-300" defaultChecked />
                            <span className="ml-2 text-gray-700 text-sm group-hover:text-pau-blue transition-colors">On-Campus</span>
                          </label>
                          <label className="inline-flex items-center group cursor-pointer">
                            <input type="radio" name="format" className="text-pau-blue focus:ring-pau-blue bg-white border-gray-300" />
                            <span className="ml-2 text-gray-700 text-sm group-hover:text-pau-blue transition-colors">Virtual</span>
                          </label>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse border-t border-gray-100">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-pau-blue text-base font-medium text-white hover:bg-pau-darkBlue sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Submit Registration
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
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
