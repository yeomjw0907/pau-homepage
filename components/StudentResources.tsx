
import React from 'react';
import { AcademicCapIcon, ComputerDesktopIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface Resource {
  title: string;
  description: string;
  icon: 'academic' | 'research' | 'fraternity';
}

interface StudentResourcesProps {
  title: string;
  subtitle: string;
  resources: Resource[];
}

export const StudentResources: React.FC<StudentResourcesProps> = ({ title, subtitle, resources }) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'academic':
        return <AcademicCapIcon className="h-8 w-8" />;
      case 'research':
        return <ComputerDesktopIcon className="h-8 w-8" />;
      case 'fraternity':
        return <UserGroupIcon className="h-8 w-8" />;
      default:
        return <AcademicCapIcon className="h-8 w-8" />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-pau-darkBlue to-pau-blue pt-44 pb-24 sm:pb-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-pau-darkBlue/90 to-pau-blue/95" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pau-gold rounded-full mb-8 shadow-2xl">
            <AcademicCapIcon className="h-10 w-10 text-pau-darkBlue" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white sm:text-6xl mb-6">{title}</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">{subtitle}</p>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {resources.map((resource, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-pau-gold transition-all duration-300 group"
            >
              {/* Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-pau-blue via-pau-gold to-pau-blue"></div>
              
              <div className="p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-pau-light rounded-xl flex items-center justify-center text-pau-blue group-hover:bg-pau-blue group-hover:text-white transition-all duration-300 shadow-md group-hover:shadow-xl">
                    {getIcon(resource.icon)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-bold text-pau-darkBlue mb-4 group-hover:text-pau-blue transition-colors">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-base">
                  {resource.description}
                </p>
              </div>

              {/* Bottom Decoration */}
              <div className="px-8 pb-6">
                <div className="h-1 w-16 bg-pau-gold rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-r from-pau-light to-white rounded-3xl p-10 border border-gray-200 shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-pau-darkBlue mb-4">
              Committed to Your Success
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Pacific American University School of Law provides comprehensive support systems to ensure every student has the resources needed to excel academically and professionally. From personalized academic guidance to professional networking opportunities, we are dedicated to helping you achieve your legal career goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

















