
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
      setScrolled(window.scrollY > 10);
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

  // Helper for link styles
  const navLinkClass = (isActive: boolean) => 
    `text-sm font-medium transition-all duration-300 cursor-pointer px-3 py-2 rounded-md ${
      isActive 
        ? 'text-pau-blue font-bold bg-pau-blue/5' 
        : 'text-gray-700 hover:text-pau-blue hover:bg-gray-50'
    }`;
  
  const dropdownClass = "absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-soft ring-1 ring-black ring-opacity-5 py-2 z-50 transform origin-top-left transition-all duration-200 border border-gray-100";

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 border-t-[4px] border-pau-gold ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-white py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center gap-4 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            {/* Refined Logo */}
            <div className="relative w-16 h-16 flex items-center justify-center">
               <div className="absolute inset-0 border-[3px] border-pau-blue rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="absolute inset-1 border border-pau-gold rounded-full"></div>
               <div className="flex flex-col items-center justify-center leading-none">
                 <span className="text-pau-blue font-serif font-black text-2xl tracking-tighter">PAU</span>
                 <span className="text-[0.5rem] uppercase tracking-widest text-pau-gold font-bold mt-0.5">Law</span>
               </div>
            </div>
            
            <div className="flex flex-col justify-center h-full">
               <h1 className="text-pau-blue font-bold text-lg tracking-wider leading-none font-sans hidden sm:block">PACIFIC AMERICAN</h1>
               <h1 className="text-gray-800 font-light text-lg tracking-widest leading-none font-sans hidden sm:block">UNIVERSITY</h1>
               <h1 className="text-pau-blue font-bold text-xl tracking-wide leading-none font-sans sm:hidden">PAU LAW</h1>
            </div>
          </div>

          {/* Desktop Menu & Utilities */}
          <div className="hidden md:flex items-center space-x-1">
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
                <ChevronDownIcon className="ml-1 h-3 w-3 stroke-2" />
              </button>
              
              {activeDropdown === 'academics' && (
                <div className={dropdownClass}>
                  <button onClick={() => onNavigate('academics')} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-pau-blue transition-colors">
                    {shared.nav.degreePrograms}
                  </button>
                  <button onClick={() => onNavigate('centers')} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-pau-blue transition-colors">
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
                <ChevronDownIcon className="ml-1 h-3 w-3 stroke-2" />
              </button>
              
              {activeDropdown === 'news' && (
                <div className={dropdownClass}>
                  <button onClick={() => onNavigate('news')} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-pau-blue transition-colors">
                    {shared.nav.latestNews}
                  </button>
                  <button onClick={() => onNavigate('notices')} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-pau-blue transition-colors">
                    {shared.nav.noticeBoard}
                  </button>
                </div>
              )}
            </div>
            
            {/* Language Selector */}
            <div className="relative ml-6 pl-6 border-l border-gray-200">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-pau-blue transition-colors rounded-full px-3 py-1.5 hover:bg-gray-100"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{currentLang}</span>
                <ChevronDownIcon className="h-3 w-3" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 py-2 z-50 overflow-hidden">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsLangMenuOpen(false);
                      }}
                      disabled={isTranslating}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        currentLang === lang ? 'bg-pau-blue/10 text-pau-blue font-bold' : 'text-gray-700 hover:bg-gray-50'
                      } disabled:opacity-50`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

           {/* Mobile menu button */}
           <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

       {/* Mobile Menu */}
       {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto shadow-inner">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 text-base font-medium text-gray-800 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.home}
            </button>
            <button onClick={() => { onNavigate('admissions'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 text-base font-medium text-gray-800 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.admissions}
            </button>
            
            <div className="py-3 border-b border-gray-100">
              <span className="text-xs font-bold text-pau-gold uppercase tracking-widest px-2">{shared.nav.academics}</span>
              <button onClick={() => { onNavigate('academics'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue hover:bg-gray-50 rounded mt-1">
                {shared.nav.degreePrograms}
              </button>
              <button onClick={() => { onNavigate('centers'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue hover:bg-gray-50 rounded">
                {shared.nav.centersClinics}
              </button>
            </div>

            <button onClick={() => { onNavigate('faculty'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 text-base font-medium text-gray-800 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.faculty}
            </button>
            
            <div className="py-3 border-b border-gray-100">
              <span className="text-xs font-bold text-pau-gold uppercase tracking-widest px-2">{shared.nav.newsUpdates}</span>
              <button onClick={() => { onNavigate('news'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue hover:bg-gray-50 rounded mt-1">
                {shared.nav.latestNews}
              </button>
              <button onClick={() => { onNavigate('notices'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-600 hover:text-pau-blue hover:bg-gray-50 rounded">
                {shared.nav.noticeBoard}
              </button>
            </div>
          </div>
          <div className="pt-4 pb-6 border-t border-gray-200 px-4 bg-gray-50">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{shared.nav.language}</p>
             <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => { onLanguageChange(lang); setIsMobileMenuOpen(false); }}
                  className={`text-left text-sm py-2 px-3 rounded ${currentLang === lang ? 'bg-pau-blue text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}
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
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 overflow-hidden">
          <div className="h-full bg-pau-gold animate-progress-indeterminate"></div>
        </div>
      )}
    </nav>
  );
};
