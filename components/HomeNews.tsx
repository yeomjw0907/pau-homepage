
import React from 'react';
import { NewsItem, SharedContent } from '../types';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

interface HomeNewsProps {
  title: string;
  newsItems: NewsItem[];
  onNewsClick: (item: NewsItem) => void;
  shared: SharedContent;
}

export const HomeNews: React.FC<HomeNewsProps> = ({ title, newsItems, onNewsClick, shared }) => {
  return (
    <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           {title && <h2 className="text-3xl font-serif font-bold text-pau-blue">{title}</h2>}
           <button className="text-pau-gold font-bold text-sm hover:text-pau-blue transition-colors mt-4 md:mt-0 uppercase tracking-widest">
             View All News &rarr;
           </button>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
             <article 
               key={item.id} 
               className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer"
               onClick={() => onNewsClick(item)}
             >
               <div className="p-8 flex flex-col h-full">
                 <div className="flex justify-between items-start mb-4">
                   <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
                     item.category === 'Event' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                     item.category === 'Academic' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                     'bg-gray-50 text-gray-600 border-gray-200'
                   }`}>
                     {item.category}
                   </span>
                 </div>
                 
                 <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pau-blue transition-colors leading-tight">
                   {item.title}
                 </h3>
                 
                 <div className="flex items-center text-gray-400 text-xs font-medium mb-4">
                    <CalendarDaysIcon className="h-4 w-4 mr-1.5" />
                    {item.date}
                 </div>

                 <p className="text-gray-600 line-clamp-3 mb-6 flex-grow text-sm leading-relaxed border-t border-gray-100 pt-4">
                   {item.summary}
                 </p>
                 
                 <span 
                   className="inline-block text-pau-blue font-bold text-xs hover:text-pau-gold uppercase tracking-wider transition-colors"
                 >
                   {shared.buttons.readMore}
                 </span>
               </div>
               <div className="h-1 bg-pau-blue w-0 group-hover:w-full transition-all duration-500"></div>
             </article>
          ))}
        </div>
      </div>
    </section>
  )
}
