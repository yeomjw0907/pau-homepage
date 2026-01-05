
import { GoogleGenAI } from "@google/genai";
import { SupportedLanguage, ImageSize } from "../types";
import { detectErrorType, ErrorType, getErrorMessage } from "../utils/errorMessages";
import { withRetry } from "../utils/apiHelpers";

// In-memory cache for translations to avoid redundant API calls and improve speed
const translationCache = new Map<string, any>();

// Load cache from localStorage on initialization
const loadCacheFromStorage = () => {
  try {
    const stored = localStorage.getItem('translationCache');
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.entries(parsed).forEach(([key, value]) => {
        translationCache.set(key, value);
      });
      console.debug(`[Performance] Loaded ${Object.keys(parsed).length} cached translations from localStorage`);
    }
  } catch (e) {
    console.warn('[Performance] Failed to load translation cache from localStorage', e);
  }
};

// Save cache to localStorage with size limit protection
const saveCacheToStorage = () => {
  try {
    const cacheObj = Object.fromEntries(translationCache);
    const cacheString = JSON.stringify(cacheObj);
    
    // Check size (localStorage has ~5-10MB limit, but we'll be conservative)
    const sizeInMB = new Blob([cacheString]).size / (1024 * 1024);
    if (sizeInMB > 2) {
      console.warn(`[Performance] Translation cache is too large (${sizeInMB.toFixed(2)}MB), clearing old entries`);
      // Keep only the 50 most recent entries
      const entries = Array.from(translationCache.entries());
      translationCache.clear();
      entries.slice(-50).forEach(([key, value]) => {
        translationCache.set(key, value);
      });
      const reducedCache = Object.fromEntries(translationCache);
      localStorage.setItem('translationCache', JSON.stringify(reducedCache));
    } else {
      localStorage.setItem('translationCache', cacheString);
    }
  } catch (e) {
    // Handle QuotaExceededError or other storage errors
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      console.warn('[Performance] localStorage quota exceeded, clearing old cache entries');
      // Clear half of the cache
      const entries = Array.from(translationCache.entries());
      translationCache.clear();
      entries.slice(-Math.floor(entries.length / 2)).forEach(([key, value]) => {
        translationCache.set(key, value);
      });
      try {
        const reducedCache = Object.fromEntries(translationCache);
        localStorage.setItem('translationCache', JSON.stringify(reducedCache));
      } catch (e2) {
        console.warn('[Performance] Failed to save reduced cache, clearing localStorage', e2);
        localStorage.removeItem('translationCache');
      }
    } else {
      console.warn('[Performance] Failed to save translation cache to localStorage', e);
    }
  }
};

// Initialize cache from storage
if (typeof window !== 'undefined') {
  loadCacheFromStorage();
}

/**
 * Helper to extract JSON from a potentially markdown-wrapped string
 */
const extractJson = (text: string): string => {
  let cleanText = text.trim();
  // Remove markdown code blocks if present
  cleanText = cleanText.replace(/```json\n?|\n?```/g, '');
  // Find the first '{' and last '}' to handle any preamble/postscript text
  const firstBrace = cleanText.indexOf('{');
  const lastBrace = cleanText.lastIndexOf('}');
  
  if (firstBrace !== -1 && lastBrace !== -1) {
    return cleanText.substring(firstBrace, lastBrace + 1);
  }
  return cleanText;
};

/**
 * Translates site content dynamically using Gemini 3 Flash.
 * Optimized with caching and concise prompting for maximum performance.
 */
