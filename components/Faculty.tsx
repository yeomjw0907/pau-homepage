
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

/**
 * Extracted FacultyItem to prevent re-mounting flicker when state updates.
 * This ensures CSS transitions are maintained smoothly.
 */
const FacultyItem: React.FC<FacultyItemProps> = ({ 
  prof, 
  isEdExpanded, 
  isBioExpanded, 
  onToggleEd, 
  onToggleBio 
}) => {
  return (
    <div className="py-12 border-b border-gray-100 last:border-0 flex flex-col md:flex-row gap-10 group animate-fade-in">
      {/* Photo Column */}
      <div className="flex-shrink-0">
        <div className="w-full md:w-56 aspect-[3/4] bg-gray-100 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500 rounded-sm border border-gray-100">
          {prof.photoUrl ? (
            <img src={prof.photoUrl} alt={prof.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
              <UserIcon className="h-24 w-24 stroke-1" />
            </div>
          )}
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-grow">
        <div className="mb-8">
          <h3 className="text-3xl font-serif font-bold text-pau-darkBlue mb-2">
            {prof.name}{prof.expertise.length > 0 ? `, ${prof.expertise[0] === 'J.D.' ? 'J.D.' : 'Ph.D.'}` : ''}
          </h3>
          <p className="text-pau-blue font-bold mb-6 text-sm uppercase tracking-[0.15em] border-l-2 border-pau-gold pl-4">{prof.title}</p>
          
          <div className="flex flex-col space-y-2 text-sm text-gray-500 font-medium bg-gray-50/50 p-4 rounded-lg border border-gray-100">
            {prof.phone && (
              <div className="flex items-center">
                <span className="font-bold text-gray-400 w-16">Phone:</span> 
                <span className="text-gray-700">{prof.phone}</span>
              </div>
            )}
            {prof.email && (
              <div className="flex items-center">
                <span className="font-bold text-gray-400 w-16">Email:</span> 
                <a href={`mailto:${prof.email}`} className="text-pau-blue hover:text-pau-gold transition-colors font-bold underline decoration-pau-gold/30">{prof.email}</a>
              </div>
            )}
          </div>
        </div>

        {/* Education Collapsible with Grid-based smooth transition */}
        <div className="border-t border-gray-100">
          <button 
            onClick={() => onToggleEd(prof.name)}
            className="w-full py-5 flex items-center justify-between text-left group/btn outline-none"
          >
            <span className="text-xs font-bold text-pau-darkBlue uppercase tracking-[0.2em] group-hover/btn:text-pau-gold transition-colors">Education</span>
            <div className="p-1.5 border border-gray-200 rounded group-hover/btn:border-pau-gold transition-colors">
              {isEdExpanded ? <MinusIcon className="h-3.5 w-3.5 text-pau-gold" /> : <PlusIcon className="h-3.5 w-3.5 text-gray-400" />}
            </div>
          </button>
          <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isEdExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <ul className="space-y-3 pl-4 border-l border-pau-gold/30 ml-1 pb-8">
                {prof.education.map((ed, idx) => (
                  <li key={idx} className="text-[15px] text-gray-600 font-light leading-relaxed">
                    {ed}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Background Collapsible with Grid-based smooth transition */}
        <div className="border-t border-gray-100">
          <button 
            onClick={() => onToggleBio(prof.name)}
            className="w-full py-5 flex items-center justify-between text-left group/btn outline-none"
          >
            <span className="text-xs font-bold text-pau-darkBlue uppercase tracking-[0.2em] group-hover/btn:text-pau-gold transition-colors">Background</span>
            <div className="p-1.5 border border-gray-200 rounded group-hover/btn:border-pau-gold transition-colors">
              {isBioExpanded ? <MinusIcon className="h-3.5 w-3.5 text-pau-gold" /> : <PlusIcon className="h-3.5 w-3.5 text-gray-400" />}
            </div>
          </button>
          <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isBioExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="pl-4 border-l border-pau-gold/30 ml-1 pb-8">
                <p className="text-[15px] text-gray-600 font-light leading-relaxed whitespace-pre-line text-justify">
                  {prof.bio}
                </p>
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

  // Sync active tab with the page selected from Navbar
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
      {/* Redesigned Hero Header to match other pages */}
      <div className="bg-pau-darkBlue pt-44 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
           <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserIcon className="h-8 w-8 text-pau-gold" />
           </div>
           <h1 className="text-5xl md:text-6xl font-serif font-bold text-white whitespace-pre-line leading-tight">
             {activeTab === 'Faculty' ? 'Distinguished Faculty' : 'Admin & Staff'}
           </h1>
           <p className="mt-8 text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
             {activeTab === 'Faculty' 
               ? "Our faculty are leaders in legal theory and practitioners with deep real-world impact across California." 
               : "A dedicated administrative team committed to providing seamless support for student success and academic excellence."}
           </p>
           
           <div className="flex items-center justify-center space-x-2 text-[10px] font-bold text-pau-gold uppercase tracking-[0.25em] mt-12 opacity-70">
             <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button>
             <span>/</span>
             <span className="text-white">{activeTab === 'Faculty' ? 'Faculty' : 'Staff'}</span>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Sidebar Nav */}
          <aside className="md:w-72 flex-shrink-0">
             <div className="sticky top-32 space-y-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <button 
                  onClick={() => handleTabChange('Faculty')}
                  className={`w-full text-left px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all rounded-xl border ${
                    activeTab === 'Faculty' 
                    ? 'bg-pau-blue text-white border-pau-blue shadow-lg shadow-pau-blue/20' 
                    : 'bg-white text-gray-500 border-gray-100 hover:text-pau-blue hover:border-pau-blue/30'
                  }`}
                >
                  Full-Time Faculty
                </button>
                <button 
                  onClick={() => handleTabChange('Staff')}
                  className={`w-full text-left px-6 py-5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all rounded-xl border ${
                    activeTab === 'Staff' 
                    ? 'bg-pau-blue text-white border-pau-blue shadow-lg shadow-pau-blue/20' 
                    : 'bg-white text-gray-500 border-gray-100 hover:text-pau-blue hover:border-pau-blue/30'
                  }`}
                >
                  Administrative Staff
                </button>
             </div>
          </aside>

          {/* Main List */}
          <div className="flex-grow">
            <h2 className="text-3xl font-serif font-bold text-pau-darkBlue mb-12 pb-6 border-b-2 border-pau-gold/10 flex items-center justify-between">
              <span>{activeTab === 'Faculty' ? 'Faculty Profiles' : 'Administrative Team'}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                {filteredFaculty.length} Profiles
              </span>
            </h2>
            
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
              <div className="py-32 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserIcon className="h-10 w-10 text-gray-200" />
                </div>
                <p className="text-gray-400 italic font-light text-lg">No profiles found in this category.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
