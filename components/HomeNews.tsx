
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
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-pau-warm skew-x-12 transform translate-x-1/3 -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <div className="flex items-center space-x-2 mb-3">
               <span className="h-px w-8 bg-pau-gold"></span>
               <span className="text-pau-gold font-bold tracking-widest uppercase text-xs">Updates & Events</span>
             </div>
             <h2 className="text-4xl font-serif font-bold text-pau-darkBlue">{title}</h2>
          </div>
          <button className="hidden md:block px-8 py-3 border border-gray-200 text-sm font-bold text-gray-600 rounded-full hover:border-pau-blue hover:text-white hover:bg-pau-blue transition-all bg-white shadow-sm">
             View News Archive
          </button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, idx) => (
             <article 
               key={item.id} 
               className="flex flex-col bg-white h-full p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-card hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
               onClick={() => onNewsClick(item)}
               style={{ transitionDelay: `${idx * 50}ms` }}
             >
               <div className="flex justify-between items-start mb-6">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                   ${item.category === 'Event' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                     item.category === 'Academic' ? 'bg-blue-50 text-pau-blue border-blue-100' :
                     'bg-gray-50 text-gray-600 border-gray-200'
                   }`}>
                   {item.category}
                 </span>
                 <div className="flex items-center text-gray-400 text-xs font-medium bg-gray-50 px-2 py-1 rounded">
                    <CalendarDaysIcon className="h-3 w-3 mr-1.5" />
                    {item.date}
                 </div>
               </div>
               
               <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors leading-tight font-serif">
                 {item.title}
               </h3>

               <p className="text-gray-500 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">
                 {item.summary}
               </p>
               
               <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-xs font-bold text-gray-400 group-hover:text-pau-darkBlue transition-colors uppercase tracking-wide">
                   {shared.buttons.readMore}
                 </span>
                 <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-pau-blue group-hover:text-white group-hover:border-pau-blue transition-all duration-300">
                    <ArrowLongRightIcon className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                 </div>
               </div>
             </article>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <button className="px-8 py-3 border border-gray-300 shadow-sm text-sm font-bold rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-all">
             View News Archive
          </button>
        </div>
      </div>
    </section>
  )
}
