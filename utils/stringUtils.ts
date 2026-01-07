/**
 * String utility functions
 * 중앙화된 문자열 처리 유틸리티 함수
 */

/**
 * Trim whitespace from a string
 */
export const trim = (str: string): string => {
  return str.trim();
};

/**
 * Trim whitespace from each string in an array
 */
export const trimArray = (arr: string[]): string[] => {
  return arr.map(s => s.trim());
};

/**
 * Split a string by delimiter and trim each part
 */
export const splitAndTrim = (str: string, delimiter: string = ','): string[] => {
  return str.split(delimiter).map(s => s.trim()).filter(s => s.length > 0);
};

/**
 * Remove extra whitespace and normalize spaces
 */
export const normalizeWhitespace = (str: string): string => {
  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to title case
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Check if string is empty or only whitespace
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};










