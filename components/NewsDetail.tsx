
import React from 'react';
import { NewsItem, SharedContent } from '../types';
import { ArrowLeftIcon, CalendarDaysIcon, TagIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface NewsDetailProps {
  item: NewsItem;
  onBack: () => void;
  shared: SharedContent;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ item, onBack, shared }) => {
  const images = item.images && item.images.length > 0 ? item.images : ((item as any).imageUrl ? [(item as any).imageUrl] : []);
  const isNewsletter = item.category === 'Newsletter';

  return (
    <div className="bg-white min-h-screen pt-44 pb-16 px-4 sm:px-6 lg:px-8">
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

        <article className={`bg-white ${isNewsletter ? 'newsletter-layout' : ''}`}>
          <header className="mb-10 pb-10 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <span className={`flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${item.category === 'Event' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                  item.category === 'Academic' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                  item.category === 'Newsletter' ? 'bg-pau-blue text-white' :
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
            
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-pau-blue leading-tight mb-8">
              {item.title}
            </h1>

            {images.length > 0 && (
              <div className="space-y-4 mb-10">
                <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                   <img src={images[0]} alt={item.title} className="w-full h-full object-cover" />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.slice(1).map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </header>

          <div 
            className={`prose prose-lg prose-blue text-gray-700 leading-relaxed font-sans max-w-none mb-16 ${isNewsletter ? 'prose-newsletter' : ''}`}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
          
          <div className="mt-16 bg-gray-50 p-8 rounded-xl border border-gray-100 border-l-4 border-l-pau-gold">
             <h3 className="text-sm font-bold text-pau-darkBlue uppercase tracking-widest mb-3">{shared.labels.aboutPauNews}</h3>
             <p className="text-gray-600 leading-relaxed">
               {shared.labels.aboutPauNewsDetail}
             </p>
          </div>
        </article>
      </div>
      <style>{`
        .prose-newsletter h3 {
          font-family: 'Libre Baskerville', serif;
          color: #002855;
          border-bottom: 2px solid #B38B59;
          padding-bottom: 0.5rem;
          margin-top: 3.5rem;
          font-size: 1.625rem;
          line-height: 1.2;
        }
        .prose-newsletter p {
          margin-bottom: 1.25rem;
        }
        .prose-newsletter ul {
          margin-top: 1rem;
          margin-bottom: 1.5rem;
          padding-left: 0;
          list-style: none;
        }
        .prose-newsletter li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-newsletter li::before {
          content: "•";
          position: absolute;
          left: 0.25rem;
          color: #B38B59;
          font-weight: bold;
        }
        .prose-newsletter hr {
          margin: 3rem 0;
          border-top: 1px solid #e2e8f0;
        }
        .prose-newsletter blockquote {
          border-left: 4px solid #B38B59;
          padding: 1.5rem 2rem;
          background: #f8fafc;
          border-radius: 0 1rem 1rem 0;
          font-style: italic;
          color: #4a5568;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
};
