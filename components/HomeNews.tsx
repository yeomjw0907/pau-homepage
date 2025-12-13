
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
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 skew-x-12 transform translate-x-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <span className="text-pau-gold font-bold tracking-widest uppercase text-xs mb-2 block">Updates & Events</span>
             <h2 className="text-4xl font-serif font-bold text-pau-darkBlue">{title}</h2>
          </div>
          <button className="hidden md:block px-6 py-3 border border-gray-200 text-sm font-bold text-gray-600 rounded-full hover:border-pau-blue hover:text-pau-blue transition-colors bg-white shadow-sm">
             View News Archive
          </button>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, idx) => (
             <article 
               key={item.id} 
               className="flex flex-col bg-white h-full p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-card hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
               onClick={() => onNewsClick(item)}
               style={{ transitionDelay: `${idx * 50}ms` }}
             >
               <div className="flex justify-between items-start mb-6">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                   ${item.category === 'Event' ? 'bg-orange-50 text-orange-700' :
                     item.category === 'Academic' ? 'bg-blue-50 text-pau-blue' :
                     'bg-gray-100 text-gray-600'
                   }`}>
                   {item.category}
                 </span>
                 <div className="flex items-center text-gray-400 text-xs font-medium">
                    <CalendarDaysIcon className="h-4 w-4 mr-1.5" />
                    {item.date}
                 </div>
               </div>
               
               <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors leading-snug font-serif">
                 {item.title}
               </h3>

               <p className="text-gray-500 mb-8 flex-grow text-sm leading-relaxed line-clamp-3">
                 {item.summary}
               </p>
               
               <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-xs font-bold text-pau-darkBlue group-hover:text-pau-gold transition-colors uppercase tracking-wide">
                   {shared.buttons.readMore}
                 </span>
                 <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-pau-blue group-hover:text-white transition-all duration-300">
                    <ArrowLongRightIcon className="h-4 w-4" />
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
