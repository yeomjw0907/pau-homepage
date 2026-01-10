import React, { useState, useEffect, useTransition, useMemo } from 'react';
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
    <div className="py-8 md:py-12 border-b border-gray-100 last:border-0 flex flex-col md:flex-row gap-6 md:gap-12 group animate-fade-in">
      {/* Photo Column */}
      <div className="flex-shrink-0 flex justify-center md:block">
        <div className="w-40 md:w-56 aspect-[3/4] bg-gray-100 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500 rounded-lg border border-gray-100">
          {prof.photoUrl ? (
            <img src={prof.photoUrl} alt={prof.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
              <UserIcon className="h-16 w-16 stroke-1" />
            </div>
          )}
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-grow">
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h3 className="text-xl md:text-3xl font-serif font-bold text-pau-darkBlue mb-2 leading-tight flex items-baseline gap-2 flex-wrap justify-center md:justify-start">
            <span>{prof.name}</span>
            {prof.credential && (
              <span className="text-sm md:text-lg font-serif italic text-gray-500 font-normal">
                {prof.credential}
              </span>
            )}
          </h3>
          <p className="text-pau-blue font-bold mb-2 md:mb-3 text-[10px] md:text-sm uppercase tracking-[0.15em] md:border-l-2 md:border-pau-gold md:pl-4">
            {prof.title}
          </p>
          {prof.additionalInfo && (
            <p className="text-pau-blue font-bold mb-4 md:mb-6 text-[10px] md:text-sm uppercase tracking-[0.15em] md:border-l-2 md:border-pau-gold md:pl-4">
              {prof.additionalInfo}
            </p>
          )}
          
          <div className="flex flex-col space-y-2 text-[12px] md:text-sm text-gray-500 font-medium bg-gray-50/50 p-4 rounded-xl border border-gray-100 text-left">
            {prof.phone && (
              <div className="flex flex-wrap items-center">
                <span className="font-bold text-gray-400 w-16 md:w-20">Phone:</span> 
                <span className="text-gray-700">{prof.phone}</span>
              </div>
            )}
            {prof.email && (
              <div className="flex flex-wrap items-center overflow-hidden">
                <span className="font-bold text-gray-400 w-16 md:w-20">Email:</span> 
                <a href={`mailto:${prof.email}`} className="text-pau-blue hover:text-pau-gold transition-colors font-bold underline decoration-pau-gold/30 break-all">
                  {prof.email}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <div className="border-t border-gray-100">
            <button 
              onClick={() => onToggleEd(prof.name)}
              className="w-full py-3 flex items-center justify-between text-left"
            >
              <span className="text-[9px] md:text-xs font-bold text-pau-darkBlue uppercase tracking-[0.15em]">Education</span>
              <div className={`p-1 border rounded transition-colors ${isEdExpanded ? 'border-pau-gold' : 'border-gray-200'}`}>
                {isEdExpanded ? <MinusIcon className="h-3 w-3 text-pau-gold" /> : <PlusIcon className="h-3 w-3 text-gray-400" />}
              </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isEdExpanded ? 'grid-rows-[1fr] opacity-100 pb-3' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <ul className="space-y-1 pl-4 border-l border-pau-gold/20 ml-1">
                  {prof.education.map((ed, idx) => (
                    <li key={idx} className="text-[13px] text-gray-600 font-light leading-snug">{ed}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <button 
              onClick={() => onToggleBio(prof.name)}
              className="w-full py-3 flex items-center justify-between text-left"
            >
              <span className="text-[9px] md:text-xs font-bold text-pau-darkBlue uppercase tracking-[0.15em]">Background</span>
              <div className={`p-1 border rounded transition-colors ${isBioExpanded ? 'border-pau-gold' : 'border-gray-200'}`}>
                {isBioExpanded ? <MinusIcon className="h-3 w-3 text-pau-gold" /> : <PlusIcon className="h-3 w-3 text-gray-400" />}
              </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isBioExpanded ? 'grid-rows-[1fr] opacity-100 pb-3' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="pl-4 border-l border-pau-gold/20 ml-1">
                  <p className="text-[13px] text-gray-600 font-light leading-relaxed whitespace-pre-line">
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
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (currentPage === 'admin-staffs') {
      setActiveTab('Staff');
    } else {
      setActiveTab('Faculty');
    }
  }, [currentPage]);

  const handleTabChange = (tab: 'Faculty' | 'Staff') => {
    // Update UI immediately for responsive feedback
    setActiveTab(tab);
    // Defer navigation to avoid blocking UI updates
    startTransition(() => {
      onNavigate(tab === 'Faculty' ? 'faculty' : 'admin-staffs');
    });
  };

  const toggleEducation = (name: string) => {
    setExpandedEducation(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleBio = (name: string) => {
    setExpandedBio(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredProfiles = useMemo(() => 
    content.facultyList.filter(prof => 
      activeTab === 'Faculty' ? prof.category === 'Faculty' : prof.category === 'Staff'
    ), [content.facultyList, activeTab]
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="bg-pau-darkBlue pt-32 md:pt-44 pb-12 md:pb-24 px-6 text-center">
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
           <h1 className="text-2xl md:text-6xl font-serif font-bold text-white leading-tight mb-4 md:mb-6">
             {activeTab === 'Faculty' ? 'Academic Faculty' : 'Administrative Team'}
           </h1>
           <p className="text-xs md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
             Dedicated professionals committed to excellence in legal education.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <aside className="lg:w-80 flex-shrink-0">
             <div className="flex justify-center lg:justify-start lg:flex-col gap-3 md:gap-4 p-2 md:p-6 bg-gray-50 rounded-2xl md:rounded-3xl border border-gray-100 overflow-x-auto no-scrollbar">
                <button 
                  onClick={() => handleTabChange('Faculty')}
                  className={`flex-shrink-0 md:w-full py-3 md:py-5 px-4 md:px-6 rounded-xl text-[9px] md:text-[11px] font-bold uppercase tracking-widest transition-all ${
                    activeTab === 'Faculty' 
                    ? 'bg-pau-blue text-white shadow-md' 
                    : 'bg-white text-gray-400 border border-gray-200'
                  }`}
                >
                  Academic Faculty
                </button>
                <button 
                  onClick={() => handleTabChange('Staff')}
                  className={`flex-shrink-0 md:w-full py-3 md:py-5 px-4 md:px-6 rounded-xl text-[9px] md:text-[11px] font-bold uppercase tracking-widest transition-all ${
                    activeTab === 'Staff' 
                    ? 'bg-pau-blue text-white shadow-md' 
                    : 'bg-white text-gray-400 border border-gray-200'
                  }`}
                >
                  Administrative Staff
                </button>
             </div>
          </aside>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-xl md:text-4xl font-serif font-bold text-pau-darkBlue text-center sm:text-left">
                {activeTab === 'Faculty' ? 'Faculty Profiles' : 'Team Members'}
              </h2>
              
              <div className="flex items-center space-x-2">
                <span className="text-lg md:text-2xl font-bold text-pau-blue">{filteredProfiles.length}</span>
                <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Profiles</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredProfiles.length > 0 ? (
                <div className="flex flex-col">
                  {filteredProfiles.map((member) => (
                    <FacultyItem 
                      key={member.name} 
                      prof={member} 
                      isEdExpanded={!!expandedEducation[member.name]}
                      isBioExpanded={!!expandedBio[member.name]}
                      onToggleEd={toggleEducation}
                      onToggleBio={toggleBio}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-gray-400 italic text-sm">No profiles found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};