import React from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'blue' | 'gold';
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  variant = 'blue' 
}) => {
  const variantClasses = {
    blue: {
      card: 'bg-gradient-to-br from-blue-50 to-pau-light border border-blue-100',
      icon: 'bg-pau-blue text-white'
    },
    gold: {
      card: 'bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100',
      icon: 'bg-pau-gold text-pau-darkBlue'
    }
  };

  const classes = variantClasses[variant];

  return (
    <div className={`${classes.card} p-6 rounded-2xl hover:shadow-lg transition-all`}>
      <div className="flex items-start">
        <div className={`w-8 h-8 ${classes.icon} rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1`}>
          {Icon ? <Icon className="h-5 w-5" /> : <CheckBadgeIcon className="h-5 w-5" />}
        </div>
        <div>
          <h4 className="font-bold text-pau-darkBlue mb-1">{title}</h4>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};








