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
    <div className="relative h-screen min-h-[600px] md:min-h-[850px] w-full overflow-hidden bg-pau-darkBlue text-white font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pau-darkBlue/80 via-pau-darkBlue/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        <img
          className="w-full h-full object-cover animate-fade-in transition-all duration-1000 brightness-[0.8] contrast-[1.1]"
          src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwk0a6soHRrVgCr9F0rREJzwmJ6ku_WZkAaAZsT45aBYhQduQ2FlBCCxDf0JrB6VB2FY55tUN5RzBkMKIz9V7D5CNTludL-D5zt3HV9WiKB96MGlHDM4tp1-n0yhCcGqca_dne54A=s3000-rw"
          alt="Pacific American University Law Campus"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-4 md:mb-8">
            <span className="w-6 md:w-8 h-[2px] bg-pau-gold"></span>
            <span className="text-[9px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.35em] uppercase text-gray-200 drop-shadow-md">
              The Future of Legal Education
            </span>
          </div>

          {/* Adjusted Typography for mobile: text-3xl instead of 4xl, tighter leading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight md:leading-[1.4] lg:leading-[1.6] mb-6 md:mb-12 text-white drop-shadow-2xl">
            Legal Education <br className="hidden sm:block" /> Without Borders
          </h1>

          <p className="text-base md:text-2xl text-gray-100 font-light leading-relaxed mb-8 md:mb-12 max-w-2xl drop-shadow-lg">
            Overcome geographic boundaries through innovation. Master American law from anywhere with our flexible J.D. program.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('admissions')}
              className="px-6 md:px-10 py-4 md:py-5 bg-pau-gold text-white font-bold text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center group transition-all hover:bg-pau-goldDark shadow-premium"
            >
              APPLY NOW <ArrowRightIcon className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => onNavigate('academics')}
              className="px-6 md:px-10 py-4 md:py-5 bg-white/5 border border-white/20 text-white font-bold text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - Hidden on small mobile screens to reduce clutter */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-pau-gold rounded-full"></div>
        </div>
      </div>
    </div>
  );
};