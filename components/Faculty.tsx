
import React, { useState } from 'react';
import { FacultyContent, SharedContent, FacultyMember } from '../types';
import { XMarkIcon, DocumentTextIcon, ArrowTopRightOnSquareIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

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

  // Mock publications data generator based on faculty name to vary content slightly
  const getPublications = (name: string) => {
    const createPub = (title: string, journal: string, year: string) => ({
      title,
      journal,
      year,
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`
    });

    // Deterministic mock data for demo purposes
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
      <div className="bg-pau-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-pau-blue text-center">{content.title}</h1>
          <p className="mt-4 text-xl text-gray-600 text-center max-w-3xl mx-auto">{content.intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pau-blue focus:border-pau-blue sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search faculty by name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-2/3">
             <div className="flex items-center text-gray-500 mr-2 text-sm font-medium">
                <FunnelIcon className="h-4 w-4 mr-1" />
                Filter by:
             </div>
             {categories.map((category) => (
               <button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                   activeCategory === category
                     ? 'bg-pau-blue text-white shadow-sm'
                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                 }`}
               >
                 {category}
               </button>
             ))}
          </div>
        </div>

        {/* Faculty List */}
        <div className="space-y-12">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((prof, idx) => (
              <div key={idx} className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:w-64 bg-gray-200 flex-shrink-0 min-h-[250px] relative">
                   {/* Placeholder for professor image */}
                   <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                   </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center flex-grow">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h2 className="text-2xl font-bold text-pau-blue">{prof.name}</h2>
                    <span className="text-pau-gold font-serif italic">{prof.title}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{prof.education}</p>
                  <p className="text-gray-700 leading-relaxed">{prof.bio}</p>
                  
                  <div className="mt-6">
                    <button 
                      onClick={() => setSelectedFaculty(prof)}
                      className="text-sm font-semibold text-pau-blue hover:text-pau-gold transition-colors uppercase tracking-wide flex items-center"
                    >
                      {shared.buttons.viewPublications} &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No faculty found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search terms or changing the category filter.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-pau-blue bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Publications Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedFaculty(null)}></div>
             <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-pau-blue">{selectedFaculty.name}</h3>
                      <p className="text-sm text-gray-500">Selected Publications & Research</p>
                    </div>
                    <button type="button" onClick={() => setSelectedFaculty(null)} className="text-gray-400 hover:text-gray-500">
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 mt-4 max-h-96 overflow-y-auto">
                    {getPublications(selectedFaculty.name).map((pub, i) => (
                      <div key={i} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 transition-colors group">
                        <div className="flex items-start mr-3">
                          <DocumentTextIcon className="h-6 w-6 text-pau-gold mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-pau-blue transition-colors">{pub.title}</p>
                            <p className="text-xs text-gray-500 italic mt-1">{pub.journal} &bull; {pub.year}</p>
                          </div>
                        </div>
                        <a 
                          href={pub.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center text-xs font-bold text-pau-blue hover:text-pau-gold border border-pau-blue hover:border-pau-gold px-3 py-1.5 rounded transition-colors"
                        >
                          View More
                          <ArrowTopRightOnSquareIcon className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" onClick={() => setSelectedFaculty(null)} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:ml-3 sm:w-auto sm:text-sm">
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
