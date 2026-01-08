import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, icon: Icon }) => (
  <div className="bg-pau-darkBlue pt-32 md:pt-44 pb-12 md:pb-20 px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <Icon className="h-10 md:h-16 w-10 md:w-16 text-pau-gold mx-auto mb-4 md:mb-6" />
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white whitespace-pre-line leading-snug md:leading-tight">{title}</h1>
      <p className="mt-4 md:mt-6 text-sm md:text-xl text-gray-300 font-light max-w-2xl mx-auto">{subtitle}</p>
    </div>
  </div>
);












