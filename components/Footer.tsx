
import React from 'react';
import { Page, SharedContent } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, shared }) => {
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
             className="flex items-center gap-3 cursor-pointer group mb-6"
             onClick={() => onNavigate('home')}
           >
             <div className="w-10 h-10 border border-pau-gold rounded-full flex items-center justify-center">
               <span className="text-pau-gold font-serif font-bold text-lg">P</span>
             </div>
             <span className="text-2xl font-serif font-bold italic tracking-wider text-white">PAU Law</span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {shared.footer.rightsReserved}
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Use</a>
          <a href="#" className="hover:text-gray-300">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};
