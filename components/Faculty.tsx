
import React, { useState } from 'react';
import { FacultyContent, SharedContent, FacultyMember } from '../types';
import { XMarkIcon, DocumentTextIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';

interface FacultyProps {
  content: FacultyContent;
  shared: SharedContent;
}

export const Faculty: React.FC<FacultyProps> = ({ content, shared }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ["All", "Constitutional", "Technology", "Clinical", "Ethics"];

  const filteredFaculty = content.facultyList.filter((prof) => {
    const term = searchTerm.toLowerCase();
    return prof.name.toLowerCase().includes(term) || prof.expertise.some(e => e.toLowerCase().includes(term));
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-pau-darkBlue pt-56 pb-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
           <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight">{content.title}</h1>
           <div className="w-20 h-1 bg-pau-gold mx-auto my-8"></div>
           <p className="text-xl text-gray-300 font-light leading-relaxed">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        
        {/* Modern Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-pau-blue/10 focus:border-pau-blue outline-none transition-all"
              placeholder="Search by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest border transition-all ${
                  activeCategory === cat ? 'bg-pau-blue text-white border-pau-blue shadow-lg' : 'bg-white text-gray-500 border-gray-100 hover:border-pau-gold hover:text-pau-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredFaculty.map((prof, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-premium border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="h-80 bg-gray-100 relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                    <UserIcon className="h-32 w-32 stroke-1 group-hover:text-pau-gold transition-colors duration-500" />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1 group-hover:text-pau-blue transition-colors">{prof.name}</h3>
                <p className="text-pau-gold text-sm font-bold uppercase tracking-widest mb-4">{prof.title}</p>
                <p className="text-xs text-gray-400 font-medium mb-6">{prof.education}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                  {prof.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                   {prof.expertise.slice(0, 3).map(exp => (
                     <span key={exp} className="px-3 py-1 bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-500 rounded border border-gray-100">
                       {exp}
                     </span>
                   ))}
                </div>
                <button 
                  onClick={() => setSelectedFaculty(prof)}
                  className="w-full py-3 bg-pau-light text-pau-blue text-xs font-bold uppercase tracking-widest hover:bg-pau-blue hover:text-white transition-all rounded"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bio Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-pau-darkBlue/90 backdrop-blur-md animate-fade-in">
           <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
              <button 
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-pau-blue hover:text-white transition-all z-10"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              
              <div className="flex flex-col md:flex-row overflow-y-auto">
                <div className="md:w-1/3 bg-gray-50 p-12 flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-white shadow-xl flex items-center justify-center text-pau-blue mb-8">
                    <UserIcon className="h-24 w-24 stroke-1" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-center text-pau-darkBlue">{selectedFaculty.name}</h3>
                  <p className="text-pau-gold font-bold text-xs uppercase tracking-widest text-center mt-2">{selectedFaculty.title}</p>
                </div>
                <div className="md:w-2/3 p-12">
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Biography & Research</h4>
                   <div className="prose prose-blue text-gray-600 font-light leading-relaxed">
                      {selectedFaculty.bio}
                   </div>
                   <div className="mt-12">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Academic Background</h4>
                      <p className="text-sm font-bold text-pau-blue">{selectedFaculty.education}</p>
                   </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
