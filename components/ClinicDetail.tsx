
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
    // Handle checkbox specifically
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of form submission
    alert(`Application submitted for ${formData.name}!\n\nThe Clinic Director will review your statement and contact you at ${formData.email}.`);
    setIsModalOpen(false);
    // Reset form
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
      <div className="bg-pau-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-pau-blue transition-colors mb-6 group"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">{shared.buttons.backToCenters}</span>
          </button>
          
          <div className="flex items-center">
            <BuildingLibraryIcon className="h-12 w-12 text-pau-gold mr-6 hidden sm:block" />
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-pau-blue">{clinic.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xl text-gray-600 mb-10 font-light leading-relaxed border-l-4 border-pau-gold pl-6">
          {clinic.description}
        </p>

        <div className="prose prose-lg prose-blue text-gray-800 whitespace-pre-wrap">
          {clinic.body}
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{shared.labels.interestedInClinic}</h3>
          <p className="text-gray-600 mb-6">
            {shared.labels.clinicPositions}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-pau-blue text-white px-6 py-3 rounded font-medium hover:bg-blue-800 transition-colors shadow-sm"
          >
            {shared.buttons.contactDirector}
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background backdrop */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            ></div>

            {/* Modal positioning trick */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal Panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                        {shared.labels.clinicInquiryForm}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {shared.labels.sendMessageTo} {clinic.title}.
                      </p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">{shared.labels.fullName}</label>
                      <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-2 border" 
                        placeholder="Jane Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">{shared.labels.pauEmail}</label>
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-2 border" 
                        placeholder="jdoe@pau.edu"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Student ID */}
                      <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">{shared.labels.studentId}</label>
                        <input 
                          type="text" 
                          name="studentId" 
                          id="studentId" 
                          required
                          value={formData.studentId}
                          onChange={handleChange}
                          className="mt-1 block w-full bg-white text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-2 border" 
                          placeholder="900xxxxxx"
                        />
                      </div>
                      
                      {/* Year */}
                      <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">{shared.labels.academicYear}</label>
                        <select 
                          id="year" 
                          name="year" 
                          value={formData.year}
                          onChange={handleChange}
                          className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-2"
                        >
                          <option value="2L">2L</option>
                          <option value="3L">3L</option>
                          <option value="LLM">LL.M.</option>
                        </select>
                      </div>
                    </div>

                    {/* Prerequisite Checkbox */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="hasPrerequisites"
                          name="hasPrerequisites"
                          type="checkbox"
                          checked={formData.hasPrerequisites}
                          onChange={handleChange}
                          className="focus:ring-pau-blue h-4 w-4 text-pau-blue border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="hasPrerequisites" className="font-medium text-gray-700">{shared.labels.prerequisitesMet}</label>
                        <p className="text-gray-500">{shared.labels.prereqDetail}</p>
                      </div>
                    </div>

                    {/* Statement */}
                    <div>
                      <label htmlFor="statement" className="block text-sm font-medium text-gray-700">{shared.labels.statementInterest}</label>
                      <textarea 
                        id="statement" 
                        name="statement" 
                        rows={3} 
                        required
                        value={formData.statement}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue sm:text-sm p-2" 
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button 
                    type="submit" 
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pau-blue text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pau-blue sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {shared.buttons.submitInquiry}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
