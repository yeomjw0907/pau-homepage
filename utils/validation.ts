/**
 * Validation utility functions
 * 중앙화된 유효성 검사 함수
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove common phone number characters
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Check if it contains only digits and is reasonable length
  return /^\d{10,15}$/.test(cleaned);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if value is not empty
 */
export const isRequired = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

/**
 * Validate string length
 */
export const isValidLength = (str: string, min: number, max?: number): boolean => {
  const length = str.trim().length;
  if (length < min) return false;
  if (max !== undefined && length > max) return false;
  return true;
};












