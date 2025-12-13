
import React from 'react';
import { NoticesContent, NewsItem, SharedContent } from '../types';
import { BellIcon, ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface NoticeBoardProps {
  content: NoticesContent;
  onNewsClick: (item: NewsItem) => void;
  shared: SharedContent;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ content, onNewsClick, shared }) => {
  return (
    <div className="bg-white min-h-screen">
       <div className="bg-pau-darkBlue pt-36 pb-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
           <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
             <BellIcon className="h-8 w-8 text-pau-gold" />
           </div>
           <h1 className="text-4xl font-serif font-bold text-white tracking-tight sm:text-5xl mb-4">{content.title}</h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">{content.intro}</p>
         </div>
       </div>

       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-6">
            {content.notices.map((notice, idx) => (
              <div 
                key={notice.id} 
                className="group bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:border-pau-blue hover:shadow-lg transition-all duration-300 cursor-pointer relative animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
                onClick={() => onNewsClick(notice)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-grow pr-8">
                    <div className="flex items-center space-x-3 mb-3">
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                         notice.category === 'Event' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                         notice.category === 'Academic' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                         'bg-gray-50 text-gray-600 border border-gray-100'
                      }`}>
                        {notice.category}
                      </span>
                      <div className="flex items-center text-xs font-medium text-gray-400">
                         <CalendarDaysIcon className="h-4 w-4 mr-1" />
                         {notice.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-pau-blue transition-colors leading-snug">
                      {notice.title}
                    </h3>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 group-hover:bg-pau-gold group-hover:text-white transition-all duration-300">
                     <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed line-clamp-2 pl-0.5">{notice.summary}</p>
                <div className="mt-4 md:hidden">
                    <span className="text-sm text-pau-blue font-bold flex items-center">
                        {shared.buttons.readFullNotice} <ChevronRightIcon className="ml-1 h-3 w-3" />
                    </span>
                </div>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
};
