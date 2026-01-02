
import React from 'react';
import { NewsItem, SharedContent, Page } from '../types';
import { CalendarDaysIcon, ArrowLongRightIcon, InformationCircleIcon, ClipboardDocumentCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface HomeNewsProps {
  title: string;
  newsItems: NewsItem[];
  onNewsClick: (item: NewsItem) => void;
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

export const HomeNews: React.FC<HomeNewsProps> = ({ title, newsItems, onNewsClick, onNavigate, shared }) => {
  const staticAdmissionsNews = [
    {
      id: 'n1',
      title: "Rolling Admissions",
      date: "Open Year-Round",
      summary: "Accepting applications year-round for Winter, Spring, and Fall terms.",
      icon: ClipboardDocumentCheckIcon,
      category: 'Admissions',
      targetPage: 'admissions' as Page
    },
    {
      id: 'n2',
      title: "Academic Calendar & Start Dates",
      date: "2026-2027",
      summary: "Incoming First-Year (1L): January, April, or September\n\nSecond-Year (2L) & Third-Year (3L): March, July, or November\n\nFourth-Year (4L): January, July, or November",
      icon: ClockIcon,
      category: 'Academic',
      targetPage: 'academic-calendar' as Page
    },
    {
      id: 'n3',
      title: "FYLSX Requirement",
      date: "Important Notice",
      summary: "Students must pass the 'Baby Bar' (FYLSX) after the first year.",
      icon: InformationCircleIcon,
      category: 'Compliance',
      targetPage: 'bar-info' as Page
    }
  ];

  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-pau-warm skew-x-12 transform translate-x-1/3 -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <div className="flex items-center space-x-2 mb-3">
               <span className="h-px w-8 bg-pau-gold"></span>
               <span className="text-pau-gold font-bold tracking-widest uppercase text-xs">University Updates</span>
             </div>
             <h2 className="text-4xl font-serif font-bold text-pau-darkBlue">Admissions & Announcements</h2>
          </div>
          <button 
            onClick={() => onNavigate('notices')}
            className="hidden md:block px-8 py-3 border border-gray-200 text-sm font-bold text-gray-600 rounded-full hover:border-pau-blue hover:text-white hover:bg-pau-blue transition-all bg-white shadow-sm"
          >
             View All Announcements
          </button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {staticAdmissionsNews.map((item, idx) => {
             const Icon = item.icon;
             return (
               <article 
                 key={item.id} 
                 className={`flex flex-col bg-white h-full rounded-xl shadow-sm border border-gray-100 hover:shadow-card hover:-translate-y-2 transition-all duration-300 group overflow-hidden cursor-pointer`}
                 style={{ transitionDelay: `${idx * 50}ms` }}
                 onClick={() => onNavigate(item.targetPage)}
               >
                 <div className="h-48 w-full bg-pau-light relative flex items-center justify-center">
                    <Icon className="h-16 w-16 text-pau-gold/40 group-hover:text-pau-gold transition-colors duration-500" />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm bg-white text-pau-blue border-blue-50`}>
                        {item.category}
                      </span>
                    </div>
                 </div>

                 <div className="p-8 flex flex-col flex-grow">
                   <div className="flex items-center text-gray-400 text-xs font-medium mb-4">
                      <CalendarDaysIcon className="h-3 w-3 mr-1.5 text-pau-gold" />
                      {item.date}
                   </div>
                   
                   <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors leading-tight font-serif">
                     {item.title}
                   </h3>

                   <p className="text-gray-500 mb-8 flex-grow text-sm leading-relaxed whitespace-pre-line">
                     {item.summary}
                   </p>
                   
                   <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                     <span className="text-xs font-bold text-gray-400 group-hover:text-pau-darkBlue transition-colors uppercase tracking-wide">
                       Learn More
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
