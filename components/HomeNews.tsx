
import React from 'react';
import { NewsItem, SharedContent } from '../types';
import { CalendarDaysIcon, ArrowLongRightIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface HomeNewsProps {
  title: string;
  newsItems: NewsItem[];
  onNewsClick: (item: NewsItem) => void;
  shared: SharedContent;
}

export const HomeNews: React.FC<HomeNewsProps> = ({ title, newsItems, onNewsClick, shared }) => {
  // Sort pinned items to the top
  const sortedNews = [...newsItems].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

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
          {sortedNews.map((item, idx) => {
             const thumbnail = item.images && item.images.length > 0 ? item.images[0] : (item as any).imageUrl;
             return (
               <article 
                 key={item.id} 
                 className={`flex flex-col bg-white h-full rounded-xl shadow-sm border hover:shadow-card hover:-translate-y-2 transition-all duration-300 cursor-pointer group overflow-hidden ${item.isPinned ? 'border-pau-blue/30' : 'border-gray-100'}`}
                 onClick={() => onNewsClick(item)}
                 style={{ transitionDelay: `${idx * 50}ms` }}
               >
                 <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                    {thumbnail ? (
                      <img 
                        src={thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                         <PhotoIcon className="h-12 w-12" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {item.isPinned && (
                        <span className="inline-flex items-center bg-pau-blue text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-lg">
                          <BookmarkSolidIcon className="h-3 w-3 mr-1" />
                          Featured
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm
                        ${item.category === 'Event' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                          item.category === 'Academic' ? 'bg-blue-50 text-pau-blue border-blue-100' :
                          'bg-white text-gray-600 border-gray-200'
                        }`}>
                        {item.category}
                      </span>
                    </div>
                 </div>

                 <div className="p-8 flex flex-col flex-grow">
                   <div className="flex items-center text-gray-400 text-xs font-medium mb-4">
                      <CalendarDaysIcon className="h-3 w-3 mr-1.5" />
                      {item.date}
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
                 </div>
               </article>
             );
          })}
        </div>
      </div>
    </section>
  )
}
