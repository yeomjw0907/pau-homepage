
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
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-60 animate-fade-in transform scale-105 duration-[30s] ease-out hover:scale-100 transition-transform"
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Law School Campus"
        />
        {/* Overlay Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-pau-darkBlue/90 via-pau-darkBlue/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-transparent to-transparent opacity-90" />
      </div>

      {/* Main Content Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full pt-20">
        <div className="max-w-4xl animate-fade-in-up">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-glow">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pau-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pau-gold"></span>
            </span>
            <span className="text-pau-goldLight font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
              Vision for the Future
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] mb-8 tracking-tight drop-shadow-lg">
            {content.heroTitle}
          </h1>

          {/* Subtitle / Description - Glass Panel */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border-l-4 border-pau-gold max-w-2xl mb-12 shadow-2xl">
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed">
              {content.heroSubtitle}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button 
              onClick={() => onNavigate('admissions')}
              className="group relative px-8 py-4 bg-pau-gold text-white font-bold text-sm tracking-widest uppercase rounded shadow-lg overflow-hidden transition-all hover:bg-white hover:text-pau-blue hover:shadow-glow"
            >
              <span className="relative z-10 flex items-center justify-center">
                {shared.buttons.applyNow}
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => onNavigate('admissions')}
              className="px-8 py-4 border border-white/30 bg-transparent text-white font-bold text-sm tracking-widest uppercase rounded hover:bg-white/10 hover:border-white/60 transition-colors backdrop-blur-sm"
            >
              {shared.buttons.requestInfo}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow text-white/50 z-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</span>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
