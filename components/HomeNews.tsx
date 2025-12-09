
import React from 'react';
import { NewsItem, SharedContent } from '../types';

interface HomeNewsProps {
  title: string;
  newsItems: NewsItem[];
  onNewsClick: (item: NewsItem) => void;
  shared: SharedContent;
}

export const HomeNews: React.FC<HomeNewsProps> = ({ title, newsItems, onNewsClick, shared }) => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {title && <h2 className="text-3xl font-serif font-bold text-pau-blue mb-10 text-center">{title}</h2>}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
             <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full">
               <div className="flex justify-between items-center mb-3">
                 <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                   item.category === 'Event' ? 'bg-blue-100 text-blue-800' :
                   item.category === 'Academic' ? 'bg-green-100 text-green-800' :
                   'bg-gray-100 text-gray-800'
                 }`}>
                   {item.category}
                 </span>
                 <span className="text-sm text-gray-500">{item.date}</span>
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-pau-blue" onClick={() => onNewsClick(item)}>
                 {item.title}
               </h3>
               <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{item.summary}</p>
               <button 
                 onClick={() => onNewsClick(item)} 
                 className="inline-block text-pau-blue font-medium hover:text-pau-gold text-sm text-left w-fit"
               >
                 {shared.buttons.readMore} &rarr;
               </button>
             </div>
          ))}
        </div>
      </div>
    </section>
  )
}
