
import React, { useState } from 'react';
import { HomeContent, Clinic, SharedContent, GlobalFutureItem, Page } from '../types';
import { 
  AcademicCapIcon, 
  BriefcaseIcon, 
  UserGroupIcon, 
  ArrowRightIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  GlobeAmericasIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  BuildingOffice2Icon,
  LightBulbIcon,
  GlobeAsiaAustraliaIcon,
  XMarkIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface InfoSectionProps {
  content: HomeContent;
  shared: SharedContent;
  onClinicClick: (clinic: Clinic) => void;
  onNavigate: (page: Page) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ content, shared, onClinicClick, onNavigate }) => {
  const [selectedCareer, setSelectedCareer] = useState<GlobalFutureItem | null>(null);

  const handlePathwayClick = (page: Page) => {
    setSelectedCareer(null); // Close modal
    onNavigate(page);
  };

  return (
    <div className="bg-white">
      
      {/* SECTION 1 & 2 COMBINED: Vision & Mission Split Layout */}
      {/* Design Concept: "The Official Document" - Crisp edges, high contrast, structured hierarchy */}
      <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl bg-white">
          
          {/* LEFT: Vision (Prestige & Depth) */}
          <div className="bg-pau-darkBlue text-white p-12 lg:p-20 flex flex-col justify-center relative">
             {/* Classical decorative accent */}
             <div className="w-16 h-1 bg-pau-gold mb-10"></div>
             
             <div className="relative z-10">
               <span className="block text-xs font-bold tracking-[0.25em] text-pau-gold uppercase mb-6 opacity-80">
                 Our Vision
               </span>
               {/* Vision Statement - Font size reduced as requested */}
               <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium leading-relaxed text-white/95 mb-8">
                 "{content.visionStatement}"
               </h2>
               
               {/* Signature / Authority Mark */}
               <div className="flex items-center mt-auto opacity-50">
                  <div className="h-px bg-white w-12 mr-4"></div>
                  <span className="text-xs font-serif italic text-white">Office of the Dean</span>
               </div>
             </div>

             {/* Background texture hint */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
          </div>

          {/* RIGHT: Mission (Clarity & Structure) */}
          <div className="bg-white p-12 lg:p-20 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
             <div className="mb-12 border-b border-gray-100 pb-8">
                <h2 className="text-3xl font-serif font-bold text-pau-darkBlue mb-4">{content.missionTitle}</h2>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  {content.missionDescription}
                </p>
             </div>

             <div className="space-y-8">
                {content.missionPoints.map((mission, idx) => (
                   <div key={idx} className="flex gap-5 items-start group">
                      <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-pau-blue group-hover:text-pau-blue group-hover:bg-blue-50 transition-all duration-300">
                         {mission.icon === 'innovation' && <LightBulbIcon className="h-5 w-5" />}
                         {mission.icon === 'access' && <GlobeAsiaAustraliaIcon className="h-5 w-5" />}
                         {mission.icon === 'globe' && <AcademicCapIcon className="h-5 w-5" />}
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 group-hover:text-pau-blue transition-colors">
                           {mission.title}
                         </h4>
                         <p className="text-sm text-gray-500 leading-relaxed border-l-2 border-transparent pl-0 group-hover:border-gray-200 group-hover:pl-3 transition-all duration-300">
                           {mission.description}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: Features & Intro (Clean White) */}
      <section className="pb-24 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-pau-darkBlue mb-6">
             {content.introTitle}
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
             {content.introText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {content.features.map((feature, idx) => (
             <div key={idx} className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 text-pau-blue mb-6 group-hover:text-pau-gold transition-colors">
                   {feature.icon === 'clock' && <ClockIcon className="h-10 w-10 stroke-1" />}
                   {feature.icon === 'academic' && <UserGroupIcon className="h-10 w-10 stroke-1" />}
                   {feature.icon === 'currency' && <CurrencyDollarIcon className="h-10 w-10 stroke-1" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-serif group-hover:text-pau-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
             </div>
           ))}
        </div>
      </section>

      {/* SECTION 4: Stats & Success (Dark Mode Block) */}
      <section className="bg-pau-darkBlue text-white py-32 relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-pau-blue rounded-full blur-[100px] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div>
              <div className="flex items-center space-x-4 mb-8">
                 <span className="h-px w-12 bg-pau-gold"></span>
                 <span className="text-pau-gold font-bold tracking-widest uppercase text-xs">Student Success</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                {content.successTitle}
              </h2>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed font-light border-l-2 border-white/20 pl-6">
                {content.successText}
              </p>
              
              <div className="flex items-center space-x-4">
                 <div className="h-12 w-12 rounded-full bg-pau-gold flex items-center justify-center text-pau-darkBlue font-serif font-bold text-lg">
                   ER
                 </div>
                 <div>
                   <p className="font-serif text-lg">Elena Rodriguez</p>
                   <p className="text-xs text-gray-400 uppercase tracking-widest">Dean, School of Law</p>
                 </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
              {content.stats && content.stats.map((stat, idx) => (
                <div key={idx} className="bg-pau-darkBlue/80 backdrop-blur-sm p-8 hover:bg-white/5 transition-colors group">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 group-hover:text-pau-gold transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Global Future (Gray Background) */}
      <section className="bg-gray-50 py-32 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-pau-darkBlue mb-4">
              {content.globalFutureTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.globalFutureIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {content.globalFutureList.map((item, idx) => (
               <div 
                 key={idx} 
                 onClick={() => setSelectedCareer(item)}
                 className="bg-white p-6 rounded shadow-sm border border-gray-100 flex flex-col justify-center items-start group hover:shadow-card hover:border-pau-blue/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
               >
                 <div className="flex items-center mb-4">
                   <div className="w-12 h-12 rounded-full bg-pau-light flex items-center justify-center text-pau-blue mr-4 group-hover:scale-110 transition-transform">
                      {idx === 0 ? <GlobeAmericasIcon className="h-6 w-6" /> :
                       idx === 1 ? <ScaleIcon className="h-6 w-6" /> :
                       idx === 2 ? <BriefcaseIcon className="h-6 w-6" /> :
                       idx === 3 ? <ArrowRightIcon className="h-6 w-6" /> :
                       idx === 4 ? <BuildingLibraryIcon className="h-6 w-6" /> :
                       <AcademicCapIcon className="h-6 w-6" />}
                   </div>
                   <h3 className="text-lg font-bold text-gray-800 group-hover:text-pau-darkBlue transition-colors font-serif">
                     {item.title}
                   </h3>
                 </div>
                 <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                   {item.description}
                 </p>
                 <span className="mt-auto text-xs font-bold text-pau-gold uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
                   Explore Path <ArrowRightIcon className="ml-1 h-3 w-3" />
                 </span>
               </div>
             ))}
          </div>
          
          <div className="mt-16 text-center">
             <p className="inline-block px-8 py-4 bg-white rounded border border-gray-200 text-gray-500 italic shadow-sm">
                "{content.globalFutureClosing}"
             </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Clinics & Centers (Clean) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-8">
            <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold text-pau-darkBlue mb-4">{content.clinicsTitle}</h2>
            <p className="text-lg text-gray-500 font-light">{content.clinicsIntro}</p>
            </div>
            <button className="hidden md:inline-flex items-center px-6 py-3 bg-pau-light text-pau-blue font-bold rounded hover:bg-pau-blue hover:text-white transition-colors mt-6 md:mt-0 text-sm tracking-wide uppercase">
            View All Centers <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.clinics && content.clinics.map((clinic, idx) => (
            <div 
                key={clinic.id || idx} 
                onClick={() => onClinicClick(clinic)}
                className="group relative bg-white rounded p-8 border border-gray-100 transition-all duration-500 hover:shadow-card hover:border-pau-blue/20 cursor-pointer overflow-hidden flex flex-col h-full"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-pau-gold transition-colors duration-500"></div>
                
                <div className="w-14 h-14 bg-gray-50 rounded flex items-center justify-center text-gray-400 mb-8 group-hover:bg-pau-blue group-hover:text-white transition-colors duration-300">
                    {idx === 0 ? <AcademicCapIcon className="h-7 w-7" /> : 
                    idx === 1 ? <UserGroupIcon className="h-7 w-7" /> : 
                    <BuildingOffice2Icon className="h-7 w-7" />}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-pau-blue transition-colors font-serif">
                {clinic.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                {clinic.description}
                </p>
                
                <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-pau-gold transition-colors uppercase tracking-widest">
                {shared.buttons.learnMore}
                <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            ))}
        </div>
      </section>

      {/* Global Career Detail Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
             <div 
               className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity backdrop-blur-sm" 
               onClick={() => setSelectedCareer(null)}
             ></div>

             <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

             <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full relative">
                
                {/* Close Button */}
                <button 
                   type="button" 
                   onClick={() => setSelectedCareer(null)} 
                   className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/50 text-white rounded-full p-2 transition-colors backdrop-blur-md"
                >
                   <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Hero Image */}
                {selectedCareer.image && (
                  <div className="h-64 w-full relative bg-gray-900">
                     <img 
                       src={selectedCareer.image} 
                       alt={selectedCareer.title} 
                       className="w-full h-full object-cover opacity-80"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-pau-darkBlue via-pau-darkBlue/40 to-transparent opacity-80"></div>
                     <div className="absolute bottom-0 left-0 p-8">
                        <div className="inline-block px-3 py-1 bg-pau-gold text-white text-xs font-bold uppercase tracking-widest mb-3 rounded-sm">Career Pathway</div>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide shadow-sm">
                          {selectedCareer.detailTitle}
                        </h3>
                     </div>
                  </div>
                )}
                
                <div className="px-8 py-8 md:py-10">
                   <div className="flex flex-col md:flex-row gap-12">
                      {/* Main Content */}
                      <div className="md:w-2/3">
                         <h4 className="text-xl font-bold text-pau-darkBlue mb-4 font-serif border-b border-gray-100 pb-2">Overview</h4>
                         <p className="text-gray-600 leading-relaxed text-lg font-light mb-8">
                            {selectedCareer.detailBody}
                         </p>

                         {/* Organic Navigation: Related Pathways */}
                         {selectedCareer.relatedPathways && (
                           <div className="mt-10">
                              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Recommended Next Steps</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 {selectedCareer.relatedPathways.map((path, idx) => (
                                    <button 
                                      key={idx}
                                      onClick={() => handlePathwayClick(path.targetPage)}
                                      className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-pau-blue hover:bg-white hover:shadow-md transition-all group text-left"
                                    >
                                       <div>
                                          <div className="font-bold text-pau-blue text-sm">{path.label}</div>
                                          <div className="text-xs text-gray-500 mt-0.5">{path.description}</div>
                                       </div>
                                       <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-pau-gold" />
                                    </button>
                                 ))}
                              </div>
                           </div>
                         )}
                      </div>

                      {/* Sidebar: Stats & Facts */}
                      <div className="md:w-1/3 space-y-8">
                         {selectedCareer.stats && (
                           <div className="bg-pau-light p-6 rounded-xl border border-blue-100">
                              <h4 className="text-sm font-bold text-pau-blue uppercase tracking-widest mb-6">Key Insights</h4>
                              <div className="space-y-6">
                                 {selectedCareer.stats.map((stat, idx) => (
                                   <div key={idx} className="flex flex-col border-b border-blue-200/50 last:border-0 pb-4 last:pb-0">
                                      <span className="text-2xl font-bold text-pau-darkBlue font-serif">{stat.value}</span>
                                      <span className="text-xs text-gray-500 font-medium uppercase mt-1">{stat.label}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>
                         )}

                         <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                            <h4 className="text-sm font-bold text-gray-900 mb-2">Why PAU Law?</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              Our curriculum is specifically designed to bridge theory and practice in {selectedCareer.title.toLowerCase()}, giving you a competitive edge.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-gray-50 px-8 py-4 flex flex-row-reverse border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setSelectedCareer(null)} 
                    className="w-full sm:w-auto inline-flex justify-center rounded border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                  >
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