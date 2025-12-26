import React, { useState, useRef, useEffect } from 'react';
import { SupportedLanguage, Page, SharedContent, GlobalAlert } from '../types';
import { GlobeAltIcon, ChevronDownIcon, Bars3Icon, XMarkIcon, ChevronRightIcon, AcademicCapIcon, BookOpenIcon, IdentificationIcon, CurrencyDollarIcon, ComputerDesktopIcon, ShoppingBagIcon, DocumentTextIcon, BanknotesIcon, CreditCardIcon, ClipboardDocumentListIcon, ExclamationTriangleIcon, InformationCircleIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isTranslating: boolean;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  shared: SharedContent;
  globalAlert: GlobalAlert;
}

const LANGUAGES: SupportedLanguage[] = [
  'English', 'Spanish', 'Chinese (Simplified)', 'Korean', 'Vietnamese', 'Japanese', 'French', 'Tagalog'
];

// Reusable Dropdown Wrapper moved outside to fix type inference issues
const DropdownWrapper = ({ widthClass, children }: { widthClass: string, children?: React.ReactNode }) => (
  <div className={`absolute left-0 top-full pt-4 ${widthClass} z-[100] animate-fade-in-up origin-top-left`}>
     <div className="bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.25)] ring-1 ring-black/10 py-8 border border-gray-200">
       {children}
     </div>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({ 
  currentLang, 
  onLanguageChange, 
  isTranslating, 
  currentPage,
  onNavigate,
  shared,
  globalAlert
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateAndClose = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setMobileExpandedSection(null);
  };

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const isTransparent = currentPage === 'home' && !scrolled;

  // Additional offset if alert is visible
  const topOffset = globalAlert.active ? 'top-[40px] md:top-[48px]' : 'top-0';

  const navBgClass = isTransparent 
    ? 'bg-transparent py-6'
    : 'bg-white shadow-xl py-3 border-b border-gray-200';

  const textColorClass = isTransparent 
    ? 'text-white hover:text-white hover:bg-white/10' 
    : 'text-gray-800 hover:text-pau-blue hover:bg-gray-50';

  const logoTitleClass = isTransparent 
    ? 'text-white' 
    : 'text-pau-blue';
    
  const logoSubtitleClass = isTransparent 
    ? 'text-pau-goldLight' 
    : 'text-pau-gold';

  const languageBtnClass = isTransparent
    ? `text-white border-white/30 hover:bg-white/10 ${isLangMenuOpen ? 'bg-white/20' : ''}`
    : `text-gray-700 border-gray-300 hover:text-pau-blue hover:bg-gray-50 ${isLangMenuOpen ? 'bg-gray-100' : ''}`;

  const navLinkClass = (isActive: boolean) => 
    `text-[13px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer px-4 py-2 rounded-full flex items-center ${
      isActive 
        ? (isTransparent ? 'text-white bg-white/20 shadow-inner' : 'text-pau-blue bg-pau-blue/5 ring-1 ring-pau-blue/20')
        : textColorClass
    }`;
  
  const SubmenuBtn = ({ page, label, external }: { page: Page, label: string, external?: boolean }) => {
    const isActive = currentPage === page;
    return (
      <button 
        onClick={() => { 
          if (external) {
            onNavigate('home'); 
          } else {
            onNavigate(page); 
          }
          setActiveDropdown(null); 
        }} 
        className={`relative text-[15px] transition-all text-left w-full group flex items-center py-1 ${
          isActive ? 'text-pau-blue font-extrabold' : 'text-gray-600 hover:text-pau-blue font-semibold'
        }`}
      >
        {isActive && (
          <span className="absolute -left-4 w-1 h-4 bg-pau-gold rounded-full"></span>
        )}
        <span className={isActive ? 'pl-1' : 'group-hover:translate-x-1 transition-transform flex items-center'}>
          {label}
          {external && <span className="ml-2 text-[8px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded uppercase tracking-widest font-bold">Ext</span>}
        </span>
      </button>
    );
  };

  const MobileSection = ({ title, id, children }: { title: string, id: string, children?: React.ReactNode }) => {
    const isOpen = mobileExpandedSection === id;
    return (
      <div className="border-b border-gray-100 last:border-0">
        <button 
          onClick={() => setMobileExpandedSection(isOpen ? null : id)}
          className="w-full flex items-center justify-between py-5 text-left"
        >
          <span className={`text-sm font-extrabold tracking-widest uppercase transition-colors ${isOpen ? 'text-pau-blue' : 'text-gray-900'}`}>
            {title}
          </span>
          <ChevronDownIcon className={`h-4 w-4 text-pau-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] pb-5' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-4 pl-4 border-l-2 border-pau-gold/20">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const MobileSubLink = ({ page, label, external }: { page: Page, label: string, external?: boolean }) => (
    <button 
      onClick={() => external ? navigateAndClose('home') : navigateAndClose(page)}
      className={`text-[15px] font-medium text-left py-1 transition-colors ${currentPage === page ? 'text-pau-gold font-bold' : 'text-gray-500 active:text-pau-blue'}`}
    >
      {label} {external && <span className="text-[9px] text-gray-300 ml-1">(External)</span>}
    </button>
  );

  return (
    <>
      {/* Global Alert Banner */}
      {globalAlert.active && (
        <div className={`fixed top-0 w-full z-[60] px-4 py-2 md:py-3 flex items-center justify-center text-center text-xs md:text-sm font-bold tracking-wide uppercase shadow-md transition-colors ${
          globalAlert.type === 'emergency' ? 'bg-red-600 text-white' : 
          globalAlert.type === 'warning' ? 'bg-pau-gold text-pau-darkBlue' : 
          'bg-pau-blue text-white'
        }`}>
          {globalAlert.type === 'emergency' && <ExclamationTriangleIcon className="h-4 w-4 mr-2 animate-pulse" />}
          {globalAlert.type === 'warning' && <MegaphoneIcon className="h-4 w-4 mr-2" />}
          {globalAlert.type === 'info' && <InformationCircleIcon className="h-4 w-4 mr-2" />}
          {globalAlert.message}
        </div>
      )}

      <nav className={`fixed w-full z-50 transition-all duration-500 ${topOffset} ${navBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div 
              className="flex-shrink-0 cursor-pointer group flex items-center gap-3"
              onClick={() => onNavigate('home')}
            >
              <div className={`w-11 h-11 font-serif font-bold text-2xl flex items-center justify-center rounded-sm shadow-md transition-all ${isTransparent ? 'bg-white text-pau-blue' : 'bg-pau-blue text-white group-hover:bg-pau-darkBlue'}`}>
                P
              </div>
              <div className="flex flex-col justify-center">
                  <h1 className={`${logoTitleClass} font-bold text-xl tracking-tighter leading-none font-sans transition-colors duration-500`}>
                    PACIFIC AMERICAN
                  </h1>
                  <h2 className={`${logoSubtitleClass} font-medium text-[10px] tracking-[0.45em] mt-1.5 uppercase transition-colors duration-500`}>
                    School of Law
                  </h2>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {/* 1. ABOUT */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave}>
                <button className={navLinkClass(['history-mission', 'president-welcome', 'dean-message', 'school-form', 'faqs', 'bar-reg', 'disclosure', 'catalog', 'faculty', 'admin-staffs', 'consumer-info'].includes(currentPage))}>
                  {shared.nav.about}
                  <ChevronDownIcon className="ml-1 h-3.5 w-3.5 stroke-[3]" />
                </button>
                {activeDropdown === 'about' && (
                  <DropdownWrapper widthClass="w-[750px]">
                    <div className="grid grid-cols-3 gap-10 px-10">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4">Our Identity</h4>
                          <ul className="space-y-3">
                            <li><SubmenuBtn page="history-mission" label={shared.nav.historyMission} /></li>
                            <li><SubmenuBtn page="president-welcome" label={shared.nav.presidentWelcome} /></li>
                            <li><SubmenuBtn page="dean-message" label={shared.nav.deanMessage} /></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4">Resources</h4>
                          <ul className="space-y-3">
                            <li><SubmenuBtn page="school-form" label={shared.nav.schoolForm} /></li>
                            <li><SubmenuBtn page="faqs" label={shared.nav.faqs} /></li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4">Governance & Compliance</h4>
                        <ul className="space-y-3">
                          <li><SubmenuBtn page="bar-reg" label={shared.nav.barReg} /></li>
                          <li><SubmenuBtn page="disclosure" label={shared.nav.disclosure} /></li>
                          <li><SubmenuBtn page="catalog" label={shared.nav.catalog} /></li>
                          <li><SubmenuBtn page="consumer-info" label={shared.nav.consumerInfo} /></li>
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4">Our People</h4>
                        <ul className="space-y-3">
                          <li><SubmenuBtn page="faculty" label={shared.nav.faculty} /></li>
                          <li><SubmenuBtn page="admin-staffs" label={shared.nav.adminStaffs} /></li>
                        </ul>
                      </div>
                    </div>
                  </DropdownWrapper>
                )}
              </div>

              {/* 2. ACADEMICS */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('academics')} onMouseLeave={handleMouseLeave}>
                <button className={navLinkClass(['academics', 'academic-calendar', 'bar-info', 'curriculum-schedule', 'course-desc', 'counseling', 'grad-reqs', 'centers', 'library'].includes(currentPage))}>
                  {shared.nav.academics}
                  <ChevronDownIcon className="ml-1 h-3.5 w-3.5 stroke-[3]" />
                </button>
                {activeDropdown === 'academics' && (
                  <DropdownWrapper widthClass="w-72">
                    <div className="px-10 space-y-4">
                      <SubmenuBtn page="academics" label="Overview" />
                      <SubmenuBtn page="centers" label={shared.nav.centers} />
                      <SubmenuBtn page="library" label={shared.nav.library} />
                      <SubmenuBtn page="academic-calendar" label={shared.nav.academicCalendar} />
                      <SubmenuBtn page="bar-info" label={shared.nav.barInfo} />
                      <SubmenuBtn page="curriculum-schedule" label={shared.nav.curriculum} />
                      <SubmenuBtn page="course-desc" label={shared.nav.courseDesc} />
                      <SubmenuBtn page="counseling" label={shared.nav.counseling} />
                      <SubmenuBtn page="grad-reqs" label={shared.nav.gradReqs} />
                    </div>
                  </DropdownWrapper>
                )}
              </div>

              {/* 3. ADMISSIONS */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('admissions')} onMouseLeave={handleMouseLeave}>
                <button className={navLinkClass(['admissions', 'apply-now', 'app-steps', 'admission-reqs', 'transfer-int', 'tech-reqs', 'careers'].includes(currentPage))}>
                  {shared.nav.admissions}
                  <ChevronDownIcon className="ml-1 h-3.5 w-3.5 stroke-[3]" />
                </button>
                {activeDropdown === 'admissions' && (
                  <DropdownWrapper widthClass="w-72">
                    <div className="px-10 space-y-4">
                      <button onClick={() => { onNavigate('apply-now'); setActiveDropdown(null); }} className={`block w-full text-left text-[15px] font-bold uppercase transition-colors flex items-center ${currentPage === 'apply-now' ? 'text-pau-gold' : 'text-pau-blue'}`}>
                        {shared.nav.applyNow}
                        {currentPage === 'apply-now' ? null : <span className="ml-2 w-1.5 h-1.5 rounded-full bg-pau-gold animate-pulse"></span>}
                      </button>
                      <SubmenuBtn page="admissions" label="Admissions Home" />
                      <SubmenuBtn page="careers" label={shared.nav.careers} />
                      <SubmenuBtn page="app-steps" label={shared.nav.appSteps} />
                      <SubmenuBtn page="admission-reqs" label={shared.nav.admissionReqs} />
                      <SubmenuBtn page="transfer-int" label={shared.nav.transferInt} />
                      <SubmenuBtn page="tech-reqs" label={shared.nav.techReqs} />
                    </div>
                  </DropdownWrapper>
                )}
              </div>

              {/* 4. TUITION */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('tuition')} onMouseLeave={handleMouseLeave}>
                <button className={navLinkClass(['tuition', 'tuition-fees', 'payment-plan', 'refund-policy'].includes(currentPage))}>
                  {shared.nav.tuition}
                  <ChevronDownIcon className="ml-1 h-3.5 w-3.5 stroke-[3]" />
                </button>
                {activeDropdown === 'tuition' && (
                  <DropdownWrapper widthClass="w-64">
                    <div className="px-10 space-y-4">
                      <SubmenuBtn page="tuition-fees" label={shared.nav.tuitionFees} />
                      <SubmenuBtn page="payment-plan" label={shared.nav.paymentPlan} />
                      <SubmenuBtn page="refund-policy" label={shared.nav.refundPolicy} />
                    </div>
                  </DropdownWrapper>
                )}
              </div>

              {/* 5. MY PAUSL */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('mypausl')} onMouseLeave={handleMouseLeave}>
                <button className={navLinkClass(['weekly-dicta'].includes(currentPage))}>
                  {shared.nav.myPausl}
                  <ChevronDownIcon className="ml-1 h-3.5 w-3.5 stroke-[3]" />
                </button>
                {activeDropdown === 'mypausl' && (
                  <DropdownWrapper widthClass="w-[600px]">
                    <div className="grid grid-cols-2 gap-10 px-10">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4 flex items-center">
                            <BookOpenIcon className="h-3 w-3 mr-2" /> Student Life
                          </h4>
                          <ul className="space-y-3">
                            <li><SubmenuBtn page="weekly-dicta" label="Weekly Dicta" /></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4 flex items-center">
                            <IdentificationIcon className="h-3 w-3 mr-2" /> Records
                          </h4>
                          <ul className="space-y-3">
                            <li><SubmenuBtn page="home" label="Populi" external /></li>
                            <li><SubmenuBtn page="home" label="Transcripts" external /></li>
                            <li><SubmenuBtn page="home" label="Finance Office" external /></li>
                            <li><SubmenuBtn page="home" label="Course Enrollment" external /></li>
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4 flex items-center">
                            <ComputerDesktopIcon className="h-3 w-3 mr-2" /> Legal Tools
                          </h4>
                          <ul className="space-y-3">
                            <li><SubmenuBtn page="home" label="Westlaw" external /></li>
                            <li><SubmenuBtn page="home" label="CALI" external /></li>
                            <li><SubmenuBtn page="home" label="ExamSoft" external /></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-extrabold text-pau-goldDark uppercase tracking-widest border-b-2 border-pau-gold/10 pb-3 mb-4 flex items-center">
                            <ShoppingBagIcon className="h-3 w-3 mr-2" /> Marketplace
                          </h4>
                          <ul className="space-y-3">
                            <li><SubmenuBtn page="home" label="Student Store (PAUSL Gear)" external /></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </DropdownWrapper>
                )}
              </div>

              {/* 6. CONTACT */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('contact')} onMouseLeave={handleMouseLeave}>
                <button className={navLinkClass(['contact', 'office-hours', 'contact-info', 'request-info'].includes(currentPage))}>
                  {shared.nav.contact}
                  <ChevronDownIcon className="ml-1 h-3.5 w-3.5 stroke-[3]" />
                </button>
                {activeDropdown === 'contact' && (
                  <DropdownWrapper widthClass="w-64">
                    <div className="px-10 space-y-4">
                      <SubmenuBtn page="office-hours" label={shared.nav.officeHours} />
                      <SubmenuBtn page="contact-info" label={shared.nav.contactInfo} />
                      <SubmenuBtn page="request-info" label={shared.nav.requestInfo} />
                    </div>
                  </DropdownWrapper>
                )}
              </div>

              <div className={`relative ml-4 pl-4 border-l ${isTransparent ? 'border-white/20' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className={`flex items-center space-x-2 transition-all rounded-full px-4 py-2 border font-bold ${languageBtnClass}`}
                >
                  <GlobeAltIcon className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-widest">{currentLang.substring(0,3)}</span>
                  <ChevronDownIcon className="h-3 w-3" />
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-2xl py-2 z-[110] overflow-hidden border border-gray-200">
                    <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { onLanguageChange(lang); setIsLangMenuOpen(false); }}
                        className={`block w-full text-left px-5 py-3 text-[14px] transition-colors ${currentLang === lang ? 'bg-pau-light text-pau-blue font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {lang}
                      </button>
                    ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:text-pau-blue hover:bg-gray-50'}`}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-7 w-7" />
                ) : (
                  <Bars3Icon className="block h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden bg-white fixed inset-0 z-[200] overflow-y-auto border-t border-gray-100 shadow-inner flex flex-col ${globalAlert.active ? 'top-[96px]' : 'top-[72px]'}`}>
            <div className="p-6 space-y-4 flex-grow">
              
              <button 
                onClick={() => navigateAndClose('home')} 
                className={`w-full text-left text-xl font-serif font-bold py-4 border-b border-gray-100 flex items-center justify-between ${currentPage === 'home' ? 'text-pau-gold' : 'text-pau-blue'}`}
              >
                {shared.nav.home}
                <ChevronRightIcon className="h-5 w-5 opacity-20" />
              </button>

              <MobileSection title={shared.nav.about} id="about">
                <MobileSubLink page="history-mission" label={shared.nav.historyMission} />
                <MobileSubLink page="president-welcome" label={shared.nav.presidentWelcome} />
                <MobileSubLink page="dean-message" label={shared.nav.deanMessage} />
                <MobileSubLink page="faculty" label={shared.nav.faculty} />
                <MobileSubLink page="admin-staffs" label={shared.nav.adminStaffs} />
                <MobileSubLink page="bar-reg" label={shared.nav.barReg} />
                <MobileSubLink page="disclosure" label={shared.nav.disclosure} />
                <MobileSubLink page="catalog" label={shared.nav.catalog} />
                <MobileSubLink page="consumer-info" label={shared.nav.consumerInfo} />
                <MobileSubLink page="faqs" label={shared.nav.faqs} />
              </MobileSection>

              <MobileSection title={shared.nav.academics} id="academics">
                <MobileSubLink page="academics" label="Overview" />
                <MobileSubLink page="centers" label={shared.nav.centers} />
                <MobileSubLink page="library" label={shared.nav.library} />
                <MobileSubLink page="academic-calendar" label={shared.nav.academicCalendar} />
                <MobileSubLink page="bar-info" label={shared.nav.barInfo} />
                <MobileSubLink page="curriculum-schedule" label={shared.nav.curriculum} />
                <MobileSubLink page="course-desc" label={shared.nav.courseDesc} />
                <MobileSubLink page="grad-reqs" label={shared.nav.gradReqs} />
              </MobileSection>

              <MobileSection title={shared.nav.admissions} id="admissions">
                <MobileSubLink page="apply-now" label={shared.nav.applyNow} />
                <MobileSubLink page="admissions" label="Admissions Home" />
                <MobileSubLink page="careers" label={shared.nav.careers} />
                <MobileSubLink page="admission-reqs" label={shared.nav.admissionReqs} />
                <MobileSubLink page="app-steps" label={shared.nav.appSteps} />
                <MobileSubLink page="tech-reqs" label={shared.nav.techReqs} />
              </MobileSection>

              <MobileSection title={shared.nav.tuition} id="tuition">
                <MobileSubLink page="tuition-fees" label={shared.nav.tuitionFees} />
                <MobileSubLink page="payment-plan" label={shared.nav.paymentPlan} />
                <MobileSubLink page="refund-policy" label={shared.nav.refundPolicy} />
              </MobileSection>

              {/* Mobile My PAUSL Section */}
              <MobileSection title={shared.nav.myPausl} id="mypausl">
                <MobileSubLink page="weekly-dicta" label="Weekly Dicta" />
                <MobileSubLink page="home" label="Populi" external />
                <MobileSubLink page="home" label="Westlaw" external />
                <MobileSubLink page="home" label="CALI" external />
                <MobileSubLink page="home" label="ExamSoft" external />
                <MobileSubLink page="home" label="Transcripts" external />
                <MobileSubLink page="home" label="Finance Office" external />
                <MobileSubLink page="home" label="Course Enrollment" external />
                <MobileSubLink page="home" label="Student Store (PAUSL Gear)" external />
              </MobileSection>

              <MobileSection title={shared.nav.contact} id="contact">
                <MobileSubLink page="contact-info" label={shared.nav.contactInfo} />
                <MobileSubLink page="office-hours" label={shared.nav.officeHours} />
                <MobileSubLink page="request-info" label={shared.nav.requestInfo} />
              </MobileSection>

              <div className="pt-8 border-t border-gray-100">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Language Settings</p>
                 <div className="grid grid-cols-2 gap-3">
                   {LANGUAGES.map(lang => (
                     <button 
                       key={lang}
                       onClick={() => onLanguageChange(lang)}
                       className={`text-xs py-3 px-4 rounded-xl border text-center transition-all ${currentLang === lang ? 'bg-pau-blue text-white border-pau-blue font-bold shadow-md' : 'bg-gray-50 border-gray-100 text-gray-600'}`}
                     >
                       {lang === 'Chinese (Simplified)' ? 'Chinese' : lang}
                     </button>
                   ))}
                 </div>
              </div>
            </div>
            
            <div className="p-6 bg-pau-darkBlue">
              <button 
                onClick={() => navigateAndClose('admissions')}
                className="w-full py-5 bg-pau-gold text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl shadow-lg"
              >
                Start Application
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};