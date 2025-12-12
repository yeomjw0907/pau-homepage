
import React from 'react';
import { HomeContent, SharedContent, Page } from '../types';

interface HeroProps {
  content: HomeContent;
  shared: SharedContent;
  onNavigate: (page: Page) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, shared, onNavigate }) => {
  return (
    <div className="relative bg-pau-blue overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Law School Library Study"
        />
        <div className="absolute inset-0 bg-pau-blue mix-blend-multiply opacity-80" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl drop-shadow-lg">
          {content.heroTitle}
        </h1>
        <p className="mt-6 text-xl text-gray-100 max-w-2xl font-light">
          {content.heroSubtitle}
        </p>
        
        <div className="mt-10 flex gap-4">
          <button 
            onClick={() => onNavigate('admissions')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-sm shadow-sm text-pau-blue bg-white hover:bg-gray-50 transition-colors"
          >
            {shared.buttons.applyNow}
          </button>
          <button 
            onClick={() => onNavigate('admissions')}
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-sm text-white hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            {shared.buttons.requestInfo}
          </button>
        </div>
      </div>
    </div>
  );
};
