import { useEffect, useRef, useState } from 'react';
import {
  SupportedLanguage,
  HomeContent,
  AdmissionsContent,
  AcademicsContent,
  FacultyContent,
  SharedContent,
  GlobalAlert,
  MOCK_HOME_CONTENT,
  DEFAULT_SHARED_CONTENT,
} from '../types';
import { DEFAULT_ADMISSIONS_CONTENT } from '../data/admissionsData';
import { DEFAULT_ACADEMICS_CONTENT } from '../data/academicsData';
import { DEFAULT_FACULTY_CONTENT } from '../data/facultyData';

// Map SupportedLanguage to locale folder names (matching public/locales/ structure)
const LANG_TO_FOLDER: Partial<Record<SupportedLanguage, string>> = {
  Spanish: 'Spanish',
  Korean: 'Korean',
  'Chinese (Simplified)': 'Chinese',
  Vietnamese: 'Vietnamese',
  Japanese: 'Japanese',
  French: 'French',
  Tagalog: 'Tagalog',
};

interface UseTranslationProps {
  currentLang: SupportedLanguage;
  currentPage?: string;   // kept for API compatibility, no longer affects behavior
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
  sharedContent?: SharedContent;
  setSharedContent?: (content: SharedContent) => void;
  setPagesContent?: (content: any) => void;
  setGlobalAlert: (alert: GlobalAlert) => void;
}

/**
 * Fetches a pre-translated JSON file from /public/locales/{folder}/{file}.
 * Returns null if not found or on error.
 */
async function loadLocaleFile(folder: string, file: string): Promise<any | null> {
  try {
    const res = await fetch(`/locales/${folder}/${file}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const useTranslation = ({
  currentLang,
  homeContent,
  setHomeContent,
  setAdmissionsContent,
  setAcademicsContent,
  setFacultyContent,
  setSharedContent,
  setPagesContent,
  setGlobalAlert,
}: UseTranslationProps) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const prevLangRef = useRef<SupportedLanguage>('English');

  useEffect(() => {
    // Nothing to do if language hasn't changed
    if (currentLang === prevLangRef.current) return;
    prevLangRef.current = currentLang;

    // Switching back to English — instantly restore hardcoded defaults
    if (currentLang === 'English') {
      if (setSharedContent) setSharedContent(DEFAULT_SHARED_CONTENT);
      if (setPagesContent) setPagesContent(null);
      setHomeContent({
        ...MOCK_HOME_CONTENT,
        latestNews: homeContent.latestNews,  // keep live Supabase news
        clinics: homeContent.clinics,        // keep live clinics
      });
      setAdmissionsContent(DEFAULT_ADMISSIONS_CONTENT);
      setAcademicsContent(DEFAULT_ACADEMICS_CONTENT);
      setFacultyContent(DEFAULT_FACULTY_CONTENT);
      return;
    }

    const folder = LANG_TO_FOLDER[currentLang];
    if (!folder) {
      console.warn(`[Translation] No locale folder mapped for: ${currentLang}`);
      return;
    }

    const switchLanguage = async () => {
      setIsTranslating(true);
      try {
        // Load all locale files in parallel — ~100ms total (network + parse)
        const [shared, home, admissions, academics, faculty, pages] = await Promise.all([
          loadLocaleFile(folder, 'shared.json'),
          loadLocaleFile(folder, 'home.json'),
          loadLocaleFile(folder, 'admissions.json'),
          loadLocaleFile(folder, 'academics.json'),
          loadLocaleFile(folder, 'faculty.json'),
          loadLocaleFile(folder, 'pages.json'),
        ]);

        if (shared && setSharedContent) setSharedContent(shared);
        if (pages && setPagesContent) setPagesContent(pages);
        if (home) {
          setHomeContent({
            ...homeContent,
            ...home,
            latestNews: homeContent.latestNews,  // never overwrite live Supabase data
            clinics: homeContent.clinics,
          });
        }
        if (admissions) setAdmissionsContent(admissions);
        if (academics) setAcademicsContent(academics);
        if (faculty) setFacultyContent(faculty);

        // Warn if ALL files are missing (locales not generated yet)
        if (!shared && !home && !admissions && !academics && !faculty) {
          setGlobalAlert({
            active: true,
            message: `Translation for "${currentLang}" is not available yet. Run: npx tsx scripts/generateLocales.ts`,
            type: 'warning',
          });
        }
      } catch (err) {
        console.error('[Translation] Failed to load locale files:', err);
        setGlobalAlert({
          active: true,
          message: 'Translation could not be loaded. Please refresh the page.',
          type: 'error',
        });
      } finally {
        setIsTranslating(false);
      }
    };

    switchLanguage();
  }, [currentLang]); // ✅ Only re-runs on language change — no infinite loop

  return { isTranslating };
};
