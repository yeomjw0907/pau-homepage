
import React from 'react';
import { NewsItem, SharedContent } from '../types';
import { CalendarDaysIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';

interface HomeNewsProps {
  title: string;
  newsItems: NewsItem[];
  onNewsClick: (item: NewsItem) => void;
  shared: SharedContent;
}

export const HomeNews: React.FC<HomeNewsProps> = ({ title, newsItems, onNewsClick, shared }) => {
  return (
    <section className="bg-pau-light py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-pau-blue sm:text-4xl">{title}</h2>
          <div className="w-20 h-1 bg-pau-gold mx-auto mt-6"></div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
             <article 
               key={item.id} 
               className="flex flex-col bg-white h-full p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-transparent hover:border-pau-blue cursor-pointer group"
               onClick={() => onNewsClick(item)}
             >
               <div className="flex justify-between items-start mb-6">
                 <div className="flex flex-col">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                     {item.category}
                   </span>
                   <div className="flex items-center text-pau-gold text-xs font-medium">
                      <CalendarDaysIcon className="h-4 w-4 mr-1.5" />
                      {item.date}
                   </div>
                 </div>
               </div>
               
               <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors leading-snug">
                 {item.title}
               </h3>

               <p className="text-gray-600 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">
                 {item.summary}
               </p>
               
               <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                 <span className="text-sm font-bold text-gray-900 group-hover:text-pau-blue transition-colors">
                   {shared.buttons.readMore}
                 </span>
                 <ArrowLongRightIcon className="h-5 w-5 text-gray-400 group-hover:text-pau-blue group-hover:translate-x-2 transition-transform duration-300" />
               </div>
             </article>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 shadow-sm text-sm font-bold rounded-sm text-gray-700 bg-white hover:bg-gray-50 hover:text-pau-blue transition-all">
             View News Archive
          </button>
        </div>
      </div>
    </section>
  )
}
