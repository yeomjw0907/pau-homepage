
import React, { useState } from 'react';
import { Page, SharedContent } from '../types';
import { XMarkIcon, ShieldCheckIcon, DocumentTextIcon, EyeIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';

interface FooterProps {
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

type PolicyType = 'privacy' | 'terms' | 'accessibility';

export const Footer: React.FC<FooterProps> = ({ onNavigate, shared }) => {
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const policies = {
    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      content: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p><strong>Effective Date:</strong> October 1, 2023</p>
          <p>Pacific American University School of Law ("PAU Law", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          
          <h4 className="font-bold text-gray-900 mt-4">1. Information We Collect</h4>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows: Identity Data, Contact Data, Technical Data, and Usage Data.</p>
          
          <h4 className="font-bold text-gray-900 mt-4">2. How We Use Your Data</h4>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: (a) Where we need to perform the contract we are about to enter into or have entered into with you; (b) Where it is necessary for our legitimate interests.</p>
          
          <h4 className="font-bold text-gray-900 mt-4">3. California Consumer Privacy Act (CCPA)</h4>
          <p>Under the CCPA, California residents have the right to request access to and deletion of their personal information. PAU Law does not sell personal information to third parties.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Use",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      content: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
           <p><strong>Last Updated:</strong> August 15, 2023</p>
           <p>Welcome to the Pacific American University School of Law website. By accessing or using our website, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>

           <h4 className="font-bold text-gray-900 mt-4">1. Educational Purpose</h4>
           <p>The content provided on this website is for general informational and educational purposes only. It does not constitute legal advice. Accessing this site does not create an attorney-client relationship.</p>

           <h4 className="font-bold text-gray-900 mt-4">2. Intellectual Property</h4>
           <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of PAU Law or its content suppliers and protected by United States and international copyright laws.</p>

           <h4 className="font-bold text-gray-900 mt-4">3. Limitation of Liability</h4>
           <p>In no event shall PAU Law be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PAU Law's website.</p>
        </div>
      )
    },
    accessibility: {
      title: "Accessibility Statement",
      icon: <EyeIcon className="h-6 w-6" />,
      content: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
           <p>Pacific American University School of Law is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>

           <h4 className="font-bold text-gray-900 mt-4">Conformance Status</h4>
           <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. The PAU Law website is partially conformant with WCAG 2.1 level AA.</p>

           <h4 className="font-bold text-gray-900 mt-4">Feedback</h4>
           <p>We welcome your feedback on the accessibility of the PAU Law website. Please let us know if you encounter accessibility barriers:</p>
           <ul className="list-disc pl-5">
             <li>E-mail: accessibility@pau.edu</li>
             <li>Phone: (408) 555-0199</li>
           </ul>
        </div>
      )
    }
  };

  return (
    <footer className="bg-pau-darkBlue text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
         <svg width="400" height="400" fill="none" viewBox="0 0 24 24">
           <path stroke="currentColor" strokeWidth="0.5" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
         </svg>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10">
        <div className="col-span-1 md:col-span-2 pr-8">
           <div 
             className="flex flex-col cursor-pointer group mb-6 select-none"
             onClick={() => onNavigate('home')}
           >
             <h3 className="text-2xl font-bold tracking-widest text-white font-sans">PACIFIC AMERICAN</h3>
             <h4 className="text-sm text-pau-gold tracking-[0.38em] font-medium font-sans mt-1">UNIVERSITY</h4>
           </div>
           <p className="text-gray-300 text-sm max-w-sm leading-relaxed font-light">
             {shared.footer.schoolDesc}
           </p>
        </div>
        
        <div>
          <h3 className="text-xs font-bold text-pau-gold tracking-widest uppercase mb-6">{shared.footer.contact}</h3>
          <ul className="space-y-4 text-sm text-gray-300 font-light">
            <li className="flex items-start">
              <span className="block">123 University Drive<br/>Santa Clara, CA 95050</span>
            </li>
            <li>(408) 555-0199</li>
            <li>
              <a href="mailto:admissions@pau.edu" className="hover:text-pau-gold transition-colors">admissions@pau.edu</a>
            </li>
          </ul>
        </div>

        <div>
           <h3 className="text-xs font-bold text-pau-gold tracking-widest uppercase mb-6">{shared.footer.quickLinks}</h3>
           <ul className="space-y-3 text-sm text-gray-300 font-medium">
             <li>
               <button onClick={() => onNavigate('admissions')} className="hover:text-white hover:translate-x-1 transition-all text-left">
                 {shared.footer.applyNow}
               </button>
             </li>
             <li>
               <button onClick={() => onNavigate('calendar')} className="hover:text-white hover:translate-x-1 transition-all text-left">
                 {shared.footer.academicCalendar}
               </button>
             </li>
             <li>
               <button onClick={() => onNavigate('library')} className="hover:text-white hover:translate-x-1 transition-all text-left">
                 {shared.footer.lawLibrary}
               </button>
             </li>
             <li>
               <button onClick={() => onNavigate('careers')} className="hover:text-white hover:translate-x-1 transition-all text-left">
                 {shared.footer.careerServices}
               </button>
             </li>
           </ul>
        </div>
      </div>
      
      {/* Accreditation & Disclosure Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-white/10">
        <div className="max-w-4xl">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{shared.footer.accreditation}</h3>
           <p className="text-xs text-gray-500 leading-relaxed text-justify font-light">
             {shared.footer.disclosure}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {shared.footer.rightsReserved}
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button onClick={() => onNavigate('admin')} className="flex items-center hover:text-pau-gold transition-colors">
            <Cog8ToothIcon className="h-4 w-4 mr-1" />
            Admin Dashboard
          </button>
          <button onClick={() => onNavigate('consumer-info')} className="hover:text-gray-300 transition-colors">
            Consumer Information
          </button>
          <button onClick={() => setActivePolicy('privacy')} className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => setActivePolicy('terms')} className="hover:text-gray-300 transition-colors">
            Terms of Use
          </button>
          <button onClick={() => setActivePolicy('accessibility')} className="hover:text-gray-300 transition-colors">
            Accessibility
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
             <div 
               className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
               onClick={() => setActivePolicy(null)}
             ></div>

             <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

             <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div className="bg-pau-darkBlue px-6 py-4 flex justify-between items-center border-b border-white/10">
                   <div className="flex items-center text-white">
                      <div className="mr-3 text-pau-gold">
                         {policies[activePolicy].icon}
                      </div>
                      <h3 className="text-lg font-serif font-bold tracking-wide">
                        {policies[activePolicy].title}
                      </h3>
                   </div>
                   <button 
                     type="button" 
                     onClick={() => setActivePolicy(null)} 
                     className="text-white/50 hover:text-white transition-colors"
                   >
                      <XMarkIcon className="h-6 w-6" />
                   </button>
                </div>
                
                <div className="px-6 py-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                   {policies[activePolicy].content}
                </div>

                <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setActivePolicy(null)} 
                    className="w-full inline-flex justify-center rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </footer>
  );
};
