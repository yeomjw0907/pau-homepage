
import React, { useState, useRef } from 'react';
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
  
  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<any>(null);

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
    `text-sm font-medium transition cursor-pointer px-3 py-2 rounded-md ${isActive ? 'text-pau-blue font-bold bg-blue-50' : 'text-gray-700 hover:text-pau-blue hover:bg-gray-50'}`;
  
  const dropdownClass = "absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50 transform origin-top-left transition-all duration-200";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 flex items-center gap-4 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            {/* PAU Oval Logo Recreation */}
            <div className="relative w-20 h-14 border-2 border-pau-blue rounded-[50%] flex items-center justify-center overflow-hidden flex-shrink-0">
               <div className="absolute top-[-10px] left-[-10px] w-24 h-12 border-b-2 border-pau-blue rounded-[50%] transform rotate-[-15deg]"></div>
               <span className="text-pau-blue font-bold text-2xl font-sans italic z-10 pt-1 pr-1">PAU</span>
            </div>
            
            <div className="flex flex-col justify-center h-full">
               <h1 className="text-pau-blue font-bold text-xl tracking-wide leading-none font-sans hidden sm:block">PACIFIC AMERICAN</h1>
               <h1 className="text-pau-blue font-bold text-xl tracking-wide leading-none font-sans hidden sm:block">UNIVERSITY</h1>
               <h1 className="text-pau-blue font-bold text-xl tracking-wide leading-none font-sans sm:hidden">PAU</h1>
               <span className="text-pau-gold text-sm font-serif italic mt-1">School of Law</span>
            </div>
          </div>

          {/* Desktop Menu & Utilities */}
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
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'academics' && (
                <div className={dropdownClass}>
                  <button onClick={() => onNavigate('academics')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pau-blue">
                    {shared.nav.degreePrograms}
                  </button>
                  <button onClick={() => onNavigate('centers')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pau-blue">
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
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'news' && (
                <div className={dropdownClass}>
                  <button onClick={() => onNavigate('news')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pau-blue">
                    {shared.nav.latestNews}
                  </button>
                  <button onClick={() => onNavigate('notices')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pau-blue">
                    {shared.nav.noticeBoard}
                  </button>
                </div>
              )}
            </div>
            
            {/* Language Selector */}
            <div className="relative ml-4">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 text-gray-500 hover:text-pau-blue transition border border-gray-200 rounded-full px-3 py-1 ml-4"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span className="text-sm">{currentLang}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsLangMenuOpen(false);
                      }}
                      disabled={isTranslating}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
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
        <div className="md:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-y-auto">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.home}
            </button>
            <button onClick={() => { onNavigate('admissions'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.admissions}
            </button>
            
            <div className="py-2 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{shared.nav.academics}</span>
              <button onClick={() => { onNavigate('academics'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-700 hover:text-pau-blue">
                {shared.nav.degreePrograms}
              </button>
              <button onClick={() => { onNavigate('centers'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-700 hover:text-pau-blue">
                {shared.nav.centersClinics}
              </button>
            </div>

            <button onClick={() => { onNavigate('faculty'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-pau-blue border-b border-gray-100">
              {shared.nav.faculty}
            </button>
            
            <div className="py-2 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{shared.nav.newsUpdates}</span>
              <button onClick={() => { onNavigate('news'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-700 hover:text-pau-blue">
                {shared.nav.latestNews}
              </button>
              <button onClick={() => { onNavigate('notices'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 pl-4 text-base text-gray-700 hover:text-pau-blue">
                {shared.nav.noticeBoard}
              </button>
            </div>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 px-4">
             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{shared.nav.language}</p>
             <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => { onLanguageChange(lang); setIsMobileMenuOpen(false); }}
                  className={`text-left text-sm py-1 ${currentLang === lang ? 'text-pau-blue font-bold' : 'text-gray-600'}`}
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
        <div className="w-full bg-pau-gold h-1">
          <div className="h-full bg-pau-blue animate-pulse w-full"></div>
        </div>
      )}
    </nav>
  );
};
