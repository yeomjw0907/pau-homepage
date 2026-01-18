
import React, { useState } from 'react';
import { CalendarContent, SharedContent } from '../types';
import { CalendarDaysIcon, ArrowDownTrayIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface CalendarProps {
  content: CalendarContent;
  shared: SharedContent;
}

type Cohort = '1L' | '2L-3L' | '4L';

export const Calendar: React.FC<CalendarProps> = ({ content, shared }) => {
  const [selectedCohort, setSelectedCohort] = useState<Cohort>('1L');

  const cohortData = {
    '1L': {
      label: 'Incoming 1L',
      startMonths: ['January', 'April', 'September'],
      description: 'First-year students',
      events: [
        { date: 'January 2026', event: 'Spring Term Start (1L)', type: 'Academic' },
        { date: 'April 2026', event: 'Summer Term Start (1L)', type: 'Academic' },
        { date: 'September 2026', event: 'Fall Term Start (1L)', type: 'Academic' },
        { date: 'May 2027', event: 'First-Year Law Students\' Examination (FYLSX)', type: 'Exam' }
      ]
    },
    '2L-3L': {
      label: 'Continuing 2L & 3L',
      startMonths: ['March', 'July', 'November'],
      description: 'Second and third-year students',
      events: [
        { date: 'March 2026', event: 'Spring Term Start (2L/3L)', type: 'Academic' },
        { date: 'July 2026', event: 'Summer Term Start (2L/3L)', type: 'Academic' },
        { date: 'November 2026', event: 'Fall Term Start (2L/3L)', type: 'Academic' }
      ]
    },
    '4L': {
      label: 'Graduating 4L',
      startMonths: ['January', 'July', 'November'],
      description: 'Fourth-year students',
      events: [
        { date: 'January 2026', event: 'Spring Term Start (4L)', type: 'Academic' },
        { date: 'July 2026', event: 'Summer Term Start (4L)', type: 'Academic' },
        { date: 'November 2026', event: 'Fall Term Start (4L)', type: 'Academic' },
        { date: 'December 2026', event: 'Graduation Ceremony', type: 'Event' }
      ]
    }
  };

  const currentCohort = cohortData[selectedCohort];

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
        {/* Cohort Filter */}
        <div className="mb-8 bg-gradient-to-r from-pau-darkBlue to-pau-blue rounded-2xl p-6 shadow-xl">
          <label htmlFor="cohort-filter" className="block text-sm font-bold text-pau-gold uppercase tracking-wider mb-3">
            Select Your Cohort
          </label>
          <div className="relative">
            <select
              id="cohort-filter"
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value as Cohort)}
              className="block w-full pl-4 pr-10 py-4 text-lg font-semibold bg-white border-2 border-pau-gold rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pau-gold/30 focus:border-pau-gold transition-all cursor-pointer appearance-none text-pau-darkBlue"
            >
              <option value="1L">Incoming 1L (Starts: Jan, Apr, Sep)</option>
              <option value="2L-3L">Continuing 2L & 3L (Starts: Mar, Jul, Nov)</option>
              <option value="4L">Graduating 4L (Starts: Jan, Jul, Nov)</option>
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-pau-blue pointer-events-none" />
          </div>
        </div>

        {/* Academic Start Dates Section */}
        <div className="mb-12 bg-white shadow-soft rounded-2xl border-2 border-pau-gold/20 p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-pau-darkBlue">
                Start Dates for {currentCohort.label}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{currentCohort.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {currentCohort.startMonths.map((month, idx) => (
              <div key={idx} className="flex-1 min-w-[140px]">
                <div className="bg-gradient-to-br from-pau-blue to-pau-darkBlue rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-pau-gold mb-2">{month}</div>
                  <div className="text-xs text-white uppercase tracking-wider">Term Start</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Schedule */}
        <div className="bg-white shadow-soft rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pau-light to-white px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-serif font-bold text-pau-darkBlue">
              Key Dates & Events
            </h3>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {currentCohort.events.map((event, idx) => (
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

        {/* Academic Breaks */}
        <div className="mt-12 bg-white shadow-soft rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pau-light to-white px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-serif font-bold text-pau-darkBlue">
              Academic Breaks
            </h3>
          </div>
          <div className="px-8 py-6">
            <p className="text-gray-700 leading-relaxed">
              There are one-week breaks for Spring Break in late March, Independence Day in July, and Thanksgiving in November.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-pau-light rounded-2xl p-6 border-l-4 border-pau-gold shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CalendarDaysIcon className="h-6 w-6 text-pau-gold" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-bold text-pau-darkBlue uppercase tracking-wider mb-2">
                Important Note
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Application deadline is <span className="font-bold text-pau-blue">45 days prior</span> to your intended start date. Contact the Registrar at{' '}
                <a href="mailto:registrar@paucal.org" className="text-pau-blue hover:text-pau-gold font-semibold underline">
                  registrar@paucal.org
                </a>{' '}
                for specific term schedules.
              </p>
            </div>
          </div>
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