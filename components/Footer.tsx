import React, { useState, useEffect, useRef } from 'react';
import { Page, SharedContent } from '../types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FooterProps {
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

type ModalType = 'privacy' | 'terms' | 'accessibility' | null;

export const Footer: React.FC<FooterProps> = ({ onNavigate, shared }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  const modalContent = {
    privacy: {
      title: 'Privacy Policy',
      content: `Pacific American University School of Law respects your privacy and is committed to protecting your personal information.

Information We Collect:
We collect personal information that you provide when applying to the law school, registering for courses, or contacting our offices. This may include your name, contact information, educational history, and other relevant data.

How We Use Your Information:
• To process your application and enrollment
• To provide educational services and support
• To communicate important updates and information
• To comply with legal and regulatory requirements
• To improve our programs and services

Data Protection:
Your personal information is securely stored and protected. We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, alteration, or disclosure.

Your Rights:
You have the right to access, correct, or request deletion of your personal information. To exercise these rights or if you have any questions, please contact us at info@paucal.org.

Third-Party Sharing:
We do not sell or rent your personal information to third parties. We may share information with service providers who assist in our operations, but only as necessary and under strict confidentiality agreements.

Last Updated: January 2026`
    },
    terms: {
      title: 'Terms of Use',
      content: `Welcome to the Pacific American University School of Law website. By accessing and using this website, you agree to the following terms and conditions.

Acceptable Use:
This website is provided for informational and educational purposes. You agree to use this site only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the site.

Intellectual Property:
All content on this website, including text, graphics, logos, images, and software, is the property of Pacific American University School of Law and is protected by copyright, trademark, and other intellectual property laws. Unauthorized reproduction, distribution, or modification of any content is strictly prohibited.

Accuracy of Information:
While we strive to ensure that all information on this website is accurate and up-to-date, we make no warranties or representations regarding the completeness or accuracy of the information. Academic policies, procedures, and requirements are subject to change.

Links to Third-Party Sites:
This website may contain links to external websites. We are not responsible for the content, privacy policies, or practices of third-party sites.

Limitation of Liability:
Pacific American University School of Law shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.

Governing Law:
These Terms of Use are governed by the laws of the State of California.

Contact:
For questions about these terms, please contact us at info@paucal.org.

Last Updated: January 2026`
    },
    accessibility: {
      title: 'Accessibility Statement',
      content: `Pacific American University School of Law is committed to ensuring digital accessibility for people with disabilities. We are continually working to improve the accessibility and usability of our website for all users.

Our Commitment:
We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.

Measures We Take:
• Providing alternative text for images
• Using clear and consistent navigation
• Ensuring sufficient color contrast
• Making content accessible via keyboard navigation
• Providing captions and transcripts for multimedia content
• Using clear and simple language
• Organizing content with proper heading structures

Ongoing Efforts:
We regularly review our website and implement improvements to enhance accessibility. We welcome feedback and are dedicated to providing an inclusive experience for all users.

Third-Party Content:
While we strive to ensure accessibility throughout our website, some content may be provided by third parties and may not be fully under our control.

Feedback and Contact:
If you encounter any accessibility barriers or have suggestions for improvement, please contact us:

Email: info@paucal.org
Phone: (213) 674-7174

We will make every effort to respond to your feedback promptly and work to resolve any issues.

Last Updated: January 2026`
    }
  };

  return (
    <>
    <footer className="bg-pau-darkBlue text-white pt-20 pb-10 px-6 font-sans" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 border-b border-white/10 pb-20">
        {/* University Info */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col mb-6">
            <img 
              src="/images/logo/logo-white.svg"
              alt="Pacific American University School of Law"
              className="h-12 md:h-14 w-auto max-w-[200px] md:max-w-[240px] object-contain"
            />
          </div>
          {/* Source: Catalog Page 11 (Mission Statement) */}
          <p className="text-gray-500 text-xs leading-relaxed font-light">
            Pacific American University School of Law is dedicated to excellence in legal education, 
            nurturing global leaders to resolve complex challenges without borders.
          </p>
        </div>

        {/* Contact - Expanded to 2 columns */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-[10px] font-bold text-pau-gold uppercase tracking-[0.2em] mb-6">Contact</h3>
          {/* Source: Catalog Page 48 (Contact Information) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs text-gray-300 font-light">
            <div className="space-y-4">
              <div>
                <strong className="text-white text-[10px] block mb-1 uppercase tracking-wider">Address:</strong>
                3435 Wilshire Blvd. Suite 430, <br /> 
                Los Angeles, CA 90010
              </div>
              <div>
                <strong className="text-white text-[10px] block mb-1 uppercase tracking-wider">Phone:</strong>
                (213) 674-7174
              </div>
              <div>
                <strong className="text-white text-[10px] block mb-1 uppercase tracking-wider">Fax:</strong>
                (213) 674-7233
              </div>
              <div>
                <strong className="text-white text-[10px] block mb-1 uppercase tracking-wider">Website:</strong>
                <a href="https://www.law.paucal.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  www.law.paucal.org
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <strong className="text-white text-[10px] block mb-2 uppercase tracking-wider">Email:</strong>
                <div className="space-y-1.5 text-[11px]">
                  <div>General: <a href="mailto:info@paucal.org" className="hover:text-white transition-colors text-pau-gold">info@paucal.org</a></div>
                  <div>Admissions: <a href="mailto:admissions@paucal.org" className="hover:text-white transition-colors text-pau-gold">admissions@paucal.org</a></div>
                  <div>Registrar: <a href="mailto:registrar@paucal.org" className="hover:text-white transition-colors text-pau-gold">registrar@paucal.org</a></div>
                </div>
              </div>
              <div>
                <strong className="text-white text-[10px] block mb-1 uppercase tracking-wider">Office Hours:</strong>
                <div className="space-y-0.5 text-[11px]">
                  <div>Monday – Friday:</div>
                  <div>9:00 am – 12:00 pm (Noon)</div>
                  <div>1:00 pm – 5:00 pm</div>
                  <div className="text-[10px] text-gray-500 mt-1">Pacific Standard Time (PST)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-[10px] font-bold text-pau-gold uppercase tracking-[0.2em] mb-6">Quick Links</h3>
          <ul className="text-xs text-gray-300 space-y-3 font-bold">
            <li><button onClick={() => onNavigate('apply-now')} className="hover:text-white transition-colors" aria-label="Navigate to application page">Apply Now</button></li>
            <li><button onClick={() => onNavigate('academic-calendar')} className="hover:text-white transition-colors" aria-label="Navigate to academic calendar">Academic Calendar</button></li>
            {/* <li><button onClick={() => onNavigate('library')} className="hover:text-white transition-colors">Law Library</button></li> */}
            {/* <li><button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors">Career Services</button></li> */}
          </ul>
        </div>

      </div>

      {/* State Bar Compliance Section (Disclaimer) */}
      <div className="max-w-7xl mx-auto py-10">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">State Bar Registration & Accreditation Status</h3>
        
        {/* Source: Catalog Page 43 (Student Disclosure Statement - Paragraph 1 & 3) 
            Note: This exact wording is required for unaccredited law schools in California. 
        */}
        <p className="text-[10px] text-gray-500 leading-relaxed font-light text-justify mb-4">
          Pacific American University School of Law is registered with the Committee of Bar Examiners of the State Bar of California as an unaccredited correspondence law school. 
          PAUSL is not accredited by the State Bar of California or the American Bar Association.
        </p>

        <p className="text-[10px] text-gray-500 leading-relaxed font-light text-justify mb-4">
          PAUSL's degree-granting authority in connection with its students qualifying to take the California Bar Examination and obtain admission to the practice of law in California is based on its registration as an unaccredited law school with The State Bar of California's Committee of Bar Examiners.
        </p>

        {/* Source: Catalog Page 43 (Student Disclosure Statement - Paragraph 4) */}
        <p className="text-[10px] text-gray-500 leading-relaxed font-light text-justify">
          Study at, or graduation from, this law school may not qualify a student to take the bar examination or to satisfy the requirements for admission to practice in jurisdictions other than California. 
          A student intending to seek admission to practice law in a jurisdiction other than California should contact the admitting authority in that jurisdiction for information regarding the legal education requirements in that jurisdiction for admission to the practice of law.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 border-t border-white/5 pt-8">
        {/* Source: Catalog Page 48 (Copyright) */}
        <p>&copy; 2026-2027 Pacific American University School of Law. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0 justify-center md:justify-end">
          <button onClick={() => onNavigate('admin')} className="hover:text-gray-400 transition-colors">Admin Dashboard</button>
          {/* <button onClick={() => onNavigate('consumer-info')} className="hover:text-gray-400 transition-colors">Consumer Information</button> */}
          <button onClick={() => setActiveModal('privacy')} className="hover:text-gray-400 transition-colors">Privacy Policy</button>
          <button onClick={() => setActiveModal('terms')} className="hover:text-gray-400 transition-colors">Terms of Use</button>
          <button onClick={() => setActiveModal('accessibility')} className="hover:text-gray-400 transition-colors">Accessibility</button>
        </div>
      </div>
    </footer>

    {/* Modal */}
    {activeModal && (
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
            onClick={() => setActiveModal(null)}
            aria-hidden="true"
          ></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div 
            ref={modalRef}
            className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full"
          >
            <div className="bg-pau-darkBlue px-6 py-5 sm:px-8">
              <div className="flex justify-between items-center text-white">
                <h3 className="text-lg font-bold">{modalContent[activeModal].title}</h3>
                <button 
                  type="button" 
                  onClick={() => setActiveModal(null)} 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-8 sm:px-8 max-h-[60vh] overflow-y-auto">
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {modalContent[activeModal].content}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 sm:px-8 border-t border-gray-100 flex justify-end">
              <button 
                type="button" 
                onClick={() => setActiveModal(null)} 
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};