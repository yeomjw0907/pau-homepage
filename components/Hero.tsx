
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
      {/* Background Image - Keeping the existing image as requested */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover animate-fade-in scale-105 transform transition-transform duration-[20s] hover:scale-110 brightness-[0.85]"
          src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwk0a6soHRrVgCr9F0rREJzwmJ6ku_WZkAaAZsT45aBYhQduQ2FlBCCxDf0JrB6VB2FY55tUN5RzBkMKIz9V7D5CNTludL-D5zt3HV9WiKB96MGlHDM4tp1-n0yhCcGqca_dne54A=s3000-rw"
          alt="Pacific American University Law Campus"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#051626]/90 via-[#051626]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051626] via-transparent to-black/30 z-10" />
      </div>

      {/* Hero Content */}
      {/* Adjusted padding: Reduced pb-64 to pb-20 as the overlap is removed */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center pt-24 pb-20">
        <div className="max-w-4xl animate-fade-in-up">
          
          {/* Top Label */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-pau-gold shadow-[0_0_15px_rgba(179,139,89,0.8)]"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-pau-gold/90 drop-shadow-sm font-sans">
              The Future of Legal Education
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.6] mb-8 text-white drop-shadow-xl tracking-tight">
            Legal Education <br />
            <span className="text-white">Without Borders</span>
          </h1>

          {/* Subtext */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <div className="hidden md:block w-16 h-px bg-pau-gold/50 mt-6"></div>
            <p className="text-base md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl drop-shadow-md border-l-2 md:border-l-0 border-pau-gold/50 pl-4 md:pl-0">
              Overcome geographic boundaries through innovation. Master American law from anywhere with our flexible, technology-driven J.D. program designed for the modern era.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => onNavigate('admissions')}
              className="px-10 py-5 bg-pau-gold text-white font-bold text-xs tracking-[0.15em] uppercase flex items-center justify-center rounded-sm hover:bg-white hover:text-pau-darkBlue transition-all duration-300 shadow-[0_0_20px_rgba(179,139,89,0.3)] group"
            >
              Apply Now 
              <ArrowRightIcon className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={() => onNavigate('academics')}
              className="px-10 py-5 bg-white/5 border border-white/30 text-white font-bold text-xs tracking-[0.15em] uppercase flex items-center justify-center rounded-sm hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm group"
            >
              <PlayCircleIcon className="mr-3 h-5 w-5 text-pau-gold group-hover:text-white transition-colors" />
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer animate-pulse">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white mb-3">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-pau-gold via-white/50 to-transparent"></div>
      </div>
    </div>
  );
};
