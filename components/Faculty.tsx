import React, { useState, useEffect } from 'react';
import { FacultyContent, SharedContent, FacultyMember, Page } from '../types';
import { PlusIcon, MinusIcon, UserIcon } from '@heroicons/react/24/outline';

interface FacultyItemProps {
  prof: FacultyMember;
  isEdExpanded: boolean;
  isBioExpanded: boolean;
  onToggleEd: (name: string) => void;
  onToggleBio: (name: string) => void;
}

const FacultyItem: React.FC<FacultyItemProps> = ({ 
  prof, 
  isEdExpanded, 
  isBioExpanded, 
  onToggleEd, 
  onToggleBio 
}) => {
  return (
    <div className="py-10 md:py-12 border-b border-gray-100 last:border-0 flex flex-col md:flex-row gap-8 md:gap-12 group animate-fade-in">
      {/* Photo Column */}
      <div className="flex-shrink-0 flex justify-center md:block">
        <div className="w-48 md:w-56 aspect-[3/4] bg-gray-100 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500 rounded-lg border border-gray-100">
          {prof.photoUrl ? (
            <img src={prof.photoUrl} alt={prof.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
              <UserIcon className="h-20 w-20 stroke-1" />
            </div>
          )}
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-grow px-2 md:px-0">
        <div className="mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-pau-darkBlue mb-2 leading-tight">
            {prof.name}{prof.expertise.length > 0 ? `, ${prof.expertise[0] === 'J.D.' ? 'J.D.' : 'Ph.D.'}` : ''}
          </h3>
          <p className="text-pau-blue font-bold mb-4 md:mb-6 text-xs md:text-sm uppercase tracking-[0.15em] border-l-2 border-pau-gold pl-4">{prof.title}</p>
          
          <div className="flex flex-col space-y-2 text-[13px] md:text-sm text-gray-500 font-medium bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            {prof.phone && (
              <div className="flex flex-wrap items-center">
                <span className="font-bold text-gray-400 w-16 md:w-20">Phone:</span> 
                <span className="text-gray-700">{prof.phone}</span>
              </div>
            )}
            {prof.email && (
              <div className="flex flex-wrap items-center overflow-hidden">
                <span className="font-bold text-gray-400 w-16 md:w-20">Email:</span> 
                <a href={`mailto:${prof.email}`} className="text-pau-blue hover:text-pau-gold transition-colors font-bold underline decoration-pau-gold/30 truncate break-all">{prof.email}</a>
              </div>
            )}
          </div>
        </div>

        {/* Education & Background Collapsibles */}
        <div className="space-y-1">
          <div className="border-t border-gray-100">
            <button 
              onClick={() => onToggleEd(prof.name)}
              className="w-full py-4 flex items-center justify-between text-left group/btn"
            >
              <span className="text-[10px] md:text-xs font-bold text-pau-darkBlue uppercase tracking-[0.2em] group-hover/btn:text-pau-gold transition-colors">Education</span>
              <div className={`p-1.5 border rounded transition-colors ${isEdExpanded ? 'border-pau-gold' : 'border-gray-200'}`}>
                {isEdExpanded ? <MinusIcon className="h-3 w-3 text-pau-gold" /> : <PlusIcon className="h-3 w-3 text-gray-400" />}
              </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isEdExpanded ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <ul className="space-y-2 pl-4 border-l border-pau-gold/20 ml-1">
                  {prof.education.map((ed, idx) => (
                    <li key={idx} className="text-sm text-gray-600 font-light">{ed}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <button 
              onClick={() => onToggleBio(prof.name)}
              className="w-full py-4 flex items-center justify-between text-left group/btn"
            >
              <span className="text-[10px] md:text-xs font-bold text-pau-darkBlue uppercase tracking-[0.2em] group-hover/btn:text-pau-gold transition-colors">Background</span>
              <div className={`p-1.5 border rounded transition-colors ${isBioExpanded ? 'border-pau-gold' : 'border-gray-200'}`}>
                {isBioExpanded ? <MinusIcon className="h-3 w-3 text-pau-gold" /> : <PlusIcon className="h-3 w-3 text-gray-400" />}
              </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isBioExpanded ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pl-4 border-l border-pau-gold/20 ml-1">
                  <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line">
                    {prof.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FacultyProps {
  content: FacultyContent;
  shared: SharedContent;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Faculty: React.FC<FacultyProps> = ({ content, shared, currentPage, onNavigate }) => {
  const [expandedEducation, setExpandedEducation] = useState<Record<string, boolean>>({});
  const [expandedBio, setExpandedBio] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'Faculty' | 'Staff'>('Faculty');

  useEffect(() => {
    if (currentPage === 'admin-staffs') {
      setActiveTab('Staff');
    } else {
      setActiveTab('Faculty');
    }
  }, [currentPage]);

  const handleTabChange = (tab: 'Faculty' | 'Staff') => {
    setActiveTab(tab);
    onNavigate(tab === 'Faculty' ? 'faculty' : 'admin-staffs');
  };

  const toggleEducation = (name: string) => {
    setExpandedEducation(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleBio = (name: string) => {
    setExpandedBio(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredFaculty = content.facultyList.filter(prof => 
    activeTab === 'Faculty' ? prof.category === 'Faculty' : prof.category === 'Staff'
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Header */}
      <div className="bg-pau-darkBlue pt-44 pb-16 md:pb-24 px-6 text-center">
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
           <h1 className="text-3xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
             {activeTab === 'Faculty' ? 'Academic Faculty' : 'Administrative Team'}
           </h1>
           <p className="text-sm md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
             Dedicated professionals committed to excellence in legal education and student support.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Sidebar Nav - Matched to User Image Style */}
          <aside className="lg:w-80 flex-shrink-0">
             <div className="sticky top-32 flex flex-col gap-4 p-5 md:p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <button 
                  onClick={() => handleTabChange('Faculty')}
                  className={`w-full py-4 md:py-5 px-6 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border shadow-sm ${
                    activeTab === 'Faculty' 
                    ? 'bg-pau-blue text-white border-pau-blue shadow-md' 
                    : 'bg-white text-gray-400 border-gray-200 hover:border-pau-blue/50 hover:text-pau-blue'
                  }`}
                >
                  Full-Time Faculty
                </button>
                <button 
                  onClick={() => handleTabChange('Staff')}
                  className={`w-full py-4 md:py-5 px-6 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border shadow-sm ${
                    activeTab === 'Staff' 
                    ? 'bg-pau-blue text-white border-pau-blue shadow-md' 
                    : 'bg-white text-gray-400 border-gray-200 hover:border-pau-blue/50 hover:text-pau-blue'
                  }`}
                >
                  Administrative Staff
                </button>
             </div>
          </aside>

          {/* Main List */}
          <div className="flex-grow px-2 md:px-0">
            {/* Header with Circular Badge - Responsive layout to prevent overlapping */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-pau-darkBlue text-center sm:text-left">
                {activeTab === 'Faculty' ? 'Faculty Profiles' : 'Administrative Team'}
              </h2>
              
              <div className="flex-shrink-0 relative h-16 w-16 md:h-20 md:w-20 rounded-full bg-gray-50 border border-gray-100 flex flex-col items-center justify-center shadow-inner group overflow-hidden">
                <div className="absolute inset-0 bg-pau-blue/0 group-hover:bg-pau-blue/5 transition-colors"></div>
                <span className="text-lg md:text-xl font-bold text-pau-blue relative z-10 leading-none">
                  {filteredFaculty.length}
                </span>
                <span className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest relative z-10 mt-1">
                  Profiles
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredFaculty.length > 0 ? (
                <div className="flex flex-col">
                  {filteredFaculty.map((prof) => (
                    <FacultyItem 
                      key={prof.name} 
                      prof={prof} 
                      isEdExpanded={!!expandedEducation[prof.name]}
                      isBioExpanded={!!expandedBio[prof.name]}
                      onToggleEd={toggleEducation}
                      onToggleBio={toggleBio}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <UserIcon className="h-16 w-16 text-gray-100 mx-auto mb-4" />
                  <p className="text-gray-400 italic">No profiles found.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};