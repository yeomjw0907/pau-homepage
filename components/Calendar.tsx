
import React from 'react';
import { CalendarContent, SharedContent } from '../types';
import { CalendarDaysIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface CalendarProps {
  content: CalendarContent;
  shared: SharedContent;
}

export const Calendar: React.FC<CalendarProps> = ({ content, shared }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-pau-darkBlue pt-44 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <CalendarDaysIcon className="h-16 w-16 text-pau-gold mx-auto mb-6" />
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto font-light">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Academic Start Dates Section */}
        <div className="mb-12 bg-white shadow-soft rounded-2xl border border-gray-100 p-8">
          <h2 className="text-2xl font-serif font-bold text-pau-darkBlue mb-6 border-b border-gray-100 pb-4">
            Academic Calendar & Start Dates
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-pau-blue mb-3">Incoming First-Year (1L)</h3>
              <div className="flex flex-wrap gap-3">
                {["January", "April", "September"].map((month, idx) => (
                  <span key={idx} className="px-4 py-2 bg-pau-light text-pau-darkBlue rounded-lg font-semibold text-sm border border-pau-gold/20">
                    {month}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-pau-blue mb-3">Second-Year (2L) & Third-Year (3L)</h3>
              <div className="flex flex-wrap gap-3">
                {["March", "July", "November"].map((month, idx) => (
                  <span key={idx} className="px-4 py-2 bg-pau-light text-pau-darkBlue rounded-lg font-semibold text-sm border border-pau-gold/20">
                    {month}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-pau-blue mb-3">Fourth-Year (4L)</h3>
              <div className="flex flex-wrap gap-3">
                {["January", "July", "November"].map((month, idx) => (
                  <span key={idx} className="px-4 py-2 bg-pau-light text-pau-darkBlue rounded-lg font-semibold text-sm border border-pau-gold/20">
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-soft rounded-2xl border border-gray-100 overflow-hidden">
          <ul role="list" className="divide-y divide-gray-100">
            {content.events.map((event, idx) => (
              <li key={idx} className="px-8 py-6 hover:bg-blue-50/50 transition duration-150 flex flex-col sm:flex-row sm:items-center sm:justify-between group cursor-default">
                <div className="flex-grow">
                  <div className="flex items-center mb-2 sm:mb-0">
                     <span className="w-2 h-2 rounded-full bg-pau-gold mr-3 group-hover:scale-125 transition-transform"></span>
                     <p className="text-lg font-bold text-pau-blue group-hover:text-pau-darkBlue">
                       {event.event}
                     </p>
                  </div>
                  <p className="text-sm text-gray-500 pl-5 sm:mt-1">
                    {event.type}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 pl-5 sm:pl-0">
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold bg-white border border-gray-200 text-gray-900 shadow-sm group-hover:border-pau-blue/30 transition-colors">
                    {event.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-12 text-center">
           <a 
             href="#" 
             className="inline-flex items-center text-pau-blue font-bold hover:text-pau-gold transition-colors border-b-2 border-pau-blue hover:border-pau-gold pb-1"
           >
             <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
             {shared.buttons.downloadCalendar}
           </a>
        </div>
      </div>
    </div>
  );
};