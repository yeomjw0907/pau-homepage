
import React from 'react';
import { Page, SharedContent } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, shared }) => {
  return (
    <footer className="bg-pau-darkBlue text-white pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/10 pb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-white">PACIFIC AMERICAN</h3>
            <h4 className="text-[10px] text-pau-gold tracking-[0.4em] font-medium uppercase mt-1">University</h4>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed font-light">
            Pacific American University School of Law is dedicated to excellence in legal education, serving the diverse communities of California and beyond since 1978.
          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-pau-gold uppercase tracking-[0.2em] mb-8">Contact</h3>
          <ul className="text-xs text-gray-400 space-y-4 font-light">
            <li>123 University Drive <br /> Santa Clara, CA 95050</li>
            <li>(408) 555-0199</li>
            <li><a href="mailto:admissions@pau.edu" className="hover:text-white transition-colors">admissions@pau.edu</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-pau-gold uppercase tracking-[0.2em] mb-8">Quick Links</h3>
          <ul className="text-xs text-gray-400 space-y-4 font-bold">
            <li><button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors">Apply Now</button></li>
            <li><button onClick={() => onNavigate('academic-calendar')} className="hover:text-white transition-colors">Academic Calendar</button></li>
            <li><button onClick={() => onNavigate('library')} className="hover:text-white transition-colors">Law Library</button></li>
            <li><button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors">Career Services</button></li>
          </ul>
        </div>

        <div className="flex flex-col items-end">
           {/* Placeholder for small footer logo/mark from image */}
           <div className="w-12 h-12 border border-white/10 flex items-center justify-center opacity-30">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
           </div>
        </div>
      </div>

      {/* State Bar Compliance Section from Image */}
      <div className="max-w-7xl mx-auto py-10">
        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">State Bar Registration</h3>
        <p className="text-[10px] text-gray-500 leading-relaxed font-light text-justify">
          Pacific American University School of Law is accredited by the Committee of Bar Examiners of the State Bar of California. Study at, or graduation from, this law school may not qualify a student to take the bar examination or to satisfy the requirements for admission to practice in jurisdictions other than California. A student intending to seek admission to practice law in a jurisdiction other than California should contact the admitting authority in that jurisdiction for information regarding the legal education requirements in that jurisdiction for admission to the practice of law.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 border-t border-white/5 pt-8">
        <p>&copy; 2025 Pacific American University School of Law. All rights reserved.</p>
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
