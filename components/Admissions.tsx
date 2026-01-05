
import React, { useState, useEffect, useRef } from 'react';
import { AdmissionsContent, SharedContent } from '../types';
import { CalendarDaysIcon, CurrencyDollarIcon, CheckCircleIcon, XMarkIcon, ArrowRightIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useForm } from '../hooks/useForm';

interface AdmissionsProps {
  content: AdmissionsContent;
  shared: SharedContent;
}

export const Admissions: React.FC<AdmissionsProps> = ({ content, shared }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);
  
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cohort: 'winter' as 'winter' | 'spring' | 'fall'
  };
  
  const { formData, handleChange, reset } = useForm(initialFormData);

  const cohortInfo = {
    winter: { label: 'Winter Intake (January)', deadline: 'mid-November' },
    spring: { label: 'Spring Intake (April)', deadline: 'mid-February' },
    fall: { label: 'Fall Intake (September)', deadline: 'mid-July' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCohort = cohortInfo[formData.cohort];
    alert(`Application Started!\n\nName: ${formData.firstName} ${formData.lastName}\nSelected Intake: ${selectedCohort.label}\nDeadline: ${selectedCohort.deadline}\n\nYou will receive further instructions via email at ${formData.email}.`);
    setIsModalOpen(false);
    reset();
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-pau-darkBlue pt-44 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Students walking" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-pau-darkBlue/60 to-transparent" />
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
            
            {/* Admissions Standards */}
            <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-serif font-bold text-pau-blue mb-8 flex items-center">
                <span className="w-8 h-1 bg-pau-gold mr-4"></span>
                Admissions Standards
              </h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Applicants must demonstrate strong academic performance, typically reflected in their undergraduate GPA (minimum of 2.0). PAUSL employs a holistic admissions process that evaluates not only academic achievements but also personal qualities and the applicant's potential to contribute to the legal profession.
                </p>
              </div>
            </section>

            {/* LSAT Requirement */}
            <section className="animate-fade-in mt-12" style={{ animationDelay: '0.15s' }}>
              <h2 className="text-3xl font-serif font-bold text-pau-blue mb-8 flex items-center">
                <span className="w-8 h-1 bg-pau-gold mr-4"></span>
                LSAT Requirement
              </h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  PAUSL does not require applicants to submit scores from the Law School Admission Test (LSAT) but applicants are encouraged to take the LSAT because it is a reliable predictor of student performance in law school. The LSAT scores assist in demonstrating an applicant's capacity for successful law study and program completion.
                </p>
              </div>
            </section>

            {/* English Language Requirement */}
            <section className="animate-fade-in mt-12" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-serif font-bold text-pau-blue mb-8 flex items-center">
                <span className="w-8 h-1 bg-pau-gold mr-4"></span>
                English Language Requirement (International Applicants)
              </h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  International applicants who are non-native speaker of English must demonstrate English proficiency by one of the following:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                      <CheckCircleIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 text-lg pt-0.5">Completion of at least two years of study at a college or university where the language of instruction was English.</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                      <CheckCircleIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 text-lg pt-0.5">Submitting a passing score from the Test of English as a Foreign Language (TOEFL): At least 79 (internet-based test).</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                      <CheckCircleIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 text-lg pt-0.5">Submitting a passing score on the International English Language Testing System (IELTS): 6.0 or higher for the overall band.</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-pau-blue transition-colors duration-300">
                      <CheckCircleIcon className="h-5 w-5 text-pau-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-gray-700 text-lg pt-0.5">Submitting a passing score on the Duolingo English Test: 105 or higher.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Tuition & Fees */}
            <section className="animate-fade-in mt-12" style={{ animationDelay: '0.25s' }}>
              <div className="relative overflow-hidden bg-pau-blue rounded-xl p-10 text-white shadow-lg">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                   <CurrencyDollarIcon className="h-64 w-64" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-serif font-bold mb-8">Tuition & Fees</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                      <span className="text-3xl font-bold text-white block mb-1">$3,000.00</span>
                      <span className="text-sm font-medium text-pau-gold uppercase tracking-wider">Trimester Tuition</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                      <span className="text-3xl font-bold text-white block mb-1">$9,000.00</span>
                      <span className="text-sm font-medium text-pau-gold uppercase tracking-wider">Annual Tuition (3 trimesters)</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                      <span className="text-3xl font-bold text-white block mb-1">$36,000.00</span>
                      <span className="text-sm font-medium text-pau-gold uppercase tracking-wider">Total Tuition (Four years)</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
                      <span className="text-3xl font-bold text-white block mb-1">$70.00</span>
                      <span className="text-sm font-medium text-pau-gold uppercase tracking-wider">Application Fee (Non-refundable)</span>
                    </div>
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

                {/* Deadline Note */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    <span className="font-semibold text-pau-blue">Note:</span> Application deadline is 45 days prior to the start date.
                  </p>
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

      {/* FAQ Section */}
      <div className="bg-gray-50 py-24 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-pau-blue mb-4">{content.faqTitle}</h2>
          </div>
          
          <div className="space-y-4">
            {content.faqs && content.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900 pr-8">{faq.question}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300 ${activeFaqIndex === idx ? 'bg-pau-blue border-pau-blue text-white' : 'text-gray-400'}`}>
                    {activeFaqIndex === idx ? (
                      <MinusIcon className="h-5 w-5" />
                    ) : (
                      <PlusIcon className="h-5 w-5" />
                    )}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaqIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                    <div className="mt-4">{faq.answer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="application-modal" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)}
              aria-hidden="true"
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div 
              ref={modalRef}
              className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full"
            >
              <div className="bg-gradient-to-r from-pau-darkBlue to-pau-blue px-6 py-6 sm:px-8">
                 <div className="flex justify-between items-center text-white">
                    <div>
                      <h3 id="application-modal" className="text-xl font-bold mb-1">Start Your Application</h3>
                      <p className="text-sm text-gray-200">Pacific American University School of Law</p>
                    </div>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white transition-colors" aria-label="Close modal">
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                 </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="px-6 py-8 sm:px-8">
                  <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    Please select your intended start date and provide your contact information. We'll send you the complete application portal link via email.
                  </p>
                  
                  <div className="space-y-5">
                    {/* Cohort Selection */}
                    <div>
                      <label htmlFor="cohort-select" className="block text-xs font-bold text-pau-darkBlue uppercase tracking-wide mb-2">
                        Select Your Start Term <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <select
                        id="cohort-select"
                        name="cohort"
                        value={formData.cohort}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        aria-describedby="cohort-description"
                        className="block w-full border-2 border-pau-gold/30 rounded-lg shadow-sm focus:ring-2 focus:ring-pau-gold focus:border-pau-gold text-base p-4 bg-white font-semibold text-pau-darkBlue"
                      >
                        <option value="winter">Winter Intake - Starts January (Deadline: mid-November)</option>
                        <option value="spring">Spring Intake - Starts April (Deadline: mid-February)</option>
                        <option value="fall">Fall Intake - Starts September (Deadline: mid-July)</option>
                      </select>
                      <p id="cohort-description" className="mt-2 text-xs text-gray-500 italic">
                        Application deadline is 45 days prior to the start date.
                      </p>
                    </div>

                    {/* Selected Cohort Info */}
                    <div className="bg-gradient-to-r from-pau-light to-blue-50 p-4 rounded-lg border-l-4 border-pau-gold" role="status" aria-live="polite" aria-atomic="true">
                      <div className="flex items-start">
                        <CalendarDaysIcon className="h-5 w-5 text-pau-gold mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-pau-darkBlue mb-1">
                            You selected: {cohortInfo[formData.cohort].label}
                          </p>
                          <p className="text-xs text-gray-600">
                            Application Deadline: <span className="font-semibold text-pau-blue">{cohortInfo[formData.cohort].deadline}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                          First Name <span className="text-red-500" aria-label="required">*</span>
                        </label>
                        <input 
                          id="firstName"
                          type="text" name="firstName" required
                          value={formData.firstName} onChange={handleChange}
                          aria-required="true"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue text-base p-3 bg-gray-50" 
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                          Last Name <span className="text-red-500" aria-label="required">*</span>
                        </label>
                        <input 
                          id="lastName"
                          type="text" name="lastName" required
                          value={formData.lastName} onChange={handleChange}
                          aria-required="true"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue text-base p-3 bg-gray-50" 
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        Email Address <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <input 
                        id="email"
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        placeholder="your.email@example.com"
                        aria-required="true"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue text-base p-3 bg-gray-50" 
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                        Phone Number <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <input 
                        id="phone"
                        type="tel" name="phone" required
                        value={formData.phone} onChange={handleChange}
                        placeholder="(123) 456-7890"
                        aria-required="true"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-pau-blue focus:border-pau-blue text-base p-3 bg-gray-50" 
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-gray-100">
                    <button type="submit" className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-pau-gold text-base font-bold text-white hover:bg-yellow-600 sm:ml-3 sm:w-auto transition-colors" aria-label="Submit application form">
                      <ArrowRightIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                      Continue Application
                    </button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors" aria-label="Close application modal">
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