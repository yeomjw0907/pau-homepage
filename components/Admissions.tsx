
import React, { useState } from 'react';
import { AdmissionsContent, SharedContent } from '../types';
import { CalendarDaysIcon, CurrencyDollarIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

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
    // Simulate LSAC redirection/submission
    alert(`Redirecting to LSAC Gateway for candidate L${formData.lsacId}...\n\n(This is a simulation)`);
    setIsModalOpen(false);
    setFormData({ firstName: '', lastName: '', lsacId: '', email: '' });
  };

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
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-8 bg-pau-gold text-white font-bold py-3 px-4 rounded hover:bg-yellow-600 transition-colors shadow-sm"
                >
                  {shared.buttons.applyLsac}
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
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-pau-blue">LSAC CAS Gateway</h3>
                      <p className="text-sm text-gray-500 mt-1">Enter your credentials to begin the PAU Law application via LSAC.</p>
                    </div>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input 
                          type="text" name="firstName" required
                          value={formData.firstName} onChange={handleChange}
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input 
                          type="text" name="lastName" required
                          value={formData.lastName} onChange={handleChange}
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">LSAC Account Number (L-Number)</label>
                      <input 
                        type="text" name="lsacId" placeholder="L12345678" required
                        value={formData.lsacId} onChange={handleChange}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 text-gray-900" 
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pau-blue text-base font-medium text-white hover:bg-blue-800 sm:ml-3 sm:w-auto sm:text-sm">
                    Proceed to LSAC
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
