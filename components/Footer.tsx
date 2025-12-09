
import React from 'react';
import { Page, SharedContent } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, shared }) => {
  return (
    <footer className="bg-pau-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
           <span className="text-2xl font-serif font-bold italic tracking-wider cursor-pointer" onClick={() => onNavigate('home')}>PAU</span>
           <p className="mt-4 text-gray-300 text-sm max-w-sm">
             {shared.footer.schoolDesc}
           </p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{shared.footer.contact}</h3>
          <ul className="mt-4 space-y-4 text-sm text-gray-300">
            <li>123 University Drive</li>
            <li>Santa Clara, CA 95050</li>
            <li>(408) 555-0199</li>
            <li>admissions@pau.edu</li>
          </ul>
        </div>

        <div>
           <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{shared.footer.quickLinks}</h3>
           <ul className="mt-4 space-y-4 text-sm text-gray-300">
             <li>
               <button onClick={() => onNavigate('admissions')} className="hover:text-white transition text-left">
                 {shared.footer.applyNow}
               </button>
             </li>
             <li>
               <button onClick={() => onNavigate('calendar')} className="hover:text-white transition text-left">
                 {shared.footer.academicCalendar}
               </button>
             </li>
             <li>
               <button onClick={() => onNavigate('library')} className="hover:text-white transition text-left">
                 {shared.footer.lawLibrary}
               </button>
             </li>
             <li>
               <button onClick={() => onNavigate('careers')} className="hover:text-white transition text-left">
                 {shared.footer.careerServices}
               </button>
             </li>
           </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-blue-800 py-8">
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {shared.footer.rightsReserved}
        </p>
      </div>
    </footer>
  );
};
