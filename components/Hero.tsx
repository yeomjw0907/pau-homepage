
import React, { useState } from 'react';
import { HomeContent, SharedContent, Page } from '../types';
import { ArrowRightIcon, ChevronDownIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  content: HomeContent;
  shared: SharedContent;
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, shared, onNavigate }) => {
  return (
    <div className="relative h-screen min-h-[800px] w-full overflow-hidden bg-pau-darkBlue text-white">
      {/* Dynamic Background with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        {/* Adjusted gradients to ensure white navbar text is readable against the sunny sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10 h-32" />
        <div className="absolute inset-0 bg-gradient-to-r from-pau-darkBlue/80 via-pau-darkBlue/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-transparent to-transparent z-10" />
        
        <img
          className="w-full h-full object-cover animate-fade-in scale-105 hover:scale-110 transition-transform duration-[40s] ease-linear"
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Pacific American University Campus"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-20">
        <div className="max-w-4xl space-y-8 animate-fade-in-up">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
             <span className="w-2 h-2 rounded-full bg-pau-gold animate-pulse"></span>
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-pau-goldLight">
               The Future of Legal Education
             </span>
          </div>

          {/* Headline - Added space-y-3 for better line separation */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-relaxed tracking-tight drop-shadow-2xl space-y-3">
            {content.heroTitle.split('\n').map((line, i) => (
              <span key={i} className="block text-white">
                {line}
              </span>
            ))}
          </h1>

          {/* Subtitle with distinct styling */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-2xl border-l-2 border-pau-gold pl-6">
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
              {content.heroSubtitle}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <button 
              onClick={() => onNavigate('admissions')}
              className="group relative px-8 py-4 bg-pau-gold text-white font-bold text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-all hover:bg-white hover:text-pau-darkBlue shadow-glow min-w-[180px]"
            >
              <span className="relative z-10 flex items-center justify-center">
                {shared.buttons.applyNow}
                <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => onNavigate('academics')}
              className="group px-8 py-4 bg-transparent border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm flex items-center justify-center min-w-[180px]"
            >
              <PlayCircleIcon className="mr-3 h-6 w-6 text-pau-gold group-hover:text-white transition-colors" />
              {shared.buttons.learnMore}
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Stats Strip in Hero */}
      <div className="absolute bottom-0 w-full z-20 border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="flex flex-col border-r border-white/10 last:border-0">
                 <div className="text-pau-gold font-serif text-3xl font-bold">#1</div>
                 <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Online JD Program</div>
              </div>
              <div className="flex flex-col border-r border-white/10 last:border-0">
                 <div className="text-pau-gold font-serif text-3xl font-bold">15:1</div>
                 <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Student-Faculty Ratio</div>
              </div>
              <div className="flex flex-col border-r border-white/10 last:border-0">
                 <div className="text-pau-gold font-serif text-3xl font-bold">100%</div>
                 <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Bar Prep Included</div>
              </div>
              <div className="hidden md:flex justify-end items-center">
                 <div className="animate-bounce-slow text-white/50 cursor-pointer hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest">Scroll Down</span>
                    <ChevronDownIcon className="h-5 w-5" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};