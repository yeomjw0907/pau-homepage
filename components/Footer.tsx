import React from 'react';
import { Page, SharedContent } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, shared }) => {
  return (
    <footer className="bg-pau-darkBlue text-white pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 border-b border-white/10 pb-20">
        {/* University Info */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col mb-6">
            <h3 className="text-2xl font-bold tracking-tight text-white">PACIFIC AMERICAN</h3>
            <h4 className="text-[10px] text-pau-gold tracking-[0.4em] font-medium uppercase mt-1">University</h4>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs text-gray-400 font-light">
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
                <a href="https://www.paucal.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  www.paucal.org
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
                  <div className="text-[10px] text-gray-500 mt-1">Pacific Time (PT)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="text-[10px] font-bold text-pau-gold uppercase tracking-[0.2em] mb-6">Quick Links</h3>
          <ul className="text-xs text-gray-400 space-y-3 font-bold">
            <li><button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors">Apply Now</button></li>
            <li><button onClick={() => onNavigate('academic-calendar')} className="hover:text-white transition-colors">Academic Calendar</button></li>
            <li><button onClick={() => onNavigate('library')} className="hover:text-white transition-colors">Law Library</button></li>
            <li><button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors">Career Services</button></li>
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
          The Pacific American University School of Law is registered with the Committee of Bar Examiners of the State Bar of California as an unaccredited correspondence law school. 
          PAUSL is not accredited by the State Bar of California or the American Bar Association.
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
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button onClick={() => onNavigate('admin')} className="hover:text-gray-400 transition-colors">Admin Dashboard</button>
          <button className="hover:text-gray-400">Consumer Information</button>
          <button className="hover:text-gray-400">Privacy Policy</button>
          <button className="hover:text-gray-400">Terms of Use</button>
          <button className="hover:text-gray-400">Accessibility</button>
        </div>
      </div>
    </footer>
  );
};