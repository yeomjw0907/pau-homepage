
import React from 'react';
import { LibraryContent, SharedContent } from '../types';
import { BookOpenIcon, ClockIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

interface LibraryProps {
  content: LibraryContent;
  shared: SharedContent;
}

export const Library: React.FC<LibraryProps> = ({ content, shared }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-pau-blue py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-4">
          <BookOpenIcon className="h-16 w-16 mx-auto mb-4 text-pau-gold" />
          <h1 className="text-4xl font-serif font-bold">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.sections.map((section, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">
                 {idx === 0 ? <ClockIcon className="h-8 w-8 text-pau-blue" /> : 
                  idx === 1 ? <BookOpenIcon className="h-8 w-8 text-pau-blue" /> :
                  <ComputerDesktopIcon className="h-8 w-8 text-pau-blue" />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-pau-light rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-pau-blue mb-4">Research Assistance</h2>
          <p className="text-gray-600 mb-6">Our reference librarians are available to assist with complex legal research questions.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-pau-blue text-white px-6 py-2 rounded font-medium hover:bg-blue-800 transition">{shared.buttons.chatLibrarian}</button>
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-50 transition">{shared.buttons.reserveRoom}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
