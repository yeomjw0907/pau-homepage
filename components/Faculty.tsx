
import React, { useState } from 'react';
import { FacultyContent, SharedContent, FacultyMember } from '../types';
import { XMarkIcon, DocumentTextIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, FunnelIcon, UserIcon } from '@heroicons/react/24/outline';

interface FacultyProps {
  content: FacultyContent;
  shared: SharedContent;
}

export const Faculty: React.FC<FacultyProps> = ({ content, shared }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories for filtering
  const categories = ["All", "Leadership", "Technology & IP", "Criminal Law", "Constitutional Law"];

  // Filter Logic
  const filteredFaculty = content.facultyList.filter((prof) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      prof.name.toLowerCase().includes(term) || 
      prof.title.toLowerCase().includes(term) || 
      prof.bio.toLowerCase().includes(term);

    let matchesCategory = true;
    if (activeCategory === "Leadership") {
      matchesCategory = prof.title.includes("Dean") || prof.title.includes("Director");
    } else if (activeCategory === "Technology & IP") {
      matchesCategory = prof.bio.includes("patent") || prof.title.includes("Tech") || prof.bio.includes("software");
    } else if (activeCategory === "Criminal Law") {
      matchesCategory = prof.title.includes("Criminal") || prof.bio.includes("Criminal");
    } else if (activeCategory === "Constitutional Law") {
      matchesCategory = prof.bio.includes("Constitutional");
    }

    return matchesSearch && matchesCategory;
  });

  // Mock publications data generator
  const getPublications = (name: string) => {
    const createPub = (title: string, journal: string, year: string) => ({
      title,
      journal,
      year,
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`
    });

    if (name.includes("Rodriguez")) {
      return [
        createPub("The Modern Interpretation of the Commerce Clause", "Yale Law Journal", "2022"),
        createPub("Civil Rights in the Digital Age: A Constitutional Framework", "Harvard Law Review", "2020"),
        createPub("Judicial Activism vs. Restraint: A Historical Perspective", "Stanford Law Review", "2018")
      ];
    } else if (name.includes("Chen")) {
      return [
        createPub("Patent Eligibility of Artificial Intelligence Algorithms", "Berkeley Technology Law Journal", "2023"),
        createPub("Open Source Licensing and Corporate Compliance", "Columbia Law Review", "2021"),
        createPub("The Future of Software Copyright", "MIT Technology Review", "2019")
      ];
    } else {
      return [
        createPub("Sentencing Disparities in Federal Courts", "University of Chicago Law Review", "2023"),
        createPub("Evidence Admissibility in the Era of Deepfakes", "Georgetown Law Journal", "2021"),
        createPub("Reforming the Grand Jury System", "NYU Law Review", "2020")
      ];
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-pau-darkBlue py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
           <h1 className="text-4xl font-serif font-bold text-white sm:text-5xl">{content.title}</h1>
           <p className="mt-4 text-xl text-gray-300 font-light">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search and Filter Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
          
          {/* Search Input */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-pau-blue transition-colors" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pau-blue focus:border-transparent sm:text-sm shadow-sm transition-all"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2">
             {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                   activeCategory === category
                     ? 'bg-pau-blue text-white shadow-md transform scale-105'
                     : 'bg-white text-gray-600 border border-gray-200 hover:border-pau-blue hover:text-pau-blue'
                 }`}
               >
                 {category}
               </button>
             ))}
          </div>
        </div>

        {/* Faculty List */}
        <div className="space-y-8">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((prof, idx) => (
              <div key={idx} className="flex flex-col md:flex-row bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-lg hover:border-pau-gold/30 transition-all duration-300 group">
                <div className="md:w-64 bg-gray-50 flex-shrink-0 min-h-[250px] relative border-r border-gray-100">
                   {/* Placeholder for professor image */}
                   <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:text-pau-gold transition-colors duration-500">
                      <UserIcon className="h-24 w-24" />
                   </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center flex-grow">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-pau-blue transition-colors">{prof.name}</h2>
                    <span className="text-pau-blue font-serif italic text-sm md:text-base mt-1 md:mt-0 bg-blue-50 px-3 py-1 rounded-full">{prof.title}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{prof.education}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{prof.bio}</p>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => setSelectedFaculty(prof)}
                      className="inline-flex items-center text-sm font-bold text-pau-gold hover:text-pau-blue transition-colors uppercase tracking-wide border-b-2 border-transparent hover:border-pau-blue pb-1"
                    >
                      {shared.buttons.viewPublications} <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No faculty found</h3>
              <p className="mt-2 text-gray-500">
                Adjust your search or filter settings.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-sm font-bold rounded-full text-white bg-pau-blue hover:bg-pau-darkBlue transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Publications Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
             <div 
               className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
               onClick={() => setSelectedFaculty(null)}
             ></div>
             <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
             <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
                <div className="bg-white px-6 py-6 border-b border-gray-100 flex justify-between items-center">
                   <div>
                      <h3 className="text-xl font-bold text-pau-blue font-serif">{selectedFaculty.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Selected Publications & Research</p>
                   </div>
                   <button type="button" onClick={() => setSelectedFaculty(null)} className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors">
                      <XMarkIcon className="h-6 w-6" />
                   </button>
                </div>
                  
                <div className="p-6 bg-gray-50 max-h-[60vh] overflow-y-auto">
                   <div className="space-y-4">
                    {getPublications(selectedFaculty.name).map((pub, i) => (
                      <div key={i} className="flex flex-col sm:flex-row items-start justify-between p-5 bg-white rounded-lg border border-gray-200 hover:border-pau-gold hover:shadow-md transition-all duration-300 group">
                        <div className="flex items-start mr-4 mb-3 sm:mb-0">
                          <DocumentTextIcon className="h-6 w-6 text-pau-gold mr-4 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-gray-900 text-lg leading-snug group-hover:text-pau-blue transition-colors">{pub.title}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500 font-medium">
                               <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide text-gray-600 mr-2">{pub.year}</span>
                               <span className="italic">{pub.journal}</span>
                            </div>
                          </div>
                        </div>
                        <a 
                          href={pub.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center text-xs font-bold text-pau-blue hover:text-white border border-pau-blue hover:bg-pau-blue px-4 py-2 rounded-full transition-all"
                        >
                          Access
                          <ArrowTopRightOnSquareIcon className="ml-1.5 h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white px-6 py-4 border-t border-gray-100 flex flex-row-reverse">
                  <button type="button" onClick={() => setSelectedFaculty(null)} className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors sm:text-sm">
                    Close
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
