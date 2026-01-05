import { useEffect, useRef, useState } from 'react';
import { SupportedLanguage, Page, HomeContent, AdmissionsContent, AcademicsContent, FacultyContent, GlobalAlert } from '../types';
import { translateContent } from '../services/geminiService';
import { getErrorMessage } from '../utils/errorMessages';

interface UseTranslationProps {
  currentLang: SupportedLanguage;
  currentPage: Page;
  homeContent: HomeContent;
  setHomeContent: (content: HomeContent) => void;
  admissionsContent: AdmissionsContent;
  setAdmissionsContent: (content: AdmissionsContent) => void;
  academicsContent: AcademicsContent;
  setAcademicsContent: (content: AcademicsContent) => void;
  facultyContent: FacultyContent;
  setFacultyContent: (content: FacultyContent) => void;
  weeklyDictaContent: any;
  setWeeklyDictaContent: (content: any) => void;
  noticesContent: any;
  setNoticesContent: (content: any) => void;
  setGlobalAlert: (alert: GlobalAlert) => void;
}

export const useTranslation = ({
  currentLang,
  currentPage,
  homeContent,
  setHomeContent,
  admissionsContent,
  setAdmissionsContent,
  academicsContent,
  setAcademicsContent,
  facultyContent,
  setFacultyContent,
  weeklyDictaContent,
  setWeeklyDictaContent,
  noticesContent,
  setNoticesContent,
  setGlobalAlert
}: UseTranslationProps) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const prevLangRef = useRef<SupportedLanguage>('English');

  useEffect(() => {
    const handleTranslation = async () => {
      // Don't translate on initial mount if already English
      if (currentLang === 'English' && prevLangRef.current === 'English') return;
      
      setIsTranslating(true);
      
      // Helper to translate safely
      const translateSafe = async <T extends unknown>(content: T, lang: SupportedLanguage, sectionName: string): Promise<T> => {
        try {
          console.log(`[Translation] Starting translation for ${sectionName} to ${lang}`);
          const result = await translateContent(content, lang);
          console.log(`[Translation] Successfully translated ${sectionName}`);
          return result;
        } catch (e) {
          console.error(`[Translation] Failed to translate ${sectionName} to ${lang}:`, e);
          
          // Show user-friendly error message if available
          if (e instanceof Error && (e as any).errorType) {
            const errorMsg = getErrorMessage((e as any).errorType, lang);
            setGlobalAlert({
              active: true,
              message: errorMsg.message,
              type: 'error'
            });
          }
          
          return content; // Fallback to original content on error
        }
      };

      try {
        // Determine which content is needed for current page (priority translation)
        const getPriorityContent = () => {
          switch (currentPage) {
            case 'home':
              return { content: homeContent, setter: setHomeContent, name: 'Home Content' };
            case 'admissions':
            case 'apply-now':
            case 'app-steps':
            case 'admission-reqs':
            case 'transfer-int':
            case 'tech-reqs':
              return { content: admissionsContent, setter: setAdmissionsContent, name: 'Admissions' };
            case 'academics':
            case 'academic-calendar':
            case 'bar-info':
            case 'curriculum-schedule':
            case 'course-desc':
            case 'counseling':
            case 'grad-reqs':
              return { content: academicsContent, setter: setAcademicsContent, name: 'Academics' };
            case 'faculty':
            case 'admin-staffs':
              return { content: facultyContent, setter: setFacultyContent, name: 'Faculty' };
            case 'weekly-dicta':
            case 'notices':
            case 'news':
            case 'news-detail':
              return { content: weeklyDictaContent, setter: setWeeklyDictaContent, name: 'Weekly Dicta' };
            default:
              return { content: homeContent, setter: setHomeContent, name: 'Home Content' };
          }
        };

        const priority = getPriorityContent();
        
        // Phase 1: Translate current page content immediately (target: <1 second)
        const priorityPromise = translateSafe(priority.content, currentLang, priority.name);
        priorityPromise.then(result => {
          priority.setter(result);
          // Hide loading overlay once priority content is ready
          setIsTranslating(false);
        }).catch(err => {
          console.error(`[Translation] Priority content (${priority.name}) translation failed`, err);
          setIsTranslating(false);
        });

        // Phase 2: Translate remaining content in background (non-blocking)
        // Don't await these - let them complete in background
        const backgroundPromises = [];

        if (priority.name !== 'Home Content') {
          backgroundPromises.push(
            translateSafe(homeContent, currentLang, 'Home Content').then(setHomeContent).catch(() => {})
          );
        }
        if (priority.name !== 'Admissions') {
          backgroundPromises.push(
            translateSafe(admissionsContent, currentLang, 'Admissions').then(setAdmissionsContent).catch(() => {})
          );
        }
        if (priority.name !== 'Academics') {
          backgroundPromises.push(
            translateSafe(academicsContent, currentLang, 'Academics').then(setAcademicsContent).catch(() => {})
          );
        }
        if (priority.name !== 'Faculty') {
          backgroundPromises.push(
            translateSafe(facultyContent, currentLang, 'Faculty').then(setFacultyContent).catch(() => {})
          );
        }
        if (priority.name !== 'Weekly Dicta') {
          backgroundPromises.push(
            translateSafe(weeklyDictaContent, currentLang, 'Weekly Dicta').then(setWeeklyDictaContent).catch(() => {})
          );
          backgroundPromises.push(
            translateSafe(noticesContent, currentLang, 'Notices').then(setNoticesContent).catch(() => {})
          );
        }

        // Wait for priority content (should complete in <1 second)
        await priorityPromise.catch(() => {});

        // Background translations continue without blocking
        Promise.allSettled(backgroundPromises).then(() => {
          console.log(`[Translation] All background translations completed for ${currentLang}`);
        });

        console.log(`[Translation] Priority translation completed for ${currentLang}`);
      } catch (err) {
        console.error("[Translation] Translation process failed:", err);
        setIsTranslating(false);
        
        // Show user-friendly error message
        let errorMessage = `Translation to ${currentLang} failed. Please try again or refresh the page.`;
        if (err instanceof Error && (err as any).errorType) {
          const errorMsg = getErrorMessage((err as any).errorType, currentLang);
          errorMessage = errorMsg.message;
        }
        
        setGlobalAlert({
          active: true,
          message: errorMessage,
          type: 'error'
        });
      } finally {
        prevLangRef.current = currentLang;
      }
    };
    handleTranslation();
  }, [currentLang, currentPage, homeContent, admissionsContent, academicsContent, facultyContent, weeklyDictaContent, noticesContent, setHomeContent, setAdmissionsContent, setAcademicsContent, setFacultyContent, setWeeklyDictaContent, setNoticesContent, setGlobalAlert]);

  return { isTranslating };
};

