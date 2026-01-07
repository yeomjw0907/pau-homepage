import React from 'react';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
}

export const StepCard: React.FC<StepCardProps> = ({ 
  stepNumber, 
  title, 
  description, 
  icon: Icon,
  isLast = false 
}) => {
  const isFinalStep = isLast && stepNumber === 5;
  
  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 ${isFinalStep ? 'bg-pau-gold text-pau-darkBlue' : 'bg-pau-blue text-white'} rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}>
            {stepNumber}
          </div>
        </div>
        <div className="ml-6 flex-1">
          <div className={`p-6 rounded-2xl border-2 shadow-md hover:shadow-xl transition-all ${
            isFinalStep 
              ? 'bg-gradient-to-br from-pau-gold/10 to-pau-light border-pau-gold' 
              : 'bg-white border-pau-blue'
          }`}>
            <div className="flex items-center mb-3">
              <Icon className={`h-6 w-6 ${isFinalStep ? 'text-pau-gold' : 'text-pau-blue'} mr-3`} />
              <h3 className="text-xl font-serif font-bold text-pau-darkBlue">{title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-pau-blue to-pau-gold opacity-30"></div>
      )}
    </div>
  );
};







