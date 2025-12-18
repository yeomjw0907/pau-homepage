
import { GoogleGenAI } from "@google/genai";
import { SupportedLanguage, ImageSize } from "../types";

// In-memory cache for translations to avoid redundant API calls and improve speed
const translationCache = new Map<string, any>();

/**
 * Translates site content dynamically using Gemini 3 Flash.
 * Optimized with caching and concise prompting for maximum performance.
 */
export const translateContent = async <T>(
  currentContent: T,
  targetLanguage: SupportedLanguage
): Promise<T> => {
  if (targetLanguage === 'English') {
    return currentContent;
  }

  // Generate a cache key based on language and content fingerprint
  const contentString = JSON.stringify(currentContent);
  const cacheKey = `${targetLanguage}_${contentString.length}_${contentString.slice(0, 20)}`;
  
  if (translationCache.has(cacheKey)) {
    console.debug(`[Performance] Returning cached translation for ${targetLanguage}`);
    return translationCache.get(cacheKey);
  }

  // Always create a new GoogleGenAI instance right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Optimized prompt: Minimal instructions to reduce latency and processing time
  const prompt = `Translate JSON to ${targetLanguage}. 
Keep keys. Keep names like "Juris Doctor", "LLM", "Silicon Valley".
Return ONLY raw JSON.

JSON:
${contentString}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        // Lower temperature for faster, more deterministic output
        temperature: 0.1,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No translation returned");
    
    const translated = JSON.parse(text) as T;
    
    // Persist in memory cache
    translationCache.set(cacheKey, translated);
    
    return translated;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};

/**
 * Generates an architectural image using Gemini 3 Pro Image Preview.
 */
export const generateArchitecturalImage = async (
  prompt: string,
  size: ImageSize
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: '16:9'
        }
      }
    });

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};
