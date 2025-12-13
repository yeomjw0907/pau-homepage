
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
    <div className="bg-white min-h-screen pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-pau-blue transition-colors mb-10 group"
        >
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-pau-blue group-hover:text-white transition-all duration-300">
             <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="font-bold text-sm uppercase tracking-wide">{shared.buttons.backToList}</span>
        </button>

        <article className="bg-white">
          <header className="mb-10 pb-10 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <span className={`flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${item.category === 'Event' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                  item.category === 'Academic' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                  'bg-gray-50 text-gray-600 border border-gray-200'
                }`}>
                <TagIcon className="h-3 w-3 mr-1.5" />
                {item.category}
              </span>
              <span className="flex items-center text-gray-500 font-medium">
                <CalendarDaysIcon className="h-4 w-4 mr-1.5 text-pau-gold" />
                {item.date}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-pau-blue leading-tight mb-6">
              {item.title}
            </h1>
          </header>

          <div className="prose prose-lg prose-blue text-gray-700 leading-relaxed whitespace-pre-wrap font-sans max-w-none">
            {item.body}
          </div>
          
          <div className="mt-16 bg-gray-50 p-8 rounded-xl border border-gray-100 border-l-4 border-l-pau-gold">
             <h3 className="text-sm font-bold text-pau-darkBlue uppercase tracking-widest mb-3">{shared.labels.aboutPauNews}</h3>
             <p className="text-gray-600 leading-relaxed">
               {shared.labels.aboutPauNewsDetail}
             </p>
          </div>
        </article>
      </div>
    </div>
  );
};
