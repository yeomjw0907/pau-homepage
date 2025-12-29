
import React from 'react';

interface TranslationOverlayProps {
  lang: string;
}

export const TranslationOverlay: React.FC<TranslationOverlayProps> = ({ lang }) => (
  <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in cursor-wait">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
      <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-pau-gold border-t-transparent animate-spin"></div>
    </div>
    <h3 className="mt-6 text-xl font-serif font-bold text-pau-darkBlue">Translating Content</h3>
    <p className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-widest">
      Converting to {lang}...
    </p>
  </div>
);
