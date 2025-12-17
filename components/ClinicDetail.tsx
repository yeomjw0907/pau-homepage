
import React, { useState } from 'react';
import { Clinic, SharedContent } from '../types';
import { ArrowLeftIcon, BuildingLibraryIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ClinicDetailProps {
  clinic: Clinic;
  onBack: () => void;
  shared: SharedContent;
}

export const ClinicDetail: React.FC<ClinicDetailProps> = ({ clinic, onBack, shared }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    year: '2L',
    hasPrerequisites: false,
    statement: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted for ${formData.name}!\n\nThe Clinic Director will review your statement and contact you at ${formData.email}.`);
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      studentId: '',
      year: '2L',
      hasPrerequisites: false,
      statement: ''
    });
  };

  return (
    <div className="bg-white min-h-screen relative">
      {/* Header */}
      <div className="bg-pau-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-16">
           <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-pau-blue transition-colors mb-8 group font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wide">{shared.buttons.backToCenters}</span>
          </button>
          
          <div className="flex items-start md:items-center animate-fade-in-up">
            <div className="p-4 bg-white rounded-xl shadow-sm mr-6 hidden md:block">
               <BuildingLibraryIcon className="h-10 w-10 text-pau-gold" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-pau-blue leading-tight">{clinic.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
           <p className="text-2xl text-gray-700 mb-12 font-light leading-relaxed border-l-4 border-pau-gold pl-8 py-2 italic">
             {clinic.description}
           </p>

           <div className="prose prose-lg prose-blue text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
             {clinic.body}
           </div>
        </div>

        <div className="mt-20 bg-gradient-to-br from-pau-blue to-pau-darkBlue p-10 rounded-2xl shadow-xl text-center text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-serif font-bold mb-4">{shared.labels.interestedInClinic}</h3>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            {shared.labels.clinicPositions}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-pau-gold text-white px-8 py-4 rounded font-bold hover:bg-white hover:text-pau-blue transition-all duration-300 shadow-md transform hover:-translate-y-1"
          >
            {shared.buttons.contactDirector}
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-pau-blue px-6 py-4 flex justify-between items-center">
                 <h3 className="text-lg font-bold text-white">
                    {shared.labels.clinicInquiryForm}
                 </h3>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                    <XMarkIcon className="h-6 w-6" />
                 </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="px-6 py-6">
                  <p className="text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100">
                     {shared.labels.sendMessageTo} <strong>{clinic.title}</strong>.
                  </p>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{shared.labels.fullName}</label>
                      <input 
                        type="text" name="name" id="name" required
                        value={formData.name} onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                        placeholder="Jane Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{shared.labels.pauEmail}</label>
                      <input 
                        type="email" name="email" id="email" required
                        value={formData.email} onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                        placeholder="jdoe@pau.edu"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Student ID */}
                      <div>
                        <label htmlFor="studentId" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{shared.labels.studentId}</label>
                        <input 
                          type="text" name="studentId" id="studentId" required
                          value={formData.studentId} onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                        />
                      </div>
                      
                      {/* Year */}
                      <div>
                        <label htmlFor="year" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{shared.labels.academicYear}</label>
                        <select 
                          id="year" name="year" 
                          value={formData.year} onChange={handleChange}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50"
                        >
                          <option value="2L">2L</option>
                          <option value="3L">3L</option>
                          <option value="LLM">LL.M.</option>
                        </select>
                      </div>
                    </div>

                    {/* Prerequisite Checkbox */}
                    <div className="flex items-start bg-blue-50 p-3 rounded-md border border-blue-100">
                      <div className="flex items-center h-5">
                        <input
                          id="hasPrerequisites" name="hasPrerequisites" type="checkbox"
                          checked={formData.hasPrerequisites} onChange={handleChange}
                          className="focus:ring-pau-blue h-4 w-4 text-pau-blue border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="hasPrerequisites" className="font-medium text-pau-blue">{shared.labels.prerequisitesMet}</label>
                        <p className="text-gray-500 text-xs mt-0.5">{shared.labels.prereqDetail}</p>
                      </div>
                    </div>

                    {/* Statement */}
                    <div>
                      <label htmlFor="statement" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{shared.labels.statementInterest}</label>
                      <textarea 
                        id="statement" name="statement" rows={4} required
                        value={formData.statement} onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-3 bg-gray-50" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse border-t border-gray-100">
                  <button 
                    type="submit" 
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pau-blue text-base font-medium text-white hover:bg-pau-darkBlue focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                  >
                    {shared.buttons.submitInquiry}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                  >
                    {shared.buttons.cancel}
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