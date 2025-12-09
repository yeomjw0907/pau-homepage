
import React from 'react';
import { NewsItem, SharedContent } from '../types';
import { ArrowLeftIcon, CalendarDaysIcon, TagIcon } from '@heroicons/react/24/outline';

interface NewsDetailProps {
  item: NewsItem;
  onBack: () => void;
  shared: SharedContent;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ item, onBack, shared }) => {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-pau-blue hover:text-pau-gold transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{shared.buttons.backToList}</span>
        </button>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <CalendarDaysIcon className="h-4 w-4 mr-1" />
                {item.date}
              </span>
              <span className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                ${item.category === 'Event' ? 'bg-blue-100 text-blue-800' :
                  item.category === 'Academic' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                <TagIcon className="h-3 w-3 mr-1" />
                {item.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
              {item.title}
            </h1>
          </header>

          <div className="prose prose-lg prose-blue text-gray-700 leading-relaxed whitespace-pre-wrap">
            {item.body}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100">
             <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">{shared.labels.aboutPauNews}</h3>
               <p className="text-sm text-gray-600">
                 {shared.labels.aboutPauNewsDetail}
               </p>
             </div>
          </div>
        </article>
      </div>
    </div>
  );
};
