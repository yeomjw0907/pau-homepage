
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
    <div className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-pau-darkBlue">
      {/* Background Image with Scale Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="w-full h-full object-cover opacity-80 animate-fade-in transform scale-105"
          style={{ transition: 'transform 20s ease-out' }}
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Law School Campus"
        />
        {/* Sophisticated Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-pau-darkBlue/90 via-pau-blue/60 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-transparent to-transparent opacity-90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full pt-32">
        <div className="max-w-4xl animate-fade-in-up">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-3 mb-8 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            <span className="h-1.5 w-1.5 rounded-full bg-pau-gold"></span>
            <span className="text-pau-goldLight font-bold tracking-[0.15em] uppercase text-xs">
              Established 1978 • California
            </span>
          </div>

          {/* Title with Text Shadow */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] mb-8 text-shadow tracking-tight">
            {content.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed mb-12 border-l-4 border-pau-gold pl-8 bg-gradient-to-r from-black/30 to-transparent py-2">
            {content.heroSubtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => onNavigate('admissions')}
              className="group relative px-10 py-5 bg-pau-gold text-white font-bold text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-all hover:bg-white hover:text-pau-blue shadow-glow"
            >
              <span className="relative z-10 flex items-center">
                {shared.buttons.applyNow}
                <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => onNavigate('admissions')}
              className="px-10 py-5 border border-white/30 bg-white/5 backdrop-blur-md text-white font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              {shared.buttons.requestInfo}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow text-white/60 cursor-pointer z-20 hover:text-white transition-colors">
        <span className="text-[10px] uppercase tracking-[0.3em] mb-3">Explore</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};
