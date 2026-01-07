import React from 'react';

interface SectionHeaderProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'blue' | 'gold';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  icon: Icon,
  variant = 'blue' 
}) => {
  const variantClasses = {
    blue: 'bg-pau-blue text-white',
    gold: 'bg-pau-gold text-pau-darkBlue'
  };

  return (
    <div className="flex items-center mb-6">
      <div className={`w-12 h-12 ${variantClasses[variant]} rounded-xl flex items-center justify-center mr-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-pau-darkBlue">{title}</h2>
    </div>
  );
};








