
import React, { useState } from 'react';
import { CalendarContent, SharedContent } from '../types';
import { CalendarDaysIcon, ArrowDownTrayIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface CalendarProps {
  content: CalendarContent;
  shared: SharedContent;
}

type StartType = 'Fall' | 'Winter' | 'Spring';

export const Calendar: React.FC<CalendarProps> = ({ content, shared }) => {
  const [selectedStart, setSelectedStart] = useState<StartType>('Fall');

  const startData = {
    'Fall': {
      label: 'Fall Start (September)',
      month: 'September',
      description: 'Students commencing in September',
      yearlySchedule: [
        { year: '1L', term: 'Fall (Sept.)', courses: 'Introduction to Law, Contracts I, Torts I' },
        { year: '1L', term: 'Winter (Jan.)', courses: 'Criminal Law, Contracts II' },
        { year: '1L', term: 'Spring (May)', courses: 'Torts II, Legal Writing & Analysis, FYLSX Review' },
        { year: '2L', term: 'Fall (Sept.)', courses: 'Civil Procedure I, Property I' },
        { year: '2L', term: 'Winter (Jan.)', courses: 'Civil Procedure II, Property II' },
        { year: '2L', term: 'Spring (May)', courses: 'Remedies, Criminal Procedure' },
        { year: '3L', term: 'Fall (Sept.)', courses: 'Constitutional Law I, Evidence I' },
        { year: '3L', term: 'Winter (Jan.)', courses: 'Constitutional Law II, Evidence II' },
        { year: '3L', term: 'Spring (May)', courses: 'Business Associations, Community Property' },
        { year: '4L', term: 'Fall (Sept.)', courses: 'Professional Responsibility, Wills & Succession' },
        { year: '4L', term: 'Winter (Jan.)', courses: 'CA Civil Procedure, CA Evidence' },
        { year: '4L', term: 'Spring (May)', courses: 'Adv. Legal Research & Writing, Practical Competency Training, Bar Review (Elective)' }
      ]
    },
    'Winter': {
      label: 'Winter Start (January)',
      month: 'January',
      description: 'Students commencing in January',
      yearlySchedule: [
        { year: '1L', term: 'Winter (Jan.)', courses: 'Introduction to Law, Contracts I, Torts I' },
        { year: '1L', term: 'Spring (May)', courses: 'Criminal Law, Contracts II' },
        { year: '1L', term: 'Fall (Sept.)', courses: 'Torts II, Legal Writing & Analysis, FYLSX Review' },
        { year: '2L', term: 'Winter (Jan.)', courses: 'Civil Procedure I, Property I' },
        { year: '2L', term: 'Spring (May)', courses: 'Civil Procedure II, Property II' },
        { year: '2L', term: 'Fall (Sept.)', courses: 'Remedies, Criminal Procedure' },
        { year: '3L', term: 'Winter (Jan.)', courses: 'Constitutional Law I, Evidence I' },
        { year: '3L', term: 'Spring (May)', courses: 'Constitutional Law II, Evidence II' },
        { year: '3L', term: 'Fall (Sept.)', courses: 'Business Associations, Community Property' },
        { year: '4L', term: 'Winter (Jan.)', courses: 'Professional Responsibility, Wills & Succession' },
        { year: '4L', term: 'Spring (May)', courses: 'CA Civil Procedure, CA Evidence' },
        { year: '4L', term: 'Fall (Sept.)', courses: 'Adv. Legal Research & Writing, Practical Competency Training, Bar Review (Elective)' }
      ]
    },
    'Spring': {
      label: 'Spring Start (May)',
      month: 'May',
      description: 'Students commencing in May',
      yearlySchedule: [
        { year: '1L', term: 'Spring (May)', courses: 'Introduction to Law, Contracts I, Torts I' },
        { year: '1L', term: 'Fall (Sept.)', courses: 'Criminal Law, Contracts II' },
        { year: '1L', term: 'Winter (Jan.)', courses: 'Torts II, Legal Writing & Analysis, FYLSX Review' },
        { year: '2L', term: 'Spring (May)', courses: 'Civil Procedure I, Property I' },
        { year: '2L', term: 'Fall (Sept.)', courses: 'Civil Procedure II, Property II' },
        { year: '2L', term: 'Winter (Jan.)', courses: 'Remedies, Criminal Procedure' },
        { year: '3L', term: 'Spring (May)', courses: 'Constitutional Law I, Evidence I' },
        { year: '3L', term: 'Fall (Sept.)', courses: 'Constitutional Law II, Evidence II' },
        { year: '3L', term: 'Winter (Jan.)', courses: 'Business Associations, Community Property' },
        { year: '4L', term: 'Spring (May)', courses: 'Professional Responsibility, Wills & Succession' },
        { year: '4L', term: 'Fall (Sept.)', courses: 'CA Civil Procedure, CA Evidence' },
        { year: '4L', term: 'Winter (Jan.)', courses: 'Adv. Legal Research & Writing, Practical Competency Training, Bar Review (Elective)' }
      ]
    }
  };

  const currentStart = startData[selectedStart];

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
        {/* Start Type Filter */}
        <div className="mb-8 bg-gradient-to-r from-pau-darkBlue to-pau-blue rounded-2xl p-6 shadow-xl">
          <label htmlFor="start-filter" className="block text-sm font-bold text-pau-gold uppercase tracking-wider mb-3">
            Select Your Start Term
          </label>
          <div className="relative">
            <select
              id="start-filter"
              value={selectedStart}
              onChange={(e) => setSelectedStart(e.target.value as StartType)}
              className="block w-full pl-4 pr-10 py-4 text-lg font-semibold bg-white border-2 border-pau-gold rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-pau-gold/30 focus:border-pau-gold transition-all cursor-pointer appearance-none text-pau-darkBlue"
            >
              <option value="Fall">Fall Start (September)</option>
              <option value="Winter">Winter Start (January)</option>
              <option value="Spring">Spring Start (May)</option>
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-pau-blue pointer-events-none" />
          </div>
        </div>

        {/* Trimester Information */}
        <div className="mb-12 bg-white shadow-soft rounded-2xl border-2 border-pau-gold/20 p-8 animate-fade-in">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-serif font-bold text-pau-darkBlue mb-2">
              {currentStart.label}
            </h2>
            <p className="text-sm text-gray-500">{currentStart.description}</p>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-pau-gold mt-2"></div>
              <p><strong>Trimester Structure:</strong> Each trimester is a four (4) month term, totaling sixteen (16) weeks, with mid-terms and final exams.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-pau-gold mt-2"></div>
              <p><strong>Start Options:</strong> Students may commence their studies in January, May, or September.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-pau-gold mt-2"></div>
              <p><strong>Academic Year:</strong> The next academic year cannot begin before the anniversary date of the start of the previous year.</p>
            </div>
          </div>
        </div>

        {/* 4-Year Course Schedule */}
        <div className="bg-white shadow-soft rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pau-light to-white px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-serif font-bold text-pau-darkBlue">
              4-Year Course Schedule
            </h3>
            <p className="text-sm text-gray-500 mt-1">Complete course sequence for {currentStart.label}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-pau-darkBlue text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-bold">Year</th>
                  <th className="px-6 py-3 text-left font-bold">Trimester</th>
                  <th className="px-6 py-3 text-left font-bold">Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentStart.yearlySchedule.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-bold text-pau-blue">{row.year}</td>
                    <td className="px-6 py-4 font-semibold text-pau-darkBlue">{row.term}</td>
                    <td className="px-6 py-4 text-gray-700">{row.courses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Breaks */}
        <div className="mt-12 bg-white shadow-soft rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pau-light to-white px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-serif font-bold text-pau-darkBlue">
              Academic Breaks
            </h3>
          </div>
          <div className="px-8 py-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Each trimester includes a one-week break:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pau-gold"></span>
                <span><strong>Spring Break</strong> in late March</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pau-gold"></span>
                <span><strong>Independence Day</strong> in July</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pau-gold"></span>
                <span><strong>Thanksgiving</strong> in November</span>
              </li>
            </ul>
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