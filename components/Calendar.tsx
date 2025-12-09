
import React from 'react';
import { CalendarContent, SharedContent } from '../types';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

interface CalendarProps {
  content: CalendarContent;
  shared: SharedContent;
}

export const Calendar: React.FC<CalendarProps> = ({ content, shared }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-col">
          <CalendarDaysIcon className="h-12 w-12 text-pau-blue mb-4" />
          <h1 className="text-4xl font-serif font-bold text-gray-900 text-center">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-500 text-center max-w-2xl">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow overflow-hidden rounded-md border border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {content.events.map((event, idx) => (
              <li key={idx} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-pau-blue truncate">
                      {event.event}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.type}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                      {event.date}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 text-center">
           <a href="#" className="text-pau-blue font-medium hover:text-pau-gold text-sm underline">
             {shared.buttons.downloadCalendar}
           </a>
        </div>
      </div>
    </div>
  );
};
