
import React, { useState } from 'react';
import { AdmissionsContent, SharedContent } from '../types';
import { CalendarDaysIcon, CurrencyDollarIcon, CheckCircleIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface AdmissionsProps {
  content: AdmissionsContent;
  shared: SharedContent;
}

export const Admissions: React.FC<AdmissionsProps> = ({ content, shared }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    lsacId: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Redirecting to LSAC Gateway for candidate L${formData.lsacId}...\n\n(This is a simulation)`);
    setIsModalOpen(false);
    setFormData({ firstName: '', lastName: '', lsacId: '', email: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-pau-darkBlue pt-36 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Students walking" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-pau-darkBlue/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl mb-6 shadow-sm">
            {content.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {content.intro}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Requirements */}
            <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-serif font-bold text-pau-blue mb-8 flex items-center">
                <span className="w-8 h-1 bg-pau-gold mr-4"></span>
                {content.requirementsTitle}
              </h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <ul className="space-y-6">
                  {content.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                        <CheckCircleIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-gray-700 text-lg pt-0.5">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Tuition */}
            <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden bg-pau-blue rounded-xl p-10 text-white shadow-lg">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                   <CurrencyDollarIcon className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-serif font-bold mb-6">{content.tuitionTitle}</h2>
                  <p className="text-blue-100 mb-8 leading-relaxed text-lg max-w-2xl">
                    {content.tuitionInfo}
                  </p>
                  <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                    <span className="text-4xl font-bold text-white block mb-1">{content.tuitionCost}</span>
                    <span className="text-sm font-medium text-pau-gold uppercase tracking-wider">Per Academic Year</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Dates */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-xl p-8 sticky top-28 shadow-lg border-t-4 border-pau-gold animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center mb-8">
                  <CalendarDaysIcon className="h-6 w-6 text-pau-gold mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 font-serif">{content.deadlinesTitle}</h3>
                </div>
                
                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                  {content.deadlines.map((deadline, idx) => (
                    <div key={idx} className="relative pl-10 group">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-gray-200 group-hover:border-pau-gold group-hover:scale-110 transition-all z-10"></div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{deadline.term}</p>
                      <p className="text-xl font-bold text-pau-blue mb-1">{deadline.date}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-pau-blue">
                        {deadline.type}
                      </span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-10 bg-pau-gold text-white font-bold py-4 px-4 rounded shadow-md hover:bg-white hover:text-pau-gold border border-transparent hover:border-pau-gold transition-all duration-300 flex justify-center items-center group"
                >
                  {shared.buttons.applyLsac}
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

        </div>
      </div>

      {/* LSAC Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="lsac-modal" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-pau-blue px-4 py-6 sm:px-6">
                 <div className="flex justify-between items-center text-white">
                    <h3 className="text-lg font-bold">LSAC CAS Gateway</h3>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                 </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-8">
                  <p className="text-sm text-gray-500 mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    Enter your credentials to begin the PAU Law application via LSAC.
                  </p>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">First Name</label>
                        <input 
                          type="text" name="firstName" required
                          value={formData.firstName} onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Last Name</label>
                        <input 
                          type="text" name="lastName" required
                          value={formData.lastName} onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">LSAC Account Number</label>
                      <input 
                        type="text" name="lsacId" placeholder="L12345678" required
                        value={formData.lsacId} onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email Address</label>
                      <input 
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse border-t border-gray-100">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-pau-blue text-base font-medium text-white hover:bg-pau-darkBlue sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                    Proceed to LSAC
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
