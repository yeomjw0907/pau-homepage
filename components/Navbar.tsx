
import React, { useState, useRef, useEffect } from 'react';
import { SupportedLanguage, Page, SharedContent } from '../types';
import { GlobeAltIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isTranslating: boolean;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  shared: SharedContent;
}

const LANGUAGES: SupportedLanguage[] = [
  'English', 'Spanish', 'Chinese (Simplified)', 'Korean', 'Vietnamese', 'Japanese', 'French', 'Tagalog'
];

export const Navbar: React.FC<NavbarProps> = ({ 
  currentLang, 
  onLanguageChange, 
  isTranslating, 
  currentPage,
  onNavigate,
  shared
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<any>(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Logic: Transparent only on Home page when not scrolled.
  const isTransparent = currentPage === 'home' && !scrolled;

  // Dynamic Styles based on Scroll State or Page
  const navBgClass = isTransparent 
    ? 'bg-transparent py-6 border-b border-white/10'
    : 'bg-white/95 backdrop-blur-md shadow-soft py-3 border-b border-gray-100';

  const textColorClass = isTransparent 
    ? 'text-white/90 hover:text-white hover:bg-white/10' 
    : 'text-gray-600 hover:text-pau-blue hover:bg-gray-50';

  const logoTitleClass = isTransparent 
    ? 'text-white group-hover:text-gray-200' 
    : 'text-pau-blue group-hover:text-pau-darkBlue';
    
  const logoSubtitleClass = isTransparent 
    ? 'text-pau-goldLight group-hover:text-white' 
    : 'text-pau-gold group-hover:text-pau-goldDark';

  const logoIconClass = isTransparent
    ? 'bg-white text-pau-blue'
    : 'bg-pau-blue text-white group-hover:bg-pau-darkBlue';

  const languageBtnClass = isTransparent
    ? `text-white hover:text-white hover:bg-white/10 ${isLangMenuOpen ? 'bg-white/20' : ''}`
    : `text-gray-500 hover:text-pau-blue hover:bg-gray-50 border-gray-200 ${isLangMenuOpen ? 'bg-gray-50 text-pau-blue' : ''}`;

  // Helper for link styles
  const navLinkClass = (isActive: boolean) => 
    `text-sm font-medium transition-all duration-300 cursor-pointer px-4 py-2 rounded-full tracking-wide ${
      isActive 
        ? (isTransparent ? 'text-white font-bold bg-white/20' : 'text-pau-blue font-bold bg-pau-blue/5 ring-1 ring-pau-blue/10')
        : textColorClass
    }`;
  
  const dropdownClass = "absolute left-0 mt-4 w-60 bg-white/95 backdrop-blur-xl rounded-xl shadow-card ring-1 ring-black ring-opacity-5 py-3 z-50 transform origin-top-left transition-all duration-200 border border-gray-100";

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 cursor-pointer group select-none flex items-center gap-3"
            onClick={() => onNavigate('home')}
          >
            <div className={`w-10 h-10 font-serif font-bold text-xl flex items-center justify-center rounded-sm shadow-md transition-colors ${logoIconClass}`}>
              P
            </div>
            <div className="flex flex-col justify-center">
               <div className="flex flex-col">
                 <h1 className={`${logoTitleClass} font-bold text-lg md:text-xl tracking-wider leading-none font-sans transition-colors`}>
                   PACIFIC AMERICAN
                 </h1>
                 <h2 className={`${logoSubtitleClass} font-medium text-xs md:text-sm tracking-[0.3em] leading-none font-sans mt-1 transition-colors`}>
                   UNIVERSITY
                 </h2>
               </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <button onClick={() => onNavigate('admissions')} className={navLinkClass(currentPage === 'admissions')}>
              {shared.nav.admissions}
            </button>
            
            {/* Academics Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('academics')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center ${navLinkClass(currentPage === 'academics' || currentPage === 'centers' || currentPage === 'clinic-detail')}`}
                onClick={() => onNavigate('academics')}
              >
                {shared.nav.academics}
                <ChevronDownIcon className="ml-1 h-3 w-3 stroke-2 opacity-70" />
              </button>
              
              {activeDropdown === 'academics' && (
                <div className={dropdownClass}>
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                  <button onClick={() => onNavigate('academics')} className="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-pau-light hover:text-pau-blue transition-colors font-medium">
                    {shared.nav.degreePrograms}
                  </button>
                  <div className="h-px bg-gray-50 mx-4"></div>
                  <button onClick={() => onNavigate('centers')} className="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-pau-light hover:text-pau-blue transition-colors font-medium">
                    {shared.nav.centersClinics}
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => onNavigate('faculty')} className={navLinkClass(currentPage === 'faculty')}>
              {shared.nav.faculty}
            </button>

            {/* News & Updates Dropdown */}
             <div 
              className="relative group"
              onMouseEnter={() => handleMouseEnter('news')}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className={`flex items-center ${navLinkClass(currentPage === 'news' || currentPage === 'notices' || currentPage === 'news-detail')}`}
                onClick={() => onNavigate('news')}
              >
                {shared.nav.newsUpdates}
                <ChevronDownIcon className="ml-1 h-3 w-3 stroke-2 opacity-70" />
              </button>
              
              {activeDropdown === 'news' && (
                <div className={dropdownClass}>
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                  <button onClick={() => onNavigate('news')} className="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-pau-light hover:text-pau-blue transition-colors font-medium">
                    {shared.nav.latestNews}
                  </button>
                   <div className="h-px bg-gray-50 mx-4"></div>
                  <button onClick={() => onNavigate('notices')} className="block w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-pau-light hover:text-pau-blue transition-colors font-medium">
                    {shared.nav.noticeBoard}
                  </button>
                </div>
              )}
            </div>
            
            {/* Language Selector */}
            <div className={`relative ml-4 pl-4 border-l ${isTransparent ? 'border-white/20' : 'border-gray-200'}`}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center space-x-2 transition-colors rounded-full px-3 py-1.5 border border-transparent ${languageBtnClass}`}
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span className="text-sm font-medium hidden lg:inline">{currentLang}</span>
                <ChevronDownIcon className="h-3 w-3" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-card ring-1 ring-black ring-opacity-5 py-2 z-50 overflow-hidden">
                   <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsLangMenuOpen(false);
                      }}
                      disabled={isTranslating}
                      className={`block w-full text-left px-5 py-2.5 text-sm transition-colors ${
                        currentLang === lang ? 'bg-pau-light text-pau-blue font-bold' : 'text-gray-700 hover:bg-gray-50'
                      } disabled:opacity-50`}
                    >
                      {lang}
                    </button>
                  ))}
                  </div>
                </div>
              )}
            </div>
          </div>

           {/* Mobile menu button */}
           <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-500 hover:text-pau-blue hover:bg-gray-50'}`}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

       {/* Mobile Menu */}
       {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0">
          <div className="pt-2 pb-6 px-6 space-y-2">
            <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-4 text-lg font-serif font-bold text-pau-blue border-b border-gray-100">
              {shared.nav.home}
            </button>
            <button onClick={() => { onNavigate('admissions'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-4 text-lg font-medium text-gray-700 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.admissions}
            </button>
            
            <div className="py-4 border-b border-gray-100">
              <span className="text-xs font-bold text-pau-gold uppercase tracking-widest block mb-2">{shared.nav.academics}</span>
              <button onClick={() => { onNavigate('academics'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue">
                {shared.nav.degreePrograms}
              </button>
              <button onClick={() => { onNavigate('centers'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue">
                {shared.nav.centersClinics}
              </button>
            </div>

            <button onClick={() => { onNavigate('faculty'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-4 text-lg font-medium text-gray-700 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.faculty}
            </button>
            
            <div className="py-4 border-b border-gray-100">
              <span className="text-xs font-bold text-pau-gold uppercase tracking-widest block mb-2">{shared.nav.newsUpdates}</span>
              <button onClick={() => { onNavigate('news'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue">
                {shared.nav.latestNews}
              </button>
              <button onClick={() => { onNavigate('notices'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue">
                {shared.nav.noticeBoard}
              </button>
            </div>
          </div>
          <div className="py-6 px-6 bg-gray-50">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{shared.nav.language}</p>
             <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => { onLanguageChange(lang); setIsMobileMenuOpen(false); }}
                  className={`text-left text-sm py-2 px-4 rounded-full border transition-all ${currentLang === lang ? 'bg-pau-blue text-white border-pau-blue' : 'bg-white text-gray-600 border-gray-200'}`}
                >
                  {lang}
                </button>
              ))}
             </div>
          </div>
        </div>
      )}
      
      {/* Loading Indicator for Translation */}
      {isTranslating && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100 overflow-hidden">
          <div className="h-full bg-pau-gold animate-shimmer w-1/3 absolute top-0"></div>
        </div>
      )}
    </nav>
  );
};