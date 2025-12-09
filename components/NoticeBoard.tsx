
import React from 'react';
import { NoticesContent, NewsItem, SharedContent } from '../types';
import { BellIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface NoticeBoardProps {
  content: NoticesContent;
  onNewsClick: (item: NewsItem) => void;
  shared: SharedContent;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ content, onNewsClick, shared }) => {
  return (
    <div className="bg-white min-h-screen">
       <div className="bg-pau-blue py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-center">
             <BellIcon className="h-10 w-10 text-pau-gold mr-4" />
             <h1 className="text-4xl font-serif font-bold text-white tracking-tight">{content.title}</h1>
           </div>
           <p className="mt-4 text-xl text-gray-200 text-center max-w-2xl mx-auto">{content.intro}</p>
         </div>
       </div>

       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-6">
            {content.notices.map((notice) => (
              <div 
                key={notice.id} 
                className="group bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-pau-blue hover:shadow-md transition-all cursor-pointer relative"
                onClick={() => onNewsClick(notice)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <div className="flex-grow pr-8">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-pau-blue transition-colors">
                      {notice.title}
                    </h3>
                    <div className="mt-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                         notice.category === 'Event' ? 'bg-blue-100 text-blue-800' :
                         notice.category === 'Academic' ? 'bg-green-100 text-green-800' :
                         'bg-gray-100 text-gray-800'
                      }`}>
                        {notice.category}
                      </span>
                      <span className="ml-3 text-sm text-gray-500">{notice.date}</span>
                    </div>
                  </div>
                  
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                     <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed line-clamp-2">{notice.summary}</p>
                <span className="text-sm text-pau-blue font-medium mt-3 block sm:hidden">{shared.buttons.readFullNotice} &rarr;</span>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
};