export const translateContent = async <T>(
  currentContent: T,
  targetLanguage: SupportedLanguage
): Promise<T> => {
  // Generate a more accurate cache key using content hash
  const contentString = JSON.stringify(currentContent);
  // Simple hash function for cache key (more accurate than length + slice)
  let hash = 0;
  for (let i = 0; i < contentString.length; i++) {
    const char = contentString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const cacheKey = `${targetLanguage}_${Math.abs(hash)}`;
  
  if (translationCache.has(cacheKey)) {
    console.debug(`[Performance] Returning cached translation for ${targetLanguage}`);
    return translationCache.get(cacheKey);
  }

  // Always create a new GoogleGenAI instance right before making an API call
  // Try multiple ways to get the API key (works in both local and Vercel)
  const apiKey = process.env.API_KEY || 
                 process.env.GEMINI_API_KEY || 
                 (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
                 '';
  
  if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
    const errorType = ErrorType.API_KEY_MISSING;
    const errorMessage = getErrorMessage(errorType, targetLanguage);
    console.error("Gemini API key is not configured. Please set GEMINI_API_KEY in environment variables.");
    const error = new Error(errorMessage.message);
    (error as any).errorType = errorType;
    throw error;
  }
  const ai = new GoogleGenAI({ apiKey });

  // Use System Instruction for better role adherence
  const systemInstruction = `You are a professional translator for the Pacific American University School of Law website.
Your task is to translate the values of the provided JSON object into ${targetLanguage}.

Rules:
1. PRESERVE STRUCTURE: Do not change any keys in the JSON object. Return the exact same JSON structure.
2. PRESERVE NAMES: Do not translate proper names such as "Pacific American University", "Juris Doctor", "J.D.", "LL.M.", "Silicon Valley", "Westlaw", "LexisNexis", "Populi", or people's names.
3. PRESERVE HTML: If a value contains HTML tags (like <p>, <strong>, <ul>), keep the tags exactly as they are and only translate the text content inside them.
4. OUTPUT: Return ONLY the raw valid JSON string. Do not include markdown formatting (like \`\`\`json) or any conversational text.`;

  try {
    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contentString,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.1,
        }
      });
    }, {
      maxRetries: 3,
      initialDelay: 1000,
      maxDelay: 10000,
      timeout: 30000
    });

    const text = response.text;
    if (!text) throw new Error("No translation returned");
    
    // Robust extraction
    const cleanedJsonString = extractJson(text);
    
    const translated = JSON.parse(cleanedJsonString) as T;
    
    // Persist in memory cache and localStorage
    translationCache.set(cacheKey, translated);
    if (typeof window !== 'undefined') {
      saveCacheToStorage();
    }
    
    return translated;
  } catch (error) {
    console.error("Translation error:", error);
    
    // Enhance error with user-friendly message
    const errorType = detectErrorType(error);
    const errorMessage = getErrorMessage(errorType, targetLanguage);
    const enhancedError = new Error(errorMessage.message);
    (enhancedError as any).errorType = errorType;
    (enhancedError as any).title = errorMessage.title;
    (enhancedError as any).action = errorMessage.action;
    
    throw enhancedError;
  }
};

/**
 * Generates an architectural rendering using gemini-3-pro-image-preview.
 * This model supports 1K, 2K, and 4K resolutions and requires a user-selected API key.
 */
export const generateArchitecturalImage = async (
  prompt: string,
  size: ImageSize
): Promise<string> => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key
  // Try multiple ways to get the API key (works in both local and Vercel)
  const apiKey = process.env.API_KEY || 
                 process.env.GEMINI_API_KEY || 
                 (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
                 '';
  
  if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
    const errorType = ErrorType.API_KEY_MISSING;
    const errorMessage = getErrorMessage(errorType, 'English');
    console.error("Gemini API key is not configured. Please set GEMINI_API_KEY in environment variables.");
    const error = new Error(errorMessage.message);
    (error as any).errorType = errorType;
    throw error;
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: size, // "1K", "2K", or "4K"
          },
        },
      });
    }, {
      maxRetries: 3,
      initialDelay: 1000,
      maxDelay: 10000,
      timeout: 60000 // 60 seconds for image generation
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0 || !candidates[0].content?.parts) {
      throw new Error("No image was generated by the model.");
    }

    // Iterate through parts to find the image part as per guidelines
    for (const part of candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in the model response.");
  } catch (error) {
    console.error("Architectural generation error:", error);
    
    // Enhance error with user-friendly message
    const errorType = detectErrorType(error);
    const errorMessage = getErrorMessage(errorType, 'English');
    const enhancedError = new Error(errorMessage.message);
    (enhancedError as any).errorType = errorType;
    (enhancedError as any).title = errorMessage.title;
    (enhancedError as any).action = errorMessage.action;
    
    throw enhancedError;
  }
};
