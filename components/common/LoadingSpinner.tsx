import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <div className={`${sizeClasses[size]} border-4 border-pau-light border-t-pau-blue rounded-full animate-spin mx-auto mb-4`}></div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};












