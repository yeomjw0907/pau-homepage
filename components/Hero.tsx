
import React from 'react';
import { HomeContent, SharedContent, Page } from '../types';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  content: HomeContent;
  shared: SharedContent;
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, shared, onNavigate }) => {
  return (
    <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-pau-darkBlue">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60 animate-fade-in"
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Law School Campus"
        />
        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pau-darkBlue via-pau-blue/80 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full pt-20">
        <div className="max-w-4xl animate-fade-in-up">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="h-[2px] w-12 bg-pau-gold"></div>
            <span className="text-pau-gold font-bold tracking-[0.2em] uppercase text-sm">
              Established 1978
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 drop-shadow-lg">
            {content.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed mb-10 border-l-4 border-pau-gold pl-6">
            {content.heroSubtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => onNavigate('admissions')}
              className="group relative px-8 py-4 bg-pau-gold text-white font-bold rounded-sm overflow-hidden transition-all hover:bg-white hover:text-pau-blue shadow-lg"
            >
              <span className="relative z-10 flex items-center">
                {shared.buttons.applyNow}
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => onNavigate('admissions')}
              className="px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold rounded-sm hover:bg-white/10 transition-colors"
            >
              {shared.buttons.requestInfo}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow text-white/70 cursor-pointer z-20">
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <ChevronDownIcon className="h-6 w-6" />
      </div>
    </div>
  );
};
