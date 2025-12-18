
import React from 'react';
import { HomeContent, SharedContent, Page } from '../types';
import { ArrowRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  content: HomeContent;
  shared: SharedContent;
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, shared, onNavigate }) => {
  return (
    <div className="relative h-screen min-h-[850px] w-full overflow-hidden bg-pau-darkBlue text-white font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-pau-darkBlue/40 z-10" />
        <img
          className="w-full h-full object-cover animate-fade-in"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Modern Architecture"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-8 h-[2px] bg-pau-gold"></span>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-gray-200">
              The Future of Legal Education
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.2] mb-8 text-white">
            Legal Education <br /> Without Borders
          </h1>

          <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10 max-w-2xl">
            Overcome geographic boundaries through innovation. Master American law from anywhere with our flexible, technology-driven J.D. program.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('admissions')}
              className="px-10 py-4 bg-pau-gold text-white font-bold text-xs tracking-widest uppercase flex items-center group transition-all hover:bg-pau-goldDark shadow-lg"
            >
              Apply Now <ArrowRightIcon className="ml-3 h-4 w-4" />
            </button>
            <button 
              onClick={() => onNavigate('academics')}
              className="px-10 py-4 bg-transparent border border-white/40 text-white font-bold text-xs tracking-widest uppercase flex items-center hover:bg-white/10 transition-all"
            >
              <PlayCircleIcon className="mr-3 h-5 w-5" /> Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Side Bar */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-4">
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
      </div>
    </div>
  );
};
