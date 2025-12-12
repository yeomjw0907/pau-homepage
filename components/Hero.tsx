
import React from 'react';
import { HomeContent, SharedContent, Page } from '../types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface HeroProps {
  content: HomeContent;
  shared: SharedContent;
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, shared, onNavigate }) => {
  return (
    <div className="relative bg-pau-blue h-[85vh] min-h-[600px] overflow-hidden flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover transform scale-105"
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Law School Library Study"
        />
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pau-blue/95 via-pau-blue/80 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-pau-gold/50 bg-pau-blue/50 backdrop-blur-sm">
             <span className="text-pau-gold text-xs font-bold uppercase tracking-widest">
               Future of Legal Education
             </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight drop-shadow-md">
            {content.heroTitle}
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-100 font-light leading-relaxed max-w-2xl border-l-4 border-pau-gold pl-6">
            {content.heroSubtitle}
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('admissions')}
              className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-full shadow-lg text-pau-blue bg-white hover:bg-pau-gold hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              {shared.buttons.applyNow}
            </button>
            <button 
              onClick={() => onNavigate('admissions')}
              className="inline-flex justify-center items-center px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-base font-bold rounded-full text-white hover:bg-white hover:text-pau-blue transition-all duration-300"
            >
              {shared.buttons.requestInfo}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
