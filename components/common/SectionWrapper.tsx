import React from 'react';

interface SectionWrapperProps {
  title?: string;
  children: React.ReactNode;
  centered?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children, centered = false }) => (
  <section className={`py-12 md:py-24 px-6 bg-white ${centered ? 'text-center' : ''}`}>
    <div className="max-w-7xl mx-auto">
      {title && (
        <div className={`flex items-center space-x-4 mb-8 md:mb-16 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 md:w-12 bg-pau-gold"></span>
          <h2 className="text-pau-gold font-bold tracking-widest uppercase text-[10px] md:text-xs">{title}</h2>
        </div>
      )}
      {children}
    </div>
  </section>
);



