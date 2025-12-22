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
    <div className="relative h-screen min-h-[750px] md:min-h-[850px] w-full overflow-hidden bg-pau-darkBlue text-white font-sans">
      {/* Background Image - Scaled up to High Resolution (s3000) */}
      <div className="absolute inset-0 z-0">
        {/* Professional Overlay for Contrast and Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-pau-darkBlue/70 via-pau-darkBlue/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/10 z-10" />
        
        <img
          className="w-full h-full object-cover animate-fade-in transition-all duration-1000 brightness-[0.85] contrast-[1.1]"
          src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwk0a6soHRrVgCr9F0rREJzwmJ6ku_WZkAaAZsT45aBYhQduQ2FlBCCxDf0JrB6VB2FY55tUN5RzBkMKIz9V7D5CNTludL-D5zt3HV9WiKB96MGlHDM4tp1-n0yhCcGqca_dne54A=s3000-rw"
          alt="Pacific American University Law Campus Skyscraper"
        />
      </div>

      {/* Hero Content - Responsive Typography and Spacing */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-6 md:mb-8">
            <span className="w-8 h-[2px] bg-pau-gold"></span>
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.35em] uppercase text-gray-200 drop-shadow-md">
              The Future of Legal Education
            </span>
          </div>

          {/* Optimized responsive leading and font size to prevent overlapping on mobile while keeping desktop elegance */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.2] md:leading-[1.6] lg:leading-[2.0] mb-8 md:mb-12 text-white drop-shadow-2xl">
            Legal Education <br className="hidden md:block" /> Without Borders
          </h1>

          <p className="text-lg md:text-2xl text-gray-100 font-light leading-relaxed mb-10 md:mb-12 max-w-2xl drop-shadow-lg">
            Overcome geographic boundaries through innovation. Master American law from anywhere with our flexible, technology-driven J.D. program.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
            <button 
              onClick={() => onNavigate('admissions')}
              className="px-8 md:px-10 py-4 md:py-5 bg-pau-gold text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center group transition-all hover:bg-pau-goldDark shadow-premium transform hover:-translate-y-1"
            >
              APPLY NOW <ArrowRightIcon className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => onNavigate('academics')}
              className="px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white/40 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <PlayCircleIcon className="mr-3 h-5 w-5" /> LEARN MORE
            </button>
          </div>
        </div>
      </div>

      {/* Aesthetic Navigation Dots - Hidden on very small screens for clarity */}
      <div className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-4">
        <div className="w-2 h-2 rounded-full bg-pau-gold shadow-glow"></div>
        <div className="w-2 h-2 rounded-full bg-white/30"></div>
        <div className="w-2 h-2 rounded-full bg-white/30"></div>
        <div className="w-2 h-2 rounded-full bg-white/30"></div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-pau-gold rounded-full"></div>
        </div>
      </div>
    </div>
  );
};