import { NewsItem, SupportedLanguage } from '../types';

/**
 * Returns a news/notice item with translated text fields applied,
 * based on the `translations` column stored in Supabase by adminService.
 *
 * If the language is English or no translation exists for the given language,
 * the original item is returned unchanged.
 */
export function applyNewsTranslation(item: NewsItem, lang: SupportedLanguage): NewsItem {
  if (lang === 'English' || !item.translations?.[lang]) return item;
  const t = item.translations[lang];
  return {
    ...item,
    title: t.title ?? item.title,
    summary: t.summary ?? item.summary,
    body: t.body ?? item.body,
  };
}
